export async function onRequestPost(context) {
  const { request, env } = context;
  const apiKey = env.GEMINI_API_KEY;

  try {
    const { traits } = await request.json();

    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY in environment variables.");
      throw new Error("API key not configured");
    }

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
        console.error("Gemini API Error:", errorData);
        throw new Error("Gemini API call failed");
    }

    const data = await response.json();
    let resultText = data.candidates[0].content.parts[0].text;
    
    // AI가 가끔 넣는 마크다운 제거 보정
    resultText = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return new Response(resultText, {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Server Function Error:", error);
    const fallback = {
      "koreanName": "이서연",
      "romanizedName": "Lee Seo-yeon",
      "hanja": "李瑞연",
      "personalitySummary": "A graceful soul destined for beautiful connections.",
      "nameMeaning": "Your name signifies auspicious connections and a brilliant spirit. (This is a fallback name because the AI is currently resting. Please check your API key in Cloudflare settings!)"
    };
    return new Response(JSON.stringify(fallback), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
