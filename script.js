// Função para o botao mobile
const btnMobile = document.getElementById('btn-mobile');

function ativarMenu(){
    const nav = document.getElementById('nav');
    nav.classList.toggle('ativo');
}

btnMobile.addEventListener('click', ativarMenu);

//-----------------------------------------

let currentPage = 1;

async function loadInitialAnimes() {
  try {
    const response = await fetch(`https://kitsu.io/api/edge/anime?page[limit]=12&page[offset]=${(currentPage - 1) * 12}`);
    const data = await response.json();
    const animes = data.data;
    if (!animes || animes.length === 0) {
      document.getElementById('animeInfo').innerHTML = '<p>Nenhum anime encontrado.</p>';
      return;
    }

    let animeInfo = '';
    animes.forEach(anime => {
      const animeName = anime.attributes.canonicalTitle;
      const imageUrl = anime.attributes.posterImage.original;

      animeInfo += `
        <div class="animeResult">
          <div class="gradientOverlay"></div>
          <img src="${imageUrl}" alt="${animeName} Poster">
          <div class="animeInfoOverlay">
            <h2>${animeName}</h2>
          </div>
        </div>
      `;
    });

    document.getElementById('animeInfo').innerHTML = animeInfo;
    updatePagination();
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

async function goToPage(page) {
  currentPage = page;
  await loadInitialAnimes();
}

function updatePagination() {
  document.getElementById('currentPage').textContent = `${currentPage}`;
}

async function searchAnime() {
  const searchInput = document.getElementById('searchInput').value.trim();
  if (!searchInput) {
    return;
  }

  try {
    const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${searchInput}&page[limit]=12`);
    const data = await response.json();
    const animes = data.data;
    if (!animes || animes.length === 0) {
      document.getElementById('animeInfo').innerHTML = '<p>Nenhum anime encontrado.</p>';
      return;
    }

    let animeInfo = '';
    animes.forEach(anime => {
      const animeName = anime.attributes.canonicalTitle;
      const imageUrl = anime.attributes.posterImage.original;

      animeInfo += `
        <div class="animeResult">
          <div class="gradientOverlay"></div>
          <img src="${imageUrl}" alt="${animeName} Poster">
          <div class="animeInfoOverlay">
            <h2>${animeName}</h2>
          </div>
        </div>
      `;
    });

    document.getElementById('animeInfo').innerHTML = animeInfo;
    updatePagination();
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

const searchInput = document.getElementById('searchInput');
let typingTimer;
const doneTypingInterval = 500; // Tempo de espera após a digitação (em milissegundos)

window.onload = loadInitialAnimes;

searchInput.addEventListener('keyup', function() {
  clearTimeout(typingTimer);
  if (searchInput.value) {
    typingTimer = setTimeout(searchAnime, doneTypingInterval);
  }
});

searchInput.addEventListener('keydown', function() {
  clearTimeout(typingTimer);
});

document.getElementById('prevPage').addEventListener('click', async function() {
  if (currentPage > 1) {
    currentPage--;
    await loadInitialAnimes();
  }
});

document.getElementById('nextPage').addEventListener('click', async function() {
  currentPage++;
  await loadInitialAnimes();
});