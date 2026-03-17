export async function onRequest(context) {
  const { request, env } = context;
  const apiKey = env.GEMINI_API_KEY;

  if (request.method !== "POST") {
    return new Response("Only POST supported", { status: 405 });
  }

  try {
    const { traits } = await request.json();

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in Cloudflare Environment Variables.");
    }

    // 사용자 리스트 기반 최신 모델 우선순위
    const models = [
      "gemini-2.5-flash", 
      "gemini-3.1-flash-lite", 
      "gemini-3-flash",
      "gemini-1.5-flash"
    ];

    let lastError = null;

    for (const modelName of models) {
      try {
        console.log(`[Backend] Trying latest model: ${modelName}`);
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ 
              parts: [{ 
                text: `You are an expert Korean naming master. Based on the following 10 personality traits, create a beautiful and authentic Korean name.
Traits: ${traits.join(', ')}

Provide the response strictly in this JSON format:
{
  "koreanName": "Full name in Hangul (e.g., 김민준)",
  "romanizedName": "Name in English/Romanized alphabet (e.g., Kim Min-jun)",
  "hanja": "Name in Hanja characters (e.g., 金敏俊)",
  "personalitySummary": "A one-sentence personality analysis in English",
  "nameMeaning": "A detailed explanation in English of why this name was chosen based on the traits"
}` 
              }] 
            }],
            generationConfig: { 
              temperature: 0.7,
              responseMimeType: "application/json"
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const resultText = data.candidates[0].content.parts[0].text;
          console.log(`[Backend] Success with ${modelName}`);
          return new Response(resultText, { headers: { 'Content-Type': 'application/json' } });
        } else {
          const errorData = await response.json();
          lastError = `Model ${modelName} error: ${errorData.error.message}`;
          console.warn(`[Backend] ${lastError}`);
        }
      } catch (e) {
        lastError = `Fetch error with ${modelName}: ${e.message}`;
        console.warn(`[Backend] ${lastError}`);
      }
    }

    throw new Error("All provided models failed. " + lastError);

  } catch (error) {
    console.error("[Fatal Error]:", error.message);
    const fallback = {
      "koreanName": "강한별",
      "romanizedName": "Kang Han-byeol",
      "hanja": "姜한별",
      "personalitySummary": "A sturdy and bright soul shining like a grand star.",
      "nameMeaning": "Your traits suggest a person of strong will and bright presence. (Note: AI models are currently initializing. Error: " + error.message + ")"
    };
    return new Response(JSON.stringify(fallback), { headers: { 'Content-Type': 'application/json' } });
  }
}
