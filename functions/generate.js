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

    console.log("[Backend Info] Calling Gemini API v1beta with traits:", traits);

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

    // v1beta가 모델 호환성이 가장 높습니다.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { 
            temperature: 0.7,
            maxOutputTokens: 1000
            // response_mime_type을 제거하여 400 에러 방지
        }
      })
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("[Gemini API Error Detail]:", JSON.stringify(errorData));
        throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    let resultText = data.candidates[0].content.parts[0].text;
    
    // AI의 응답에서 JSON 블록만 추출하는 로직 유지
    const jsonMatch = resultText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
        resultText = jsonMatch[0];
    }
    
    return new Response(resultText, {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("[Backend Exception]:", error.message);
    const fallback = {
      "koreanName": "박지민",
      "romanizedName": "Park Ji-min",
      "hanja": "朴智敏",
      "personalitySummary": "A brilliant and agile soul with deep wisdom.",
      "nameMeaning": "Your name represents wisdom and quick-wittedness. (AI connection is still stabilizing... Error: " + error.message + ")"
    };
    return new Response(JSON.stringify(fallback), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
