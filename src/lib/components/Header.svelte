<script lang="ts">
    import { currentUser } from '$lib/pocketbase';

    
    
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
        <div class="relative">
          <button class="flex items-center focus:outline-none">
            <img
              class="h-8 w-8 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User profile"
            />
            <span class="ml-2 text-sm font-medium text-gray-700">{$currentUser ? $currentUser?.name : 'Jhon Doe'}</span>
          </button>
        </div>
      </div>
    </div>
  </header>