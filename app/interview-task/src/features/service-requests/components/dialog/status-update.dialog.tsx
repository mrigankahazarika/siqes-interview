import React, { useEffect } from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const Dialog = ({ open, onClose, title, children, maxWidth = 'md' }: DialogProps) => {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [open]);

  if (!open) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      <div className={`relative w-full ${maxWidthClasses[maxWidth]} bg-white rounded-lg shadow-2xl transform transition-all flex flex-col max-h-[90vh]`}>
        
        {/* Header */}
        {title && (
          <div className="px-6 py-4 border-b flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
          </div>
        )}

        <div className="px-6 py-4 overflow-y-auto">
          {children}
        </div>

        <div className="px-6 py-3 bg-gray-50 flex justify-end gap-2 rounded-b-lg">
           <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancel</button>
        </div>
      </div>
    </div>
  )
};

export default Dialog;