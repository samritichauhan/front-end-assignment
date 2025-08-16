import React, { useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

// SVG Icons (Self-contained)
const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.19 10.19 0 0 1 12 20c-7 0-10-7-10-7a1.18 1.18 0 0 1 0-.68" />
    <path d="M2 2l22 22" />
    <path d="M7.06 6.06A10.19 10.19 0 0 1 12 4c7 0 10 7 10 7a1.18 1.18 0 0 1 0 .68" />
    <line x1="12" x2="12" y1="17" y2="17" />
  </svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);
const LoaderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

// Define the component's props interface as specified in the assignment
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  inputSize?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  inputSize = 'md',
  loading = false,
  type = 'text',
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // TailwindCSS class logic for variants, sizes, and states
  const baseClasses = 'w-full rounded-lg transition-all duration-200 focus:ring-2';
  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  };
  const variantClasses = {
    outlined: 'border border-gray-300 focus:outline-none focus:ring-blue-500',
    filled: 'bg-gray-100 border border-transparent focus:outline-none focus:ring-blue-500',
    ghost: 'bg-transparent border-b border-gray-300 focus:outline-none focus:ring-blue-500',
  };

  const stateClasses = {
    disabled: 'opacity-50 cursor-not-allowed',
    invalid: 'border-red-500 focus:ring-red-500',
  };

  const inputClasses = classNames(
    baseClasses,
    sizeClasses[inputSize],
    variantClasses[variant],
    {
      [stateClasses.invalid]: invalid,
      [stateClasses.disabled]: disabled,
    }
  );

  const isPassword = type === 'password';
  const hasValue = value && value.length > 0;

  return (
    <div className="flex flex-col space-y-1">
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="relative">
        <input
          type={isPassword && !showPassword ? 'password' : 'text'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={inputClasses}
          {...rest}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 animate-spin">
            <LoaderIcon />
          </div>
        )}
        {!loading && hasValue && (
          <>
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            )}
            {!isPassword && (
              <button
                type="button"
                onClick={() => onChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <XIcon />
              </button>
            )}
          </>
        )}
      </div>
      {helperText && !errorMessage && <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}
      {errorMessage && invalid && <p className="text-xs text-red-500 dark:text-red-400">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
