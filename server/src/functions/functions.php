<?php
function createCombination($symbols)
{
    $keys = array_keys($symbols);
    return [
        $keys[array_rand($keys)],
        $keys[array_rand($keys)],
        $keys[array_rand($keys)]
    ];
}

function shouldReroll($credits): bool
{
    if ($credits >= 40 && $credits <= 60) {
        return rand(1, 100) <= 30;
    } elseif ($credits > 60) {
        return rand(1, 100) <= 60;
    }
    return false;
}

function cashOut()
{
    $userCash = getCredits();
    $_SESSION['credits'] = 0;
            session_unset();
            session_destroy();
    return json_encode(['credits' => $userCash]);
}

function isWin($result)
{
    return count(array_unique($result)) === 1;
}

function getCredits()
{
    return isset($_SESSION['credits']) ? $_SESSION['credits'] : 0;
}

function roll($symbols)
{
    if (getCredits() > 0) {
        error_log("### Before deduction: " . getCredits());
        
        $result = createCombination($symbols);
        
        if (shouldReroll(getCredits())) {
            $result = createCombination($symbols);
        }
        
        if (isWin($result)) {
            $_SESSION['credits'] += $symbols[$result[0]];
            error_log("### After win: " . getCredits());
        }else{
            $_SESSION['credits']--;
        }
        
        error_log("### Before response: " . getCredits());
        return json_encode([
            'credits' => getCredits(),
            'result' => $result
        ]);
    } else {
        return json_encode([
            'credits' => getCredits(),
            'result' => []
        ]);
        // return json_encode(['error' => 'Not enough credits']);
    }
}
?>