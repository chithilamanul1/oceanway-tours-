import os
import sys
import json
import re
from bs4 import BeautifulSoup

done_dir = r'D:\desktop\oceanway tours internaries\Done_Tours'

def parse_table_days(soup, default_accom='Selected Boutique Hotel'):
    table = soup.find('table')
    if not table:
        return []
    days = []
    rows = table.find_all('tr')
    for i, r in enumerate(rows[1:], 1):
        tds = [td.get_text(strip=True) for td in r.find_all('td')]
        if len(tds) >= 4:
            raw_num = re.sub(r'\D', '', tds[0])
            day_num = int(raw_num) if raw_num else i
            title = tds[2] if len(tds) > 2 else tds[1]
            accom = tds[3] if len(tds) > 3 else default_accom
            desc = tds[4] if len(tds) > 4 else title
            acts = [a.strip() for a in desc.split(',') if len(a.strip()) > 3]
            if not acts:
                acts = [title]
            days.append({
                'day': day_num,
                'title': title,
                'description': desc or title,
                'activities': acts,
                'accommodation': accom,
                'meals': {'breakfast': True, 'lunch': False, 'dinner': True},
                'transferTime': 'Scenic private transfer'
            })
    return days

tours = []

# 1. Family Fun & Cultural Triangle
soup1 = BeautifulSoup(open(os.path.join(done_dir, 'Family Fun & Cultural Triangle - Oceanway Tours.html'), 'r', encoding='utf-8', errors='ignore').read(), 'html.parser')
tours.append({
    'id': 'family-fun-cultural-triangle',
    'title': 'Family Fun & Cultural Triangle',
    'destinationId': 'dest-sigiriya',
    'destinationName': 'Sri Lanka',
    'duration': 8,
    'groupSize': 'Family / 2–8 Pax',
    'difficulty': 'Easy',
    'price': 980,
    'season': 'Year-round',
    'image': '/tours/img1.jpg',
    'summary': 'A customized 8-day luxury family expedition through Sri Lanka\'s legendary Cultural Triangle, misty tea highlands, and golden western shores. Enjoy child-friendly excursions, pool resorts, elephant encounters, and private vehicle comfort throughout.',
    'highlights': [
        'Ascend the UNESCO 5th-century Sigiriya Rock Fortress',
        'Watch river elephants bathe at Pinnawala Elephant Sanctuary',
        'Speedboat rides and strawberry greenhouse treats in Nuwara Eliya',
        'Traditional catamaran ride and village lunch experience',
        'Relaxing beach finale on Negombo golden shores'
    ],
    'tier': 'Tailor-Made',
    'theme': 'Culture',
    'dayPlans': parse_table_days(soup1, 'Family Resort & Spa'),
    'inclusions': [
        'Private luxury air-conditioned vehicle with dedicated English-speaking chauffeur-guide',
        '07 Nights accommodation in family-friendly 4* or 5* pool resorts',
        'Daily breakfast and dinners included',
        'All entrance fees and excursions mentioned in the itinerary',
        'Highway tolls, fuel, driver allowances, and government taxes'
    ],
    'exclusions': [
        'International airfare and entry visas',
        'Lunch, drinks, and personal expenses',
        'Optional activities not specified',
        'Chauffeur gratuities'
    ],
    'seoTitle': 'Family Fun & Cultural Triangle | OceanWay Tours',
    'seoDescription': 'A tailored 8-day family tour of Sri Lanka covering Sigiriya, Kandy, Nuwara Eliya, and Negombo. Fully customizable and editable.'
})

