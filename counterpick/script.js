// script.js

// 1. FUNGSI UNTUK MENYEMBUNYIKAN DETAIL HERO DAN MENAMPILKAN DAFTAR KEMBALI
function hideHero() {
  const detail = document.getElementById('hero-details');
  const list = document.getElementById('hero-list');
  
  detail.classList.add('hidden');
  list.classList.remove('hidden'); // Tampilkan kembali daftar hero!
  
  // Gulir kembali ke bagian atas halaman
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. EVENT LISTENER UNTUK TOMBOL EXIT (Dipastikan terhubung saat DOM selesai dimuat)
document.addEventListener('DOMContentLoaded', () => {
    const exitButton = document.getElementById('exit-detail');
    if (exitButton) {
        // Menghubungkan tombol kembali ke fungsi hideHero
        exitButton.addEventListener('click', hideHero);
    }
});

// 3. FETCH DATA DAN MENAMPILKAN DAFTAR HERO
fetch('data/heroes.json')
  .then(res => res.json())
  .then(heroes => {
    const listContainer = document.getElementById('hero-list');

    heroes.forEach(hero => {
      const card = document.createElement('div');
      card.className = 'hero-card';
      card.innerHTML = `
        <img src="${hero.image}" alt="${hero.name}">
        <h3>${hero.name}</h3>
        <p class="role">${hero.role}</p>
        <p class="items">🛡️ ${hero.items.join(', ')}</p>
      `;
      card.onclick = () => showHero(hero);
      listContainer.appendChild(card);
    });
  })
  .catch(err => console.error('Gagal memuat data:', err));

// 4. FUNGSI UNTUK MENAMPILKAN DETAIL HERO
function showHero(hero) {
  const detail = document.getElementById('hero-details');
  const list = document.getElementById('hero-list');
  
  // Sembunyikan daftar hero dan tampilkan detail
  list.classList.add('hidden'); 
  detail.classList.remove('hidden');

  document.getElementById('hero-name').textContent = hero.name;
  document.getElementById('hero-role').textContent = `Role: ${hero.role}`;
  document.getElementById('hero-description').textContent = hero.description; 

  const imgContainer = document.getElementById('hero-image');
  imgContainer.innerHTML = `<img src="${hero.image}" alt="${hero.name}">`;

  const skillsList = document.getElementById('hero-skills');
  const countersList = document.getElementById('hero-counters');
  skillsList.innerHTML = '';
  countersList.innerHTML = '';

  hero.skills.forEach(skill => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${skill.name}</strong><br><small>${skill.desc}</small>`;
    skillsList.appendChild(li);
  });

  hero.counters.forEach(counter => {
    const li = document.createElement('li');
    li.textContent = counter;
    countersList.appendChild(li);
  });

  window.scrollTo({ top: detail.offsetTop, behavior: 'smooth' });
}