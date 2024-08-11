import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addLand, updateLand } from '../slices/landSlice';

const LandPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { lands } = useSelector((state) => state.land);
    const [formData, setFormData] = useState({
        owner: user._id || '',
        location: { address: '', latitude: '', longitude: '' },
        soilType: '',
        soilNutrientContent: { nitrogen: '', phosphorus: '', potassium: '', organicMatter: '', pH: '' },
        waterAvailability: { source: '', quantity: '', quality: '' },
        landSize: '',
        terrain: '',
        climate: { averageRainfall: '', averageTemperature: '' },
        cropHistory: [{ cropType: '', yield: '', season: '', year: '' }],
        rentalPrice: '',
        soilErosionRisk: '',
        irrigationSystem: '',
        suggestedCrops: [{ cropType: '', expectedYield: '', profitabilityIndex: '' }]
    });
    const [errors, setErrors] = useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentLandId, setCurrentLandId] = useState(null);

    useEffect(() => {
        // Fetch lands on component mount
        const fetchLands = async () => {
            try {
                const response = await axios.get('/lands');
                dispatch({ type: 'land/setLands', payload: response.data.lands });
            } catch (error) {
                console.error('Error fetching lands', error);
            }
        };
        fetchLands();
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            location: {
                ...formData.location,
                [name]: value
            }
        });
    };

    const handleNutrientChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            soilNutrientContent: {
                ...formData.soilNutrientContent,
                [name]: value
            }
        });
    };

    const handleWaterChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            waterAvailability: {
                ...formData.waterAvailability,
                [name]: value
            }
        });
    };

    const handleClimateChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            climate: {
                ...formData.climate,
                [name]: value
            }
        });
    };

    const handleCropHistoryChange = (index, e) => {
        const { name, value } = e.target;
        const updatedCropHistory = [...formData.cropHistory];
        updatedCropHistory[index] = {
            ...updatedCropHistory[index],
            [name]: value
        };
        setFormData({
            ...formData,
            cropHistory: updatedCropHistory
        });
    };

    const handleSuggestedCropsChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSuggestedCrops = [...formData.suggestedCrops];
        updatedSuggestedCrops[index] = {
            ...updatedSuggestedCrops[index],
            [name]: value
        };
        setFormData({
            ...formData,
            suggestedCrops: updatedSuggestedCrops
        });
    };

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        if (!formData.location.address) {
            tempErrors.location = 'Address is required';
            isValid = false;
        }

        if (!formData.soilType) {
            tempErrors.soilType = 'Soil type is required';
            isValid = false;
        }

        if (formData.soilNutrientContent.nitrogen < 0 || formData.soilNutrientContent.nitrogen > 100) {
            tempErrors.soilNutrientContent = 'Nitrogen must be between 0 and 100';
            isValid = false;
        }

        // Add other validations as necessary...

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            if (isUpdating) {
                await dispatch(updateLand({ id: currentLandId, data: formData }));
                toast.success('Land updated successfully!');
            } else {
                await dispatch(addLand(formData));
                toast.success('Land added successfully!');
            }
            setFormData({
                owner: '',
                location: { address: '', latitude: '', longitude: '' },
                soilType: '',
                soilNutrientContent: { nitrogen: '', phosphorus: '', potassium: '', organicMatter: '', pH: '' },
                waterAvailability: { source: '', quantity: '', quality: '' },
                landSize: '',
                terrain: '',
                climate: { averageRainfall: '', averageTemperature: '' },
                cropHistory: [{ cropType: '', yield: '', season: '', year: '' }],
                rentalPrice: '',
                soilErosionRisk: '',
                irrigationSystem: '',
                suggestedCrops: [{ cropType: '', expectedYield: '', profitabilityIndex: '' }]
            });
            setIsUpdating(false);
        } catch (error) {
            toast.error('Error submitting form, please try again.');
        }
    };


    return (
        <div className="flex flex-col items-center justify-center bg-[url('./assets/demo01-slide-002.jpg')] bg-[#03072da4] bg-blend-overlay bg-cover bg-center bg-fixed h-full">
            <div className="w-full max-w-4xl mt-10">
                <div className="bg-[#0000004f] shadow-md rounded-lg p-8 backdrop-blur-[3px] border-[1px] border-slate-700">
                    <h3 className="text-2xl font-semibold text-white text-center mb-6">{isUpdating ? 'Update Land' : 'Add Land'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Owner : {user && user.firstName}</label>
                            <input
                                type="hidden"
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="owner"
                                value={formData.owner}
                                required
                                disabled
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Location Address</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="address"
                                value={formData.location.address}
                                onChange={handleLocationChange}
                                placeholder="Enter address"
                                required
                            />
                            {errors.location && <div className="text-red-400 text-xs mt-1">{errors.location}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Soil Type</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="soilType"
                                value={formData.soilType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select soil type</option>
                                <option value="Sandy">Sandy</option>
                                <option value="Clay">Clay</option>
                                <option value="Silt">Silt</option>
                                <option value="Loam">Loam</option>
                                <option value="Peat">Peat</option>
                                <option value="Chalk">Chalk</option>
                            </select>
                            {errors.soilType && <div className="text-red-400 text-xs mt-1">{errors.soilType}</div>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Soil Nutrient Content</label>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    name="nitrogen"
                                    value={formData.soilNutrientContent.nitrogen}
                                    onChange={handleNutrientChange}
                                    placeholder="Nitrogen (%)"
                                    min="0"
                                    max="100"
                                    required
                                />
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    name="phosphorus"
                                    value={formData.soilNutrientContent.phosphorus}
                                    onChange={handleNutrientChange}
                                    placeholder="Phosphorus (%)"
                                    min="0"
                                    max="100"
                                    required
                                />
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    name="potassium"
                                    value={formData.soilNutrientContent.potassium}
                                    onChange={handleNutrientChange}
                                    placeholder="Potassium (%)"
                                    min="0"
                                    max="100"
                                    required
                                />
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    name="organicMatter"
                                    value={formData.soilNutrientContent.organicMatter}
                                    onChange={handleNutrientChange}
                                    placeholder="Organic Matter (%)"
                                    min="0"
                                    max="100"
                                    required
                                />
                                <input
                                    type="number"
                                    className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    name="pH"
                                    value={formData.soilNutrientContent.pH}
                                    onChange={handleNutrientChange}
                                    placeholder="pH Level"
                                    step="0.1"
                                    min="0"
                                    max="14"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Water Availability</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="source"
                                value={formData.waterAvailability.source}
                                onChange={handleWaterChange}
                                required
                            >
                                <option value="">Select water source</option>
                                <option value="River">River</option>
                                <option value="Well">Well</option>
                                <option value="Rain-fed">Rain-fed</option>
                                <option value="Irrigation">Irrigation</option>
                            </select>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg mt-2"
                                name="quantity"
                                value={formData.waterAvailability.quantity}
                                onChange={handleWaterChange}
                                placeholder="Quantity (m³ per season)"
                                required
                            />
                            <select
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg mt-2"
                                name="quality"
                                value={formData.waterAvailability.quality}
                                onChange={handleWaterChange}
                                required
                            >
                                <option value="">Select water quality</option>
                                <option value="Poor">Poor</option>
                                <option value="Average">Average</option>
                                <option value="Good">Good</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Land Size</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="landSize"
                                value={formData.landSize}
                                onChange={handleChange}
                                placeholder="Land size (acres or hectares)"
                                min="0"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Terrain</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="terrain"
                                value={formData.terrain}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select terrain</option>
                                <option value="Flat">Flat</option>
                                <option value="Hilly">Hilly</option>
                                <option value="Undulating">Undulating</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Climate</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                                name="averageRainfall"
                                value={formData.climate.averageRainfall}
                                onChange={handleClimateChange}
                                placeholder="Average rainfall (mm per year)"
                                min="0"
                                required
                            />
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg mt-2"
                                name="averageTemperature"
                                value={formData.climate.averageTemperature}
                                onChange={handleClimateChange}
                                placeholder="Average temperature (°C)"
                                min="-50"
                                max="60"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Crop History</label>
                            {formData.cropHistory.map((crop, index) => (
                                <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                                        name="cropType"
                                        value={crop.cropType}
                                        onChange={(e) => handleCropHistoryChange(index, e)}
                                        placeholder="Crop Type"
                                        required
                                    />
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                                        name="yield"
                                        value={crop.yield}
                                        onChange={(e) => handleCropHistoryChange(index, e)}
                                        placeholder="Yield (metric tons per hectare or acre)"
                                        min="0"
                                        required
                                    />
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                                        name="season"
                                        value={crop.season}
                                        onChange={(e) => handleCropHistoryChange(index, e)}
                                        placeholder="Season"
                                        required
                                    />
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                                        name="year"
                                        value={crop.year}
                                        onChange={(e) => handleCropHistoryChange(index, e)}
                                        placeholder="Year"
                                        min="1900"
                                        max="2100"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Rental Price</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                                name="rentalPrice"
                                value={formData.rentalPrice}
                                onChange={handleChange}
                                placeholder="Rental price (local currency per season or year)"
                                min="0"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Soil Erosion Risk</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="soilErosionRisk"
                                value={formData.soilErosionRisk}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select soil erosion risk</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Irrigation System</label>
                            <select
                                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                name="irrigationSystem"
                                value={formData.irrigationSystem}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select irrigation system</option>
                                <option value="Drip">Drip</option>
                                <option value="Sprinkler">Sprinkler</option>
                                <option value="Surface">Surface</option>
                                <option value="None">None</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-300 text-sm font-bold mb-2">Suggested Crops</label>
                            {formData.suggestedCrops.map((crop, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4 mb-2">
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                                        name="cropType"
                                        value={crop.cropType}
                                        onChange={(e) => handleSuggestedCropsChange(index, e)}
                                        placeholder="Crop Type"
                                        required
                                    />
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                                        name="expectedYield"
                                        value={crop.expectedYield}
                                        onChange={(e) => handleSuggestedCropsChange(index, e)}
                                        placeholder="Expected Yield (metric tons per hectare or acre)"
                                        min="0"
                                        required
                                    />
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg"
                                        name="profitabilityIndex"
                                        value={crop.profitabilityIndex}
                                        onChange={(e) => handleSuggestedCropsChange(index, e)}
                                        placeholder="Profitability Index (1-10)"
                                        min="1"
                                        max="10"
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {isUpdating ? 'Update Land' : 'Add Land'}
                        </button>
                    </form>
                </div>
                <div className="mt-8 mb-8 bg-[#0000004f] shadow-md rounded-lg p-8 backdrop-blur-[3px] border-[1px] border-slate-700">
                    <h3 className="text-2xl font-semibold text-white text-center mb-6">Lands List</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Size</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-800 divide-y divide-gray-700">
                                {lands.map((land) => (
                                    <tr key={land._id}>
                                        <td className="px-6 py-4 text-sm text-white">{land.owner}</td>
                                        <td className="px-6 py-4 text-sm text-white">{land.location.address}</td>
                                        <td className="px-6 py-4 text-sm text-white">{land.landSize} {land.landSizeUnit}</td>
                                        <td className="px-6 py-4 text-sm text-white">
                                            <button
                                                onClick={() => {
                                                    setFormData(land);
                                                    setCurrentLandId(land._id);
                                                    setIsUpdating(true);
                                                }}
                                                className="text-blue-500 hover:text-blue-700"
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default LandPage;