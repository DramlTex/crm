<?php
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__.'/../db.php';
$db = load_db();
$section = $_GET['section'] ?? '';
$action = $_GET['action'] ?? null;
$result = null;
$handled = false;

switch ($section) {
    case 'clients':
        require_once __DIR__.'/../modules/clients/clients.php';
        $result = clients_api($action, $db); $handled = $result !== null; break;
    case 'deals':
        require_once __DIR__.'/../modules/deals/deals.php';
        $result = deals_api($action, $db); $handled = $result !== null; break;
    case 'tasks':
        require_once __DIR__.'/../modules/tasks/tasks.php';
        $result = tasks_api($action, $db); $handled = $result !== null; break;
    case 'documents':
        require_once __DIR__.'/../modules/documents/documents.php';
        $result = documents_api($action, $db); $handled = $result !== null; break;
    case 'knowledge':
        require_once __DIR__.'/../modules/knowledge/knowledge.php';
        $result = knowledge_api($action, $db); $handled = $result !== null; break;
    case 'chat':
        require_once __DIR__.'/../modules/chat/chat.php';
        $result = chat_api($action, $db); $handled = $result !== null; break;
    case 'integrations':
        require_once __DIR__.'/../modules/integrations/integrations.php';
        $result = integrations_api($action, $db); $handled = $result !== null; break;
    case 'settings':
        require_once __DIR__.'/../modules/settings/settings.php';
        $result = settings_api($action, $db); $handled = $result !== null; break;
    case 'stages':
        require_once __DIR__.'/../modules/stages/stages.php';
        $result = stages_api($action, $db); $handled = $result !== null; break;
    default:
        echo json_encode(['error' => 'unknown section'], JSON_UNESCAPED_UNICODE);
        exit;
}

if (!$handled) {
    echo json_encode(['error' => 'unknown action'], JSON_UNESCAPED_UNICODE);
    exit;
}

if ($result === true) {
    save_db($db);
    echo json_encode(['status' => 'success'], JSON_UNESCAPED_UNICODE);
} else {
    if ($result !== null) {
        if ($action !== 'get_settings' && $action !== 'get_stages' && strpos($action, 'get_') !== 0) {
            save_db($db);
        }
        if (is_array($result) || is_object($result)) {
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
        } else {
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
        }
    } else {
        echo json_encode(['error' => 'unknown action'], JSON_UNESCAPED_UNICODE);
    }
}

