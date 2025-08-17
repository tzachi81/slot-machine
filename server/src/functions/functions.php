<?php
//- cashout() - return cresits amount 
//- roll()
//- [done] createcombination (of symbols)
//- [done] shouldReroll() returns boolean by chance percent
//- some additional helper functions???

function createCombination($symbols) {
    
    $keys = array_keys($symbols);

    $temp = [ 
        $keys[array_rand($keys)],
        $keys[array_rand($keys)],
        $keys[array_rand($keys)]
    ];

    return $temp;
}

function shouldReroll($credits): bool {
    if ($credits >= 40 && $credits <= 60) {
        return rand(1, 100) <= 30;
    } elseif ($credits > 60) {
        return rand(1, 100) <= 60;
    }
    return false;
}

function cashOut() {
    global $credits; 
    $userCash = $credits;
    $credits = 0;
    return json_encode(['credits' => $userCash]);
}

function isWin($result) {
    return count(array_unique($result)) === 1;
}

function roll($credits, $symbols) {
    $credits -= 1;
    $result = createCombination($symbols);
    
    if (shouldReroll($credits)) {
        $result = createCombination($symbols);
    } else {
        $result;
    }

    if (isWin($result)) {
        $credits += $symbols[$result[0]];
    }

    return json_encode([
        'credits' => $credits, 
        'result' => isset($result) ? $result : []
    ]);
}