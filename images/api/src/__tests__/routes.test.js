const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const db = require('../db/db');

chai.use(chaiHttp);
const expect = chai.expect;

/**
 * Test suite for User and Recipe Routes.
 */
describe('User and Recipe Routes', () => {
  before(async () => {
    // Ensure the database is up to date before running tests.
    await db.migrate.latest();

  });

  after(async () => {
    // Clean up the database after running tests.
    await db.destroy();
  });

  /**
   * Test suite for User Routes.
   */
  describe('User Routes', () => {
    /**
     * Test for creating a new user account.
     */
    describe('POST /signup', () => {
      it('should create a new user account', async () => {
        /**
         * @type {Object}
         */
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
        // Test case for creating a new user with invalid data.
        const invalidUser = {
            // Add invalid user data here.
        };

        const res = await chai
          .request(app)
          .post('/signup')
          .send(invalidUser);

        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
      });
    });

    /**
     * Test for logging in an existing user.
     */
    describe('POST /login', () => {
      it('should log in an existing user', async () => {
        /**
         * @type {Object}
         */
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
        // Test case for logging in with invalid credentials.
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

    /**
     * Test for fetching all users.
     */
    describe('GET /users', () => {
      it('should fetch all users', async () => {
        const res = await chai
          .request(app)
          .get('/users');

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });

      it('should handle errors when fetching users', async () => {
        // Test case for fetching users from an invalid route.
        const res = await chai
          .request(app)
          .get('/invalid-route');

        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
      });
    });

    /**
     * Test for deleting all users.
     */
    describe('DELETE /users', () => {
      it('should delete all users', async () => {
        const res = await chai
          .request(app)
          .delete('/users');

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('All users deleted successfully');
      });
    });

    /**
     * Test for deleting a specific user by ID.
     */
    describe('DELETE /users/:id', () => {
      it('should delete a specific user by ID', async () => {
        // ID of the user to be deleted.
        const userIdToDelete = 123;

        const res = await chai
          .request(app)
          .delete(`/users/${userIdToDelete}`);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('User deleted successfully');
      });
    });
  });

  /**
   * Test suite for Recipe Routes.
   */
  describe('Recipe Routes', () => {
    /**
     * Test for creating a new recipe.
     */
    describe('POST /recipes', () => {
      it('should create a new recipe', async () => {
        /**
         * @type {Object}
         */
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
        // Test case for creating a new recipe with invalid data.
        const invalidRecipe = {
            // Add invalid recipe data here.
        };

        const res = await chai
          .request(app)
          .post('/recipes')
          .send(invalidRecipe);

        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
      });
    });

    /**
     * Test for fetching all recipes.
     */
    describe('GET /recipes', () => {
      it('should fetch all recipes', async () => {
        const res = await chai
          .request(app)
          .get('/recipes');

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
      });

      it('should handle errors when fetching recipes', async () => {
        // Test case for fetching recipes from an invalid route.
        const res = await chai
          .request(app)
          .get('/invalid-route');

        expect(res).to.have.status(500);
        expect(res.body).to.have.property('error');
      });
    });
  });
});
