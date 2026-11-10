const language = document.querySelector('#privacy-language');
const themeButton = document.querySelector('#privacy-theme-toggle');
const copy = {
  ru: {
    eyebrow: 'ВАШИ ДАННЫЕ — У ВАС', title: 'Конфиденциальность', lead: 'Генератор обрабатывает введённые значения и создаёт штрихкоды в вашем браузере. Они не отправляются на сервер сайта.',
    local_title: 'Обработка на устройстве', local_body: 'Введённый текст используется только для построения штрихкодов и подготовки файлов SVG/PNG в браузере. Сайт не сохраняет его и не отправляет куда-либо.', prefs_title: 'Настройки интерфейса', prefs_body: 'В localStorage сохраняются только выбранные язык и тема, чтобы запомнить ваши предпочтения. Эти настройки остаются на устройстве, пока вы не очистите данные сайта. Введённые штрихкодные данные там не хранятся.', tracking_title: 'Cookies и аналитика', tracking_body: 'Сайт не использует cookies, рекламные трекеры, аналитику, аккаунты или встроенные сторонние ресурсы. Библиотека генерации и стили загружаются с этого сайта.', links_title: 'Внешние ссылки и хостинг', links_body: 'Если вы перейдёте по ссылке на X, ваш браузер подключится к X, который обрабатывает данные согласно собственной политике. Сайт размещён на Vercel. По своей <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">политике конфиденциальности</a> Vercel может обрабатывать IP-адрес и сведения о трафике, а также передавать данные за пределы страны пользователя с предусмотренными мерами защиты. Срок доступности runtime-логов зависит от плана; подробности — в <a href="https://vercel.com/docs/logs/runtime" target="_blank" rel="noopener noreferrer">документации Vercel</a>.', operator_title: 'Информация об операторе', operator_body: 'Оператор сайта — студия разработки uperlabs. По вопросам обработки данных напишите на <a href="mailto:hvatitinfo@gmail.com">hvatitinfo@gmail.com</a>. Хостинг-провайдер сайта — Vercel.', back: 'Вернуться к генератору', title_tag: 'Конфиденциальность — upercode128', theme_dark: 'Включить тёмную тему', theme_light: 'Включить светлую тему',
  },
  pl: {
    eyebrow: 'TWOJE DANE POZOSTAJĄ U CIEBIE', title: 'Prywatność', lead: 'Generator przetwarza wpisane wartości i tworzy kody kreskowe w Twojej przeglądarce. Nie są one wysyłane na serwer strony.',
    local_title: 'Przetwarzanie na urządzeniu', local_body: 'Wpisany tekst służy wyłącznie do tworzenia kodów kreskowych i przygotowania plików SVG/PNG w przeglądarce. Strona go nie zapisuje ani nigdzie nie wysyła.', prefs_title: 'Ustawienia interfejsu', prefs_body: 'W localStorage zapisywane są tylko wybrany język i motyw, aby zapamiętać Twoje preferencje. Ustawienia pozostają na urządzeniu do czasu wyczyszczenia danych strony. Wpisane dane kodów nie są tam przechowywane.', tracking_title: 'Cookies i analityka', tracking_body: 'Strona nie używa plików cookies, trackerów reklamowych, analityki, kont ani osadzonych zasobów zewnętrznych. Biblioteka generatora i style są ładowane z tej strony.', links_title: 'Linki zewnętrzne i hosting', links_body: 'Po kliknięciu linku do X przeglądarka połączy się z serwisem X, który przetwarza dane zgodnie z własną polityką. Strona jest hostowana w Vercel. Zgodnie ze swoją <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">polityką prywatności</a> Vercel może przetwarzać adres IP i informacje o ruchu oraz przekazywać dane poza kraj użytkownika z zastosowaniem wymaganych zabezpieczeń. Okres dostępności logów runtime zależy od planu; szczegóły znajdują się w <a href="https://vercel.com/docs/logs/runtime" target="_blank" rel="noopener noreferrer">dokumentacji Vercel</a>.', operator_title: 'Informacje o administratorze', operator_body: 'Administratorem serwisu jest studio deweloperskie uperlabs. W sprawach dotyczących przetwarzania danych napisz na adres <a href="mailto:hvatitinfo@gmail.com">hvatitinfo@gmail.com</a>. Dostawcą hostingu jest Vercel.', back: 'Wróć do generatora', title_tag: 'Prywatność — upercode128', theme_dark: 'Włącz ciemny motyw', theme_light: 'Włącz jasny motyw',
  },
  en: {
    eyebrow: 'YOUR DATA STAYS WITH YOU', title: 'Privacy', lead: 'The generator processes your entries and creates barcodes in your browser. They are not sent to the site server.',
    local_title: 'Processed on your device', local_body: 'Entered text is used only to create barcodes and prepare SVG/PNG files in your browser. The site does not store it or send it anywhere.', prefs_title: 'Interface preferences', prefs_body: 'Only your selected language and theme are saved in localStorage to remember your preferences. They stay on your device until you clear this site’s data. Barcode entries are not stored there.', tracking_title: 'Cookies and analytics', tracking_body: 'The site uses no cookies, ad trackers, analytics, accounts, or embedded third-party resources. The barcode library and styles are served by this site.', links_title: 'External links and hosting', links_body: 'If you follow the link to X, your browser connects to X, which processes data under its own policy. The site is hosted on Vercel. Under its <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Privacy Notice</a>, Vercel may process IP addresses and website traffic information, and may transfer data outside your country with applicable safeguards. Runtime log availability depends on the plan; see the <a href="https://vercel.com/docs/logs/runtime" target="_blank" rel="noopener noreferrer">Vercel documentation</a>.', operator_title: 'Site operator information', operator_body: 'The site operator is uperlabs development studio. For questions about data processing, email <a href="mailto:hvatitinfo@gmail.com">hvatitinfo@gmail.com</a>. The hosting provider is Vercel.', back: 'Back to the generator', title_tag: 'Privacy — upercode128', theme_dark: 'Switch to dark theme', theme_light: 'Switch to light theme',
  },
};

function applyLanguage() {
  const selected = copy[language.value] || copy.ru;
  document.documentElement.lang = language.value;
  document.title = selected.title_tag;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = selected[element.dataset.i18n] || '';
    if (element.dataset.i18n === 'operator_body') element.innerHTML = value;
    else element.textContent = value;
  });
  const label = document.documentElement.dataset.theme === 'dark' ? selected.theme_light : selected.theme_dark;
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
  document.querySelector('meta[name="theme-color"]').content = document.documentElement.dataset.theme === 'dark' ? '#17151b' : '#f7f4fa';
}

try {
  const savedLanguage = localStorage.getItem('code128-language');
  if (savedLanguage && copy[savedLanguage]) language.value = savedLanguage;
  const savedTheme = localStorage.getItem('code128-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') document.documentElement.dataset.theme = savedTheme;
} catch {}
language.addEventListener('change', () => {
  try { localStorage.setItem('code128-language', language.value); } catch {}
  applyLanguage();
});
themeButton.addEventListener('click', () => {
  document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('code128-theme', document.documentElement.dataset.theme); } catch {}
  applyLanguage();
});
applyLanguage();
