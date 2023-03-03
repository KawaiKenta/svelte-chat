import type { Actions, PageServerLoad } from "./$types";
import { prismaClient } from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";
export const load: PageServerLoad = async () => {
    const tags = await prismaClient.tag.findMany()
    return { tags }
};

export const actions: Actions = {
    create: async ({ request, locals }) => {
        const values = await request.formData();
        const title = values.get("title") as string
        const tag: any[] = []
        values.getAll("tags").forEach((tagName) => {
            tag.push({ "name": tagName })
        })
        const authorId = locals.session?.user.id || ''

        let id = 0
        try {
            const thread = await prismaClient.thread.create({
                data: {
                    title: title,
                    tag: { connect: tag },
                    comments: {},
                    authorId: authorId,
                }
            })
            id = thread.id
        } catch (error) {
            return fail(400, { values, errors: { server: [error] } })
        }
        throw redirect(303, `/board/${id}`)
    }
};