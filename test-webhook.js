async function testWebhook() {
  const telegramUpdate = {
    update_id: 123456789,
    message: {
      message_id: 1,
      from: {
        id: 987654321,
        is_bot: false,
        first_name: "TestUser",
        language_code: "en"
      },
      chat: {
        id: 987654321,
        first_name: "TestUser",
        type: "private"
      },
      date: Math.floor(Date.now() / 1000),
      text: "What is the price of a King Bedsheet?"
    }
  };

  console.log("Sending mock Telegram request...");
  
  try {
    const res = await fetch("http://localhost:3000/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(telegramUpdate)
    });

    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response:", text);
  } catch(e) {
    console.error("Error:", e);
  }
}

testWebhook();
