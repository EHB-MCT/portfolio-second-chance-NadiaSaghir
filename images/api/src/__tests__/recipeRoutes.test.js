const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Recipe API', () => {

  describe('POST /recipes', () => {
    it('should add a new recipe', async () => {
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
      const res = await chai.request(app).get('/recipes');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });

    it('should handle errors when fetching recipes', async () => {
      const res = await chai.request(app).get('/invalid-route');

      expect(res).to.have.status(500);
      expect(res.body).to.have.property('error');
    });
  });
});
