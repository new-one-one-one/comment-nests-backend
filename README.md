# comment-nests-backend

## About

This project is a backend support system that provides various features for user management, post management, commenting, and more. It is designed to serve as a foundation for building web applications that require user authentication and interactions with posts and comments.

The system includes robust user authentication and authorization through JWT tokens, ensuring secure access to various endpoints. Users can register and log in, and their identities are verified through tokens, enabling safe data access and management.

## Installation / Setup

To get started with this project, follow these steps:

1. Clone the Repository

```shell
git clone https://github.com/yourusername/your-project.git
cd your-project
```

2. Install the libraries 

```
npm install --save 
```

3. Run the server

```
node index.js
```


### Environment Variables

Make sure to set up the following environment variables:

- `MONGO_DB_STRING_URI`: Your MongoDB connection URI.
- `PORT`: The port on which your application will run.
- `LOG_DIR`: The directory where logs will be stored.
- `JWT_SECRET_KEY`: Your secret key for JWT authentication.

## Project Highlights

Certainly, here's an example of how you can complete the "Features" section in your project's README:

## Features

1. **User Authentication:**
   - User registration and login with JWT-based authentication.
   - Token-based security for protected routes.

2. **User Management:**
   - Create, update, and deactivate user accounts.
   - Find users by email for efficient search.

3. **Post Management:**
   - Create and update posts with titles, descriptions, and image links.
   - Retrieve a list of all posts for viewing.

4. **Commenting System:**
   - Create comments on posts with text content.
   - Replies to comments with nesting support.

5. **Logging and Error Handling:**
   - Custom logger for recording application logs.
   - Comprehensive error handling for robust performance.

6. **Database Schema:**
   - MongoDB schemas for storing users, posts, and comments.
   - Timestamps for tracking creation and update times.

7. **JWT Token Management:**
   - JWT tokens for user authentication and authorization.
   - Secured routes for protecting sensitive endpoints.

8. **Environmental Configuration:**
   - Use of environment variables for flexible setup.
   - Configuration options for MongoDB URI, log directory, etc.

9. **Date Storage in Logs:**
   - Logs are stored with timestamps for easy reference.
   - Efficient tracking of log events for debugging and monitoring.

10. **Password Policy:**
    - User password validation ensuring complexity and security.

Feel free to add or modify the features list to reflect the specifics of your project. These features provide an overview of what your project offers to users and what sets it apart.

## Routes

### Authentication

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Log in and receive a JWT token.

### Users

- **POST /user/create**: Create a new user.
- **PUT /user/update/:id**: Update user credentials.
- **PUT /user/update-activity/:id**: Update the `isActive` field.
- **GET /user/find/:email**: Find a user by email.

### Posts

- **POST /post/create**: Create a new post.
- **PUT /post/update/:id**: Update a post.
- **GET /post/find-all**: Find all posts.

### Comments

- **POST /comment/create**: Create a new comment.
- **PUT /comment/update/:id**: Update a comment.
- **DELETE /comment/delete/:id**: Delete a comment.
- **GET /comment/post/:postId**: Get comments for a post and its replies.

## Database Details

Explain the structure of your MongoDB schemas:

### Comment

- `text`: The content of the comment.
- `user`: The user who made the comment.
- `post`: The post to which the comment is associated.
- `parentComment`: The parent comment for nested comments.
- `createdAt`: The timestamp when the comment was created.
- `updatedAt`: The timestamp when the comment was last updated.

### Post

- `title`: The title of the post.
- `description`: The post's description.
- `imageLink`: The link to the post's image.
- `user`: The user who created the post.
- `createdAt`: The timestamp when the post was created.
- `updatedAt`: The timestamp when the post was last updated.

### User

- `email`: The user's email address.
- `password`: The user's password.
- `isActive`: The user's active status.
- `createdAt`: The timestamp when the user was created.
- `updatedAt`: The timestamp when the user was last updated.

## License

MIT