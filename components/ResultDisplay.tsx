
import React from 'react';
import { XCircleIcon } from './icons';

interface ResultDisplayProps {
  originalImage: File | null;
  generatedImage: string | null;
  isLoading: boolean;
  error: string | null;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, isLoading, error }) => {
  const originalImageUrl = originalImage ? URL.createObjectURL(originalImage) : null;

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md" role="alert">
          <div className="flex">
            <div className="py-1"><XCircleIcon className="h-6 w-6 text-red-500 mr-4"/></div>
            <div>
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-4">
        <div className="space-y-2">
          <h3 className="text-center font-semibold text-lg text-gray-700 dark:text-gray-300">Before</h3>
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
            {originalImageUrl ? (
              <img src={originalImageUrl} alt="Original room" className="object-contain w-full h-full" />
            ) : (
              <p className="text-gray-500">Your image will appear here.</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-center font-semibold text-lg text-gray-700 dark:text-gray-300">After</h3>
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center relative">
            {isLoading && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4">
                <svg className="animate-pulse-slow h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21.5c.95 0 1.88-.11 2.78-.33l.22-.05c.87-.21 1.7-.51 2.44-1.04l.15-.11c.7-.49 1.32-1.07 1.84-1.74l.1-.14c.49-.63.9-1.33 1.2-2.1.28-.73.46-1.5.52-2.3.07-.8.07-1.6.07-2.4s0-1.6-.07-2.4c-.06-.8-.24-1.57-.52-2.3a8.45 8.45 0 00-1.2-2.1l-.1-.14a8.03 8.03 0 00-1.84-1.74l-.15-.11c-.74-.53-1.57-.83-2.44-1.04l-.22-.05A11.03 11.03 0 0012 2.5c-.95 0-1.88.11-2.78.33l-.22.05c-.87.21-1.7.51-2.44 1.04l-.15.11c-.7.49-1.32 1.07-1.84 1.74l-.1.14c-.49.63-.9 1.33-1.2 2.1-.28.73-.46 1.5-.52 2.3-.07.8-.07 1.6-.07 2.4s0 1.6.07 2.4c.06.8.24 1.57.52 2.3.3.77.71 1.47 1.2 2.1l.1.14c.52.67 1.13 1.25 1.84 1.74l.15.11c.74.53 1.57.83 2.44 1.04l.22.05c.9.22 1.83.33 2.78.33z"></path>
                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.5 12.5l2 2 5-5"></path>
                </svg>
                <p className="mt-4 font-semibold">Generating your new design...</p>
                <p className="text-sm text-gray-300">This can take a moment.</p>
              </div>
            )}
            {generatedImage && !isLoading && (
              <img src={generatedImage} alt="Generated design" className="object-contain w-full h-full" />
            )}
            {!generatedImage && !isLoading && (
               <p className="text-gray-500 text-center p-4">Your AI-generated design will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
