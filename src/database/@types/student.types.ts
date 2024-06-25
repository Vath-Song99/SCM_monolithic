import { IStudent, IStudentRespone, PartialIStudent } from "@scm/@types/student.types";

export interface IStudentSchema extends Document {
    full_name_en: string;
    full_name_km: string;
    date_of_birth: Date;
    gender: 'male' | 'female' | 'other';
    phone_number: string;
    is_deleted: boolean;
}


export interface IStudentRepository {
    create(student: IStudent): Promise<IStudentRespone>;
    findById(id: string): Promise<IStudentRespone>;
    findAll(): Promise<IStudentRespone[]>;
    updateById(id: string, updateStudent: PartialIStudent): Promise<IStudentRespone>;
    deleteById(id: string): Promise<null>; // Or you can return a success message or status if needed
}
