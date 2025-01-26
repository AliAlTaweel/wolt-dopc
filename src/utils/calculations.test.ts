import {
  calculateStraightLineDistance,
  calculateDeliveryFee,
  calculatePrices,
} from "./calculations";

describe("calculateStraightLineDistance", () => {
  it("should calculate the straight line distance between two points", () => {
    const lat1 = 60.17094; // Helsinki latitude
    const lon1 = 24.93087; // Helsinki longitude
    const lat2 = 60.16952; // Nearby latitude
    const lon2 = 24.93546; // Nearby longitude

    const distance = calculateStraightLineDistance(lat1, lon1, lat2, lon2);
    expect(distance).toBeGreaterThan(0); // Distance should be positive
    expect(distance).toBeCloseTo(299, 1); // Approximate distance in meters
  });

  it("should return 0 for the same coordinates", () => {
    const lat1 = 60.17094;
    const lon1 = 24.93087;

    const distance = calculateStraightLineDistance(lat1, lon1, lat1, lon1);
    expect(distance).toBe(0); // Distance should be 0
  });
});

describe("calculateDeliveryFee", () => {
  const basePrice = 199; // Base price in cents
  const distanceRanges = [
    { min: 0, max: 500, a: 0, b: 0 },
    { min: 500, max: 1000, a: 100, b: 0 }, // This range matches distance = 600
    { min: 1000, max: 1500, a: 200, b: 0 },
    { min: 1500, max: 2000, a: 200, b: 1 },
    { min: 2000, max: 0, a: 0, b: 0 }, // max: 0 means no upper limit
  ];

  it("should calculate the delivery fee for a short distance", () => {
    const distance = 300; // 300 meters
    const fee = calculateDeliveryFee(distance, basePrice, distanceRanges);
    expect(fee).toBe(199); // Base price only
  });

  it("should calculate the delivery fee for a medium distance", () => {
    const distance = 600; // 600 meters
    const fee = calculateDeliveryFee(distance, basePrice, distanceRanges);
    expect(fee).toBe(199 + 100 + 0); // Base price + a + (b * distance / 10)
  });

  it("should throw an error for a distance beyond the range", () => {
    const distance = -100; // Negative distance is not covered by any range
    expect(() =>
      calculateDeliveryFee(distance, basePrice, distanceRanges)
    ).toThrow("Delivery not possible for this distance.");
  });
});

describe("calculatePrices", () => {
  const cartValue = 10; // 10 EUR
  const venueData = {
    staticData: {
      venue_raw: {
        location: {
          coordinates: [24.93087, 60.17094], // [longitude, latitude]
        },
      },
    },
    dynamicData: {
      venue_raw: {
        delivery_specs: {
          order_minimum_no_surcharge: 1500, // 15 EUR (1500 cents)
          delivery_pricing: {
            base_price: 199, // 1.99 EUR (199 cents)
            distance_ranges: [
              { min: 0, max: 500, a: 0, b: 0 },
              { min: 500, max: 1000, a: 100, b: 0 },
              { min: 1000, max: 1500, a: 200, b: 0 },
              { min: 1500, max: 2000, a: 200, b: 1 },
              { min: 2000, max: 0, a: 0, b: 0 }, // No delivery for long distances
            ],
          },
        },
      },
    },
  };
  const userLatitude = 60.16952; // Nearby latitude
  const userLongitude = 24.93546; // Nearby longitude

  it("should calculate prices correctly", () => {
    const results = calculatePrices(
      cartValue,
      venueData,
      userLatitude,
      userLongitude
    );

    expect(results.cartValue).toBe(1000); // 10 EUR in cents
    expect(results.smallOrderSurcharge).toBe(500); // 1500 - 1000 = 500 cents
    expect(results.deliveryFee).toBe(199); // Base price only (distance < 500 meters)
    expect(results.deliveryDistance).toBeGreaterThan(0); // Distance should be positive
    expect(results.totalPrice).toBe(1000 + 500 + 199); // Cart value + surcharge + delivery fee
  });

  it("should handle zero cart value", () => {
    const results = calculatePrices(0, venueData, userLatitude, userLongitude);

    expect(results.cartValue).toBe(0); // 0 EUR in cents
    expect(results.smallOrderSurcharge).toBe(1500); // 1500 - 0 = 1500 cents
    expect(results.deliveryFee).toBe(199); // Base price only (distance < 500 meters)
    expect(results.totalPrice).toBe(0 + 1500 + 199); // Cart value + surcharge + delivery fee
  });
});