export interface IGame {
    credits: number;
    combination: string[];
}

export interface IRollResponse {
    credits: number;
    result: string[];
}

export interface ICashOutResponse {
    credits: number;
}