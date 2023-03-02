<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    export let form: ActionData;
</script>

<article>
    <form method="POST" action="?/login" use:enhance>
        <!-- Markup example 2: input is after label -->
        <label for="email"
            >Email address
            <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                value={form?.body?.email ?? ""}
            />
            {#if form?.errors?.email}
                <small class="error">{form?.errors?.email[0]}</small>
            {/if}
        </label>

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
        {#if form?.errors?.server}
            <div class="server-error">
                <small class="error">{form?.errors?.server[0]}</small>
            </div>
        {/if}

        <!-- Button -->
        <button type="submit">Login</button>
        <small><a href="/auth/forget">パスワードを忘れましたか？</a></small>
    </form>
</article>
