import React, { useState } from 'react';
import DataEntry from './components/DataEntry';
import SetupScreen from './components/SetupScreen';
import { generatePDF } from './utils/pdfGenerator';

function App() {
  const [parish, setParish] = useState('');
  const [koottayma, setKoottayma] = useState('');
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  const purpose = 'Perunnal Pirivu';

  const handleSetupComplete = (parishName, koottaymaName) => {
    setParish(parishName);
    setKoottayma(koottaymaName);
    setIsSetupComplete(true);
  };

  const handleExport = async (entries, total) => {
    if (entries.length === 0) {
      alert("No entries to export!");
      return;
    }

    try {
      await generatePDF(parish, koottayma, purpose, entries, total);
    } catch (error) {
      console.error("Export failed", error);
      alert("Failed to export PDF. See console.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {!isSetupComplete ? (
        <SetupScreen onComplete={handleSetupComplete} />
      ) : (
        <DataEntry
          purpose={purpose}
          onBack={() => setIsSetupComplete(false)}
          onExport={handleExport}
        />
      )}
    </div>
  );
}

export default App;


