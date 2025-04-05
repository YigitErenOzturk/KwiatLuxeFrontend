MenuMaster

MenuMaster is a restaurant discovery and reservation application that allows 
users to explore restaurants, view menus, make reservations, and share reviews.

Features

User authentication (Login & Register), Password reset functionality, 
Search and filter restaurants by city, Make restaurant reservations, 
Leave reviews for restaurants, View user profile with saved preferences
Soon there will be more 

Technologies Used

Frontend: HTML, CSS, Pure JavaScript

Installation & Setup

Clone the repository,
git clone https://github.com/your-repo/MenuMaster.git
Navigate to the project directory:
cd MenuMaster
Install dependencies (for backend):
npm install
Start the backend server:
npm start
Open the index.html file in a browser to run the frontend.

API Endpoints

User Authentication
POST /api/users/register 
POST /api/users/login 
POST /api/users/password-reset-request 
Soon there will be more

Restaurants

GET /api/restaurants - Get a list of all restaurants
POST /api/restaurants/register - Register a new restaurant
Soon there will be more

Reservations

POST /api/reservations - Make a reservation
GET /api/reservations/:userId - Get user reservations
Soon there will be more
