interface SendSmsResult {
	success: boolean;
	message: string;
	error?: string;
	gatewayResponse?: any;
}

export async function sendSms(phoneNumbers: string[], message: string): Promise<SendSmsResult> {
    try {
      // Validate inputs
      if (!phoneNumbers.length) {
        return { success: false, message: "No phone numbers provided", error: "MISSING_NUMBERS" }
      }
  
      if (!message.trim()) {
        return { success: false, message: "Message text is required", error: "MISSING_TEXT" }
      }
  
      // Get environment variables
      const smsGatewayUrl = import.meta.env.VITE_SMS_GATEWAY_URL
      const smsGatewayToken = import.meta.env.VITE_SMS_GATEWAY_API_KEY
  
      if (!smsGatewayUrl || !smsGatewayToken) {
        return {
          success: false,
          message: "SMS gateway configuration is missing",
          error: "MISSING_GATEWAY_CONFIG",
        }
      }
  
      // Format phone numbers as comma-separated string
      const numbersString = phoneNumbers.join(",")
  
      // Prepare the payload according to the specified format
      const payload = {
        numbers: numbersString,
        text: message,
      }
  
      // Send the SMS via the gateway
      const response = await fetch(smsGatewayUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          TOKEN: `${smsGatewayToken}`,
        },
        body: JSON.stringify(payload),
      })
  
      const responseData = await response.json()
  
      if (!response.ok) {
        return {
          success: false,
          message: `SMS gateway error: ${responseData.message || response.statusText}`,
          error: "GATEWAY_ERROR",
          gatewayResponse: responseData,
        }
      }
      return {
        success: true,
        message: "SMS sent successfully",
        gatewayResponse: null,
      }
    } catch (error) {
      console.error("Error sending SMS:", error)
      return {
        success: false,
        message: "An error occurred while sending the SMS",
        error: "UNKNOWN_ERROR",
      }
    }
    
}   
