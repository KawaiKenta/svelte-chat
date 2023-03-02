import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import { z, ZodError } from "zod";
import type { Actions } from "./$types";

const ForgetPasswordSchema = z.object({
    email: z
        .string({ required_error: 'メールアドレスは必須です' })
        .email({ message: "メールアドレスの形式が異なっています" }),
})


export const actions: Actions = {
    forgetpassword: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData()) as Record<string, string>;
        const { ...body } = formData;
        try {
            await ForgetPasswordSchema.parse(formData)
        } catch (error) {
            if (error instanceof ZodError) {
                const { fieldErrors: errors } = error.flatten();
                return fail(400, { body, errors });
            }
        }
        // send reset email
        // how to error handling?
        const { data, error: err } = await locals.sb.auth.resetPasswordForEmail(body.email,
            {
                redirectTo: "http://localhost:5173/auth/reset"
            })
        if (err) {
            if (err instanceof AuthApiError && err.status === 400) {
                return fail(400, { body, errors: { server: [err.message] } });
            }
            return fail(500, { body, errors: { server: [err.message] } });
        }

        throw redirect(303, "/auth/forget/success")
    }
};