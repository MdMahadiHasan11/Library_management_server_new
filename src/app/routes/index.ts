import express from "express";
import { bookRoutes } from "./book.routes";
import { borrowRoutes } from "./borrow.routes";

const router = express.Router();

const routes = [
  {
    path: "/books",
    route: bookRoutes,
  },
  {
    path: "/borrow",
    route: borrowRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
