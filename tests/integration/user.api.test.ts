import request from 'supertest';
import app from '../../src/app';

describe('User API Integration Tests', () => {
  describe('GET /api/users', () => {
    it('should return all users', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      
      // Verificar estrutura do primeiro usuário
      const firstUser = response.body[0];
      expect(firstUser).toHaveProperty('id');
      expect(firstUser).toHaveProperty('name');
      expect(firstUser).toHaveProperty('email');
      expect(firstUser).toHaveProperty('createdAt');
      expect(firstUser).toHaveProperty('updatedAt');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user by id', async () => {
      const response = await request(app)
        .get('/api/users/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', '1');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
    });

    it('should return 404 for non-existing user', async () => {
      await request(app)
        .get('/api/users/999')
        .expect(404);
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user with valid data', async () => {
      const newUser = {
        name: 'Integration Test User',
        email: 'integration@test.com'
      };

      const response = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name', newUser.name);
      expect(response.body).toHaveProperty('email', newUser.email);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    });

    it('should return 400 for missing name', async () => {
      const invalidUser = {
        email: 'test@example.com'
      };

      const response = await request(app)
        .post('/api/users')
        .send(invalidUser)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 for missing email', async () => {
      const invalidUser = {
        name: 'Test User'
      };

      const response = await request(app)
        .post('/api/users')
        .send(invalidUser)
        .expect(400);

      expect(response.body).toHaveProperty('message');
    });

    it('should return 400 for empty name', async () => {
      const invalidUser = {
        name: '',
        email: 'test@example.com'
      };

      const response = await request(app)
        .post('/api/users')
        .send(invalidUser)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('obrigatório');
    });

    it('should return 400 for empty email', async () => {
      const invalidUser = {
        name: 'Test User',
        email: ''
      };

      const response = await request(app)
        .post('/api/users')
        .send(invalidUser)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('obrigatório');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update existing user', async () => {
      const updateData = {
        name: 'Updated Name'
      };

      const response = await request(app)
        .put('/api/users/1')
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('id', '1');
      expect(response.body).toHaveProperty('name', updateData.name);
    });

    it('should return 404 for non-existing user', async () => {
      const updateData = {
        name: 'Updated Name'
      };

      await request(app)
        .put('/api/users/999')
        .send(updateData)
        .expect(404);
    });

    it('should allow partial updates', async () => {
      const updateData = {
        email: 'updated@email.com'
      };

      const response = await request(app)
        .put('/api/users/1')
        .send(updateData)
        .expect(200);

      expect(response.body).toHaveProperty('id', '1');
      expect(response.body).toHaveProperty('email', updateData.email);
      expect(response.body).toHaveProperty('name'); // Nome deve permanecer
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete existing user', async () => {
      // Primeiro criar um usuário para deletar
      const newUser = {
        name: 'User to Delete',
        email: 'delete@test.com'
      };

      const createResponse = await request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201);

      const userId = createResponse.body.id;

      // Agora deletar o usuário
      await request(app)
        .delete(`/api/users/${userId}`)
        .expect(204);

      // Verificar se o usuário foi realmente deletado
      await request(app)
        .get(`/api/users/${userId}`)
        .expect(404);
    });

    it('should return 404 for non-existing user', async () => {
      await request(app)
        .delete('/api/users/999')
        .expect(404);
    });
  });

  describe('API Error Handling', () => {
    it('should return 404 for non-existing endpoints', async () => {
      await request(app)
        .get('/api/non-existing')
        .expect(404);
    });

    it('should handle malformed JSON', async () => {
      await request(app)
        .post('/api/users')
        .send('{"invalid": json}')
        .set('Content-Type', 'application/json')
        .expect(400);

      // Express automaticamente retorna 400 para JSON malformado
      // Não precisamos verificar a mensagem específica neste caso
    });
  });
});