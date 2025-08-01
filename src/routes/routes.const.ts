const routes = {
  HOME: "/",
  LOGIN: "/login",
  Register: "/register",
  NOT_FOUND: "*",
  PROFILE: "/profile",
  COURSES: "/courses",
  COURSE_DETAIL: "/courses/:slug",
  POSTS: "/posts",
  POST_DETAIL: "/posts/:slug",
  VIDEO_LESSON: "/courses/:courseId/lessons/:lessonId",
  FLASHCARDS: "/flashcards",
  FLASHCARD_DETAIL: "/flashcards/:id",
  CREATE_FLASHCARD: "/flashcards/create",
  EDIT_FLASHCARD: "/flashcards/:id/edit",
  CART: "/cart",
  ACCOUNT: "/account",
  MY_POSTS: "/my-posts",
  MY_FLASHCARDS: "/my-flashcards",
  ORDERS: "/orders",
  DICTATION_LESSONS: "/dictation", // New route for dictation lessons list
  DICTATION_DETAIL: "/dictation/:id", // Updated route for dictation detail page
};
export default routes;
