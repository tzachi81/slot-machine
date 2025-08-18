import $ from 'jquery';
import { IRollResponse } from '../src/types/gameTypes';
import { GameService } from '../src/services/gameService';
import { delayedRenderResult, hideSessionMessage, initGame, resetCells, showSessionMessage, toggleButtons } from '../src/gameUtils/gameUtils';


$(function () {
    const gameService = new GameService();

    /**
     * Initialize game
     */

    initGame();

    /**
     * Register button click handlers
     */

    $('#rollButton').on('click', async () => {
        
        showSessionMessage('Rolling...');
        toggleButtons('disable', ['#cashOutButton', '#rollButton']);
        $('#slots td').removeClass('win').addClass('spinning');
        await roll();
    });

    $('#cashOutButton').on('click', async () => {
        await cashOut();
        toggleButtons('disable', ['#cashOutButton', '#rollButton']);
    });

    $('#resetButton').on('click', async () => {
        await initGame();
    });

    async function roll(): Promise<void> {

        try {

            const rollResult: IRollResponse = await gameService.gameRequest('/roll');
            gameService.gameData.result = rollResult.result;

            const isWinnerroll = await delayedRenderResult(rollResult.result);

            if (isWinnerroll) {
                $('#slots td').addClass('win');
                showSessionMessage('Win!');
            } else {
                $('#slots td').removeClass('win');
            }

            toggleButtons('enable', '#rollButton');

            await updateCredits(rollResult.credits);
            
            
        } catch (error: unknown) {
            if (typeof error === 'string') {
                console.error('Failed to roll:', error);
            }
        } finally {
            if (gameService.gameData.credits === 0) {
                toggleButtons('disable', ['#cashOutButton', '#rollButton']);
            } else {
                toggleButtons('enable', '#cashOutButton');
            }
            hideSessionMessage();
        }
    }

    async function cashOut(): Promise<void> {

        try {
            const cashOutResult: IRollResponse = await gameService.gameRequest('/cashOut');
            showSessionMessage(`You get: ${String(cashOutResult.credits)}`);

            await updateCredits(0);

        } catch (error: unknown) {
            if (typeof error === 'string') {
                console.error('Failed to roll:', error);
            }
        } finally {
            toggleButtons('enable', '#resetButton');
        }
    }

    async function updateCredits(credits: number) {
        await gameService.updateGamesCredits(credits);
        $('#credits').html(String(gameService.gameData.credits));
        if (gameService.gameData.credits === 0) {
            toggleButtons('enable', '#resetButton');
        }
    }

});