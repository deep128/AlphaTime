import { User } from "./User";

export class Class {
    id:number;
    name:string;
    level:number;
    classTeacher: {
        name:string;
        username:string;
    }
    schoolid:number;
}