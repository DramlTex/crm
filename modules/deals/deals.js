import {request} from '../../assets/common.js';

export function show() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="section">
            <h2>Сделки</h2>
            <button class="btn" id="update-deals">Обновить</button>
            <table>
                <thead><tr><th>ID</th><th>Название</th><th>Клиент</th><th>Сумма</th></tr></thead>
                <tbody id="deals-table"><tr><td colspan="4">Загрузка...</td></tr></tbody>
            </table>
        </div>
        <div class="section">
            <h3>Добавить сделку</h3>
            <div class="form-row"><label>Название<input id="d-title"></label></div>
            <div class="form-row"><label>ID клиента<input id="d-client"></label></div>
            <div class="form-row"><label>Сумма<input id="d-amount" type="number"></label></div>
            <button class="btn" id="save-deal">Сохранить</button>
        </div>`;
    loadDeals();
    document.getElementById('update-deals').onclick = loadDeals;
    document.getElementById('save-deal').onclick = addDeal;
}

export function loadDeals() {
    request('deals','get_deals').then(data => {
        const tbody = document.getElementById('deals-table');
        tbody.innerHTML = data.length ? data.map(d => `<tr><td>${d.id}</td><td>${d.title}</td><td>${d.client_id}</td><td>${d.amount}</td></tr>`).join('') : '<tr><td colspan="4">Нет данных</td></tr>';
    });
}

export function addDeal() {
    const body = { title: document.getElementById('d-title').value, client_id: document.getElementById('d-client').value, amount: document.getElementById('d-amount').value };
    request('deals','add_deal','POST', body).then(loadDeals);
}
