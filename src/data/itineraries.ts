import { Itinerary } from '@/types/content';

export const itinerariesSeed: Itinerary[] = [
    {
      id: "4-day-ultimate-bahrain-discovery",
      title: "4-Day Ultimate Bahrain Discovery",
      destinationId: "dest-manama",
      destinationName: "Manama, Bahrain",
      duration: 4,
      groupSize: "2 - 20+ pax",
      difficulty: "Easy",
      price: 899,
      season: "Oct - Jun",
      image: "https://cdn.magicpatterns.com/patterns/generated-images/295a7f56-a405-446d-b541-c353c7eef390.jpg",
      summary: "Discover the ultimate highlights of Bahrain, from modern Manama to ancient Dilmun burial mounds and the famous Formula 1 circuit.",
      highlights: ["Al Fateh Grand Mosque", "Bahrain National Museum", "Qal'at al-Bahrain", "Desert Discovery", "Tree of Life"],
      tier: "Small Group",
      theme: "Culture",
      dayPlans: [
        {day: 1, title: "Arrival in Bahrain", description: "Arrival in Manama and check-in at the hotel. The remainder of the day is at leisure.", activities: ["Airport Transfer", "Hotel Check-in"], accommodation: "4* or 5* Hotel in Manama", meals: {breakfast: false, lunch: false, dinner: false}},
        {day: 2, title: "Heritage Tour of Manama", description: "City tour covering Al Fateh Grand Mosque, Bahrain National Museum, Beit Al Quran, Qal'at al-Bahrain, and the traditional Manama Souq.", activities: ["Sightseeing", "Cultural Tour", "Shopping"], accommodation: "4* or 5* Hotel in Manama", meals: {breakfast: true, lunch: false, dinner: false}},
        {day: 3, title: "Desert & Heritage Discovery Tour", description: "Visit A'ali Pottery, Burial Mounds, Bahrain International Circuit, Camel Farm, First Oil Well, Tree of Life, and the King Fahd Causeway.", activities: ["Desert Safari", "Historical Sites"], accommodation: "4* or 5* Hotel in Manama", meals: {breakfast: true, lunch: false, dinner: false}},
        {day: 4, title: "Departure", description: "Breakfast at the hotel, check out, and transfer to Bahrain International Airport.", activities: ["Airport Transfer"], accommodation: "", meals: {breakfast: true, lunch: false, dinner: false}}
      ]
    },
    {
      id: "5-day-pearls-of-bahrain",
      title: "5-Day Pearls of Bahrain - Heritage & City Tour",
      destinationId: "dest-manama",
      destinationName: "Manama, Bahrain",
      duration: 5,
      groupSize: "2 - 20+ pax",
      difficulty: "Easy",
      price: 1275,
      season: "Oct - Jun",
      image: "https://cdn.magicpatterns.com/patterns/generated-images/fbdfe4c2-b4b6-4284-88a4-9896fd436f8c.jpg",
      summary: "An immersive 5-day journey through Bahrain, adding a deep dive into the UNESCO-listed Pearling Path and historic forts to the classic desert and city tours.",
      highlights: ["Pearling Path Visitor Centre", "Bu Maher Fort", "Bahrain National Museum", "A'ali Pottery & Burial Mounds", "Optional Pearl Snorkeling"],
      tier: "Small Group",
      theme: "History",
      dayPlans: [
        {day: 1, title: "Arrival in Bahrain", description: "Welcome and transfer to Manama. Leisure time to relax or explore independently.", activities: ["Airport Transfer", "Hotel Check-in"], accommodation: "4* or 5* Hotel in Manama", meals: {breakfast: false, lunch: false, dinner: false}},
        {day: 2, title: "Heritage Tour of Manama", description: "Explore the Al Fateh Grand Mosque, Bahrain National Museum, Beit Al Quran, Qal'at al-Bahrain, and Manama Souq.", activities: ["Guided City Tour", "Historical Sites"], accommodation: "4* or 5* Hotel in Manama", meals: {breakfast: true, lunch: false, dinner: false}},
        {day: 3, title: "Desert & Heritage Discovery", description: "Tour A'ali Pottery Workshops, ancient Dilmun Burial Mounds, the F1 Circuit, Royal Camel Farm, First Oil Well, and the Tree of Life.", activities: ["Desert Excursion", "Cultural Stops"], accommodation: "4* or 5* Hotel in Manama", meals: {breakfast: true, lunch: false, dinner: false}},
        {day: 4, title: "Pearling Heritage Discovery", description: "Visit Bu Maher Fort, the Pearling Path Visitor Centre, Pearl Museum, restored traditional merchant houses, and Arad Fort. Optional pearl snorkeling experience.", activities: ["UNESCO Heritage Sites", "Museum Visits"], accommodation: "4* or 5* Hotel in Manama", meals: {breakfast: true, lunch: false, dinner: false}},
        {day: 5, title: "Departure", description: "Check out and transfer to the airport for departure.", activities: ["Airport Transfer"], accommodation: "", meals: {breakfast: true, lunch: false, dinner: false}}
      ]
    },
    {
      id: "romantic-ceylon-5d4n-honeymoon",
      title: "Romantic Ceylon: 5D4N Honeymoon Escape",
      destinationId: "dest-colombo",
      destinationName: "Sri Lanka",
      duration: 5,
      groupSize: "2 pax",
      difficulty: "Easy",
      price: 355,
      season: "Year-round",
      image: "https://cdn.magicpatterns.com/patterns/generated-images/e445e8fc-0b9a-4a0e-ae29-b945ec2f8d7e.jpg",
      summary: "A beautifully curated 5-day honeymoon escape traversing Sri Lanka's cultural foothills, misty tea mountains, and tropical southern coastlines.",
      highlights: ["Pinnawala Elephant River Stop", "Peradeniya Royal Botanic Gardens", "Scenic Ramboda Falls", "Bentota Beach Sunset", "Madhu River Safari"],
      tier: "Tailor-Made",
      theme: "Honeymoon",
      dayPlans: [
        {day: 1, title: "Arrival / Pinnawala / Kandy", description: "Warm airport reception, Pinnawala elephant river stop, Kandy City Tour and hotel check-in.", activities: ["Elephant Viewing", "City Tour"], accommodation: "The Velmont Hotel, Kandy (or similar)", meals: {breakfast: false, lunch: false, dinner: false}},
        {day: 2, title: "Kandy / Nuwara Eliya", description: "Visit Peradeniya Royal Botanic Gardens, scenic Ramboda Falls, Shri Bhakta Hanuman Kovil, and enjoy a Nuwara Eliya City Tour in the cool highlands.", activities: ["Botanic Gardens", "Waterfalls", "Tea Estate Views"], accommodation: "Queenswood Cottages, Nuwara Eliya (or similar)", meals: {breakfast: true, lunch: false, dinner: false}},
        {day: 3, title: "Nuwara Eliya / Bentota", description: "Scenic mountain descent to the warm golden coast. Enjoy beach leisure and sunset relaxation in Bentota.", activities: ["Scenic Drive", "Beach Relaxation"], accommodation: "Shandaru Blue Hotel, Bentota (or similar)", meals: {breakfast: true, lunch: false, dinner: false}},
        {day: 4, title: "Madhu River / Colombo", description: "Madhu River boat safari stop, expressway cruise to the capital, comprehensive Colombo City Tour and retail shopping.", activities: ["Boat Safari", "Shopping", "City Tour"], accommodation: "The Ocean Hotel, Colombo (or similar)", meals: {breakfast: true, lunch: false, dinner: false}},
        {day: 5, title: "Departure", description: "Hotel breakfast, souvenir shopping, and direct private airport drop-off for flight home.", activities: ["Airport Transfer"], accommodation: "", meals: {breakfast: true, lunch: false, dinner: false}}
      ]
    },
    {
      id: "3-day-essence-of-bahrain",
      title: "3-Day The Essence of Bahrain",
      destinationId: "dest-manama",
      destinationName: "Manama, Bahrain",
      duration: 3,
      groupSize: "2 - 20+ pax",
      difficulty: "Easy",
      price: 550,
      season: "Oct - Jun",
      image: "https://cdn.magicpatterns.com/patterns/generated-images/dd19e250-c9f2-43c1-9669-e3a2cfbedd8e.jpg",
      summary: "A quick but comprehensive 3-day getaway covering the very best of Bahrain's modern marvels and historical legacy.",
      highlights: ["Al Fateh Grand Mosque", "Bahrain National Museum", "Beit Al Quran", "Qal'at al-Bahrain", "Manama Souq"],
      tier: "Fixed Getaway",
      theme: "Culture",
      dayPlans: [
        {day: 1, title: "Arrival in Bahrain", description: "Welcome and transfer to your hotel. Leisure time in Manama.", activities: ["Airport Transfer"], accommodation: "4* or 5* Hotel in Manama", meals: {breakfast: false, lunch: false, dinner: false}},
        {day: 2, title: "Heritage Tour of Manama", description: "City tour including Al Fateh Grand Mosque, Bahrain National Museum, Beit Al Quran, Qal'at al-Bahrain, and traditional Manama Souq.", activities: ["Sightseeing", "Cultural Discoveries"], accommodation: "4* or 5* Hotel in Manama", meals: {breakfast: true, lunch: false, dinner: false}},
        {day: 3, title: "Departure", description: "Breakfast at the hotel, check out, and transfer to the airport.", activities: ["Airport Transfer"], accommodation: "", meals: {breakfast: true, lunch: false, dinner: false}}
      ]
    }
];
