
import React, { useState, useRef } from 'react';
import { UploadIcon, XCircleIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  };
  
  const handleRemoveImage = () => {
    setPreview(null);
    onImageUpload(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <div className="mt-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
        id="image-upload"
      />
      
      {!preview ? (
        <label
          htmlFor="image-upload"
          className="relative block w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-primary dark:hover:border-primary-light transition-colors duration-300"
        >
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-medium text-gray-500 dark:text-gray-400">
            Click to upload or drag and drop
          </span>
          <span className="block text-xs text-gray-500 dark:text-gray-500">PNG, JPG, WEBP</span>
        </label>
      ) : (
        <div className="relative group">
          <img src={preview} alt="Room preview" className="w-full max-h-[400px] object-contain rounded-lg shadow-md" />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center rounded-lg">
             <button onClick={handleRemoveImage} className="opacity-0 group-hover:opacity-100 p-2 bg-white/80 dark:bg-black/80 rounded-full text-red-500 hover:text-red-700 dark:hover:text-red-400 transform hover:scale-110 transition-all duration-300">
                <XCircleIcon className="w-10 h-10" />
                <span className="sr-only">Remove image</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
