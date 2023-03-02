<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
</script>

<div class="grid">
    <div>
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
    </div>
    <div>
        <article>
            <header>
                <strong class="topics">爆速掲示板</strong>
            </header>
            <body>
                <strong>概要</strong>
                <p>SvelteKit と supabaseで作られた掲示板アプリ</p>

                <strong>使用技術</strong>
                <ul>
                    <li>SvelteKit</li>
                    <li>Supabase</li>
                    <li>Prisma</li>
                    <li>picocss</li>
                    <li>Zod</li>
                </ul>
            </body>
            <footer>
                <strong>利用はこちらから</strong>
                <a href="/auth/login" role="button" class="home-button">Login</a
                >
                <a
                    href="/auth/register"
                    role="button"
                    class="outline home-button">Register</a
                >
            </footer>
        </article>
    </div>
</div>

<style>
    .topics {
        margin: 0 auto;
    }
    .home-button {
        width: 100%;
        margin: 10px 0;
    }
</style>
