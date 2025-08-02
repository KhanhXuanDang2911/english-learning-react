import type { RouteObject } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/Admin/Dashboard";
import routes from "./routes.const";
import UsersManagement from "@/pages/Admin/UsersManagement";
import CoursesManagement, {
  CreateCourse,
} from "@/pages/Admin/CoursesManagement";
import PostsManagement, {
  AdminCreatePost,
} from "@/pages/Admin/PostsManagement";
import CategoriesManagement from "@/pages/Admin/CategoryManagement";
import FlashcardsManagement from "@/pages/Admin/FlashcardsManagement";
import DictationLessonsManagement from "@/pages/Admin/DictationLessonsManagement";
import OrdersManagement from "@/pages/Admin/OrdersManagement";
import CouponsManagement from "@/pages/Admin/CouponsManagement";
import CommentsManagement from "@/pages/Admin/CommentsManagement";
import ChaptersManagement from "@/pages/Admin/ChaptersManagement";
import LessonsManagement from "@/pages/Admin/LessonsManagement";

const AdminRoutes: RouteObject[] = [
  {
    path: routes.ADMIN_DASHBOARD,
    element: (
      <AdminLayout>
        <Dashboard />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_USERS_MANAGEMENT,
    element: (
      <AdminLayout>
        <UsersManagement />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_COURSES_MANAGEMENT,
    element: (
      <AdminLayout>
        <CoursesManagement />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_CREATE_COURSES_MANAGEMENT,
    element: (
      <AdminLayout>
        <CreateCourse />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_UPDATE_COURSES_MANAGEMENT,
    element: (
      <AdminLayout>
        <CreateCourse />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_CHAPTERS_BY_COURSE,
    element: (
      <AdminLayout>
        <ChaptersManagement />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_CHAPTERS_MANAGEMENT,
    element: (
      <AdminLayout>
        <ChaptersManagement />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_LESSONS_BY_CHAPTER,
    element: (
      <AdminLayout>
        <LessonsManagement />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_POSTS_MANAGEMENT,
    element: (
      <AdminLayout>
        <PostsManagement />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_CREATE_POST_MANAGEMENT,
    element: (
      <AdminLayout>
        <AdminCreatePost />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_UPDATE_POST_MANAGEMENT,
    element: (
      <AdminLayout>
        <AdminCreatePost />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_CATEGORIES_MANAGEMENT,
    element: (
      <AdminLayout>
        <CategoriesManagement />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_FLASHCARDS_MANAGEMENT,
    element: (
      <AdminLayout>
        <FlashcardsManagement />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_DICTATION_LESSONS_MANAGEMENT,
    element: (
      <AdminLayout>
        <DictationLessonsManagement />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_ORDERS_MANAGEMENT,
    element: (
      <AdminLayout>
        <OrdersManagement />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_COUPONS_MANAGEMENT,
    element: (
      <AdminLayout>
        <CouponsManagement />
      </AdminLayout>
    ),
  },
  {
    path: routes.ADMIN_COMMENTS_MANAGEMENT,
    element: (
      <AdminLayout>
        <CommentsManagement />
      </AdminLayout>
    ),
  },
];

export default AdminRoutes;
