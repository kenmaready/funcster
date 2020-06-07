# </> funcster

![funcster logo](logo.png)

## Introduction

Funcster is the front end of a capstone project for the Udacity Full-Stack Developer Nanodegree. The repository for the back end of the project is [here](https://github.com/kenmaready/funcster-api).

funcster is a simple app allowing 'Coders' to post, store and edit snippets of python code in their own snippet library, and their 'Mentors' to view, revise and comment on that code. The front end has been built using [React](https://reactjs.org/) and uses [`react-redux`](https://react-redux.js.org/) as a state manager/store. [`react-bootstrap`](https://react-bootstrap.github.io/) is used for some minimal styling. The snippet editor is powered by [`react-simple-code-editor`](https://www.npmjs.com/package/react-simple-code-editor) which, in turn, is powered by [`prism-js`](https://prismjs.com/).

The project is currently deployed on heroku:

-   front end: [funcster.herokuapp.com](https://funcster.herokuapp.com/)
-   back end/api: [funcster-api.herokuapp.com](https://funcster-api.herokuapp.com/)

## Overview

The application has two types of users: 'Mentors' and 'Coders'. Coders can write and save code snippets (python functions and classes), select a mentor and ask their mentor to review their code. Mentors can select coders and review code posted by their coders who have asked for review. When reviewing, Mentors can edit the code and can also leave notes for their coders.

Each Coder can only have one Mentor, but each Mentor can have many Coders. Each Coder can have many Snippets, but each Snippet belongs to one Coder.

### Getting Started

After downloading/cloning the projects, you should run `npm install` to be sure that you have the required dependencies available in your environment.

You will also need to set some environment variables in order to get the app to work. You can do so manually in your CLI using 'export' (or 'set' on Windows machines) for each of the variables, or you can create a file named '.env' in the root folder for this project and define the variables in that file.

The environment variables you will need to set are:

```
REACT_APP_AUTH0_DOMAIN=funcster.auth0.com
REACT_APP_AUTH0_CLIENT_ID={ client ID for your application on auth0 }
REACT_APP_AUTH0_CALLBACK_URL=http://localhost:3000/callback
REACT_APP_AUTH0_AUDIENCE= { audience/identifier for your auth0 api (not your local back end) }
REACT_APP_AUTH0_LOGOUT_RETURN=http://localhost:3000/

```

Once requirements have been installed and environment variables defined, run the app by running `npm run dev` in the root folder. If run locally, the front end will be served on [http://localhost:3000](http://localhost:3000/).

### Technologies

Funcster is built using:

-   [**React**](https://reactjs.org/), and specifically [`create-react-app`](https://create-react-app.dev/)
-   [**React-Redux**](https://react-redux.js.org/)
-   [**react-simple-code-editor**](https://www.npmjs.com/package/react-simple-code-editor)

### Main Files: Project Structure

```sh
├── public *** includes the main html page (index.html), the favicon and some other minor files
├── src
    ├── Auth *** contains the authentification class to interact with auth0, with some additional
    │            helpful methods for use with the app
    ├── componenets *** React components used to render the information on pages (includes the
    │                   NavBar, insets for the Home Page (Landing, CoderHome, MentorHome), 'Card'
    │                   components used for listed items (MentorCard, CoderCard, SnippetCard), etc.)
    ├── css *** custom css pages to be layered on top of the react-bootstrap used as the main css for
    │           the app; includes prism.css, which comes with the prismjs module, used to render the
    │           snippet editor, and main.css, which are all custom .css styles
    ├── pages *** the pages for the application (includes Callback, Home, Signup and SnippetEditor)
    ├── redux *** the application uses react-redux as a state manager/store. This folder contains the
    │   │         usual redux infrastructure
    │   ├── actions *** action creators (the functions called from coponents to change state and retrieve
    │   │               information from the back end or auth0)
    │   ├── reducers *** reducers (the functions that receive dispatches from the action creators and
    │   │                  update the state/store appropriately)
    │   └── types *** a utility file to define some constants to be used action creators and reducers
    │
    ├── utils
    │   ├── auth.js *** instantiates and exports the auth object used throughout the app
    │   ├── config.js *** exports the BACKEND constant to be used in axios calls throughout the app
    │   └── history.js *** instantiates and exports the history object used throughout the app
    ├── App.css *** small css file provided with create-react-app
    ├── App.js *** the main App component which calls the other pages and components; this file includes
    │              the basic roadmap to the app through the Router which directs the app to render
    │              different pages based on the window.location
    ├── AuthContext.js *** creates a context provider that was used early on to allow components to use
    │                      the auth object; may be able to remove now that redux has been implemented
    ├── AuthRoute.js *** a sort of component wrapper for routes requiring authentification; Authroute is
    │                    itself a component and is called in the App.js file for certain routes
    ├── index.js *** entry point for the javascript code for the app.  Sets up the redux store and provides
    │                the App.js (and the entire front end) to the html page
    ├── package-lock.json *** you know what this does (npm utility)
    ├── package.json *** you know what this does too (npm utility, includes dependencies and useful scripts to be run using npm from command line)
    └── README.md *** you're looking at it!
```
