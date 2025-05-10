<script lang="ts">
    import { Upload, X } from '@lucide/svelte';
    import { goto } from '$app/navigation' // If you're using SvelteKit
    import { sendSms } from '$lib/api/sms-service';
  
    let phoneNumbers = $state(''); // Store for phone numbers
    let message = $state(''); // Store for message
    let loading = $state(false); // Loading state for the submit button

  
    function handleCsvUpload(event: Event) {
      const input = event.target as HTMLInputElement
      const file = input.files?.[0]
      if (!file) return
  
      const reader = new FileReader()
      reader.onload = (event) => {
        const csvData = event.target?.result as string
        const numbers = csvData.split(/\r?\n/).filter(Boolean).join(', ')
        phoneNumbers += (phoneNumbers && !phoneNumbers.endsWith(', ') ? ', ' : '') + numbers
      }
      reader.readAsText(file)
      input.value = ''
    }
  
    async function handleSubmit(event: Event) {
      event.preventDefault()
      loading = true
  
      try {
        const numbersArray = phoneNumbers
          .split(',')
          .map(num => num.trim())
          .filter(Boolean)
  
        if (numbersArray.length === 0) throw new Error('Please enter at least one phone number')
        if (!message) throw new Error('Please enter a message')
  
        const result = await sendSms(numbersArray, message)
  
        if (!result.success) throw new Error(result.message)
  
 
  
        phoneNumbers = ''
        message = ''
        goto(location.href) // simulates router.refresh()
  
      } catch (error: any) {

      } finally {
        loading = false
      }
    }
  </script>
  
  <form onsubmit={handleSubmit} class="space-y-6">
    <div class="space-y-2">
      <label for="phoneNumbers">Phone Numbers</label>
      <div class="flex flex-col space-y-2">
        <textarea
          id="phoneNumbers"
          bind:value={phoneNumbers}
          placeholder="Enter phone numbers separated by commas"
          class="min-h-[100px] w-full border rounded-md p-2"
        >
        </textarea>
        <div class="flex items-center">
          <label
            for="csvUpload"
            class="flex items-center px-4 py-2 bg-gray-100  rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Upload class="w-4 h-4 mr-2" />
            Import from CSV
          </label>
          <input id="csvUpload" type="file" accept=".csv" onchange={handleCsvUpload} class="hidden" />
          {#if phoneNumbers}
            <button type="button" class="ml-2 text-gray-500" onclick={() => phoneNumbers = ''}>
              <X class="w-4 h-4 mr-1" />
              Clear
            </button>
          {/if}
        </div>
      </div>
    </div>
  
    <div class="space-y-2">
      <label for="message">Message</label>
      <textarea
        id="message"
        bind:value={message}
        placeholder="Enter your message"
        class="min-h-[150px] w-full border rounded-md p-2"
      >
      </textarea>
      <div class="text-right text-xs text-gray-500">{message.length} characters</div>
    </div>
  
    <button type="submit" class="w-full bg-blue-500 p-4 text-white font-semibold" disabled={loading}>
      {loading ? 'Sending...' : 'Send SMS'}
    </button>
  </form>
  