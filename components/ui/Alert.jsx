"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';
import PropTypes from 'prop-types';

function Alert({ title, message, type = 'info', onClose, autoClose = true }) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto close the alert after 5 seconds if autoClose is true
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  // If the alert is not visible, don't render it
  if (!isVisible) return null;
  // Define styles based on the alert type with dark mode support
  const alertStyles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700',
      text: 'text-green-700 dark:text-green-300',
      icon: <CheckCircle className="text-green-500 dark:text-green-400" size={24} />
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700',
      text: 'text-red-700 dark:text-red-300',
      icon: <XCircle className="text-red-500 dark:text-red-400" size={24} />
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700',
      text: 'text-amber-700 dark:text-amber-300',
      icon: <AlertTriangle className="text-amber-500 dark:text-amber-400" size={24} />
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700',
      text: 'text-blue-700 dark:text-blue-300',
      icon: <Info className="text-blue-500 dark:text-blue-400" size={24} />
    }
  };

  const style = alertStyles[type] || alertStyles.info;

  return (
    <div 
      className={`flex items-center justify-between p-4 mb-4 rounded-lg border ${style.bg} ${style.text}`}
      data-suppress-hydration-warning
    >
      <div className="flex items-center gap-3">
        {style.icon}
        <div className="flex flex-col">
          {title && <span className="font-medium">{title}</span>}
          {message && <span className="text-sm">{message}</span>}
        </div>
      </div>
      {onClose && (        <button 
          onClick={() => { setIsVisible(false); onClose(); }}
          className="ml-auto p-1.5 hover:bg-white/30 dark:hover:bg-gray-700/50 rounded-full transition-colors"
          data-suppress-hydration-warning
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

Alert.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  onClose: PropTypes.func,
  autoClose: PropTypes.bool
};

export default Alert;
