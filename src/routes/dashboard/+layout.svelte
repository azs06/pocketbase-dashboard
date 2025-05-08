<script>
	import '../../app.css';
	let { children } = $props();
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="flex h-screen bg-gray-100">
	<!-- Sidebar -->
	<Sidebar></Sidebar>

	<!-- Main content -->
	<div class="flex-1 overflow-auto">
		<!-- Top navigation -->
		<Header></Header>

		<!-- Page content -->
		<main class="p-6">
			{@render children()}
		</main>
	</div>
</div>