# 2. Off-the-Beaten-Path & The Untouched East
soup2 = BeautifulSoup(open(os.path.join(done_dir, 'Off-the-Beaten-Path & The Untouched East - Oceanway Tours.html'), 'r', encoding='utf-8', errors='ignore').read(), 'html.parser')
tours.append({
    'id': 'off-the-beaten-path-untouched-east',
    'title': 'Off-the-Beaten-Path & The Untouched East',
    'destinationId': 'dest-trincomalee',
    'destinationName': 'Sri Lanka',
    'duration': 14,
    'groupSize': 'Flexible / 2–10 Pax',
    'difficulty': 'Moderate',
    'price': 1850,
    'season': 'May – October',
    'image': '/tours/img_main_cover.jpg',
    'summary': 'A non-commercialized 14-day expedition designed for travelers who seek remote wilderness, calm turquoise bays, and authentic encounters. Experience tranquil jeep safaris in Wilpattu, coral snorkeling in Trincomalee, boat safaris watching swimming elephants in Gal Oya, and genuine indigenous Vedda forest walks.',
    'highlights': [
        'Full-day 4x4 leopard safari in Wilpattu National Park',
        'Pigeon Island coral reef snorkeling with reef sharks & sea turtles',
        'Gal Oya boat safari watching wild swimming elephants',
        'Indigenous Vedda forest immersion and ancient trails',
        'Relaxed beach days along pristine Pasikudah Bay'
    ],
    'tier': 'Tailor-Made',
    'theme': 'Adventure',
    'dayPlans': parse_table_days(soup2, 'Wilderness Eco-Lodge / Beach Retreat'),
    'inclusions': [
        'Dedicated 4x4 safari vehicles and private air-conditioned touring transport',
        '13 Nights accommodation in eco-luxury lodges, safari camps, and beachfront villas',
        'Daily breakfast and dinners included',
        'National park entry permits, ranger fees, and boat safari charges',
        'Mineral water, cooling towels, and full driver-guide services'
    ],
    'exclusions': [
        'International air tickets and travel insurance',
        'Lunch and alcoholic beverages',
        'Tips for safari trackers and boatmen'
    ],
    'seoTitle': 'Off-the-Beaten-Path & The Untouched East | OceanWay Tours',
    'seoDescription': '14-Day expedition through Wilpattu, Trincomalee, Pasikudah, and Gal Oya. 100% customizable and editable.'
})

# 3. Romantic Ceylon Honeymoon Escape
soup3 = BeautifulSoup(open(os.path.join(done_dir, 'Romantic Ceylon Honeymoon Escape - Oceanway Tours.html'), 'r', encoding='utf-8', errors='ignore').read(), 'html.parser')
tours.append({
    'id': 'romantic-ceylon-honeymoon-escape',
    'title': 'Romantic Ceylon: Honeymoon & Coastal Escape',
    'destinationId': 'dest-galle',
    'destinationName': 'Sri Lanka',
    'duration': 5,
    'groupSize': 'Couples / Private',
    'difficulty': 'Easy',
    'price': 710,
    'season': 'November – April',
    'image': '/tours/saman_villas.jpg',
    'summary': 'An intimate 5-day romantic escape designed for couples, featuring luxury boutique stays, scenic mountain train journeys, candlelit beach dinners, and historical walking tours through UNESCO-listed Galle Fort.',
    'highlights': [
        'Private beachfront candlelight dinner with complimentary champagne',
        'Scenic highland tea country and roaring waterfalls',
        'Temple of the Tooth Relic VIP guided tour in Kandy',
        'Romantic sunset stroll along the ramparts of Galle Dutch Fort',
        'Luxury beachfront boutique stay with couples wellness spa treatment'
    ],
    'tier': 'Tailor-Made',
    'theme': 'Honeymoon',
    'dayPlans': parse_table_days(soup3, 'Luxury Boutique Hotel / Villa'),
    'inclusions': [
        'Private luxury sedan vehicle with dedicated English-speaking chauffeur',
        '04 Nights accommodation in 5* luxury honeymoon suites / boutique villas',
        'Daily romantic breakfasts and candlelit dinners',
        'Honeymoon cake, bed decoration, and welcome amenities',
        'All excursion transfers and site entrance fees'
    ],
    'exclusions': [
        'International flights and visas',
        'Personal spa treatments and lunches',
        'Driver tips'
    ],
    'seoTitle': 'Romantic Ceylon Honeymoon Escape | OceanWay Tours',
    'seoDescription': 'Intimate 5-day honeymoon escape across Kandy, Nuwara Eliya, and Galle Fort. Fully customizable and editable.'
})

# 4. The Cool Highlands & Luxury Retreat
soup4 = BeautifulSoup(open(os.path.join(done_dir, 'The Cool Highlands & Luxury Retreat - Oceanway Tours.html'), 'r', encoding='utf-8', errors='ignore').read(), 'html.parser')
tours.append({
    'id': 'cool-highlands-luxury-retreat',
    'title': 'The Cool Highlands & Luxury Retreat',
    'destinationId': 'dest-kandy',
    'destinationName': 'Sri Lanka',
    'duration': 7,
    'groupSize': 'Private / 2–8 Pax',
    'difficulty': 'Easy',
    'price': 890,
    'season': 'Year-round (Best Dec – April)',
    'image': '/tours/heritance_tea_factory.jpg',
    'summary': 'A signature 7-day luxury circuit taking discerning travelers through the mist-wrapped tea valleys, royal hill capitals, and colonial heritage estates of Sri Lanka with 5-star colonial boutique hospitality.',
    'highlights': [
        '5-Star luxury heritage stays including Heritance Tea Factory',
        'Private tea picking and artisan tasting masterclasses',
        'Panoramic Kandy to Nuwara Eliya mountain train ride',
        'Royal Botanical Gardens private naturalist walking tour',
        'Sunset high tea overlooking emerald tea slopes'
    ],
    'tier': 'Tailor-Made',
    'theme': 'Culture',
    'dayPlans': parse_table_days(soup4, 'Colonial Heritage Hotel / 5-Star Resort'),
    'inclusions': [
        'Private luxury chauffeured transportation throughout the journey',
        '06 Nights 5-star luxury heritage & boutique hotel accommodation',
        'Daily gourmet breakfasts and fine dining dinners',
        'First-class scenic highland train tickets',
        'VIP guided excursions and private factory tours'
    ],
    'exclusions': [
        'Airfare and visa fees',
        'Lunches and beverages',
        'Driver tips'
    ],
    'seoTitle': 'The Cool Highlands & Luxury Retreat | OceanWay Tours',
    'seoDescription': '7-Day luxury tea highlands retreat staying in colonial heritage resorts. Fully customizable and editable.'
})

