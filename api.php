<?php
header('Content-Type: application/json; charset=utf-8');

$dbFile = __DIR__ . '/database.json';
if (!file_exists($dbFile)) {
    file_put_contents($dbFile, json_encode([]));
}

$database = json_decode(file_get_contents($dbFile), true);
if (!isset($database['clients'])) $database['clients'] = [];
if (!isset($database['deals']))   $database['deals']   = [];
if (!isset($database['tasks']))   $database['tasks']   = [];

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

    default:
        echo json_encode(['error' => 'Unknown action'], JSON_UNESCAPED_UNICODE);
        exit;
}

file_put_contents($dbFile, json_encode($database, JSON_UNESCAPED_UNICODE));
echo json_encode(['status' => 'success']);
