import { IStudent, IStudentRespone, PartialIStudent } from "@scm/@types/student.types";
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

    async create(student: IStudent): Promise<IStudentRespone> {
        try {
            const newStudent = await new studentModel(student).save(); // Await save() method

            if (!newStudent) {
                throw new ApiError("Unable to create student!");
            }

            return newStudent;
        } catch (error: unknown) {
            logger.error(`An error occurs in create() ${error}`);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurs`);
        }
    }

    async findById(id: string): Promise<IStudentRespone> {
        try {
            const student = await studentModel.findById(id);

            if (!student) {
                throw new NotFoundError(`No student found with the specific id ${id}`);
            }

            return student;
        } catch (error: unknown) {
            logger.error(`An error occurs in findById() ${error}`);
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurs`);
        }
    }

    async findAll(): Promise<IStudentRespone[]> {
        try {
            const students = await studentModel.find();

            if (!students || students.length === 0) {
                throw new NotFoundError(`No students found`);
            }

            return students;
        } catch (error: unknown) {
            logger.error(`An error occurs in findAll() ${error}`);
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurs`);
        }
    }

    async updateById(id: string, updateStudent: PartialIStudent): Promise<IStudentRespone> {
        try {
            const studentUpdated = await studentModel.findByIdAndUpdate(
                { _id: new ObjectId(id) },
                updateStudent,
                { new: true }
            );

            if (!studentUpdated) {
                throw new ApiError(`Unable to update student!`);
            }

            return studentUpdated;
        } catch (error: unknown) {
            logger.error(`An error occurs in updateById() ${error}`);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurs`);
        }
    }

    async deleteById(id: string): Promise<null> {
        try {
            const studentDeleted = await studentModel.findByIdAndUpdate(
                { _id: new ObjectId(id) },
                { is_deleted: true }
            );

            if (studentDeleted?.is_deleted === false) {
                throw new ApiError(`Unable to delete student!`);
            }

            return null
        } catch (error: unknown) {
            logger.error(`An error occurs in deleteById() ${error}`);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurs`);
        }
    }
}
