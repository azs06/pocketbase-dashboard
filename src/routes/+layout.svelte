<script>
	import "../app.css";
	let { children } = $props();
  </script>
  
  <div class="flex h-screen items-center justify-center bg-gray-100">
	<div class="flex-1 overflow-auto">  
	  <!-- Page content -->
	  <main class="p-6">
		{@render children()}
	  </main>
	</div>
  </div>