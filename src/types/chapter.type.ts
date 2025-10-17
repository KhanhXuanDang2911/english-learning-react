import type { SuccessResponse } from "./common.type";

export interface ChapterRequest {
  title: string;
  description: string;
  status: "PUBLIC" | "HIDDEN";
  courseId?: number;
}

export interface Chapter {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  status: "PUBLIC" | "HIDDEN";
  orderIndex: number;
  numberOfLessons?: number;
  duration?: number;
  courseId?: number;
}

export interface Order {
  id: number;
  orderIndex: number;
}

export type ChangeOrderRequest = Order[];

export type ChapterResponse = SuccessResponse<Chapter>;
