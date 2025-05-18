import {request} from '../../assets/common.js';

export function show() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="section">
            <h2>Стадии сделок</h2>
            <button class="btn" id="update-stages">Обновить</button>
            <ul id="stages-list">Загрузка...</ul>
        </div>
        <div class="section">
            <h3>Добавить стадию</h3>
            <div class="form-row"><label>Название<input id="stage-name"></label></div>
            <button class="btn" id="save-stage">Сохранить</button>
        </div>`;
    loadStages();
    document.getElementById('update-stages').onclick = loadStages;
    document.getElementById('save-stage').onclick = addStage;
}

export function loadStages() {
    request('stages','get_stages').then(data => {
        const ul = document.getElementById('stages-list');
        ul.innerHTML = data.map(s => `<li>${s}</li>`).join('');
    });
}

export function addStage() {
    const body = { name: document.getElementById('stage-name').value };
    request('stages','add_stage','POST', body).then(loadStages);
}
