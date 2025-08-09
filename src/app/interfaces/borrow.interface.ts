import { Types } from 'mongoose';

export interface IBorrow {
  book: Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface IBorrowSummary {
  book: IBorrow;
  totalQuantity: number;
}

export interface IBorrowSummaryResult {
  summary: IBorrow[];
  totalCount: number;
}