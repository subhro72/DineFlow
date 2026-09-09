import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', variant = 'danger' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center pb-2">
        <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center ${variant === 'danger' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-[var(--color-background)] text-[var(--color-primary)] border border-[var(--color-border-warm)]'}`}>
          <AlertTriangle className="w-8 h-8" />
        </div>
        <p className="font-sans text-[var(--color-ink-muted)] mb-8 text-base max-w-sm leading-relaxed">
          {message}
        </p>
        
        <div className="flex items-center gap-3 w-full sm:w-auto mt-2">
          <Button variant="secondary" className="flex-1 sm:flex-none" onClick={onClose}>Cancel</Button>
          <Button variant={variant} className="flex-1 sm:flex-none shadow-sm" onClick={onConfirm}>{confirmText}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
