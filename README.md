# Job Portal API

The **Job Portal API** is a robust and scalable backend service designed to facilitate seamless interactions between job seekers and employers. It provides endpoints for creating, updating, and managing user profiles, posting jobs, applying for jobs, and retrieving available job listings. 

With secure user authentication, dynamic job management, and easy job application tracking, this API aims to streamline the recruitment process for both job seekers and recruiters.


## Features

### User Management
- **User Registration**: Allows new users to create an account.
  - `POST /user/register`
  
- **User Login**: Authenticates users and provides access tokens for secure actions.
  - `POST /user/login`
  
- **Update User Profile**: Users can update their profile information, including uploading a profile picture.
  - `PUT /user/update`
  
- **Upload CV**: Users can upload or update their CV.
  - `PUT /user/update/cv`

- **Delete User Account**: Authenticated users can delete their account.
  - `DELETE /users/delete`

- **Verify Account**: Verify a user account using a token.
  - `POST /users/verify/:token/:userId`

- **Fetch All Users**: Retrieves a list of all registered users.
  - `GET /users`
  
- **Fetch User Profile**: Fetches the profile information of a specific user by ID.
  - `GET /users/:id`

### Job Management
- **Create Job**: Allows recruiters to create a new job posting.
  - `POST /jobs/create`
  
- **Apply for Job**: Job seekers can apply for available job listings.
  - `POST /jobs/apply/:id`
  
- **Update Job**: Recruiters can update details of a job they posted.
  - `PUT /jobs/updatejob/:id`

- **Delete Job**: Allows recruiters to delete a job posting they created.
  - `DELETE /jobs/delete/:id`

- **View Available Jobs**: Job seekers can view all available job postings.
  - `GET /jobs`

- **View My Jobs**: Recruiters can view all the jobs they have posted.
  - `GET /jobs/myjobs`

- **View Applicants for a Job**: Recruiters can view applicants for a specific job posting.
  - `POST /jobs/viewapplicants/:id`

- **Close Job**: Recruiters can close a job listing once the position has been filled.
  - `POST /jobs/close/:id`


## Getting Started

To start using the **Job Portal API**, follow these steps:

### API Base URL
All API requests are made to the following base URL: https://job-portal-api-2.onrender.com/#/

### In case you want to run the application locally
- **Fork this repository to your GitHub account**.
- **Clone this repository to your local machine**.

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v14 or later)
- **MongoDB**
- **Docker** (optional, for containerization)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/basit-devBE/Job-Portal-API
   cd job-portal-api
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following environment variables to the `.env` file:
        ```plaintext
        PORT=3000
        MONGODB_URI=mongodb://localhost:27017/job-portal
        JWT_SECRET=your_secret_key
        ```
4. Run the server:
    ```bash
    npm start
    ```


## Authentication

The **Job Portal API** uses a combination of **JWT (JSON Web Tokens)** and **cookies** for authentication. After logging in, the server issues a JWT which is stored in an HTTP-only cookie for secure communication between the client and server.

### Authentication Flow
1. **User Login**: After a successful login, the server generates a JWT and sends it in an HTTP-only cookie to the client.
2. **Cookie Storage**: The JWT is stored in the client's browser as a cookie, which is automatically included in subsequent requests to protected routes.
3. **Token Validation**: On each request, the server validates the JWT from the cookie to authenticate the user.

### Obtaining a Token
After a successful login, the server sends a response with the JWT stored in a cookie:
```json
Set-Cookie: token=your_jwt_token_here; HttpOnly; Secure
```

### User Registration

- **Endpoint**: `POST /user/register`
- **Description**: This endpoint allows new users to create an account. It validates the provided fields, checks if the email is valid, hashes the password, and sends a verification email to the user.

#### Request Body
The request body must be in JSON format and include the following fields:
```json
{
    "username": "string",   // Required: Username of the user
    "email": "string",      // Required: Email of the user (must be valid format)
    "password": "string",   // Required: Password (must meet complexity requirements)
    "role": "string"        // Required: User role (e.g., 'recruiter', 'job seeker')
}

```
### Response
If the user is successfully registered, the server responds with a success message:
```json
{
    "success": true,
    "message": "User registered successfully. Please verify your email."
}
```

