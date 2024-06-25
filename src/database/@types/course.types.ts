import { Types } from "mongoose";
import { ICourse, ICourseRespone, PartialICourse } from "@scm/@types/course.types";

export interface ICourseSchema extends Document {
    name: string;
    professor_name: string;
    limit_number_of_students: number;
    start_date: Date;
    end_date: Date;
    enrolled_students: Types.ObjectId[];
    is_deleted: boolean;
}


export interface ICourseRepository {
    create(course: ICourse): Promise<ICourseRespone>;
    findById(id: string): Promise<ICourseRespone>;
    findAll(): Promise<ICourseRespone[]>;
    updateById(id: string, updateCourse: PartialICourse): Promise<ICourseRespone>;
    deleteById(id: string): Promise<null>; // Or you can return a success message or status if needed
}
