import LandModel from '../models/land.model.js';

// Add Land Controller
export const addLand = async (req, res) => {
    const {
        owner,
        location,
        soilType,
        soilNutrientContent,
        waterAvailability,
        landSize,
        terrain,
        climate,
        cropHistory,
        rentalPrice,
        soilErosionRisk,
        irrigationSystem,
        suggestedCrops,
    } = req.body;

    try {
        // Create a new Land instance
        const newLand = new LandModel({
            owner,
            location,
            soilType,
            soilNutrientContent,
            waterAvailability,
            landSize,
            terrain,
            climate,
            cropHistory,
            rentalPrice,
            soilErosionRisk,
            irrigationSystem,
            suggestedCrops,
        });

        // Save the new land to the database
        await newLand.save();

        res.status(201).json({ message: 'Land added successfully', land: newLand });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update Land Controller
export const updateLand = async (req, res) => {
    const { landId } = req.params;
    const updateData = req.body;

    try {
        // Find the land by ID and update it with the new data
        const updatedLand = await LandModel.findByIdAndUpdate(landId, updateData, {
            new: true, // return the updated document
            runValidators: true // validate the data against the model schema
        });

        if (!updatedLand) {
            return res.status(404).json({ message: 'Land not found' });
        }

        res.status(200).json({ message: 'Land updated successfully', land: updatedLand });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Land Controller
export const getLand = async (req, res) => {
    const { landId } = req.params;

    try {
        // Find the land by ID
        const land = await LandModel.findById(landId);

        if (!land) {
            return res.status(404).json({ message: 'Land not found' });
        }

        res.status(200).json({ land });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// List Lands Controller
export const listLands = async (req, res) => {
    const { soilType, waterAvailability, minSize, maxSize, location } = req.query;

    try {
        // Build query object for filters
        let query = {};

        if (soilType) {
            query.soilType = soilType;
        }

        if (waterAvailability) {
            query['waterAvailability.source'] = waterAvailability;
        }

        if (minSize || maxSize) {
            query.landSize = {};
            if (minSize) query.landSize.$gte = minSize;
            if (maxSize) query.landSize.$lte = maxSize;
        }

        if (location) {
            query['location.address'] = { $regex: location, $options: 'i' }; // Case-insensitive search
        }

        // Find lands matching the query
        const lands = await LandModel.find(query);

        if (!lands.length) {
            return res.status(404).json({ message: 'No lands found' });
        }

        res.status(200).json({ lands });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
