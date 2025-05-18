<?php
function tasks_api($action, &$db) {
    switch ($action) {
        case 'get_tasks':
            return $db['tasks'];
        case 'add_task':
            $data = json_decode(file_get_contents('php://input'), true);
            $new = [
                'id'      => time(),
                'title'   => $data['title'] ?? 'Новая задача',
                'deal_id' => $data['deal_id'] ?? '',
                'due_date'=> $data['due_date'] ?? ''
            ];
            $db['tasks'][] = $new;
            return true;
    }
    return null;
}
