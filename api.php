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

    default:
        echo json_encode(['error' => 'Unknown action'], JSON_UNESCAPED_UNICODE);
        break;
}
