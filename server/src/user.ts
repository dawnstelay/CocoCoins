import * as mongodb from "mongodb";

export interface User {
    name: string;
    username: string;
    password: string;
    id?: mongodb.ObjectId;
}