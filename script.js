let tg = window.Telegram.WebApp;
tg.expand();

const words = [
    { en: "Consistency", uz: "Izchillik" },
    { en: "Persistence", uz: "Qat'iyat" },
    { en: "Mindset", uz: "Fikrlash tarzi" },
    { en: "Efficiency", uz: "Samaradorlik" },
    { en: "Ambition", uz: "Intilish" }
];

let idx = 0;
let xp = 450;

// 1. Audio funksiyasi (Text-to-Speech)
function speakWord(event) {
    event.stopPropagation(); // Kartani aylanib ketishidan saqlaydi
    const msg = new SpeechSynthesisUtterance(words[idx].en);
    msg.lang = 'en-US';
    msg.rate = 0.8;
    window.speechSynthesis.speak(msg);
    tg.HapticFeedback.impactOccurred('light');
}

// 2. 3D Tilt (Egilish) effekti
const cardWrapper = document.getElementById('tilt-card');
cardWrapper.addEventListener('mousemove', (e) => {
    const { offsetWidth: width, offsetHeight: height } = cardWrapper;
    const { offsetX: x, offsetY: y } = e;
    const xRotation = ((y - height / 2) / height) * 20;
    const yRotation = ((x - width / 2) / width) * -20;
    cardWrapper.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
});

cardWrapper.addEventListener('mouseleave', () => {
    cardWrapper.style.transform = `rotateX(0deg) rotateY(0deg)`;
});

// 3. Flip Card
function flipCard() {
    tg.HapticFeedback.impactOccurred('medium');
    document.getElementById('card').classList.toggle('is-flipped');
}

// 4. Response & Confetti
function handleResponse(isKnown) {
    if (isKnown) {
        xp += 15;
        document.getElementById('xp').innerText = xp;
        tg.HapticFeedback.notificationOccurred('success');
        
        // Bayramona effekt (Confetti)
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00f2ff', '#ff00ff', '#facc15']
        });
    } else {
        tg.HapticFeedback.notificationOccurred('warning');
    }

    // Keyingi so'zga o'tish animatsiyasi
    idx = (idx + 1) % words.length;
    const card = document.getElementById('card');
    card.classList.remove('is-flipped');

    setTimeout(() => {
        document.getElementById('word').innerText = words[idx].en;
        document.getElementById('translation').innerText = words[idx].uz;
    }, 200);
}
