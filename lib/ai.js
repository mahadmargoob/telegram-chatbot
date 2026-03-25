import products from "../data/products.json" with { type: "json" };

/**
 * Generate an AI response using Hugging Face Inference API.
 *
 * @param {string} userMessage - The incoming message from the Telegram user.
 * @returns {Promise<string>} - The AI-generated reply text.
 */
export async function getAIResponse(userMessage) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  if (!apiKey) {
    throw new Error("HUGGINGFACE_API_KEY is not set in environment variables.");
  }

  // Build the product catalog string for the AI prompt
  const productCatalog = products
    .map(
      (p) =>
        `• ${p.name} — ${p.price} | ${p.details} | ${p.availability}`
    )
    .join("\n");

  // System prompt: polite sales assistant with product knowledge
  const systemPrompt = `You are a helpful and polite sales assistant for an e-commerce bedsheet store called "Comfort Zone Bedsheets". Answer customer queries about price, product details, delivery, and availability in a friendly tone.

Here is the current product catalog:
${productCatalog}

Important rules:
- Always respond based on the product catalog above.
- If a product is not in the catalog, politely say it's not available.
- Delivery is available all over Pakistan, takes 3-5 business days, and costs Rs. 200 (free delivery on orders above Rs. 2,000).
- Payment methods: Cash on Delivery (COD), JazzCash, Easypaisa, and bank transfer.
- Returns are accepted within 7 days if the product is unused and in original packaging.
- Keep responses short, friendly, and helpful.`;

  // Call Hugging Face API
  const response = await fetch(
    "https://router.huggingface.co/hf-inference/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "HuggingFaceH4/zephyr-7b-beta",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Hugging Face API error:", response.status, errorText);
    throw new Error(`Hugging Face API returned status ${response.status}`);
  }

  const data = await response.json();

  // Extract the assistant's reply from the response
  const reply =
    data?.choices?.[0]?.message?.content?.trim() ||
    "I'm sorry, I couldn't generate a response. Please try again.";

  return reply;
}
