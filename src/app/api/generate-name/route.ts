import { NextResponse } from "next/server";

export const runtime = "edge";

// Mock data for names
const MOCK_NAMES = [
  { koreanName: "김민준", hanja: "金敏俊", meaning: "민첩하고 뛰어난 재능을 가진 사람", personality: "당신은 빠르고 정확한 판단력을 가지고 있으며, 어떤 상황에서도 유연하게 대처하는 능력이 뛰어납니다." },
  { koreanName: "이서연", hanja: "李瑞연", meaning: "상서로운 인연을 맺는 사람", personality: "당신은 주변 사람들에게 따뜻한 영향을 주며, 좋은 관계를 맺는 것을 중요하게 생각합니다." },
  { koreanName: "박지호", hanja: "朴智浩", meaning: "지혜롭고 호연지기를 가진 사람", personality: "당신은 깊은 통찰력과 넓은 마음을 가지고 있으며, 리더십을 발휘하는 스타일입니다." },
  { koreanName: "최수아", hanja: "崔秀雅", meaning: "빼어나고 우아한 사람", personality: "당신은 세련된 감각과 우아한 태도를 지니고 있으며, 예술적인 면모가 돋보입니다." },
  { koreanName: "정우진", hanja: "鄭宇真", meaning: "우주의 참된 이치를 깨닫는 사람", personality: "당신은 진리를 탐구하고 깊이 있는 대화를 즐기며, 진정성 있는 삶을 추구합니다." },
  { koreanName: "강하은", hanja: "姜夏은", meaning: "여름처럼 열정적이고 은혜로운 사람", personality: "당신은 언제나 에너지가 넘치고 주변 사람들에게 긍정적인 기운을 전파합니다." },
  { koreanName: "조현우", hanja: "趙賢宇", meaning: "어진 마음으로 세상을 품는 사람", personality: "당신은 배려심이 깊고 이해심이 많아, 누구에게나 편안함을 주는 존재입니다." },
  { koreanName: "윤서준", hanja: "尹瑞俊", meaning: "상서롭고 준수한 사람", personality: "당신은 호감 가는 외모와 매너를 갖추고 있으며, 어디서나 인기가 많은 타입입니다." },
];

export async function POST(request: Request) {
  try {
    const { answers } = await request.json();

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
    }

    // ------------------------------------------------------------------
    // TODO: Replace with Real Claude API Logic
    // ------------------------------------------------------------------
    // const response = await fetch("https://api.anthropic.com/v1/messages", {
    //   method: "POST",
    //   headers: {
    //     "x-api-key": process.env.ANTHROPIC_API_KEY!,
    //     "anthropic-version": "2023-06-01",
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     model: "claude-3-haiku-20240307",
    //     max_tokens: 1000,
    //     messages: [
    //       { role: "user", content: `Analyze these answers: ${answers.join(", ")} and suggest a Korean name...` }
    //     ]
    //   })
    // });
    // ------------------------------------------------------------------

    // Mock Logic: Use the sum of answers to pick a name deterministically
    const sum = answers.reduce((a: number, b: number) => a + b, 0);
    const selectedName = MOCK_NAMES[sum % MOCK_NAMES.length];

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json(selectedName);
  } catch (error) {
    console.error("Error generating name:", error);
    return NextResponse.json(
      { error: "Failed to generate name" },
      { status: 500 }
    );
  }
}
