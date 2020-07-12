import { Location } from "./location";

export interface Address {
    id:string;
    user:string;
    name:string;
    city:string;
    address_line1:string;
    address_line2:string;
    reference:string;
    location:Location;
    favorite:boolean;
}
