import { Types } from "mongoose";
import { ICourse, ICourseResponse, PartialICourse } from "@scm/@types/course.types";

export interface ICourseSchema extends Document {
    name: string;
    professor_name: string;
    limit_number_of_students: number;
    start_date: Date;
    end_date: Date;
    enrolled_students: Types.ObjectId[];
    is_deleted: boolean;
    create_at: Date
}

export type CourseQuery = {
    $or: {
        name?: RegExp;
        start_date?: RegExp;
        end_date?: RegExp;
    }[];
};


export interface ICourseRepository {
    create(course: ICourse): Promise<ICourseResponse>;
    findById(id: string): Promise<ICourseResponse>;
    findAll(): Promise<ICourseResponse[]>;
    updateById(id: string, updateCourse: PartialICourse): Promise<ICourseResponse>;
    deleteById(id: string): Promise<void>; // Or you can return a success message or status if needed
}
