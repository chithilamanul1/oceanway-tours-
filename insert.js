const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const itinerarySchema = new mongoose.Schema({
          id: String,
          title: String, destinationId: String, destinationName: String,
          duration: Number, groupSize: String, difficulty: String, price: Number,
          season: String, image: String, summary: String,
          highlights: [String], tier: String, theme: String,
          inclusions: [String], exclusions: [String],
          seoTitle: String, seoDescription: String,
          dayPlans: [mongoose.Schema.Types.Mixed]
        }, { timestamps: true });
        
        const Itinerary = mongoose.models.Itinerary || mongoose.model('Itinerary', itinerarySchema);

        const data = fs.readFileSync('merged_itineraries.json', 'utf8');
        let newItineraries = JSON.parse(data);
        
        const existing = await Itinerary.find({}, 'id').lean();
        const existingIds = new Set(existing.map((e) => e.id));
        
        const toInsert = [];
        for (const it of newItineraries) {
            let baseId = it.id || it.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            let id = baseId;
            let counter = 1;
            while (existingIds.has(id)) {
                id = baseId + '-' + counter;
                counter++;
            }
            existingIds.add(id);
            it.id = id;
            toInsert.push(it);
        }
        
        await Itinerary.insertMany(toInsert);
        console.log('Successfully inserted ' + toInsert.length + ' new itineraries into MongoDB.');
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
seed();
