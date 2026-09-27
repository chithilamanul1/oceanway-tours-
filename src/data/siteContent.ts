export const contactInfo = {
  email: 'hello@oceanwaytours.com',
  phone: '+94 76 363 4022 / +966 53 781 3155',
  whatsapp: '94763634022',
  address: 'Oceanway Tours (Pvt) Ltd, Negombo, Sri Lanka',
  hours: 'Available 24/7',
};

export const logoUrl = '/logo.png';

export interface HowItWorksStep {
  step: number;
  title: string;
  tagline: string;
  description: string;
  badge: string;
}

export const howItWorks: HowItWorksStep[] = [
  {
    step: 1,
    title: 'Submit Details',
    tagline: 'Share your vision with us in under 2 minutes',
    description:
      'Fill out our quick quotation questionnaire with your desired travel dates, destination interests, group size, and must-see experiences.',
    badge: 'Step 01',
  },
  {
    step: 2,
    title: 'Connect with Expert',
    tagline: 'Direct consultation with an on-ground destination specialist',
    description:
      'Within 24 hours, our dedicated local travel planner connects via WhatsApp or email to understand your preferences, pace, and accommodation style.',
    badge: 'Step 02',
  },
  {
    step: 3,
    title: 'Receive 3 Quotes',
    tagline: 'Transparent choices tailored precisely to your budget',
    description:
      'We curate 3 distinct itinerary tiers (Classic, Superior, Luxury) complete with transparent line-item pricing, route maps, and hotel profiles.',
    badge: 'Step 03',
  },
  {
    step: 4,
    title: 'Secure Booking',
    tagline: 'Seamless confirmation with 24/7 concierge guarantee',
    description:
      'Confirm your favorite plan with flexible deposits. Enjoy private chauffeur transport, 24/7 ground assistance, and unforgettable memories.',
    badge: 'Step 04',
  },
];

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const whyChoose: WhyChooseItem[] = [
  {
    id: 'tailor-made',
    title: '100% Tailor-Made Journeys',
    description:
      'Every itinerary is designed from scratch around your timing, passions, and pace—no cookie-cutter tourist bus trails.',
    iconName: 'Sparkles',
  },
  {
    id: 'local-experts',
    title: 'Expert Chauffeur-Guides',
    description:
      'Travel with certified local drivers and passionate naturalists who share insider stories and ensure complete safety throughout.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'transparent-pricing',
    title: 'Transparent Fair Pricing',
    description:
      'No hidden markups or surprise surcharges. We provide clear, honest itemized breakdowns for hotels, transport, and excursions.',
    iconName: 'Coins',
  },
  {
    id: 'handpicked-stays',
    title: 'Handpicked Boutique Stays',
    description:
      'From heritage colonial mansions to eco-luxury desert camps and overwater villas, we rigorously vet every property.',
    iconName: 'Hotel',
  },
  {
    id: 'concierge',
    title: '24/7 Dedicated Ground Support',
    description:
      'Our Colombo and regional operational teams are reachable around the clock on WhatsApp to support any spontaneous request.',
    iconName: 'Headphones',
  },
  {
    id: 'sustainable',
    title: 'Ethical & Community-Led Travel',
    description:
      'We respect wild habitats, support local artisan communities, and partner exclusively with eco-conscious hospitality providers.',
    iconName: 'Leaf',
  },
];

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export const services: ServiceItem[] = [
  {
    id: 'bespoke-tours',
    title: 'Bespoke Private Itineraries',
    category: 'Custom Travel',
    description:
      'Comprehensive end-to-end luxury itineraries engineered around couples, families, and solo explorers with private dedicated vehicles.',
    image: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/b2/69/d0/b2/a9/v1_E10/E10DQNR.jpg?w=800&cf_fit=scale-down&q=85&format=auto&s=58f1f17446a6fcbbd95ca82e5f540bf646b4ac432d06a4197225631229734919',
  },
  {
    id: 'small-group',
    title: 'Curated Small Group Departures',
    category: 'Group Journeys',
    description:
      'Intimate group journeys capped at 12 guests, blending high-end cultural storytelling, historic marvels, and authentic shared moments.',
    image: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/c6/37/ec/a9/55/v1_E10/E106HMEY.jpg?w=800&cf_fit=scale-down&q=85&format=auto&s=2c06747f7c93c62dc63fd99faea6fe577360e966996b3597604431e78a942120',
  },
  {
    id: 'air-charter',
    title: 'Helicopter & Aviation Charters',
    category: 'VIP Aviation',
    description:
      'Seamless point-to-point transfers and panoramic aerial excursions over iconic heritage fortresses, tea estates, and desert peaks.',
    image: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/a0/36/50/25/9e/v1_E10/E10599W3.jpg?w=800&cf_fit=scale-down&q=85&format=auto&s=7818b1e73ebee307580ae46346855e4ac3941c349c5a4e4ee423aac8694dc4d7',
  },
  {
    id: 'wildlife-safari',
    title: 'Wildlife & Marine Expeditions',
    category: 'Eco & Nature',
    description:
      'Private 4x4 leopard game drives, elephant gathering expeditions, and ethical whale-watching sails with expert naturalists.',
    image: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/5c/d7/ac/bb/2c/v1_E10/E108W5WR.jpg?w=800&cf_fit=scale-down&q=85&format=auto&s=d5a28ba8b0dd01ec0d12aac452a25d1ba6ac7f5a29968b7384b5e4231233a584',
  },
  {
    id: 'honeymoon-packages',
    title: 'Honeymoon & Romantic Escapes',
    category: 'Romance',
    description:
      'Enchanting getaways combining candlelit coastal dining, private plunge pools, couples Ayurveda, and tropical island bliss.',
    image: 'https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/82/a8/bb/5f/37/v1_E11/E118GID6.jpg?w=800&cf_fit=scale-down&q=85&format=auto&s=d8527ad520a7b82d89b6e41af1e2fbccedf3a3a5334471b9fca8927e65cac3e7',
  },
  {
    id: 'corporate-logistics',
    title: 'Corporate & MICE Management',
    category: 'Executive Travel',
    description:
      'Full-spectrum ground coordination, premium fleet transport, conference logistics, and executive team retreats across the Middle East & Sri Lanka.',
    image: '/WhatsApp%20Image%202026-09-24%20at%201.23.26%20AM%20(1).jpeg',
  },
];

