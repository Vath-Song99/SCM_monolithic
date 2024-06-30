// course.routes.test.ts
import request from "supertest";
import express from "express";
import { StatusCode } from "@scm/utils/consts";
import { CourseController } from "@scm/controllers/course.controller";
import bodyParser from "body-parser";
import courseRouter from "../course.routes";

// Mocking CourseController and its methods
jest.mock("@scm/controllers/course.controller");

const mockCreateCourse = jest.fn();
const mockGetCoursesReport = jest.fn();
const mockGetAllCourses = jest.fn();
const mockSearchCourses = jest.fn();
const mockAdvanceSearchCourses = jest.fn();
const mockGetCourse = jest.fn();
const mockUpdateCourse = jest.fn();
const mockDeleteCourse = jest.fn();

CourseController.getInstance = jest.fn().mockReturnValue({
  createCourse: mockCreateCourse,
  getCoursesReport: mockGetCoursesReport,
  getAllCourses: mockGetAllCourses,
  searchCourses: mockSearchCourses,
  advanceSearchCourses: mockAdvanceSearchCourses,
  getCourse: mockGetCourse,
  updateCourse: mockUpdateCourse,
  deleteCourse: mockDeleteCourse,
});

const app = express();
app.use(bodyParser.json());
app.use("/courses", courseRouter);

