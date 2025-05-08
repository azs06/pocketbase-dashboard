<script>
	import LoginRedux from '$lib/components/LoginRedux.svelte';
	import { currentUser } from '$lib/pocketbase';
  import { goto } from '$app/navigation';

	if ($currentUser) {
		// Redirect to dashboard or home page
	}
	const onAccessDashboard = () => {
		//window.location.href = '/dashboard';
    goto('/dashboard');
	};
  console.log('Current user:', $currentUser);
</script>

<div class="space-y-6 items-center justify-center flex flex-col">
	{#if $currentUser}
		<p>You're already logged in, access dashboard</p>
		<button class="p-4 bg-blue-500 rounded-md font-semibold text-white cursor-pointer" onclick={onAccessDashboard}
			>Access Dashboard</button
		>
	{:else}
		<LoginRedux />
	{/if}
	<div class="text-center">
		<p class="text-sm text-gray-500">
			&copy; {new Date().getFullYear()} Your Company. All rights reserved.
		</p>
	</div>
</div>
