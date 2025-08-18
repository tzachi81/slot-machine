import { GameService } from "../services/gameService";
import { IRollResponse } from "../types/gameTypes";


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

export async function delayedRenderResult(result: string[]): Promise<void> {

    resetCells();

    const delayMs = 1000;


    for (let i = 0; i < result.length; i++) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
        $(`#cell-${i + 1}`).html(getFruitIcon(result[i])).removeClass('spinning');
    }

    const firstItem = result[0];
    const isWin = result.every(item => item === firstItem);

    if (isWin) {
        $('#slots td').addClass('win');
        $('#sessionMessage').show().html('Win!')
    } else {
        $('#slots td').removeClass('win');
    }

    toggleButtons('enable', '#rollButton');
}

export async function initGame() {

    const gameService = new GameService();

    $('#credits').html(String(gameService.gameData.credits));
    $('#slots td').removeClass('win')

    toggleButtons('enable', ['#cashOutButton', '#rollButton']);

    $("#sessionMessage").html('Checking server...');

    resetCells();

    await gameService.gameRequest('/reset')
        .then((response: IRollResponse) => {
            $("#sessionMessage").html(`Server is up.`).fadeOut(2000);
            toggleButtons('disable', '#resetButton');
            toggleButtons('enable', ['#cashOutButton', '#rollButton']);
            gameService.gameData.credits = response.credits;
        }).catch((error: unknown) => {
            $("#sessionMessage").html((error instanceof Error) ? error.message : String(error));
        }
        )

}