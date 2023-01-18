import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { HttpService } from "src/shared/services/http";

@Injectable()
export class PostsService {
    constructor( private readonly http: HttpService, private readonly configService: ConfigService){
        this.http._baseUrl = this.configService.get('POST_SERVICE_URL');
    }

    getPosts(limit?: number, skip?: number, filters?: any) {
        const customConfig = {};
        return this.http.getList('posts', limit, skip, filters, customConfig);
    }

    getPost(id: number) {
        const customConfig = {};
        return this.http.get(`posts/${id}`, null, customConfig);
    }

    getPostsByParam(params: any) {
        const customConfig = {};
        return this.http.get('posts/search', params, customConfig);
    }

    getPostsOfUser(userId: number){
        const customConfig = {};
        return this.http.get(`posts/user/${userId}`, null, customConfig);
    }

    getCommentsForPosts(id: number){
        const customConfig = {};
        return this.http.get(`posts/${id}/comments`, null, customConfig);
    }

    addPost(body: any){
        const customConfig = {};
        return this.http.post('posts/add', body, customConfig);
    }

    putPost(id: number, body: any){
        const customConfig = {};
        return this.http.put(`posts/${id}`, body, customConfig);
    }

    deletePost(id: number){
        const customConfig = {};
        return this.http.delete(`posts/${id}`, customConfig);
    }
}
