<?php
function settings_api($action, &$db) {
    switch ($action) {
        case 'get_settings':
            return $db['settings'];
        case 'update_settings':
            $data = json_decode(file_get_contents('php://input'), true);
            $db['settings'] = $data;
            return true;
    }
    return null;
}