# 5. The Grand Ceylon Explorer
soup5 = BeautifulSoup(open(os.path.join(done_dir, 'The Grand Ceylon Explorer - Oceanway Tours.html'), 'r', encoding='utf-8', errors='ignore').read(), 'html.parser')
tours.append({
    'id': 'the-grand-ceylon-explorer',
    'title': 'The Grand Ceylon Explorer',
    'destinationId': 'dest-colombo',
    'destinationName': 'Sri Lanka',
    'duration': 14,
    'groupSize': 'Small Group / 2–12 Pax',
    'difficulty': 'Moderate',
    'price': 1890,
    'season': 'Year-round',
    'image': '/tours/tea_plantation_sl.jpg',
    'summary': 'The definitive two-week grand voyage across Sri Lanka. Spanning ancient kingdoms, sacred UNESCO sanctuaries, wildlife-rich national parks, cool emerald tea hills, and idyllic turquoise beaches.',
    'highlights': [
        'Ancient capitals of Sigiriya, Polonnaruwa & Kandy',
        'Big-game leopard & elephant safaris in Yala & Wilpattu',
        'First-class scenic train through mountain tea valleys',
        'Whale watching and marine wildlife off Mirissa coast',
        'Colonial ramparts and artisan boutiques of Galle Fort'
    ],
    'tier': 'Small Group',
    'theme': 'Culture',
    'dayPlans': parse_table_days(soup5, 'Premium 4* and 5* Hotels'),
    'inclusions': [
        'Comprehensive 14-day chauffeured private transportation',
        '13 Nights accommodation in handpicked 4* and 5* hotels',
        'Daily breakfast and dinners',
        'All safari 4x4 jeeps, park permits, and temple entry tickets',
        'Dedicated tour manager and 24/7 travel concierge'
    ],
    'exclusions': [
        'International flights',
        'Lunches and personal expenses',
        'Travel insurance'
    ],
    'seoTitle': 'The Grand Ceylon Explorer | OceanWay Tours',
    'seoDescription': '14-Day comprehensive grand tour of Sri Lanka covering history, tea hills, wildlife safaris, and beaches. Fully customizable.'
})

# 6. The Island Pulse & Youth Adventure
soup6 = BeautifulSoup(open(os.path.join(done_dir, 'The Island Pulse & Youth Adventure - Oceanway Tours.html'), 'r', encoding='utf-8', errors='ignore').read(), 'html.parser')
tours.append({
    'id': 'island-pulse-youth-adventure',
    'title': 'The Island Pulse: Surf, Sky & Coastal Nights',
    'destinationId': 'dest-ella',
    'destinationName': 'Sri Lanka',
    'duration': 10,
    'groupSize': 'Young Travelers / 4–16 Pax',
    'difficulty': 'Challenging',
    'price': 850,
    'season': 'Year-round',
    'image': '/tours/nuwara_tea_rolling.jpg',
    'summary': 'An action-packed 10-day youth and adventure trip blending world-class surf breaks, waterfall hikes, cloud forest zip-lining in Ella, safari glamping, and vibrant coastal sunset sessions.',
    'highlights': [
        'Surfing lessons in Weligama & Hiriketiya bays with local pros',
        'Flying Ravana mega zip-line & Ella Rock sunrise hike',
        'Scenic mountain train ride with iconic open-door viewpoints',
        'Night safari & bonfire barbecue under tropical skies',
        'Beach party & seafood dining in Mirissa'
    ],
    'tier': 'Fixed Getaway',
    'theme': 'Adventure',
    'dayPlans': parse_table_days(soup6, 'Surf Resort / Eco-Lodge'),
    'inclusions': [
        'Comfortable air-conditioned adventure mini-coach with fun tour leader',
        '09 Nights accommodation in high-vibe surf resorts and boutique hostels',
        'Daily breakfasts and welcome beach BBQ',
        'Surfboard rentals and professional coaching session',
        'Zip-lining, train tickets, and hiking permits'
    ],
    'exclusions': [
        'Flights and visas',
        'Daily lunches and alcoholic drinks',
        'Personal gear'
    ],
    'seoTitle': 'The Island Pulse: Surf, Sky & Coastal Nights | OceanWay Tours',
    'seoDescription': '10-Day active youth trip in Sri Lanka featuring surfing, hiking Ella, and southern beach life. Fully customizable and editable.'
})

