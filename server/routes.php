<?php
//what Do I need here?
//- request handlers for roll and cachout requests
//- #Functions:
//check out ./functions.php

//I set this origin specifically for testing, 
//can be changed later 

require './functions.php';
require './variables.php';


header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header('Content-Type: application/json');


$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'GET') {
    if ($requestUri === '/roll') {
        //TODO: Check persistent variable values...
        //it resets to default each time...
        $credits--;
        echo roll($credits, $symbols);
    } elseif ($requestUri === '/cashOut') {
        echo cashOut();
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}