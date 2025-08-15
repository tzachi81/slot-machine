import { IRollResponse, ICashOutResponse } from '../types/gameTypes';
import $ from 'jquery';

export class GameService {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async roll(): Promise<IRollResponse> {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${this.baseUrl}/roll`,
                method: 'GET',
                dataType: 'json',
                success: (data: IRollResponse) => {
                    resolve(data);
                },
                error: (jqueryXhr, textStatus, errorThrown: string) => {
                    reject(new Error(`Roll failed: ${textStatus}, ${errorThrown}`));
                }
            });
        });
    }

}