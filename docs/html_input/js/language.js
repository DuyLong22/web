document.addEventListener('DOMContentLoaded', function() {
    // Set default language
    let currentLang = localStorage.getItem('language') || 'en';
    
    // Initialize the page with saved language
    updateLanguage(currentLang);
    updateActiveLanguageButton(currentLang);

    // Add click event listeners to language buttons
    document.querySelectorAll('.language-selector a').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            updateLanguage(lang);
            updateActiveLanguageButton(lang);
            localStorage.setItem('language', lang);
        });
    });
});

function updateLanguage(lang) {
    // Update text content for all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.getAttribute('type') === 'text') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

function updateActiveLanguageButton(lang) {
    // Remove active class from all language buttons
    document.querySelectorAll('.language-selector a').forEach(button => {
        button.classList.remove('active');
    });
    
    // Add active class to selected language button
    const activeButton = document.querySelector(`.language-selector a[data-lang="${lang}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
} 