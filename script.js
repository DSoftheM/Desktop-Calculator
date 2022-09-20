const btn = document.querySelector('.button');
const card = document.querySelector('.card');
btn.onclick = () => {
    card.classList.toggle('hide');
}