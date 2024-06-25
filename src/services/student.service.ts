import { IStudent, IStudentResponse, PartialIStudent } from "@scm/@types/student.types";
import { IStudentService } from "./@types/student-service.types";
import { StudentRepository } from "@scm/database/repositories/student.repository";
import { logger } from "@scm/utils/logger";
import { BaseCustomError } from "@scm/errors/base-custom-error";
import { StatusCode } from "@scm/utils/consts";
import { ApiError } from "@scm/errors/api-error";


export class StudentService implements IStudentService {
    private static instance: StudentService;
    private studentRepository: StudentRepository;
    private constructor(){
        this.studentRepository = StudentRepository.getInstance();
    };

    static getInstance():StudentService {
        if(!StudentService.instance){
            StudentService.instance = new StudentService();
        }
        return StudentService.instance;
    }

    async createStudent(student: IStudent): Promise<IStudentResponse> {
        try{
            const newStudent = await this.studentRepository.create(student);

            return newStudent;
        }catch(error: unknown){
            logger.error(`An error accurred in createStudent() `,{error})
            throw error
        }
    }

    async getStudentById(id: string): Promise<IStudentResponse> {
        try{
            const student = await this.studentRepository.findById(id);

            return student
        }catch(error: unknown){
            logger.error(`An error accurred in getStudentById() `,{error})
            throw error
        }
    }

    async getAllStudents(): Promise<IStudentResponse[]> {
        try{
            const students = await this.studentRepository.findAll();

            return students
        }catch(error: unknown){
            throw error
        }
    }

    async updateStudentById(id: string, student: PartialIStudent): Promise<IStudentResponse> {
        try{
          if(!id){
            throw new BaseCustomError("Invalid student id!", StatusCode.BadRequest)
          };
          const studentUpdated = await this.studentRepository.updateById(id, student);

          return studentUpdated
        }catch(error: unknown){
            logger.error(`An error accurred in getStudentById() `,{error});

            if(error instanceof BaseCustomError){
                throw error
            }
            throw new ApiError("Faild to update student!")
        }
    }


    async deleteStudentById(id: string):Promise<void> {
        try{
            if(!id){
                throw new BaseCustomError("Invalid student id!", StatusCode.BadRequest)
              };
            await this.studentRepository.deleteById(id);
        }catch(error: unknown){
            logger.error(`An error accurred in deleteStudentById()`, {error});
            if(error instanceof BaseCustomError){
                throw error
            }
            throw new ApiError("Faild to delete student!")
        }
    }
}