describe("Course Routes", () => {
  it("should create a new course", async () => {
    const mockCourse = {
      name: "Introduction to Computer Scienctise",
      professor_name: "Dr. Jane Smith Vath",
      limit_number_of_students: 30,
      start_date: "2024-09-01T00:00:00.000Z",
      end_date: "2024-12-15T00:00:00.000Z",
      enrolled_students: [
        "667f9b5d608df88473d6dc1a",
        "667fba210d778b0eb1a8d0e4",
        "667fbc0c2ee96d8d99d0b68e",
      ],
    }; // your mock course object
    mockCreateCourse.mockResolvedValue(mockCourse);

    const response = await request(app)
      .post("/courses")
      .send(mockCourse);

    expect(response.status).toBe(StatusCode.Created);
    expect(response.body).toMatchObject({
      success: true,
      statusCode: StatusCode.Created,
      message: "Success create new course",
      data: mockCourse,
    });
  });

  it("should get course report", async () => {
    const mockCourses = [
      {
        name: "Introduction to Computer Scienctise",
        professor_name: "Dr. Jane Smith Vath",
        limit_number_of_students: 30,
        start_date: "2024-09-01T00:00:00.000Z",
        end_date: "2024-12-15T00:00:00.000Z",
        enrolled_students: [
          "667f9b5d608df88473d6dc1a",
          "667fba210d778b0eb1a8d0e4",
          "667fbc0c2ee96d8d99d0b68e",
        ],
      },
    ]; // array of mock courses
    mockGetCoursesReport.mockResolvedValue(mockCourses);

    const response = await request(app).get("/courses/report");

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body).toMatchObject({
      success: true,
      statusCode: StatusCode.OK,
      message: "Success get report for courses",
      data: mockCourses,
    });
  });

  it("should list all courses", async () => {
    const mockCourses = [
      {
        name: "Introduction to Computer Scienctise",
        professor_name: "Dr. Jane Smith Vath",
        limit_number_of_students: 30,
        start_date: "2024-09-01T00:00:00.000Z",
        end_date: "2024-12-15T00:00:00.000Z",
        enrolled_students: [
          "667f9b5d608df88473d6dc1a",
          "667fba210d778b0eb1a8d0e4",
          "667fbc0c2ee96d8d99d0b68e",
        ],
      },
    ]; // array of mock courses
    mockGetAllCourses.mockResolvedValue(mockCourses);

    const response = await request(app).get("/courses");

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body).toMatchObject({
      success: true,
      statusCode: StatusCode.OK,
      message: "Success retrieved courses",
      data: mockCourses,
    });
  });

  it("should search courses", async () => {
    const mockCourses = [
      {
        name: "Introduction to Computer Scienctise",
        professor_name: "Dr. Jane Smith Vath",
        limit_number_of_students: 30,
        start_date: "2024-09-01T00:00:00.000Z",
        end_date: "2024-12-15T00:00:00.000Z",
        enrolled_students: [
          "667f9b5d608df88473d6dc1a",
          "667fba210d778b0eb1a8d0e4",
          "667fbc0c2ee96d8d99d0b68e",
        ],
      },
    ]; // array of mock courses
    mockSearchCourses.mockResolvedValue(mockCourses);

    const response = await request(app)
      .get("/courses/search")
      .query({ query: "Introduction" });

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body).toMatchObject({
      success: true,
      statusCode: StatusCode.OK,
      message: "Success search for courses",
      data: mockCourses,
    });
  });

  it("should perform advanced search for courses", async () => {
    const mockCourses = [
      {
        name: "Introduction to Computer Scienctise",
        professor_name: "Dr. Jane Smith Vath",
        limit_number_of_students: 30,
        start_date: "2024-09-01T00:00:00.000Z",
        end_date: "2024-12-15T00:00:00.000Z",
        enrolled_students: [
          "667f9b5d608df88473d6dc1a",
          "667fba210d778b0eb1a8d0e4",
          "667fbc0c2ee96d8d99d0b68e",
        ],
      },
    ]; // array of mock courses
    mockAdvanceSearchCourses.mockResolvedValue(mockCourses);

    const response = await request(app)
      .get("/courses/advanced-search")
      .query({ start_date: "2021-01-01", end_date: "2021-12-31" });

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body).toMatchObject({
      success: true,
      statusCode: StatusCode.OK,
      message: "Success search courses",
      data: mockCourses,
    });
  });

  it("should retrieve a course by ID", async () => {
    const mockCourse = {
      name: "Introduction to Computer Scienctise",
      professor_name: "Dr. Jane Smith Vath",
      limit_number_of_students: 30,
      start_date: "2024-09-01T00:00:00.000Z",
      end_date: "2024-12-15T00:00:00.000Z",
      enrolled_students: [
        "667f9b5d608df88473d6dc1a",
        "667fba210d778b0eb1a8d0e4",
        "667fbc0c2ee96d8d99d0b68e",
      ],
    }; // your mock course object
    mockGetCourse.mockResolvedValue(mockCourse);

    const response = await request(app).get("/courses/667fb8a1fd67fa8bce216370");

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body).toMatchObject({
      success: true,
      statusCode: StatusCode.OK,
      message: "Success retrieved course",
      data: mockCourse,
    });
  });

  it("should update a course by ID", async () => {
    const mockCourse = {
      name: "Introduction to Computer Scienctise",
      professor_name: "Dr. Jane Smith",
      limit_number_of_students: 30,
      start_date: "2024-09-01T00:00:00.000Z",
      end_date: "2024-12-15T00:00:00.000Z",
      enrolled_students: [
        "667f9b5d608df88473d6dc1a",
        "667fba210d778b0eb1a8d0e4",
        "667fbc0c2ee96d8d99d0b68e",
      ],
    }; // your mock course object
    mockUpdateCourse.mockResolvedValue(mockCourse);

    const response = await request(app)
      .put("/courses/667fb8a1fd67fa8bce216370")
      .send(mockCourse);

    expect(response.status).toBe(StatusCode.Created);
    expect(response.body).toMatchObject({
      success: true,
      statusCode: StatusCode.Created,
      message: "Success updated course",
      data: mockCourse,
    });
  });

  it("should delete a course by ID", async () => {
    mockDeleteCourse.mockResolvedValue(null);

    const response = await request(app).delete("/courses/667fb8a1fd67fa8bce216370");

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body).toMatchObject({
      success: true,
      statusCode: StatusCode.OK,
      message: "Success deleted course",
      data: null,
    });
  });
});
