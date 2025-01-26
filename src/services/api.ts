import axios from "axios";

// Define the structure of the API responses
interface StaticData {
  venue_raw: {
    location: {
      coordinates: [number, number]; // [longitude, latitude]
    };
  };
}

interface DynamicData {
  venue_raw: {
    delivery_specs: {
      order_minimum_no_surcharge: number; // Minimum cart value to avoid surcharge (in cents)
      delivery_pricing: {
        base_price: number; // Base delivery fee (in cents)
        distance_ranges: {
          min: number; // Minimum distance (in meters)
          max: number; // Maximum distance (in meters)
          a: number; // Constant amount (in cents)
          b: number; // Multiplier for distance-based fee
        }[];
      };
    };
  };
}

// Fetch static data for a venue
export const fetchStaticData = async (venueSlug: string): Promise<StaticData> => {
  const response = await axios.get<StaticData>(
    `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/static`
  );
  return response.data;
};

// Fetch dynamic data for a venue
export const fetchDynamicData = async (venueSlug: string): Promise<DynamicData> => {
  const response = await axios.get<DynamicData>(
    `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}/dynamic`
  );
  return response.data;
};

// Fetch both static and dynamic data for a venue
export const fetchVenueData = async (venueSlug: string) => {
  const [staticData, dynamicData] = await Promise.all([
    fetchStaticData(venueSlug),
    fetchDynamicData(venueSlug),
  ]);
  return { staticData, dynamicData };
};