//What do I need here?

//init (game)
//service instance
//role click call handler
//cashOut click handler
//enable/disable buttons while awaiting response...
//render results in the cells with delay
//render the first result ['x','x','x']. Maybe apply it in the init function?


import { IRollResponse } from './types/gameTypes';
import { GameService } from './services/gameService';
import $ from 'jquery';


$(function () {
    const baseApiUrl = 'http://localhost:8000';
    const gameService = new GameService(baseApiUrl);

    let game: IRollResponse = { credits: 10, result: ['X', 'X', 'X'] };


    $('#roleButton').on('click', async () => {
        console.log('Roling...');
        await roll();
    });

    async function roll(): Promise<void> {
        try {

            const rollResult: IRollResponse = await gameService.roll();
            console.log('rollResult', rollResult);

            // I need to replace it with delyed rendering function
            // something like:
            //await renderDelayedResult(rollResult.result);
            renderResult(rollResult);

        } catch (error: unknown) {
            if (typeof error === 'string') {
                console.error('Failed to roll:', error);
            }
        } finally {
            //???
        }
    }

    function renderResult(rollResult: IRollResponse) {

        rollResult.result.forEach((symbol, index) => {
            $(`#cell-${index + 1}`).text(symbol);
        });
    }

});