<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<h2 class="topics">Topics:</h2>
<div class="grid">
    <div>
        <!-- {#each articles as article} -->
        <a href="/board/3" class="article">
            <article>
                <header>SvelteKitってなに</header>
                <body>
                    <p>なかみ</p>
                    <p>なかみ2</p>
                    <p>なかみ3</p>
                </body>
                <footer>
                    <p>lastupdate:</p>
                    <p>ikioui:</p>
                </footer>
            </article>
        </a>

        <!-- {/each} -->
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
    .article p {
        color: inherit;
    }
</style>
