import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from "axios";

import { HttpClientBase } from './httpClientBase';

@Injectable()
export class HttpService {
    public _baseUrl: string;
    constructor(private readonly httpClientBase: HttpClientBase) { }

    getList(resource: string, limit?: number, skip?: number, filters?: any, customConfig?: any): Promise<AxiosResponse> {
        const config: AxiosRequestConfig = {
            method: 'Get',
            baseURL: this._baseUrl,
            url: resource,
            params: {
                limit: limit || null,
                skip: skip || null,
                ...filters
            },
            ...customConfig
        };
        return this.httpClientBase.buildRequest(config);
    }

    get(resource: string, params: any, customConfig: any): Promise<AxiosResponse> {
        const config: AxiosRequestConfig = {
            method: 'Get',
            baseURL: this._baseUrl,
            url: resource,
            params: {
                ...params
            },
            ...customConfig
        };
        return this.httpClientBase.buildRequest(config);
    }

    post(resource: string, body: any, customConfig: any): Promise<AxiosResponse> {
        const config: AxiosRequestConfig = {
            method: 'Post',
            baseURL: this._baseUrl,
            url: resource,
            data: {
                ...body
            },
            ...customConfig
        };
        return this.httpClientBase.buildRequest(config);
    }

    put(resource: string, body: any, customConfig: any): Promise<AxiosResponse> {
        const config: AxiosRequestConfig = {
            method: 'Put',
            baseURL: this._baseUrl,
            url: resource,
            data: {
                ...body
            },
            ...customConfig
        };
        return this.httpClientBase.buildRequest(config);
    }

    patch(resource: string, body: any, customConfig: any): Promise<AxiosResponse> {
        const config: AxiosRequestConfig = {
            method: 'Patch',
            baseURL: this._baseUrl,
            url: resource,
            data: {
                ...body
            },
            ...customConfig
        };
        return this.httpClientBase.buildRequest(config);
    }

    delete(resource: string, customConfig: any): Promise<AxiosResponse> {
        const config: AxiosRequestConfig = {
            method: 'Delete',
            baseURL: this._baseUrl,
            url: resource,
            ...customConfig
        };
        return this.httpClientBase.buildRequest(config);
    }
}
