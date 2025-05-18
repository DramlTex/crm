export function request(section, action, method = 'GET', body = null) {
    const options = { method };
    if (body) options.body = JSON.stringify(body);
    return fetch(`api/index.php?section=${section}&action=${action}`, options).then(r => r.json());
}
