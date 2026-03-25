import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      {/* ── Hero ─────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.badge}>
          <span className={styles.dot}></span>
          LIVE ON VERCEL
        </div>
        <h1 className={styles.title}>Comfort Zone Bedsheets Bot</h1>
        <p className={styles.subtitle}>
          AI-powered Telegram sales assistant that answers customer queries
          about bedsheets, pricing, delivery &amp; more — automatically.
        </p>

        {/* Flow Diagram */}
        <div className={styles.flow}>
          <div className={styles.flowStep}>
            <span className={styles.flowIcon}>💬</span> User Message
          </div>
          <span className={styles.flowArrow}>→</span>
          <div className={styles.flowStep}>
            <span className={styles.flowIcon}>🤖</span> Telegram
          </div>
          <span className={styles.flowArrow}>→</span>
          <div className={styles.flowStep}>
            <span className={styles.flowIcon}>⚡</span> Vercel API
          </div>
          <span className={styles.flowArrow}>→</span>
          <div className={styles.flowStep}>
            <span className={styles.flowIcon}>🧠</span> AI Model
          </div>
          <span className={styles.flowArrow}>→</span>
          <div className={styles.flowStep}>
            <span className={styles.flowIcon}>✅</span> Reply
          </div>
        </div>
      </section>

      {/* ── Cards ────────────────────────── */}
      <div className={styles.cards}>
        {/* Setup Guide */}
        <div className={styles.card} id="setup">
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>🚀</span>
            <h2 className={styles.cardTitle}>Quick Setup Guide</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.steps}>
              <div className={styles.step}>
                <span className={styles.stepNum}>1</span>
                <div className={styles.stepContent}>
                  <strong>Create a Telegram Bot</strong> — Open Telegram, search
                  for <code>@BotFather</code>, send <code>/newbot</code>, follow
                  the prompts, and copy your bot token.
                </div>
              </div>

              <div className={styles.step}>
                <span className={styles.stepNum}>2</span>
                <div className={styles.stepContent}>
                  <strong>Get Hugging Face API Key</strong> — Go to{" "}
                  <a
                    href="https://huggingface.co/settings/tokens"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    huggingface.co/settings/tokens
                  </a>
                  , create a new token with &quot;Read&quot; access.
                </div>
              </div>

              <div className={styles.step}>
                <span className={styles.stepNum}>3</span>
                <div className={styles.stepContent}>
                  <strong>Deploy to Vercel</strong> — Push this repo to GitHub,
                  import it on{" "}
                  <a
                    href="https://vercel.com/new"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    vercel.com/new
                  </a>
                  , and add the environment variables below.
                </div>
              </div>

              <div className={styles.step}>
                <span className={styles.stepNum}>4</span>
                <div className={styles.stepContent}>
                  <strong>Set the Webhook</strong> — After deploying, open this
                  URL in your browser to connect your bot:
                  <div className={styles.codeBlock}>
                    https://api.telegram.org/bot&lt;YOUR_TOKEN&gt;/setWebhook?url=https://&lt;YOUR_VERCEL_DOMAIN&gt;/api/telegram
                  </div>
                </div>
              </div>

              <div className={styles.step}>
                <span className={styles.stepNum}>5</span>
                <div className={styles.stepContent}>
                  <strong>Test It!</strong> — Open your bot in Telegram, send{" "}
                  <code>/start</code>, and ask about bedsheets! 🎉
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Environment Variables */}
        <div className={styles.card} id="env">
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>🔑</span>
            <h2 className={styles.cardTitle}>Environment Variables</h2>
          </div>
          <div className={styles.cardBody}>
            <p style={{ marginBottom: "12px" }}>
              Add these in Vercel → Project Settings → Environment Variables:
            </p>
            <table className={styles.envTable}>
              <thead>
                <tr>
                  <th>Variable</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>TELEGRAM_BOT_TOKEN</td>
                  <td>Bot token from @BotFather</td>
                </tr>
                <tr>
                  <td>HUGGINGFACE_API_KEY</td>
                  <td>API token from Hugging Face</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tech Stack */}
        <div className={styles.card} id="tech">
          <div className={styles.cardHeader}>
            <span className={styles.cardIcon}>⚙️</span>
            <h2 className={styles.cardTitle}>Tech Stack</h2>
          </div>
          <div className={styles.cardBody}>
            <table className={styles.envTable}>
              <thead>
                <tr>
                  <th>Technology</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Next.js</td>
                  <td>App Router + Serverless API Routes</td>
                </tr>
                <tr>
                  <td>Hugging Face</td>
                  <td>AI-powered chat completions</td>
                </tr>
                <tr>
                  <td>Telegram Bot API</td>
                  <td>Messaging platform integration</td>
                </tr>
                <tr>
                  <td>Vercel</td>
                  <td>Serverless deployment &amp; hosting</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Footer ───────────────────────── */}
      <footer className={styles.footer}>
        <p>
          Built with ❤️ using{" "}
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js
          </a>{" "}
          &amp; deployed on{" "}
          <a
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </a>
        </p>
      </footer>
    </main>
  );
}
