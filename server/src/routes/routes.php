<?php

require '../src/config/config.php';
require '../src/functions/functions.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

if (isset($_SERVER['HTTP_ORIGIN']) && preg_match('/^http:\/\/(localhost|127\.0\.0\.1):[0-9]+$/', $_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
} else {
    header('Access-Control-Allow-Origin: *');
}
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];


if ($requestMethod === 'GET') {
    switch ($requestUri) {
        case '/roll':
            echo roll($symbols);
            break;

        case '/cashOut':
            echo cashOut();
            break;
            
        case '/reset':
            session_unset();
            session_destroy();
            echo json_encode(['credits' => getCredits()]);
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

//For testings
// error_log("Session closing: ID = " . session_id() . ", credits = " . $_SESSION['credits']);
?>