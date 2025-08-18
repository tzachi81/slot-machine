import { IResponseTypes } from '../types/gameTypes';
import $ from 'jquery';

export class GameService {
    private readonly baseUrl: string;

    constructor(baseUrl: string = 'http://localhost:8000') {
        this.baseUrl = baseUrl;
    }

    async gameRequest(endpoint: string, method: string = 'GET', dataType: string = 'json', data: any = null): Promise<keyof IResponseTypes> {

        const url = `${this.baseUrl}${endpoint}`;

        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                method,
                dataType,
                data: data && method !== 'GET' ? JSON.stringify(data) : null,
                xhrFields: {
                    withCredentials: true
                },
                success: (data) => {
                    resolve(data);
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    reject(new Error(`Reset failed: ${textStatus}, ${errorThrown}`));
                }
            });
        });

    }
}