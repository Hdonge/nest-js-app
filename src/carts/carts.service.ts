import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

import { HttpService } from 'src/shared/services/http';

@Injectable()
export class CartsService {
    constructor(private readonly http: HttpService, private readonly configService: ConfigService) {
        this.http._baseUrl = 'https://dummyjson.com/';
    }

    getCarts(limit?: number, skip?: number, filters?: any) {
        const customConfig = {};
        return this.http.getList('carts', limit, skip, filters, customConfig);
    }

    getCart(id: number) {
        const customConfig = {};
        return this.http.get(`carts/${id}`, null, customConfig);
    }

    getCartsOfUser(userId: number){
        const customConfig = {};
        return this.http.get(`carts/user/${userId}`, null, customConfig);
    }

    getCartByParam(params: any) {
        const customConfig = {};
        this.http.get('carts', params, customConfig);
    }

    postCart(body: any){
        const customConfig = {};
        return this.http.post('carts/add', body, customConfig);
    }

    putCart(id: number, body: any){
        const customConfig = {};
        return this.http.put(`carts/${id}`, body, customConfig);
    }

    patchCart(id: number, body: any){
        const customConfig = {};
        return this.http.patch(`carts/${id}`, body, customConfig);
    }

    deleteCart(id: number){
        const customConfig = {};
        return this.http.delete(`carts/${id}`, customConfig);
    }
}
