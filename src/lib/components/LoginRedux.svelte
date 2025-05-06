<!-- Login.svelte -->
<script lang="ts">
	import { pb } from '$lib/pocketbase';
	let username = $state('');
	let password = $state('');
	let isLoggedIn = $state(false);
	let errorMessage = $state('');
	let emailError = $state('');
	let passwordError = $state('');
	let email = $state('');
	let rememberMe = $state(false);
	let isLoading = $state(false);
    let isValid = $state(true);

	const login = async (event: Event) => {
		event.preventDefault();
		if (!email) {
			emailError = 'Email is required';
			isValid = false;
		} else if (!/^\S+@\S+\.\S+$/.test(email)) {
			emailError = 'Please enter a valid email address';
			isValid = false;
		}

		try {
			const authData = await pb.collection('users').authWithPassword(username, password);
			console.log('Auth data:', authData);
			if (pb.authStore.isValid) {
				console.log('Login successful:', authData);
				isLoggedIn = true;
				// Redirect or perform further actions
			} else {
				console.error('Login failed:');
			}
		} catch (error) {
			console.error('Error during login:', error);
		}
	};
	const logout = async () => {
		try {
			await pb.authStore.clear();
			isLoggedIn = false;
			console.log('Logged out successfully');
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};
	const resetPassword = async () => {
		try {
			await pb.collection('users').requestPasswordReset(email);
			alert('Password reset email sent');
		} catch (error) {
			console.error('Error sending password reset email:', error);
		}
	};

	const validateEmail = (email: string) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};
</script>

<div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
	{#if errorMessage}
		<div class="bg-red-50 text-red-700 p-4 rounded-md text-sm">
			{errorMessage}
		</div>
	{/if}

	<form class="mt-8 space-y-6" onsubmit={login}>
		<div class="rounded-md -space-y-px">
			<div class="mb-4">
				<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label
				>
				<input
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					bind:value={email}
					class="appearance-none relative block w-full px-3 py-2 border {emailError
						? 'border-red-300'
						: 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
					placeholder="Email address"
				/>
				{#if emailError}
					<p class="mt-1 text-sm text-red-600">{emailError}</p>
				{/if}
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
				<input
					id="password"
					name="password"
					type="password"
					autocomplete="current-password"
					bind:value={password}
					class="appearance-none relative block w-full px-3 py-2 border {passwordError
						? 'border-red-300'
						: 'border-gray-300'} placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
					placeholder="Password"
				/>
				{#if passwordError}
					<p class="mt-1 text-sm text-red-600">{passwordError}</p>
				{/if}
			</div>
		</div>

		<div class="flex items-center justify-between">
			<div class="flex items-center">
				<input
					id="remember-me"
					name="remember-me"
					type="checkbox"
					bind:checked={rememberMe}
					class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
				/>
				<label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
			</div>

			<div class="text-sm">
				<button
					type="button"
					onclick={resetPassword}
					class="font-medium text-indigo-600 hover:text-indigo-500"
				>
					Forgot your password?
				</button>
			</div>
		</div>

		<div>
			<button
				type="submit"
				class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
				disabled={isLoading}
			>
				{#if isLoading}
					<svg
						class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					Signing in...
				{:else}
					Sign in
				{/if}
			</button>
		</div>
	</form>
</div>
