<?php
function deals_api($action, &$db) {
    switch ($action) {
        case 'get_deals':
            return $db['deals'];
        case 'add_deal':
            $data = json_decode(file_get_contents('php://input'), true);
            $new = [
                'id'        => time(),
                'title'     => $data['title'] ?? 'Новая сделка',
                'client_id' => $data['client_id'] ?? '',
                'amount'    => $data['amount'] ?? 0
            ];
            $db['deals'][] = $new;
            return true;
    }
    return null;
}
