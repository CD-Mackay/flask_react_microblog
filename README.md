# Flask-React Microblog
   Welcome to the Flask-React microblog. This project is part of my journey to learn different languages, focussing on languages with utility in backend development. 

   This project uses a modern ReactJs front-end to connect to a python powered API. 

## Usage
  - This project will require two terminals to run. 
  - Frontend: 
      - To run the front-end cd into the /frontend directory(`cd frontend`). 
      - Run `npm install` to install dependencies
      - Run `npm start` to begin the application
  
  - API: 
      - CD into /api directory (`cd api`). 
      - From here run the command `python3 -m venv venv` to initialize the virtual environment. 
      - Run `pip install` to install neccessary dependencies
      - Run `flask run` command to initialize API. 


## Component Structure
  - Each component shall be structured as follows

```
  //Library Imports
import React from "react";

// Styling Imports
import "./ComponentName.css";

// Component Imports

const ComponentName = ({ props(if applicable) }) => {


  return (
    <>
    Component
    </>
  );
};

export default ComponentName;
```
  - Library imports shall include imports for all React features, as well as features from any third-party library(including pre-made components).
  - Styling imports shall include relevant CSS files only.
  - Component imports shall include only Components from within the project itself.