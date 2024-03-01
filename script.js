const btnMobile = document.getElementById('btn-mobile');

function ativarMenu(){
    const menu = document.querySelector('menu');
    menu.classList.toggle('ativo');
}

btnMobile.addEventListener('click', ativarMenu);