If the user is unsuccessfully registered, the server responds with an error message:
```json
{
    "success": false,
    "message": "User registration failed. Please try again."
}
```
## Example Request for User Registration
```bash
curl -X POST https://job-portal-api-2.onrender.com/user/register \
-H "Content-Type: application/json" \
-d '{
    "username": "JohnDoe",
    "email": "johndoe@example.com",
    "password": "Password123!",
    "role": "job seeker"
}'
```

### User Verification

- **Endpoint**: `POST /users/verify/:token/:userId`
- **Description**: This endpoint allows users to verify their account using a verification token sent to their email during registration.

#### URL Parameters
- **token**: The verification token sent to the user's email.
- **userId**: The ID of the user to be verified.

#### Response
- **Success** (200 OK):
```json
{
    "status": 200,
    "msg": "User Verified Successfully"
}
```

- **Error** (400 Bad Request):
```json
{
    "status": 400,
    "msg": "User Verification Failed"
}
```

## Example Request for User Verification
```bash
curl -X POST https://job-portal-api-2.onrender.com/users/verify/your_verification_token_here/your_user_id_here
```

### User Login
### User Login

- **Endpoint**: `POST /user/login`
- **Description**: This endpoint allows users to log in to their accounts using their email and password. Upon successful login, a JWT will be issued and stored in an HTTP-only cookie.

#### Request Body
The request body must be in JSON format and include the following fields:
```json
{
    "email": "string",      // Required: Email of the user
    "password": "string"    // Required: Password of the user
}
```

#### Response
If the user is successfully logged in, the server responds with a success message:
```json
{
    "success": true,
    "message": "User logged in successfully.",
    token
}
```

If the user is unsuccessfully logged in, the server responds with an error message:
```json
{
    "success": false,
    "message": "Invalid email or password."
}
```

### Get All Users
### Fetch All Users

- **Endpoint**: `GET /users`
- **Description**: This endpoint retrieves a list of all registered users in the system. This route is not  protected, so it does not require authentication.
  

#### Response
If the users are successfully fetched, the server responds with a success message:
```json
{
    "success": true,
    "users": [
        {
            "id": "user_id",
            "username": "username",
            "email": "email",
            "role": "role"
        },
        {
            "id": "user_id",
            "username": "username",
            "email": "email",
            "role": "role"
        }
    ]
}
```

If the users are unsuccessfully fetched, the server responds with an error message:
```json
{
    "success": false,
    "message": "Failed to fetch users."
}
```

### Delete User

- **Endpoint**: `DELETE /users/delete`
- **Description**: This endpoint allows authenticated users to delete their own accounts. The request must include a valid JWT stored in an HTTP-only cookie for authentication.

#### Cookie
- **Authorization**: The JWT must be stored in an HTTP-only cookie named `token`.

#### Response
- **Success** (200 OK):
```json
{
    "status": 200,
    "message": "User deleted successfully"
}
```

- **Error** (401 Unauthorized):
```json
{
    "status": 401,
    "message": "Unauthorized"
}
```
- **Error** (500 Internal Server Error):
- **Error** {
    "status": 400,
    "message": "User does not exist"
}

## Example Request for User Deletion
```bash
curl -X DELETE https://job-portal-api-2.onrender.com/users/delete 
```



### Upload CV

- **Endpoint**: `PUT /user/update/cv`
- **Description**: This endpoint allows authenticated users to upload or update their CV. The request must include a valid JWT stored in an HTTP-only cookie for authentication and a file for the CV.

#### Cookie
- **Authorization**: The JWT must be stored in an HTTP-only cookie named `token`.

#### Request Body
- **File**: The CV file must be sent as form data under the key `CV`.

#### Response
- **Success** (200 OK):
```json
{
    "status": 200,
    "message": "CV updated successfully",
    "user": {
        "username": "string",
        "email": "string",
        "role": "string",
        "cv": "string" // URL of the uploaded CV
    }
}
```
{
    "status": 400,
    "message": "User does not exist"
}

- **Error** (400 Bad Request):
```json
{
    "status": 400,
    "message": "CV upload failed"
}
```
- **Error** (401 Unauthorized):
  
```json
{
    "status": 401,
    "message": "Unauthorized"
}
```

