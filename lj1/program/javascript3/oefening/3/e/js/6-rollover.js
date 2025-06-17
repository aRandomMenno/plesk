"use strict";

const colorImages = [
    './images/basset1-kleur.jpg',
    './images/basset2-kleur.jpg',
    './images/basset3-kleur.jpg'
];

const bwImages = [
    './images/basset1-zw.jpg',
    './images/basset2-zw.jpg',
    './images/basset3-zw.jpg'
];

function handleImageHover(event) {
    const imageId = event.target.id;
    const index = parseInt(imageId.replace('basset', '')) - 1;
    
    if (event.type === 'mouseenter') {
        event.target.src = colorImages[index];
    } else if (event.type === 'mouseleave') {
        event.target.src = bwImages[index];
    }
}

for (let i = 1; i <= 3; i++) {
    const img = document.getElementById(`basset${i}`);
    img.addEventListener('mouseenter', handleImageHover);
    img.addEventListener('mouseleave', handleImageHover);
}
