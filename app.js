const input = document.querySelector('#barcode-input');
const list = document.querySelector('#barcode-list');
const showText = document.querySelector('#show-text');
const sizeSelect = document.querySelector('#barcode-size');
const colorInput = document.querySelector('#bar-color');
const colorLabel = document.querySelector('#color-label');
const count = document.querySelector('#char-count');
const error = document.querySelector('#error-message');
const valuePreview = document.querySelector('#value-preview');
const emptyState = document.querySelector('#preview-empty');
const toast = document.querySelector('#toast');
const languageSelect = document.querySelector('#language-select');
const themeToggle = document.querySelector('#theme-toggle');
let toastTimer;
let currentValues = [];
const translations = {
  ru: {
    browser: 'Работает прямо в браузере', eyebrow: 'ИНСТРУМЕНТ ДЛЯ CODE 128', hero: 'Штрихкод.<br><span>Без лишнего.</span>', intro: 'Введите данные — и получите готовый Code 128.<br class="desktop-break"> Бесплатно, быстро, без регистрации.',
    your_data: 'Ваши данные', one_line: 'ОДНА СТРОКА — ОДИН КОД', input_hint: 'Пустые строки пропускаются · до 80 символов в строке', show_value: 'Показывать значение', under_barcode: 'Под штрихкодом', barcode_size: 'Размер штрихкода', size_caption: 'Для предпросмотра и экспорта', small: 'Компактный', medium: 'Стандартный', large: 'Крупный', barcode_color: 'Цвет штрихкода', choose_shade: 'Выберите оттенок', try_example: 'Попробовать пример', result: 'Результат', empty: 'Введите данные, чтобы создать штрихкод', in_set: 'В НАБОРЕ', download_svg: 'Скачать лист SVG', download_png: 'Скачать лист PNG', format_note: 'Все штрихкоды из списка будут на одном листе.', bottom_note: 'Code 128 автоматически подбирает наиболее компактный формат кодирования.<br class="desktop-break"> Подходит для инвентаря, посылок и маркировки товаров.', footer_left: 'Сделано просто.', footer_right: 'Штрихкоды не покидают ваш браузер', developer: 'Разработчик', privacy_link: 'Конфиденциальность',
    max_codes: 'Максимум 30 кодов за один раз. Удалите лишние строки.', line_too_long: 'В одной строке может быть не больше 80 символов.', invalid: 'Не удалось создать один из штрихкодов. Используйте печатные символы.', fix_list: 'Исправьте список кодов перед скачиванием', svg_ready: 'SVG-лист готов к скачиванию', png_ready: 'PNG-лист готов к скачиванию', png_error: 'Не удалось подготовить PNG', clear: 'Очистить поле', color_aria: 'Цвет штрихкода', size_aria: 'Размер штрихкода', show_aria: 'Показывать значение под штрихкодом', theme_dark: 'Включить тёмную тему', theme_light: 'Включить светлую тему',
  },
  pl: {
    browser: 'Działa bezpośrednio w przeglądarce', eyebrow: 'GENERATOR KODÓW CODE 128', hero: 'Kod kreskowy.<br><span>Bez zbędnych dodatków.</span>', intro: 'Wpisz dane i utwórz kod Code 128.<br class="desktop-break"> Bezpłatnie, szybko i bez rejestracji.',
    your_data: 'Twoje dane', one_line: 'JEDEN WIERSZ — JEDEN KOD', input_hint: 'Puste wiersze są pomijane · maks. 80 znaków w wierszu', show_value: 'Pokaż wartość', under_barcode: 'Pod kodem kreskowym', barcode_size: 'Rozmiar kodu', size_caption: 'Podgląd i eksport', small: 'Kompaktowy', medium: 'Standardowy', large: 'Duży', barcode_color: 'Kolor kodu', choose_shade: 'Wybierz kolor', try_example: 'Wypróbuj przykład', result: 'Wynik', empty: 'Wpisz dane, aby utworzyć kod kreskowy', in_set: 'W ZESTAWIE', download_svg: 'Pobierz arkusz SVG', download_png: 'Pobierz arkusz PNG', format_note: 'Wszystkie kody z listy znajdą się na jednym arkuszu.', bottom_note: 'Code 128 automatycznie wybiera najbardziej kompaktowy sposób kodowania.<br class="desktop-break"> Nadaje się do inwentaryzacji, przesyłek i oznaczania produktów.', footer_left: 'Prosto i wygodnie.', footer_right: 'Kody kreskowe nie opuszczają przeglądarki', developer: 'Autor', privacy_link: 'Prywatność',
    max_codes: 'Możesz wygenerować maksymalnie 30 kodów naraz. Usuń nadmiarowe wiersze.', line_too_long: 'Jeden wiersz może zawierać maksymalnie 80 znaków.', invalid: 'Nie udało się utworzyć jednego z kodów. Użyj drukowalnych znaków.', fix_list: 'Popraw listę kodów przed pobraniem', svg_ready: 'Arkusz SVG jest gotowy do pobrania', png_ready: 'Arkusz PNG jest gotowy do pobrania', png_error: 'Nie udało się przygotować PNG', clear: 'Wyczyść pole', color_aria: 'Kolor kodu kreskowego', size_aria: 'Rozmiar kodu kreskowego', show_aria: 'Pokaż wartość pod kodem kreskowym', theme_dark: 'Włącz ciemny motyw', theme_light: 'Włącz jasny motyw',
  },
  en: {
    browser: 'Runs right in your browser', eyebrow: 'CODE 128 GENERATOR', hero: 'Barcodes.<br><span>Nothing extra.</span>', intro: 'Enter your data and create a Code 128 barcode.<br class="desktop-break"> Free, fast, and no sign-up required.',
    your_data: 'Your data', one_line: 'ONE LINE — ONE CODE', input_hint: 'Blank lines are skipped · up to 80 characters per line', show_value: 'Show value', under_barcode: 'Below the barcode', barcode_size: 'Barcode size', size_caption: 'Preview and export', small: 'Compact', medium: 'Standard', large: 'Large', barcode_color: 'Barcode color', choose_shade: 'Choose a color', try_example: 'Try an example', result: 'Result', empty: 'Enter data to create a barcode', in_set: 'IN THIS SET', download_svg: 'Download SVG sheet', download_png: 'Download PNG sheet', format_note: 'All barcodes in the list will be placed on one sheet.', bottom_note: 'Code 128 automatically chooses a compact encoding format.<br class="desktop-break"> Great for inventory, parcels, and product labels.', footer_left: 'Made simple.', footer_right: 'Barcodes stay in your browser', developer: 'Developer', privacy_link: 'Privacy',
    max_codes: 'You can generate up to 30 codes at a time. Remove extra lines.', line_too_long: 'Each line can contain up to 80 characters.', invalid: 'Could not create one of the barcodes. Use printable characters.', fix_list: 'Fix the code list before downloading', svg_ready: 'SVG sheet is ready to download', png_ready: 'PNG sheet is ready to download', png_error: 'Could not prepare the PNG', clear: 'Clear field', color_aria: 'Barcode color', size_aria: 'Barcode size', show_aria: 'Show value below barcode', theme_dark: 'Switch to dark theme', theme_light: 'Switch to light theme',
  },
};

