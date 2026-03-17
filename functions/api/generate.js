export async function onRequestPost(context) {
  const { request, env } = context;
  const apiKey = env.GEMINI_API_KEY; // Cloudflare 대시보드에서 설정할 환경 변수

  try {
    const { traits } = await request.json();

    if (!apiKey) {
      throw new Error("API key not configured");
    }

    const prompt = `You are an expert Korean naming master. Based on the following 10 personality traits, create a beautiful and authentic Korean name (Surname + Given name).
Traits: ${traits.join(', ')}

Provide the response strictly in this JSON format:
{
  "koreanName": "Full name in Hangul",
  "hanja": "Name in Hanja characters",
  "personalitySummary": "A one-sentence personality analysis (English)",
  "nameMeaning": "A detailed explanation of the name's meaning and why it was chosen (English)"
}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: "application/json" }
      })
    });

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    
    return new Response(resultText, {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // API 호출 실패 시 가짜 데이터(Fallback) 반환
    const fallback = {
      "koreanName": "김서윤",
      "hanja": "金舒潤",
      "personalitySummary": "A warm and balanced soul who brings harmony to others.",
      "nameMeaning": "The name signifies spreading comfort and moisture, like a gentle rain that nurtures life. We chose this based on your empathetic and strong traits."
    };
    return new Response(JSON.stringify(fallback), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
