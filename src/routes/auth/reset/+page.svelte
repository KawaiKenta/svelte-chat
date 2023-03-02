<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    export let form: ActionData;
</script>

<article>
    <form method="POST" action="?/resetpassword" use:enhance>
        <label for="password"
            >Password
            <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={form?.body?.password ?? ""}
            />
            {#if form?.errors?.password}
                <small class="error">{form?.errors?.password[0]}</small>
            {/if}
        </label>
        <label for="passwordConfirm"
            >Password (Confirm)
            <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Password Confirm"
                value={form?.body?.passwordConfirm ?? ""}
            />
            {#if form?.errors?.passwordConfirm}
                <small class="error">{form?.errors?.passwordConfirm[0]}</small>
            {/if}
        </label>

        {#if form?.errors?.server}
            <div class="server-error">
                <small class="error">{form?.errors?.server[0]}</small>
            </div>
        {/if}

        <!-- Button -->
        <button type="submit">Reset Password</button>
    </form>
</article>
