// Telegram WebApp interfeysini kengaytirish
let tg = window.Telegram.WebApp;
tg.expand();

// Bekhruz uchun maxsus motivatsiya matnlari
const quotes = [
    "Dahshatli natija! 🔥",
    "To'xtamang, Bekhruz!",
    "Miya charxlanmoqda... 🧠",
    "Siz eng zo'risiz!",
    "Yangi cho'qqi sari! ✨"
];

// O'rganish uchun so'zlar ro'yxati
const words = [
    { en: "Persistence", uz: "Qat'iyat" },
    { en: "Mindset", uz: "Fikrlash tarzi" },
    { en: "Efficiency", uz: "Samaradorlik" },
    { en: "Knowledge", uz: "Bilim" },
    { en: "Success", uz: "Muvaffaqiyat" }
];

let currentIndex = 0;
let points = 450; // Rasmdagi boshlang'ich XP

// Kartani aylantirish funksiyasi
function flipCard() {
    tg.HapticFeedback.impactOccurred('medium'); // Telefon titrashi
    const card = document.querySelector('.front-card');
    card.classList.toggle('is-flipped');
}

// Keyingi so'zga o'tish mantiqi
function handleAction(isKnown) {
    if (isKnown) {
        points += 15; // To'g'ri topsa XP qo'shish
        updateUI('success');
    } else {
        updateUI('warning');
    }

    // Keyingi indeksga o'tish
    currentIndex = (currentIndex + 1) % words.length;
    
    // Progress bar va XP ni yangilash
    updateProgress();
}

function updateUI(status) {
    tg.HapticFeedback.notificationOccurred(status); // Muvaffaqiyatli yoki ogohlantiruvchi titrash
    
    // Tasodifiy motivatsiya matnini chiqarish
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const lessonTitle = document.querySelector('.lesson-title');
    if (lessonTitle) lessonTitle.innerText = quote;

    // XP ni yangilash
    document.querySelector('.xp').innerText = points + "XP";
}

function updateProgress() {
    const progressFill = document.querySelector('.progress-fill');
    let percent = ((currentIndex + 1) / words.length) * 100;
    progressFill.style.width = percent + "%";
}

// Navigatsiya tugmalarini boshqarish
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('.nav-item.active').classList.remove('active');
        this.classList.add('active');
        tg.HapticFeedback.impactOccurred('light');
    });
});