# 7. The Ultimate Hiking & Adventure Trail
soup7 = BeautifulSoup(open(os.path.join(done_dir, 'The Ultimate Hiking & Adventure Trail - Oceanway Tours.html'), 'r', encoding='utf-8', errors='ignore').read(), 'html.parser')
tours.append({
    'id': 'ultimate-hiking-adventure-trail',
    'title': 'The Ultimate Hiking & Adventure Trail',
    'destinationId': 'dest-ella',
    'destinationName': 'Sri Lanka',
    'duration': 12,
    'groupSize': 'Active / 2–10 Pax',
    'difficulty': 'Challenging',
    'price': 1420,
    'season': 'Jan – Apr / Aug – Sep',
    'image': '/tours/img2.jpg',
    'summary': 'A premier 12-day active trekking and immersion expedition across the central highlands, Knuckles Mountain Range, legendary Pekoe Trail stages, and cloud forest escarpments of Horton Plains.',
    'highlights': [
        'Trekking the UNESCO Knuckles Mountain Range with wilderness camping',
        'Walking curated stages of the famous Pekoe Trail through tea estates',
        'World\'s End cliff edge and Horton Plains cloud forest plateau',
        'Little Adam\'s Peak & Ella Rock trail circuits',
        'White-water rafting along the Kelani River in Kitulgala'
    ],
    'tier': 'Small Group',
    'theme': 'Adventure',
    'dayPlans': parse_table_days(soup7, 'Mountain Lodge / Wilderness Camp'),
    'inclusions': [
        'Dedicated adventure trekking guides and support vehicle',
        '11 Nights accommodation in eco-mountain lodges and tented camps',
        'All meals on trekking days (Breakfast, packed Trail Lunch, Dinner)',
        'Knuckles & Horton Plains national park permits',
        'Luggage transfers between hiking stages'
    ],
    'exclusions': [
        'Flights and visa',
        'Personal hiking gear and trekking poles',
        'Tips for local trail guides'
    ],
    'seoTitle': 'The Ultimate Hiking & Adventure Trail | OceanWay Tours',
    'seoDescription': '12-Day trekking adventure through the Pekoe Trail, Knuckles Mountains, and Horton Plains. Fully customizable and editable.'
})

# 8. Wildlife Safari & Luxury Coastal Escape
soup8 = BeautifulSoup(open(os.path.join(done_dir, 'Wildlife Safari & Luxury Coastal Escape - Oceanway Tours.html'), 'r', encoding='utf-8', errors='ignore').read(), 'html.parser')
tours.append({
    'id': 'wildlife-safari-luxury-coastal',
    'title': 'Wildlife Safari & Luxury Coastal Escape',
    'destinationId': 'dest-yala',
    'destinationName': 'Sri Lanka',
    'duration': 7,
    'groupSize': 'Private / 2–8 Pax',
    'difficulty': 'Easy',
    'price': 1150,
    'season': 'November – April',
    'image': '/tours/img_cover_divider.jpg',
    'summary': 'A bespoke 7-day luxury journey pairing high-density big-game wildlife safaris in Yala and Udawalawe with relaxed seaside elegance along Sri Lanka\'s sun-drenched southern riviera.',
    'highlights': [
        'Multiple private 4x4 safaris in Yala National Park tracking leopards',
        'Udawalawe Elephant Transit Home feeding session',
        'Luxury glamping / safari lodge experience with jungle sounds',
        'Scenic coastal relaxation in Mirissa & Tangalle beach bays',
        'Historic Galle Fort walking tour & fine coastal dining'
    ],
    'tier': 'Tailor-Made',
    'theme': 'Wildlife',
    'dayPlans': parse_table_days(soup8, 'Luxury Safari Lodge / Beachfront Resort'),
    'inclusions': [
        'Private luxury air-conditioned touring vehicle and chauffeur',
        '06 Nights luxury safari lodge and beach resort accommodation',
        'Daily breakfast and dinners included',
        'Exclusive 4x4 safari jeeps with experienced trackers and park permits',
        'All site admissions and taxes'
    ],
    'exclusions': [
        'Flights and entry visas',
        'Lunches and beverages',
        'Gratuities for driver and safari trackers'
    ],
    'seoTitle': 'Wildlife Safari & Luxury Coastal Escape | OceanWay Tours',
    'seoDescription': '7-Day big game leopard safaris and luxury beach relaxation in Sri Lanka. Fully customizable and editable.'
})

