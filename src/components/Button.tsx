import React from 'react';

interface ButtonProps {
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;  
}

const Button = ({ label, icon, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      <span>{label}</span>
      {icon && (
        <span className="w-5 h-5 text-rosso hover:text-bianco">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;




// import React from 'react';

// function Button() {
//   return (
//     <button className="flex items-center justify-between gap-3 px-3 py-2 border-2 border-rosso text-rosso bg-bianco hover:bg-rosso hover:text-bianco font-bold">
//       <span>Salva</span>
//       <svg
//         className="w-5 h-5 text-rosso hover:text-bianco" 
//         fill="currentColor"
//         viewBox="0 0 20 20"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path d="M5 3a2 2 0 00-2 2v12a1 1 0 001.555.832l5.445-3.257 5.445 3.257A1 1 0 0017 17V5a2 2 0 00-2-2H5z"></path>
//       </svg>
//     </button>
//   );
// }

// export default Button;
