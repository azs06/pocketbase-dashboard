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
    <!-- Charts section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">  
      <!-- Recent Activity -->
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
        <div class="mt-6 flow-root">
          <div class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">No recent activity</h3>
            <p class="mt-1 text-sm text-gray-500">Activity will appear here once you start using the dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  </div>