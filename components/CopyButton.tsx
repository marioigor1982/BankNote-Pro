import React, { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
  disabled?: boolean;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, disabled = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (disabled) return;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }, [textToCopy, disabled]);

  return (
    <button
      onClick={handleCopy}
      disabled={disabled}
      className={`
        flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 shadow-sm w-full
        ${disabled
          ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          : copied 
            ? 'bg-green-100 text-green-700 border border-green-200 hover:bg-green-200' 
            : 'bg-blue-600 text-white hover:bg-blue-700 active:transform active:scale-[0.98]'
        }
      `}
      aria-label="Copiar mensagem"
    >
      {copied ? (
        <>
          <Check size={18} />
          <span>Copiado!</span>
        </>
      ) : (
        <>
          <Copy size={18} />
          <span>{disabled ? 'Selecione uma opção' : 'Copiar Mensagem'}</span>
        </>
      )}
    </button>
  );
};