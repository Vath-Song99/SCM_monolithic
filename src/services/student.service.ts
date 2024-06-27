import {   IStudent, IStudentReport, IStudentResponse } from "@scm/@types/student.types";
import { IStudentService } from "./@types/student-service.types";
import { StudentRepository } from "@scm/database/repositories/student.repository";
import { logger } from "@scm/utils/logger";
import { BaseCustomError } from "@scm/errors/base-custom-error";
import { StatusCode } from "@scm/utils/consts";
import { ApiError } from "@scm/errors/api-error";
import DuplicateError from "@scm/errors/duplicate-error";
import {  ObjectId } from "mongodb";
import { SearchQuery } from "@scm/@types/queryParams";
import NotFoundError from "@scm/errors/not-found-error";
import { CourseRepository } from "@scm/database/repositories/course.repository";
import { Types } from "mongoose";


export class StudentService implements IStudentService {
    private static instance: StudentService;
    private studentRepository: StudentRepository;
    private constructor(){
        this.studentRepository = StudentRepository.getInstance();
    };

    static getInstance():StudentService {
        if(!StudentService.instance){
            StudentService.instance = new StudentService();
        }
        return StudentService.instance;
    }

    async createStudent(student: IStudent): Promise<IStudentResponse> {
        try{

            const newStudent = await this.studentRepository.create(student);

            return newStudent;
        }catch(error: unknown){
            logger.error(`An error accurred in createStudent() ${error}`)
            
            if(error instanceof DuplicateError){
            throw error
            }
            throw new ApiError("Fail to create student!")
        }
    }

    async getStudentById(id: string): Promise<IStudentResponse> {
        try{

            if(!ObjectId.isValid(id)){
                throw new BaseCustomError("Invalid student id!", StatusCode.BadRequest)
              };
            const student = await this.studentRepository.findById(id);

            return student
        }catch(error: unknown){
            logger.error(`An error accurred in getStudentById() ${error}`)
            if(error instanceof BaseCustomError){
                throw error
            }
            throw new ApiError("Faild to get student!")
        }
    }

    async getAllStudents(): Promise<IStudentResponse[]> {
        try{
            const students = await this.studentRepository.findAll();

            return students
        }catch(error: unknown){
            throw error
        }
    }

    async updateStudentById(id: string, student: Partial<IStudent>): Promise<IStudentResponse> {
        try{
          if(!ObjectId.isValid(id)){
            throw new BaseCustomError("Invalid student id!", StatusCode.BadRequest)
          };

          const updateFields: Partial<IStudent> = {
            ...(student?.full_name_en && { full_name_en: student.full_name_en }),
            ...(student?.full_name_km && { full_name_km: student.full_name_km }),
            ...(student?.gender && { gender: student.gender }),
            ...(student?.date_of_birth && { date_of_birth: student.date_of_birth }),
            ...(student?.phone_number && { phone_number: student.phone_number }),
        };

        const studentUpdated = await this.studentRepository.updateById(id, updateFields);

          return studentUpdated
        }catch(error: unknown){
            logger.error(`An error accurred in getStudentById() ${error}`);

            if(error instanceof BaseCustomError){
                throw error
            }
            throw new ApiError("Faild to update student!")
        }
    }


    async deleteStudentById(id: string):Promise<void> {
        try{
            if(!ObjectId.isValid(id)){
                throw new BaseCustomError("Invalid student id!", StatusCode.BadRequest)
              };
            await this.studentRepository.deleteById(id);
        }catch(error: unknown){
            logger.error(`An error accurred in deleteStudentById() ${error}`);
            if(error instanceof BaseCustomError){
                throw error
            }
            throw new ApiError("Faild to delete student!")
        }
    }

    async searchStudents(searchTerm: string): Promise<IStudentResponse[]> {
        try{
    
            const searchFields: SearchQuery = {
                $or: [
                    { full_name_en: { $regex: searchTerm, $options: 'i' } },
                    { full_name_km: { $regex: searchTerm, $options: 'i' }}, 
                    { phone_number: { $regex: searchTerm, $options: 'i' } } 
                ]
            }
    
            const students = await this.studentRepository.searchByQuery(searchFields);

            return students
        }catch(error: unknown){

            logger.error(`An error accurred in searchStudents() ${error}`);

            throw error
        }
    }


    async register(studentId: string, courseId: string): Promise<IStudentResponse> {
        try {
            if (!Types.ObjectId.isValid(studentId) || !Types.ObjectId.isValid(courseId)) {
                throw new BaseCustomError("Invalid ID format!", StatusCode.BadRequest);
            }
    
            const student = await this.studentRepository.findById(studentId) as any;
            if (!student) {
                throw new NotFoundError("No student found!");
            }
    
            const courseService = CourseRepository.getInstance();
            const course = await courseService.findById(courseId) as any;
            if (!course) {
                throw new NotFoundError("No course found!");
            }
    
            if (student.courses.includes(course._id)) {
                throw new DuplicateError("You're already registered to this course!");
            }
    
            if (course.enrolled_students.includes(student._id)) {
                throw new DuplicateError("You're already registered to this course!");
            }
    
            student.courses.push(course._id);
            course.enrolled_students.push(student._id);
    
            // Save the updated documents to the database
            await student.save();
            await course.save();
    
            return student;
        } catch (error: unknown) {
            logger.error(`An error occurred in register() ${error}`);
            if (error instanceof BaseCustomError || error instanceof NotFoundError || error instanceof DuplicateError) {
                throw error;
            }
            throw new ApiError("Failed to register!");
        }
    }
    
    async removeCourse(studentId: string, courseId: string): Promise<IStudentResponse> {
        try{
            if (!Types.ObjectId.isValid(studentId) || !Types.ObjectId.isValid(courseId)) {
                throw new BaseCustomError("Invalid ID format!", StatusCode.BadRequest);
            }

            const student = await this.studentRepository.findById(studentId) as any;
            if (!student) {
                throw new NotFoundError("No student found!");
            }
    
            const courseService = CourseRepository.getInstance();
            const course = await courseService.findById(courseId) as any;
            if (!course) {
                throw new NotFoundError("No course found!");
            }

            student.courses = student.courses.filter(
                (course: ObjectId) => !course.equals(courseId)
              );
              await student.save();
          
              course.enrolled_students = course.enrolled_students.filter(
                (student: ObjectId) => !student.equals(studentId)
              );
              await course.save();

              return student
        }catch(error: unknown){
            logger.error(`An error occurred in register() ${error}`);
            if (error instanceof BaseCustomError || error instanceof NotFoundError || error instanceof DuplicateError) {
                throw error;
            }
            throw new ApiError("Failed to register!");
        }
    }

    async getStudentsReport(): Promise<IStudentReport[]> {
        try{
            const students = await this.studentRepository.getReport();

            return students
        }catch(error: unknown){
            logger.error(`An error occurred in getStudentReport() ${error}`);
            throw new ApiError("Failed to get students report!");
        }
    }


}