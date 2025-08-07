export interface Restaurant {
  id: string;
  name: string;
  type: 'restaurant' | 'cafe' | 'fast_food' | 'bakery' | 'street_food';
  latitude: number;
  longitude: number;
  rating: number;
  distance?: number;
  description: string;
  image: string;
}

// Mock data for restaurants around a central location (you can adjust coordinates based on your area)
export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    type: 'restaurant',
    latitude: 37.7849,
    longitude: -122.4094,
    rating: 4.5,
    description: 'Authentic Italian pizza with fresh ingredients',
    image: '🍕',
  },
  {
    id: '2',
    name: 'Coffee Corner',
    type: 'cafe',
    latitude: 37.7859,
    longitude: -122.4084,
    rating: 4.2,
    description: 'Cozy cafe with artisanal coffee and pastries',
    image: '☕',
  },
  {
    id: '3',
    name: 'Burger Barn',
    type: 'fast_food',
    latitude: 37.7839,
    longitude: -122.4104,
    rating: 4.0,
    description: 'Juicy burgers and crispy fries',
    image: '🍔',
  },
  {
    id: '4',
    name: 'Sweet Treats Bakery',
    type: 'bakery',
    latitude: 37.7869,
    longitude: -122.4074,
    rating: 4.7,
    description: 'Fresh baked goods and delicious cakes',
    image: '🧁',
  },
  {
    id: '5',
    name: 'Taco Truck',
    type: 'street_food',
    latitude: 37.7829,
    longitude: -122.4114,
    rating: 4.3,
    description: 'Authentic Mexican street tacos',
    image: '🌮',
  },
  {
    id: '6',
    name: 'Sushi Zen',
    type: 'restaurant',
    latitude: 37.7879,
    longitude: -122.4064,
    rating: 4.8,
    description: 'Fresh sushi and Japanese cuisine',
    image: '🍣',
  },
  {
    id: '7',
    name: 'Pasta Paradise',
    type: 'restaurant',
    latitude: 37.7819,
    longitude: -122.4124,
    rating: 4.4,
    description: 'Homemade pasta and Italian specialties',
    image: '🍝',
  },
  {
    id: '8',
    name: 'Smoothie Station',
    type: 'cafe',
    latitude: 37.7889,
    longitude: -122.4054,
    rating: 4.1,
    description: 'Fresh fruit smoothies and healthy snacks',
    image: '🥤',
  },
  {
    id: '9',
    name: 'BBQ Joint',
    type: 'restaurant',
    latitude: 37.7809,
    longitude: -122.4134,
    rating: 4.6,
    description: 'Smoky BBQ ribs and pulled pork',
    image: '🍖',
  },
  {
    id: '10',
    name: 'Ice Cream Parlor',
    type: 'cafe',
    latitude: 37.7899,
    longitude: -122.4044,
    rating: 4.3,
    description: 'Artisanal ice cream with unique flavors',
    image: '🍦',
  },
];

// Default center location (San Francisco - you can change this to your preferred location)
export const DEFAULT_LOCATION = {
  latitude: 37.7849,
  longitude: -122.4094,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};