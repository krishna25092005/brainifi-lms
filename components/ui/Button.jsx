"use client";

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// Custom Button component that helps prevent hydration mismatches
// by ensuring consistent rendering between server and client
const Button = forwardRef(({
  children,
  className = '',
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  type = 'button',
  ...props
}, ref) => {
  // Base styles
  const baseStyles = "transition-all duration-200 font-medium rounded-lg flex items-center justify-center";
  
  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";
  
  // Size styles (can be expanded with more sizes if needed)
  const sizeStyles = "px-4 py-2";
    // Variant styles
  const variantStyles = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm hover:shadow-md",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 dark:border-gray-600",
    outline: "bg-transparent border border-gray-200 hover:bg-gray-50 text-gray-800 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-200",
    danger: "bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700",
    success: "bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700"
  };
  
  // Disabled styles
  const disabledStyles = (disabled || loading) 
    ? "opacity-50 cursor-not-allowed pointer-events-none" 
    : "hover:scale-[1.02]";

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      type={type}
      className={`${baseStyles} ${widthStyles} ${sizeStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      {...props}      // Remove any fdprocessedid attributes that might be added by browser extensions
      // This is done in useEffect in HydrationFix component, but adding this as an extra layer
      // Also ensures that any new ones added after initial render are removed
      data-suppress-hydration-warning
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {children}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          {icon && <span>{icon}</span>}
          {children}
        </div>
      )}
    </button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'danger', 'success']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
