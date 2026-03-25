# 🛏️ Comfort Zone Bedsheets — AI Telegram Bot

An AI-powered Telegram bot that acts as a virtual sales assistant for a bedsheet e-commerce store. Built with **Next.js App Router**, deployed on **Vercel**, and powered by **Hugging Face AI**.

---

## 🔁 How It Works

```
User sends message → Telegram → Vercel Webhook → Hugging Face AI → Reply back to user
```

---

## 📂 Project Structure

```
telegram/
├── app/
│   ├── api/
│   │   └── telegram/
│   │       └── route.js      ← Webhook endpoint (POST)
│   ├── globals.css            ← Global styles
│   ├── layout.js              ← Root layout + metadata
│   ├── page.js                ← Landing page with setup guide
│   └── page.module.css        ← Landing page styles
├── data/
│   └── products.json          ← Product catalog (bedsheets)
├── lib/
│   └── ai.js                  ← AI service (Hugging Face API)
├── .env.example               ← Environment variable template
└── README.md                  ← You are here
```

---

## 🚀 Setup Guide

### Step 1: Create a Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot`
3. Follow the prompts — give your bot a **name** and **username**
4. BotFather will give you a **Bot Token** like:
   ```
   7123456789:AAH1bGciOiJIUzI1NiIs...
   ```
5. **Copy and save this token** — you'll need it later

### Step 2: Get a Hugging Face API Key

1. Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Click **"Create new token"**
3. Set permissions to **"Read"** (that's all you need)
4. Copy the token (starts with `hf_...`)

### Step 3: Deploy to Vercel

1. Push this project to a **GitHub repository**
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. In the **Environment Variables** section, add:

   | Variable              | Value                          |
   | --------------------- | ------------------------------ |
   | `TELEGRAM_BOT_TOKEN`  | Your bot token from BotFather  |
   | `HUGGINGFACE_API_KEY`  | Your Hugging Face API key      |

4. Click **Deploy** and wait for it to finish
5. Note your Vercel domain (e.g., `your-project.vercel.app`)

### Step 4: Set the Webhook

Open this URL in your browser (replace the placeholders):

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://<YOUR_VERCEL_DOMAIN>/api/telegram
```

**Example:**
```
https://api.telegram.org/bot7123456789:AAH1bGci.../setWebhook?url=https://my-bot.vercel.app/api/telegram
```

You should see:
```json
{
  "ok": true,
  "result": true,
  "description": "Webhook was set"
}
```

### Step 5: Test Your Bot! 🎉

1. Open Telegram
2. Search for your bot by its username
3. Send `/start` — you should get a welcome message
4. Ask about bedsheets — the AI will reply!

**Try these messages:**
- "What bedsheets do you have?"
- "King size price kitna hai?"
- "Delivery charges kya hain?"
- "Do you have velvet bedsheets?"

---

## 🔧 Local Development

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd telegram

# 2. Install dependencies
npm install

# 3. Create .env.local from the template
cp .env.example .env.local
# Then edit .env.local and add your real keys

# 4. Run the dev server
npm run dev
```

The app will be available at `http://localhost:3000`

> **Note:** The Telegram webhook won't work on localhost. Use [ngrok](https://ngrok.com/) to create a public tunnel for testing, or deploy directly to Vercel.

---

## 🧠 AI Configuration

The AI is configured as a **polite e-commerce sales assistant**. You can customize the system prompt in `lib/ai.js`.

**Current model:** `deepseek-ai/DeepSeek-V3-0324` via Hugging Face Inference API

**Product data** is loaded from `data/products.json` and injected into the AI prompt automatically. To update products, just edit the JSON file and redeploy.

---

## 📦 Tech Stack

| Technology      | Purpose                              |
| --------------- | ------------------------------------ |
| Next.js 15      | App Router + Serverless API Routes   |
| Hugging Face    | AI chat completions (free tier)      |
| Telegram Bot API| Webhook-based messaging              |
| Vercel          | Serverless deployment & hosting      |

---

## ⚠️ Important Notes

- The bot **only works via webhook** — it won't poll for messages
- Hugging Face free tier has **rate limits** — for production use, consider a paid plan
- The bot always returns **HTTP 200** to Telegram to prevent message retry loops
- If the AI fails, the bot sends a fallback message: *"Sorry, please contact support."*

---

## 📄 License

MIT — feel free to use, modify, and deploy!
