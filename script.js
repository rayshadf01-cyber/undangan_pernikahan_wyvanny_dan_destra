// 1. Ambil Nama Tamu dari URL
const urlParams = new URLSearchParams(window.location.search);
const guestName = urlParams.get('to');
if (guestName) {
    document.getElementById('nama-tamu-display').innerText = guestName;
    document.getElementById('namaTamu').value = guestName;
}

// 2. Kontrol Audio & Buka Undangan
var musik = document.getElementById("bg-music");
var btnAudio = document.getElementById("audio-control");

function bukaUndangan() {
    const cover = document.getElementById('cover');
    const mainContent = document.getElementById('main-content');
    const btnAudio = document.getElementById("audio-control");

    // Efek transisi halus
    cover.style.opacity = '0';
    cover.style.pointerEvents = 'none'; // Biar klik nembus ke bawah

    setTimeout(() => {
        cover.style.display = 'none';
        mainContent.style.display = 'block';
        
        // Paksa scroll ke paling atas pas kebuka
        window.scrollTo(0, 0);
        
        // Re-enable scrolling
        document.body.style.overflowY = 'auto';
        document.documentElement.style.overflowY = 'auto'; 
        
        musik.play().catch(e => console.log("Autoplay dicegah browser"));
        btnAudio.style.display = 'block';
    }, 1000);
}

function toggleAudio() {
    if (musik.paused) { musik.play(); btnAudio.innerHTML = "🎵"; } 
    else { musik.pause(); btnAudio.innerHTML = "🔇"; }
}

// 3. Countdown Timer
const targetDate = new Date("mart 28, 2026 09:00:00").getTime();
setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) return;

    document.getElementById("hari").innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById("jam").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("menit").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("detik").innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);

// 4. Animasi Scroll
const reveals = document.querySelectorAll('.reveal');
const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
    });
}, revealOptions);
reveals.forEach(reveal => revealOnScroll.observe(reveal));

// 5. RSVP via WhatsApp
// PERHATIKAN TANDA KURUNG DI BAWAH INI, HARUS ADA KATA 'nomorWA'
function kirimRSVP(nomorWA) {
    var nama = document.getElementById('namaTamu').value;
    var kehadiran = document.getElementById('kehadiran').value;
    var jumlah = document.getElementById('jumlahTamu').value;
    var ucapan = document.getElementById('ucapan').value;

    // Ngecek form udah diisi apa belum
    if(!nama || !kehadiran) { 
        alert("Nama dan Kehadiran wajib diisi!"); 
        return; 
    }

    // Format pesan WhatsApp
    var pesan = `Halo, saya ingin konfirmasi kehadiran.%0A%0A*Nama:* ${nama}%0A*Hadir:* ${kehadiran}%0A*Jumlah:* ${jumlah} orang%0A*Ucapan & Doa:* ${ucapan}`;
    
    // Buka WhatsApp pake nomor yang dilempar dari tombol HTML
    window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank');
}

// 6. Share Link Undangan
function shareWA() {
    var linkUndangan = window.location.href.split('?')[0];
    var pesan = `Bismillahirrahmanirrahim.%0ATanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.%0A%0ABuka tautan berikut untuk info detail:%0A${linkUndangan}%0A%0ATerima kasih.`;
    window.open(`https://wa.me/?text=${pesan}`, '_blank');

}
