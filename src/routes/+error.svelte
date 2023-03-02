<script>
    import { page } from "$app/stores";
</script>

<article>{$page.error?.message}</article>
