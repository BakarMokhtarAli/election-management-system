# Election API Documentation

## Base URL
The base URL for all endpoints is `/voters`.

## Endpoints

### 1. Get All Voters

- **Endpoint:** `GET /api/voters`
- **Description:** Retrieve a list of all voters.
- **Request:**
  - No request parameters required.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "password": "hashed_password"
      },
      // ... other voters
    ]
    ```
  - **Error Status Codes:**
    - `404 Not Found`: If no voters are found.
    - `500 Internal Server Error`: If an internal server error occurs.

### 2. Get Voter by ID

- **Endpoint:** `GET /api/voters/:id`
- **Description:** Retrieve a specific voter by ID.
- **Request:**
  - **Parameters:**
    - `id` (integer): The ID of the voter.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "password": "hashed_password"
    }
    ```
  - **Error Status Codes:**
    - `404 Not Found`: If the voter with the specified ID is not found.
    - `500 Internal Server Error`: If an internal server error occurs.

### 3. Voter Signup

- **Endpoint:** `POST /api/voters/signup`
- **Description:** Create a new voter account.
- **Request:**
  - **Body:**
    - `name` (string): The name of the voter.
    - `email` (string): The email of the voter.
    - `password` (string): The password of the voter.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    {
      "message": "Voter created successfully!",
      "voter": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "password": "hashed_password"
      }
    }
    ```
  - **Error Status Codes:**
    - `409 Conflict`: If the email already exists.
    - `404 Not Found`: If the voter cannot be created.
    - `500 Internal Server Error`: If an internal server error occurs.

### 4. Voter Signin

- **Endpoint:** `POST /api/voters/signin`
- **Description:** Authenticate and log in a voter.
- **Request:**
  - **Body:**
    - `email` (string): The email of the voter.
    - `password` (string): The password of the voter.
- **Response:**
  - **Success Status Code:** `201 Created`
  - **Success Response:**
    ```json
    {
      "message": "Voter logged in successfully!",
      "token": "jwt_token"
    }
    ```
  - **Error Status Codes:**
    - `409 Conflict`: If the email does not exist.
    - `404 Not Found`: If the password is incorrect.
    - `500 Internal Server Error`: If an internal server error occurs.

### 5. Update Voter by ID

- **Endpoint:** `PUT /api/voters/:id`
- **Description:** Update a voter's information by ID.
- **Request:**
  - **Parameters:**
    - `id` (integer): The ID of the voter.
  - **Body:**
    - `name` (string): The new name of the voter.
    - `email` (string): The new email of the voter.
    - `password` (string): The new password of the voter.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    {
      "message": "Voter updated successfully!",
      "voter": {
        "id": 1,
        "name": "Updated Name",
        "email": "updated@example.com",
        "password": "updated_hashed_password"
      }
    }
    ```
  - **Error Status Codes:**
    - `404 Not Found`: If the voter with the specified ID is not found.
    - `500 Internal Server Error`: If an internal server error occurs.

### 6. Delete Voter by ID

- **Endpoint:** `DELETE /api/voter/:id`
- **Description:** Delete a voter by ID.
- **Request:**
  - **Parameters:**
    - `id` (integer): The ID of the voter.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    {
      "message": "Voter deleted successfully!",
      "voter": {
        "id": 1,
        "name": "Deleted Voter",
        "email": "deleted@example.com",
        "password": "deleted_hashed_password"
      }
    }
    ```
  - **Error Status Codes:**
    - `404 Not Found`: If the voter with the specified ID is not found.
    - `500 Internal Server Error`: If an internal server error occurs.



##*Candidate*


## Endpoints

### 1. Get All Candidates

- **Endpoint:** `GET /api/candidates`
- **Description:** Retrieve a list of all candidates.
- **Request:**
  - No request parameters required.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    [
      {
        "id": 1,
        "name": "John Doe",
        "cand_type": "president",
        "email": "john@example.com"
      },
      // ... other candidates
    ]
    ```
  - **Error Status Codes:**
    - `404 Not Found`: If no candidates are found.
    - `500 Internal Server Error`: If an internal server error occurs.

### 2. Get Candidate by ID

- **Endpoint:** `GET /api/candidates/:id`
- **Description:** Retrieve a specific candidate by ID.
- **Request:**
  - **Parameters:**
    - `id` (integer): The ID of the candidate.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "cand_type": "president",
      "email": "john@example.com"
    }
    ```
  - **Error Status Codes:**
    - `404 Not Found`: If the candidate with the specified ID is not found.
    - `500 Internal Server Error`: If an internal server error occurs.

### 3. Create Candidate

- **Endpoint:** `POST /api/candidates`
- **Description:** Create a new candidate.
- **Request:**
  - **Authorization Header:**
    - `Authorization`: Bearer token for admin authentication.
  - **Body:**
    - `name` (string): The name of the candidate.
    - `cand_type` (string): The type of the candidate.
    - `email` (string): The email of the candidate.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    {
      "message": "Candidate created successfully!",
      "candidate": {
        "id": 1,
        "name": "John Doe",
        "cand_type": "President",
        "email": "john@example.com"
      }
    }
    ```
  - **Error Status Codes:**
    - `409 Conflict`: If the candidate with the specified email already exists.
    - `404 Not Found`: If the candidate cannot be created.
    - `500 Internal Server Error`: If an internal server error occurs.

