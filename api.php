<?php
header('Content-Type: application/json; charset=utf-8');

$dbFile = __DIR__ . '/database.json';
if (!file_exists($dbFile)) {
    file_put_contents($dbFile, json_encode([]));
}
$database = json_decode(file_get_contents($dbFile), true);
$action = $_GET['action'] ?? null;

switch ($action) {
    case 'get_clients':
        $database['clients'] = $database['clients'] ?? [];
        echo json_encode($database['clients'], JSON_UNESCAPED_UNICODE);
        break;
    case 'add_client':
        $post = json_decode(file_get_contents('php://input'), true);
        $new = [
            'id' => time(),
            'name' => $post['name'] ?? 'Безымянный',
            'company' => $post['company'] ?? '',
            'phone' => $post['phone'] ?? ''
        ];
        $database['clients'][] = $new;
        file_put_contents($dbFile, json_encode($database, JSON_UNESCAPED_UNICODE));
        echo json_encode(['status' => 'success', 'client' => $new], JSON_UNESCAPED_UNICODE);
        break;

    case 'get_deals':
        $database['deals'] = $database['deals'] ?? [];
        echo json_encode($database['deals'], JSON_UNESCAPED_UNICODE);
        break;
    case 'add_deal':
        $post = json_decode(file_get_contents('php://input'), true);
        $new = [
            'id' => time(),
            'title' => $post['title'] ?? 'Новая сделка',
            'amount' => $post['amount'] ?? ''
        ];
        $database['deals'][] = $new;
        file_put_contents($dbFile, json_encode($database, JSON_UNESCAPED_UNICODE));
        echo json_encode(['status' => 'success', 'deal' => $new], JSON_UNESCAPED_UNICODE);
        break;

    case 'get_tasks':
        $database['tasks'] = $database['tasks'] ?? [];
        echo json_encode($database['tasks'], JSON_UNESCAPED_UNICODE);
        break;
    case 'add_task':
        $post = json_decode(file_get_contents('php://input'), true);
        $new = [
            'id' => time(),
            'title' => $post['title'] ?? 'Задача',
            'due' => $post['due'] ?? ''
        ];
        $database['tasks'][] = $new;
        file_put_contents($dbFile, json_encode($database, JSON_UNESCAPED_UNICODE));
        echo json_encode(['status' => 'success', 'task' => $new], JSON_UNESCAPED_UNICODE);
        break;

    default:
        echo json_encode(['error' => 'Unknown action'], JSON_UNESCAPED_UNICODE);
}
