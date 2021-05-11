"use strict";

import gallery from "./gallery-items.js";

const KEYCODE_ESC = 27;
const KEYCODE_left = 37;
const KEYCODE_right = 39;

const refs = {
    list: document.querySelector(".gallery"),
    Lightbox: document.querySelector(".lightbox"),
    lightboxImage: document.querySelector(".lightbox__image"),
    lightboxContent: document.querySelector(".lightbox__content"),
    lightBoxBtn: document.querySelector(".lightbox__button")
};

const galleryProcess = gallery => {
    return gallery.map(({ preview, original, description }) => {
        const localRefs = {
            item: document.createElement("li"),
            link: document.createElement("a"),
            image: document.createElement("img"),
            span: document.createElement("span"),
            i: document.createElement("i")
        };

        localRefs.item.classList.add("gallery__item");
        localRefs.link.classList.add("gallery__link");
        localRefs.link.setAttribute("href", original);
        localRefs.image.classList.add("gallery__image");
        localRefs.image.setAttribute("src", preview);
        localRefs.image.setAttribute("data-source", original);
        localRefs.image.setAttribute("alt", description);
        localRefs.span.classList.add("gallery__icon");
        localRefs.i.textContent = "zoom out map";
        localRefs.span.appendChild(localRefs.i);
        localRefs.link.appendChild(localRefs.image);
        localRefs.link.appendChild(localRefs.span);
        localRefs.item.appendChild(localRefs.link);

        return localRefs.item;
    });
};

const items = galleryProcess(gallery);
items.map(item => {
    refs.list.appendChild(item);
});

const handleClick = e => {

    e.preventDefault();
    const data = e.target.dataset.source;
    const image = refs.lightboxImage.cloneNode(false);
    image.setAttribute("src", data);
    image.setAttribute("alt", e.target.alt);
    refs.lightboxContent.innerHTML = "";
    refs.lightboxContent.append(image);
    refs.Lightbox.classList.add("is-open");

};

const closeHandler = () => {
    refs.Lightbox.classList.remove("is-open");
};

const handleKeyup = e => {
    if (e.keyCode == KEYCODE_ESC) {
        console.log("key ESC pressed");
        closeHandler();
    }
    // Image left, right 
    if (
        e.keyCode == KEYCODE_right && refs.Lightbox.classList.contains("is-open")
    ) {
        let index = items.indexOf(link.src);
        if (index != items.length - 1) {
            index++;
            link.src = items[index];
        }
        console.log(index);
    }

    if (
        e.keyCode == KEYCODE_left && refs.Lightbox.classList.contains("is-open")
    ) {
        let idx = items.indexOf(link.src);
        if (idx <= -1 || idx === 0 || idx == link.length - 1) {
            idx == items.length - 1;
            link.src = items[idx];
        } else {
            link.src = items[--idx];
        }
    }
};

const contentClickHandler = e => {
    if (e.target !== e.currentTarget) {
        return closeHandler();
    }

};


refs.list.addEventListener("click", handleClick);
refs.lightBoxBtn.addEventListener("click", closeHandler);
window.addEventListener("keyup", handleKeyup);
refs.lightboxContent.addEventListener("click", contentClickHandler);
