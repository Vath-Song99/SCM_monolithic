import { ICourse, ICourseResponse, PartialICourse } from "@scm/@types/course.types";


export interface ICourseService {
    createCourse(course: ICourse):Promise<ICourseResponse>;
    getCourseById(id: string):Promise<ICourseResponse>;
    updateCourseById(id: string , course: PartialICourse):Promise<ICourseResponse>;
    getAllCourses():Promise<ICourseResponse[]>
    deleteCourseById(id: string):Promise<void>;
}