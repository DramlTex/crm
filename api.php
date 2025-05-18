<?php
header('Content-Type: application/json; charset=utf-8');

$dbFile = __DIR__ . '/database.json';
if (!file_exists($dbFile)) {
    file_put_contents($dbFile, json_encode([]));
}

$database = json_decode(file_get_contents($dbFile), true);
if (!isset($database['clients']))   $database['clients']   = [];
if (!isset($database['deals']))     $database['deals']     = [];
if (!isset($database['tasks']))     $database['tasks']     = [];
if (!isset($database['documents'])) $database['documents'] = [];
if (!isset($database['settings']))  $database['settings']  = ['menu' => ['clients'=>true,'deals'=>true,'tasks'=>true,'documents'=>false]];
if (!isset($database['stages']))    $database['stages']    = ['Новая','В работе','Закрыта'];

$action = $_GET['action'] ?? null;

switch ($action) {
    case 'get_clients':
        echo json_encode($database['clients'], JSON_UNESCAPED_UNICODE);
        break;
    case 'add_client':
        $data = json_decode(file_get_contents('php://input'), true);
        $new = [
            'id'      => time(),
            'name'    => $data['name'] ?? 'Безымянный',
            'company' => $data['company'] ?? '',
            'phone'   => $data['phone'] ?? ''
        ];
        $database['clients'][] = $new;
        break;

    case 'get_deals':
        echo json_encode($database['deals'], JSON_UNESCAPED_UNICODE);
        exit;
    case 'add_deal':
        $data = json_decode(file_get_contents('php://input'), true);
        $new = [
            'id'        => time(),
            'title'     => $data['title'] ?? 'Новая сделка',
            'client_id' => $data['client_id'] ?? '',
            'amount'    => $data['amount'] ?? 0
        ];
        $database['deals'][] = $new;
        break;

    case 'get_tasks':
        echo json_encode($database['tasks'], JSON_UNESCAPED_UNICODE);
        exit;
    case 'add_task':
        $data = json_decode(file_get_contents('php://input'), true);
        $new = [
            'id'      => time(),
            'title'   => $data['title'] ?? 'Новая задача',
            'deal_id' => $data['deal_id'] ?? '',
            'due_date'=> $data['due_date'] ?? ''
        ];
        $database['tasks'][] = $new;
        break;

    case 'get_documents':
        echo json_encode($database['documents'], JSON_UNESCAPED_UNICODE);
        exit;
    case 'add_document':
        $data = json_decode(file_get_contents('php://input'), true);
        $new = [
            'id'      => time(),
            'title'   => $data['title'] ?? 'Документ',
            'content' => $data['content'] ?? ''
        ];
        $database['documents'][] = $new;
        break;

    case 'get_settings':
        echo json_encode($database['settings'], JSON_UNESCAPED_UNICODE);
        exit;
    case 'update_settings':
        $data = json_decode(file_get_contents('php://input'), true);
        $database['settings'] = $data;
        break;

    case 'get_stages':
        echo json_encode($database['stages'], JSON_UNESCAPED_UNICODE);
        exit;
    case 'add_stage':
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['name']) && $data['name'] !== '') {
            $database['stages'][] = $data['name'];
        }
        break;

    case 'export_data':
        header('Content-Disposition: attachment; filename="database.json"');
        echo json_encode($database, JSON_UNESCAPED_UNICODE);
        exit;

    default:
        echo json_encode(['error' => 'Unknown action'], JSON_UNESCAPED_UNICODE);
        exit;
}

file_put_contents($dbFile, json_encode($database, JSON_UNESCAPED_UNICODE));
echo json_encode(['status' => 'success']);
