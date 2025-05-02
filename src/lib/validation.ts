import { z } from "zod";

const requiredString = z.string().trim().min(1, "Обязательное поле");

export const signUpSchema = z.object({
  email: requiredString.email("Неверная почта"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_-]+$/,
    "Вы можете использовать только буквы, цифры, дефисы (-) и подчёркивания (_).",
  ),
  password: requiredString.min(8, "Должно содержать как минимум 8 символов"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: requiredString,
  mediaIds: z.array(z.string()).max(5, "Не больше 5 вложений"),
});

export const updateUserProfileSchema = z.object({
  displayName: requiredString,
  bio: z.string().max(1000, "Максимум 1000 символов"),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;
