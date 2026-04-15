let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

const words = [
    {en: "Consistency", uz: "Izchillik"},
    {en: "Ability", uz: "Qobiliyat"},
    {en: "Experience", uz: "Tajriba"},
    {en: "Goal", uz: "Maqsad"},
    {en: "Discipline", uz: "Intizom"},
    {en: "Success", uz: "Muvaffaqiyat"},
    {en: "Knowledge", uz: "Bilim"},
    {en: "Health", uz: "Sog'liq"},
    {en: "Future", uz: "Kelajak"},
    {en: "Mindset", uz: "Fikrlash tarzi"}
];

let currentIndex = 0;
let score = 0;

function flipCard() {
    tg.HapticFeedback.impactOccurred('light');
    document.getElementById('card').classList.toggle('is-flipped');
}

function handleAction(isKnown) {
    tg.HapticFeedback.notificationOccurred(isKnown ? 'success' : 'warning');
    
    if(isKnown) {
        score += 10;
        document.getElementById('score').innerText = score;
    }

    // Progress update
    currentIndex++;
    if(currentIndex >= words.length) {
        currentIndex = 0;
        alert("Tabriklaymiz! Barcha so'zlarni tugatdingiz.");
    }

    const progressPercent = ((currentIndex + 1) / words.length) * 100;
    document.getElementById('progress').style.width = `${progressPercent}%`;
    document.getElementById('word-count').innerText = `${currentIndex + 1}/${words.length}`;

    // Reset card
    document.getElementById('card').classList.remove('is-flipped');
    
    setTimeout(() => {
        document.getElementById('word').innerText = words[currentIndex].en;
        document.getElementById('translation').innerText = words[currentIndex].uz;
    }, 200);
}

// Initial setup
document.getElementById('word-count').innerText = `1/${words.length}`;
