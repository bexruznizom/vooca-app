let tg = window.Telegram.WebApp;
tg.expand();

const words = [
    {en: "Consistency", uz: "Izchillik"},
    {en: "Ambition", uz: "Intilish"},
    {en: "Experience", uz: "Tajriba"},
    {en: "Success", uz: "Muvaffaqiyat"},
    {en: "Discipline", uz: "Intizom"}
];

let index = 0;
let points = 0;

function flipCard() {
    tg.HapticFeedback.impactOccurred('medium');
    document.getElementById('card').classList.toggle('is-flipped');
}

function handleAction(known) {
    if(known) {
        points += 10;
        document.getElementById('score').innerText = points;
        tg.HapticFeedback.notificationOccurred('success');
    }

    index = (index + 1) % words.length;
    document.getElementById('progress-text').innerText = `${index + 1}/${words.length}`;

    // Kartani joyiga qaytarish
    document.getElementById('card').classList.remove('is-flipped');

    // So'zni biroz kechikish bilan almashtirish (animatsiya uchun)
    setTimeout(() => {
        document.getElementById('word').innerText = words[index].en;
        document.getElementById('translation').innerText = words[index].uz;
    }, 200);
}