function t(key) {
  return translations[languageSelect.value]?.[key] || translations.ru[key] || key;
}

function applyLanguage() {
  const lang = languageSelect.value;
  document.documentElement.lang = lang;
  document.title = lang === 'pl' ? 'Code 128 — generator kodów kreskowych' : lang === 'en' ? 'Code 128 — barcode generator' : 'Code 128 — генератор штрихкодов';
  document.querySelector('meta[name="theme-color"]').content = document.documentElement.dataset.theme === 'dark' ? '#17151b' : '#f7f4fa';
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[lang][key]) element.innerHTML = translations[lang][key];
  });
  document.querySelector('#hero-title').innerHTML = t('hero');
  document.querySelector('#barcode-input').setAttribute('aria-label', t('one_line'));
  document.querySelector('#clear-button').setAttribute('aria-label', t('clear'));
  colorInput.setAttribute('aria-label', t('color_aria'));
  sizeSelect.setAttribute('aria-label', t('size_aria'));
  showText.setAttribute('aria-label', t('show_aria'));
  const themeLabel = document.documentElement.dataset.theme === 'dark' ? t('theme_light') : t('theme_dark');
  themeToggle.setAttribute('aria-label', themeLabel);
  themeToggle.title = themeLabel;
  renderBarcodes();
}

