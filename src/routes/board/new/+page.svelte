<script lang="ts">
    import type { ActionData, PageServerData } from "./$types";
    import { enhance } from "$app/forms";

    export let data: PageServerData;
    export let form: ActionData;
    const { tags } = data;
    let selection: any = [];
</script>

<article>
    <form method="POST" action="?/create" use:enhance>
        <label for="title"
            >Thread title
            <input type="title" id="title" name="title" placeholder="Title" />
        </label>

        <div>Tags</div>
        {#each tags as tag}
            <label class="tags">
                <input
                    type="checkbox"
                    bind:group={selection}
                    name="tags"
                    value={tag.name}
                />
                {tag.name}
            </label>
        {/each}

        {#if form?.errors?.server}
            <div class="server-error">
                <small class="error">{form?.errors?.server[0]}</small>
            </div>
        {/if}

        <!-- Button -->
        <button type="submit" class="create">Create new Thread!</button>
    </form>
</article>

<style>
    .tags {
        display: inline-block;
        margin-right: 12px;
    }
    .tags input {
        margin-right: 0px;
    }
    .create {
        margin-top: 20px;
    }
</style>
