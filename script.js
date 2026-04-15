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

// O'rganish uchun so'zlar ro'yxati (Buni keyinchalik bazadan olishingiz mumkin)
const words = [
    { en: "Consistency", uz: "Izchillik" },
    { en: "Ambition", uz: "Intilish" },
    { en: "Experience", uz: "Tajriba" },
    { en: "Success", uz: "Muvaffaqiyat" },
    { en: "Discipline", uz: "Intizom" }
];

let currentIndex = 0;
let points = 450; // Rasmdagi boshlang'ich XP qiymati

// Kartani aylantirish funksiyasi
function flipCard() {
    // Telefon titrashi (Haptic Feedback) - interaktivlikni oshiradi
    tg.HapticFeedback.impactOccurred('medium'); 
    const card = document.getElementById('card');
    card.classList.toggle('is-flipped');
}

// Keyingi so'zga o'tish mantiqi
function nextWord(isKnown) {
    if (isKnown) {
        points += 15; // To'g'ri topsa XP qo'shish
        updateUI('success');
    } else {
        updateUI('warning');
    }

    // Keyingi indeksga o'tish
    currentIndex = (currentIndex + 1) % words.length;
    
    // Kartani asliga (front) qaytarish
    const card = document.getElementById('card');
    card.classList.remove('is-flipped');

    // So'zni biroz kechikish bilan yangilash (karta aylanayotganda o'zgarmasligi uchun)
    setTimeout(() => {
        document.getElementById('word').innerText = words[currentIndex].en;
        document.getElementById('translation').innerText = words[currentIndex].uz;
        document.querySelector('.level').innerText = `Lesson 1: ${currentIndex + 1}/${words.length}`;
    }, 250);
}

// Interfeysni yangilash
function updateUI(status) {
    // Muvaffaqiyatli yoki ogohlantiruvchi titrash
    tg.HapticFeedback.notificationOccurred(status); 
    
    // Tasodifiy motivatsiya matnini chiqarish
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const motivationEl = document.getElementById('motivation');
    if (motivationEl) {
        motivationEl.innerText = quote;
        // Animatsiya qo'shish
        motivationEl.classList.remove('fade-in');
        void motivationEl.offsetWidth; // Reflow
        motivationEl.classList.add('fade-in');
    }

    // XP ni yangilash
    const xpEl = document.getElementById('xp');
    if (xpEl) xpEl.innerText = points;
}

// Pastki navigatsiya tugmalari uchun interaktivlik
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('.nav-item.active').classList.remove('active');
        this.classList.add('active');
        tg.HapticFeedback.impactOccurred('light');
    });
});

// Ilovani boshlang'ich holatga keltirish
window.onload = () => {
    document.getElementById('word').innerText = words[0].en;
    document.getElementById('translation').innerText = words[0].uz;
    document.getElementById('xp').innerText = points;
};
