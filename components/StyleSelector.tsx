
import React from 'react';
import { DesignStyle } from '../types';

interface StyleSelectorProps {
  styles: DesignStyle[];
  selectedStyle: DesignStyle | null;
  onSelectStyle: (style: DesignStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelectStyle }) => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {styles.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelectStyle(style)}
          className={`relative rounded-lg overflow-hidden transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-primary ${
            selectedStyle?.id === style.id ? 'ring-4 ring-primary scale-105' : 'hover:scale-105'
          }`}
        >
          <img src={style.imageUrl} alt={style.name} className="w-full h-24 object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <span className="text-white font-bold text-center text-sm md:text-base">{style.name}</span>
          </div>
          {selectedStyle?.id === style.id && (
            <div className="absolute inset-0 border-4 border-primary rounded-lg"></div>
          )}
        </button>
      ))}
    </div>
  );
};
