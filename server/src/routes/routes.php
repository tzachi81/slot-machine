<?php
//what Do I need here?
//- request handlers for roll and cachout requests
//- #Functions:
//check out ./functions.php


require '../src/config/config.php';
require '../src/functions/functions.php';

//Display errors
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Start the session
session_start();

//I allowed specific origin for testing, 
//can be changed later 
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');



$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'GET') {

    switch ($requestUri) {
        case '/health':
            //I learned the power of php session methods from:
            //- "https://www.w3schools.com/php/php_sessions.asp"
            //- and got example from: https://hackernoon.com/storybook-v2-comic-book-builder-part-1-gathering-content

            session_unset();
            session_destroy();
            if (session_status() != 1)  session_start();

            echo json_encode(['status' => 'up', 'message' => 'Session has been reset.']);

            break;
        case '/roll':
            //TODO: Check persistent variable values...
            //it resets to default each time...
            $credits--;
            echo roll($credits, $symbols);
            break;

        case '/cashOut':
            echo cashOut();
            break;
        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
            break;
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>