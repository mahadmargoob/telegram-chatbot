import { getAIResponse } from "@/lib/ai";

/**
 * Telegram Webhook Handler
 *
 * Receives incoming updates from Telegram, processes the message
 * through the AI service, and sends the reply back to the user.
 */
export async function POST(request) {
  try {
    const body = await request.json();

    // Extract message data from the Telegram update
    const message = body?.message;

    // Ignore non-message updates (edited messages, channel posts, etc.)
    if (!message || !message.text) {
      return new Response("OK", { status: 200 });
    }

    const chatId = message.chat.id;
    const userText = message.text;
    const userName = message.from?.first_name || "there";

    console.log(`📩 Message from ${userName} (${chatId}): ${userText}`);

    // Skip bot commands like /start with a welcome message
    if (userText === "/start") {
      await sendTelegramMessage(
        chatId,
        `Assalam o Alaikum ${userName}! 👋\n\nWelcome to Comfort Zone Bedsheets! 🛏️\n\nI'm your virtual assistant. Ask me about our bedsheets, prices, delivery, or anything else. I'm here to help!\n\nJust type your question and I'll respond right away.`
      );
      return new Response("OK", { status: 200 });
    }

    // Get AI response
    let reply;
    try {
      reply = await getAIResponse(userText);
    } catch (aiError) {
      console.error("AI Error:", aiError.message);
      reply =
        "Sorry, I'm having trouble processing your request right now. Please contact our support team for help. 🙏";
    }

    // Send the reply back to Telegram
    await sendTelegramMessage(chatId, reply);

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    // Always return 200 to prevent Telegram from retrying
    return new Response("OK", { status: 200 });
  }
}

/**
 * Send a text message to a Telegram chat.
 *
 * @param {number} chatId - The Telegram chat ID to send the message to.
 * @param {string} text - The message text to send.
 */
async function sendTelegramMessage(chatId, text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;

  if (!token) {
    console.error("TELEGRAM_BOT_TOKEN is not set!");
    return;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "Markdown",
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Telegram API Error:", errorData);
  }
}