### 4. Update Candidate by ID

- **Endpoint:** `PUT /api/candidates/:id`
- **Description:** Update a candidate's information by ID.
- **Request:**
  - **Authorization Header:**
    - `Authorization`: Bearer token for admin authentication.
  - **Parameters:**
    - `id` (integer): The ID of the candidate.
  - **Body:**
    - `name` (string): The new name of the candidate.
    - `cand_type` (string): The new type of the candidate.
    - `email` (string): The new email of the candidate.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    {
      "message": "Candidate updated successfully!",
      "candidate": {
        "id": 1,
        "name": "Updated Name",
        "cand_type": "Updated Type",
        "email": "updated@example.com"
      }
    }
    ```
  - **Error Status Codes:**
    - `404 Not Found`: If the candidate with the specified ID is not found.
    - `500 Internal Server Error`: If an internal server error occurs.

### 5. Delete Candidate by ID

- **Endpoint:** `DELETE /api/candidates/:id`
- **Description:** Delete a candidate by ID.
- **Request:**
  - **Authorization Header:**
    - `Authorization`: Bearer token for admin authentication.
  - **Parameters:**
    - `id` (integer): The ID of the candidate.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    {
      "message": "Candidate deleted successfully!"
    }
    ```
  - **Error Status Codes:**
    - `404 Not Found`: If the candidate with the specified ID is not found.
    - `500 Internal Server Error`: If an internal server error occurs.

Certainly! Below is the API documentation for the provided code:

---

##*Votes*


## Endpoints

### 1. Get All Votes

- **Endpoint:** `GET /api/votes`
- **Description:** Retrieve a list of all votes.
- **Request:**
  - No request parameters required.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    [
      {
        "id": 1,
        "voterId": 1,
        "candidateId": 1
      },
      // ... other votes
    ]
    ```
  - **Error Status Codes:**
    - `404 Not Found`: If no votes are found.
    - `500 Internal Server Error`: If an internal server error occurs.

### 2. Get Vote by ID

- **Endpoint:** `GET /api/votes/:id`
- **Description:** Retrieve a specific vote by ID.
- **Request:**
  - **Parameters:**
    - `id` (integer): The ID of the vote.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    {
      "id": 1,
      "voterId": 1,
      "candidateId": 1
    }
    ```
  - **Error Status Codes:**
    - `404 Not Found`: If the vote with the specified ID is not found.
    - `500 Internal Server Error`: If an internal server error occurs.

### 3. Create Vote

- **Endpoint:** `POST /api/votes`
- **Description:** Create a new vote.
- **Request:**
  - **Authorization Header:**
    - `Authorization`: Bearer token for voter authentication.
  - **Body:**
    - `voterId` (integer): The ID of the voter.
    - `candidateId` (integer): The ID of the candidate.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    {
      "id": 1,
      "voterId": 1,
      "candidateId": 1
    }
    ```
    Certainly! Below is the API documentation for the provided code:

---

### 1. Update Vote by ID

- **Endpoint:** `PUT api/votes/:id`
- **Description:** Update a vote by ID.
- **Request:**
  - **Authorization Header:**
    - `Authorization`: Bearer token for voter authentication.
  - **Parameters:**
    - `id` (integer): The ID of the vote.
  - **Body:**
    - `candidateId` (integer): The ID of the new candidate.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    {
      "message": "Vote updated successfully!",
      "vote": {
        "id": 1,
        "voterId": 1,
        "candidateId": 2
      }
    }
    ```
  - **Error Status Codes:**
    - `404 Not Found`: If the vote with the specified ID is not found.
    - `500 Internal Server Error`: If an internal server error occurs.

### 2. Delete Vote by ID

- **Endpoint:** `DELETE api/votes/:id`
- **Description:** Delete a vote by ID.
- **Request:**
  - **Authorization Header:**
    - `Authorization`: Bearer token for voter authentication.
  - **Parameters:**
    - `id` (integer): The ID of the vote.
- **Response:**
  - **Success Status Code:** `200 OK`
  - **Success Response:**
    ```json
    {
      "message": "Vote deleted successfully!"
    }
    ```
  - **Error Status Codes:**
    - `404 Not Found`: If the vote with the specified ID is not found.
    - `500 Internal Server Error`: If an internal server error occurs.

---

