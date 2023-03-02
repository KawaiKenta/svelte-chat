<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "./$types";
    export let form: ActionData;
</script>

<article>
    <form method="POST" action="?/register" use:enhance>
        <!-- Grid -->
        <div class="grid">
            <!-- Markup example 1: input is inside label -->
            <label for="firstName">
                First name
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    value={form?.body?.firstName ?? ""}
                />
                {#if form?.errors?.firstName}
                    <small class="error">{form?.errors?.firstName[0]}</small>
                {/if}
            </label>

            <label for="lastName">
                Last name
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last name"
                    value={form?.body?.lastName ?? ""}
                />
                {#if form?.errors?.lastName}
                    <small class="error">{form?.errors?.lastName[0]}</small>
                {/if}
            </label>
        </div>

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
        <button type="submit">Register</button>
    </form>
</article>
