const btnMobile = document.getElementById('btn-mobile');

function ativarMenu(){
    const nav = document.getElementById('nav');
    nav.classList.toggle('ativo');
}

btnMobile.addEventListener('click', ativarMenu);