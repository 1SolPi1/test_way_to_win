import type { Department } from "./department.enum";
import type { PostType } from "./post.enum";

export interface Person {
  id: string;
  fio: string;
  department: Department;
  isHead?: boolean;
  post: PostType;
}
