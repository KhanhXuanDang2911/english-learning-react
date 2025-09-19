import type { SuccessResponse } from "./common.type";

export interface Category {
  id: number;
  title: string;
  slug: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryCourseRequest {
  title: string;
  description?: string;
}

export type CategoryCourseResponse = SuccessResponse<Category>;
