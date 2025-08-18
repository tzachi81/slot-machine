export interface IRollResponse {
    credits: number;
    result: string[];
}

export interface ISessionResponse {
    status: string,
    message: string
}

export type ICreditsResponse  = Omit<IRollResponse, 'result'>

export type IResponseTypes = IRollResponse | ISessionResponse | ICreditsResponse