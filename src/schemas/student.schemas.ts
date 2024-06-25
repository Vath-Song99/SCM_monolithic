import { z } from 'zod';

const StudentSchema = z.object({
    full_name_en: z.string().min(1).max(255),  
    full_name_km: z.string().min(1).max(255),  
    date_of_birth: z.string(),                  
    gender: z.enum(['male', 'female', 'other']), 
    phone_number: z.string().min(1).max(20),   
});

export {StudentSchema}