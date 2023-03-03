import { prismaClient } from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ }) => {
    const thread = await prismaClient.thread.findMany({
        take: 5,
        orderBy: {
            id: 'desc'
        },
        include: {
            tag: true, comments: {
                take: 1
            }
        }
    })
    return { thread }
};