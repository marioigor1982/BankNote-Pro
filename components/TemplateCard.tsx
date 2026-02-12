import React, { useState, useMemo } from 'react';
import { NoteTemplate } from '../types';
import { CopyButton } from './CopyButton';
import { FileText, Trash2, CheckCircle, XCircle, Square, CheckSquare, Building2, Mail, ExternalLink, Plus, Minus } from 'lucide-react';

interface TemplateCardProps {
  template: NoteTemplate;
  onDelete?: (id: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template, onDelete }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  // Record<optionKey, Record<placeholderIndex, string[]>>
  const [dynamicInputs, setDynamicInputs] = useState<Record<string, Record<number, string[]>>>({});
  const [recipients, setRecipients] = useState(template.emailData?.to || '');
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  const hasToggle = template.toggleOptions && template.toggleOptions.length > 0;
  const [activeToggleValue, setActiveToggleValue] = useState(hasToggle ? template.toggleOptions![0].value : null);

  const isRejection = template.category === 'rejection';
  const hasMultiSelect = template.multiSelectOptions && template.multiSelectOptions.length > 0;
  const hasTable = template.tableData && template.tableData.length > 0;
  const isEmail = template.category === 'email' && !!template.emailData;

  const toggleOption = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  const updateDynamicInputValue = (option: string, placeholderIdx: number, valueIdx: number, value: string, maxLength?: number, allowAlpha?: boolean) => {
    // Sanitize value: allow numbers and letters if allowAlpha is true, otherwise only numbers
    let sanitizedValue = allowAlpha ? value.toUpperCase() : value.replace(/\D/g, '');
    
    if (maxLength) {
      sanitizedValue = sanitizedValue.slice(0, maxLength);
    }
    
    setDynamicInputs(prev => {
      const optionStore = { ...(prev[option] || {}) };
      const placeholderStore = [...(optionStore[placeholderIdx] || [""])];
      placeholderStore[valueIdx] = sanitizedValue;
      optionStore[placeholderIdx] = placeholderStore;
      return { ...prev, [option]: optionStore };
    });
  };

  const addPlaceholderValue = (option: string, placeholderIdx: number) => {
    setDynamicInputs(prev => {
      const optionStore = { ...(prev[option] || {}) };
      const placeholderStore = [...(optionStore[placeholderIdx] || [""])];
      placeholderStore.push("");
      optionStore[placeholderIdx] = placeholderStore;
      return { ...prev, [option]: optionStore };
    });
  };

  const removePlaceholderValue = (option: string, placeholderIdx: number, valueIdx: number) => {
    setDynamicInputs(prev => {
      const optionStore = { ...(prev[option] || {}) };
      const placeholderStore = [...(optionStore[placeholderIdx] || [""])];
      if (placeholderStore.length > 1) {
        placeholderStore.splice(valueIdx, 1);
        optionStore[placeholderIdx] = placeholderStore;
      }
      return { ...prev, [option]: optionStore };
    });
  };

  const getMaxLength = (partBefore: string) => {
    const upper = partBefore.toUpperCase();
    if (upper.includes('MATRÍCULA')) return 10;
    if (upper.includes('CONTRATO')) return 12;
    if (upper.includes('REGISTRO Nº')) return 8;
    if (upper.includes('R-')) return 3;
    if (upper.includes('CERTIDÃO DIGITAL')) return 12;
    return undefined;
  };

  const shouldAllowAlpha = (partBefore: string) => {
    const upper = partBefore.toUpperCase();
    return upper.includes('CERTIDÃO DIGITAL') || upper.includes('CONTRATO');
  };

  const getProcessedText = (text: string, optionKey: string) => {
    if (!text.includes('XX')) return text;
    const parts = text.split('XX');
    let result = '';
    parts.forEach((part, pIdx) => {
      result += part;
      if (pIdx < parts.length - 1) {
        const values = dynamicInputs[optionKey]?.[pIdx] || [""];
        const formatted = values.map(v => v || "XX").join(', ');
        result += formatted;
      }
    });
    return result;
  };

