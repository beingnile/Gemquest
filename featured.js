let startX, scrollLeft, isDown;

const container = document.querySelector('.featured-container');
const leftButton = document.querySelector('.chevron-left');
const rightButton = document.querySelector('.chevron-right');

container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
});

container.addEventListener('mouseleave', () => {
    isDown = false;
});

container.addEventListener('mouseup', () => {
    isDown = false;
});

container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    container.scrollLeft = scrollLeft - walk;
});

leftButton.addEventListener('click', () => {
    container.scrollBy({
        left: -window.innerWidth,
        behavior: 'smooth'
    });
});

rightButton.addEventListener('click', () => {
    container.scrollBy({
        left: window.innerWidth,
        behavior: 'smooth'
    });
});