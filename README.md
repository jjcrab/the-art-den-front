# The Little Art Den

This is an app for art school students to show and sell their artworks. And also a place for those who wants to have unique original art without paying crazy amount of money. Hopefully this app can help art school students to collect some tuition and support their early artistic journey.

## Tech Stack

- Frontend: React, Node, JavaScrip, React-Bootstrap, Material UI, Styled Components, Flexbox, Grid
- Backend: Python, Django, PostgresSQL,AWS S3, Docker

## Deployment: Heroku

- Frontend: https://dashboard.heroku.com/apps/the-art-den-front
- Backend: https://pacific-badlands-47817.herokuapp.com/

## Docker Image:

https://hub.docker.com/r/jingjingli/artden

## List of backend models and their properties

### Student (user)

- Email (".edu" is required for Stretch goal)
- Username

### Artist

- Name
- Avatar
- School
- Graduation year
- Personal story

### Artwork

- Artist
- Title
- Artwork Image
- Price
- Added time

### Customer (2nd type of user, stretch goal)

- email
- username

## React component hierarchy

- header
- home
- about
- artworks
- artwork detail
- artists
- artist card
- student login/signup
- customer/visitor login/signup (stretch goal)
- footer

## User stories

### MVP

- As an art student, I want to have a student user account which only need my email address and password to sign up and login.
- As an art student, I want to have a personal page so that I can introduce my self.
- As an art students, I want to have a page only showing my uploaded artworks so that I can update them.
- As a customer/visitor, I want to see all the artworks and detail of each of them.
- As an admin, I want to make sure the artist is a college student which means the students should use ".edu" email address to register this app.

### Stretch Goals

- As a customer, I want to 'like/save' the artist.
- As a customer, I want to sort the artworks by price.
- As a customer/visitor, I want to see an artists list and can find the artists by school so that I can support my alumni(if any)
- As a customer, I want to 'buy' the artwork I like/select.

### Wireframes

![MacBook Pro - 1 (1)](https://user-images.githubusercontent.com/78054396/114994939-8f19a580-9e5a-11eb-88b9-d0df4c7e10fd.png)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
