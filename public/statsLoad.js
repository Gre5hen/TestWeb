(function() {
    window.addEventListener('load', function() {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        const footer = document.querySelector('footer');
        const statMessage = document.createElement('p');
        statMessage.textContent = `Время загрузки страницы: ${loadTime} мс`;
        footer.appendChild(statMessage);
    });
})();