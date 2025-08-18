<?php
session_set_cookie_params([
    'samesite' => 'None',
    'secure' => true,
    'httponly' => true
]);
session_start();
// error_log("Session ID: " . session_id());

if (!isset($_SESSION['credits'])) {
    $_SESSION['credits'] = 3;
    // error_log("Session initialized: credits = " . $_SESSION['credits']);
}
require '../src/routes/routes.php';
