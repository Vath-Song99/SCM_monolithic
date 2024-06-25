import { PartialICourse } from "@scm/@types/course.types";
import { IStudent, IStudentRespone } from "@scm/@types/student.types";


export interface IStudentService {
    createStudent(student: IStudent):IStudentRespone;
    getStudentById(id: string):IStudentRespone;
    updateStudentById(id: string , student: PartialICourse):IStudentRespone;
    deleteStudentById(id: string):null;
}