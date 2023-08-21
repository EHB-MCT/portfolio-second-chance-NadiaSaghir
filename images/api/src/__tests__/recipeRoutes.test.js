const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

/**
 * Test suite for the Recipe API.
 */
describe('Recipe API', () => {

  /**
   * Test for adding a new recipe.
   */
  describe('POST /recipes', () => {
    it('should add a new recipe', async () => {
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

    /**
     * Test for handling errors when adding a new recipe.
     */
    it('should handle errors when adding a new recipe', async () => {
      // Test case for adding an invalid recipe.
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
      const res = await chai.request(app).get('/recipes');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });

    /**
     * Test for handling errors when fetching recipes.
     */
    it('should handle errors when fetching recipes', async () => {
      // Test case for fetching recipes from an invalid route.
      const res = await chai.request(app).get('/invalid-route');

      expect(res).to.have.status(500);
      expect(res.body).to.have.property('error');
    });
  });
});
