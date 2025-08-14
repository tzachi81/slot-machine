export interface Game {
    credits: number;
    combination: string[];
}

export interface RollResponse {
    credits: number;
    result: string[];
}

export interface CashOutResponse {
    credits: number;
}