  const renderTextWithInputs = (text: string, optionKey: string) => {
    if (!text.includes('XX')) {
      return <pre className="font-mono text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">{text}</pre>;
    }

    const parts = text.split('XX');
    return (
      <div className="font-mono text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
        {parts.map((part, pIdx) => {
          const mLen = getMaxLength(part);
          const aAlpha = shouldAllowAlpha(part);
          return (
            <React.Fragment key={pIdx}>
              {part}
              {pIdx < parts.length - 1 && (
                <div className="inline-flex flex-wrap items-center gap-1 mx-1 bg-slate-100 p-1 rounded shadow-inner align-middle not-italic">
                  {(dynamicInputs[optionKey]?.[pIdx] || [""]).map((val, vIdx) => (
                    <div key={vIdx} className="flex items-center gap-1">
                      <input
                        type="text"
                        inputMode={aAlpha ? "text" : "numeric"}
                        value={val}
                        placeholder="XX"
                        maxLength={mLen}
                        onChange={(e) => updateDynamicInputValue(optionKey, pIdx, vIdx, e.target.value, mLen, aAlpha)}
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-block px-1 py-0.5 bg-white border border-slate-300 rounded focus:ring-2 focus:ring-red-500 outline-none text-xs text-center font-bold`}
                        style={{ width: mLen ? `${Math.max(4, mLen * 0.7)}rem` : '4rem' }}
                      />
                      {vIdx < (dynamicInputs[optionKey]?.[pIdx]?.length || 1) - 1 && <span className="text-slate-500 font-bold">,</span>}
                      {(dynamicInputs[optionKey]?.[pIdx]?.length || 1) > 1 && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePlaceholderValue(optionKey, pIdx, vIdx);
                          }}
                          className="p-0.5 hover:bg-red-50 rounded text-red-400 hover:text-red-600 transition-colors"
                          title="Remover número"
                        >
                          <Minus size={12} strokeWidth={3} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      addPlaceholderValue(optionKey, pIdx);
                    }}
                    className="p-0.5 hover:bg-slate-200 rounded text-red-600 transition-colors"
                    title="Adicionar mais números"
                  >
                    <Plus size={14} strokeWidth={3} />
                  </button>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const handleOpenOutlook = () => {
    if (!template.emailData) return;
    const subject = encodeURIComponent(template.emailData.subject);
    const body = encodeURIComponent(template.emailData.body);
    const to = recipients;
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const fullTextToCopy = useMemo(() => {
    let messageBody = "";
    
    if (hasToggle && activeToggleValue) {
      const toggleOption = template.toggleOptions?.find(opt => opt.value === activeToggleValue);
      if (toggleOption) {
        messageBody = getProcessedText(toggleOption.message, activeToggleValue);
      }
    } else if (hasMultiSelect) {
      const orderedSelections = template.multiSelectOptions!.filter(opt => selectedOptions.includes(opt));
      const processedLines = orderedSelections.map((opt, index) => {
        const text = getProcessedText(opt, opt);
        return template.disableAutoNumbering ? text : `${index + 1}. ${text}`;
      });
      messageBody = processedLines.join('\n\n');
    } else if (!hasTable && !isEmail) {
      messageBody = getProcessedText(template.message || "", "__MESSAGE__");
    }

    if (!messageBody) return "";
    return template.subtitle ? `${template.subtitle}\n\n${messageBody}` : messageBody;
  }, [template, selectedOptions, dynamicInputs, activeToggleValue, hasToggle, hasMultiSelect, hasTable, isEmail]);

  const subtitleStyles = isRejection ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800';
  const SubtitleIcon = isRejection ? XCircle : CheckCircle;
  const iconColor = isRejection ? 'text-red-600' : 'text-green-600';

  const isCopyDisabled = (hasMultiSelect && selectedOptions.length === 0) || (!hasMultiSelect && !isEmail && !hasTable && !fullTextToCopy);

  const handleOnCopy = () => {
    if (hasMultiSelect) {
      setSelectedOptions([]);
      setDynamicInputs({});
    }
  };

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

  const finalMessageBody = template.toggleOptions?.find(opt => opt.value === activeToggleValue)?.message || template.message || "";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-slate-50 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${getHeaderColor()}`}>
            {getHeaderIcon()}
          </div>
          <h3 className="font-semibold text-slate-800 text-lg">{template.title}</h3>
        </div>
        {onDelete && (
          <button onClick={() => onDelete(template.id)} className="text-slate-400 hover:text-red-500 transition-colors" title="Remover modelo">
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <div className="p-6 flex-grow flex flex-col gap-4">
        {template.subtitle && (
          <div className={`flex items-center gap-3 p-3 rounded-lg shadow-inner ${subtitleStyles}`}>
            <SubtitleIcon className={`flex-shrink-0 ${iconColor}`} size={20} />
            <span className="font-bold tracking-wide text-sm md:text-base">{template.subtitle}</span>
          </div>
        )}

        {hasToggle && (
          <div className="flex p-1 bg-slate-100 rounded-lg w-full max-w-xs self-center shadow-inner">
            {template.toggleOptions!.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActiveToggleValue(opt.value)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${activeToggleValue === opt.value ? 'bg-red-600 text-white shadow-sm scale-105' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        <div className={`bg-slate-50 rounded-lg p-0 relative group shadow-inner ${isEmail ? '' : 'max-h-[500px] overflow-y-auto custom-scrollbar'}`}>
            {hasTable ? (
              <div className="w-full">
                <table className="w-full text-sm text-left text-slate-600">
                  <thead className="text-xs text-slate-700 uppercase bg-slate-100 sticky top-0 z-10">
                    <tr>
                      <th scope="col" className="px-6 py-3">FEBRABAN</th>
                      <th scope="col" className="px-6 py-3">CÓDIGO</th>
                      <th scope="col" className="px-6 py-3">NOME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {template.tableData!.map((row, idx) => (
                      <tr key={idx} className="bg-white border-b border-slate-50 hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 font-mono font-medium text-slate-900">{row.col1}</td>
                        <td className="px-6 py-4 font-mono text-slate-500">{row.col2}</td>
                        <td className="px-6 py-4 flex items-center gap-3">
                          {row.logoUrl && !imageErrors[idx] ? (
                            <img src={row.logoUrl} alt={row.col3} className="w-8 h-8 object-contain rounded-md bg-white p-0.5 border border-slate-100" onError={() => handleImageError(idx)} />
                          ) : (
                            <div className="w-8 h-8 rounded-md bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">{row.col3.charAt(0)}</div>
                          )}
                          <span className="font-semibold text-slate-800">{row.col3}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : isEmail ? (
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Destinatários</label>
                  <input type="text" value={recipients} onChange={(e) => setRecipients(e.target.value)} placeholder="ex: joao@email.com; maria@email.com" className="w-full text-sm p-2 border-transparent bg-white rounded shadow-sm focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Assunto</label>
                  <div className="p-2 bg-white rounded text-sm font-bold text-slate-800 shadow-sm">{template.emailData?.subject}</div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Corpo do E-mail</label>
                  <div className="p-3 bg-white rounded text-sm text-slate-700 font-mono whitespace-pre-wrap shadow-sm">{template.emailData?.body}</div>
                </div>
              </div>
            ) : hasMultiSelect ? (
              <div className="p-4 space-y-3">
                <p className="text-xs font-semibold text-slate-500 uppercase mb-2 tracking-wider">Selecione as opções {template.disableAutoNumbering ? '(Texto Limpo)' : '(Numeração Automática)'}:</p>
                {template.multiSelectOptions!.map((option, idx) => {
                  const isSelected = selectedOptions.includes(option);
                  return (
                    <div key={idx} onClick={() => toggleOption(option)} className={`flex items-start gap-3 p-3 rounded-md cursor-pointer transition-all shadow-sm ${isSelected ? 'bg-blue-50 ring-2 ring-blue-300' : 'bg-white hover:bg-slate-50'}`}>
                      <div className={`mt-0.5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>{isSelected ? <CheckSquare size={20} /> : <Square size={20} />}</div>
                      <div className="flex-1">{renderTextWithInputs(option, option)}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 animate-in fade-in duration-300">
                {renderTextWithInputs(finalMessageBody, activeToggleValue || "__MESSAGE__")}
              </div>
            )}
        </div>
        
        {isEmail ? (
          <div className="mt-auto pt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
             <button onClick={handleOpenOutlook} className="flex items-center justify-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-md font-medium hover:bg-cyan-700 active:transform active:scale-[0.98] transition-all shadow-sm">
              <ExternalLink size={18} />
              <span>Abrir no Outlook</span>
            </button>
            <CopyButton textToCopy={template.emailData?.body || ""} disabled={false} onCopy={handleOnCopy} />
          </div>
        ) : !hasTable && (
          <div className="mt-auto pt-2">
              <CopyButton textToCopy={fullTextToCopy} disabled={isCopyDisabled} onCopy={handleOnCopy} />
          </div>
        )}
      </div>
    </div>
  );
};