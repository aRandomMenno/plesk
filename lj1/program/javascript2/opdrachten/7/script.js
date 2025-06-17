let pictures = [
    { name: 'web-dev', src: './pics/image-1.jpg' },
    { name: 'dev', src: './pics/image-2.jpg' },
    { name: 'programming', src: './pics/image-3.jpg' },
    { name: 'coffee', src: './pics/image-4.jpg' },
    { name: 'tea', src: './pics/image-5.jpg' },
    { name: 'dutch-flag', src: './pics/image-6.jpg' },
    { name: 'noita', src: './pics/image-7.jpg' },
    { name: 'minecraft', src: './pics/image-8.jpg' },
    { name: 'js', src: './pics/image-10.png' },
    { name: 'pizza', src: './pics/image-9.jpg' },
];

function display() {
    let images = document.getElementById('images');
    let text = '';
    pictures.forEach(picture => {
        text += `<div><img src="${picture.src}" alt="${picture.name}"><p>${picture.name}</p></div>`;
    });
    images.innerHTML = text;
}

document.addEventListener('DOMContentLoaded', display);