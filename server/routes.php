<?php
//what Do I need here?
//- request handlers for roll and cachout requests
//- #Functions:
//- cashout() - return cresits amount 
//- roll()
//- createcombination (of symbols)
//- shouldReroll() returns boolean by chance percent
//- some additional helper functions???

//I set this origin specifically for testing, 
//can be changed later 

header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header('Content-Type: application/json');


$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'GET') {
    if ($requestUri === '/roll') {
       //dont forget: credits--;
        echo('rolling...');
        //call `echo roll()`;
    } elseif ($requestUri === '/cashOut') {
        //call `echo cashOut()`;
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>