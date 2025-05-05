<script lang="ts">
  import { onMount } from 'svelte';
  import Login from '$lib/components/Login.svelte';

  onMount(() => {
    console.log('Page loaded');
  });

</script>

<Login></Login>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