function getValues() {
  return input.value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function formatCount(number) {
  if (languageSelect.value === 'en') return `${number} barcode${number === 1 ? '' : 's'}`;
  if (languageSelect.value === 'pl') {
    const lastTwo = number % 100;
    const last = number % 10;
    const word = last === 1 && number !== 1 ? 'kodów' : lastTwo >= 12 && lastTwo <= 14 ? 'kodów' : last >= 2 && last <= 4 ? 'kody' : number === 1 ? 'kod' : 'kodów';
    return `${number} ${word}`;
  }
  const lastTwo = number % 100;
  const last = number % 10;
  const word = lastTwo >= 11 && lastTwo <= 14 ? 'штрихкодов' : last === 1 ? 'штрихкод' : last >= 2 && last <= 4 ? 'штрихкода' : 'штрихкодов';
  return `${number} ${word}`;
}

function makeBarcode(value, options = {}) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const sizes = {
    small: { width: 1.3, height: 44, margin: 6, fontSize: 9, textMargin: 4 },
    medium: { width: 2, height: 72, margin: 8, fontSize: 11, textMargin: 6 },
    large: { width: 3.9, height: 135, margin: 13, fontSize: 18, textMargin: 10 },
  };
  JsBarcode(svg, value, {
    format: 'CODE128',
    lineColor: colorInput.value,
    background: '#ffffff',
    ...sizes[sizeSelect.value],
    displayValue: showText.checked,
    font: 'DM Mono',
    fontOptions: 'normal',
    ...options,
  });
  return svg;
}

function renderBarcodes() {
  const values = getValues();
  currentValues = values;
  count.textContent = values.length;
  valuePreview.textContent = formatCount(values.length);
  colorLabel.textContent = colorInput.value.toUpperCase();
  list.replaceChildren();

  if (!values.length) {
    error.textContent = '';
    list.hidden = true;
    emptyState.hidden = false;
    return false;
  }
  if (values.length > 30) {
    error.textContent = t('max_codes');
    list.hidden = true;
    emptyState.hidden = false;
    return false;
  }
  const longLine = values.find((value) => value.length > 80);
  if (longLine) {
    error.textContent = t('line_too_long');
    list.hidden = true;
    emptyState.hidden = false;
    return false;
  }

  try {
    values.forEach((value, index) => {
      const row = document.createElement('div');
      row.className = 'barcode-item';
      const number = document.createElement('span');
      number.className = 'barcode-index';
      number.textContent = String(index + 1).padStart(2, '0');
      const svg = makeBarcode(value);
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', `Штрихкод ${index + 1}: ${value}`);
      const holder = document.createElement('div');
      holder.className = 'barcode-item-graphic';
      holder.append(svg);
      const caption = document.createElement('span');
      caption.className = 'barcode-item-value';
      caption.textContent = value;
      row.append(number, holder, caption);
      list.append(row);
    });
    list.hidden = false;
    emptyState.hidden = true;
    error.textContent = '';
    return true;
  } catch {
    list.replaceChildren();
    list.hidden = true;
    emptyState.hidden = false;
    error.textContent = t('invalid');
    return false;
  }
}

