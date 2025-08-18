<?php
require '../vendor/autoload.php';

use Dotenv\Dotenv;
 
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

session_set_cookie_params([
    'samesite' => 'Strict',
    'secure' => true,
    'httponly' => true,
]);

session_start();

error_reporting(0);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', '../logs/error.log');

require '../src/config/config.php';

if (!isset($_SESSION['credits'])) {
    $_SESSION['credits'] = $defaultCredits;
    error_log("Session initialized: credits = " . $_SESSION['credits']);
}

require '../src/routes/routes.php';
?>