import { IStudent, IStudentResponse, PartialIStudent } from "@scm/@types/student.types";
import { logger } from "@scm/utils/logger";
import { studentModel } from "../model/student.model";
import { ApiError } from "@scm/errors/api-error";
import NotFoundError from "@scm/errors/not-found-error"; // Renamed from `NotFound` to `NotFoundError`
import { ObjectId } from "mongodb";
import { IStudentRepository } from "../@types/student.types";

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
            const newStudent = await new studentModel({
                ...student,
                is_deleted: false
            }).save(); // Await save() method

            if (!newStudent) {
                throw new ApiError("Faild to create student!");
            }

            return newStudent;
        } catch (error: unknown) {
            logger.error(`An error occurred in create() ${error}`);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurred`);
        }
    }

    async findById(id: string): Promise<IStudentResponse> {
        try {
            const student = await studentModel.findById(id);

            if (!student) {
                throw new NotFoundError(`No student found with the specific ID ${id}`);
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
            const students = await studentModel.find();

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

    async updateById(id: string, student: PartialIStudent): Promise<IStudentResponse> {
        try {
            const studentUpdated = await studentModel.findByIdAndUpdate(
                { _id: new ObjectId(id) },
                student,
                { new: true }
            );

            if (!studentUpdated) {
                throw new ApiError(`Faild to update student!`);
            }

            return studentUpdated;
        } catch (error: unknown) {
            logger.error(`An error occurred in updateById() ${error}`);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurred while updating student`);
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            const studentDeleted = await studentModel.findByIdAndUpdate(
                { _id: new ObjectId(id) },
                { is_deleted: true }
            );

            if (studentDeleted?.is_deleted === false) {
                throw new ApiError(`Faild to delete student!`);
            }
        } catch (error: unknown) {
            logger.error(`An error occurred in deleteById() ${error}`);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurred while deleting student`);
        }
    }
}
