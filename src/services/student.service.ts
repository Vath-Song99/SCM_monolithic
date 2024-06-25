import { IStudentService } from "./@types/student-service.types";


export class StudentService implements IStudentService {
    private static instance: StudentService;
    private constructor(){};

    static getInstance():StudentService {
        if(!StudentService.instance){
            StudentService.instance = new StudentService();
        }
        return StudentService.instance;
    }
}