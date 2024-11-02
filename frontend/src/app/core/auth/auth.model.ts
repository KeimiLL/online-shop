export interface User {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;

}
export interface UserForm {
    firstName: string;
    lastName: string;
    email: string;
    phone_number?: string;
}
