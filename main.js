// Gallery

import gallery from './gallery-items.js';
const ulRef = document.querySelector('.js-gallery');
const lightbox = document.querySelector('.js-lightbox');
const btn = document.querySelector('button[data-action ="close-lightbox"]');
const Content = document.querySelector('.lightbox__content');
const overlay = document.querySelector('.lightbox__overlay');
const newGallery = gallery.reduce((item, { preview, description, original }) => {
    return (item += `<li class="gallery__item">
  <a class="gallery__link" href="${original}" >
  <img loading="lazy" class="gallery__image"
  src="${preview}"
  alt="${description}"
  />
  </a>
  </li>`);
}, '');
ulRef.innerHTML = newGallery;

const img = document.querySelector('.gallery__image');

ulRef.addEventListener('click', event);

// Open big image
let element;
function event(e) {
    e.preventDefault();
    if (e.target.className !== img.className) {
        return;
    }
    const bigImg = e.target.alt;
    for (let i = 0; i < gallery.length; i++) {
        if (gallery[i].description === bigImg) {
            element = gallery[i].original;
        }
    }

    lightbox.classList.add('is-open');
    Content.innerHTML = `<img class="lightbox__image"
    src="${element}"
    alt="${bigImg}"
  />`;

}

// Close big image
function CloseBigImg() {
    const lightboxImage = document.querySelector('.lightbox__image');
    lightbox.classList.remove('is-open');
    lightboxImage.alt = '';
    lightboxImage.src = '';
    console.log('Exit');
}
const closeModal = document.querySelector('[data-action="close-lightbox"]');
closeModal.addEventListener('click', CloseBigImg);

overlay.addEventListener('click', CloseBigImg);

btn.addEventListener('click', CloseBigImg);

// Control buttons
document.addEventListener('keyup', key => {
    const lightboxImage = document.querySelector('.lightbox__image');

    // Button Esc //
    if (key.code === 'Escape' || key.code === 'Space') {
        CloseBigImg()
    }
    if (lightbox.className.includes('is-open')) {
        const mapOriginal = gallery.map(value => value.original);
        const indexNum = mapOriginal.indexOf(lightboxImage.src);

        // Arrow left
        const mapDelLight = mapOriginal.length - 1;
        if (key.code === 'ArrowLeft') {
            if (key.target.className === img.className) {
                return;
            }
            const indexLeft = indexNum - 1;
            lightboxImage.src = mapOriginal[indexLeft];
            if (indexNum === 0) {
                lightboxImage.src = mapOriginal[mapDelLight];
            }
        }

        // Arrow right
        if (key.code === 'ArrowRight') {
            if (key.target.className === img.className) {
                return;
            }
            const indexRight = indexNum + 1;
            lightboxImage.src = mapOriginal[indexRight];
            if (indexRight === mapOriginal.length) {
                lightboxImage.src = mapOriginal[0];
            }
        }
        console.log(indexNum);
    }
});

