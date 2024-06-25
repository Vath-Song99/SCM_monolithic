import { ICourse, ICourseRespone, PartialICourse } from "@scm/@types/course.types";


export interface ICourseService {
    createCourse(course: ICourse):ICourseRespone;
    getCourseById(id: string):ICourseRespone;
    updateCourseById(id: string , Course: PartialICourse):ICourseRespone;
    deleteCourseById(id: string):null;
}