## Example Request for CV Upload
```bash
curl -X PUT https://job-portal-api-2.onrender.com/user/update/cv \
--cookie "token=your_jwt_token_here" \
-F "CV=@/path/to/your/cv.pdf"
```


### Update User

- **Endpoint**: `PUT /user/update`
- **Description**: This endpoint allows authenticated users to update their profile information, including username, email, password, about section, and profile picture. The request must include a valid JWT stored in an HTTP-only cookie for authentication.

#### Cookie
- **Authorization**: The JWT must be stored in an HTTP-only cookie named `token`.

#### Request Body
The request body must be in JSON format and can include the following fields:
```json
{
    "username": "string",      // Optional: New username of the user
    "email": "string",         // Optional: New email of the user
    "password": "string",      // Optional: New password of the user
    "About": "string"          // Optional: About section of the user
}
- A file can be sent for the profile picture under the key name `profilepicture`.

```

#### Response
- **Success** (200 OK):
```json
{
    "status": 200,
    "message": "User updated"
}
```
- **Error** (401 Unauthorized):
```json
{
    "status": 401,
    "message": "Unauthorized"
}
```
- **Error** (400 Bad Request):
```json
{
    "status": 400,
    "message": "User does not exist"
}
```
- **Error** (500 Internal Server Error):
```json
{
    "status": 500,
    "message": "User update failed"
}
```
# Example Request
```bash
curl -X PUT https://job-portal-api-2.onrender.com/user/update \
--cookie "token=your_jwt_token_here" \
-H "Content-Type: multipart/form-data" \
-F "username=NewUsername" \
-F "email=newemail@example.com" \
-F "password=NewPassword123!" \
-F "About=This is about me." \
-F "profilepicture=@/path/to/profilepicture.jpg"
```


## Jobs

The **Jobs** section of the Job Portal API provides functionalities for managing job listings, allowing recruiters to create, update, and delete job postings, while enabling job seekers to apply for available positions. This section is designed to streamline the job application process, making it easier for users to connect with potential employers and find suitable job opportunities.

Key features include:
- **Job Creation**: Recruiters can post new job openings with detailed descriptions and requirements.
- **Job Updates**: Recruiters can modify existing job listings to reflect changes in requirements or availability.
- **Job Deletion**: Recruiters can remove job postings that are no longer active.
- **Job Applications**: Job seekers can apply for listed jobs, allowing them to submit their profiles and CVs for consideration.
- **View Applicants**: Recruiters can view applicants for their job postings, making it easier to manage the hiring process.

The API ensures that all actions are performed securely, requiring authentication for sensitive operations, and provides a seamless experience for both job seekers and recruiters.


### Create Job

- **Endpoint**: `POST /jobs/create`
- **Description**: This endpoint allows verified recruiters to create new job postings. The request must include a valid JWT stored in an HTTP-only cookie for authentication.

#### Cookie
- **Authorization**: The JWT must be stored in an HTTP-only cookie named `token`.

#### Request Body
The request body must be in JSON format and include the following fields:
```json
{
    "name": "string",         // Required: The title of the job
    "description": "string",  // Required: A detailed description of the job
    "budget": "number",       // Required: The budget for the job
    "Location": "string"      // Required: The location of the job
}

```
#### Response
- **Success** (200 OK):
```json
{
    "status": 200,
    "message": "Job created successfully",
    "job": {
        "name": "string",
        "description": "string",
        "budget": "number",
        "Location": "string"
    }
}
```
- **Error** (401 Unauthorized):
```json
{
    "status": 401,
    "message": "Unauthorized"
}
```
- **Error** (400 Bad Request):
```json
{
    "status": 400,
    "message": "Job creation failed"
}
```
# Example Request
```bash
curl -X POST https://job-portal-api-2.onrender.com/jobs/create \
--cookie "token=your_jwt_token_here" \
-H "Content-Type: application/json" \
-d '{
    "name": "Software Engineer",
    "description": "Responsible for developing and maintaining applications.",
    "budget": 60000,
    "Location": "Remote"
}'
```

### Apply for Job

- **Endpoint**: `POST /jobs/apply/:id`
- **Description**: This endpoint allows verified applicants to apply for a specific job by its ID. The request must include a valid JWT stored in an HTTP-only cookie for authentication.

