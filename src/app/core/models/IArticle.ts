export interface IArticle{
    idArticle?: number;
    nameArticle: string;
    descriptionArticle: String;
    stock?: number;
    price?: number;
    categories: number[];
    brand?: number;
}