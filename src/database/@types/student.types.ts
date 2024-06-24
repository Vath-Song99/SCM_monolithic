export interface IStudent extends Document {
    full_name_en: string;
    full_name_km: string;
    date_of_birth: Date;
    gender: 'male' | 'female' | 'other';
    phone_number: string;
    is_deleted: boolean;
}