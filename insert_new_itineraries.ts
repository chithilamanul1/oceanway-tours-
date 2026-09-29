import { connectDB } from './src/lib/mongodb';
import { Itinerary } from './src/lib/models';
import fs from 'fs';

async function seed() {
    try {
        await connectDB();
        
        const data = fs.readFileSync('merged_itineraries.json', 'utf8');
        let newItineraries = JSON.parse(data);
        
        // Ensure unique IDs
        const existing = await Itinerary.find({}, 'id').lean();
        const existingIds = new Set(existing.map((e: any) => e.id));
        
        const toInsert = [];
        for (const it of newItineraries) {
            let baseId = it.id || it.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            let id = baseId;
            let counter = 1;
            while (existingIds.has(id)) {
                id = `${baseId}-${counter}`;
                counter++;
            }
            existingIds.add(id);
            it.id = id;
            toInsert.push(it);
        }
        
        await Itinerary.insertMany(toInsert);
        console.log(`Successfully inserted ${toInsert.length} new itineraries into MongoDB.`);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

seed();
