
import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { z, ZodError } from "zod";


const SignupSchema = z.object({
    firstName: z
        .string({ required_error: '名前は必須です' })
        .min(1, { message: "名前は必須です" })
        .max(64, { message: "名前は64文字以下でなければいけません" })
        .trim(),
    lastName: z
        .string({ required_error: '氏名は必須です' })
        .min(1, { message: "氏名は必須です" })
        .max(64, { message: "氏名は64文字以下でなければいけません" })
        .trim(),
    email: z
        .string({ required_error: 'メールアドレスは必須です' })
        .email({ message: "メールアドレスの形式が異なっています" }),
    password: z
        .string({ required_error: 'パスワードは必須です' })
        .min(8, { message: "パスワードは最低8文字です" })
        .max(64, { message: "パスワードは最大64文字です" })
        .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,64}$/i, { message: "パスワードは半角英数字混合で入力してください" }),
    passwordConfirm: z.string()
}).refine((data => data.password === data.passwordConfirm), {
    message: "パスワードが確認用パスワードと一致しません",
    path: ["passwordConfirm"],
})

export const actions: Actions = {
    register: async ({ request, locals }) => {
        // validation
        const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
        const { ...body } = formData;
        try {
            await SignupSchema.parse(formData)
        } catch (error) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                return fail(400, { body, errors });
            }
        }
        // register
        const { data, error: err } = await locals.sb.auth.signUp({
            email: body.email,
            password: body.password,
            options: {
                data: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                }
            }
        })
        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, { body, errors: { server: [err.message] } });
            }
            return fail(500, { body, errors: { server: [err.message] } });
        }

        throw redirect(303, "/auth/register/success")
    }
} 