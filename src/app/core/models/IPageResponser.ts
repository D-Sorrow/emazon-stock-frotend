import { ICategory } from "./ICategory";

export interface ICategoryResponse {
    size: number;
    pages: number;
    sortBy: string;
    collection: ICategory[]; // El array de categorías
}