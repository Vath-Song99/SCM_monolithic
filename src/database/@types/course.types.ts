import { Types } from "mongoose";

export interface ICourse extends Document {
    name: string;
    professor_name: string;
    limit_number_of_students: number;
    start_date: Date;
    end_date: Date;
    enrolled_students: Types.ObjectId[];
    is_deleted: boolean;
}