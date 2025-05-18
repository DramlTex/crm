<?php
function knowledge_api($action, &$db) {
    switch ($action) {
        case 'get_articles':
            return $db['articles'];
        case 'add_article':
            $data = json_decode(file_get_contents('php://input'), true);
            $new = [
                'id'      => time(),
                'title'   => $data['title'] ?? 'Статья',
                'content' => $data['content'] ?? ''
            ];
            $db['articles'][] = $new;
            return true;
    }
    return null;
}
