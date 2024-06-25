import { ICourseService } from "./@types/course-service.types";

export class CourseService implements ICourseService {
    private static instance: CourseService;
    private constructor(){};

    static getInstance():CourseService {
        if(!CourseService.instance){
            CourseService.instance = new CourseService();
        }
        return CourseService.instance;
    }
}