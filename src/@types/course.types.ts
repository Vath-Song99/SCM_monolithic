import { Types } from "mongoose";

export interface ICourse {
    name: string;
    professor_name: string;
    limit_number_of_students: number;
    start_date: Date;
    end_date: Date;
    enrolled_students: Types.ObjectId[];
}

export interface PartialICourse {
    name?: string;
    professor_name?: string;
    limit_number_of_students?: number;
    start_date?: Date;
    end_date?: Date;
    enrolled_students?: Types.ObjectId[];
}


export interface ICourseRespone extends ICourse {
    _id: Types.ObjectId;
    is_deleted: boolean;
}