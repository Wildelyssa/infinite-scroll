const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 20;
//Public apiKey: Unsplash API
const apiKey = 'wCFDIBkXPEjyujgAaN5PUAjR91gOS51gE83_P6tdqIY'; 
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
   imagesLoaded ++;
   if (imagesLoaded === totalImages) {
       ready = true;
       loader.hidden = true;
   }
}

//Helper Function to set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) { 
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
//Run function for each object in photosArray
photosArray.forEach((photo) => {
    //Create <a> element: link to Unsplash image
    const item = document.createElement('a');
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank'
    });
    //Create <img> element
    const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description
    });
//Event Listener- check when each img has finished loading
    img.addEventListener('load', imageLoaded);
//Put <img> inside <a>, put both inside image container
    item.appendChild(img);
    imageContainer.appendChild(item);
});
}

//Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await 
        response.json();
        displayPhotos(); 
    } catch (error) {
    }
}

//Infinite Scroll Function, OnScroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

//on Load
getPhotos();
