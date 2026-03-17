const questions = [
    {
        id: 1,
        question: "How do you start your ideal morning?",
        image: "https://via.placeholder.com/600x400?text=Morning+Vibe", // 나중에 실제 이미지로 교체 가능
        optionA: "Peaceful Meditation",
        optionB: "Energetic Workout"
    },
    {
        id: 2,
        question: "When facing a new challenge, you are...",
        image: "https://via.placeholder.com/600x400?text=Challenge",
        optionA: "A Careful Planner",
        optionB: "A Bold Adventurer"
    },
    {
        id: 3,
        question: "Which atmosphere do you prefer?",
        image: "https://via.placeholder.com/600x400?text=Atmosphere",
        optionA: "Quiet Library",
        optionB: "Vibrant Festival"
    }
    // 더 많은 질문을 이 형식으로 추가할 수 있습니다.
];

if (typeof module !== 'undefined') {
    module.exports = questions;
}
