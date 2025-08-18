import { GameService } from '../services/gameService';
import { IRollResponse } from '../types/gameTypes';


function getFruitIcon(letter: string): string {
    /**
      * REF: I selected the fruit emojis from:
      * https://emojipedia.org/en
      */
    switch (letter) {
        case 'C':
            return '🍒';
        case 'L':
            return '🍋';
        case 'O':
            return '🍊';
        case 'W':
            return '🍉';
        default:
            return '❓';
    }
}

export function toggleButtons(action: 'enable' | 'disable', button: string | string[]) {

    const toggle = (btn: string) => {
        (action === 'disable') ? $(btn).prop('disabled', true) : $(btn).removeAttr('disabled');
    }

    if (Array.isArray(button)) {
        button.forEach(btn => {
            toggle(btn);
        });
    } else {
        toggle(button);
    }

}

export function resetCells() {
    $('#slots').children().each(function () {
        $(this).html(getFruitIcon('X'));
    });
}

export async function delayedRenderResult(result: string[]): Promise<boolean> {

    resetCells();

    const delayMs = 1000;

    for (let i = 0; i < result.length; i++) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
        $(`#cell-${i + 1}`).html(getFruitIcon(result[i])).removeClass('spinning');
    }

    const firstItem = result[0];
    const isWinnerRoll = result.every(item => item === firstItem);
    return isWinnerRoll;
}

export async function initGame() {

    const gameService = new GameService();

    resetCells();

    await gameService.gameRequest('/reset')
        .then((response: IRollResponse) => {
            showSessionMessage(`Server is up.`);
            toggleButtons('disable', '#resetButton');
            toggleButtons('enable', ['#cashOutButton', '#rollButton']);
            gameService.gameData.credits = response.credits;
        }).catch((error: unknown) => {
            showSessionMessage((error instanceof Error) ? error.message : String(error));
        }
        )

    $('#credits').html(String(gameService.gameData.credits));
    $('#slots td').removeClass('win');

}

export function showSessionMessage(message: string) {
     $('#sessionMessage').html(message).fadeToggle(2000);
}
export function hideSessionMessage() {
     $('#sessionMessage').hide('slow');
}
