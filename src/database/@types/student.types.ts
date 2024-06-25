import { IStudent, IStudentResponse, PartialIStudent } from "@scm/@types/student.types";

export interface IStudentSchema extends Document {
    full_name_en: string;
    full_name_km: string;
    date_of_birth: Date;
    gender: 'male' | 'female' | 'other';
    phone_number: string;
    is_deleted: boolean;
    create_at: Date
}


export interface IStudentRepository {
    create(student: IStudent): Promise<IStudentResponse>;
    findById(id: string): Promise<IStudentResponse>;
    findAll(): Promise<IStudentResponse[]>;
    updateById(id: string, updateStudent: PartialIStudent): Promise<IStudentResponse>;
    deleteById(id: string): Promise<void>; // Or you can return a success message or status if needed
}
