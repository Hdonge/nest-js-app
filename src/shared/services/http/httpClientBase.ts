import { Injectable, OnModuleInit } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from 'axios';
import { Logger } from "../logger";

@Injectable()
export class HttpClientBase implements OnModuleInit {
    token: string;
    constructor(
        private readonly httpService: HttpService,
        private readonly logger: Logger
    ) {
        this.logger.mainContext = 'HttpClientBase';
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

    onModuleInit() {
        this.httpService.axiosRef.interceptors.request.use((config) => {
            config['metadata'] = { ...config['metadata'], startDate: new Date() };
            this.logger.verbose(JSON.stringify(config, null, ' '), 'requestInterceptor')
            return config;
        });

        this.httpService.axiosRef.interceptors.response.use((response) => {
            const { config, data } = response;
            config['metadata'] = { ...config['metadata'], endDate: new Date() };
            const duration = config['metadata'].endDate.getTime() - config['metadata'].startDate.getTime();
            this.logger.verbose(`${config.method.toUpperCase()} ${config.baseURL + config.url} responseStatus ${response.status} ${response.statusText} ${duration}ms`, 'responseInterceptor');
            this.logger.verbose(`${JSON.stringify(response.headers, null, ' ')}`, 'responseInterceptor.headers');
            this.logger.verbose(`${JSON.stringify(response.data, null, ' ')}`, 'responseInterceptor.data');
            return response;
        }, (error) => {
            this.logger.error(error.message, error.stack, 'responseInterceptor');
            return Promise.reject(error);
        });
    }
}
