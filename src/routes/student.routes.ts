import { NextFunction, Router , Request , Response } from "express";
import { ApiRoutes } from ".";
import { StudentController } from "@scm/controllers/student.controller";
import { StatusCode } from "@scm/utils/consts";
import { zodValidator } from "@scm/middlewares/zod-validator";
import { StudentSchema } from "@scm/schemas/student.schemas";


const router:Router = Router();

router.post(ApiRoutes.CREATE_STUDENT, zodValidator(StudentSchema),  async (req: Request, res: Response, _next: NextFunction) =>{
    try{
        const studnetService = StudentController.getInstance();
        const newStudent = await studnetService.createStudent(req.body);

        res.status(StatusCode.Created).json({
            message: "Success create new student",
            data:  newStudent
        })
    }catch(error: unknown){
        _next(error)
    }
});



export default router;