import {  IStudent, IStudentResponse } from "@scm/@types/student.types";
import { logger } from "@scm/utils/logger";
import { studentModel } from "../models/student.model";
import { ApiError } from "@scm/errors/api-error";
import NotFoundError from "@scm/errors/not-found-error"; // Renamed from `NotFound` to `NotFoundError`
import {  ObjectId } from "mongodb";
import { IStudentRepository, StudentQuery } from "../@types/student.types";
import { IQueryParams } from "@scm/@types/queryParams";
import DuplicateError from "@scm/errors/duplicate-error";
import { FilterQuery } from "mongoose";

export class StudentRepository implements IStudentRepository {
    private static instance: StudentRepository;

    private constructor() { } // Make constructor private to enforce singleton pattern

    static getInstance(): StudentRepository {
        if (!StudentRepository.instance) {
            StudentRepository.instance = new StudentRepository();
        }
        return StudentRepository.instance;
    }

    async create(student: IStudent): Promise<IStudentResponse> {
        try {
            const existingStudent = await this.findOneByQuery({ phone_number: student.phone_number });
    
            if (existingStudent) {
                throw new DuplicateError("Invalid phone number!");
            }
    
            const newStudent = new studentModel({
                ...student,
                is_deleted: false
            });
    
            const savedStudent = await newStudent.save(); // Await save() method
    
            if (!savedStudent) {
                throw new ApiError("Failed to create student!");
            }
    
            return savedStudent as IStudentResponse; // Type assertion if necessary
        } catch (error: unknown) {
            logger.error(`An error occurred in create(): ${error}`);
            
            if (error instanceof ApiError || error instanceof DuplicateError) {
                throw error;
            }
            
            throw new ApiError("Unexpected error occurred while creating student");
        }
    }
    

    async findById(id: string): Promise<IStudentResponse> {
        try {
            const student = await studentModel.findOne({
                _id: new ObjectId(id), is_deleted: false
            });

            if (!student) {
                throw new NotFoundError(`No student found with the specific ID!`);
            }

            return student;
        } catch (error: unknown) {
            logger.error(`An error occurred in findById() ${error}`);
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurred while finding student`);
        }
    }

    async findAll(): Promise<IStudentResponse[]> {
        try {
            const students = await studentModel.find({
                is_deleted: false
            });

            if (!students || students.length === 0) {
                throw new NotFoundError(`No students found`);
            }

            return students;
        } catch (error: unknown) {
            logger.error(`An error occurred in findAll() ${error}`);
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurred while finding all students`);
        }
    }

    async updateById(id: string, student: Partial<IStudent>): Promise<IStudentResponse> {
        try {
            const existingStudent = await this.findOneByQuery({_id: new ObjectId(id), is_deleted: false})

            if(!existingStudent){
                throw new NotFoundError("No student found with the specific ID!")
            }
            const studentUpdated = await studentModel.findByIdAndUpdate(
                { _id: new ObjectId(id) },
                student,
                { new: true }
            );

            if (!studentUpdated) {
                throw new ApiError(`Failed to update student!`);
            }

            return studentUpdated;
        } catch (error: unknown) {
            logger.error(`An error occurred in updateById() ${error}`);
            if (error instanceof ApiError || error instanceof NotFoundError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurred while updating student`);
        }
    }

    async deleteById(id: string): Promise<void> {
        try {

            const deletedStudent = await this.findOneByQuery({_id: new ObjectId(id) , is_deleted: true})

            if(deletedStudent){
                throw new DuplicateError("Student has been deleted!")
            }

            const studentDeleted = await studentModel.findByIdAndUpdate(
                { _id: new ObjectId(id) },
                { is_deleted: true },
                {new: true}
            );

            if (studentDeleted?.is_deleted === false) {
                throw new ApiError(`Failed to delete student!`);
            }
        } catch (error: unknown) {
            logger.error(`An error occurred in deleteById() ${error}`);
            if (error instanceof ApiError || error instanceof DuplicateError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurred while deleting student`);
        }
    }


    async findOneByQuery(queries : IQueryParams):Promise<IStudent | null>{
        try{
            const student = await studentModel.findOne(queries).exec();

            return student
        }catch(error: unknown){
            logger.error(`An error occurred in findOneByQuery() ${error}`);
       
            throw new ApiError(`Unexpected error occurred while finding student`);
        }
    }  
    
    
    async searchStudentsByQuery(queries: FilterQuery<StudentQuery>): Promise<IStudentResponse[]> {
        try {
            const students = await studentModel.find({
                ...queries,
                is_deleted: false
            }).exec();
    
            if (!students || students.length === 0) {
                throw new NotFoundError(`Can not find student with ${queries}`);
            }
    
            return students;
        } catch (error: unknown) {
            logger.error(`An error occurred in searchStudentsByQuery(): ${error}`);
            
            if (error instanceof NotFoundError) {
                throw error; // rethrow known errors
            } else {
                throw new ApiError(`Unexpected error occurred while searching for students`);
            }
        }
    }
}