# 9. 3-Day The Essence of Bahrain
tours.append({
    'id': '3-day-the-essence-of-bahrain',
    'title': '3-Day The Essence of Bahrain - Heritage & Modern Wonders',
    'destinationId': 'dest-manama',
    'destinationName': 'Bahrain',
    'duration': 3,
    'groupSize': '2–15 Pax',
    'difficulty': 'Easy',
    'price': 375,
    'season': 'October – April',
    'image': '/tours/bahrain_assets/3day/p1_Image4.jpg',
    'summary': 'A curated 3-day short break exploring the captivating island kingdom of Bahrain. Discover the world\'s largest grand mosques, ancient Bahrain Fort, bustling Manama Souq, and modern waterfront marvels.',
    'highlights': [
        'Al Fateh Grand Mosque guided architectural visit',
        'Bahrain National Museum & ancient Dilmun civilization relics',
        'Qal\'at al-Bahrain (Bahrain Fort) UNESCO sunset tour',
        'Manama Souq spice, perfume & gold market immersion',
        'Private airport arrival and departure transfers'
    ],
    'tier': 'Fixed Getaway',
    'theme': 'History',
    'dayPlans': [
        {
            'day': 1,
            'title': 'Arrival in Bahrain & Hotel Check-in',
            'description': 'Upon arrival at Bahrain International Airport, you will be warmly welcomed by our representative and transferred to your hotel in Manama. Evening at leisure to unwind.',
            'activities': ['Airport meet and greet', 'Private transfer to Manama', 'Hotel check-in', 'Evening leisure'],
            'accommodation': '4* or 5* City Hotel (Manama)',
            'meals': {'breakfast': False, 'lunch': False, 'dinner': True},
            'transferTime': '20 mins airport transfer'
        },
        {
            'day': 2,
            'title': 'Heritage Tour of Manama & Historic Souq',
            'description': 'Enjoy breakfast at your hotel before embarking on a guided tour of Manama. Visit Al Fateh Grand Mosque, Bahrain National Museum, Qal\'at al-Bahrain (Bahrain Fort), and explore the vibrant Manama Souq.',
            'activities': ['Al Fateh Grand Mosque tour', 'Bahrain National Museum', 'Bahrain Fort UNESCO visit', 'Bab Al Bahrain & Souq shopping'],
            'accommodation': '4* or 5* City Hotel (Manama)',
            'meals': {'breakfast': True, 'lunch': False, 'dinner': True},
            'transferTime': 'Full day city touring'
        },
        {
            'day': 3,
            'title': 'Leisure & Departure Transfer',
            'description': 'Breakfast at hotel. Free morning for last-minute souvenir shopping before your private transfer to Bahrain International Airport for your departure flight.',
            'activities': ['Hotel breakfast', 'Souvenir shopping', 'Private airport departure transfer'],
            'accommodation': 'Departure',
            'meals': {'breakfast': True, 'lunch': False, 'dinner': False},
            'transferTime': '20 mins airport transfer'
        }
    ],
    'inclusions': [
        '02 Nights accommodation in selected 4* or 5* hotel with daily breakfast',
        'Private airport transfers on arrival and departure',
        'Full day guided Heritage Tour of Manama in air-conditioned vehicle',
        'English-speaking professional guide during tours',
        'Entrance tickets to Bahrain National Museum and Bahrain Fort'
    ],
    'exclusions': [
        'International flights and Bahrain entry visa',
        'Meals not mentioned in the itinerary',
        'Personal expenses and gratuities'
    ],
    'seoTitle': '3-Day The Essence of Bahrain | OceanWay Tours',
    'seoDescription': 'Discover Bahrain in 3 days: Al Fateh Mosque, Bahrain Fort, National Museum, and Manama Souq. Fully customizable and editable.'
})

