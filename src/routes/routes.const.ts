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

  // Admin page
  ADMIN_DASHBOARD: "/admin",

  ADMIN_USERS_MANAGEMENT: "/admin/users",

  ADMIN_POSTS_MANAGEMENT: "/admin/posts",
  ADMIN_CREATE_POST_MANAGEMENT: "/admin/posts/create",
  ADMIN_UPDATE_POST_MANAGEMENT: "/admin/posts/edit/:id",

  ADMIN_COURSES_MANAGEMENT: "/admin/courses",
  ADMIN_CREATE_COURSES_MANAGEMENT: "/admin/courses/create",
  ADMIN_UPDATE_COURSES_MANAGEMENT: "/admin/courses/edit/:id",
  ADMIN_CHAPTERS_BY_COURSE: "/admin/courses/:courseId/chapters",

  ADMIN_CHAPTERS_MANAGEMENT: "/admin/chapters",
  ADMIN_LESSONS_BY_CHAPTER: "/admin/chapters/:chapterId/lessons",

  ADMIN_FLASHCARDS_MANAGEMENT: "/admin/flashcards",

  ADMIN_DICTATION_LESSONS_MANAGEMENT: "/admin/dictation-lessons",

  ADMIN_COUPONS_MANAGEMENT: "/admin/coupons",

  ADMIN_COMMENTS_MANAGEMENT: "/admin/comments",

  ADMIN_ORDERS_MANAGEMENT: "admin/orders",

  ADMIN_CATEGORIES_MANAGEMENT: "admin/categories",
};
export default routes;
