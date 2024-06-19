# Northcoders News API

 This project mimics the functionalities of a real website similar to Reddit.
 It is implemented in Node.js environment and will lead to a fully functional website. Personally I feel particularly proud of this project as I managed to absorb all the necessary knowledge in just 3 weeks of intense learning. 

## Overall there are three deployment phases: 
** Phase 1 **
    PostgreSQL is used to setup a database which contains elements like articles, users, topics and comments.    

** Phase 2 **
    Express is used to create various endpoints.Testing these endpoints is an essential part of the process.  

** Phase 3 **
    Still in progress at the moment, this part will hosted on a different repository and will implement the frontend part of the website using React. 

This repository is focused on the backend architecture only(phase 1 and 2) and can be seen fully functioning at the following hosting link: 
    https://news-api-knls.onrender.com/api
    Please give it around a minute to load the page the first time.
    The first page renders a list of available endpoints which can be used to navigate the website. The pages are rendered in JSON format, I recommend using an Chrome extension that improves readability, like "JSON Viewer". 

If you would like run this on your local machine please follow these steps:
    
    Minimum requirements: 
    -> Node.js - minimum version: 21.7.1
    -> PostgreSQL - minimum version: 14.2
    
    1. Clone this repository and open in Visual Studio Code.

    2. Create databases: 
        To simulate a real website structure and to avoid sharing sensitive information, local environment variables must be created for development and testing databases.
        -> create a file called '.env.test'// inside this file assign your local database to be equal to nc_news_test.
        -> create a file called '.env.development'// inside this file assign your local database to be equal to nc_news.
        -> create a file .gitignored // inside this file write .env.* // the env     files will not be pushed to GitHub and your sensitive data is protected.
        
        -> you can now run the terminal command to create the development database: 
        npm run setup-dps

    3. Install dependency: 
        -> in your terminal run this commands: 
        npm install

    4. Populate the development database: 
        -> in your terminal run this command: 
        npm run seed

    5. To run the tests type this command in your terminal:
        npm test

    6. To start server locally: 
        npm start


--- 

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
