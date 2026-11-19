/* Family Archive 5. The password is not present in these website files. */
(function () {
  'use strict';
  const el = id => document.getElementById(id);
  const INLINE = !!el('encryptedPayload');
  const words = {
    en: {
      brand: 'Family archive', collection: 'THE HOERANDNER FAMILY COLLECTION',
      headline: 'Every name.', headlineEm: 'Every generation.',
      intro: 'A shared history, carefully preserved. Explore the people, places and connections that make our family story.',
      passphrase: 'Family password', show: 'Show', hide: 'Hide', unlock: 'Enter the family tree',
      passwordHint: 'Please use the password shared with your family. It is case-sensitive.',
      private: 'Private collection', encrypted: 'Family records and photographs are encrypted.',
      motto: 'Names preserved. Stories connected.', artLabel: 'OUR FAMILY CREST',
      footer: 'Preserving our past. Connecting our family.', languages: 'ENGLISH & DEUTSCH',
      working: 'Unlocking the family archive...', opening: 'Preparing your family tree...',
      wrong: 'That password did not unlock the archive. Please check it and try again.',
      network: 'The encrypted archive could not be loaded. Check your connection and try again.',
      corrupt: 'The archive file could not be read. Please use the complete, latest website package.',
      startup: 'The family tree could not start. Please reload the page and try again.',
      secure: 'This preview cannot unlock the archive. Open the downloaded HTML in Chrome, Edge, Firefox or Safari, or visit the HTTPS website.',
      modern: 'Please use a current browser. This browser cannot decompress the encrypted archive.',
      crestError: 'Choose a PNG, JPG or WebP image smaller than 8 MB.',
      lock: 'Lock archive', passwordPlaceholder: 'Enter family password'
    },
    de: {
      brand: 'Familienarchiv', collection: 'DIE FAMILIENSAMMLUNG HOERANDNER',
      headline: 'Jeder Name.', headlineEm: 'Jede Generation.',
      intro: 'Eine gemeinsame Geschichte, sorgf\u00e4ltig bewahrt. Entdecken Sie die Menschen, Orte und Verbindungen, die unsere Familie ausmachen.',
      passphrase: 'Familienpasswort', show: 'Anzeigen', hide: 'Verbergen', unlock: 'Stammbaum \u00f6ffnen',
      passwordHint: 'Bitte das mit der Familie geteilte Passwort eingeben. Gro\u00df- und Kleinschreibung beachten.',
      private: 'Private Sammlung', encrypted: 'Familiendaten und Fotos sind verschl\u00fcsselt.',
      motto: 'Namen bewahren. Geschichten verbinden.', artLabel: 'UNSER FAMILIENWAPPEN',
      footer: 'Vergangenheit bewahren. Familie verbinden.', languages: 'DEUTSCH & ENGLISH',
      working: 'Das Familienarchiv wird entsperrt...', opening: 'Der Stammbaum wird vorbereitet...',
      wrong: 'Dieses Passwort konnte das Archiv nicht entsperren. Bitte pr\u00fcfen und erneut versuchen.',
      network: 'Das verschl\u00fcsselte Archiv konnte nicht geladen werden. Bitte Verbindung pr\u00fcfen und erneut versuchen.',
      corrupt: 'Die Archivdatei konnte nicht gelesen werden. Bitte das vollst\u00e4ndige, aktuelle Website-Paket verwenden.',
      startup: 'Der Stammbaum konnte nicht gestartet werden. Bitte die Seite neu laden und erneut versuchen.',
      secure: 'Diese Vorschau kann das Archiv nicht entsperren. Die heruntergeladene HTML-Datei in Chrome, Edge, Firefox oder Safari \u00f6ffnen oder die HTTPS-Website aufrufen.',
      modern: 'Bitte einen aktuellen Browser verwenden. Dieser Browser kann das verschl\u00fcsselte Archiv nicht entpacken.',
      crestError: 'Bitte PNG, JPG oder WebP mit weniger als 8 MB ausw\u00e4hlen.',
      lock: 'Archiv sperren', passwordPlaceholder: 'Familienpasswort eingeben'
    }
  };
  let lang = 'en', started = false, busy = false, errorKey = '', statusKey = '', cachedBundle = null;
  try { if (localStorage.getItem('hor_lang') === 'de') lang = 'de'; } catch (_) {}
  const t = k => words[lang][k] || k;
  function setLang(l) {
    lang = l === 'de' ? 'de' : 'en';
    document.documentElement.lang = lang;
    document.title = (lang === 'de' ? 'Familienarchiv' : 'Family Archive') + ' | Hoerandner';
    document.querySelectorAll('[data-shell]').forEach(n => { n.textContent = t(n.dataset.shell); });
    for (const [id, value] of [['shellEn', 'en'], ['shellDe', 'de']]) {
      el(id).classList.toggle('selected', lang === value);
      el(id).setAttribute('aria-pressed', String(lang === value));
    }
    el('archivePassword').placeholder = t('passwordPlaceholder');
    el('togglePassword').textContent = t(el('archivePassword').type === 'password' ? 'show' : 'hide');
    el('shellError').textContent = errorKey ? t(errorKey) : '';
    el('shellStatus').textContent = statusKey ? t(statusKey) : '';
    el('unlockLabel').textContent = t(busy ? 'working' : 'unlock');
    try { localStorage.setItem('hor_lang', lang); } catch (_) {}
    applyBranding();
  }
  window.setShellLanguage = setLang;
  el('shellEn').addEventListener('click', () => setLang('en'));
  el('shellDe').addEventListener('click', () => setLang('de'));
  const validCrest = v => typeof v === 'string' && /^data:image\/(?:png|jpeg|webp);base64,[a-zA-Z0-9+/=]+$/.test(v) && v.length < 11500000;
  const builtInBranding = JSON.parse(el('brandingConfig').textContent);
  window.familyArchiveBranding = builtInBranding;
  // Do not replace the embedded original with an older version's saved artwork.
  function applyBranding() {
    const src = window.familyArchiveBranding?.crestDataUrl;
    const valid = validCrest(src);
    document.querySelectorAll('[data-crest-image]').forEach(img => {
      img.hidden = !valid;
      if (valid && img.getAttribute('src') !== src) img.src = src;
      if (!valid) img.removeAttribute('src');
      img.alt = lang === 'de' ? 'Original-Familienwappen Hoerandner' : 'Original Hoerandner family crest';
    });
    document.querySelectorAll('[data-crest-placeholder]').forEach(n => { n.hidden = valid; });
  }
  window.applyArchiveBranding = applyBranding;
  window.setArchiveBranding = function (b) {
    window.familyArchiveBranding = validCrest(b?.crestDataUrl) ? { crestDataUrl: b.crestDataUrl } : builtInBranding;
    applyBranding();
  };
  window.importArchiveCrest = async function (file) {
    if (!/^image\/(png|jpeg|webp)$/.test(file.type) || file.size > 8 * 1024 * 1024) throw Error('crestError');
    const src = await new Promise((resolve, reject) => {
      const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = reject; r.readAsDataURL(file);
    });
    await new Promise((resolve, reject) => {
      const i = new Image(); i.onload = () => i.naturalWidth > 0 ? resolve() : reject(); i.onerror = reject; i.src = src;
    });
    window.setArchiveBranding({ crestDataUrl: src });
  };
  function setBusy(value) {
    busy = value;
    el('unlockButton').disabled = value;
    el('archivePassword').disabled = value;
    el('unlockForm').setAttribute('aria-busy', String(value));
    el('unlockLabel').textContent = t(value ? 'working' : 'unlock');
  }
  function status(key) { statusKey = key; el('shellStatus').textContent = key ? t(key) : ''; }
  function fail(key) { errorKey = key; el('shellError').textContent = key ? t(key) : ''; }
  el('togglePassword').addEventListener('click', () => {
    const p = el('archivePassword');
    p.type = p.type === 'password' ? 'text' : 'password';
    el('togglePassword').textContent = t(p.type === 'password' ? 'show' : 'hide');
    el('togglePassword').setAttribute('aria-pressed', String(p.type === 'text'));
  });
  el('archivePassword').addEventListener('input', () => { if (errorKey) fail(''); });
  function b64(text) {
    const raw = atob(text.trim()); const out = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
    return out;
  }
  async function loadBundle() {
    if (cachedBundle) return cachedBundle;
    cachedBundle = (async () => {
      if (INLINE) return { config: JSON.parse(el('encryptedConfig').textContent), bytes: b64(el('encryptedPayload').textContent) };
      const abort = new AbortController(); const timer = setTimeout(() => abort.abort(), 90000);
      try {
        const [r, c] = await Promise.all([
          fetch('./assets/archive-config.json', { cache: 'no-store', signal: abort.signal }),
          fetch('./assets/archive.enc', { cache: 'no-store', signal: abort.signal })
        ]);
        if (!r.ok || !c.ok) throw Error('network');
        return { config: await r.json(), bytes: await c.arrayBuffer() };
      } catch (_) { throw Error('network'); }
      finally { clearTimeout(timer); }
    })();
    try { return await cachedBundle; }
    catch (e) { cachedBundle = null; throw e; }
  }
  function validateConfig(c) {
    if (c.version !== 5 || c.algorithm !== 'AES-GCM' || c.kdf !== 'PBKDF2-SHA256' ||
        c.iterations !== 600000 || c.tagLength !== 128 || c.additionalData !== 'FamilyArchive-v5' ||
        c.compression !== 'gzip' || b64(c.salt).length !== 16 || b64(c.iv).length !== 12) throw Error('corrupt');
  }
  window.lockFamilyArchive = function () {
    // Remove rendered private information before reloading to discard the decrypted session.
    document.querySelectorAll('dialog[open]').forEach(d => d.close());
    el('appRoot').hidden = true;
    el('appRoot').replaceChildren();
    el('archiveWelcome').hidden = false;
    el('archivePassword').value = '';
    el('archivePassword').type = 'password';
    document.documentElement.classList.add('archive-locked');
    location.reload();
  };
  window.showArchiveWelcome = window.lockFamilyArchive;
  el('unlockForm').addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || started) return;
    fail(''); status('');
    if (!window.crypto?.subtle) { fail('secure'); return; }
    if (typeof DecompressionStream === 'undefined') { fail('modern'); return; }
    let password = el('archivePassword').value;
    if (!password) { el('archivePassword').focus(); return; }
    el('archivePassword').value = '';
    el('archivePassword').type = 'password';
    el('togglePassword').textContent = t('show');
    el('togglePassword').setAttribute('aria-pressed', 'false');
    setBusy(true); status('working');
    let decrypted, decoded;
    try {
      const bundle = await loadBundle(); validateConfig(bundle.config);
      const encoder = new TextEncoder();
      const passwordBytes = encoder.encode(password); password = '';
      const material = await crypto.subtle.importKey('raw', passwordBytes, 'PBKDF2', false, ['deriveKey']);
      passwordBytes.fill(0);
      const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt: b64(bundle.config.salt), iterations: bundle.config.iterations }, material, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
      try {
        decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(bundle.config.iv), additionalData: encoder.encode(bundle.config.additionalData), tagLength: 128 }, key, bundle.bytes);
      } catch (_) { throw Error('wrong'); }
      status('opening');
      try {
        const stream = new Blob([decrypted]).stream().pipeThrough(new DecompressionStream('gzip'));
        decoded = await new Response(stream).arrayBuffer();
        const payload = JSON.parse(new TextDecoder().decode(decoded));
        if (!Array.isArray(payload.data?.people) || !Array.isArray(payload.data?.families) || !payload.photos) throw Error('corrupt');
        el('archiveWelcome').hidden = true;
        el('appRoot').hidden = false;
        document.documentElement.classList.remove('archive-locked');
        try { window.startFamilyArchive(payload, { encrypted: true }); }
        catch (_) { throw Error('startup'); }
        started = true;
        applyBranding(); status('');
        window.dispatchEvent(new Event('resize'));
        el('searchInput')?.focus({ preventScroll: true });
        // Do not open the software keyboard automatically on small touch screens.
        if (window.matchMedia('(pointer: coarse)').matches) document.activeElement?.blur();
      } catch (e) { throw Error(e.message === 'startup' ? 'startup' : 'corrupt'); }
    } catch (e) {
      el('appRoot').hidden = true;
      el('appRoot').replaceChildren();
      el('archiveWelcome').hidden = false;
      document.documentElement.classList.add('archive-locked');
      status(''); fail(['network', 'wrong', 'corrupt', 'startup'].includes(e.message) ? e.message : 'wrong');
    } finally {
      password = '';
      if (decrypted) new Uint8Array(decrypted).fill(0);
      if (decoded) new Uint8Array(decoded).fill(0);
      setBusy(false);
      if (!started) el('archivePassword').focus();
    }
  });
  // A restored browser-history page must not reopen the unlocked tree.
  window.addEventListener('pagehide', () => {
    if (started) { el('appRoot').hidden = true; el('archiveWelcome').hidden = false; }
    el('archivePassword').value = '';
  });
  window.addEventListener('pageshow', e => {
    if (e.persisted && started) window.lockFamilyArchive();
    if (!started) el('archivePassword').value = '';
  });
  document.documentElement.classList.add('archive-locked');
  setLang(lang);
})();
