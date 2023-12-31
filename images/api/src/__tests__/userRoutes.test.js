const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);

/**
 * Test suite for User Routes.
 */
describe('User Routes', () => {
  /**
   * Test for fetching all users.
   */
  it('should return all users', (done) => {
    chai
      .request(app)
      .get('/users')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  /**
   * Test for registering a new user.
   */
  it('should register a new user', (done) => {
    /**
     * @type {Object}
     */
    const newUser = {
      name: 'TestUser',
      email: 'test@example.com',
      password: 'testpassword',
    };

    chai
      .request(app)
      .post('/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').equal('User registered successfully.');
        done();
      });
  });

});
