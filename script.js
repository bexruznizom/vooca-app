let tg = window.Telegram.WebApp;
tg.expand(); // Ilovani to'liq ochish

function flipCard() {
    let x = document.getElementById("translation");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function next() {
    alert("Keyingi so'zga o'tamiz!");
    // Bu yerga keyin bazani ulaymiz
}