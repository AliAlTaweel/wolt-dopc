// validation.ts

export const validateInputs = (
    cartValue: number,
    venueSlug: string,
    userLatitude: number,
    userLongitude: number
  ): { isValid: boolean; error: string | null } => {
    // Validate Cart Value
    if (cartValue <= 0 ) {
      return { isValid: false, error: "Cart value must be a positive number." };
    }
  
    // Validate Venue Slug
    if (!venueSlug.trim()) {
      return { isValid: false, error: "Venue slug cannot be empty." };
    }
  
    // Validate Latitude and Longitude
    if (
      isNaN(userLatitude) ||
      isNaN(userLongitude) ||
      userLatitude < -90 ||
      userLatitude > 90 ||
      userLongitude < -180 ||
      userLongitude > 180
    ) {
      return { isValid: false, error: "Please enter valid latitude and longitude values." };
    }
  
    return { isValid: true, error: null }; // No errors
  };