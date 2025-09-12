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
import ForceCreatePasswordGuard from "./ForceCreatePasswordGuard";
import DictationLessonDetail from "@/pages/DictationLessonDetail";
import DictationTopics from "@/pages/DictationTopics";
import DictationLessons from "@/pages/DictationLessons";

const PublicRoutes: RouteObject[] = [
  {
    element: <ForceCreatePasswordGuard />,
    children: [
      {
        path: routes.HOME,
        element: (
          <MainLayout>
            <Home />
          </MainLayout>
        ),
      },
      {
        path: routes.NOT_FOUND,
        element: (
          <MainLayout>
            <NotFound />
          </MainLayout>
        ),
      },
      {
        path: routes.COURSES,
        element: (
          <MainLayout>
            <Courses />
          </MainLayout>
        ),
      },
      {
        path: routes.COURSE_DETAIL,
        element: (
          <MainLayout>
            <CourseDetail />
          </MainLayout>
        ),
      },
      {
        path: routes.POSTS,
        element: (
          <MainLayout>
            <Posts />
          </MainLayout>
        ),
      },
      {
        path: routes.POST_DETAIL,
        element: (
          <MainLayout>
            <PostDetail />
          </MainLayout>
        ),
      },
      {
        path: routes.VIDEO_LESSON,
        element: (
          <MainLayout showFooter={false}>
            <Lesson />
          </MainLayout>
        ),
      },
      {
        path: routes.FLASHCARDS,
        element: (
          <MainLayout>
            <Flashcards />
          </MainLayout>
        ),
      },
      {
        path: routes.FLASHCARD_DETAIL,
        element: (
          <MainLayout>
            <FlashcardDetail />
          </MainLayout>
        ),
      },
      {
        path: routes.CREATE_FLASHCARD,
        element: (
          <MainLayout>
            <CreateFlashcard />
          </MainLayout>
        ),
      },
      {
        path: routes.EDIT_FLASHCARD,
        element: (
          <MainLayout>
            <CreateFlashcard />{" "}
            {/* Reusing CreateFlashcard for edit, will need to pass data */}
          </MainLayout>
        ),
      },
      {
        path: routes.ACCOUNT,
        element: (
          <MainLayout>
            <Account />
          </MainLayout>
        ),
      },
      {
        path: routes.MY_POSTS,
        element: (
          <MainLayout>
            <MyPosts />
          </MainLayout>
        ),
      },
      {
        path: routes.MY_FLASHCARDS,
        element: (
          <MainLayout>
            <MyFlashcards />
          </MainLayout>
        ),
      },
      {
        path: routes.ORDERS,
        element: (
          <MainLayout>
            <Orders />
          </MainLayout>
        ),
      },
      {
        path: routes.CART,
        element: (
          <MainLayout>
            <Cart />
          </MainLayout>
        ),
      },
      {
        path: routes.DICTATION_TOPICS, // Route for the list of dictation lessons
        element: (
          <MainLayout>
            <DictationTopics />
          </MainLayout>
        ),
      },
      {
        path: routes.DICTATION_LESSONS, // Route for the list of dictation lessons
        element: (
          <MainLayout>
            <DictationLessons id="toeic-listening" />
          </MainLayout>
        ),
      },
      {
        path: routes.DICTATION_LESSON_DETAIL, // Route for a specific dictation lesson
        element: (
          <MainLayout>
            <DictationLessonDetail />
          </MainLayout>
        ),
      },
    ],
  },
];

export default PublicRoutes;
