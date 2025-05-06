<script>
	import "../app.css";
	let { children } = $props();
	
	let isSidebarOpen = $state(true);
	
	const toggleSidebar = () => {
	  isSidebarOpen = !isSidebarOpen;
	};
  </script>
  
  <div class="flex h-screen bg-gray-100">
	<!-- Sidebar -->
	<aside 
	  class="bg-indigo-800 text-white transition-all duration-300 ease-in-out overflow-hidden"
	  class:w-64={isSidebarOpen}
	  class:w-16={!isSidebarOpen}
	>
	  <div class="flex items-center justify-between p-4 border-b border-indigo-700">
		<h2 class={isSidebarOpen ? "text-xl font-bold" : "hidden"}>Dashboard</h2>
		<button 
		  on:click={toggleSidebar} 
		  class="p-1 rounded-md hover:bg-indigo-700 focus:outline-none"
		>
		  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isSidebarOpen ? "M4 6h16M4 12h10M4 18h6" : "M4 6h16M4 12h16M4 18h16"} />
		  </svg>
		</button>
	  </div>
	  <nav class="p-4">
		<ul class="space-y-2">
		  <li>
			<a href="/" class="flex items-center p-2 rounded-md hover:bg-indigo-700">
			  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
			  </svg>
			  <span class={isSidebarOpen ? "ml-3" : "hidden"}>Home</span>
			</a>
		  </li>
		  <li>
			<a href="/analytics" class="flex items-center p-2 rounded-md hover:bg-indigo-700">
			  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
			  </svg>
			  <span class={isSidebarOpen ? "ml-3" : "hidden"}>Analytics</span>
			</a>
		  </li>
		  <li>
			<a href="/settings" class="flex items-center p-2 rounded-md hover:bg-indigo-700">
			  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
			  </svg>
			  <span class={isSidebarOpen ? "ml-3" : "hidden"}>Settings</span>
			</a>
		  </li>
		</ul>
	  </nav>
	</aside>
  
	<!-- Main content -->
	<div class="flex-1 overflow-auto">
	  <!-- Top navigation -->
	  <header class="bg-white shadow-sm">
		<div class="flex justify-between items-center px-6 py-3">
		  <h1 class="text-xl font-semibold text-gray-800">My Dashboard</h1>
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
				<span class="ml-2 text-sm font-medium text-gray-700">John Doe</span>
			  </button>
			</div>
		  </div>
		</div>
	  </header>
  
	  <!-- Page content -->
	  <main class="p-6">
		{@render children()}
	  </main>
	</div>
  </div>