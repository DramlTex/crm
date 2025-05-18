<?php
function clients_api($action, &$db) {
    switch ($action) {
        case 'get_clients':
            return $db['clients'];
        case 'add_client':
            $data = json_decode(file_get_contents('php://input'), true);
            $new = [
                'id'      => time(),
                'name'    => $data['name'] ?? 'Безымянный',
                'company' => $data['company'] ?? '',
                'phone'   => $data['phone'] ?? ''
            ];
            $db['clients'][] = $new;
            return true;
    }
    return null;
}
