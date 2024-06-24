
import { model, Schema } from "mongoose";
import { ICourse } from "../@types/course.types";

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    professor_name: {
        type: String,
        required: true
    },
    limit_number_of_students: {
        type: Number,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    enrolled_students: [{
        type: Schema.Types.ObjectId,
        ref: 'Students' // Referencing the Students model
    }],
    is_deleted: {
        type: Boolean,
        default: false
    }
});

// Indexes
CourseSchema.index({ name: 1 }); // Index on name for efficient course lookup
CourseSchema.index({ start_date: 1, end_date: 1 }); // Index on start_date and end_date for date-based queries

export const courseModel = model<ICourse>("Courses", CourseSchema);
