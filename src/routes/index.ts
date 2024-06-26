export enum ApiRoutes {
  // Base
  BASE = '/api/v1',

  // Student CRUD Operations
  CREATE_STUDENT = '/students',
  RETRIEVE_STUDENT = '/students/:id',
  UPDATE_STUDENT = '/students/:id',
  DELETE_STUDENT = '/students/:id',
  LIST_STUDENTS = '/students',

  // Student Search
  SEARCH_STUDENTS = '/students/search',

  // Course CRUD Operations
  CREATE_COURSE = '/courses',
  RETRIEVE_COURSE = '/courses/:id',
  UPDATE_COURSE = '/courses/:id',
  DELETE_COURSE = '/courses/:id',
  LIST_COURSES = '/courses',

  // Course Search
  SEARCH_COURSES = '/courses/search',
  ADVANCED_SEARCH_COURSES = '/courses/advanced-search',

  // Register/Remove Course for Student
  REGISTER_COURSE_FOR_STUDENT = '/students/:studentId/courses/:courseId',
  REMOVE_COURSE_FOR_STUDENT = '/students/:studentId/courses/:courseId',

  // Course Report
  COURSE_REPORT = '/courses/:id/report',

  // Student Report
  STUDENT_REPORT = '/students/:id/report'
}
