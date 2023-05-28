# Backend Task Repository

This repository contains the code and resources for the Backend Task project. The project aims to develop a backend system for a specific task.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)

## Overview

The Backend Task project is designed to tackle a specific task using backend development techniques. It includes code, documentation, and any other necessary resources related to the task.

## Installation

To set up the project locally, please follow the steps below:

1. Clone the repository using the following command:
   ```
   git clone https://github.com/pankajkrbansal/backend-task.git
   ```

2. Navigate to the project directory:
   ```
   cd backend-task
   ```

3. Install the project dependencies:
   ```
   npm install
   ```

4. Configure any required environment variables or settings according to the project's documentation.

## Usage

To run the project, use the following command:
```
npm start
```

Ensure that any required dependencies or services are running or configured properly before starting the application.

### Routes

- `POST /`: Registers a new user and generates a token for authentication.
-` POST /auth`: Authenticates a user and generates a token for further requests.
- `POST /create`: Creates a new post. This route requires authentication.
- `POST /comments/:postId`: Posts a comment on a specific post. This route requires authentication.
- `POST /reply-to-comment/:postId/:commentId`: Replies to a comment on a specific post. This route requires authentication.
- `POST /like-post/:postId`: Likes a specific post.
- `POST /like-comment/:postId/:commentId`: Likes a specific comment on a post.
- `POST /dislike-comment/:postId/:commentId`: Dislikes a specific comment on a post.
- `POST /like-reply/:postId/:commentId/:replyId`: Likes a specific reply to a comment.
The protect middleware is used to ensure that routes requiring authentication are protected and can only be accessed by authenticated users. The next function is used to pass control to the next middleware or error handler.

Please note that this documentation assumes the presence of other modules.

### Service
- `registerUser`: Registers a new user by checking if the user is already registered, validating the email format, hashing the password, and saving the user data to the user collection.

- `authUser`: Authenticates a user by checking the email and password against the stored user data.

- `createPost`: Creates a new post by generating a unique post ID, saving the post data to the post collection.

- `postComment`: Posts a comment on a post by finding the post using the post ID, generating a unique comment ID, and adding the comment to the post's comment array.

- `replyToComment`: Replies to a comment on a post by finding the post using the post ID, finding the comment using the comment ID, generating a unique reply ID, and adding the reply to the comment's replies array.

- `likePost`: Likes a post by finding the post using the post ID and incrementing the like count.

- `likeComment`: Likes a comment on a post by finding the post using the post ID, finding the comment using the comment ID, and incrementing the like count of the comment.

- `dislikeComment`: Dislikes a comment on a post by finding the post using the post ID, finding the comment using the comment ID, and decrementing the dislike count of the comment.

- `likeReply`: Likes a reply to a comment on a post by finding the post using the post ID, finding the comment using the comment ID, finding the reply using the reply ID, and incrementing the like count of the reply.