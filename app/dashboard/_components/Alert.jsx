"use client";

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';

function Alert({ title, message, type = 'info', onClose, autoClose = true }) {
  const [isVisible, setIsVisible] = useState(true);

  // Auto close the alert after 5 seconds if autoClose is true
  React.useEffect(() => {
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

  // Define styles based on the alert type
  const alertStyles = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-600',
      icon: <CheckCircle className="text-green-500" size={24} />
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-600',
      icon: <XCircle className="text-red-500" size={24} />
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-600',
      icon: <AlertTriangle className="text-amber-500" size={24} />
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-600',
      icon: <Info className="text-blue-500" size={24} />
    }
  };
}
export default Alert;