export enum Genre {
  FICTION = "FICTION",
  NON_FICTION = "NON_FICTION",
  SCIENCE = "SCIENCE",
  HISTORY = "HISTORY",
  BIOGRAPHY = "BIOGRAPHY",
  FANTASY = "FANTASY",
}

export interface IBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  image?: string;
  publishedYear?: number | null;
  updatedAt?: Date | string;
  createdAt?: Date | string;
}

export interface IBookQueryResult {
  books: IBook[];
  totalCount: number;
}

