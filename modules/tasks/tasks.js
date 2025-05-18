import {request} from '../../assets/common.js';

export function show() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="section">
            <h2>Задачи</h2>
            <button class="btn" id="update-tasks">Обновить</button>
            <table>
                <thead><tr><th>ID</th><th>Название</th><th>Сделка</th><th>Срок</th></tr></thead>
                <tbody id="tasks-table"><tr><td colspan="4">Загрузка...</td></tr></tbody>
            </table>
        </div>
        <div class="section">
            <h3>Добавить задачу</h3>
            <div class="form-row"><label>Название<input id="t-title"></label></div>
            <div class="form-row"><label>ID сделки<input id="t-deal"></label></div>
            <div class="form-row"><label>Срок<input id="t-date" type="date"></label></div>
            <button class="btn" id="save-task">Сохранить</button>
        </div>`;
    loadTasks();
    document.getElementById('update-tasks').onclick = loadTasks;
    document.getElementById('save-task').onclick = addTask;
}

export function loadTasks() {
    request('tasks','get_tasks').then(data => {
        const tbody = document.getElementById('tasks-table');
        tbody.innerHTML = data.length ? data.map(t => `<tr><td>${t.id}</td><td>${t.title}</td><td>${t.deal_id}</td><td>${t.due_date}</td></tr>`).join('') : '<tr><td colspan="4">Нет данных</td></tr>';
    });
}

export function addTask() {
    const body = { title: document.getElementById('t-title').value, deal_id: document.getElementById('t-deal').value, due_date: document.getElementById('t-date').value };
    request('tasks','add_task','POST', body).then(loadTasks);
}
