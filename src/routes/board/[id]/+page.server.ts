import { prismaClient } from "$lib/prisma";
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";


export const load: PageServerLoad = async ({ params }) => {
    const thread = await prismaClient.thread.findUnique({
        where: { id: Number(params.id) },
        include: { tag: true, comments: true },
    });
    if (!thread) {
        throw error(500, "Thread doesn't exist")
    }
    return {
        title: thread?.title,
        tags: thread?.tag || [],
        comments: thread?.comments || [],
    }
};

export const actions: Actions = {
    post: async ({ request, locals, params }) => {
        const formData = await request.formData();

        const threadId = Number(params.id)
        const userId = locals.session?.user.id || ''
        const content = formData.get("content") as string
        try {
            await prismaClient.thread.update({
                where: { id: threadId },
                data: {
                    comments: {
                        create: {
                            content: content, userId: userId,
                        }
                    }
                }
            })
        } catch (error) {
            return fail(400, { content: content, error: "Something went wrong" })
        }
        throw redirect(302, '')
    }
};