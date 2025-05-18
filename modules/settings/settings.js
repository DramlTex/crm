import {request} from '../../assets/common.js';

let settings = { menu: { clients:true, deals:true, tasks:true, documents:false, knowledge:false, chat:false, integrations:false } };

export function show() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="section">
            <h2>Настройки интерфейса</h2>
            <label><input type="checkbox" id="set-menu-clients"> Клиенты</label><br>
            <label><input type="checkbox" id="set-menu-deals"> Сделки</label><br>
            <label><input type="checkbox" id="set-menu-tasks"> Задачи</label><br>
            <label><input type="checkbox" id="set-menu-docs"> Документы</label><br>
            <label><input type="checkbox" id="set-menu-knowledge"> База знаний</label><br>
            <label><input type="checkbox" id="set-menu-chat"> Чат</label><br>
            <label><input type="checkbox" id="set-menu-integrations"> Интеграции</label><br>
            <button class="btn" id="save-settings">Сохранить</button>
        </div>`;
    fillSettings();
    document.getElementById('save-settings').onclick = saveSettings;
}

export function applySettings() {
    request('settings','get_settings').then(s => {
        Object.assign(settings.menu, s.menu || {});
        document.getElementById('nav-clients').style.display = settings.menu.clients ? 'block' : 'none';
        document.getElementById('nav-deals').style.display = settings.menu.deals ? 'block' : 'none';
        document.getElementById('nav-tasks').style.display = settings.menu.tasks ? 'block' : 'none';
        document.getElementById('nav-docs').style.display = settings.menu.documents ? 'block' : 'none';
        document.getElementById('nav-knowledge').style.display = settings.menu.knowledge ? 'block' : 'none';
        document.getElementById('nav-chat').style.display = settings.menu.chat ? 'block' : 'none';
        document.getElementById('nav-integrations').style.display = settings.menu.integrations ? 'block' : 'none';
    });
}

export function fillSettings() {
    document.getElementById('set-menu-clients').checked = settings.menu.clients;
    document.getElementById('set-menu-deals').checked = settings.menu.deals;
    document.getElementById('set-menu-tasks').checked = settings.menu.tasks;
    document.getElementById('set-menu-docs').checked = settings.menu.documents;
    document.getElementById('set-menu-knowledge').checked = settings.menu.knowledge;
    document.getElementById('set-menu-chat').checked = settings.menu.chat;
    document.getElementById('set-menu-integrations').checked = settings.menu.integrations;
}

export function saveSettings() {
    const data = {
        menu: {
            clients: document.getElementById('set-menu-clients').checked,
            deals: document.getElementById('set-menu-deals').checked,
            tasks: document.getElementById('set-menu-tasks').checked,
            documents: document.getElementById('set-menu-docs').checked,
            knowledge: document.getElementById('set-menu-knowledge').checked,
            chat: document.getElementById('set-menu-chat').checked,
            integrations: document.getElementById('set-menu-integrations').checked
        }
    };
    request('settings','update_settings','POST', data).then(() => { settings = data; applySettings(); });
}

applySettings();
