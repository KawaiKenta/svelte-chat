<script lang="ts">
	import "@picocss/pico";
	import "$lib/app.css";
	import { onMount } from "svelte";
	import { supabaseClient } from "$lib/supabase";
	import { invalidateAll } from "$app/navigation";
	import type { LayoutData } from "./$types";
	export let data: LayoutData;

	onMount(() => {
		const {
			data: { subscription },
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidateAll();
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="container">
	<nav>
		<ul>
			<h2 class="title"><a href="/">SvelteKit Bulletin Board</a></h2>
		</ul>
		<ul>
			{#if data.session}
				<li>
					<strong class="name">welcome! {data.userName}</strong>
				</li>
				<li>
					<a href="/board/new" role="button" class="outline"
						>Create New Thread</a
					>
				</li>
				<li>
					<form method="POST">
						<button
							formaction="/auth/logout"
							type="submit"
							role="button">Logout</button
						>
					</form>
				</li>
			{:else}
				<li>
					<a href="/auth/login" role="button" class="home-button"
						>Login</a
					>
				</li>
				<li>
					<a
						href="/auth/register"
						role="button"
						class="outline home-button">Register</a
					>
				</li>
			{/if}
		</ul>
	</nav>

	<slot />
</div>

<style>
	.title {
		margin: 10px auto;
	}

	li form {
		margin-bottom: 0;
	}
	.name {
		margin: 0 auto;
	}
</style>
