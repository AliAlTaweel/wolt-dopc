# Delivery Order Price Calculator UI (DOPC)

This project is part of the Wolt 2025 Frontend Engineering Internship assignment. It is a React + TypeScript application for calculating delivery prices based on user inputs and dynamic API data.

## Table of Contents

 * About the Project
 * Features
 * Getting Started
 - Prerequisites
 - Installation
 - Usage
 * Testing
 
## About the Project
The Delivery Order Price Calculator UI (DOPC) allows users to calculate delivery prices based on:

Cart Value
User Location (via latitude and longitude or by using the browser's location API)
Dynamic data retrieved from the Home Assignment API (e.g., venue details, distance ranges).
Features
Dynamic Delivery Calculation: Calculates delivery fees and additional surcharges based on distance and cart value.
User-Friendly Input Options: Users can enter their location manually or allow the browser to retrieve it automatically.
Responsive UI: Built with React and TypeScript for a seamless user experience.
Comprehensive Price Breakdown: Displays detailed pricing information, including:
Cart Value
Small Order Surcharge
Delivery Distance
Total Price
Max Distance Handling: Limits calculations to a maximum delivery range of 2000 meters.
Getting Started
Prerequisites
Ensure the following are installed on your system:

Node.js >= 16.x
npm (comes with Node.js)
Installation
Clone the repository:
bash
Copy
Edit
git clone https://github.com/your-username/wolt-dopc.git  
Navigate to the project directory:
bash
Copy
Edit
cd wolt-dopc  
Install dependencies:
bash
Copy
Edit
npm install  
Start the development server:
bash
Copy
Edit
npm run dev  
Usage
Open the application in your browser (default: http://localhost:5173/).
Enter the following:
Venue Slug: The identifier for the venue.
Cart Value: Must be a number greater than 0.
Location: Either manually input latitude and longitude or click the Get Location button to allow the browser to retrieve your current location.
Click Calculate Delivery Price.
View the Price Breakdown, which includes:
Cart Value
Small Order Surcharge
Delivery Distance
Total Price
Price Breakdown Details
Cart Value: The total value of the items in the cart (entered in euros).
Small Order Surcharge: Applied if the cart value is below the minimum required for free delivery.
Delivery Distance: Calculated as the straight-line distance between the user and the venue.
Total Price: The sum of the cart value, small order surcharge, and delivery fee.
The Home Assignment API is used to dynamically calculate delivery fees and set a maximum delivery range of 2000 meters.

Testing
Unit tests ensure the accuracy of delivery fee calculations and distance computations. To run tests:

bash
Copy
Edit
npm test  
Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

License
This project is licensed under the MIT License.

Contact
For any questions or feedback, feel free to reach out:

Email: [your.email@example.com]
GitHub: https://github.com/your-username
