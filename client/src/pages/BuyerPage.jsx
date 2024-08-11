import React from 'react';
import { useNavigate } from 'react-router-dom';

const BuyerPage = () => {
    const navigate = useNavigate();

    const items = [
        { id: 1, name: 'Tractor', image: 'https://via.placeholder.com/150', price: '₹1,50,000/day', location: 'Punjab', description: 'Powerful tractor suitable for large farms.' },
        { id: 2, name: 'Plough', image: 'https://via.placeholder.com/150', price: '₹5,000/day', location: 'Rajasthan', description: 'Heavy-duty plough for efficient soil preparation.' },
        { id: 3, name: 'Irrigation System', image: 'https://via.placeholder.com/150', price: '₹20,000/day', location: 'Tamil Nadu', description: 'Automated irrigation system for optimal water usage.' },
        { id: 4, name: 'Harvester', image: 'https://via.placeholder.com/150', price: '₹3,00,000/day', location: 'Uttar Pradesh', description: 'Efficient harvester for quick crop collection.' },
        // Add more items as needed
    ];

    const handleRentNowClick = (id) => {
        navigate(`/item/${id}`);
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-4 mt-1">
            <h1 className="text-3xl font-bold mb-8 mt-4">Rent Farm Equipment</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map(item => (
                    <div key={item.id} className="bg-gray-800 shadow-md rounded-lg overflow-hidden flex flex-col">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                        <div className="p-4 flex-1 flex flex-col">
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <p className="text-gray-400">{item.location}</p>
                            <p className="text-green-400 text-lg font-bold">{item.price}</p>
                            <p className="text-gray-300 mt-2 flex-1">{item.description}</p>
                            <button
                                onClick={() => handleRentNowClick(item.id)}
                                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                Rent Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BuyerPage;