export interface IPageResponse<T> {
    size: number;
    pages: number;
    sortBy: string;
    collection: T[];
}