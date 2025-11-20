<script lang="ts">
    import { currentUser, pb } from '$lib/pocketbase';
    import { goto } from '$app/navigation';

    let isDropdownOpen = $state(false);
    let avatarError = $state(false);

    const toggleDropdown = () => {
        isDropdownOpen = !isDropdownOpen;
    };

    const handleAvatarError = () => {
        avatarError = true;
    };

    const getAvatarUrl = () => {
        if (avatarError || !$currentUser?.avatar || !$currentUser?.id) {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent($currentUser?.name || 'User')}&background=4F46E5&color=fff`;
        }
        return `${import.meta.env.VITE_PB_URL}/api/files/users/${$currentUser.id}/${$currentUser.avatar}`;
    };

    // Reset avatar error when user changes
    $effect(() => {
        if ($currentUser) {
            avatarError = false;
        }
    });

    const logout = async () => {
        try {
            await pb.authStore.clear();
            goto('/');
            console.log('Logged out successfully');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.profile-dropdown')) {
            isDropdownOpen = false;
        }
    };

    $effect(() => {
        if (isDropdownOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }
    });
</script>
<header class="bg-white shadow-sm">
    <div class="flex justify-between items-center px-6 py-3">
      <h1 class="text-xl font-semibold text-gray-800">Dashboard</h1>
      <div class="flex items-center space-x-4">
        <button class="text-gray-500 hover:text-gray-700 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div class="relative profile-dropdown">
          <button onclick={toggleDropdown} class="flex items-center focus:outline-none hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
            <img
              class="h-8 w-8 rounded-full object-cover bg-gray-200"
              src={getAvatarUrl()}
              alt="User profile"
              onerror={handleAvatarError}
            />
            <span class="ml-2 text-sm font-medium text-gray-700">{$currentUser ? $currentUser?.name : 'Jhon Doe'}</span>
            <svg
              class="ml-2 h-4 w-4 text-gray-500 transition-transform"
              class:rotate-180={isDropdownOpen}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {#if isDropdownOpen}
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <a
                href="/dashboard/settings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </div>
              </a>
              <a
                href="/dashboard/settings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Settings
                </div>
              </a>
              <hr class="my-1 border-gray-200" />
              <button
                onclick={logout}
                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <div class="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </div>
              </button>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </header>