<script>
    // Sample data for dashboard
    const stats = [
      { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', trend: 'up' },
      { title: 'Active Users', value: '2,341', change: '+12.5%', trend: 'up' },
      { title: 'New Customers', value: '187', change: '-3.2%', trend: 'down' },
      { title: 'Conversion Rate', value: '3.24%', change: '+1.8%', trend: 'up' }
    ];
  
    // Chart data (simplified)
    const chartData = [
      { month: 'Jan', sales: 65 },
      { month: 'Feb', sales: 59 },
      { month: 'Mar', sales: 80 },
      { month: 'Apr', sales: 81 },
      { month: 'May', sales: 56 },
      { month: 'Jun', sales: 55 },
      { month: 'Jul', sales: 40 },
      { month: 'Aug', sales: 70 },
      { month: 'Sep', sales: 90 },
      { month: 'Oct', sales: 85 },
      { month: 'Nov', sales: 75 },
      { month: 'Dec', sales: 100 }
    ];
  
    // Calculate max value for scaling
    const maxSales = Math.max(...chartData.map(d => d.sales));
  </script>
  
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each stats as { title, value, change, trend }}
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <div class="text-sm font-medium text-gray-500">{title}</div>
          <div class="mt-2 flex items-baseline">
            <div class="text-2xl font-semibold text-gray-900">{value}</div>
            <div class="ml-2 flex items-center text-sm font-medium {trend === 'up' ? 'text-green-600' : 'text-red-600'}">
              {change}
              <svg 
                class="self-center flex-shrink-0 h-5 w-5 {trend === 'up' ? 'text-green-500' : 'text-red-500'}"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor" 
                aria-hidden="true"
              >
                <path 
                  fill-rule="evenodd" 
                  d={trend === 'up' 
                    ? "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" 
                    : "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"} 
                  clip-rule="evenodd" 
                />
              </svg>
            </div>
          </div>
        </div>
      {/each}
    </div>
  
    <!-- Charts section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Sales Chart -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-medium text-gray-900">Monthly Sales</h3>
        <div class="mt-6" style="height: 300px;">
          <div class="flex h-full items-end">
            {#each chartData as { month, sales }, i}
              <div class="flex-1 flex flex-col items-center">
                <div 
                  class="w-full max-w-[30px] bg-indigo-600 rounded-t" 
                  style="height: {(sales / maxSales * 100) * 2}px;"
                ></div>
                <div class="text-xs text-gray-500 mt-2">{month}</div>
              </div>
            {/each}
          </div>
        </div>
      </div>
  
      <!-- Recent Activity -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
        <div class="mt-6 flow-root">
          <ul class="-my-5 divide-y divide-gray-200">
            <li class="py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <svg class="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900">New order received</p>
                  <p class="text-sm text-gray-500">Order #12345 - $230.00</p>
                </div>
                <div>
                  <span class="text-xs text-gray-500">2m ago</span>
                </div>
              </div>
            </li>
            <li class="py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <svg class="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                  </span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900">User feedback received</p>
                  <p class="text-sm text-gray-500">Jane Smith left a 5-star review</p>
                </div>
                <div>
                  <span class="text-xs text-gray-500">12m ago</span>
                </div>
              </div>
            </li>
            <li class="py-4">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                    <svg class="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-medium text-gray-900">Inventory alert</p>
                  <p class="text-sm text-gray-500">Product "Widget XL" is low on stock</p>
                </div>
                <div>
                  <span class="text-xs text-gray-500">1h ago</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>