import { Brand } from './brand';
import { Category } from './category';
import { Description } from './description';
 
export interface Product {
    id:string;
    name:string;
    category:Category;
    brand:Brand;
    picture:String;
    barcode:String;
    description:Description;
    tags:Array<string>;
}