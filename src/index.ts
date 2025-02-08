import { showReviewTotal, populateUser, showDetails, getTopTwoReviews } from './utils';
import { Permissions, LoyaltyUser } from './enums';
import { Review, Property } from './interfaces';
import MainProperty from './classes';

// DOM Elements
const propertyContainer = document.querySelector('.properties');
const reviewContainer = document.querySelector('.reviews');
const container = document.querySelector('.container');
const button = document.querySelector('button');
const footer = document.querySelector('.footer');

let isLoggedIn: boolean;

// Reviews Data
const reviews: Review[] = [
    { name: 'Sheila', stars: 5, loyaltyUser: LoyaltyUser.GOLD_USER, date: '01-04-2021' },
    { name: 'Andrzej', stars: 3, loyaltyUser: LoyaltyUser.BRONZE_USER, date: '28-03-2021' },
    { name: 'Omar', stars: 4, loyaltyUser: LoyaltyUser.SILVER_USER, date: '27-03-2021' }
];

// User Data
const user = {
    firstName: 'Bobby',
    lastName: 'Brown',
    permissions: Permissions.ADMIN,
    isReturning: true,
    age: 35,
    stayedAt: ['florida-home', 'oman-flat', 'tokyo-bungalow']
};

// Properties Data
const properties: Property[] = [
    {
        image: 'images/colombia-property.jpg',
        title: 'Colombian Shack',
        price: 45,
        location: { firstLine: 'shack 37', city: 'Bogota', code: 45632, country: 'Colombia' },
        contact: [+112343823978921, 'marywinkle@gmail.com'],
        isAvailable: true  
    },
    {
        image: 'images/poland-property.jpg',
        title: 'Polish Cottage',
        price: 30,
        location: { firstLine: 'no 23', city: 'Gdansk', code: 343903, country: 'Poland' },
        contact: [+1298239028490830, 'garydavis@hotmail.com'],
        isAvailable: false 
    },
    {
        image: 'images/london-property.jpg',
        title: 'London Flat',
        price: 25,
        location: { firstLine: 'flat 15', city: 'London', code: 'SW4 5XW', country: 'United Kingdom' },
        contact: [+34829374892553, 'andyluger@aol.com'],
        isAvailable: true
    },
    {
        image: 'images/malaysian-hotel.jpeg',
        title: 'Malia Hotel',
        price: 35,
        location: { firstLine: 'Room 4', city: 'Malia', code: 45334, country: 'Malaysia' },
        contact: [+60349822083, 'lee34@gmail.com'],
        isAvailable: false
    }
];

// Functions
showReviewTotal(reviews.length, reviews[0].name, reviews[0].loyaltyUser);
populateUser(user.isReturning, user.firstName);

// Render Properties
properties.forEach(property => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = property.title;

    const image = document.createElement('img');
    image.setAttribute('src', property.image);
    card.appendChild(image);

    showDetails(user.permissions, card, property.price);
    propertyContainer?.appendChild(card);
});

// Review Handling
let reviewCount = 0;
const addReviews = (reviewArray: Review[]): void => {
    if (reviewCount === 0) {
        reviewCount++;
        const topTwo = getTopTwoReviews(reviewArray);
        topTwo.forEach(review => {
            const card = document.createElement('div');
            card.classList.add('review-card');
            card.innerHTML = `${review.stars} stars from ${review.name}`;
            reviewContainer?.appendChild(card);
        });
        container?.removeChild(button!);
    }
};

button?.addEventListener('click', () => addReviews(reviews));

// Footer Location
const currentLocation: [string, string, number] = ['London', '11.03', 17];
footer!.innerHTML = `${currentLocation[0]} ${currentLocation[1]} ${currentLocation[2]}°`;

// Main Property Display
const yourMainProperty = new MainProperty(
    'images/italian-property.jpg', 
    'Italian House',
    [{ name: 'Olive', stars: 5, loyaltyUser: LoyaltyUser.GOLD_USER, date: '12-04-2021' }]
);

const mainImageContainer = document.querySelector('.main-image');
const mainImage = document.createElement('img');
mainImage.setAttribute('src', yourMainProperty.src);
mainImageContainer?.appendChild(mainImage);
