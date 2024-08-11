import mongoose from 'mongoose';

const LandSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        address: { type: String, required: true },
        latitude: { type: Number },
        longitude: { type: Number }
    },
    soilType: {
        type: String,
        enum: ['Sandy', 'Clay', 'Silt', 'Loam', 'Peat', 'Chalk'],
        required: true
    },
    soilNutrientContent: {
        nitrogen: { type: Number, required: true }, // in percentage
        phosphorus: { type: Number, required: true }, // in percentage
        potassium: { type: Number, required: true }, // in percentage
        organicMatter: { type: Number, required: true }, // in percentage
        pH: { type: Number, required: true } // acidity/alkalinity level
    },
    waterAvailability: {
        source: { type: String, enum: ['River', 'Well', 'Rain-fed', 'Irrigation'], required: true },
        quantity: { type: Number, required: true }, // in cubic meters per season
        quality: { type: String, enum: ['Poor', 'Average', 'Good'], required: true }
    },
    landSize: {
        type: Number, // in acres or hectares
        required: true
    },
    terrain: {
        type: String,
        enum: ['Flat', 'Hilly', 'Undulating'],
        required: true
    },
    climate: {
        averageRainfall: { type: Number, required: true }, // in mm per year
        averageTemperature: { type: Number, required: true } // in Celsius
    },
    cropHistory: [
        {
            cropType: { type: String },
            yield: { type: Number }, // in metric tons per hectare or acre
            season: { type: String },
            year: { type: Number }
        }
    ],
    rentalPrice: {
        type: Number,
        required: true // in local currency per season or year
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    soilErosionRisk: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    },
    irrigationSystem: {
        type: String,
        enum: ['Drip', 'Sprinkler', 'Flood', 'None'],
        required: true
    },
    suggestedCrops: [
        {
            cropType: { type: String },
            expectedYield: { type: Number }, // in metric tons per hectare or acre
            profitabilityIndex: { type: Number } // based on market trends and input costs
        }
    ],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const LandModel = mongoose.model('Land', LandSchema);

export default LandModel;