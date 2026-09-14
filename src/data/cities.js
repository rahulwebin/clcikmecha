export const CITY_LOCATIONS = [
    "India", "Laxmi Nagar", "Delhi", "Gurgaon", "Ranchi", "Lucknow",
    "Uttar Pradesh", "Uttarakhand", "Hyderabad", "Bangalore", "Jaipur",
    "Punjab", "Haryana", "Noida", "Mumbai", "Chandigarh", "Odisha",
    "Bihar", "Kolkata", "Chennai", "Bhopal", "Gujarat", "Assam",
    "Andhra Pradesh", "Arunachal Pradesh", "Chhattisgarh", "Goa",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Tripura", "West Bengal", "Dubai"
];

export const US_CITY_LOCATIONS = [
    "United States", "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia",
    "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Seattle",
    "Denver", "Boston", "Miami", "Atlanta", "Washington DC", "Nashville",
    "Charlotte", "Tampa", "Orlando", "Jacksonville", "Las Vegas", "Portland",
    "Raleigh", "Salt Lake City", "Minneapolis", "Detroit", "Columbus", "Indianapolis"
];

export function getCitySlug(city) {
    return city.toLowerCase().replace(/\s+/g, '-');
}

export function getCityPagePath(city) {
    if (US_CITY_LOCATIONS.includes(city)) {
        return `/us/digital-marketing-agency-in-${getCitySlug(city)}`;
    }
    return `/digital-marketing-agency-in-${getCitySlug(city)}`;
}
