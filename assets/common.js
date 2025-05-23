export function request(section, action, method = 'GET', body = null) {
    const options = { method };
    if (body) {
        options.body = JSON.stringify(body);
        options.headers = { 'Content-Type': 'application/json' };
    }
    return fetch(`api/index.php?section=${section}&action=${action}`, options)
        .then(r => r.json())
        .catch(err => {
            console.error('API error:', err);
            if (!window.apiOfflineShown) {
                window.apiOfflineShown = true;
                alert('Сервер недоступен. Запустите "php -S localhost:8000".');
            }
            if (section === 'settings' && action === 'get_settings') return {};
            if (action.startsWith('get')) return [];
            return { error: 'offline' };
        });
}
