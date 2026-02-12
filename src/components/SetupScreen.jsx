import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SetupScreen = ({ onComplete }) => {
    const [parish, setParish] = useState('');
    const [koottayma, setKoottayma] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parish.trim() && koottayma.trim()) {
            onComplete(parish, koottayma);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sm:mx-auto sm:w-full sm:max-w-md"
            >
                <div className="bg-white py-8 px-4 shadow rounded-2xl mx-4 sm:px-10">
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Welcome</h2>
                        <p className="mt-2 text-sm text-gray-600">Please enter your details to continue</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="parish" className="block text-sm font-medium text-gray-700">
                                Parish Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="parish"
                                    name="parish"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                                    placeholder="e.g. St. Maria Gorethi Church"
                                    value={parish}
                                    onChange={(e) => setParish(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="koottayma" className="block text-sm font-medium text-gray-700">
                                Koottayma Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="koottayma"
                                    name="koottayma"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
                                    placeholder="e.g. St. Jude Koottayma"
                                    value={koottayma}
                                    onChange={(e) => setKoottayma(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default SetupScreen;
