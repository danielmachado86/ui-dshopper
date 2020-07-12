import { Address } from "./address";

export interface User {
    id:string;
    name:string;
    email:string;
    mobile:string;
    addresses:Array<Address>;

}