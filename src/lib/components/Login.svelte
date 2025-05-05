<script lang="ts">
	import { pb } from '$lib/pocketbase';
	let username = $state('');
	let password = $state('');
	let isLoggedIn = $state(false);

	const login = async (event: Event) => {
		console.log('Login function called');
		console.log('Username:', username);
		console.log('Password:', password);
		event.preventDefault();
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
</script>

<main class="flex h-full flex-col items-center justify-center bg-gray-100 pt-10">
	<div class="login" class:logged-in={isLoggedIn} style="display: {isLoggedIn ? 'none' : 'block'};">
		<h1>Login</h1>
		<form>
			<label for="username">Username:</label>
			<input bind:value={username} type="text" id="username" name="username" required />

			<label for="password">Password:</label>
			<input bind:value={password} type="password" id="password" name="password" required />

			<button onclick={login} type="submit">Login</button>
		</form>
	</div>
    {#if isLoggedIn}
        <p>Welcome back, {username}!</p>
        <button onclick={logout}>Logout</button>
    {:else}
        <p>Please log in to continue.</p>
    {/if}
</main>

<style>
	.login {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	label {
		margin-bottom: 0.5rem;
	}

	input {
		margin-bottom: 1rem;
		padding: 0.5rem;
		width: 200px;
	}

	button {
		padding: 0.5rem;
		width: 100px;
	}
</style>
