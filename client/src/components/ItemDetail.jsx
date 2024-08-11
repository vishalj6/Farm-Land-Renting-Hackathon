import React from 'react';
import { useParams } from 'react-router-dom';

const ItemDetail = () => {
    const { id } = useParams();
    
    const items = [
        {
            id: 1,
            name: 'Tractor',
            image: 'https://via.placeholder.com/300',
            price: '₹1,50,000/day',
            location: 'Punjab',
            description: 'Powerful tractor suitable for large farms.',
            features: ['High horsepower', 'Fuel efficient', 'Easy to operate', 'Low maintenance']
        },
        // Add more items as needed
    ];

    const item = items.find(item => item.id === parseInt(id));

    return (
        <div className="container mx-auto p-4 mt-[50px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="flex justify-center">
                    <img src={item.image} alt={item.name} className="w-full max-w-md object-cover" />
                </div>

                {/* Product Details Section */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
                    <p className="text-gray-600 mb-4">{item.location}</p>
                    <p className="text-green-500 text-xl font-bold mb-4">{item.price}</p>
                    <p className="text-gray-700 mb-4">{item.description}</p>

                    {/* Features List */}
                    <ul className="list-disc pl-5 mb-4">
                        {item.features.map((feature, index) => (
                            <li key={index} className="text-gray-700">{feature}</li>
                        ))}
                    </ul>

                    {/* Buy/Rent Buttons */}
                    <div className="flex space-x-4">
                        <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
                            Buy Now
                        </button>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Add to Cart
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2">About this item</h2>
                        <p className="text-gray-600">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
                            Praesent libero. Sed cursus ante dapibus diam.
                        </p>
                    </div>
                </div>
            </div>

            {/* Additional Sections */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Product Details</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <tbody>
                        <tr className="border-t border-gray-300">
                            <td className="p-4 font-semibold text-gray-700">Brand</td>
                            <td className="p-4 text-gray-700">John Deere</td>
                        </tr>
                        <tr className="border-t border-gray-300">
                            <td className="p-4 font-semibold text-gray-700">Model</td>
                            <td className="p-4 text-gray-700">1025R</td>
                        </tr>
                        <tr className="border-t border-gray-300">
                            <td className="p-4 font-semibold text-gray-700">Horsepower</td>
                            <td className="p-4 text-gray-700">25 HP</td>
                        </tr>
                        <tr className="border-t border-gray-300">
                            <td className="p-4 font-semibold text-gray-700">Warranty</td>
                            <td className="p-4 text-gray-700">2 years</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ItemDetail;
