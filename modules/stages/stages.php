<?php
function stages_api($action, &$db) {
    switch ($action) {
        case 'get_stages':
            return $db['stages'];
        case 'add_stage':
            $data = json_decode(file_get_contents('php://input'), true);
            if (isset($data['name']) && $data['name'] !== '') {
                $db['stages'][] = $data['name'];
            }
            return true;
    }
    return null;
}