# 10. 4-Day Ultimate Bahrain Discovery
tours.append({
    'id': '4-day-ultimate-bahrain-discovery',
    'title': '4-Day Ultimate Bahrain Discovery',
    'destinationId': 'dest-manama',
    'destinationName': 'Bahrain',
    'duration': 4,
    'groupSize': '2–15 Pax',
    'difficulty': 'Easy',
    'price': 590,
    'season': 'October – April',
    'image': '/tours/bahrain_assets/4day/p1_Image4.jpg',
    'summary': 'An immersive 4-day journey across Bahrain\'s ancient past and dynamic present. Uncover ancient burial mounds, traditional pottery craft villages, the mystical Tree of Life in the southern desert, and gleaming skyline marinas.',
    'highlights': [
        'Mystical 400-year-old Tree of Life in the southern desert',
        'Centuries-old A\'ali pottery craft workshops and master artisans',
        'Royal Camel Farm in Janabiyah & Bahrain Fort UNESCO site',
        'First Oil Well in the Middle East & historic monument',
        'Private city and desert excursions with professional guide'
    ],
    'tier': 'Small Group',
    'theme': 'Culture',
    'dayPlans': [
        {
            'day': 1,
            'title': 'Arrival in Bahrain & Hotel Welcome',
            'description': 'Arrive at Bahrain International Airport, private transfer to your hotel in Manama, check in and relax.',
            'activities': ['VIP airport welcome', 'Private hotel transfer', 'Evening leisure'],
            'accommodation': '4* or 5* Hotel (Manama)',
            'meals': {'breakfast': False, 'lunch': False, 'dinner': True},
            'transferTime': '20 mins'
        },
        {
            'day': 2,
            'title': 'Heritage Tour of Manama',
            'description': 'Full day exploring Al Fateh Grand Mosque, Bahrain National Museum, Qal\'at al-Bahrain (Bahrain Fort), and Bab Al Bahrain with Manama Souq.',
            'activities': ['Al Fateh Grand Mosque', 'Bahrain National Museum', 'Bahrain Fort', 'Manama Souq'],
            'accommodation': '4* or 5* Hotel (Manama)',
            'meals': {'breakfast': True, 'lunch': False, 'dinner': True},
            'transferTime': 'City tour'
        },
        {
            'day': 3,
            'title': 'Desert & Heritage Discovery Tour',
            'description': 'Discover A\'ali Pottery Workshops, the ancient Dilmun Burial Mounds, the First Oil Well, the mystical Tree of Life, and exterior views of the Bahrain International Circuit.',
            'activities': ['A\'ali Pottery workshops', 'Dilmun Burial Mounds', 'First Oil Well', 'Tree of Life', 'BIC photo stop'],
            'accommodation': '4* or 5* Hotel (Manama)',
            'meals': {'breakfast': True, 'lunch': False, 'dinner': True},
            'transferTime': 'Desert excursion'
        },
        {
            'day': 4,
            'title': 'Departure',
            'description': 'Breakfast at hotel, check out and transfer to Bahrain International Airport for your onward journey.',
            'activities': ['Hotel breakfast', 'Airport transfer'],
            'accommodation': 'Departure',
            'meals': {'breakfast': True, 'lunch': False, 'dinner': False},
            'transferTime': '20 mins'
        }
    ],
    'inclusions': [
        '03 Nights accommodation with daily breakfast in 4* or 5* hotel',
        'Private arrival and departure airport transfers',
        'Full Day Manama Heritage Tour & Half Day Desert Discovery Tour',
        'Professional English-speaking guide and entrance tickets',
        'All government taxes'
    ],
    'exclusions': [
        'Flight tickets and visa charges',
        'Lunch, dinner, and beverages',
        'Tips and porterage'
    ],
    'seoTitle': '4-Day Ultimate Bahrain Discovery | OceanWay Tours',
    'seoDescription': '4-Day tour of Bahrain covering Manama city sights, A\'ali pottery, and the desert Tree of Life. Fully customizable.'
})

