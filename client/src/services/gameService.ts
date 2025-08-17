import { IRollResponse, ICashOutResponse, ISessionResponse } from '../types/gameTypes';
import $ from 'jquery';

export class GameService {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async checkServer(): Promise<ISessionResponse> {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${this.baseUrl}/health`,
                method: 'GET',
                dataType: 'json',
                success: (data) => {
                    console.log(data);
                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown: string) => {
                    console.error('Error:', textStatus, errorThrown);
                    console.log('Response Text:', jqXHR.responseText);
                    reject(`Error:, Server is down or unresponsive`);
                }
            });
        });
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

    async cashOut(): Promise<ICashOutResponse> {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `${this.baseUrl}/cashOut`,
                method: 'GET',
                dataType: 'json',
                success: (data: ICashOutResponse) => {
                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject(new Error(`Cash out failed: ${textStatus}, ${errorThrown}`));
                }
            });
        });
    }

}