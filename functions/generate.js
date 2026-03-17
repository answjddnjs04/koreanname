export async function onRequest(context) {
  const { request, env } = context;
  const apiKey = env.GEMINI_API_KEY;

  // GET 요청 등 잘못된 요청이 올 경우 처리
  if (request.method !== "POST") {
    return new Response("This endpoint only supports POST requests", { status: 405 });
  }

  try {
    const { traits } = await request.json();

    if (!apiKey) {
      console.error("[Backend Error] GEMINI_API_KEY is undefined or missing in environment variables.");
      throw new Error("API key not configured");
    }

    console.log("[Backend Info] Starting Gemini API call with traits:", traits);

    const prompt = `You are an expert Korean naming master. Based on the following 10 personality traits, create a beautiful and authentic Korean name.
Traits: ${traits.join(', ')}

Provide the response strictly in this JSON format without any markdown code blocks:
{
  "koreanName": "Full name in Hangul (e.g., 김민준)",
  "romanizedName": "Name in English/Romanized alphabet (e.g., Kim Min-jun)",
  "hanja": "Name in Hanja characters (e.g., 金敏俊)",
  "personalitySummary": "A one-sentence personality analysis in English",
  "nameMeaning": "A detailed explanation in English of the name's meaning and why it was chosen based on the traits"
}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { 
            response_mime_type: "application/json",
            temperature: 0.7 
        }
      })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("[Gemini Error Detail]:", errorData);
        throw new Error("Gemini API returned an error status");
    }

    const data = await response.json();
    let resultText = data.candidates[0].content.parts[0].text;
    
    // AI가 마크다운을 붙여서 응답할 경우 보정
    resultText = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return new Response(resultText, {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("[General Error]:", error);
    const fallback = {
      "koreanName": "이서연",
      "romanizedName": "Lee Seo-yeon",
      "hanja": "李瑞연",
      "personalitySummary": "A graceful soul destined for beautiful connections.",
      "nameMeaning": "A fallback name because the AI is currently resting. Check your Cloudflare Environment Variables!"
    };
    return new Response(JSON.stringify(fallback), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
