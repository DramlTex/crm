<?php
function load_db() {
    $file = __DIR__.'/database.json';
    if (!file_exists($file)) {
        file_put_contents($file, json_encode([]));
    }
    $data = json_decode(file_get_contents($file), true);
    if (!isset($data['clients']))   $data['clients']   = [];
    if (!isset($data['deals']))     $data['deals']     = [];
    if (!isset($data['tasks']))     $data['tasks']     = [];
    if (!isset($data['documents'])) $data['documents'] = [];
    if (!isset($data['articles']))  $data['articles']  = [];
    if (!isset($data['messages']))  $data['messages']  = [];
    if (!isset($data['integrations'])) $data['integrations'] = [];
    if (!isset($data['settings']))  $data['settings']  = ['menu' => [
        'clients'=>true,
        'deals'=>true,
        'tasks'=>true,
        'documents'=>false,
        'knowledge'=>false,
        'chat'=>false,
        'integrations'=>false
    ]];
    if (!isset($data['stages']))    $data['stages']    = ['Новая','В работе','Закрыта'];
    return $data;
}
function save_db($data) {
    file_put_contents(__DIR__.'/database.json', json_encode($data, JSON_UNESCAPED_UNICODE));
}
