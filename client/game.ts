import { ICashOutResponse, IRollResponse } from './types/gameTypes';
import { GameService } from './services/gameService';
import $ from 'jquery';


$(function () {
    const baseApiUrl = 'http://localhost:8000';
    const gameService = new GameService(baseApiUrl);

    let game: IRollResponse = { credits: 10, result: ['X', 'X', 'X'] };

    function initGame() {

        $('.cashOut p').hide();
        $('.cashOut #amount').html('');
        $('#credits').html(String(game.credits));
    }


    initGame();

    $('#rollButton').on('click', async () => {
        $("#rollButton").prop('disabled', true);
        await roll();
    });
    $('#cashOutButton').on('click', async () => {
        await cashOut();
        $("#rollButton").prop('disabled', true);
        $('#cashOutButton').prop('disabled', true);
    });

    async function roll(): Promise<void> {

        try {
            game.credits--;
            updateCredits(game.credits);
            if (game.credits === 0) {
                return;
            }

            const rollResult: IRollResponse = await gameService.roll();
            console.log('rollResult', rollResult);

            await delayedRenderResult(rollResult.result);

            updateCredits(rollResult.credits);
            
        } catch (error: unknown) {
            if (typeof error === 'string') {
                console.error('Failed to roll:', error);
            }
        } finally {
          
        }
    }

    async function cashOut(): Promise<void> {

        try {
            const cashOutResult: ICashOutResponse = await gameService.cashOut();
            updateCredits(cashOutResult.credits);
            const total = cashOutResult.credits + game.credits;
            $('.cashOut #amount').html(String(total));

        } catch (error: unknown) {
            if (typeof error === 'string') {
                console.error('Failed to roll:', error);
            }
        } finally {

            $('.cashOut p').show();
        }
    }

    function updateCredits(credits: number) {
        game.credits = credits;
        if (credits) $('#credits').html(String(game.credits));
    }


    function resetCells() {
        game.result.forEach((symbol, index) => {
            $(`#cell-${index + 1}`).text('X');
        });
    }

    async function delayedRenderResult(result: string[]): Promise<void> {
        //I replaced the previous render function to delayed render:


        resetCells();

        for (let i = 0; i < result.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            game.result[i] = result[i];
            $(`#cell-${i + 1}`).text(game.result[i]);
        }
        $("#rollButton").removeAttr('disabled');
    }
});