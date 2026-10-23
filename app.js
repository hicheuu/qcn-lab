(() => {
  'use strict';

  const content = window.LAB_CONTENT;
  const $ = selector => document.querySelector(selector);
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const EASE_OUT = 'cubic-bezier(.23, 1, .32, 1)';

  const setText = (selector, value) => { const node = $(selector); if (node) node.textContent = value ?? ''; };
  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };
  // Each value becomes its own line; the last one can carry the accent colour.
  function lines(element, values = [], emphasizeLast = false) {
    element.replaceChildren(...values.map((value, index) =>
      make(emphasizeLast && index === values.length - 1 ? 'em' : 'span', null, value)));
  }
  function list(selector, values = []) {
    $(selector)?.replaceChildren(...values.map(value => make('li', null, value)));
  }
  function safeLink(value, fallback = '#about') {
    if (typeof value !== 'string' || !value) return fallback;
    if (value.startsWith('#')) return value;
    // Relative links to the site's own pages (no scheme) are kept as written.
    if (!/^[a-z][a-z0-9+.-]*:/i.test(value) && !value.startsWith('//')) return value;
    try {
      const url = new URL(value, location.href);
      return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol) ? url.href : fallback;
    } catch {
      return fallback;
    }
  }

  /* ── Palette (review switcher compares candidates on the real page) ── */
  // Built from colours measured on reference sites (and the earlier prototype); the CSS palette blocks hold the full token sets.
  const PALETTES = [
    {id: 'aqua', label: 'Aqua', source: 'IQM', light: true, swatch: ['#f4f6f6', '#0b726c']},
    {id: 'ivory', label: 'Ivory', source: 'Anthropic', light: true, swatch: ['#f0eee6', '#d97757']},
    {id: 'violet', label: 'Violet', source: 'Q-CTRL', light: false, swatch: ['#0d0d17', '#6a1fe8']},
    {id: 'teal', label: 'Teal', source: 'Quantinuum', light: false, swatch: ['#121414', '#2a9d92']},
    {id: 'mint', label: 'Mint', source: 'Pasqal', light: false, swatch: ['#0e1a1c', '#91e6ca']},
    {id: 'signal', label: 'Signal', source: 'Alice & Bob', light: false, swatch: ['#060506', '#fac500']},
    {id: 'mono', label: 'Mono', source: 'Linear', light: false, swatch: ['#08090a', '#8a8f98']},
    {id: 'magenta', label: 'Magenta', source: 'Earlier prototype', light: true, swatch: ['#041e42', '#ce0f69']},
  ];
  const PER_SLIDE = 'per-slide';
  const review = content.review ?? {};
  const findPalette = id => PALETTES.find(palette => palette.id === id);
  const defaultPalette = findPalette(review.defaultPalette)?.id ?? PALETTES[0].id;
  let paletteChoice = PER_SLIDE;
  if (review.paletteSwitcher) {
    try {
      const saved = localStorage.getItem('uct-palette-v2');
      if (saved === PER_SLIDE || findPalette(saved)) paletteChoice = saved;
    } catch {}
  }
  // A chosen palette also fixes the hero's tone, so the whole page can be judged at once.
  let forcedTone = null;
  let refreshTone = () => {};
  function applyPalette(choice) {
    paletteChoice = choice;
    const palette = findPalette(choice) ?? findPalette(defaultPalette);
    forcedTone = choice === PER_SLIDE ? null : palette.id;
    if (palette.id === 'aqua') delete root.dataset.palette;
    else root.dataset.palette = palette.id;
    // White-text logo on dark headers, dark-text logo on light headers.
    $('#university-logo').src = palette.light ? (content.site.logoOnLight || content.site.logo) : content.site.logo;
    document.querySelectorAll('.swatch').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.palette === choice)));
    refreshTone();
  }
  if (review.paletteSwitcher) {
    const switcher = $('#palette-switcher');
    switcher.hidden = false;
    [{id: PER_SLIDE, label: 'Per slide', swatch: ['#121414', '#0d0d17', '#0e1a1c', '#fac500']}, ...PALETTES].forEach(palette => {
      const button = make('button', 'swatch');
      button.type = 'button';
      button.dataset.palette = palette.id;
      if (palette.source) button.title = `Colours from ${palette.source}`;
      const dot = make('i');
      dot.style.background = palette.swatch.length > 2
        ? `conic-gradient(${palette.swatch.map((colour, i) => `${colour} ${i * 25}% ${(i + 1) * 25}%`).join(', ')})`
        : `linear-gradient(135deg, ${palette.swatch[0]} 50%, ${palette.swatch[1]} 50%)`;
      button.append(dot, palette.label);
      if (palette.source) button.append(make('small', null, palette.source));
      button.addEventListener('click', () => {
        applyPalette(palette.id);
        try { localStorage.setItem('uct-palette-v2', palette.id); } catch {}
      });
      switcher.append(button);
    });
  }

  /* ── Identity ── */
  const site = content.site;
  document.querySelectorAll('[data-university]').forEach(node => { node.textContent = site.university; });
  document.querySelectorAll('[data-department]').forEach(node => { node.textContent = site.department || ''; });
  document.querySelectorAll('[data-university-link]').forEach(node => { node.href = safeLink(site.universityUrl); });
  document.querySelectorAll('[data-lab-name]').forEach(node => { node.textContent = site.name; });
  applyPalette(paletteChoice);
  document.querySelectorAll('[data-lab-tagline]').forEach(node => { node.textContent = site.tagline || ''; node.hidden = !site.tagline; });
  // Sub-pages keep their own titles from the HTML.
  if (document.body.dataset.page === 'home') document.title = `${site.name} | Kookmin University`;


  /* ── Navigation: Oxford-style dropdown panels, a grouped mobile menu and footer columns ── */
  const navigation = content.navigation ?? [];
  const here = location.pathname.split('/').pop() || 'index.html';
  const pathOf = href => href.split('#')[0];
  const isCurrent = entry => pathOf(entry.href) === here && !entry.href.includes('#');
  function topicLink(item, className) {
    const link = make('a', className);
    link.href = item.href;
    if (item.topic) link.dataset.topic = item.topic;
    const dot = make('span', 'topic-dot');
    dot.setAttribute('aria-hidden', 'true');
    const text = make('span');
    text.append(make('strong', null, item.label));
    if (item.text) text.append(make('small', null, item.text));
    link.append(dot, text);
    return link;
  }
  const desktopNav = $('#desktop-nav');
  if (desktopNav && navigation.length) {
    desktopNav.replaceChildren();
    let openItem = null;
    let openTimer = 0;
    let closeTimer = 0;
    const close = (item, restoreFocus = false) => {
      if (!item) return;
      item.classList.remove('open');
      const toggle = item.querySelector('.nav-toggle');
      toggle.setAttribute('aria-expanded', 'false');
      if (openItem === item) openItem = null;
      if (restoreFocus) toggle.focus();
    };
    const open = item => {
      if (openItem && openItem !== item) close(openItem);
      item.classList.add('open');
      item.querySelector('.nav-toggle').setAttribute('aria-expanded', 'true');
      openItem = item;
    };
    navigation.forEach((entry, index) => {
      const item = make('div', 'nav-item');
      if (!entry.items?.length) {
        const link = make('a', 'nav-link', entry.label);
        link.href = entry.href;
        if (isCurrent(entry)) link.setAttribute('aria-current', 'page');
        item.append(link);
        desktopNav.append(item);
        return;
      }
      const toggle = make('button', 'nav-link nav-toggle', entry.label);
      toggle.type = 'button';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', `nav-panel-${index}`);
      if (isCurrent(entry)) toggle.dataset.current = 'true';
      toggle.insertAdjacentHTML('beforeend', '<svg class="chevron" aria-hidden="true"><use href="#chevron"/></svg>');
      const panel = make('div', 'nav-panel');
      panel.id = `nav-panel-${index}`;
      const inner = make('div', 'wrap nav-panel-inner');
      const intro = make('div', 'nav-panel-intro');
      const overview = make('a', 'section-cta', `${entry.label} overview`);
      overview.href = entry.href;
      overview.insertAdjacentHTML('beforeend', ' <svg aria-hidden="true"><use href="#arrow"/></svg>');
      intro.append(make('p', 'eyebrow', entry.label), make('p', 'nav-panel-text', entry.text ?? ''), overview);
      const list = make('ul', 'nav-panel-list');
      entry.items.forEach(sub => { const li = make('li'); li.append(topicLink(sub, 'nav-panel-link')); list.append(li); });
      inner.append(intro, list);
      panel.append(inner);
      item.append(toggle, panel);
      toggle.addEventListener('click', () => (openItem === item ? close(item) : open(item)));
      item.addEventListener('pointerenter', event => {
        if (event.pointerType !== 'mouse' || !finePointer.matches) return;
        clearTimeout(closeTimer);
        openTimer = setTimeout(() => open(item), openItem ? 0 : 90);
      });
      item.addEventListener('pointerleave', event => {
        if (event.pointerType !== 'mouse') return;
        clearTimeout(openTimer);
        closeTimer = setTimeout(() => close(item), 160);
      });
      item.addEventListener('focusout', event => { if (!item.contains(event.relatedTarget)) close(item); });
      panel.addEventListener('click', event => { if (event.target.closest('a')) close(item); });
      desktopNav.append(item);
    });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && openItem) close(openItem, true); });
    document.addEventListener('click', event => { if (openItem && !openItem.contains(event.target)) close(openItem); });
  }
  const mobileNav = $('#mobile-nav');
  if (mobileNav && navigation.length) {
    const keep = [$('#menu-search'), mobileNav.querySelector('[data-university-link]')].filter(Boolean);
    const home = make('a', null, 'Home');
    home.href = 'index.html';
    home.insertAdjacentHTML('beforeend', ' <svg aria-hidden="true"><use href="#arrow"/></svg>');
    const nodes = [home];
    navigation.forEach(entry => {
      const link = make('a', null, entry.label);
      link.href = entry.href;
      link.insertAdjacentHTML('beforeend', ' <svg aria-hidden="true"><use href="#arrow"/></svg>');
      nodes.push(link);
      if (entry.items?.length) {
        const group = make('div', 'menu-sub');
        entry.items.forEach(sub => group.append(topicLink(sub, 'menu-sub-link')));
        nodes.push(group);
      }
    });
    mobileNav.replaceChildren(...nodes, ...keep);
  }
  const footerLinks = $('#footer-links');
  if (footerLinks && navigation.length) {
    const columns = navigation.filter(entry => entry.items?.length).map(entry => {
      const column = make('div', 'footer-column');
      const heading = make('a', 'footer-heading', entry.label);
      heading.href = entry.href;
      const list = make('ul');
      entry.items.forEach(sub => { const li = make('li'); const a = make('a', null, sub.label); a.href = sub.href; li.append(a); list.append(li); });
      column.append(heading, list);
      return column;
    });
    const lab = make('div', 'footer-column');
    const labList = make('ul');
    [['Home', 'index.html'], ...navigation.filter(entry => !entry.items?.length).map(entry => [entry.label, entry.href])].forEach(([label, href]) => {
      const li = make('li'); const a = make('a', null, label); a.href = href; li.append(a); labList.append(li);
    });
    const uni = footerLinks.querySelector('[data-university-link]');
    if (uni) { const li = make('li'); li.append(uni); labList.append(li); }
    if (columns.length) lab.append(make('p', 'footer-heading', 'Laboratory'));
    lab.append(labList);
    footerLinks.replaceChildren(...columns, lab);
  }

  document.querySelectorAll('[data-lab-office]').forEach(node => {
    node.textContent = content.contact?.office ?? '';
    node.hidden = !content.contact?.office;
  });

  const header = $('#site-header');
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, {passive: true});
  onScroll();

  /* ── Professor (main page) ── */
  const professor = content.professor;
  if ($('#professor-portrait')) {
  setText('#professor-name', professor.name);
  setText('#professor-title', professor.title);
  setText('#professor-affiliation', professor.affiliation);
  $('#professor-image').src = professor.image;
  $('#professor-image').alt = professor.imageAlt;
  if (professor.crop) {
    // Show only the portrait area of the supplied image; the source file stays unchanged.
    const crop = professor.crop;
    $('#professor-portrait').style.aspectRatio = `${crop.width} / ${crop.height}`;
    Object.assign($('#professor-image').style, {
      width: `${crop.sourceWidth / crop.width * 100}%`,
      left: `${-crop.x / crop.width * 100}%`,
      top: `${-crop.y / crop.height * 100}%`,
    });
  } else {
    $('#professor-portrait').classList.add('full-portrait');
  }
  list('#professor-careers', professor.careers);
  list('#professor-research', professor.research);
  }

  /* ── Research ── */
  const about = content.about;
  const showUnpublished = content.showUnpublished === true;
  const unpublished = content.unpublished ?? {};
  const areas = [...about.areas, ...(showUnpublished ? unpublished.areas ?? [] : [])];
  const ICONS = ['research', 'circuit', 'waves', 'document'];
  if ($('#about-heading')) {
    setText('#about-eyebrow', about.eyebrow);
    lines($('#about-heading'), about.titleLines, true);
    $('#about-paragraphs').replaceChildren(...about.paragraphs.map(value => make('p', null, value)));
  }
  if ($('#research-areas')) {
  areas.forEach((area, index) => {
    const card = make('a', 'area-card');
    card.href = safeLink(area.link);
    const symbol = ICONS.includes(area.icon) ? area.icon : 'research';
    card.innerHTML = `<div class="area-top"><svg aria-hidden="true"><use href="#${symbol}"/></svg><span>${String(index + 1).padStart(2, '0')}</span></div><h3></h3><p class="area-text"></p><p class="area-meta"></p><span class="area-more">Read more <svg aria-hidden="true"><use href="#arrow"/></svg></span>`;
    card.querySelector('h3').textContent = area.title;
    card.querySelector('.area-text').textContent = area.description;
    card.querySelector('.area-meta').textContent = area.meta ?? '';
    card.querySelector('.area-meta').hidden = !area.meta;
    $('#research-areas').append(card);
  });
  }

  /* ── Page heading (Research and Publications pages) ── */
  const pageText = content.pages?.[document.body.dataset.page];
  if (pageText && $('#page-title')) {
    setText('#page-eyebrow', pageText.eyebrow);
    setText('#page-title', pageText.title);
    setText('#page-lede', pageText.lede);
    $('#page-nav')?.replaceChildren(...(pageText.nav ?? []).map(item => {
      const link = make('a', 'page-chip');
      link.href = item.href;
      if (item.topic) {
        link.dataset.topic = item.topic;
        const dot = make('span', 'topic-dot');
        dot.setAttribute('aria-hidden', 'true');
        link.append(dot);
      }
      link.append(item.label);
      return link;
    }));
    if ($('#page-nav')) $('#page-nav').hidden = !(pageText.nav ?? []).length;
  }

  const doiLink = doi => `https://doi.org/${doi}`;
  function externalLink(text, href, className) {
    const link = make('a', className, text);
    link.href = safeLink(href);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }
  // A figure on a white plate, always shown with its source and licence.
  function figurePlate(figure) {
    const plate = make('figure', 'plate');
    const image = make('img');
    image.src = figure.image;
    image.alt = figure.alt;
    image.loading = 'lazy';
    const caption = make('figcaption');
    caption.append(make('strong', null, figure.caption), `${figure.credit} `);
    if (figure.doi) caption.append(externalLink(`DOI ${figure.doi}`, doiLink(figure.doi)), ' ');
    if (figure.license) caption.append(`· ${figure.license}`);
    plate.append(image, caption);
    return plate;
  }
  if ($('#themes')) (content.themes ?? []).forEach(theme => {
    const block = make('article', 'theme');
    block.id = theme.id;
    if (theme.topic) block.dataset.topic = theme.topic;
    const head = make('div', 'theme-head');
    const titleBox = make('div');
    titleBox.append(make('p', 'eyebrow', theme.eyebrow), make('h3', null, theme.title));
    const intro = make('div', 'theme-intro');
    (theme.intro ?? []).forEach(text => intro.append(make('p', null, text)));
    head.append(titleBox, intro);
    block.append(head);

    const body = make('div', 'theme-body');
    if (theme.figures?.length) {
      const figures = make('div', 'theme-figures');
      theme.figures.forEach(figure => figures.append(figurePlate(figure)));
      body.append(figures);
    } else {
      body.style.gridTemplateColumns = '1fr';
    }
    const detail = make('div');
    if (theme.metrics?.length) {
      const grid = make('div', 'metric-grid');
      theme.metrics.forEach(metric => {
        const card = make('div', 'metric');
        card.append(make('p', 'metric-value', metric.value), make('p', 'metric-label', metric.label), make('p', 'metric-condition', metric.condition));
        grid.append(card);
      });
      detail.append(grid);
    }
    if (theme.timeline?.length) {
      const list = make('ol', 'timeline');
      theme.timeline.forEach(item => {
        const li = make('li');
        const what = make('p', 'tl-what', item.what);
        if (item.doi) what.append(externalLink('DOI', doiLink(item.doi)));
        li.append(make('p', 'tl-when', item.when), what);
        list.append(li);
      });
      detail.append(list);
    }
    if (theme.lineage) detail.append(make('p', 'lineage', theme.lineage));
    if (theme.findings?.length) {
      const findings = make('ol', 'findings');
      theme.findings.forEach(text => findings.append(make('li', null, text)));
      detail.append(findings);
    }
    if (theme.patents?.length) {
      const cards = make('div', 'patent-cards');
      theme.patents.forEach(patent => {
        const card = make('div', 'patent-card');
        const points = make('ul');
        patent.points.forEach(point => points.append(make('li', null, point)));
        card.append(make('p', 'eyebrow', patent.eyebrow), make('h4', null, patent.title), points, make('p', 'patent-meta', patent.holder));
        cards.append(card);
      });
      detail.append(cards);
    }
    if (detail.childElementCount) body.append(detail);
    block.append(body);
    $('#themes').append(block);
  });

  /* ── Research overview as Oxford-style tabs (main page) ── */
  const tabList = $('#topic-tablist');
  if (tabList) {
    const themesById = Object.fromEntries((content.themes ?? []).map(theme => [theme.id, theme]));
    const tabButtons = [];
    const tabPanels = [];
    areas.forEach((area, index) => {
      const theme = themesById[(area.link ?? '').split('#')[1]] ?? {};
      const tab = make('button', 'topic-tab');
      tab.type = 'button';
      tab.id = `topic-tab-${index}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', `topic-panel-${index}`);
      if (area.topic) tab.dataset.topic = area.topic;
      tab.append(make('span', 'topic-tab-number', String(index + 1).padStart(2, '0')), area.title);
      const panel = make('div', 'topic-panel');
      panel.id = `topic-panel-${index}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      if (area.topic) panel.dataset.topic = area.topic;
      const visual = make('div', 'topic-visual');
      if (theme.figures?.length) {
        visual.append(figurePlate(theme.figures[0]));
      } else {
        const card = make('div', 'topic-visual-card');
        card.append(make('p', 'topic-visual-text', area.meta ?? area.title));
        (theme.findings ?? []).slice(0, 2).forEach(text => card.append(make('p', 'topic-visual-note', text)));
        visual.append(card);
      }
      const text = make('div', 'topic-text');
      text.append(make('p', 'eyebrow', theme.eyebrow ?? area.title), make('h3', null, theme.title ?? area.title), make('p', 'topic-lede', theme.intro?.[0] ?? area.description));
      if (area.meta) text.append(make('p', 'area-meta', area.meta));
      const links = make('div', 'topic-links');
      const more = make('a', 'topic-link', 'Read more');
      more.href = safeLink(area.link);
      more.insertAdjacentHTML('beforeend', ' <svg aria-hidden="true"><use href="#arrow"/></svg>');
      links.append(more);
      if (theme.timeline?.length || theme.figures?.[0]?.doi) {
        const papers = make('a', 'topic-link', 'Publications');
        papers.href = 'publications.html';
        papers.insertAdjacentHTML('beforeend', ' <svg aria-hidden="true"><use href="#arrow"/></svg>');
        links.append(papers);
      }
      text.append(links);
      panel.append(visual, text);
      tabList.append(tab);
      $('#topic-panels').append(panel);
      tabButtons.push(tab);
      tabPanels.push(panel);
    });
    function selectTab(index, focus = false) {
      tabButtons.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        tabPanels[i].hidden = !selected;
      });
      if (focus) tabButtons[index].focus();
    }
    tabButtons.forEach((tab, index) => {
      tab.addEventListener('click', () => selectTab(index));
      tab.addEventListener('keydown', event => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        selectTab((index + (event.key === 'ArrowRight' ? 1 : -1) + tabButtons.length) % tabButtons.length, true);
      });
    });
    selectTab(0);
  }

  /* ── Publications, patents, infrastructure ── */
  const publications = content.publications ?? [];
  const publicationItem = item => {
    const li = make('li');
    const text = make('div');
    const meta = make('p', 'pub-meta', `${item.authors}. ${item.venue}. `);
    if (item.doi) meta.append(externalLink(`DOI ${item.doi}`, doiLink(item.doi)));
    text.append(make('p', 'pub-title', item.title), meta);
    li.append(make('span', 'pub-year', item.year), text);
    return li;
  };
  $('#publication-list')?.replaceChildren(...publications.map(publicationItem));
  // Main page: the most recent papers (the list is kept newest first).
  $('#latest-list')?.replaceChildren(...publications.slice(0, Number(content.home?.latestCount) || 3).map(publicationItem));
  if ($('#latest')) $('#latest').hidden = !publications.length;
  $('#patent-list')?.replaceChildren(...(content.registeredPatents ?? []).map(item => {
    const li = make('li');
    li.append(make('p', 'pl-title', item.title), make('p', 'pl-meta', `${item.number} · ${item.date}`));
    return li;
  }));
  setText('#patent-note', content.registeredPatentsNote);
  $('#application-list')?.replaceChildren(...(content.patentApplications ?? []).map(item => {
    const li = make('li');
    li.append(make('p', 'pl-title', item.title), make('p', 'pl-meta', `${item.number} · ${item.date}`));
    return li;
  }));
  setText('#application-note', content.patentApplicationsNote);

  const infra = content.infrastructure;
  if (infra && $('#infrastructure')) {
    if (infra.topic) $('#infrastructure').dataset.topic = infra.topic;
    setText('#infrastructure-eyebrow', infra.eyebrow);
    lines($('#infrastructure-heading'), infra.titleLines, true);
    setText('#infrastructure-summary', infra.summary);
    $('#infrastructure-list').replaceChildren(...infra.rows.map(row => {
      const div = make('div');
      div.append(make('dt', null, row.item), make('dd', null, row.detail));
      return div;
    }));
    if (infra.figure) $('#infrastructure-figure').append(figurePlate(infra.figure));
  } else if ($('#infrastructure')) {
    $('#infrastructure').hidden = true;
  }

  /* ── Members (only when configured) ── */
  const members = content.members ?? [];
  if (members.length && $('#members')) {
    $('#members').hidden = false;
    $('#member-list').replaceChildren(...members.map(member => {
      const li = make('li');
      li.append(make('p', 'member-name', member.name), make('p', 'member-role', member.role));
      if (member.focus) li.append(make('p', 'member-focus', member.focus));
      return li;
    }));
  }

  /* ── Contact ── */
  const contact = content.contact ?? {};
  if ($('#contact-list')) {
  setText('#contact-eyebrow', contact.eyebrow);
  lines($('#contact-heading'), contact.titleLines, true);
  const contactRows = [];
  const addRow = (label, build) => {
    const row = make('div');
    const dd = make('dd');
    build(dd);
    row.append(make('dt', null, label), dd);
    contactRows.push(row);
  };
  if (contact.address?.length) addRow('Address', dd => contact.address.forEach(line => dd.append(make('span', null, line))));
  if (contact.office) addRow('Laboratory', dd => { dd.textContent = contact.office; });
  if (contact.email) addRow('Email', dd => {
    const link = make('a', null, contact.email);
    link.href = `mailto:${contact.email}`;
    dd.append(link);
  });
  if (contact.phone) addRow('Phone', dd => { dd.textContent = contact.phone; });
  $('#contact-list').replaceChildren(...contactRows);
  if (contact.mapUrl) $('#contact-map').href = safeLink(contact.mapUrl);
  else $('#contact-map').hidden = true;
  if (content.join?.text) {
    $('#join-note').hidden = false;
    setText('#join-title', content.join.title);
    setText('#join-text', content.join.text);
  }
  }
  setText('#footer-address', [contact.office, ...(contact.address ?? [])].filter(Boolean).join(', '));

  /* ── Carousel (main page) ── */
  const hero = $('#home');
  let schedule = () => {};
  let startCarousel = () => {};
  let resetTilt = () => {};
  let textAnimations = [];
  let motionOff = false;
  try { motionOff = localStorage.getItem('kmu-motion') === 'off'; } catch {}
  const motionReduced = () => reduced.matches || motionOff;
  if (hero) {
  const slides = [...(content.slides ?? []), ...(showUnpublished ? unpublished.slides ?? [] : [])];
  const interval = Math.max(1000, Number(content.carousel.intervalMs) || 6500);
  let current = 0;
  let userPaused = content.carousel.autoplay === false;
  let hovering = false;
  let focusPaused = false;
  let progress = null;
  const autoplayOn = () => slides.length > 1 && !userPaused && !motionReduced();
  const onHold = () => hovering || focusPaused || document.hidden || !!document.querySelector('dialog[open]');
  const dotButtons = () => [...$('#slide-dots').querySelectorAll('.slide-dot')];

  // The active dot's bar and the line between the Previous/Next strips run together and act as the timer:
  // pausing them keeps the remaining time.
  function startProgress(fill) {
    const timing = {duration: interval, easing: 'linear', fill: 'forwards'};
    const animations = [fill.animate([{transform: 'scaleX(0)'}, {transform: 'scaleX(1)'}], timing)];
    const stripFill = $('#strip-fill');
    if (stripFill) animations.push(stripFill.animate([{transform: 'scaleY(0)'}, {transform: 'scaleY(1)'}], timing));
    animations[0].onfinish = () => { progress = null; showSlide(current + 1); };
    return {
      pause: () => animations.forEach(animation => animation.pause()),
      play: () => animations.forEach(animation => animation.play()),
      cancel: () => animations.forEach(animation => animation.cancel()),
    };
  }
  schedule = function () {
    if (!autoplayOn()) {
      if (progress && userPaused && !motionReduced()) progress.pause();
      else { progress?.cancel(); progress = null; }
    } else if (onHold()) {
      progress?.pause();
    } else if (progress) {
      progress.play();
    } else {
      const fill = dotButtons()[current]?.querySelector('.dot-fill');
      if (fill) progress = startProgress(fill);
    }
    const pause = $('#slide-pause');
    pause.disabled = slides.length < 2 || motionReduced();
    pause.setAttribute('aria-pressed', String(userPaused || motionReduced()));
    $('#pause-icon use').setAttribute('href', userPaused || motionReduced() ? '#play' : '#pause');
    setText('#pause-text', slides.length < 2 ? 'Single slide'
      : motionReduced() ? 'Autoplay off'
      : userPaused ? 'Play slideshow'
      : onHold() && (hovering || focusPaused) ? 'On hold'
      : 'Pause slideshow');
  };

  function swapImage(slide, animate) {
    const image = $('#slide-image');
    const ghost = $('#slide-ghost');
    const fitClass = slide.imageFit === 'contain' ? 'fit-contain' : '';
    if (animate && image.getAttribute('src')) {
      // Crossfade: the outgoing image blurs away while the new one settles in.
      ghost.src = image.src;
      ghost.className = `slide-ghost ${image.className}`;
      ghost.style.objectPosition = image.style.objectPosition;
      ghost.hidden = false;
      ghost.getAnimations().forEach(animation => animation.cancel());
      ghost.animate([{opacity: 1, filter: 'blur(0)'}, {opacity: 0, filter: 'blur(6px)'}], {duration: 420, easing: 'ease', fill: 'forwards'})
        .onfinish = () => { ghost.hidden = true; };
    }
    image.src = slide.image;
    image.alt = slide.imageAlt;
    image.className = fitClass;
    image.style.objectPosition = slide.imagePosition || 'center';
    if (animate) {
      image.animate([{opacity: 0, transform: 'scale(1.035)'}, {opacity: 1, transform: 'scale(1)'}], {duration: 600, easing: EASE_OUT});
    }
  }

  function showSlide(index, manual = false, keyboard = false) {
    if (!slides.length) return;
    const animate = !motionReduced() && !keyboard && hero.dataset.slideIndex !== undefined;
    current = (index + slides.length) % slides.length;
    const slide = slides[current];
    progress?.cancel();
    progress = null;
    textAnimations.forEach(animation => animation.cancel());
    textAnimations = [];

    setText('#slide-eyebrow', slide.eyebrow);
    lines($('#hero-title'), slide.titleLines, true);
    setText('#slide-description', slide.description);
    setText('#slide-figure-label', slide.figureLabel);
    setText('#slide-note-label', slide.noteLabel);
    lines($('#slide-note'), slide.noteLines);
    const origin = slide.imageOrigin === 'lab' ? 'lab' : 'external';
    $('#slide-origin').dataset.origin = origin;
    setText('#slide-origin', origin === 'lab' ? 'Our laboratory' : 'External image');
    swapImage(slide, animate);

    const credit = $('#slide-credit');
    credit.textContent = slide.imageCredit ?? '';
    if (slide.imageSource) credit.href = safeLink(slide.imageSource);
    else credit.removeAttribute('href');
    credit.parentElement.hidden = !slide.imageCredit;
    const license = $('#slide-license');
    license.hidden = !slide.imageLicenseUrl;
    license.textContent = slide.imageLicense || '';
    if (slide.imageLicenseUrl) license.href = safeLink(slide.imageLicenseUrl);
    else license.removeAttribute('href');

    $('#slide-link').href = safeLink(slide.link);
    $('#slide-link span').textContent = slide.linkLabel;
    setText('#slide-current', String(current + 1).padStart(2, '0'));
    hero.dataset.slideIndex = String(current);
    // Each slide may carry its own palette; the hero's colours cross-fade to it.
    refreshTone();
    $('#hero-slide').setAttribute('aria-label', `${current + 1} of ${slides.length}`);
    dotButtons().forEach((button, i) => {
      button.classList.toggle('active', i === current);
      button.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
    if (manual) setText('#slide-announcement', `${current + 1} / ${slides.length}: ${slide.titleLines.join(' ')}`);

    if (animate) {
      ['#slide-eyebrow', '#hero-title', '#slide-description', '#slide-note'].forEach((selector, i) => {
        textAnimations.push($(selector).animate(
          [{opacity: 0, transform: 'translateY(10px)', filter: 'blur(3px)'}, {opacity: 1, transform: 'none', filter: 'blur(0)'}],
          {duration: 420, delay: i * 45, easing: EASE_OUT, fill: 'backwards'}));
      });
    }
    schedule();
  }

  setText('#slide-total', String(slides.length).padStart(2, '0'));
  $('#slide-dots').style.gridTemplateColumns = `repeat(${Math.max(1, slides.length)}, minmax(0, 1fr))`;
  slides.forEach((slide, index) => {
    new Image().src = slide.image;
    const button = make('button', 'slide-dot', slide.topic || `Story ${index + 1}`);
    button.type = 'button';
    button.setAttribute('aria-label', `Slide ${index + 1}: ${slide.titleLines.join(' ')}`);
    button.dataset.number = String(index + 1).padStart(2, '0');
    if (slide.accent) button.dataset.topic = slide.accent;
    const track = make('span', 'dot-track');
    track.setAttribute('aria-hidden', 'true');
    track.append(make('span', 'dot-fill'));
    button.prepend(track);
    button.addEventListener('click', event => showSlide(index, true, event.detail === 0));
    $('#slide-dots').append(button);
  });
  ['#slide-prev', '#slide-prev-compact'].forEach(selector => {
    $(selector).disabled = slides.length < 2;
    $(selector).addEventListener('click', event => showSlide(current - 1, true, event.detail === 0));
  });
  ['#slide-next', '#slide-next-compact'].forEach(selector => {
    $(selector).disabled = slides.length < 2;
    $(selector).addEventListener('click', event => showSlide(current + 1, true, event.detail === 0));
  });
  $('#slide-pause').addEventListener('click', () => {
    userPaused = !userPaused;
    // Explicit Play overrides the current focus/hover hold, including persistent touch focus.
    if (!userPaused) { focusPaused = false; hovering = false; }
    schedule();
  });
  hero.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse' && finePointer.matches) { hovering = true; schedule(); }
  });
  hero.addEventListener('pointerleave', () => { hovering = false; schedule(); });
  hero.addEventListener('focusin', () => { focusPaused = true; schedule(); });
  hero.addEventListener('focusout', () => {
    queueMicrotask(() => { focusPaused = hero.contains(document.activeElement); schedule(); });
  });
  document.addEventListener('visibilitychange', schedule);

  /* ── Depth: spring tilt on the layered visual (decorative, precise pointers only) ── */
  const stage = $('#photo-stage');
  const visual = $('.hero-visual');
  class Spring {
    constructor({damping = 1, response = 0.5} = {}) {
      this.x = 0; this.v = 0; this.target = 0;
      this.k = (2 * Math.PI / response) ** 2;
      this.c = 4 * Math.PI * damping / response;
    }
    step(dt) {
      this.v += (-this.k * (this.x - this.target) - this.c * this.v) * dt;
      this.x += this.v * dt;
      return Math.abs(this.v) > 1e-3 || Math.abs(this.x - this.target) > 1e-3;
    }
  }
  const tiltX = new Spring({damping: 0.9, response: 0.55});
  const tiltY = new Spring({damping: 0.9, response: 0.55});
  let frame = 0;
  let last = 0;
  function tick(time) {
    const dt = Math.min(0.032, (time - last) / 1000 || 0.016);
    last = time;
    const moving = tiltX.step(dt) | tiltY.step(dt);
    stage.style.transform = `rotateX(${tiltX.x.toFixed(3)}deg) rotateY(${tiltY.x.toFixed(3)}deg)`;
    frame = moving ? requestAnimationFrame(tick) : 0;
  }
  function aim(x, y) {
    tiltX.target = x;
    tiltY.target = y;
    if (!frame) { last = performance.now(); frame = requestAnimationFrame(tick); }
  }
  visual.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !finePointer.matches || motionReduced()) return;
    const rect = visual.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    aim(-ny * 6, nx * 8);
  });
  visual.addEventListener('pointerleave', () => { if (!motionReduced()) aim(0, 0); });
  resetTilt = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    tiltX.x = tiltY.x = tiltX.target = tiltY.target = 0;
    stage.style.transform = '';
  };
  refreshTone = () => {
    const tone = forcedTone || slides[current]?.tone;
    if (tone) hero.dataset.tone = tone;
    else delete hero.dataset.tone;
  };
  startCarousel = () => {
    showSlide(0, false, true);
    if (!slides.length) {
      $('#hero-slide').hidden = true;
      $('.hero-visual').hidden = true;
      $('.hero-bottom').hidden = true;
    }
  };
  }

  /* ── Motion preference ── */
  function syncMotion() {
    root.dataset.motion = motionReduced() ? 'off' : 'on';
    const toggle = $('#motion-toggle');
    toggle.textContent = reduced.matches ? 'Motion: reduced' : `Motion: ${motionOff ? 'off' : 'on'}`;
    toggle.setAttribute('aria-pressed', String(motionReduced()));
    toggle.disabled = reduced.matches;
    if (motionReduced()) {
      textAnimations.forEach(animation => animation.cancel());
      resetTilt();
    }
    schedule();
  }
  $('#motion-toggle').addEventListener('click', () => {
    motionOff = !motionOff;
    try { localStorage.setItem('kmu-motion', motionOff ? 'off' : 'on'); } catch {}
    syncMotion();
  });
  reduced.addEventListener('change', syncMotion);
  syncMotion();
  startCarousel();

  document.addEventListener('keydown', () => { root.dataset.input = 'keyboard'; });
  document.addEventListener('pointerdown', () => { root.dataset.input = 'pointer'; });

  /* ── Search ── */
  const searchIndex = [
    {title: `${professor.name} ${professor.title}`, description: professor.affiliation, href: 'index.html#professor', keywords: ['professor faculty', ...professor.careers, ...professor.research].join(' ')},
    {title: 'Research', description: site.name, href: 'research.html', keywords: ['laboratory introduction about', ...about.paragraphs].join(' ')},
    ...(content.themes ?? []).map(theme => ({title: theme.title, description: theme.eyebrow, href: `research.html#${theme.id}`, keywords: [...(theme.intro ?? []), ...(theme.findings ?? []), ...(theme.metrics ?? []).map(m => `${m.value} ${m.label} ${m.condition}`), ...(theme.timeline ?? []).map(t => `${t.when} ${t.what}`), ...(theme.patents ?? []).map(p => `${p.title} ${p.eyebrow} ${p.points.join(' ')}`)].join(' ')})),
    ...publications.map(item => ({title: item.title, description: `${item.year} · ${item.venue}`, href: 'publications.html', keywords: `publication paper journal ${item.authors} ${item.doi}`})),
    ...(content.registeredPatents ?? []).map(item => ({title: item.title, description: `${item.number} · ${item.date}`, href: 'publications.html#patent-list-heading', keywords: 'patent registered'})),
    ...(infra ? [{title: 'Research infrastructure', description: infra.summary, href: 'research.html#infrastructure', keywords: infra.rows.map(row => `${row.item} ${row.detail}`).join(' ')}] : []),
    ...members.map(member => ({title: member.name, description: member.role, href: 'index.html#members', keywords: `members people ${member.focus || ''}`})),
    {title: 'Contact', description: [contact.office, ...(contact.address ?? [])].filter(Boolean).join(', '), href: 'index.html#contact', keywords: `contact address location visit map room office mirae ${contact.email || ''}`},
  ];


  function renderResults() {
    const terms = $('#search-input').value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const matches = searchIndex.filter(item => terms.every(term => `${item.title} ${item.description} ${item.keywords}`.toLowerCase().includes(term)));
    const results = $('#search-results');
    results.replaceChildren();
    if (!matches.length) {
      results.append(make('p', 'search-empty', 'No results found. Try “Park”, “synthesizer” or “ladder”.'));
      return;
    }
    matches.forEach(item => {
      const link = make('a', 'search-result');
      link.href = safeLink(item.href);
      const title = make('span', null, item.title);
      title.append(make('small', null, item.description));
      const arrow = make('span', null, '↗');
      arrow.setAttribute('aria-hidden', 'true');
      link.append(title, arrow);
      link.addEventListener('click', () => $('#search-dialog').close());
      results.append(link);
    });
  }
  function openSearch() {
    $('#search-input').value = '';
    renderResults();
    $('#search-dialog').showModal();
    $('#search-input').focus();
    schedule();
  }
  $('#search-open').addEventListener('click', openSearch);
  $('#menu-search').addEventListener('click', () => { $('#menu-dialog').close(); openSearch(); });
  $('#menu-open').addEventListener('click', () => { $('#menu-dialog').showModal(); schedule(); });
  $('#search-input').addEventListener('input', renderResults);
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Escape') { event.preventDefault(); dialog.close(); }
    });
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', schedule);
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) dialog.close();
    });
  });
  $('#menu-dialog').querySelectorAll('a').forEach(link => link.addEventListener('click', () => $('#menu-dialog').close()));
})();
