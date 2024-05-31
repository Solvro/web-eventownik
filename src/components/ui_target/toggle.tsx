import React from "react";

interface ToggleProps {
  isOpen: boolean;
  toggle: () => void;
  className?: string; 
}

const Toggle: React.FC<ToggleProps> = ({ isOpen, toggle, className }) => {
  return (
    <button
      onClick={toggle}
      className={` flex flex-col p-4 gap-1 justify-center z-20 ${className}`}
    >
      <span
        className={`w-6 h-0.5 rounded-md bg-primary-foreground transition ${
          isOpen ? 'rotate-45 translate-y-[50%]' : ''
        }`}
      ></span>
      <span
        className={`w-6 h-0.5 rounded-md bg-primary-foreground transition ${
          isOpen ? '-rotate-45 -translate-y-[260%]' : ''
        }`}
      ></span>
    </button>
  );
}

export default Toggle;