#### Cookie
- **Authorization**: The JWT must be stored in an HTTP-only cookie named `token`.

#### URL Parameter
- **id**: The ID of the job the applicant is applying for.

#### Response
- **Success** (200 OK):
```json
{
    "status": 200,
    "msg": "Job applied successfully"
}

```
- **Error** (401 Unauthorized):
```json
{
    "status": 401,
    "msg": "Unauthorized"
}
```
- **Error** (400 Bad Request):
```json
{
    "status": 400,
    "msg": "Job application failed"
}
```
- **Error** (404 Not Found):
```json
{
    "status": 404,
    "msg": "Job not found"
}
```
# Example Request
```bash
curl -X POST https://job-portal-api-2.onrender.com/jobs/apply/your_job_id_here \
--cookie "token=your_jwt_token_here
```
### Update Job

- **Endpoint**: `PUT /jobs/updatejob/:id`
- **Description**: This endpoint allows verified recruiters to update the details of a specific job they have posted. The request must include a valid JWT stored in an HTTP-only cookie for authentication.

#### Cookie
- **Authorization**: The JWT must be stored in an HTTP-only cookie named `token`.

#### URL Parameter
- **id**: The ID of the job to be updated.

#### Request Body
- The body can include any of the following fields to update the job:
  - **name**: (optional) The name of the job.
  - **description**: (optional) A description of the job.
  - **budget**: (optional) The budget for the job.
  - **Location**: (optional) The location of the job.

#### Response
- **Success** (200 OK):
```json
{
    "status": 200,
    "message": "Job updated successfully",
    "job": {
        // Updated job details
    }
}

```
- **Error** (401 Unauthorized):
```json
{
    "status": 401,
    "message": "Unauthorized"
}
```
- **Error** (400 Bad Request):
```json
{
    "status": 400,
    "message": "Job update failed"
}
```
- **Error** (404 Not Found):
```json
{
    "status": 404,
    "message": "Job not found"
}
```
# Example Request
```bash
curl -X PUT https://job-portal-api-2.onrender.com/jobs/updatejob/your_job_id_here \
--cookie "token=your_jwt_token_here" \
-H "Content-Type: application/json" \
-d '{
    "name": "Updated Job Name",
    "description": "Updated job description",
    "budget": 70000,
    "Location": "Updated Location"
}'
```
Note: Replace `your_job_id_here` and `your_jwt_token_here` with the actual job


### Delete Job

- **Endpoint**: `DELETE /jobs/delete/:id`
- **Description**: This endpoint allows verified recruiters to delete a specific job they have posted. The request must include a valid JWT stored in an HTTP-only cookie for authentication.

#### Cookie
- **Authorization**: The JWT must be stored in an HTTP-only cookie named `token`.

#### URL Parameter
- **id**: The ID of the job to be deleted.

#### Response
- **Success** (200 OK):
```json
{
    "status": 200,
    "message": "Job deleted successfully"
}
```
- **Error** (401 Unauthorized):
```json
{
    "status": 401,
    "message": "Unauthorized"
}
```
- **Error** (404 Not Found):
```json
{
    "status": 404,
    "message": "Job not found"
}
```
# Example Request
```bash
curl -X DELETE https://job-portal-api-2.onrender.com/jobs/delete/your_job_id_here \
--cookie "token=your_jwt_token_here"
```
Note: Replace `your_job_id_here` and `your_jwt_token_here` with the actual job ID and JWT token, respectively.

### Get My Jobs

- **Endpoint**: `GET /jobs/myjobs`
- **Description**: This endpoint retrieves all jobs posted by a verified recruiter. The request must include a valid JWT stored in an HTTP-only cookie for authentication.

#### Cookie
- **Authorization**: The JWT must be stored in an HTTP-only cookie named `token`.

#### Response
- **Success** (200 OK):
```json
{
    "status": 200,
    "message": "Jobs fetched successfully",
    "data": [
        {
            "name": "Job Title 1",
            "description": "Description of Job 1",
            "budget": 500,
            "Location": "Location 1",
            "Recruiter": "Recruiter ID",
            ...
        },
        ...
    ]
}
```
- **Error** (401 Unauthorized):
```json
{
    "status": 401,
    "message": "Unauthorized"
}
```
- **Error** (404 Not Found):
```json
{
    "status": 404,
    "message": "Jobs not found"
}
```
# Example Request
```bash
curl -X GET https://job-portal-api-2.onrender.com/jobs/myjobs \
--cookie "token=your_jwt_token_here"
```

