import { HttpStatus, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { describe } from 'vitest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const config = new DocumentBuilder()
      .setTitle('Hello example')
      .setDescription('The Hello API description')
      .setVersion('1.0')
      .setOpenAPIVersion('3.1.0')
      .addTag('hello')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello world!');
  });

  it('/ (GET) access swagger api and verify that there are no circular dependencies', async () => {
    const response = await request(app.getHttpServer()).get(
      '/api/swagger-ui-init.js',
    );
    expect(response.text).toContain('The Hello API description');
    expect(response.headers['content-type']).toContain(
      'application/javascript',
    );
    expect(response.status).toBe(HttpStatus.OK);
  });
});
