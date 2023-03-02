import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { z, ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";

const LoginSchema = z.object({
    email: z
        .string({ required_error: 'メールアドレスは必須です' })
        .email({ message: "メールアドレスの形式が異なっています" }),
    password: z
        .string({ required_error: 'パスワードは必須です' })
        .min(8, { message: "パスワードは最低8文字です" })
        .max(64, { message: "パスワードは最大64文字です" })
        .regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,64}$/i, { message: "パスワードは半角英数字混合で入力してください" }),
})


export const load: PageServerLoad = async ({ locals }) => {
    if (locals.session) {
        throw redirect(303, "/board")
    }
};

export const actions: Actions = {
    login: async ({ request, locals }) => {
        // validation
        const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
        const { ...body } = formData;
        try {
            await LoginSchema.parse(formData)
        } catch (error) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                return fail(400, { body, errors });
            }
        }
        // login with supabase
        const { data, error: err } = await locals.sb.auth.signInWithPassword({
            email: body.email,
            password: body.password,
        })
        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, { body, errors: { server: [err.message] } });
            }
            return fail(500, { body, errors: { server: [err.message] } });
        }

        throw redirect(303, "/board")
    }
};