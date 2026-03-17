// K-Soul Name Questions Database
const questions = [
    {
        id: 1,
        question: "Which path would you take?",
        optionA: "Join Squid Game for the 45.6 billion prize",
        optionB: "Marry into a chaebol family like in Queen of Tears",
        imageA: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Squid+Game",
        imageB: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Chaebol+Family",
        traitA: "Strong and Indomitable (강인하고 불굴의)",
        traitB: "Patient and Heart-wrenching (인내심 강하고 눈물겨운)"
    },
    {
        id: 2,
        question: "Which fateful encounter would you choose?",
        optionA: "Crash-land in North Korea and meet a perfect guy like Ri Jeong-hyeok",
        optionB: "Fake a blind date in Business Proposal and end up falling for the CEO",
        imageA: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Crash+Landing",
        imageB: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Business+Proposal",
        traitA: "Fateful and Romantic (운명적이고 낭만적인)",
        traitB: "Clever and Witty (영리하고 재치 있는)"
    },
    {
        id: 3,
        question: "Where would you struggle to survive?",
        optionA: "Survive a zombie apocalypse in high school like All of Us Are Dead",
        optionB: "Get dragged into the illegal loan shark world in Bloodhounds and build real brotherhood",
        imageA: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Zombie+Apocalypse",
        imageB: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Bloodhounds",
        traitA: "Brave and Sacrificial (용감하고 희생적인)",
        traitB: "Loyal and Devoted (의리 깊고 충성스러운)"
    },
    {
        id: 4,
        question: "Which ending touches you more?",
        optionA: "Queen of Tears ending: tearful reunion and happy life afterward",
        optionB: "Crash Landing on You ending: separated across borders, longing for each other forever",
        imageA: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Queen+of+Tears+End",
        imageB: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=CLOY+End",
        traitA: "Emotional and Reunion-oriented (감성적이고 재회 지향적인)",
        traitB: "Poignant and Eternally Longing (애틋하고 영원한 그리움의)"
    },
    {
        id: 5,
        question: "What goal would you pursue?",
        optionA: "Re-enter the Squid Game in Season 2/3 and aim to become the Front Man",
        optionB: "Spend over 10 years plotting perfect revenge like The Glory",
        imageA: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Front+Man",
        imageB: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=The+Glory",
        traitA: "Cold-headed and Strategic (냉철하고 전략적인)",
        traitB: "Persistent and Revengeful (집요하고 복수심 강한)"
    },
    {
        id: 6,
        question: "How would you face your life?",
        optionA: "Become a genius lawyer like Extraordinary Attorney Woo",
        optionB: "Overcome burnout together in Doctor Slump",
        imageA: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Attorney+Woo",
        imageB: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Doctor+Slump",
        traitA: "Genius and Insightful (천재적이고 통찰력 있는)",
        traitB: "Healing and Empathetic (치유적이고 공감 넘치는)"
    },
    {
        id: 7,
        question: "Where would you compete?",
        optionA: "Compete in Physical: 100 for ultimate strength and prize money",
        optionB: "Battle it out in Culinary Class Wars to become the top chef",
        imageA: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Physical+100",
        imageB: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Culinary+Class+Wars",
        traitA: "Steel-hard and Determined (강철같이 단단하고 투지 넘치는)",
        traitB: "Creative and Artistic (창의적이고 예술적인)"
    },
    {
        id: 8,
        question: "Which battle is yours?",
        optionA: "Survive the Red Light, Green Light game in Squid Game",
        optionB: "Fight to stay fully human in All of Us Are Dead instead of turning hybrid zombie",
        imageA: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Red+Light+Green+Light",
        imageB: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Human+vs+Zombie",
        traitA: "Focused and Cool-headed (집중력 강하고 냉정한)",
        traitB: "Humanistic and Indomitable (인간적이고 불굴의)"
    },
    {
        id: 10,
        question: "Which love story is yours?",
        optionA: "Become the couple like Baek Hyun-woo and Hong Hae-in in Queen of Tears",
        optionB: "Live an epic, era-spanning destined love like When Life Gives You Tangerines",
        imageA: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Hyun-woo+Hae-in",
        imageB: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Tangerines",
        traitA: "Passionate and Dramatic (열정적이고 드라마틱한)",
        traitB: "Lyrical and Transcending Eras (서정적이고 시대를 초월한)"
    },
    {
        id: 9,
        question: "Which romance mission do you choose?",
        optionA: "Start a romance with a cold hotel CEO in King the Land",
        optionB: "Experience perfect romance through a virtual boyfriend service in Boyfriend on Demand",
        imageA: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=King+the+Land",
        imageB: "https://placehold.jp/24/3b82f6/ffffff/600x400.png?text=Boyfriend+on+Demand",
        traitA: "Warm and Transformative (따뜻하고 변화시키는)",
        traitB: "Idealistic and Dreamy (이상적이고 꿈같은)"
    }
];

if (typeof module !== 'undefined') {
    module.exports = questions;
}
