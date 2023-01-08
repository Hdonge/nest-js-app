import { Injectable, Inject } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse, AxiosRequestConfig, AxiosResponseTransformer } from 'axios';
import { response } from "express";

@Injectable()
export class HttpClientBase {
    token: string;
    constructor(
        private readonly httpService: HttpService
    ) {
        this.fetchToken();
    }

    async buildRequest(config): Promise<AxiosResponse> {
        this.httpService.axiosRef.defaults.headers.common['Authorization'] = this.token ? `Bearer ${this.token}` : null;
        return this.httpService.axiosRef(config)
            .then(response => response.data);
    }

    private async fetchToken() {
        this.token = await this.httpService.axiosRef({
            url: 'https://dummyjson.com/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: ({
                username: 'kminchelle',
                password: '0lelplR',
            })
        })
    }
}
