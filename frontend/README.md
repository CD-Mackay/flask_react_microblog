# Flask-React Microblog: Frontend

## Usage
  - To run the frontend of this application, open a terminal and ```cd``` into Flask_React_Blog/frontend
  - Run ```npm install``` to install dependencies
  - Run ```npm start``` to run the React app.

## Component Structure
  - Each component shall be structured as follows

```
  //Library Imports
import React from "react";

// Styling Imports
import "./ComponentName.css";

// Component Imports

const ComponentName = ({ posts }) => {


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

