import React, { useState } from 'react';
import { NoteTemplate } from '../types';
import { CopyButton } from './CopyButton';
import { FileText, Trash2, CheckCircle, XCircle, Square, CheckSquare, Building2, Mail, ExternalLink } from 'lucide-react';

interface TemplateCardProps {
  template: NoteTemplate;
  onDelete?: (id: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onDelete }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  // Initialize recipients with template default if available
  const [recipients, setRecipients] = useState(template.emailData?.to || '');
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const isRejection = template.category === 'rejection';
  const hasMultiSelect = template.multiSelectOptions && template.multiSelectOptions.length > 0;
  const hasTable = template.tableData && template.tableData.length > 0;
  const isEmail = template.category === 'email' && !!template.emailData;

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

  const handleOpenOutlook = () => {
    if (!template.emailData) return;
    
    const subject = encodeURIComponent(template.emailData.subject);
    const body = encodeURIComponent(template.emailData.body);
    const to = recipients; // Basicamente passa a string digitada (ex: a@a.com; b@b.com)
    
    // mailto link construction
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  // Determine styles based on category
  const subtitleStyles = isRejection 
    ? 'bg-red-50 border-red-100 text-red-800'
    : 'bg-green-50 border-green-100 text-green-800';
    
  const SubtitleIcon = isRejection ? XCircle : CheckCircle;
  const iconColor = isRejection ? 'text-red-600' : 'text-green-600';

  // Construct final text (Only relevant if NOT a table and NOT email)
  let finalMessageBody = template.message || "";
  let fullTextToCopy = "";
  
  if (hasMultiSelect) {
    const orderedSelections = template.multiSelectOptions!
        .filter(opt => selectedOptions.includes(opt));
    
    if (template.disableAutoNumbering) {
        finalMessageBody = orderedSelections.join('\n\n');
    } else {
        finalMessageBody = orderedSelections
            .map((opt, index) => `${index + 1}. ${opt}`)
            .join('\n\n');
    }
        
    fullTextToCopy = template.subtitle 
      ? `${template.subtitle}\n\n${finalMessageBody}` 
      : finalMessageBody;
  } else if (!hasTable && !isEmail) {
     fullTextToCopy = template.subtitle 
      ? `${template.subtitle}\n\n${template.message}` 
      : template.message || "";
  }

  // Validation
  const isCopyDisabled = hasMultiSelect && selectedOptions.length === 0;

  // Header Icon Logic
  const getHeaderIcon = () => {
    if (isEmail) return <Mail size={20} />;
    if (hasTable) return <Building2 size={20} />;
    return <FileText size={20} />;
  };

  const getHeaderColor = () => {
    if (isEmail) return 'bg-cyan-100 text-cyan-600';
    if (isRejection) return 'bg-red-100 text-red-600';
    return 'bg-blue-100 text-blue-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getHeaderColor()}`}>
            {getHeaderIcon()}
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

        {/* Content Body */}
        <div className={`bg-slate-50 rounded-lg border border-slate-200 p-0 relative group ${isEmail ? '' : 'max-h-[500px] overflow-y-auto custom-scrollbar'}`}>
            
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

            ) : isEmail ? (
              // EMAIL VIEW
              <div className="p-4 space-y-4">
                {/* Recipients Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Destinatários</label>
                  <input 
                    type="text" 
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    placeholder="ex: joao@email.com; maria@email.com"
                    className="w-full text-sm p-2 border border-slate-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                  />
                </div>

                {/* Subject Display */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Assunto</label>
                  <div className="p-2 bg-white border border-slate-200 rounded text-sm font-bold text-slate-800">
                    {template.emailData?.subject}
                  </div>
                </div>

                {/* Body Display */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Corpo do E-mail</label>
                  <div className="p-3 bg-white border border-slate-200 rounded text-sm text-slate-700 font-mono whitespace-pre-wrap">
                    {template.emailData?.body}
                  </div>
                </div>
              </div>

            ) : hasMultiSelect ? (
              // MULTI-SELECT VIEW
              <div className="p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-2 tracking-wider">
                  Selecione as opções {template.disableAutoNumbering ? '(Texto Limpo)' : '(Numeração Automática)'}:
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
                      <p className={`text-sm ${isSelected ? 'text-slate-800 font-medium' : 'text-slate-600'} whitespace-pre-wrap`}>
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
        
        {/* ACTION BUTTONS */}
        {isEmail ? (
          <div className="mt-auto pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
             <button
              onClick={handleOpenOutlook}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-md font-medium hover:bg-cyan-700 active:transform active:scale-[0.98] transition-all shadow-sm"
            >
              <ExternalLink size={18} />
              <span>Abrir no Outlook</span>
            </button>
            <CopyButton 
              textToCopy={template.emailData?.body || ""} 
              disabled={false} 
            />
          </div>
        ) : !hasTable && (
          <div className="mt-auto pt-2">
              <CopyButton textToCopy={fullTextToCopy} disabled={isCopyDisabled} />
          </div>
        )}
      </div>
    </div>
  );
};