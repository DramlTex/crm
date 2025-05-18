import {request} from '../../assets/common.js';

export function show() {
    const content = document.getElementById('content-area');
    content.innerHTML = `
        <div class="section">
            <h2>Чат сотрудников</h2>
            <ul id="chat-list">Загрузка...</ul>
        </div>
        <div class="section">
            <h3>Новое сообщение</h3>
            <div class="form-row"><label>Текст<input id="chat-text"></label></div>
            <button class="btn" id="send-msg">Отправить</button>
        </div>`;
    loadMessages();
    document.getElementById('send-msg').onclick = addMessage;
}

export function loadMessages() {
    request('chat','get_messages').then(data => {
        const ul = document.getElementById('chat-list');
        ul.innerHTML = data.length ? data.map(m => `<li>${m.user}: ${m.text}</li>`).join('') : '<li>Нет сообщений</li>';
    });
}

export function addMessage() {
    const body = { text: document.getElementById('chat-text').value };
    request('chat','add_message','POST', body).then(() => { document.getElementById('chat-text').value=''; loadMessages(); });
}
