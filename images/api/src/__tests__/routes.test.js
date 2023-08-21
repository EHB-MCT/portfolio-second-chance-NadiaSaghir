const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const db = require('../db/db');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User and Recipe Routes', () => {
  before(async () => {
    await db.migrate.latest();

  });

  after(async () => {
    await db.destroy();
  });

  describe('User Routes', () => {
    describe('POST /signup', () => {
      it('should create a new user account', async () => {
        const newUser = {
          username: 'testuser',
          password: 'testpassword',
        };

        const res = await chai
          .request(app)
          .post('/signup')
          .send(newUser);

        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').equal('User account created successfully');
      });

      it('should handle errors when creating a new user account', async () => {
        const invalidUser = {
        };

        const res = await chai
          .request(app)
          .post('/signup')
          .send(invalidUser);

        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
      });
    });

    describe('POST /login', () => {
      it('should log in an existing user', async () => {
        const userCredentials = {
          username: 'testuser',
          password: 'testpassword',
        };

        const res = await chai
          .request(app)
          .post('/login')
          .send(userCredentials);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('Login successful');
      });

      it('should handle errors when logging in', async () => {
        const invalidCredentials = {
          username: 'nonexistentuser',
          password: 'incorrectpassword',
        };

        const res = await chai
          .request(app)
          .post('/login')
          .send(invalidCredentials);

        expect(res).to.have.status(401);
        expect(res.body).to.have.property('error');
      });
    });

    describe('GET /users', () => {
      it('should fetch all users', async () => {
        const res = await chai
          .request(app)
          .get('/users');

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });

      it('should handle errors when fetching users', async () => {
        const res = await chai
          .request(app)
          .get('/invalid-route');

        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
      });
    });

    describe('DELETE /users', () => {
      it('should delete all users', async () => {
        const res = await chai
          .request(app)
          .delete('/users');

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('All users deleted successfully');
      });
    });

    describe('DELETE /users/:id', () => {
      it('should delete a specific user by ID', async () => {
        const userIdToDelete = 123;

        const res = await chai
          .request(app)
          .delete(`/users/${userIdToDelete}`);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('User deleted successfully');
      });
    });
  });

  describe('Recipe Routes', () => {
    describe('POST /recipes', () => {
      it('should create a new recipe', async () => {
        const newRecipe = {
          title: 'Test Recipe',
          ingredients: 'Test Ingredients',
          preparation: 'Test Preparation',
          servings: 4,
          image: 'test.jpg',
        };

        const res = await chai
          .request(app)
          .post('/recipes')
          .send(newRecipe);

        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').equal('Recipe added successfully');
      });

      it('should handle errors when adding a new recipe', async () => {
        const invalidRecipe = {
        };

        const res = await chai
          .request(app)
          .post('/recipes')
          .send(invalidRecipe);

        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
      });
    });

    describe('GET /recipes', () => {
      it('should fetch all recipes', async () => {
        const res = await chai
          .request(app)
          .get('/recipes');

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });

      it('should handle errors when fetching recipes', async () => {
        const res = await chai
          .request(app)
          .get('/invalid-route');

        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
      });
    });
  });
});
