// ============ COUNTDOWN ============
const birthday = new Date("2025-09-01T00:00:00");

function updateCountdown(){
  const now = new Date();
  let diff = birthday - now;

  if(diff < 0) {
    document.getElementById("countdownText").textContent = "⩇⩇:⩇⩇";
    launchConfetti();
    spawnBalloons();
    startTyping();
    clearInterval(timer);
    return;
  }

  const days = Math.floor(diff / (1000*60*60*24));
  diff -= days * (1000*60*60*24);
  const hours = Math.floor(diff / (1000*60*60));
  diff -= hours * (1000*60*60);
  const minutes = Math.floor(diff / (1000*60));
  diff -= minutes * (1000*60);
  const seconds = Math.floor(diff / 1000);

  document.getElementById("days").textContent = String(days).padStart(2,"0");
  document.getElementById("hours").textContent = String(hours).padStart(2,"0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2,"0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2,"0");
}
const timer = setInterval(updateCountdown, 1000);
updateCountdown();


// ============ MUSIC CONTROL ============
const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playBtn");
let playing = false;

playBtn.addEventListener("click", () => {
  if(!playing){
    music.play();
    playBtn.textContent = "หยุดเพลง";
  } else {
    music.pause();
    playBtn.textContent = "กดปุ่มเพื่อฟังเพลง ▶︎ •၊၊||၊|။||||။‌‌‌‌‌၊|•";
  }
  playing = !playing;
});


// ============ LIGHTBOX ============
document.querySelectorAll(".swiper-slide img").forEach(img => {
  img.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.inset = 0;
    overlay.style.background = "rgba(0,0,0,0.9)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.cursor = "zoom-out";
    overlay.style.zIndex = "9999";

    overlay.innerHTML = `
      <img src="${img.src}" 
           style="max-width:90%; max-height:90%; border-radius:12px; box-shadow:0 8px 30px rgba(0,0,0,0.8)">
    `;

    overlay.addEventListener("click", () => overlay.remove());
    document.body.appendChild(overlay);
  });
});


// ============ CONFETTI ============
function launchConfetti(){
  const duration = 5 * 1000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}


// ============ BALLOONS ============
function spawnBalloons(){
  const container = document.getElementById("balloonContainer");
  for(let i=0;i<15;i++){
    const balloon = document.createElement("div");
    balloon.innerHTML = "🎈";
    balloon.style.position="absolute";
    balloon.style.left = Math.random()*100+"%";
    balloon.style.fontSize = (30+Math.random()*30)+"px";
    balloon.style.animation = `floatUp ${5+Math.random()*5}s linear forwards`;
    container.appendChild(balloon);
    setTimeout(()=>balloon.remove(),10000);
  }
}

// สร้าง keyframe
const style = document.createElement("style");
style.innerHTML = `
@keyframes floatUp {
  from { transform: translateY(0); opacity:1 }
  to { transform: translateY(-120vh); opacity:0 }
}`;
document.head.appendChild(style);


// ============ TYPING EFFECT ============
const message = "สุขสันต์วันเกิดนะ\nอยู่ด้วยกันไปทุกๆปีเลยนะ\nรักเธอที่สุด";
let index = 0;
function startTyping(){
  const typed = document.getElementById("typedText");
  const interval = setInterval(()=>{
    typed.textContent += message[index];
    index++;
    if(index >= message.length) clearInterval(interval);
  },100);
}


// ============ SWIPER ============
const swiper = new Swiper(".mySwiper", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
