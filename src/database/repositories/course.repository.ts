import { ICourse, ICourseResponse, PartialICourse } from "@scm/@types/course.types";
import { logger } from "@scm/utils/logger";
import { courseModel } from "../model/course.model";
import { ApiError } from "@scm/errors/api-error";
import NotFoundError from "@scm/errors/not-found-error"; // Renamed from `NotFound` to `NotFoundError`
import { ObjectId } from "mongodb";
import { ICourseRepository } from "../@types/course.types";

export class CourseRepository implements ICourseRepository {
    private static instance: CourseRepository;

    private constructor() { } // Private constructor to enforce singleton pattern

    static getInstance(): CourseRepository {
        if (!CourseRepository.instance) {
            CourseRepository.instance = new CourseRepository();
        }
        return CourseRepository.instance;
    }

    async create(course: ICourse): Promise<ICourseResponse> {
        try {
            const newCourse = await new courseModel(course).save();

            if (!newCourse) {
                throw new ApiError("Failed to create course.");
            }

            return newCourse;
        } catch (error: unknown) {
            logger.error(`Error in create(): ${error}`);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError("Unexpected error occurred while creating course.");
        }
    }

    async findById(id: string): Promise<ICourseResponse> {
        try {
            const course = await courseModel.findById(id);

            if (!course) {
                throw new NotFoundError(`No course found with the specified ID: ${id}`);
            }

            return course;
        } catch (error: unknown) {
            logger.error(`Error in findById(): ${error}`);
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new ApiError("Unexpected error occurred while retrieving course.");
        }
    }

    async findAll(): Promise<ICourseResponse[]> {
        try {
            const courses = await courseModel.find();

            if (!courses || courses.length === 0) {
                throw new NotFoundError("No courses found.");
            }

            return courses;
        } catch (error: unknown) {
            logger.error(`Error in findAll(): ${error}`);
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new ApiError("Unexpected error occurred while retrieving courses.");
        }
    }

    async updateById(id: string, updateCourse: PartialICourse): Promise<ICourseResponse> {
        try {
            const courseUpdated = await courseModel.findByIdAndUpdate(
                { _id: new ObjectId(id) },
                updateCourse,
                { new: true }
            );

            if (!courseUpdated) {
                throw new ApiError("Failed to update course.");
            }

            return courseUpdated;
        } catch (error: unknown) {
            logger.error(`Error in updateById(): ${error}`);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError("Unexpected error occurred while updating course.");
        }
    }

    async deleteById(id: string): Promise<void> {
        try {
            const courseDeleted = await courseModel.findByIdAndDelete(id);

            if (!courseDeleted) {
                throw new ApiError("Failed to delete course.");
            }
        } catch (error: unknown) {
            logger.error(`Error in deleteById(): ${error}`);
            if (error instanceof ApiError) {
                throw error;
            }
            throw new ApiError("Unexpected error occurred while deleting course.");
        }
    }
}
