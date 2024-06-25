import { IStudent, IStudentResponse } from "@scm/@types/student.types";


export interface IStudentController {
    createStudent(student: IStudent):Promise<IStudentResponse>;
}