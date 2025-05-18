import {request} from '../../assets/common.js';

export function show() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="section">
            <h2>База знаний</h2>
            <button class="btn" id="update-articles">Обновить</button>
            <table>
                <thead><tr><th>ID</th><th>Название</th><th>Содержимое</th></tr></thead>
                <tbody id="knowledge-table"><tr><td colspan="3">Загрузка...</td></tr></tbody>
            </table>
        </div>
        <div class="section">
            <h3>Добавить статью</h3>
            <div class="form-row"><label>Название<input id="kn-title"></label></div>
            <div class="form-row"><label>Содержимое<input id="kn-content"></label></div>
            <button class="btn" id="save-article">Сохранить</button>
        </div>`;
    loadArticles();
    document.getElementById('update-articles').onclick = loadArticles;
    document.getElementById('save-article').onclick = addArticle;
}

export function loadArticles() {
    request('knowledge','get_articles').then(data => {
        const tbody = document.getElementById('knowledge-table');
        tbody.innerHTML = data.length ? data.map(d => `<tr><td>${d.id}</td><td>${d.title}</td><td>${d.content}</td></tr>`).join('') : '<tr><td colspan="3">Нет данных</td></tr>';
    });
}

export function addArticle() {
    const body = { title: document.getElementById('kn-title').value, content: document.getElementById('kn-content').value };
    request('knowledge','add_article','POST', body).then(loadArticles);
}