export interface TestimonialItem {
  id: string;
  name: string;
  origin: string;
  trip: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Marcus & Eleanor Vance',
    origin: 'London, United Kingdom',
    trip: 'Sri Lanka & Maldives Honeymoon',
    quote:
      'OceanWay Tours orchestrated the most magical 10 days of our lives. From the scenic tea plantation bungalow to our private water villa in the Maldives, every detail was immaculate.',
    rating: 5,
    avatar: '/WhatsApp%20Image%202026-09-24%20at%201.23.26%20AM.jpeg',
  },
  {
    id: 't-2',
    name: 'Sultan Al-Otaibi',
    origin: 'Riyadh, Saudi Arabia',
    trip: 'Family Wildlife & Galle Fort Discovery',
    quote:
      'Our chauffeur-guide Dinesh was outstanding with our three children. Seeing wild leopards in Yala and exploring Galle Fort without any tourist rush made this an unforgettable family vacation.',
    rating: 5,
    avatar: '/WhatsApp%20Image%202026-09-24%20at%201.23.27%20AM.jpeg',
  },
  {
    id: 't-3',
    name: 'Camilla Dupont',
    origin: 'Paris, France',
    trip: 'AlUla Desert Discovery',
    quote:
      'The Hegra private tour at golden hour took my breath away. OceanWay’s local team in Saudi Arabia handled all permits seamlessly. Truly a five-star bespoke journey.',
    rating: 5,
    avatar: '/WhatsApp%20Image%202026-09-24%20at%201.23.28%20AM%20(1).jpeg',
  },
];

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export const stats: StatItem[] = [
  {
    value: '12+',
    label: 'Years of Experience',
    description: 'Pioneering private luxury journeys across South Asia and the Middle East.',
  },
  {
    value: '15,000+',
    label: 'Delighted Travelers',
    description: 'Satisfied guests from over 45 countries worldwide.',
  },
  {
    value: '98.7%',
    label: '5-Star Reviews',
    description: 'Consistently top-ranked across TripAdvisor and Google Reviews.',
  },
  {
    value: '24/7',
    label: 'Concierge On-Call',
    description: 'Real-time localized customer support at every leg of your voyage.',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
  category: 'General' | 'Booking & Payments' | 'On the Tour' | 'Safety & Visas';
}

export const faqs: FaqItem[] = [
  {
    question: 'How does the quotation and booking process work?',
    answer:
      'After submitting your details through our online quote form, our destination expert contacts you within 24 hours with three customized proposal tiers. Once you approve an itinerary, we secure hotel reservations and send a secure booking link for your deposit.',
    category: 'Booking & Payments',
  },
  {
    question: 'Can all itineraries be customized to our preferences?',
    answer:
      'Yes, 100%! All our itineraries serve as inspiration. You can add extra nights, substitute hotels, modify day activities, or combine multiple countries (e.g. Sri Lanka with Maldives or Saudi Arabia with Bahrain).',
    category: 'General',
  },
  {
    question: 'What is included in the tour packages?',
    answer:
      'Our standard packages include private air-conditioned vehicle transport with an English-speaking chauffeur-guide, handpicked accommodation, daily breakfast (and half/full board as specified), monument entrance tickets, and 24/7 concierge assistance. International flights are generally excluded unless requested.',
    category: 'On the Tour',
  },
  {
    question: 'What are the visa requirements for Sri Lanka, Saudi Arabia, and Bahrain?',
    answer:
      'Sri Lanka offers a quick online ETA (Electronic Travel Authorization) for most nationalities. Saudi Arabia provides e-Visas and visa-on-arrival to citizens of over 60 countries. Bahrain provides an easy online e-Visa. Our travel team provides complete visa guidance upon confirmation.',
    category: 'Safety & Visas',
  },
  {
    question: 'What payment methods do you accept, and are transactions secure?',
    answer:
      'We accept major international credit/debit cards (Visa, MasterCard, American Express) through encrypted 3D-secure gateways, as well as international bank telegraphic transfers. A small deposit secures your booking, with the balance due closer to arrival.',
    category: 'Booking & Payments',
  },
  {
    question: 'Are chauffeur guides licensed and vehicles insured?',
    answer:
      'Yes. Every chauffeur-guide is fully vetted, licensed by the National Tourism Board, and fluent in English (with Arabic and French guides available on request). Our fleet of modern vehicles carries comprehensive passenger liability insurance.',
    category: 'Safety & Visas',
  },
];
