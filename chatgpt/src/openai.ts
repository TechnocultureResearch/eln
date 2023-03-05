// 1. Authenticate, get token from OpenAI
export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;



// 2. Create a completion request
// 3. Send the request to OpenAI
// 4. Print the response
// 5. Add the request and response to the history
// 6. On follow-up requests, use the history as context