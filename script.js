// Unsplash API
const count = 30;
const apiKey = '';
const API_Url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&orientation=landscape`;

// https://api.unsplash.com/photos/random/?client_id=Q2IYI00-m9qT27QSlR7V_do1vJzYpuzJBUKIVoDZpQU&count=30&orientation=landscape

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let loadComplete = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages) {
        loader.hidden = true;
        loadComplete = true;
        imagesLoaded = 0;
    }
}

// Create the links and photos from the response and add to the DOM
function displayPhotos() {
    totalImages = photosArray.length;
    // imagesLoaded = 0;
    photosArray.forEach(photo => {
        // Create an <a> to link to Unsplash;
        const link = document.createElement('a');
        link.href = photo.links.html;
        link.target = '_blank';
        // Create an <img> for photo;
        const img = document.createElement('img');
        img.src = photo.urls.regular;
        img.alt = photo.alt_description;
        img.title = photo.alt_description;

        // Event listener to check when each image has loaded
        img.addEventListener('load', imageLoaded)
        // Append the img to the link
        link.appendChild(img);
        imageContainer.appendChild(link);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(API_Url);
        photosArray  = await response.json();
        displayPhotos();
        
    } catch (error) {
        console.log('Ooops! Sorry, something must have gone wrong')
    }
}

//Check if scrolling near the bottom of the page, and load more photos
window.addEventListener('scroll', (event) => {
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && loadComplete) {
        loadComplete = false;
        getPhotos();
    }
})


// On Load
getPhotos();


// Dark mode
const toggleSwitch = document.querySelector('input[type="checkbox"');
const toggleIcon = document.getElementById('toggle-icon');


function toggleMode(mode) {
    toggleIcon.children[0].textContent = mode === 'dark' ? 'Dark Mode' : 'Light Mode';
    mode === 'dark' ?  toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon'): toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
}

function switchTheme({ target }) {
    if(target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleMode('dark')
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleMode('light')
    }
} 


toggleSwitch.addEventListener('change', switchTheme);

// Check for the user's preferences
const currentTheme =  localStorage.getItem('theme');
if(currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if(currentTheme === 'dark') {
        toggleSwitch.checked = true;
        toggleMode('dark')
    }
}