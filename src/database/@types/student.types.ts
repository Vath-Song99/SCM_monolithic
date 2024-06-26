import { IQueryParams } from "@scm/@types/queryParams";
import {  IStudent, IStudentResponse, PartialIStudent } from "@scm/@types/student.types";
import { FilterQuery } from "mongoose";

export interface IStudentSchema extends Document {
    full_name_en: string;
    full_name_km: string;
    date_of_birth: Date;
    gender: 'male' | 'female' | 'other';
    phone_number: string;
    is_deleted: boolean;
    create_at: Date
}

export type StudentQuery = {
    $or: {
        full_name_en?: RegExp;
        full_name_km?: RegExp;
        phone_number?: RegExp;
    }[];
};


export interface IStudentRepository {
    create(student: IStudent): Promise<IStudentResponse>;
    findById(id: string): Promise<IStudentResponse>;
    findAll(): Promise<IStudentResponse[]>;
    updateById(id: string, updateStudent: PartialIStudent): Promise<IStudentResponse>;
    deleteById(id: string): Promise<void>; // Or you can return a success message or status if needed
    findOneByQuery(queries : IQueryParams):Promise<IStudent | null>
    searchStudentsByQuery(queries: FilterQuery<StudentQuery>):Promise<IStudentResponse[]>;
}
