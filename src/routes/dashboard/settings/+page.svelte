<script lang="ts">
	import { currentUser, pb } from '$lib/pocketbase';

	// User profile data from PocketBase
	let userProfile = $state({
		name: '',
		email: '',
		avatar: ''
	});

	let isSaving = $state(false);
	let saveError = $state('');

	// Get avatar URL helper
	function getAvatarUrl() {
		console.log('Current User:', $currentUser); // Debug log
		if ($currentUser?.avatar && $currentUser?.id) {
			// Construct the file URL manually using the PocketBase URL
			const pbUrl = import.meta.env.VITE_PB_URL;
			// Use 'users' directly as the collection name since this is the users collection
			const avatarUrl = `${pbUrl}/api/files/users/${$currentUser.id}/${$currentUser.avatar}`;
			console.log('Avatar URL:', avatarUrl); // Debug log
			return avatarUrl;
		}
		// Generate avatar with user's initials
		return `https://ui-avatars.com/api/?name=${encodeURIComponent($currentUser?.name || 'User')}&background=4F46E5&color=fff&size=128`;
	}

	// Initialize user profile data from PocketBase
	$effect(() => {
		if ($currentUser) {
			userProfile.name = $currentUser.name || '';
			userProfile.email = $currentUser.email || '';
			userProfile.avatar = getAvatarUrl();
		}
	});

	// Sample settings (these could be stored in PocketBase as well)
	let notifications = $state({
		email: true,
		push: false
	});

	let displaySettings = $state({
		darkMode: false,
		compactView: true,
		animationsEnabled: true
	});

	let securitySettings = $state({
		twoFactorAuth: false,
		sessionTimeout: 30,
		ipRestriction: false
	});

	// Save function that updates PocketBase
	async function saveSettings() {
		if (!$currentUser) return;

		isSaving = true;
		saveError = '';

		try {
			// Update user profile in PocketBase
			await pb.collection('users').update($currentUser.id, {
				name: userProfile.name,
				email: userProfile.email
			});

			// Show success notification
			const saveNotification = document.getElementById('save-notification');
			if (saveNotification) {
				saveNotification.classList.remove('opacity-0');
				setTimeout(() => {
					saveNotification.classList.add('opacity-0');
				}, 3000);
			}
		} catch (error: any) {
			console.error('Error saving settings:', error);
			saveError = error.message || 'Failed to save settings';

			// Show error notification
			const errorNotification = document.getElementById('error-notification');
			if (errorNotification) {
				errorNotification.classList.remove('opacity-0');
				setTimeout(() => {
					errorNotification.classList.add('opacity-0');
				}, 5000);
			}
		} finally {
			isSaving = false;
		}
	}
</script>

