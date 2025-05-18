import {request} from '../../assets/common.js';

export function show() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="section">
            <h2>Интеграции</h2>
            <table>
                <thead><tr><th>ID</th><th>Название</th><th>URL</th><th></th></tr></thead>
                <tbody id="int-table"><tr><td colspan="4">Загрузка...</td></tr></tbody>
            </table>
        </div>
        <div class="section">
            <h3>Добавить интеграцию</h3>
            <div class="form-row"><label>Название<input id="int-name"></label></div>
            <div class="form-row"><label>URL<input id="int-url"></label></div>
            <button class="btn" id="save-integration">Сохранить</button>
        </div>`;
    loadIntegrations();
    document.getElementById('save-integration').onclick = addIntegration;
}

export function loadIntegrations() {
    request('integrations','get_integrations').then(data => {
        const tbody = document.getElementById('int-table');
        tbody.innerHTML = data.length ? data.map(i => `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.url}</td><td><button onclick="testIntegration(${i.id})">Тест</button></td></tr>`).join('') : '<tr><td colspan="4">Нет данных</td></tr>';
    });
}

export function addIntegration() {
    const body = { name: document.getElementById('int-name').value, url: document.getElementById('int-url').value };
    request('integrations','add_integration','POST', body).then(loadIntegrations);
}

export function testIntegration(id) {
    request('integrations','call_integration','POST', {id}).then(() => alert('Отправлено'));
}