function buildSheet() {
  const sheet = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  sheet.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  sheet.setAttribute('role', 'img');
  sheet.setAttribute('aria-label', 'Лист штрихкодов Code 128');
  const rows = currentValues.map((value) => makeBarcode(value));
  const dimensions = rows.map((svg) => {
    const viewBox = (svg.getAttribute('viewBox') || '').trim().split(/[\s,]+/).map(Number);
    return {
      width: viewBox.length === 4 && viewBox[2] > 0 ? viewBox[2] : Number.parseFloat(svg.getAttribute('width')),
      height: viewBox.length === 4 && viewBox[3] > 0 ? viewBox[3] : Number.parseFloat(svg.getAttribute('height')),
      viewBox: viewBox.length === 4 ? viewBox.join(' ') : `0 0 ${svg.getAttribute('width')} ${svg.getAttribute('height')}`,
    };
  });
  const top = 20;
  const labelHeight = 16;
  const gap = 28;
  const bottom = 20;
  const contentHeight = dimensions.reduce((sum, item) => sum + labelHeight + item.height, 0);
  const totalHeight = top + contentHeight + gap * (rows.length - 1) + bottom;
  const width = Math.max(900, ...dimensions.map((item) => item.width + 48));
  sheet.setAttribute('width', String(width));
  sheet.setAttribute('height', String(totalHeight));
  sheet.setAttribute('viewBox', `0 0 ${width} ${totalHeight}`);

  const background = document.createElementNS(sheet.namespaceURI, 'rect');
  background.setAttribute('width', '100%');
  background.setAttribute('height', '100%');
  background.setAttribute('fill', '#ffffff');
  sheet.append(background);
  let y = top;
  rows.forEach((svg, index) => {
    const label = document.createElementNS(sheet.namespaceURI, 'text');
    label.setAttribute('x', '24');
    label.setAttribute('y', String(y + 11));
    label.setAttribute('fill', '#777777');
    label.setAttribute('font-family', 'monospace');
    label.setAttribute('font-size', '10');
    label.textContent = String(index + 1).padStart(2, '0');
    sheet.append(label);

    // Keep every barcode inside its own SVG viewport so its coordinates cannot
    // overlap with the next barcode when the sheet is opened or rasterized.
    const item = document.createElementNS(sheet.namespaceURI, 'svg');
    item.setAttribute('x', '24');
    item.setAttribute('y', String(y + labelHeight));
    item.setAttribute('width', String(dimensions[index].width));
    item.setAttribute('height', String(dimensions[index].height));
    item.setAttribute('viewBox', dimensions[index].viewBox);
    item.setAttribute('preserveAspectRatio', 'xMinYMin meet');
    Array.from(svg.childNodes).forEach((node) => item.append(node.cloneNode(true)));
    sheet.append(item);
    y += labelHeight + dimensions[index].height + gap;
  });
  return sheet;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2400);
}

function safeFilename() {
  const first = currentValues[0] || 'barcode';
  const slug = first.replace(/[^\p{L}\p{N}-]+/gu, '-').replace(/^-|-$/g, '').slice(0, 24);
  return `code128-${slug || 'barcode'}${currentValues.length > 1 ? `-${currentValues.length}-codes` : ''}`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadSheet(type) {
  if (!renderBarcodes()) return showToast(t('fix_list'));
  const sheet = buildSheet();
  const source = new XMLSerializer().serializeToString(sheet);
  const base = safeFilename();
  if (type === 'svg') {
    downloadBlob(new Blob([source], { type: 'image/svg+xml;charset=utf-8' }), `${base}.svg`);
    showToast(t('svg_ready'));
    return;
  }

  const url = URL.createObjectURL(new Blob([source], { type: 'image/svg+xml;charset=utf-8' }));
  const image = new Image();
  image.onload = () => {
    const scale = 2;
    const canvas = document.createElement('canvas');
    canvas.width = image.width * scale;
    canvas.height = image.height * scale;
    const context = canvas.getContext('2d');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.scale(scale, scale);
    context.drawImage(image, 0, 0);
    URL.revokeObjectURL(url);
    canvas.toBlob((blob) => {
      if (!blob) return showToast(t('png_error'));
      downloadBlob(blob, `${base}.png`);
      showToast(t('png_ready'));
    }, 'image/png');
  };
  image.onerror = () => {
    URL.revokeObjectURL(url);
    showToast(t('png_error'));
  };
  image.src = url;
}

input.addEventListener('input', renderBarcodes);
showText.addEventListener('change', renderBarcodes);
sizeSelect.addEventListener('change', renderBarcodes);
colorInput.addEventListener('input', renderBarcodes);
document.querySelector('#clear-button').addEventListener('click', () => {
  input.value = '';
  input.focus();
  renderBarcodes();
});
document.querySelector('#example-button').addEventListener('click', () => {
  input.value = '4820198765432\nCODE-128\n1234567890';
  input.focus();
  renderBarcodes();
});
document.querySelector('#download-svg').addEventListener('click', () => downloadSheet('svg'));
document.querySelector('#download-png').addEventListener('click', () => downloadSheet('png'));
languageSelect.addEventListener('change', () => {
  try { localStorage.setItem('code128-language', languageSelect.value); } catch {}
  applyLanguage();
});
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('code128-theme', theme); } catch {}
  applyLanguage();
});
try {
  const savedLanguage = localStorage.getItem('code128-language');
  if (savedLanguage && translations[savedLanguage]) languageSelect.value = savedLanguage;
} catch {}
try {
  const savedTheme = localStorage.getItem('code128-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') document.documentElement.dataset.theme = savedTheme;
} catch {}
applyLanguage();
