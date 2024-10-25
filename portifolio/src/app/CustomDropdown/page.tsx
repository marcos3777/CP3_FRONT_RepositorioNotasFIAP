"use client";
import { useState, useRef, useEffect } from 'react';

interface CustomDropdownProps {
  options: string[];
  label: string;
  onSelect: (value: string) => void;
}

const CustomDropdown = ({ options, label, onSelect }: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(label);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Label */}
      <p
        className="cursor-pointer border-b border-dotted border-gray-500 inline-block"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
      </p>

      {/* Opções */}
      {isOpen && (
        <div className="absolute z-10 mt-2 w-56 bg-white shadow-md rounded-md">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Como usar o CustomDropdown
export default function Page() {
  const nomes = ['Marcos Vinicius', 'Richardy Borges', 'Henrique Izzi', 'Pedro Bergara'];

  const [selectedName, setSelectedName] = useState('');

  return (
    <div className="p-6">
      <CustomDropdown
        options={nomes}
        label="Selecione um nome"
        onSelect={(value) => setSelectedName(value)}
      />

      <div className="mt-6">
        <p>Nome selecionado: {selectedName}</p>
      </div>
    </div>
  );
}
