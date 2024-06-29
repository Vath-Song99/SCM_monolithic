
<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://media.licdn.com/dms/image/D5603AQHTEe-kZ5XiQQ/profile-displayphoto-shrink_400_400/0/1719117281984?e=1724889600&v=beta&t=o4FGGwMPxtQ7Yv0F_TepyRgNpg4rDvQ2CD_cu59AfBw" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Smoeury Songvat</h3>

  <p align="center">
    School and Course Management projects!
    <br />
    <a href="https://github.com/vath-song99/SCM_monolithic"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/vath-song99/SCM_monolithic">View Demo</a>
    ·
    <a href="https://github.com/Vath-Song99/SCM_monolithic/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Vath-Song99/SCM_monolithic/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



### Built With

This section list any major frameworks/libraries used to bootstrap my project.

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

If you prefer the api that deployed you can click ure this URL.[click-here](https://d2oq0pn49kagg5.cloudfront.net)

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
    or

* yarn
  ```sh
  npm install yarn@latest -g
  ```
### Installation

_Below is an example of how to settup the project requirement


1. Clone the repo
   ```sh
   git clone https://github.com/vath-song99/scm_monolithic.git
   ```
2. Install NPM or YARN packages
   ```sh
   npm install
   ```
   or

   ```sh
   yarn install
   ```   
3. Enter your .env variables in `configs/.env`
   ```js
    NODE_ENV=development    
    LOG_LEVEL=debug
    MONGODB_URL=**********
    PORT=3000
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

### Endpoint

### 1. Student CRUD Operations (using soft delete)

- **Create Student**: `POST /api/v1/students`
- **Retrieve Student**: `GET /api/v1/students/{id}`
- **Update Student**: `PUT /api/v1/students/{id}`
- **Delete Student (Soft Delete)**: `DELETE /api/v1/students/{id}`
- **List Students**: `GET /api/v1/students`

### 2. Student Search

- **Search Students by Full Name or Phone Number**: `GET /api/v1/students/search?query={searchTerm}`

### 3. Course CRUD Operations (using soft delete)

- **Create Course**: `POST /api/v1/courses`
- **Retrieve Course**: `GET /api/v1/courses/{id}`
- **Update Course**: `PUT /api/v1/courses/{id}`
- **Delete Course (Soft Delete)**: `DELETE /api/v1/courses/{id}`
- **List Courses**: `GET /api/v1/courses`

### 4. Course Search

- **Search Courses by Name**: `GET /api/v1/courses/search?query={searchTerm}`
- **Advanced Search Courses by Start Date and End Date**: `GET /api/v1/courses/advanced-search?start_date={startDate}&end_date={endDate}`

### 5. Register/Remove Course for Student

- **Register Course for Student**: `POST /api/v1/students/{studentId}/courses/{courseId}`
- **Remove Course for Student**: `DELETE /api/v1/students/{studentId}/courses/{courseId}`

### 6. Course Report

- **Course Report**: `GET /api/v1/courses/report`

### 7. Student Report

- **Student Report**: `GET /api/v1/students/report`


## Sample Request Body

- **Student**
```sh
    {
        "full_name_en": "John Doe",
        "full_name_km": "សុខ ស៊ីម៉ាន់",
        "date_of_birth": "1990-05-15T00:00:00.000Z",
        "gender": "male", # noted gender only lowercase
        "phone_number": "+855973238144",
        "courses": [
            "667fb8a1fd67fa8bce216370",
            "667fb9e20d778b0eb1a8d0db"
        ], # noted course can optionaly
    }
```

- **Course**
```sh
    {
        "name": "Introduction to Computer Science",
        "professor_name": "Dr. Jane Smith",
        "limit_number_of_students": 30,
        "start_date": "2024-09-01T00:00:00.000Z",
        "end_date": "2024-12-15T00:00:00.000Z",
        "enrolled_students": [
            "667f9b5d608df88473d6dc1a",
            "667fbc0c2ee96d8d99d0b68e"
        ], # noted enrolled_students can optionaly
    }
```
  
## Sample Response Body

- **Student**
```sh
    {
        "_id": "667fbc0c2ee96d8d99d0b68e",
        "full_name_en": "John Doe",
        "full_name_km": "សុខ ស៊ីម៉ាន់",
        "date_of_birth": "1990-05-15T00:00:00.000Z",
        "gender": "male",
        "phone_number": "+855973238144",
        "courses": [
            "667fb8a1fd67fa8bce216370",
            "667fb9e20d778b0eb1a8d0db"
        ],
        "is_deleted": false,
        "create_at": "2024-06-29T07:47:24.711Z",
        "__v": 3
    }
```

- **Course**
```sh
    {
        "_id": "667fb9e20d778b0eb1a8d0db",
        "name": "Introduction to Computer Science",
        "professor_name": "Dr. Jane Smith",
        "limit_number_of_students": 30,
        "start_date": "2024-09-01T00:00:00.000Z",
        "end_date": "2024-12-15T00:00:00.000Z",
        "enrolled_students": [
            "667f9b5d608df88473d6dc1a",
            "667fbc0c2ee96d8d99d0b68e"
        ],
        "is_deleted": false,
        "create_at": "2024-06-29T07:38:10.361Z",
        "__v": 1
    }
```
### Validation

**Student Document Validation**:

1. `full_name_en`: Must be a non-empty string.
2. `full_name_km`: Must be a non-empty string.
3. `date_of_birth`: Must be a valid date.
4. `gender`: Must be either "male", "female", or “other” valid options.
5. `phone_number`: Must be a valid phone number format .
6. `courses` :  Must be an array of valid course IDs. The string of IDs should not exceed

**Course Document Validation**:

1. `name`: Must be a non-empty string.
2. `professor_name`: Must be a non-empty string.
3. `limit_number_of_students`: Must be a positive integer.
4. `start_date`: Must be a valid date.
5. `end_date`: Must be a valid date and must be after `start_date`.
6. `enrolled_students`: Must be an array of valid student IDs. The string of IDs should not exceed .

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Smoeury Songvat - [@Songvat](https://www.linkedin.com/in/smoeury-songvat-a79aa0261/) - songvatsmoeury@gmail.com

Project Link: [https://github.com/vath-song99/scm_monolithic](https://github.com/vath-song99/scm_monolithic)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



