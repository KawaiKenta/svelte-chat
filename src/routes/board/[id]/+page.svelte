<script lang="ts">
    import type { ActionData, PageServerData } from "./$types";
    import { enhance } from "$app/forms";
    import back from "$lib/back.svg";
    export let data: PageServerData;
    export let form: ActionData;
</script>

<a href="/board/">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevrons-left"
        ><polyline points="11 17 6 12 11 7" /><polyline
            points="18 17 13 12 18 7"
        /></svg
    >back to board
</a>
<article>
    <header>
        <h3 class="title">Title: {data.title}</h3>
        <p class="tags">
            <strong>tags:</strong>
            {#each data.tags as tag}
                <button class="tag secondary outline">{tag.name}</button>
            {/each}
        </p>
    </header>
    <body>
        {#each data.comments as comment}
            <div class="comment">
                <div class="userid">
                    ID: {comment.userId.substring(0, 5)}
                </div>
                <div class="content">{comment.content}</div>
            </div>
        {/each}
    </body>
    <footer>
        <strong>Comment</strong>
        <form method="POST" action="?/post">
            <textarea name="content" id="" value={form?.content ?? ""} />
            <button type="submit">Post Comment!</button>
            {#if form?.error}
                <div class="server-error">
                    <small class="error">{form?.error}</small>
                </div>
            {/if}
        </form>
    </footer>
</article>

<style>
    .tags {
        display: flex;
        margin-bottom: 0;
        align-items: center;
    }
    .tag {
        width: auto;
        margin-right: 2px;
        padding: 5px;
        margin-top: auto;
        margin-bottom: auto;
    }
    .tags strong {
        margin-right: 20px;
    }
    .comment {
        display: flex;
        margin-bottom: 10px;
    }
    .userid {
        margin-right: 20px;
    }
</style>
