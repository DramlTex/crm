import {request} from '../../assets/common.js';

export function show() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="section">
            <h2>Документы</h2>
            <button class="btn" id="update-docs">Обновить</button>
            <table>
                <thead><tr><th>ID</th><th>Название</th><th>Содержимое</th></tr></thead>
                <tbody id="docs-table"><tr><td colspan="3">Загрузка...</td></tr></tbody>
            </table>
        </div>
        <div class="section">
            <h3>Добавить документ</h3>
            <div class="form-row"><label>Название<input id="doc-title"></label></div>
            <div class="form-row"><label>Содержимое<input id="doc-content"></label></div>
            <button class="btn" id="save-doc">Сохранить</button>
        </div>`;
    loadDocs();
    document.getElementById('update-docs').onclick = loadDocs;
    document.getElementById('save-doc').onclick = addDoc;
}

export function loadDocs() {
    request('documents','get_documents').then(data => {
        const tbody = document.getElementById('docs-table');
        tbody.innerHTML = data.length ? data.map(d => `<tr><td>${d.id}</td><td>${d.title}</td><td>${d.content}</td></tr>`).join('') : '<tr><td colspan="3">Нет данных</td></tr>';
    });
}

export function addDoc() {
    const body = { title: document.getElementById('doc-title').value, content: document.getElementById('doc-content').value };
    request('documents','add_document','POST', body).then(loadDocs);
}
