<?php
function integrations_api($action, &$db) {
    switch ($action) {
        case 'get_integrations':
            return $db['integrations'];
        case 'add_integration':
            $data = json_decode(file_get_contents('php://input'), true);
            $new = [
                'id'   => time(),
                'name' => $data['name'] ?? 'service',
                'url'  => $data['url'] ?? ''
            ];
            $db['integrations'][] = $new;
            return true;
        case 'call_integration':
            $data = json_decode(file_get_contents('php://input'), true);
            $id = $data['id'] ?? null;
            $url = null;
            foreach ($db['integrations'] as $i) {
                if ($i['id'] == $id) { $url = $i['url']; break; }
            }
            if ($url) { @file_get_contents($url); }
            return ['status' => 'called'];
    }
    return null;
}