# 11. 5-Day Pearls of Bahrain
tours.append({
    'id': '5-day-pearls-of-bahrain',
    'title': '5-Day Pearls of Bahrain – Heritage & City Tour',
    'destinationId': 'dest-manama',
    'destinationName': 'Bahrain',
    'duration': 5,
    'groupSize': '2–15 Pax',
    'difficulty': 'Easy',
    'price': 805,
    'season': 'October – April',
    'image': '/tours/bahrain_assets/5day/p1_Image4.jpg',
    'summary': 'A comprehensive 5-day cultural expedition along the UNESCO Pearling Path in Muharraq, modern financial towers, historic merchant houses, and desert wonders.',
    'highlights': [
        'UNESCO Pearling Path walking trail & Bu Maher Fort',
        'Restored merchant homes of Shaikh Isa & Kurar House embroidery center',
        'Desert safari visiting the 400-year-old Tree of Life & First Oil Well',
        'Al Fateh Grand Mosque and Bahrain National Museum',
        '4-Star or 5-Star luxury hotel stay with daily breakfast'
    ],
    'tier': 'Tailor-Made',
    'theme': 'Culture',
    'dayPlans': [
        {
            'day': 1,
            'title': 'Arrival in Bahrain & Hotel Check-in',
            'description': 'Warm airport reception and transfer to your luxury hotel in Manama. Remainder of day free to enjoy hotel amenities.',
            'activities': ['Airport reception', 'Private transfer', 'Evening leisure'],
            'accommodation': '4* or 5* Hotel (Manama)',
            'meals': {'breakfast': False, 'lunch': False, 'dinner': True},
            'transferTime': '20 mins'
        },
        {
            'day': 2,
            'title': 'Heritage Tour of Manama',
            'description': 'Guided tour visiting Al Fateh Grand Mosque, National Museum, Bahrain Fort, and bustling Bab Al Bahrain souqs.',
            'activities': ['Al Fateh Grand Mosque', 'Bahrain National Museum', 'Bahrain Fort', 'Manama Souq'],
            'accommodation': '4* or 5* Hotel (Manama)',
            'meals': {'breakfast': True, 'lunch': False, 'dinner': True},
            'transferTime': 'City tour'
        },
        {
            'day': 3,
            'title': 'Desert & Southern Heritage Tour',
            'description': 'Explore traditional A\'ali pottery kilns, Royal Camel Farm, First Oil Well, the miraculous Tree of Life, and Bahrain International Circuit.',
            'activities': ['A\'ali Pottery', 'Royal Camel Farm', 'First Oil Well', 'Tree of Life', 'BIC photo stop'],
            'accommodation': '4* or 5* Hotel (Manama)',
            'meals': {'breakfast': True, 'lunch': False, 'dinner': True},
            'transferTime': 'Desert excursion'
        },
        {
            'day': 4,
            'title': 'Pearling Heritage Discovery Tour in Muharraq',
            'description': 'Walk the historic UNESCO Pearling Path in Muharraq. Visit Bu Maher Fort, Shaikh Isa Bin Ali House, Kurar embroidery house, and Muharraq traditional souq.',
            'activities': ['Bu Maher Fort', 'UNESCO Pearling Path', 'Shaikh Isa Bin Ali House', 'Kurar House', 'Muharraq Souq'],
            'accommodation': '4* or 5* Hotel (Manama)',
            'meals': {'breakfast': True, 'lunch': False, 'dinner': True},
            'transferTime': 'Half day touring'
        },
        {
            'day': 5,
            'title': 'Departure',
            'description': 'Breakfast at hotel, free time for shopping, then transfer to airport for your departure flight.',
            'activities': ['Breakfast', 'Airport departure transfer'],
            'accommodation': 'Departure',
            'meals': {'breakfast': True, 'lunch': False, 'dinner': False},
            'transferTime': '20 mins'
        }
    ],
    'inclusions': [
        '04 Nights accommodation with daily breakfast in 4* or 5* hotel',
        'Private airport transfers on arrival and departure',
        'Full day Manama Tour, Desert Tour, and Muharraq Pearling Tour',
        'Licensed English guide, entrance fees, and bottled water',
        'All applicable government taxes'
    ],
    'exclusions': [
        'International flights and visas',
        'Meals not specified',
        'Personal expenses and gratuities'
    ],
    'seoTitle': '5-Day Pearls of Bahrain – Heritage & City Tour | OceanWay Tours',
    'seoDescription': '5-Day in-depth tour of Bahrain featuring the UNESCO Pearling Path, Manama, and desert highlights. 100% customizable.'
})

