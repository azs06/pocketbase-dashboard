<script>
	// Sample user data
	let userProfile = $state({
		name: 'John Doe',
		email: 'john.doe@example.com',
		role: 'Administrator',
		avatar:
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
	});

	// Sample settings
	let notifications = $state({
		email: true,
		push: false,
		sms: false
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

	// Simulated save function
	function saveSettings() {
		// In a real app, this would save to a backend
		const saveNotification = document.getElementById('save-notification');
		saveNotification.classList.remove('opacity-0');
		setTimeout(() => {
			saveNotification.classList.add('opacity-0');
		}, 3000);
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
						<img class="h-16 w-16 rounded-full" src={userProfile.avatar} alt="Profile" />
					</div>
					<div>
						<div class="text-sm font-medium text-gray-700">{userProfile.name}</div>
						<div class="text-sm text-gray-500">{userProfile.email}</div>
						<div class="text-sm text-gray-500">{userProfile.role}</div>
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

				<div class="flex items-start">
					<div class="flex items-center h-5">
						<input
							id="sms-notifications"
							name="sms-notifications"
							type="checkbox"
							bind:checked={notifications.sms}
							class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
						/>
					</div>
					<div class="ml-3 text-sm">
						<label for="sms-notifications" class="font-medium text-gray-700"
							>SMS notifications</label
						>
						<p class="text-gray-500">Get text message notifications for critical alerts</p>
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
			on:click={saveSettings}
			class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
		>
			Save Settings
		</button>
	</div>

	<!-- Save notification -->
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
</div>
