<?php
function chat_api($action, &$db) {
    switch ($action) {
        case 'get_messages':
            return $db['messages'];
        case 'add_message':
            $data = json_decode(file_get_contents('php://input'), true);
            $new = [
                'id'   => time(),
                'user' => 'user',
                'text' => $data['text'] ?? ''
            ];
            $db['messages'][] = $new;
            return true;
    }
    return null;
}
