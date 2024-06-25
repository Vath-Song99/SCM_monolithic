import { StudentService } from "@scm/services/student.service";
import { IStudentController } from "./@types/student.types";
import { IStudent, IStudentResponse } from "@scm/@types/student.types";


export class StudentController implements IStudentController{
    private static instance: StudentController;
    private studentService: StudentService;
    private constructor(){
        this.studentService = StudentService.getInstance()
    };

    static getInstance():StudentController{
        if(!StudentController.instance){
            StudentController.instance = new StudentController()
        }
        return StudentController.instance;
    }

    async createStudent(student: IStudent): Promise<IStudentResponse> {
        try{
            const newStudent = await this.studentService.createStudent(student);

            return newStudent;
        }catch(error: unknown){
            throw error
        }
    }
}