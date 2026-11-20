import { APIRequestContext } from '@playwright/test';

export interface PostPayload {
  title: string;
  body: string;
  userId: number;
}

export class PostsService {

  constructor(
    private readonly request: APIRequestContext
  ) {}

  async createPost(payload: PostPayload) {

    return await this.request.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        data: payload
      }
    );
  }
}