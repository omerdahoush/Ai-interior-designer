
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { StyleSelector } from './components/StyleSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { generateDesign } from './services/geminiService';
import { DesignStyle } from './types';
import { DESIGN_STYLES } from './constants';
import { MagicWandIcon } from './components/icons';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<DesignStyle>(DESIGN_STYLES[0]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage || !selectedStyle) {
      setError('Please upload an image and select a style.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateDesign(originalImage, selectedStyle.prompt);
      setGeneratedImage(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, selectedStyle]);

  const handleImageUpload = (file: File | null) => {
    setOriginalImage(file);
    setGeneratedImage(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 md:p-10 space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">1. Upload Your Space</h2>
              <p className="text-gray-600 dark:text-gray-400">Upload a photo of the room you want to redesign.</p>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">2. Select a Style</h2>
              <p className="text-gray-600 dark:text-gray-400">Choose an interior design style from the options below.</p>
              <StyleSelector styles={DESIGN_STYLES} selectedStyle={selectedStyle} onSelectStyle={setSelectedStyle} />
            </div>

            <div className="text-center">
              <button
                onClick={handleGenerateClick}
                disabled={!originalImage || isLoading}
                className="w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-primary dark:bg-primary-dark hover:bg-opacity-90 dark:hover:bg-opacity-90 text-white font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Designing...
                  </>
                ) : (
                  <>
                    <MagicWandIcon className="w-6 h-6 mr-3" />
                    Generate New Design
                  </>
                )}
              </button>
            </div>
          </div>
          
          {(isLoading || generatedImage || error || originalImage) && (
              <div className="bg-gray-50 dark:bg-gray-800/50 p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">Your Redesigned Room</h2>
                 <ResultDisplay
                    originalImage={originalImage}
                    generatedImage={generatedImage}
                    isLoading={isLoading}
                    error={error}
                  />
              </div>
          )}

        </div>
         <footer className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
            <p>Powered by Gemini AI. Created for demonstration purposes.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
