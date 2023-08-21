[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/DhYPBlwE)

# Portfolio - RecipeShare 

RecipeShare is a platform for culinary enthusiasts to share their favorite recipes and discover new ones. Whether you're a seasoned chef or a home cook, RecipeShare provides a space to showcase your culinary creations and explore a world of delicious dishes.

This project was created for the Development 5 course as part of the Multimedia & Creative Technologies bachelor's degree.

## Features

- Create and Share Recipes: Share your favorite recipes with the RecipeShare community. Upload mouthwatering photos and step-by-step instructions to make your recipes easy to follow.

- Discover New Flavors: Explore a vast collection of recipes from passionate cooks worldwide. Discover new cuisines, techniques, and ingredients to inspire your culinary adventures.

## Prerequisites

Before starting, ensure you have either an existing .env file or create one at the project's root with the specified configuration:

- POSTGRES_USER=root
- POSTGRES_PASSWORD=root
- POSTGRES_DB=test   


## Getting started

1. Clone the repository using Git: `git clone https://github.com/EHB-MCT/portfolio-second-chance-NadiaSaghir.git`
2. Navigate to the project directory: `portfolio-second-chance-NadiaSaghir`
3. Build and start the app using Docker Compose: `docker-compose up --build`. It can take a while to build the whole project.

## Usage

Visit `http://localhost:3000` in your browser to access the frontend.

## Endpoints

- List of all recipes: http://localhost:3000
- Signup: To make a users, visit http://localhost:3000/signup
- Login: To login, visit http://localhost:3000/login
- After a sucessful login, you will be redirected on the 'Add a recipe' page, or you can visit http://localhost:3000/add-recipe


## Testing

- To test the recipeRoutes run src/__tests__/recipeRoutes.test.js, in the api directory (cd images/api).

----- If you have a execution error run this in the api directory (cd images/api) to force the running: 

powershell -ExecutionPolicy Bypass -File "C:\Users\Nadia Saghir\AppData\Roaming\npm\mocha.ps1" src/__tests__/recipeRoutes.test.js

- To test the routes run src/__tests__/routes.test.js, in the api directory (cd images/api).

----- If you have a execution error run this in the api directory (cd images/api) to force the running: 

powershell -ExecutionPolicy Bypass -File "C:\Users\Nadia Saghir\AppData\Roaming\npm\mocha.ps1" src/__tests__/routes.test.js

- To test the userRoutes run src/__tests__/userRoutes.test.js, in the api directory (cd images/api).

----- If you have a execution error run this in the api directory (cd images/api) to force the running: 

powershell -ExecutionPolicy Bypass -File "C:\Users\Nadia Saghir\AppData\Roaming\npm\mocha.ps1" src/__tests__/userRoutes.test.js

## Dependencies

Node.js and Server-side Libraries:
- https://expressjs.com/ 
- https://www.npmjs.com/package/express-session 
- https://github.com/motdotla/dotenv 
- https://www.npmjs.com/package/cors 
- https://nodejs.org/api/crypto.html

Front-end Libraries:
- https://react.dev/

Database and ORM:
- https://github.com/brianc/node-postgres
- https://knexjs.org/

Development Tools:
- https://github.com/remy/nodemon

## Resources

Development Tools:
- https://www.postman.com/
- https://www.docker.com/

Documentation and Comments:
- https://jsdoc.app/

CI/CD and Automation:
- https://docs.github.com/en/actions


## License

This project is released under the MIT License.

## Contact

Nadia Saghir

nadia.saghir@student.ehb.be

