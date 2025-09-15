import type { RouteObject } from "react-router-dom";
import routes from "./routes.const";
import MainLayout from "@/layouts/MainLayout";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Posts from "@/pages/Posts";
import PostDetail from "@/pages/PostDetail";
import Lesson from "@/pages/Lesson";
import Flashcards from "@/pages/Flashcards";
import Account from "@/pages/Account";
import MyPosts from "@/pages/MyPosts";
import MyFlashcards from "@/pages/MyFlashcards";
import Orders from "@/pages/Orders";
import FlashcardDetail from "@/pages/FlashcardDetail";
import CreateFlashcard from "@/pages/CreateFlashcard";
import Cart from "@/pages/Cart";
import DictationLessonDetail from "@/pages/DictationLessonDetail";
import DictationTopics from "@/pages/DictationTopics";
import DictationLessons from "@/pages/DictationLessons";
import CreatePassword from "@/pages/CreatePassword";

const PublicRoutes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      { path: routes.HOME, element: <Home /> },
      { path: routes.CREATE_PASSWORD, element: <CreatePassword /> },
      { path: routes.NOT_FOUND, element: <NotFound /> },
      { path: routes.COURSES, element: <Courses /> },
      { path: routes.COURSE_DETAIL, element: <CourseDetail /> },
      { path: routes.POSTS, element: <Posts /> },
      { path: routes.POST_DETAIL, element: <PostDetail /> },
      { path: routes.FLASHCARDS, element: <Flashcards /> },
      { path: routes.FLASHCARD_DETAIL, element: <FlashcardDetail /> },
      { path: routes.CREATE_FLASHCARD, element: <CreateFlashcard /> },
      { path: routes.EDIT_FLASHCARD, element: <CreateFlashcard /> },
      { path: routes.MY_POSTS, element: <MyPosts /> },
      { path: routes.MY_FLASHCARDS, element: <MyFlashcards /> },
      { path: routes.ORDERS, element: <Orders /> },
      { path: routes.CART, element: <Cart /> },
      { path: routes.DICTATION_TOPICS, element: <DictationTopics /> },
      {
        path: routes.DICTATION_LESSONS,
        element: <DictationLessons id="toeic-listening" />,
      },
      {
        path: routes.DICTATION_LESSON_DETAIL,
        element: <DictationLessonDetail />,
      },
    ],
  },
  {
    element: <MainLayout showFooter={false} />,
    children: [
      {
        path: routes.VIDEO_LESSON,
        element: <Lesson />,
      },
    ],
  },
];

export default PublicRoutes;
