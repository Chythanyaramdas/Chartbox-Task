CHARTBOX SCHEDULER

  Welcome to the Chartbox Scheduler, your go-to solution for efficient task management! This intuitive to-do list application empowers users to seamlessly organize their daily activities with a user-friendly interface. Whether you're a meticulous planner or a spontaneous taskmaster, the Chartbox Scheduler has you covered.


FEATURES

1)  User Authentication:Securely log in, register, and manage your tasks with confidence using our robust user authentication system. New users can easily register for an account,
     and their email addresses will be verified through OTP (One-Time Password) for secure registration and login. 
     This ensures that only authorized users have access to the application, enhancing the overall security of your tasks and data.

2)  Dynamic Task Creation:Easily add tasks and descriptions, tailoring your schedule to your unique preferences. With this feature, users can seamlessly create tasks and include
    detailed descriptions for each task, allowing for better organization and clarity in task management.

3)  Database Storage: Save your task lists effortlessly to our MongoDB Atlas database, ensuring your important plans are accessible and secure.

4)  Effortless Editing: Update, modify, or enhance your tasks at any stage, granting you the flexibility to adapt to changing priorities.
  
5)  Intuitive User Interface: Navigate through tasks seamlessly, with a user interface designed for maximum simplicity and convenience.
   
6) Edit, Add, Delete, Read: Perform essential operations with ease, enabling you to manage your tasks effortlessly at any given moment.



TOOLS AND TECHNOLOGIES

   Client-Side Libraries
    
      1 ) React.js: A JavaScript library for building user interfaces.
      
      2 ) Redux.js: A predictable state container for JavaScript apps.
      
      3 ) TailwindCSS: A utility-first CSS framework for rapidly building custom designs.

    HTTP Client:

      Axios: A promise-based HTTP client for making requests to APIs. Axios is used to interact with the server-side API.


    Server-Side Technologies
    
      1) Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
      
      2) Express.js: A minimal and flexible Node.js web application framework.
      
      3) MongoDB (Mongoose): A NoSQL database used to store and retrieve data.
      
      4) JWT Token: JSON Web Token for user authentication.

      5) Nodemailer:Nodemailer is a tool used for sending emails in Node.js applications

  

ACCESS THE PROJECT

  The  project can be accessed at
  
  
Getting Started

1) Clone the repository:https://github.com/Chythanyaramdas/Chartbox-Task

2) Set up environment variables:

Create a .env file in the root directory or rename the current .env.sample file and configure necessary variables for client and server sides.

  Client ENV:
               
   REACT_APP_BASE_URL=http://localhost:3001/

  Server ENV:

    JWT_SECRET_KEY=weertyiopkjhg
  
    REFRESH_TOKEN_SECRET=weertyiopkjhg
  
    JWT_EXPIRATION=30000
  
    USER_MAIL=chythanyaramdas03@gmail.com
  
    USER_PASSWORD=urqmdcsmshmsspdp
  
    CLIENT_URL= http://localhost:3000/
    
     
                     
                     
3) Navigate to client directory:

Open a terminal in Visual Studio Code and split it into two terminals. In the first terminal, navigate to the client directory:

       cd client

  Install client side dependencies:

      npm install

  Start the client-side application:

        npm run dev

The client-side application will be running on  http://localhost:3000 

4) Navigate to the server directory:

  In the second terminal, navigate to the server directory:
                
           cd backend

  Install server side dependencies:

       npm install 

 Start the server:

        npm start  

    The server will be running on  http://localhost:3001



API DOCUMENTATION

  Detailed API documentation can be found in the https://docs.google.com/document/d/1GLrUpvWXqQiFBop1tHTJmaaM5DgtSeP5pMXjZtuzPok/edit?usp=sharing

DATABASE DESIGN

  The database design can be viewed in
  
  https://drive.google.com/file/d/1-TKbQcKnHxDDhlyQ_UPUS55nKmgSjN0x/view?usp=sharing

MODULE LIST

The list of modules can be found in the 

https://docs.google.com/document/d/1wvmeoV8GfcvBhGfceYuMmuH6p-SqUYeDKR6NZqzxYN8/edit?usp=sharing

              
