export const calculateStraightLineDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371e3; // Earth radius in meters
  const lat1_radians = (lat1 * Math.PI) / 180;
  const lat2_radians = (lat2 * Math.PI) / 180;
  const diff_lat = ((lat2 - lat1) * Math.PI) / 180;
  const diff_long = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(diff_lat / 2) * Math.sin(diff_lat / 2) +
    Math.cos(lat1_radians) *
      Math.cos(lat2_radians) *
      Math.sin(diff_long / 2) *
      Math.sin(diff_long / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c); // Distance in meters
};

export const calculateDeliveryFee = (
  distance: number,
  basePrice: number,
  distanceRanges: {
    min: number;
    max: number;
    a: number;
    b: number;
  }[]
): number => {
  distance=3;
  for (const range of distanceRanges) {
    
    if (distance >= range.min && range.max !== 0 && (distance < range.max)) {
   
      return basePrice + range.a + Math.round((range.b * distance) / 10);
    }
  }
  throw new Error("Delivery not possible for this distance.");
};

export const calculatePrices = (
  cartValue: number,
  venueData: {
    staticData: any;
    dynamicData: any;
  },
  userLatitude: number,
  userLongitude: number
) => {
  const { staticData, dynamicData } = venueData;

  // Extract necessary fields from the API responses
  const venueCoordinates = staticData.venue_raw.location.coordinates;
  const orderMinimumNoSurcharge =
    dynamicData.venue_raw.delivery_specs.order_minimum_no_surcharge;
  const basePrice =
    dynamicData.venue_raw.delivery_specs.delivery_pricing.base_price;
  const distanceRanges =
    dynamicData.venue_raw.delivery_specs.delivery_pricing.distance_ranges;

  // Calculate delivery distance (straight line distance)
  const deliveryDistance = calculateStraightLineDistance(
    userLatitude,
    userLongitude,
    venueCoordinates[1], // Latitude
    venueCoordinates[0] // Longitude
  );

  // Calculate small order surcharge
  const smallOrderSurcharge = Math.max(
    orderMinimumNoSurcharge - cartValue * 100,
    0
  );

  // Calculate delivery fee
  const deliveryFee = calculateDeliveryFee(
    deliveryDistance,
    basePrice,
    distanceRanges
  );

  // Calculate total price
  const totalPrice = cartValue * 100 + smallOrderSurcharge + deliveryFee;

  return {
    cartValue: cartValue * 100, // Convert to cents
    smallOrderSurcharge,
    deliveryFee,
    deliveryDistance,
    totalPrice,
  };
};
