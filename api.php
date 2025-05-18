<?php
header('Content-Type: application/json; charset=utf-8');

$dbFile = __DIR__ . '/database.json';

if (!file_exists($dbFile)) {
    file_put_contents($dbFile, json_encode([]));
}

$database = json_decode(file_get_contents($dbFile), true);
if (!is_array($database)) {
    $database = [];
}

$action = $_GET['action'] ?? null;

switch ($action) {
    case 'get_clients':
        if (!isset($database['clients'])) {
            $database['clients'] = [];
        }
        echo json_encode($database['clients'], JSON_UNESCAPED_UNICODE);
        break;

    case 'add_client':
        $postData = json_decode(file_get_contents('php://input'), true);
        $newClient = [
            'id'      => time(),
            'name'    => $postData['name'] ?? 'Безымянный',
            'company' => $postData['company'] ?? '',
            'phone'   => $postData['phone'] ?? ''
        ];
        $database['clients'][] = $newClient;
        file_put_contents($dbFile, json_encode($database, JSON_UNESCAPED_UNICODE));
        echo json_encode(['status' => 'success', 'client' => $newClient], JSON_UNESCAPED_UNICODE);
        break;

    case 'get_deals':
        if (!isset($database['deals'])) {
            $database['deals'] = [];
        }
        echo json_encode($database['deals'], JSON_UNESCAPED_UNICODE);
        break;

    case 'add_deal':
        $postData = json_decode(file_get_contents('php://input'), true);
        $newDeal = [
            'id'       => time(),
            'title'    => $postData['title'] ?? 'Без названия',
            'clientId' => $postData['clientId'] ?? '',
            'amount'   => $postData['amount'] ?? ''
        ];
        $database['deals'][] = $newDeal;
        file_put_contents($dbFile, json_encode($database, JSON_UNESCAPED_UNICODE));
        echo json_encode(['status' => 'success', 'deal' => $newDeal], JSON_UNESCAPED_UNICODE);
        break;

    case 'get_tasks':
        if (!isset($database['tasks'])) {
            $database['tasks'] = [];
        }
        echo json_encode($database['tasks'], JSON_UNESCAPED_UNICODE);
        break;

    case 'add_task':
        $postData = json_decode(file_get_contents('php://input'), true);
        $newTask = [
            'id'          => time(),
            'title'       => $postData['title'] ?? 'Без названия',
            'description' => $postData['description'] ?? '',
            'status'      => 'todo'
        ];
        $database['tasks'][] = $newTask;
        file_put_contents($dbFile, json_encode($database, JSON_UNESCAPED_UNICODE));
        echo json_encode(['status' => 'success', 'task' => $newTask], JSON_UNESCAPED_UNICODE);
        break;

    default:
        echo json_encode(['error' => 'Unknown action'], JSON_UNESCAPED_UNICODE);
        break;
}
