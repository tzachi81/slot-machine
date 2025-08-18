import $ from 'jquery';
import { ICreditsResponse, IRollResponse, ISessionResponse } from '../src/types/gameTypes';
import { GameService } from '../src/services/gameService';
import { delayedRenderResult, initGame, resetCells, toggleButtons } from '../src/gameUtils/gameUtils';


$(function () {
    const gameService = new GameService();

    const DEFAULT_CREDITS = 3;
    const game: IRollResponse = {
        credits: DEFAULT_CREDITS,
        result: ['X', 'X', 'X']
    };


    initGame(DEFAULT_CREDITS);


    /**
     * Register button click handlers
     */
    
    $('#rollButton').on('click', async () => {
        $('#sessionMessage').html('Rolling...').fadeToggle(500);
        await roll();
    });

    $('#cashOutButton').on('click', async () => {
        await cashOut();
        toggleButtons('disable', ['#cashOutButton', '#rollButton']);

    });

    $('#resetButton').on('click', async () => {
        await resetGame();
    });


    async function resetGame() {
        const resetGameCredits: ICreditsResponse = await gameService.gameRequest('/reset');
        updateCredits(resetGameCredits.credits);
        resetCells();
        initGame(DEFAULT_CREDITS);
    }

    async function roll(): Promise<void> {

        toggleButtons('disable', ['#cashOutButton', '#rollButton']);
        try {

            const rollResult: IRollResponse = await gameService.gameRequest('/roll');
            game.result = rollResult.result;

            await delayedRenderResult(rollResult.result);

            updateCredits(rollResult.credits);

            $('#sessionMessage').hide();

        } catch (error: unknown) {
            if (typeof error === 'string') {
                console.error('Failed to roll:', error);
            }
        } finally {
            if (game.credits === 0) {
                toggleButtons('disable', ['#cashOutButton', '#rollButton']);
            } else {
                toggleButtons('enable', '#cashOutButton');
            }
        }
    }

    async function cashOut(): Promise<void> {

        try {
            const cashOutResult: ICreditsResponse = await gameService.gameRequest('/cashOut')
            $('.cashOut #amount').html(String(cashOutResult.credits));
            updateCredits(0);

        } catch (error: unknown) {
            if (typeof error === 'string') {
                console.error('Failed to roll:', error);
            }
        } finally {
            $('.cashOut p').show();
            toggleButtons('enable', '#resetButton');
        }
    }

    function updateCredits(credits: number) {
        if (credits === 0) {
            toggleButtons('enable', '#resetButton');
        }
        game.credits = credits;
        $('#credits').html(String(credits));
    }

});