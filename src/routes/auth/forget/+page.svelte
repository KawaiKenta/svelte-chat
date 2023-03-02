<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";

    export let form: ActionData;
</script>

<article>
    <form method="POST" action="?/forgetpassword" use:enhance>
        <!-- Markup example 2: input is after label -->
        <label for="email"
            >Email address
            <input
                id="email"
                name="email"
                placeholder="Email address"
                value={form?.body?.email ?? ""}
            />
            {#if form?.errors?.email}
                <small class="error">{form?.errors?.email[0]}</small>
            {/if}
        </label>

        {#if form?.errors?.server}
            <div class="server-error">
                <small class="error">{form?.errors?.server[0]}</small>
            </div>
        {/if}

        <!-- Button -->
        <button type="submit">Send reset password email</button>
    </form>
</article>
