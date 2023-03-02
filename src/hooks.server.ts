import "$lib/supabase"
import { getSupabase } from "@supabase/auth-helpers-sveltekit"
import { redirect, type Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
    const { supabaseClient, session } = await getSupabase(event)
    event.locals.sb = supabaseClient
    event.locals.session = session
    // login
    if (session && event.url.pathname === "/") {
        throw redirect(303, "/board")
    }
    // not login
    if (!session && event.url.pathname.startsWith("/board")) {
        throw redirect(303, "/auth/login")
    }

    return resolve(event)
}