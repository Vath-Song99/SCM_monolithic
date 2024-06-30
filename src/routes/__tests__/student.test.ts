// student.routes.test.ts
import request from "supertest";
import express from "express";
import { StatusCode } from "@scm/utils/consts";
import { StudentController } from "@scm/controllers/student.controller";
import bodyParser from "body-parser";
import studentRouter from "../student.routes";

// Mocking StudentController and its methods
jest.mock("@scm/controllers/student.controller");

const mockCreateStudent = jest.fn();
const mockGetStudentsReport = jest.fn();
const mockSearchStudents = jest.fn();
const mockGetAllStudents = jest.fn();
const mockGetStudent = jest.fn();
const mockUpdateStudent = jest.fn();
const mockDeleteStudent = jest.fn();
const mockRegister = jest.fn();
const mockRemoveCourse = jest.fn();

StudentController.getInstance = jest.fn().mockReturnValue({
  createStudent: mockCreateStudent,
  getStudentsReport: mockGetStudentsReport,
  searchStudents: mockSearchStudents,
  getAllStudents: mockGetAllStudents,
  getStudent: mockGetStudent,
  updateStudent: mockUpdateStudent,
  deleteStudent: mockDeleteStudent,
  register: mockRegister,
  removeCourse: mockRemoveCourse,
});

const app = express();
app.use(bodyParser.json());
app.use("/students", studentRouter);

describe("Student Routes", () => {
  it("should create a new student", async () => {
    const mockStudent = {
      full_name_en: "John Doe",
      full_name_km: "សុខ ស៊ីម៉ាន់",
      date_of_birth: "1990-05-15T00:00:00.000Z",
      gender: "male",
      phone_number: "+855973238144",
      courses: ["667fb8a1fd67fa8bce216370", "667fb9e20d778b0eb1a8d0db"],
    }; // your mock student object
    mockCreateStudent.mockResolvedValue(mockStudent);

    const response = await request(app).post("/students").send(mockStudent);

    expect(response.status).toBe(StatusCode.Created);
    expect(response.body).toMatchObject({
      success: true,
      statusCode: StatusCode.Created,
      message: "Success create new student",
      data: mockStudent,
    });
  });

  it("should get student report", async () => {
    const mockStudents = [
      {
        full_name_en: "John Doe",
        full_name_km: "សុខ ស៊ីម៉ាន់",
        date_of_birth: "1990-05-15T00:00:00.000Z",
        gender: "male",
        phone_number: "+855973238144",
        courses: ["667fb8a1fd67fa8bce216370", "667fb9e20d778b0eb1a8d0db"],
      },
    ]; // array of mock students
    mockGetStudentsReport.mockResolvedValue(mockStudents);

    const response = await request(app).get("/students/report");

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body).toMatchObject({
      success: true,
      statusCode: StatusCode.OK,
      message: "Success get report for student",
      data: mockStudents,
    });
  });

  // Add more tests for each route...
});
