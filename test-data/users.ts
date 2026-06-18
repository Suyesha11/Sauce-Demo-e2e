import { User } from "../types";

export const users: Record<string, User> = {
  standard_user: {
    username: process.env.STANDARD_USER ?? "",
    password: process.env.PASSWORD ?? "",
    isLocked: false,
    description: "A standard user account",
  },
  locked_out_user: {
    username: process.env.LOCKED_OUT_USER ?? "",
    password: process.env.PASSWORD ?? "",
    isLocked: true,
    description: "A locked out user account",
  },
  problem_user: {
    username: process.env.PROBLEM_USER ?? "",
    password: process.env.PASSWORD ?? "",
    isLocked: false,
    description: "A problem user account",
  },
  performance_glitch_user: {
    username: process.env.PERFORMANCE_GLITCH_USER ?? "",
    password: process.env.PASSWORD ?? "",
    isLocked: false,
    description: "A performance glitch user account",
  },
  error_user: {
    username: process.env.ERROR_USER ?? "",
    password: process.env.PASSWORD ?? "",
    isLocked: false,
    description: "A error user account",
  },
  visual_user: {
    username: process.env.VISUAL_USER ?? "",
    password: process.env.PASSWORD ?? "",
    isLocked: false,
    description: "A visual user account",
  },
  invalid_user: {
    username: process.env.INVALID_USER ?? "",
    password: process.env.PASSWORD ?? "",
    isLocked: false,
    description: "An invalid user account",
  },
};
