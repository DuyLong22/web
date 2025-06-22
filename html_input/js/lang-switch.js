function switchLanguage(targetLang) {
  const currentUrl = window.location.href;

  if (targetLang === 'vi' && currentUrl.includes('html_input')) {
    window.location.href = currentUrl.replace('html_input', 'html_translated_vi');
  } else if (targetLang === 'en' && currentUrl.includes('html_translated_vi')) {
    window.location.href = currentUrl.replace('html_translated_vi', 'html_input');
  }
}

// Gán class active sau khi trang load
window.addEventListener('DOMContentLoaded', () => {
  const isVietnamese = window.location.href.includes('html_translated_vi');
  const currentLang = isVietnamese ? 'vi' : 'en';

  document.querySelectorAll('[data-lang]').forEach(link => {
    const lang = link.getAttribute('data-lang');
    link.classList.toggle('active', lang === currentLang);
  });
});
