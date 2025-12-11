(function() {
    function setLang(lang, save) {
        if (!['en', 'hu'].includes(lang)) lang = 'en';

        document.body.classList.remove('lang-en', 'lang-hu');
        document.body.classList.add('lang-' + lang);
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-lang-switch]').forEach(function(el) {
            el.classList.toggle('active', el.getAttribute('data-lang-switch') === lang);
        });

        if (save && window.localStorage) {
            try {
                localStorage.setItem('pintoluce-lang', lang);
            } catch (e) {}
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        let saved = null;
        try {
            saved = window.localStorage && localStorage.getItem('pintoluce-lang');
        } catch (e) {}

        const initialLang =
            saved ||
            (navigator.language && navigator.language.startsWith('hu') ? 'hu' : 'en');

        setLang(initialLang, false);

        document.querySelectorAll('[data-lang-switch]').forEach(function(el) {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = el.getAttribute('data-lang-switch');
                setLang(lang, true);
            });
        });
    });
})();
