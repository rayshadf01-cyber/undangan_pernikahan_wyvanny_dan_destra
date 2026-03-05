const audio = document.getElementById('nasheed');

function openInvitation() {
    document.querySelector(".hero").classList.add("slide-up");
    document.getElementById("main-invitation").style.display = "block";
    document.getElementById("music-btn").style.display = "flex";
    
    if (audio) audio.play();
    
    setTimeout(() => {
        document.body.classList.remove("locked");
        document.querySelector(".hero").style.display = "none";
    }, 1000);
}

function toggleMusic() {
    const btn = document.getElementById('music-btn');
    if (audio.paused) {
        audio.play();
        btn.innerText = "🎵";
    } else {
        audio.pause();
        btn.innerText = "🔇";
    }
}

// Countdown Logic
const targetDate = new Date("March 28, 2026 09:00:00").getTime();
const timer = setInterval(() => {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(timer);
        return;
    }

    document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('mins').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('secs').innerText = Math.floor((diff % (1000 * 60)) / 1000);
}, 1000);

// WhatsApp Function
function sendToWA(tujuan) {
    const nama = document.getElementById('nama').value;
    const ucapan = document.getElementById('ucapan').value;
    
    if (!nama || !ucapan) {
        alert("Mohon isi nama dan ucapan Anda.");
        return;
    }

    const noWanita = "6281268184765";
    const noPria = "6282297577745";
    const nomor = (tujuan === 'wanita') ? noWanita : noPria;
    const pesan = `Halo, saya *${nama}*.\n\nBerikut doa restu saya:\n"${ucapan}"`;

    window.open(`https://api.whatsapp.com/send?phone=${nomor}&text=${encodeURIComponent(pesan)}`, '_blank');
}

// Story Modal Logic (Data storyData tetap sama seperti sebelumnya)
function openStory(id) {
    const modal = document.getElementById("story-modal");
    document.getElementById("modal-title").innerText = storyData[id].title;
    document.getElementById("modal-desc").innerText = storyData[id].desc;
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeStory() {
    document.getElementById("story-modal").style.display = "none";
    document.body.style.overflow = "auto";
}