let tg = window.Telegram.WebApp;
tg.expand();
tg.enableClosingConfirmation();

// Bekhruz uchun maxsus motivatsiyalar
const motivationQuotes = [
    "Dahshatli natija! 🔥",
    "To'xtamang, Bekhruz!",
    "Miya charxlanmoqda... 🧠",
    "Siz eng zo'risiz!",
    "Yangi cho'qqi sari! ✨"
];

const vocabulary = [
    {en: "Persistence", uz: "Qat'iyat"},
    {en: "Mindset", uz: "Fikrlash tarzi"},
    {en: "Efficiency", uz: "Samaradorlik"},
    {en: "Knowledge", uz: "Bilim"},
    {en: "Success", uz: "Muvaffaqiyat"}
];

let currentIndex = 0;
let points = 0;

function flipCard() {
    tg.HapticFeedback.impactOccurred('medium');
    document.getElementById('card').classList.toggle('is-flipped');
}

function handleAction(isCorrect) {
    if(isCorrect) {
        points += 15;
        document.getElementById('score').innerText = points;
        
        // Motivatsiyani o'zgartirish
        const quote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)];
        const motEl = document.getElementById('motivation');
        motEl.innerText = quote;
        
        tg.HapticFeedback.notificationOccurred('success');
    } else {
        tg.HapticFeedback.notificationOccurred('warning');
    }

    // Keyingi so'zga o'tish
    currentIndex = (currentIndex + 1) % vocabulary.length;
    
    // Progress bar
    let progress = ((currentIndex + 1) / vocabulary.length) * 100;
    document.getElementById('progress').style.width = progress + "%";

    // Kartani asliga qaytarish va so'zni yangilash
    const card = document.getElementById('card');
    card.classList.remove('is-flipped');

    setTimeout(() => {
        document.getElementById('word').innerText = vocabulary[currentIndex].en;
        document.getElementById('translation').innerText = vocabulary[currentIndex].uz;
    }, 250);
}
