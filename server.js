const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;
const dbFile = path.join(__dirname, 'database.json');

function loadDB() {
  if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, '{}');
  let data;
  try { data = JSON.parse(fs.readFileSync(dbFile, 'utf8') || '{}'); }
  catch (e) { data = {}; }
  if (!data.clients) data.clients = [];
  if (!data.deals) data.deals = [];
  if (!data.tasks) data.tasks = [];
  if (!data.documents) data.documents = [];
  if (!data.articles) data.articles = [];
  if (!data.messages) data.messages = [];
  if (!data.integrations) data.integrations = [];
  if (!data.settings) data.settings = { menu: {
    clients: true,
    deals: true,
    tasks: true,
    documents: false,
    knowledge: false,
    chat: false,
    integrations: false
  }};
  if (!data.stages) data.stages = ['Новая','В работе','Закрыта'];
  return data;
}

function saveDB(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
}

function send(res, data, status=200) {
  res.writeHead(status, {'Content-Type': 'application/json; charset=utf-8'});
  res.end(JSON.stringify(data));
}

function handleAPI(req, res) {
  const q = url.parse(req.url, true).query;
  const section = q.section || '';
  const action = q.action || '';
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const db = loadDB();
    let result = null;
    if (body) {
      try { body = JSON.parse(body); } catch(e) { body = {}; }
    }
    switch(section) {
      case 'clients':
        if (action === 'get_clients') result = db.clients;
        else if (action === 'add_client') {
          const c = {
            id: Date.now(),
            name: body.name || 'Безымянный',
            company: body.company || '',
            phone: body.phone || ''
          };
          db.clients.push(c); saveDB(db); result = {status:'success'};
        }
        break;
      case 'deals':
        if (action === 'get_deals') result = db.deals;
        else if (action === 'add_deal') {
          const d = {
            id: Date.now(),
            title: body.title || 'Новая сделка',
            client_id: body.client_id || '',
            amount: body.amount || 0
          };
          db.deals.push(d); saveDB(db); result = {status:'success'};
        }
        break;
      case 'tasks':
        if (action === 'get_tasks') result = db.tasks;
        else if (action === 'add_task') {
          const t = {
            id: Date.now(),
            title: body.title || 'Новая задача',
            deal_id: body.deal_id || '',
            due_date: body.due_date || ''
          };
          db.tasks.push(t); saveDB(db); result = {status:'success'};
        }
        break;
      case 'documents':
        if (action === 'get_documents') result = db.documents;
        else if (action === 'add_document') {
          const d = {
            id: Date.now(),
            title: body.title || 'Документ',
            content: body.content || ''
          };
          db.documents.push(d); saveDB(db); result = {status:'success'};
        }
        break;
      case 'knowledge':
        if (action === 'get_articles') result = db.articles;
        else if (action === 'add_article') {
          const a = {
            id: Date.now(),
            title: body.title || 'Статья',
            content: body.content || ''
          };
          db.articles.push(a); saveDB(db); result = {status:'success'};
        }
        break;
      case 'chat':
        if (action === 'get_messages') result = db.messages;
        else if (action === 'add_message') {
          const m = { id: Date.now(), user: 'user', text: body.text || '' };
          db.messages.push(m); saveDB(db); result = {status:'success'};
        }
        break;
      case 'integrations':
        if (action === 'get_integrations') result = db.integrations;
        else if (action === 'add_integration') {
          const i = { id: Date.now(), name: body.name || 'service', url: body.url || '' };
          db.integrations.push(i); saveDB(db); result = {status:'success'};
        } else if (action === 'call_integration') {
          result = {status:'called'};
        }
        break;
      case 'settings':
        if (action === 'get_settings') result = db.settings;
        else if (action === 'update_settings') { db.settings = body; saveDB(db); result = {status:'success'}; }
        break;
      case 'stages':
        if (action === 'get_stages') result = db.stages;
        else if (action === 'add_stage') { if(body.name) db.stages.push(body.name); saveDB(db); result = {status:'success'}; }
        break;
      default:
        send(res, {error:'unknown section'}, 400); return;
    }
    if (result === null) send(res, {error:'unknown action'}, 400);
    else send(res, result);
  });
}

function serveStatic(req,res) {
  let reqPath = url.parse(req.url).pathname;
  if (reqPath === '/') reqPath = '/index.html';
  const file = path.join(__dirname, reqPath);
  if (!fs.existsSync(file)) { res.writeHead(404); res.end('Not found'); return; }
  const ext = path.extname(file).toLowerCase();
  const mime = {
    '.html':'text/html', '.js':'application/javascript', '.css':'text/css',
    '.json':'application/json', '.png':'image/png', '.jpg':'image/jpeg',
  }[ext] || 'application/octet-stream';
  res.writeHead(200, {'Content-Type': mime});
  fs.createReadStream(file).pipe(res);
}

http.createServer((req,res)=>{
  if (req.url.startsWith('/api/index.php')) handleAPI(req,res);
  else serveStatic(req,res);
}).listen(PORT, ()=>console.log(`Server running at http://localhost:${PORT}`));
