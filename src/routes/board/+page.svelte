<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<h2 class="topics">Topics:</h2>
<div class="grid">
    <div>
        {#each data.thread as thread}
            <a href="/board/{thread.id}" class="article">
                <article>
                    <header><strong>Title: {thread.title}</strong></header>
                    <body>
                        {#if thread.comments[0]}
                            <div class="comment">
                                <div class="userid">
                                    ID: {thread.comments[0].userId.substring(
                                        0,
                                        5
                                    )}
                                </div>
                                <div class="content">
                                    {thread.comments[0].content}
                                </div>
                            </div>
                        {/if}
                    </body>
                    <footer class="tags">
                        <strong>tags:</strong>
                        {#each thread.tag as tag}
                            <button class="tag secondary outline"
                                >{tag.name}</button
                            >
                        {/each}
                    </footer>
                </article>
            </a>
        {/each}
    </div>
</div>

<style>
    .topics {
        margin: 0 auto;
    }
    .article {
        text-decoration: none;
        color: inherit;
    }
    article {
        padding-bottom: 0;
    }

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
