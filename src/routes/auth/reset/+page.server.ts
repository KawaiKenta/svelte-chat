import { AuthApiError, AuthSessionMissingError } from "@supabase/supabase-js";
import { error, fail, redirect } from "@sveltejs/kit";
import { z, ZodError } from "zod";
import type { Actions, PageServerLoad } from "./$types";

const ResetPasswordSchema = z.object({
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
    resetpassword: async ({ request, locals }) => {
        // validation
        const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
        const { ...body } = formData;
        try {
            await ResetPasswordSchema.parse(formData)
        } catch (error) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                return fail(400, { body, errors });
            }
        }
        // register
        // emailから帰ってきたときにセッションを持つのだろう
        const { data, error: err } = await locals.sb.auth.updateUser({ password: body.password })
        if (err) {
            if (err) {
                if (err instanceof AuthApiError && err.status === 400) {
                    return fail(400, { body, errors: { servser: [err.message] } });
                }

                return fail(500, { body, errors: { server: [err.message] } });
            }
        }

        const { error: signoutErr } = await locals.sb.auth.signOut()
        if (signoutErr) {
            throw error(500, "Something went wrong when logging out")
        }
        throw redirect(303, "/auth/reset/success")
    }
};
