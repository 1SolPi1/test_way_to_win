import { Department } from "@/types/department.enum";
import type { Person } from "../types/perosn.interface";
import { PostType } from "@/types/post.enum";
import { uuidv4 } from "@/utils/generateRandomUID";

export const persons: Person[] = [
  {
    id: uuidv4(),
    fio: "Иванов Иван Иванович",
    department: Department.CARDIOLOGY,
    isHead: true,
    post: PostType.DOCTOR,
  },
  {
    id: uuidv4(),
    fio: "Иванова Мария Ивановна",
    department: Department.CARDIOLOGY,
    post: PostType.NURSE,
  },
];
