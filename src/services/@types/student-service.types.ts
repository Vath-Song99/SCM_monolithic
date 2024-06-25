import { IStudent, IStudentResponse, PartialIStudent } from "@scm/@types/student.types";


export interface IStudentService {
    createStudent(student: IStudent):Promise<IStudentResponse>;
    getStudentById(id: string):Promise<IStudentResponse>;
    getAllStudents():Promise<IStudentResponse[]>;
    updateStudentById(id: string , student: PartialIStudent):Promise<IStudentResponse>;
    deleteStudentById(id: string):Promise<void>;
}