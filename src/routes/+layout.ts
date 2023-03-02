import type { LayoutLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

export const load: LayoutLoad = async (event) => {
    const { session } = await getSupabase(event)
    const userName =
        session?.user.user_metadata.firstName + " "
        + session?.user.user_metadata.lastName;
    return { session, userName }
}