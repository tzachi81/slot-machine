import { GameService } from "../services/gameService";
import { ISessionResponse } from "../types/gameTypes";



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
        $(this).text('X');
    });
}

export async function delayedRenderResult(result: string[]): Promise<void> {

    resetCells();

    const delayMs = 1000;

    for (let i = 0; i < result.length; i++) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
        $(`#cell-${i + 1}`).text(result[i]);
    }
    toggleButtons('enable', '#rollButton');
}

export async function initGame(DEFAULT_CREDITS: number) {

    const gameService = new GameService();

    $('#credits').html(String(DEFAULT_CREDITS));
    $('.cashOut p').hide();
    $('.cashOut #amount').html('');

    toggleButtons('enable', ['#cashOutButton', '#rollButton']);

    $("#sessionMessage").html('Checking server...');

    resetCells();

    await gameService.gameRequest('/health')
        .then((response: ISessionResponse) => {
            if (response.status === 'up') {
                $("#sessionMessage").html(`Server is ${response.status}. ${response.message}`).fadeOut(3000);
                toggleButtons('disable', '#resetButton');
                toggleButtons('enable', ['#cashOutButton', '#rollButton']);


            }
        }).catch((error: unknown) => {
            $("#sessionMessage").html((error instanceof Error) ? error.message : String(error));
        }
        )

}