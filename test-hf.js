import { HfInference } from "@huggingface/inference";

async function testSDK() {
  const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
  
  try {
    const response = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-72B-Instruct",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "What is 2+2?" }
      ]
    });
    
    console.log("Success! Output:");
    console.log(response.choices[0].message.content);
  } catch(e) {
    if (e.httpResponse) {
      console.error("SDK Http Error:", JSON.stringify(e.httpResponse.body, null, 2));
    } else {
      console.error("SDK Error:", e);
    }
  }
}

testSDK();