<div class="max-w-3xl mx-auto py-6">
	<h1 class="text-2xl font-bold text-gray-900 mb-8">Account Settings</h1>

	<!-- Profile section -->
	<div class="bg-white shadow rounded-lg mb-6">
		<div class="px-4 py-5 sm:p-6">
			<h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
			<div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
				<div class="sm:col-span-6 flex items-center">
					<div class="mr-4">
						<img
							class="h-16 w-16 rounded-full object-cover bg-gray-200"
							src={userProfile.avatar}
							alt="Profile"
							onerror={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent($currentUser?.name || 'User')}&background=4F46E5&color=fff&size=128`; }}
						/>
					</div>
					<div>
						<div class="text-sm font-medium text-gray-700">{userProfile.name || 'User'}</div>
						<div class="text-sm text-gray-500">{userProfile.email}</div>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
					<div class="mt-1">
						<input
							type="text"
							name="name"
							id="name"
							bind:value={userProfile.name}
							class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>

				<div class="sm:col-span-3">
					<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
					<div class="mt-1">
						<input
							type="email"
							name="email"
							id="email"
							bind:value={userProfile.email}
							class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Notification settings -->
	<div class="bg-white shadow rounded-lg mb-6">
		<div class="px-4 py-5 sm:p-6">
			<h3 class="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
			<div class="mt-4 space-y-4">
				<div class="flex items-start">
					<div class="flex items-center h-5">
						<input
							id="email-notifications"
							name="email-notifications"
							type="checkbox"
							bind:checked={notifications.email}
							class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="email-notifications" class="font-medium text-gray-700"
							>Email notifications</label
						>
						<p class="text-gray-500">Get notified via email for important updates</p>
					</div>
				</div>

				<div class="flex items-start">
					<div class="flex items-center h-5">
						<input
							id="push-notifications"
							name="push-notifications"
							type="checkbox"
							bind:checked={notifications.push}
							class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="push-notifications" class="font-medium text-gray-700"
							>Push notifications</label
						>
						<p class="text-gray-500">Receive push notifications in your browser</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Display settings -->
	<div class="bg-white shadow rounded-lg mb-6">
		<div class="px-4 py-5 sm:p-6">
			<h3 class="text-lg font-medium leading-6 text-gray-900">Display</h3>
			<div class="mt-4 space-y-4">
				<div class="flex items-start">
					<div class="flex items-center h-5">
						<input
							id="dark-mode"
							name="dark-mode"
							type="checkbox"
							bind:checked={displaySettings.darkMode}
							class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="dark-mode" class="font-medium text-gray-700">Dark mode</label>
						<p class="text-gray-500">Enable dark mode for better viewing in low light</p>
					</div>
				</div>

				<div class="flex items-start">
					<div class="flex items-center h-5">
						<input
							id="compact-view"
							name="compact-view"
							type="checkbox"
							bind:checked={displaySettings.compactView}
							class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="compact-view" class="font-medium text-gray-700">Compact view</label>
						<p class="text-gray-500">Display more information with less padding</p>
					</div>
				</div>

				<div class="flex items-start">
					<div class="flex items-center h-5">
						<input
							id="animations-enabled"
							name="animations-enabled"
							type="checkbox"
							bind:checked={displaySettings.animationsEnabled}
							class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="animations-enabled" class="font-medium text-gray-700">Animations</label>
						<p class="text-gray-500">Enable animations for a smoother experience</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Security settings -->
	<div class="bg-white shadow rounded-lg mb-6">
		<div class="px-4 py-5 sm:p-6">
			<h3 class="text-lg font-medium leading-6 text-gray-900">Security</h3>
			<div class="mt-4 space-y-4">
				<div class="flex items-start">
					<div class="flex items-center h-5">
						<input
							id="two-factor-auth"
							name="two-factor-auth"
							type="checkbox"
							bind:checked={securitySettings.twoFactorAuth}
							class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="two-factor-auth" class="font-medium text-gray-700"
							>Two-factor authentication</label
						>
						<p class="text-gray-500">Add an extra layer of security to your account</p>
					</div>
				</div>

				<div>
					<label for="session-timeout" class="block text-sm font-medium text-gray-700"
						>Session timeout (minutes)</label
					>
					<div class="mt-1">
						<input
							type="number"
							name="session-timeout"
							id="session-timeout"
							min="5"
							max="120"
							bind:value={securitySettings.sessionTimeout}
							class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>

				<div class="flex items-start">
					<div class="flex items-center h-5">
						<input
							id="ip-restriction"
							name="ip-restriction"
							type="checkbox"
							bind:checked={securitySettings.ipRestriction}
							class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="ip-restriction" class="font-medium text-gray-700">IP restriction</label>
						<p class="text-gray-500">Restrict access to approved IP addresses only</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Save button -->
	<div class="flex justify-end">
		<button
			type="button"
			onclick={saveSettings}
			disabled={isSaving}
			class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{#if isSaving}
				<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
				Saving...
			{:else}
				Save Settings
			{/if}
		</button>
	</div>

	<!-- Success notification -->
	<div
		id="save-notification"
		class="fixed bottom-4 right-4 bg-green-50 p-4 rounded-md border border-green-200 shadow-md opacity-0 transition-opacity duration-300"
	>
		<div class="flex">
			<div class="flex-shrink-0">
				<svg
					class="h-5 w-5 text-green-400"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<div class="ml-3">
				<p class="text-sm font-medium text-green-800">Settings saved successfully</p>
			</div>
		</div>
	</div>

	<!-- Error notification -->
	<div
		id="error-notification"
		class="fixed bottom-4 right-4 bg-red-50 p-4 rounded-md border border-red-200 shadow-md opacity-0 transition-opacity duration-300"
	>
		<div class="flex">
			<div class="flex-shrink-0">
				<svg
					class="h-5 w-5 text-red-400"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
						clip-rule="evenodd"
					/>
				</svg>
			</div>
			<div class="ml-3">
				<p class="text-sm font-medium text-red-800">{saveError || 'Failed to save settings'}</p>
			</div>
		</div>
	</div>
</div>
