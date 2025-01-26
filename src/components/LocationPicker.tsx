import React from "react";

interface LocationPickerProps {
  onLocationChange: (latitude: number, longitude: number) => void;
  onError: (errorMessage: string) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationChange, onError }) => {
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationChange(latitude, longitude); // Pass latitude and longitude to parent
          onError(""); // Clear any previous errors
        },
        (err) => {
          // Use the `err` parameter to provide specific error messages
          switch (err.code) {
            case err.PERMISSION_DENIED:
              onError("Permission denied. Please enable location access in your browser settings.");
              break;
            case err.POSITION_UNAVAILABLE:
              onError("Location information is unavailable.");
              break;
            case err.TIMEOUT:
              onError("The request to get your location timed out. Please try again.");
              break;
            default:
              onError("Failed to fetch location. Please enter manually.");
              break;
          }
        }
      );
    } else {
      onError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="location-picker">
      <button
        data-test-id="getLocation"
        onClick={handleGetLocation}
        className="action-button"
      >
        Get Location
      </button>
    </div>
  );
};

export default LocationPicker;