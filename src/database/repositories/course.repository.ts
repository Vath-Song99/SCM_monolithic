import { ICourse, ICourseRespone, PartialICourse } from "@scm/@types/course.types";
import { logger } from "@scm/utils/logger";
import { courseModel } from "../model/course.model";
import { ApiError } from "@scm/errors/api-error";
import NotFoundError from "@scm/errors/not-found-error"; // Renamed from `NotFound` to `NotFoundError`
import { ObjectId } from "mongodb";
import { ICourseRepository } from "../@types/course.types";

export class CourseRepository implements ICourseRepository {
    private static instance: CourseRepository;
    private constructor() { } // Make constructor private to enforce singleton pattern

    static getInstance(): CourseRepository {
        if (!CourseRepository.instance) {
            CourseRepository.instance = new CourseRepository();
        }
        return CourseRepository.instance;
    }

    async create(course: ICourse): Promise<ICourseRespone> {
        try {
            const newCourse = await new courseModel(course).save();

            if (!newCourse) {
                throw new ApiError("Unable to create course!");
            }

            return newCourse;
        } catch (error: unknown) {
            logger.error(`An error occurs in create() ${error}`);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurs`);
        }
    }

    async findById(id: string): Promise<ICourseRespone> {
        try {
            const course = await courseModel.findById(id);

            if (!course) {
                throw new NotFoundError(`No course found with the specific id ${id}`);
            }

            return course;
        } catch (error: unknown) {
            logger.error(`An error occurs in findById() ${error}`);
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurs`);
        }
    }

    async findAll(): Promise<ICourseRespone[]> {
        try {
            const courses = await courseModel.find();

            if (!courses || courses.length === 0) {
                throw new NotFoundError(`No courses found`);
            }

            return courses;
        } catch (error: unknown) {
            logger.error(`An error occurs in findAll() ${error}`);
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new ApiError(`Unexpected error occurs`);
        }
    }

    async updateById(id: string, updateCourse: PartialICourse): Promise<ICourseRespone> {
        try {
            const courseUpdated = await courseModel.findByIdAndUpdate(
                { _id: new ObjectId(id) },
                updateCourse,
                { new: true }
            );

            if (!courseUpdated) {
                throw new ApiError(`Unable to update course!`);
            }

            return courseUpdated;
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
            const courseDeleted = await courseModel.findByIdAndDelete(id);

            if (!courseDeleted?.is_deleted) {
                throw new ApiError(`Unable to delete course!`);
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
