import { Controller, Get, HttpCode, Query, Param, Post, Body, Put, Delete } from "@nestjs/common";

import { ICreatePostDto } from "./dtos/create-post.dto";
import { PostsService } from "./posts.service";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    @HttpCode(200)
    getPosts(
        @Query('limit') limit: number,
        @Query('skip') skip: number,
        @Query('select') select: string
    ) {
        return this.postsService.getPosts(limit, skip, { select });
    }

    @Get('search')
    @HttpCode(200)
    seachPosts(
        @Query() params: any
    ) {
        console.log(params);
        return this.postsService.getPostsByParam(params);
    }

    @Get(':id')
    @HttpCode(200)
    getPost(
        @Param('id') id: number
    ) {
        return this.postsService.getPost(id);
    }

    @Get('/user/:id')
    @HttpCode(200)
    getPostsOfUser(
        @Param('id') userId: number
    ) {
        return this.postsService.getPostsOfUser(userId);
    }

    @Get(':id/comments')
    @HttpCode(200)
    getCommentsForPosts(
        @Param('id') postId: number
    ) {
        return this.postsService.getCommentsForPosts(postId);
    }

    @Post()
    @HttpCode(201)
    addPost(
        @Body() createPostDto: ICreatePostDto
    ) {
        return this.postsService.addPost(createPostDto)
    }

    @Put(':id')
    updateCart(
        @Param('id') id: number,
        @Body() updatePostDto: ICreatePostDto
    ) {
        return this.postsService.putPost(id, updatePostDto);
    }

    @Delete(':id')
    deleteCart(
        @Param('id') id: number
    ) {
        return this.postsService.deletePost(id);
    }
}
