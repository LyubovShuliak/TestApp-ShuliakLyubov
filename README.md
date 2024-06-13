# Task Manager

## Overview

The Task Manager is a versatile project management tool that enables you to efficiently handle tasks, comments, and boards. It supports complete CRUD (Create, Read, Update, Delete) operations for tasks, comments, and boards. It also maintains a detailed history of task movements and additions, making it easy to track changes and progress.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Screencast](#screencast)


## Features

- **Boards**: Create and manage multiple project boards.
- **Tasks**: Full CRUD operations on tasks.
- **Comments**: Add, read, update, and delete comments on tasks.
- **History Tracking**: Logs task movements and additions for easy tracking.
- **User-Friendly Interface**: Simple interface for quick project management.

## Installation

1. **Clone the Repository**.
2. **Install Dependencies in server and client directories** 
3. **Set Up Environment Variables**:
    Create a `.env.local` file in the client directory and add the necessary environment variables. Example:
    ```env.local
    REACT_APP_BASE_URL=https://task-manager-426209.lm.r.appspot.com

    ```
   Create a `.env` file in the server directory and add the necessary environment variables. Example:
    ```env
    # Environment
    NODE_ENV=development

    # Database configuration
    DATABASE_HOST=database host
    DATABASE_PORT=port
    DATABASE_USER=user name
    DATABASE_PASSWORD=password
    DATABASE_NAME=board
    
    # Application configuration 
    PORT=8080
    ORIGIN=http://localhost:3000
    
    # Security configuration
    SECRET=cookie-secret
    JWT_SECRET=jwt-secret


    ```

5. **Start the Application**:
   #### in server folder
   ```bash
    npm start:dev
   ```
   #### in client folder
   ```bash
    npm start
    ```

## Usage




### Screencast

For a quick overview and demonstration of the Task Manager features, watch our [screencast(https://drive.google.com/file/d/1RJEq9zudlRFZW--fADvvOzWzNf2CIqly/view?usp=sharing).

![Screencast](https://drive.google.com/file/d/1RJEq9zudlRFZW--fADvvOzWzNf2CIqly/view?usp=sharing)



