import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Itinerary } from '@/lib/models';

const extraItins = [
  {
    id: "8-day-family-fun-cultural-triangle",
    title: "8-Day Family Fun & Cultural Triangle",
    destinationId: "dest-sigiriya",
    destinationName: "Sri Lanka",
    duration: 8,
    groupSize: "Flexible",
    difficulty: "Easy",
    price: 850,
    season: "Year-round",
    image: "https://cdn.magicpatterns.com/patterns/generated-images/3a91d4f3-e4c3-4c33-ab9b-1bbaadfb6556.jpg",
    summary: "An engaging and comfortable journey crafted for families with children. Discover Sigiriya, intimate elephant encounters at Pinnawala, cool hill country tea trails, and relaxing golden sand beaches.",
    highlights: ["Sigiriya Rock Fortress", "Village Safari & Catamaran", "Pinnawala Elephants", "Highland Tea Trails", "Negombo Beach"],
    tier: "Tailor-Made",
    theme: "Adventure",
    inclusions: ["07 Nights accommodation", "Curated Daily Lunches", "Dedicated private luxury air-conditioned vehicle with child-friendly English-speaking chauffeur", "Sigiriya Rock Fortress entrance & village catamaran safari", "Private boat ride on Gregory Lake"],
    exclusions: ["International flights & Sri Lanka electronic tourist visa", "Evening dinners & hotel mini-bar", "Optional adventure activities", "Tips"],
    seoTitle: "8-Day Sri Lanka Family Holiday Package | OceanWay Tours",
    seoDescription: "Book the ultimate 8-day Sri Lanka family holiday. Visit Sigiriya, interact with elephants at Pinnawala, explore Nuwara Eliya tea trails, and relax at Negombo Beach.",
    dayPlans: [
      {day: 1, title: "Airport -> Sigiriya", description: "VIP airport greeting, transfer into Cultural Triangle, pool relaxation.", activities: ["Airport Transfer", "Hotel Check-in"], accommodation: "Sigiriya", meals: {breakfast: false, lunch: false, dinner: false}},
      {day: 2, title: "Sigiriya Rock & Village Safari", description: "Ascend 5th-century Sigiriya Citadel, catamaran ride & traditional cooking class.", activities: ["Sigiriya Rock", "Village Safari"], accommodation: "Sigiriya", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 3, title: "Sigiriya -> Dambulla -> Kandy", description: "Dambulla Cave Temples, Matale spice garden, Temple of the Tooth Relic.", activities: ["Temple Visit", "Spice Garden"], accommodation: "Kandy Hills", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 4, title: "Pinnawala Elephants & Gardens", description: "Watch elephants bathe in the river at Pinnawala, Peradeniya Botanic Gardens.", activities: ["Elephant Viewing", "Botanical Gardens"], accommodation: "Kandy Hills", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 5, title: "Kandy -> Nuwara Eliya", description: "Drive past waterfalls into cool tea valleys, single-estate factory tour.", activities: ["Tea Factory Tour", "Waterfalls"], accommodation: "Nuwara Eliya", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 6, title: "Gregory Lake & Strawberries", description: "Speedboat rides on Gregory Lake, strawberry greenhouse treats, high tea.", activities: ["Boat Ride", "High Tea"], accommodation: "Nuwara Eliya", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 7, title: "Nuwara Eliya -> Negombo Beach", description: "Descend from mountains to golden beach resort, swimming & sunset walk.", activities: ["Beach Relaxation"], accommodation: "Negombo Beach", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 8, title: "Negombo -> Airport Departure", description: "Seaside breakfast, canal boat ride, seamless 20-minute transfer to flight.", activities: ["Airport Transfer"], accommodation: "Departure", meals: {breakfast: true, lunch: false, dinner: false}}
    ]
  },
  {
    id: "7-day-cool-highlands-luxury-retreat",
    title: "7-Day The Cool Highlands & Luxury Retreat",
    destinationId: "dest-kandy",
    destinationName: "Sri Lanka",
    duration: 7,
    groupSize: "2+ pax",
    difficulty: "Easy",
    price: 1150,
    season: "Year-round",
    image: "https://cdn.magicpatterns.com/patterns/generated-images/84ae94ba-ffc8-4ce7-addd-bd78c75dab92.jpg",
    summary: "Designed for travelers seeking privacy, cooler climates, and unhurried luxury pacing. Experience the royal hill capital of Kandy, the crisp mountain air of Nuwara Eliya, and luxury shopping in Colombo.",
    highlights: ["Kandy Royal City", "Ramboda Falls & Tea Country", "Gregory Lake Boating", "Madu River Safari", "Colombo Port City Drive"],
    tier: "Tailor-Made",
    theme: "Honeymoon",
    inclusions: ["06 Nights 5-star/4-star luxury hotel stays", "Daily Curated Restaurant Lunches", "Dedicated private luxury air-conditioned vehicle", "Private boat safari in Madu River mangroves", "Single-estate tea factory tour"],
    exclusions: ["International flights", "Dinners", "Optional water sports", "Tips"],
    seoTitle: "7-Day Sri Lanka Luxury Highlands Tour | OceanWay Tours",
    seoDescription: "Experience Sri Lanka in unhurried luxury. A 7-day high-end tour covering Kandy, Nuwara Eliya tea trails, Bentota coast, and Colombo. Private chauffeurs and 5-star hotels.",
    dayPlans: [
      {day: 1, title: "Airport -> Kandy", description: "VIP airport greeting, Pinnawala elephant river bathing, check-in to luxury hill resort.", activities: ["Elephant Viewing", "Hotel Check-in"], accommodation: "Kandy Hills", meals: {breakfast: false, lunch: true, dinner: false}},
      {day: 2, title: "Kandy Royal City", description: "Peradeniya Royal Botanic Gardens, gem ateliers, Temple of the Tooth Relic.", activities: ["Botanic Gardens", "Temple Visit"], accommodation: "Kandy Hills", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 3, title: "Kandy -> Nuwara Eliya", description: "Ascend tea country past Ramboda Falls, single-estate tea tasting at colonial factory.", activities: ["Tea Tasting", "Waterfalls"], accommodation: "Nuwara Eliya", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 4, title: "Little England Leisure", description: "Speedboat ride on Gregory Lake, strawberry farm visit, high tea at The Grand Hotel.", activities: ["High Tea", "Boat Ride"], accommodation: "Nuwara Eliya", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 5, title: "Nuwara Eliya -> Bentota", description: "Descend to golden coast via Kitulgala, private Madu River mangrove boat safari.", activities: ["River Safari", "Beach Relaxation"], accommodation: "Bentota Beach", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 6, title: "Bentota -> Colombo", description: "Kosgoda turtle sanctuary, Colombo Port City drive, One Galle Face luxury retail.", activities: ["Turtle Sanctuary", "City Tour", "Shopping"], accommodation: "Colombo", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 7, title: "Colombo -> Airport", description: "Seaside breakfast, artisan souvenir shopping at Laksala, direct transfer to flight.", activities: ["Airport Transfer"], accommodation: "Departure", meals: {breakfast: true, lunch: false, dinner: false}}
    ]
  },
  {
    id: "7-day-wildlife-safari-coastal-escape",
    title: "7-Day Wildlife Safari & Luxury Coastal Escape",
    destinationId: "dest-yala",
    destinationName: "Sri Lanka",
    duration: 7,
    groupSize: "2+ pax",
    difficulty: "Easy",
    price: 1250,
    season: "Year-round",
    image: "https://cdn.magicpatterns.com/patterns/generated-images/710acca0-7433-4231-b9f4-1e43fc9a89e0.jpg",
    summary: "Big game predator safaris, historic ramparts, and 5-star oceanfront living. Designed for travelers seeking thrills in nature paired with unhurried luxury.",
    highlights: ["UNESCO Galle Dutch Fort", "Yala National Park Safari", "Leopard Tracking", "Coastal Retreat", "Colombo Metropolis"],
    tier: "Tailor-Made",
    theme: "Wildlife",
    inclusions: ["06 Nights accommodation", "Curated Daily Lunches", "Dedicated private luxury air-conditioned vehicle", "Private 4x4 open-top game drives in Yala", "All national park admission permits"],
    exclusions: ["International flights", "Evening dinners", "Optional adventure activities", "Tips"],
    seoTitle: "7-Day Wildlife Safari & Luxury Coastal Tour | OceanWay Tours",
    seoDescription: "Track leopards in Yala National Park and relax in 5-star coastal resorts on this 7-day Sri Lanka Wildlife Safari & Coastal Escape by OceanWay Tours.",
    dayPlans: [
      {day: 1, title: "Airport -> Galle / Weligama", description: "VIP airport reception, expressway transfer to south coast, sunset cocktails by the ocean.", activities: ["Airport Transfer", "Beach Relaxation"], accommodation: "Weligama Bay", meals: {breakfast: false, lunch: true, dinner: false}},
      {day: 2, title: "UNESCO Galle Dutch Fort", description: "Guided private walking tour of Galle Fort ramparts, artisan boutiques, oceanfront relaxation.", activities: ["Guided Walk", "Shopping"], accommodation: "Weligama Bay", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 3, title: "Weligama -> Yala Wilderness", description: "Scenic coastal drive east, safari lodge check-in, late afternoon private 4x4 leopard safari.", activities: ["Game Drive", "Wildlife Tracking"], accommodation: "Yala Buffer Zone", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 4, title: "Dawn Predator Tracking & Retreat", description: "Early morning 4x4 game drive tracking leopards and bears, lavish bush brunch, stargazing.", activities: ["Game Drive", "Bush Brunch"], accommodation: "Yala Buffer Zone", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 5, title: "Yala -> Colombo Metropolis", description: "Expressway drive to the capital city, hotel check-in, Galle Face Green sunset walk.", activities: ["City Walk"], accommodation: "Colombo", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 6, title: "Colombo City & Designer Retail", description: "Old Dutch Hospital, Colombo Port City drive, luxury Ceylon tea & gem shopping at One Galle Face.", activities: ["City Tour", "Shopping"], accommodation: "Colombo", meals: {breakfast: true, lunch: true, dinner: false}},
      {day: 7, title: "Colombo -> Airport Departure", description: "Oceanfront breakfast, final souvenir shopping, private transfer to BIA Airport for flight home.", activities: ["Airport Transfer"], accommodation: "Departure", meals: {breakfast: true, lunch: false, dinner: false}}
    ]
  }
];

export async function GET() {
  try {
    await connectDB();
    for (const itin of extraItins) {
      await Itinerary.updateOne({ id: itin.id }, { $set: itin }, { upsert: true });
    }
    return NextResponse.json({ success: true, count: extraItins.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
