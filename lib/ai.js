import products from "../data/products.json" with { type: "json" };
import { HfInference } from "@huggingface/inference";

/**
 * Generate an AI response using Hugging Face Inference API.
 * Uses the official @huggingface/inference SDK for reliable routing.
 *
 * @param {string} userMessage - The incoming message from the Telegram user.
 * @returns {Promise<string>} - The AI-generated reply text.
 */
export async function getAIResponse(userMessage) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  if (!apiKey) {
    throw new Error("HUGGINGFACE_API_KEY is not set in environment variables.");
  }

  const hf = new HfInference(apiKey);

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
- If a user asks for a specific size (like "King Size", "Queen Size", or "Single Bed"), carefully list all the products available in that specific size.
- If a product is not in the catalog, politely say it's not available.
- Delivery is available all over Pakistan, takes 3-5 business days, and costs Rs. 200 (free delivery on orders above Rs. 2,000).
- Payment methods: Cash on Delivery (COD), JazzCash, Easypaisa, and bank transfer.
- Returns are accepted within 7 days if the product is unused and in original packaging.
- Keep responses short, friendly, structured (use bullet points for listing products), and helpful.`;

  try {
    const response = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-72B-Instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      max_tokens: 300,
      temperature: 0.7
    });

    const reply = response.choices[0]?.message?.content?.trim();
    if (!reply) throw new Error("Empty response from Hugging Face.");
    return reply;
  } catch (err) {
    console.error("Hugging Face SDK Error:", err);
    throw new Error(`AI generation failed: ${err.message}`);
  }
}