# 12. Formula 1 Bahrain Grand Prix 2027 Experience
tours.append({
    'id': 'bahrain-grand-prix-2027',
    'title': 'Formula 1 Bahrain Grand Prix 2027 Experience',
    'destinationId': 'dest-manama',
    'destinationName': 'Bahrain',
    'duration': 5,
    'groupSize': '2–20 Pax',
    'difficulty': 'Easy',
    'price': 520,
    'season': 'March 2027',
    'image': '/tours/bahrain_f1/f1_cover_bg.png',
    'summary': 'The official motorsport package for the Bahrain Formula 1 Grand Prix 2027 at Bahrain International Circuit (BIC), Sakhir. Includes 4-star or 5-star hotel accommodation in Manama, 3-day Victory Grandstand ticket, and circuit transfers.',
    'highlights': [
        'Official 3-Day Victory Grandstand tickets with prime views',
        'Thrilling night racing action at Bahrain International Circuit',
        'Access to F1 Fan Village, live concerts and track celebrations',
        '04 Nights hotel stay in Manama with daily breakfast',
        'Special Bahrain F1 entry visa support and circuit shuttles'
    ],
    'tier': 'Fixed Getaway',
    'theme': 'Adventure',
    'dayPlans': [
        {
            'day': 1,
            'title': 'Arrival in Bahrain & Hotel Check-in',
            'description': 'Arrive at Bahrain International Airport, transfer to your selected 4* or 5* hotel in Manama. Evening free to explore the vibrant city.',
            'activities': ['Airport arrival reception', 'Transfer to Manama hotel', 'Ticket collection briefing', 'Evening leisure'],
            'accommodation': 'Bahrain International / Golden Tulip',
            'meals': {'breakfast': False, 'lunch': False, 'dinner': True},
            'transferTime': '20 mins'
        },
        {
            'day': 2,
            'title': 'F1 Practice Sessions & Support Races',
            'description': 'Circuit transfer to Sakhir. Witness Formula 1 Free Practice sessions 1 & 2, Porsche Supercup, and F2 support championships from your Victory Grandstand seat.',
            'activities': ['Circuit shuttle transfer', 'F1 Free Practice 1 & 2', 'Victory Grandstand access', 'F1 Fan Zone experiences'],
            'accommodation': 'Bahrain International / Golden Tulip',
            'meals': {'breakfast': True, 'lunch': False, 'dinner': True},
            'transferTime': 'Circuit shuttle'
        },
        {
            'day': 3,
            'title': 'F1 Qualifying Session Under the Lights',
            'description': 'Full day at Bahrain International Circuit. Watch Practice 3 and the high-stakes Saturday Qualifying session under the floodlights, followed by live international artist concerts.',
            'activities': ['F1 Practice 3', 'Official F1 Qualifying Session', 'Pit lane walk / Fan Village concerts'],
            'accommodation': 'Bahrain International / Golden Tulip',
            'meals': {'breakfast': True, 'lunch': False, 'dinner': True},
            'transferTime': 'Circuit shuttle'
        },
        {
            'day': 4,
            'title': 'The 2027 Bahrain Grand Prix Main Race Day',
            'description': 'The ultimate race day! Enjoy driver parade, pre-race ceremony, the 57-lap Bahrain Grand Prix night race, post-race fireworks, podium celebration, and closing festival concerts.',
            'activities': ['F1 Drivers Parade', 'Bahrain Grand Prix Night Race', 'Podium ceremony & fireworks', 'After-race concerts'],
            'accommodation': 'Bahrain International / Golden Tulip',
            'meals': {'breakfast': True, 'lunch': False, 'dinner': True},
            'transferTime': 'Circuit shuttle'
        },
        {
            'day': 5,
            'title': 'Departure from Bahrain',
            'description': 'Breakfast at hotel, check out and private transfer to Bahrain International Airport for your departure flight.',
            'activities': ['Hotel breakfast', 'Airport departure transfer'],
            'accommodation': 'Departure',
            'meals': {'breakfast': True, 'lunch': False, 'dinner': False},
            'transferTime': '20 mins'
        }
    ],
    'inclusions': [
        '04 Nights hotel accommodation with daily breakfast (sharing double/twin room)',
        '03-Day Bahrain Grand Prix Victory Grandstand Ticket',
        'Complimentary circuit shuttle transfers between designated locations and BIC',
        'Special Bahrain F1 Entry Visa assistance',
        'All applicable government taxes'
    ],
    'exclusions': [
        'International flights',
        'Grandstand upgrade charges (Main Grandstand available on request)',
        'Lunches, dinners, and personal incidentals',
        'Travel insurance'
    ],
    'seoTitle': 'Formula 1 Bahrain Grand Prix 2027 Experience | OceanWay Tours',
    'seoDescription': 'Official 5-Day Bahrain F1 Grand Prix package: Hotel stay, 3-day Grandstand tickets, and circuit transfers. Fully customizable.'
})

print(f'Total tours generated: {len(tours)}')

# Write merged_itineraries.json
with open('merged_itineraries.json', 'w', encoding='utf-8') as f:
    json.dump(tours, f, indent=2, ensure_ascii=False)
print('Saved to merged_itineraries.json')

# Write src/data/extraItineraries.ts
ts_content = 'export const extraItineraries = ' + json.dumps(tours, indent=2, ensure_ascii=False) + ';\n'
with open(os.path.join('src', 'data', 'extraItineraries.ts'), 'w', encoding='utf-8') as f:
    f.write(ts_content)
print('Saved to src/data/extraItineraries.ts')
