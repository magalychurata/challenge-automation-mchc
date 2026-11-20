import { test, expect } from '../src/fixtures/test.fixture';
import { PostsService, PostPayload } from '../src/services/posts.service';

test.describe('JSONPlaceholder API - POST', () => {

  test(
    'Should create a new post successfully',
    async ({ request }, testInfo) => {

      const postsService = new PostsService(request);

      const payload: PostPayload = {
        title: 'QA Automation',
        body: 'Testing API using Playwright and TypeScript',
        userId: 1
      };

      await test.step('Send POST request', async () => {

        const response = await postsService.createPost(payload);

        const responseBody = await response.json();

        // Adjuntar evidencia de la respuesta
        await testInfo.attach('post-response.json', {
          body: JSON.stringify(responseBody, null, 2),
          contentType: 'application/json'
        });

        // Validar status HTTP
        expect(response.status()).toBe(201);

        // Validar los datos enviados
        expect(responseBody.title).toBe(payload.title);
        expect(responseBody.body).toBe(payload.body);
        expect(responseBody.userId).toBe(payload.userId);

        // Validar que se haya generado un ID
        expect(responseBody.id).toBeDefined();
      });

    }
  );

});