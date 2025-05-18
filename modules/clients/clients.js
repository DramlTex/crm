import {request} from '../../assets/common.js';

export function show() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="section">
            <h2>Клиенты</h2>
            <button class="btn" id="update-clients">Обновить</button>
            <table>
                <thead><tr><th>ID</th><th>Имя</th><th>Компания</th><th>Телефон</th></tr></thead>
                <tbody id="clients-table"><tr><td colspan="4">Загрузка...</td></tr></tbody>
            </table>
        </div>
        <div class="section">
            <h3>Добавить клиента</h3>
            <div class="form-row"><label>Имя<input id="c-name"></label></div>
            <div class="form-row"><label>Компания<input id="c-company"></label></div>
            <div class="form-row"><label>Телефон<input id="c-phone"></label></div>
            <button class="btn" id="save-client">Сохранить</button>
        </div>`;
    loadClients();
    document.getElementById('update-clients').onclick = loadClients;
    document.getElementById('save-client').onclick = addClient;
}

export function loadClients() {
    request('clients','get_clients').then(data => {
        const tbody = document.getElementById('clients-table');
        tbody.innerHTML = data.length ? data.map(c => `<tr><td>${c.id}</td><td>${c.name}</td><td>${c.company}</td><td>${c.phone}</td></tr>`).join('') : '<tr><td colspan="4">Нет данных</td></tr>';
    });
}

export function addClient() {
    const body = { name: document.getElementById('c-name').value, company: document.getElementById('c-company').value, phone: document.getElementById('c-phone').value };
    request('clients','add_client','POST', body).then(loadClients);
}
