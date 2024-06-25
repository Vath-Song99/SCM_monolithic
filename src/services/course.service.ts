import { ICourse, ICourseResponse, PartialICourse } from "@scm/@types/course.types";
import { ICourseService } from "./@types/course-service.types";
import { logger } from "@scm/utils/logger";
import { CourseRepository } from "@scm/database/repositories/course.repository";
import { BaseCustomError } from "@scm/errors/base-custom-error";
import { StatusCode } from "@scm/utils/consts";
import { ApiError } from "@scm/errors/api-error";

export class CourseService implements ICourseService {
    private static instance: CourseService;
    private courseRepository: CourseRepository;

    private constructor() {
        this.courseRepository = CourseRepository.getInstance();
    }

    static getInstance(): CourseService {
        if (!CourseService.instance) {
            CourseService.instance = new CourseService();
        }
        return CourseService.instance;
    }

    async createCourse(course: ICourse): Promise<ICourseResponse> {
        try {
            const newCourse = await this.courseRepository.create(course);
            return newCourse;
        } catch (error: unknown) {
            logger.error(`An error occurred in createCourse()`, { error });
            throw error
        }
    }

    async getCourseById(id: string): Promise<ICourseResponse> {
        try {
            if (!id) {
                throw new BaseCustomError("Invalid course ID", StatusCode.BadRequest);
            }
            const course = await this.courseRepository.findById(id);
            return course;
        } catch (error: unknown) {
            logger.error(`An error occurred in getCourseById()`, { error });
            if (error instanceof BaseCustomError) {
                throw error;
            }
            throw new ApiError("Failed to retrieve course.");
        }
    }

    async getAllCourses(): Promise<ICourseResponse[]> {
        try {
            const courses = await this.courseRepository.findAll();
            return courses;
        } catch (error: unknown) {
            logger.error(`An error occurred in getAllCourses()`, { error });
            throw error
        }
    }

    async updateCourseById(id: string, course: PartialICourse): Promise<ICourseResponse> {
        try {
            if (!id) {
                throw new BaseCustomError("Invalid course ID", StatusCode.BadRequest);
            }
            const updatedCourse = await this.courseRepository.updateById(id, course);
            return updatedCourse;
        } catch (error: unknown) {
            logger.error(`An error occurred in updateCourseById()`, { error });
            if (error instanceof BaseCustomError) {
                throw error;
            }
            throw new ApiError("Failed to update course.");
        }
    }

    async deleteCourseById(id: string): Promise<void> {
        try {
            if (!id) {
                throw new BaseCustomError("Invalid course ID", StatusCode.BadRequest);
            }
            await this.courseRepository.deleteById(id);
            
        } catch (error: unknown) {
            logger.error(`An error occurred in deleteCourseById()`, { error });
            if (error instanceof BaseCustomError) {
                throw error;
            }
            throw new ApiError("Failed to delete course.");
        }
    }
}
