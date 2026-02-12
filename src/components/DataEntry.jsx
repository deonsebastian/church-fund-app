import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Download, ArrowLeft, Trash2 } from 'lucide-react';

const DataEntry = ({ purpose, onBack, onExport }) => {
    const [entries, setEntries] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    const totalAmount = entries.reduce((sum, entry) => sum + Number(entry.amount), 0);

    const handleAdd = (e) => {
        e.preventDefault();
        if (!name || !amount) return;
        setEntries([...entries, { id: Date.now(), name, amount }]);
        setName('');
        setAmount('');
        setIsModalOpen(false);
    };

    const handleDelete = (id) => {
        setEntries(entries.filter(e => e.id !== id));
    };

    return (
        <div className="relative min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="w-10">
                        {onBack && (
                            <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                                <ArrowLeft size={24} />
                            </button>
                        )}
                    </div>
                    <h1 className="text-lg font-semibold text-gray-800">{purpose}</h1>
                    <button
                        onClick={() => onExport(entries, totalAmount)}
                        className="p-2 rounded-full hover:bg-indigo-50 text-indigo-600"
                        title="Export PDF"
                    >
                        <Download size={24} />
                    </button>
                </div>
            </header>

            {/* List */}
            <main className="max-w-3xl mx-auto px-4 py-6 space-y-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg mb-6">
                    <p className="text-indigo-100 text-sm font-medium">Total Collection</p>
                    <p className="text-4xl font-bold mt-1">₹ {totalAmount.toLocaleString()}</p>
                </div>

                <div className="space-y-3">
                    <AnimatePresence>
                        {entries.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-10 text-gray-400"
                            >
                                No entries yet. Tap + to add.
                            </motion.div>
                        ) : (
                            entries.map((entry) => (
                                <motion.div
                                    key={entry.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800 text-lg">{entry.name}</p>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="font-semibold text-indigo-600">₹{entry.amount}</span>
                                        <button
                                            onClick={() => handleDelete(entry.id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {/* FAB */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-200 z-20"
            >
                <Plus size={32} />
            </motion.button>

            {/* Add Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/50"
                            onClick={() => setIsModalOpen(false)}
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 500 }}
                            className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-6 relative z-10 shadow-2xl m-0 sm:m-4"
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Add Contribution</h2>
                            <form onSubmit={handleAdd} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter name"
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="Enter amount"
                                        className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors active:scale-[0.98]"
                                >
                                    Add Entry
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DataEntry;
