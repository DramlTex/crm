<?php
function documents_api($action, &$db) {
    switch ($action) {
        case 'get_documents':
            return $db['documents'];
        case 'add_document':
            $data = json_decode(file_get_contents('php://input'), true);
            $new = [
                'id'      => time(),
                'title'   => $data['title'] ?? 'Документ',
                'content' => $data['content'] ?? ''
            ];
            $db['documents'][] = $new;
            return true;
    }
    return null;
}
