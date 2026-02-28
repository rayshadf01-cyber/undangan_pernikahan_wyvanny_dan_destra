const audio = document.getElementById('nasheed');

function openInvitation() {
    const cover = document.querySelector(".hero");
    const mainContent = document.getElementById("main-invitation");
    const musicBtn = document.getElementById("music-btn");

    // 1. Putar musik
    if (audio) {
        audio.play();
    }

    // 2. Munculkan konten di belakang cover
    mainContent.style.display = "block";
    musicBtn.style.display = "flex";

    // 3. Jalankan animasi geser cover ke atas
    cover.classList.add("slide-up");

    // 4. Buka kunci scroll body setelah animasi selesai
    setTimeout(() => {
        document.body.classList.remove("locked");
        cover.style.display = "none"; // Hilangkan total biar ga berat
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

// Countdown
const targetDate = new Date("March 28, 2026 09:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) return;

    document.getElementById('days').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById('hours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('mins').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('secs').innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);

function sendToWA(tujuan) {
    const nama = document.getElementById('nama').value;
    const ucapan = document.getElementById('ucapan').value;
    if (!nama || !ucapan) { alert("Isi nama dan ucapan dulu!"); return; }

    const noWanita = "6281268184765";
    const noPria = "6282297577745";
    const nomorTujuan = (tujuan === 'wanita') ? noWanita : noPria;
    const targetNama = (tujuan === 'wanita') ? "Wyvanny" : "Destra";

    const pesan = `Halo ${targetNama}, saya *${nama}*.\n\nBerikut ucapan & doa restu saya:\n"${ucapan}"`;
    window.open(`https://api.whatsapp.com/send?phone=${nomorTujuan}&text=${encodeURIComponent(pesan)}`, '_blank');
}
// Data Cerita (Ganti isinya sesuai keinginan lu)
const storyData = {
    cerita1: {
        title: "Cerita berawal dari...",
        desc: "Di sini lu tulis detailnya cok, misal pertama ketemu di mana atau lewat apa."
    },
    cerita2: {
        title: "Keinginan untuk mengenal",
        desc: "Ceritain pas mulai PDKT atau mulai sering ngobrol bareng."
    },
    cerita3: {
        title: "Keadaan memperkuat keyakinan",
        desc: "Momen di mana kalian ngerasa 'wah ini dia orangnya'."
    },
    cerita4: {
        title: "Berjuang",
        desc: "Gimana suka duka kalian berdua pas lagi bareng-bareng."
    },
    cerita5: {
        title: "Kebahagiaan atas penerimaan",
        desc: "Pas akhirnya lamaran atau sepakat buat ke pelaminan."
    }
};

function openStory(id) {
    const modal = document.getElementById("story-modal");
    const title = document.getElementById("modal-title");
    const desc = document.getElementById("modal-desc");

    title.innerText = storyData[id].title;
    desc.innerText = storyData[id].desc;
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Biar ga bisa scroll pas modal buka
}

function closeStory() {
    const modal = document.getElementById("story-modal");
    modal.style.display = "none";
    
    // Buka lagi scrollnya (tapi cek dulu kalau cover udh kebuka)
    if (!document.body.classList.contains('locked')) {
        document.body.style.overflow = "auto";
    }
}

// Tutup modal kalau user klik di luar kotak
window.onclick = function(event) {
    const modal = document.getElementById("story-modal");
    if (event.target == modal) {
        closeStory();
    }
}