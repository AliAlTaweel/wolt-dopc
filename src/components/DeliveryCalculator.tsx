import React, { useState } from "react";
import LocationPicker from "./LocationPicker"; // Import the new component
import ResultDisplay from "./ResultDisplay"; // Import the ResultDisplay component
import { fetchVenueData } from "../services/api"; // Import the API service
import { validateInputs } from "../utils/validation"; // Import the validation function
import { calculatePrices } from "../utils/calculations"; // Import the calculation function
import "../css/DeliveryCalculator.css"; // Import the CSS file

const DeliveryCalculator: React.FC = () => {
  const [venueSlug, setVenueSlug] = useState<string>("");
  const [cartValue, setCartValue] = useState<number>(0);
  const [userLatitude, setUserLatitude] = useState<number>(0);
  const [userLongitude, setUserLongitude] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{
    cartValue: number;
    smallOrderSurcharge: number;
    deliveryFee: number;
    deliveryDistance: number;
    totalPrice: number;
  } | null>(null);

  const handleLocationChange = (latitude: number, longitude: number) => {
    setUserLatitude(latitude);
    setUserLongitude(longitude);
  };

  const handleCalculatePrice = async () => {
    // Validate inputs
    const { isValid, error: validationError } = validateInputs(
      cartValue,
      venueSlug,
      userLatitude,
      userLongitude
    );
  
    // If validation fails, set the error and stop execution
    if (!isValid) {
      setError(validationError);
      return;
    }
  
    try {
      // Fetch venue data from the API
      const venueData = await fetchVenueData(venueSlug);
  
      // Calculate prices using the utility function
      const calculatedResults = calculatePrices(cartValue, venueData, userLatitude, userLongitude);
  
      // Set the results
      setResults(calculatedResults);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.log("Error fetching venue data:", err);
      setError("Failed to fetch venue data. Please check the venue slug and try again.");
      setResults(null); // Clear results
    }
  };

  return (
    <div className="delivery-calculator">
      <h1>Wolt Delivery Price Calculator</h1>
      <div className="input-group">
        <label>Venue Slug:</label>
        <input
          type="text"
          data-test-id="venueSlug"
          placeholder="Enter venue slug"
          value={venueSlug}
          onChange={(e) => setVenueSlug(e.target.value)}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label>Cart Value (EUR):</label>
        <input
          type="number"
          data-test-id="cartValue"
          placeholder="Enter cart value"
          value={cartValue}
          onChange={(e) => setCartValue(Number(e.target.value))}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label>User Latitude:</label>
        <input
          type="number"
          data-test-id="userLatitude"
          placeholder="Latitude"
          value={userLatitude}
          onChange={(e) => setUserLatitude(Number(e.target.value))}
          className="input-field"
        />
      </div>
      <div className="input-group">
        <label>User Longitude:</label>
        <input
          type="number"
          data-test-id="userLongitude"
          placeholder="Longitude"
          value={userLongitude}
          onChange={(e) => setUserLongitude(Number(e.target.value))}
          className="input-field"
        />
      </div>
      <LocationPicker
        onLocationChange={handleLocationChange}
        onError={setError}
      />
      <button
        data-test-id="calculateDeliveryPrice"
        onClick={handleCalculatePrice}
        className="action-button"
      >
        Calculate Delivery Price
      </button>
      {error && <p className="error-message">{error}</p>}
      {results && (
        <ResultDisplay
          cartValue={results.cartValue}
          smallOrderSurcharge={results.smallOrderSurcharge}
          deliveryFee={results.deliveryFee}
          deliveryDistance={results.deliveryDistance}
          totalPrice={results.totalPrice}
        />
      )}
    </div>
  );
};

export default DeliveryCalculator;