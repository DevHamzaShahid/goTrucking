export interface Waypoint {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  type: 'restaurant' | 'gas_station' | 'hotel' | 'attraction' | 'shop' | 'hospital';
  priority: number; // 1 = highest priority
  status: 'pending' | 'active' | 'completed' | 'skipped';
  estimatedTime?: string;
  estimatedDistance?: string;
  icon: string;
  color: string;
}

// Sample waypoints for navigation (San Francisco area)
export const navigationWaypoints: Waypoint[] = [
  {
    id: 'wp-1',
    name: 'Golden Gate Bridge Viewpoint',
    description: 'Iconic bridge viewing spot',
    latitude: 37.8199,
    longitude: -122.4783,
    type: 'attraction',
    priority: 1,
    status: 'pending',
    icon: '🌉',
    color: '#FF6B6B',
  },
  {
    id: 'wp-2',
    name: 'Fisherman\'s Wharf',
    description: 'Popular waterfront destination',
    latitude: 37.8080,
    longitude: -122.4177,
    type: 'attraction',
    priority: 2,
    status: 'pending',
    icon: '🎣',
    color: '#4ECDC4',
  },
  {
    id: 'wp-3',
    name: 'Union Square',
    description: 'Central shopping district',
    latitude: 37.7879,
    longitude: -122.4075,
    type: 'shop',
    priority: 3,
    status: 'pending',
    icon: '🏬',
    color: '#45B7D1',
  },
  {
    id: 'wp-4',
    name: 'Lombard Street',
    description: 'World\'s most crooked street',
    latitude: 37.8021,
    longitude: -122.4187,
    type: 'attraction',
    priority: 4,
    status: 'pending',
    icon: '🛣️',
    color: '#96CEB4',
  },
  {
    id: 'wp-5',
    name: 'Chinatown Gate',
    description: 'Historic Chinatown entrance',
    latitude: 37.7909,
    longitude: -122.4056,
    type: 'attraction',
    priority: 5,
    status: 'pending',
    icon: '🏮',
    color: '#FFEAA7',
  },
  {
    id: 'wp-6',
    name: 'Coit Tower',
    description: 'Art Deco tower with city views',
    latitude: 37.8024,
    longitude: -122.4058,
    type: 'attraction',
    priority: 6,
    status: 'pending',
    icon: '🗼',
    color: '#DDA0DD',
  },
  {
    id: 'wp-7',
    name: 'Pier 39',
    description: 'Shopping and entertainment complex',
    latitude: 37.8087,
    longitude: -122.4098,
    type: 'shop',
    priority: 7,
    status: 'pending',
    icon: '🎪',
    color: '#F39C12',
  },
  {
    id: 'wp-8',
    name: 'Alcatraz Ferry Terminal',
    description: 'Ferry to the famous prison island',
    latitude: 37.8077,
    longitude: -122.4103,
    type: 'attraction',
    priority: 8,
    status: 'pending',
    icon: '⛴️',
    color: '#8E44AD',
  },
];

// Navigation settings
export const NAVIGATION_SETTINGS = {
  ARRIVAL_THRESHOLD: 50, // meters - distance to consider "arrived"
  ROUTE_UPDATE_INTERVAL: 5000, // ms - how often to recalculate route
  CAMERA_ANIMATION_DURATION: 1000, // ms
  NORTH_BEARING: 0, // degrees
  DEFAULT_ZOOM: 0.01, // map delta values
  NAVIGATION_ZOOM: 0.005, // closer zoom when navigating
};

// Get waypoints by status
export const getWaypointsByStatus = (status: Waypoint['status']): Waypoint[] => {
  return navigationWaypoints.filter(wp => wp.status === status);
};

// Get next waypoint in priority order
export const getNextWaypoint = (waypoints: Waypoint[]): Waypoint | null => {
  const pending = waypoints
    .filter(wp => wp.status === 'pending')
    .sort((a, b) => a.priority - b.priority);
  
  return pending.length > 0 ? pending[0] : null;
};

// Update waypoint status
export const updateWaypointStatus = (
  waypoints: Waypoint[],
  waypointId: string,
  status: Waypoint['status']
): Waypoint[] => {
  return waypoints.map(wp =>
    wp.id === waypointId ? { ...wp, status } : wp
  );
};

// Get waypoint by ID
export const getWaypointById = (waypoints: Waypoint[], id: string): Waypoint | null => {
  return waypoints.find(wp => wp.id === id) || null;
};