### Fetch Available Jobs

- **Endpoint**: `GET /jobs/available`
- **Description**: This endpoint retrieves all available jobs from the database. It can be accessed by any user without authentication.

#### Response
- **Success** (200 OK):
```json
{
    "status": 200,
    "message": "Available Jobs fetched successfully",
    "data": [
        {
            "name": "Job Title 1",
            "description": "Description of Job 1",
            "budget": 500,
            "Location": "Location 1",
            "Availability": true,
            ...
        },
        ...
    ]
}
```
- **Error** (404 Not Found):
```json
{
    "status": 404,
    "message": "Jobs not found"
}
```
# Example Request
```bash
curl -X GET https://job-portal-api-2.onrender.com/jobs/available
```

### View Applicants for Job

- **Endpoint**: `POST /jobs/viewapplicants/:id`
- **Description**: This endpoint allows a recruiter to view all applicants for a specific job. It requires the recruiter to be authenticated.

#### Parameters
- `id` (path parameter): The ID of the job for which applicants are being requested.

#### Response
- **Success** (200 OK):
```json
{
    "status": 200,
    "message": "Applicants fetched successfully",
    "data": [
        "applicantId1",
        "applicantId2",
        ...
    ]
}
```
- **Error** (401 Unauthorized):
```json
{
    "status": 401,
    "message": "Unauthorized"
}
```
- **Error** (404 Not Found):
```json
{
    "status": 404,
    "message": "Job not found"
}
```
# Example Request
```bash
curl -X POST https://job-portal-api-2.onrender.com/jobs/viewapplicants/your_job_id_here \
--cookie "token=your_jwt_token_here
```

### Close Job
- **Endpoint**: `POST /jobs/close/:id`
- # Job Closing API Documentation

## closeJob Function

### Overview
The `closeJob` function allows recruiters to close a job posting in the job portal. When closing a job, the recruiter must specify successful applicants by their email addresses. Only the recruiter who created the job can close it.

### Route
`POST /jobs/close/:id`
- **Description**: This endpoint allows a recruiter to close a job posting. It requires the recruiter to
be authenticated.
- **Method**: POST


### Middleware
- **isLoggedIn**: Verifies if the user is authenticated.

### Request Parameters
- **Path Parameter**:
  - `id` (string): The ID of the job to be closed.

### Request Body
- **acceptedUsers** (array of strings): An array of email addresses representing the successful applicants.

### Responses

| Status Code | Description                                                   | Response Example                                                 |
|-------------|---------------------------------------------------------------|-----------------------------------------------------------------|
| 200         | Job closed successfully                                       | ```json { "status": 200, "message": "Job closed successfully" } ``` |
| 400         | User does not exist                                          | ```json { "status": 400, "message": "User does not exist" } ``` |
| 400         | User is not verified                                         | ```json { "status": 400, "message": "User is not verified" } ``` |
| 400         | User is not a recruiter                                      | ```json { "status": 400, "message": "User is not a recruiter" } ``` |
| 400         | Job does not exist                                           | ```json { "status": 400, "message": "Job does not exist" } ``` |
| 400         | User is not authorized to close this job                     | ```json { "status": 400, "message": "You are not authorized to close this job" } ``` |
| 400         | No successful applicants found                                | ```json { "status": 400, "message": "No successful applicants found" } ``` |
| 400         | Please provide the successful applicants                     | ```json { "status": 400, "message": "Please provide the successful applicants" } ``` |
| 400         | The following accepted users are not applicants for this job | ```json { "status": 400, "message": "The following accepted users are not applicants for this job: <user_ids>" } ``` |

### Example Request
```bash
curl -X POST https://job-portal-api-2.onrender.com/jobs/close/your_job_id_here \
--cookie "token=your_jwt_token_here" \
-H "Content-Type: application/json" \
-d '{
    "acceptedUsers": ["
}'
```
