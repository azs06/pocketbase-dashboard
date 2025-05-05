<script lang="ts">
	import { pb } from '$lib/pocketbase';
	let username = $state('');
	let password = $state('');

	const login = async (event: Event) => {
        console.log('Login function called');
		event.preventDefault();
		try {
			const authData = await pb.collection('users').authWithPassword(username, password);

			if (authData.isValid) {
				console.log('Login successful:', authData);
				// Redirect or perform further actions
			} else {
				console.error('Login failed:');
			}
		} catch (error) {
			console.error('Error during login:', error);
		}
	};
</script>

<div class="login">
	<h1>Login</h1>
	<form>
		<label for="username">Username:</label>
		<input bind:value={username} type="text" id="username" name="username" required />

		<label for="password">Password:</label>
		<input bind:value={password} type="password" id="password" name="password" required />

		<button onclick={login} type="submit">Login</button>
	</form>
</div>

<style>
	.login {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
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
