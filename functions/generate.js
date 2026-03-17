export async function onRequest(context) {
  const { request, env } = context;
  const apiKey = env.GEMINI_API_KEY;

  if (request.method !== "POST") {
    return new Response("This endpoint only supports POST requests", { status: 405 });
  }

  try {
    const { traits } = await request.json();

    if (!apiKey) {
      console.error("[Backend Error] GEMINI_API_KEY is missing.");
      throw new Error("API key not configured");
    }

    console.log("[Backend Info] Calling Gemini API v1 with traits:", traits);

    const prompt = `You are an expert Korean naming master. Based on the following 10 personality traits, create a beautiful and authentic Korean name.
Traits: ${traits.join(', ')}

Provide the response strictly in this JSON format:
{
  "koreanName": "Full name in Hangul (e.g., 김민준)",
  "romanizedName": "Name in English/Romanized alphabet (e.g., Kim Min-jun)",
  "hanja": "Name in Hanja characters (e.g., 金敏俊)",
  "personalitySummary": "A one-sentence personality analysis in English",
  "nameMeaning": "A detailed explanation in English of the name's meaning and why it was chosen based on the traits"
}`;

    // API 버전을 v1beta에서 v1으로 변경하여 호환성 확보
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
        console.error("[Gemini API Error Response]:", JSON.stringify(errorData));
        throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    let resultText = data.candidates[0].content.parts[0].text;
    
    // AI가 마크다운을 붙여서 응답할 경우 보정
    resultText = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return new Response(resultText, {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("[Backend Exception]:", error.message);
    const fallback = {
      "koreanName": "이서연",
      "romanizedName": "Lee Seo-yeon",
      "hanja": "李瑞연",
      "personalitySummary": "A graceful soul destined for beautiful connections.",
      "nameMeaning": "The AI service is temporarily unavailable. This is a fallback name. Error: " + error.message
    };
    return new Response(JSON.stringify(fallback), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
