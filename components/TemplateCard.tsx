import React, { useState } from 'react';
import { NoteTemplate } from '../types';
import { CopyButton } from './CopyButton';
import { FileText, Trash2, CheckCircle, XCircle, Square, CheckSquare, Building2 } from 'lucide-react';

interface TemplateCardProps {
  template: NoteTemplate;
  onDelete?: (id: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onDelete }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const isRejection = template.category === 'rejection';
  const hasMultiSelect = template.multiSelectOptions && template.multiSelectOptions.length > 0;
  const hasTable = template.tableData && template.tableData.length > 0;

  // Toggle selection logic
  const toggleOption = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  // Determine styles based on category
  const subtitleStyles = isRejection 
    ? 'bg-red-50 border-red-100 text-red-800'
    : 'bg-green-50 border-green-100 text-green-800';
    
  const SubtitleIcon = isRejection ? XCircle : CheckCircle;
  const iconColor = isRejection ? 'text-red-600' : 'text-green-600';

  // Construct final text (Only relevant if NOT a table)
  let finalMessageBody = template.message;
  let fullTextToCopy = "";
  
  if (hasMultiSelect) {
    const orderedSelections = template.multiSelectOptions!
        .filter(opt => selectedOptions.includes(opt));
    
    finalMessageBody = orderedSelections
        .map((opt, index) => `${index + 1}. ${opt}`)
        .join('\n\n');
        
    fullTextToCopy = template.subtitle 
      ? `${template.subtitle}\n\n${finalMessageBody}` 
      : finalMessageBody;
  } else if (!hasTable) {
     fullTextToCopy = template.subtitle 
      ? `${template.subtitle}\n\n${template.message}` 
      : template.message;
  }

  // Validation
  const isCopyDisabled = hasMultiSelect && selectedOptions.length === 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isRejection ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
            {hasTable ? <Building2 size={20} /> : <FileText size={20} />}
          </div>
          <h3 className="font-semibold text-slate-800 text-lg">{template.title}</h3>
        </div>
        {onDelete && (
          <button 
            onClick={() => onDelete(template.id)}
            className="text-slate-400 hover:text-red-500 transition-colors"
            title="Remover modelo"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col gap-4">
        
        {/* Subtitle / Status Section */}
        {template.subtitle && (
          <div className={`flex items-center gap-3 p-3 border rounded-lg ${subtitleStyles}`}>
            <SubtitleIcon className={`flex-shrink-0 ${iconColor}`} size={20} />
            <span className="font-bold tracking-wide text-sm md:text-base">{template.subtitle}</span>
          </div>
        )}

        {/* Content Body: Table, Multi-Select or Text */}
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-0 relative group max-h-[500px] overflow-y-auto custom-scrollbar">
            
            {hasTable ? (
              // TABLE VIEW
              <div className="w-full">
                <table className="w-full text-sm text-left text-slate-600">
                  <thead className="text-xs text-slate-700 uppercase bg-slate-100 sticky top-0 z-10">
                    <tr>
                      <th scope="col" className="px-6 py-3 border-b border-slate-200">FEBRABAN</th>
                      <th scope="col" className="px-6 py-3 border-b border-slate-200">CÓDIGO</th>
                      <th scope="col" className="px-6 py-3 border-b border-slate-200">NOME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {template.tableData!.map((row, idx) => (
                      <tr key={idx} className="bg-white border-b border-slate-100 hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-slate-900">{row.col1}</td>
                        <td className="px-6 py-4 font-mono text-slate-500">{row.col2}</td>
                        <td className="px-6 py-4 flex items-center gap-3">
                          {row.logoUrl && !imageErrors[idx] ? (
                            <img 
                              src={row.logoUrl} 
                              alt={row.col3}
                              className="w-8 h-8 object-contain rounded-md bg-white p-0.5 border border-slate-100"
                              onError={() => handleImageError(idx)}
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-md bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                                {row.col3.charAt(0)}
                            </div>
                          )}
                          <span className="font-semibold text-slate-800">{row.col3}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            ) : hasMultiSelect ? (
              // MULTI-SELECT VIEW
              <div className="p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-2 tracking-wider">
                  Selecione as pendências (Numeração Automática):
                </p>
                {template.multiSelectOptions!.map((option, idx) => {
                  const isSelected = selectedOptions.includes(option);
                  return (
                    <div 
                      key={idx}
                      onClick={() => toggleOption(option)}
                      className={`
                        flex items-start gap-3 p-3 rounded-md cursor-pointer transition-all border
                        ${isSelected 
                          ? 'bg-blue-50 border-blue-300 shadow-sm' 
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'}
                      `}
                    >
                      <div className={`mt-0.5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>
                        {isSelected ? <CheckSquare size={20} /> : <Square size={20} />}
                      </div>
                      <p className={`text-sm ${isSelected ? 'text-slate-800 font-medium' : 'text-slate-600'}`}>
                        {option}
                      </p>
                    </div>
                  );
                })}
              </div>

            ) : (
              // STANDARD TEXT VIEW
              <div className="p-4">
                <pre className="font-mono text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                  {template.message}
                </pre>
              </div>
            )}
        </div>
        
        {/* Only show Copy Button if NOT a table */}
        {!hasTable && (
          <div className="mt-auto pt-2">
              <CopyButton textToCopy={fullTextToCopy} disabled={isCopyDisabled} />
          </div>
        )}
      </div>
    </div>
  );
};