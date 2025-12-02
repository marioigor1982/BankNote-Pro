import React, { useState, useMemo } from 'react';
import { NoteTemplate, Category } from './types';
import { TemplateCard } from './components/TemplateCard';
import { generateBankComment } from './services/geminiService';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft,
  Building2,
  FileSignature,
  Wallet,
  TableProperties,
  Search,
  X
} from 'lucide-react';

// --- CATEGORIES CONFIGURATION ---
const CATEGORIES: Category[] = [
  {
    id: 'ccb',
    title: 'CCB – USECASA, USEIMÓVEL',
    icon: Building2,
    color: 'bg-blue-600',
    description: 'Validações de crédito imobiliário e pendências.'
  },
  {
    id: 'aquisicao',
    title: 'AQUISIÇÃO – CONTRATO NORMAL',
    icon: FileSignature,
    color: 'bg-emerald-600',
    description: 'Contratos de compra e venda padrão.'
  },
  {
    id: 'pagamento',
    title: 'CONFIRMAÇÃO DE PAGAMENTO',
    icon: Wallet,
    color: 'bg-purple-600',
    description: 'Comprovantes e validações de fluxo financeiro.'
  },
  {
    id: 'tabela',
    title: 'TABELA DE BANCOS',
    icon: TableProperties,
    color: 'bg-slate-600',
    description: 'Alterações de códigos e dados bancários.'
  }
];

// --- INITIAL TEMPLATES ---
const INITIAL_TEMPLATES: NoteTemplate[] = [
  // --- CCB CATEGORY ---
  {
    id: 'ccb-1',
    categoryId: 'ccb',
    title: 'APROVAÇÃO',
    category: 'approval',
    subtitle: 'APROVAÇÃO SEM RESSALVAS',
    message: `PREZADOS, REALIZADA A VALIDAÇÃO DO CONTRATO REGISTRADO, OS DOCUMENTOS APRESENTADOS ESTÃO DE ACORDO COM AS DEFINIÇÕES DO BANCO SANTANDER.

REGISTRO DA ALIENAÇÃO FIDUCIÁRIA DO IMÓVEL A FAVOR DO BANCO SANTANDER, SOB O Nº R-

DADOS BANCÁRIOS NO SISTEMA AG C/C DE ACORDO COM CONTRATO REGISTRADO

O PROCESSO SEGUIRÁ COM A LIBERAÇÃO DO RECURSO AO VENDEDOR / PROPONENTE, PORÉM FICOU PENDENTE O ENVIO DO DOCUMENTO “TANGÍVEL - PROPOSTA DE ADESÃO” DEVIDAMENTE ASSINADO. ESTE DOCUMENTO FOI DISPONIBILIZADO JUNTO AO COMBO DE CONTRATO. SEM A DEVOLUÇÃO, A COBERTURA SECURITÁRIA FICARÁ COMPROMETIDA.`
  },
  {
    id: 'ccb-2',
    categoryId: 'ccb',
    title: 'RECUSA / PENDÊNCIAS',
    category: 'rejection',
    subtitle: 'RECUSA COM PENDÊNCIAS',
    message: '',
    multiSelectOptions: [
      "CONTRATO INCOMPLETO. GENTILEZA NOTAR QUE FOI INDEXADO SOMENTE AS PÁGINAS ÍMPARES DO CONTRATO REGISTRADO, FAVOR INDEXAR CONTRATO COMPLETO COM AS 19 PÁGINAS PARA ANÁLISE.",
      "MATRÍCULA INCOMPLETA, FAVOR INDEXAR MATRÍCULA COMPLETA COM TODOS OS REGISTROS E AVERBAÇÕES DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER (BRASIL) S/A.",
      "MATRÍCULA DESATUALIZADA. PREZADOS GENTILEZA, NOTAR QUE A MATRÍCULA INDEXADA NÃO ESTÁ ATUALIZADA. FAVOR INDEXAR MATRÍCULA ATUALIZADA COM TODOS OS REGISTROS E AVERBAÇÕES DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER (BRASIL) S/A.",
      "PREZADOS GENTILEZA, NOTAR QUE PARA SEGUIRMOS COM A ANÁLISE É NECESSÁRIO INDEXAR A VIA NEGOCIÁVEL DA CÉDULA DE CRÉDITO BANCÁRIA REGISTRADA.",
      "CONTRATO INCOMPLETO. GENTILEZA NOTAR QUE FOI INDEXADO SOMENTE AS PÁGINAS ÍMPARES DO CONTRATO REGISTRADO, FAVOR INDEXAR CONTRATO COMPLETO COM AS XX PÁGINAS PARA ANÁLISE.",
      "CONTRATO REGISTRADO NÃO INDEXADO - FAVOR INDEXAR O CONTRATO REGISTRADO PARA ANÁLISE.",
      "FALTA MATRÍCULA - FAVOR INDEXAR A MATRÍCULA ATUALIZADA COM TODAS AS AVERBAÇÕES E REGISTROS DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER BRASIL) S/A.",
      "CONSTA APENAS 01 ASSINATURA NO CAMPO CREDOR, FAVOR OBTER ASSINATURA DOS 02 REPRESENTANTES (CREDOR), POIS A REPRESENTAÇÃO SE FAZ COM A ASSINATURA EM CONJUNTO DE DOIS PROCURADORES.",
      "IDENTIFICAMOS UMA DIVERGÊNCIA ENTRE O VALOR DO SEU FINANCIAMENTO REGISTRADO EM CONTRATO E O VALOR CONSTANTE NA MATRÍCULA DO IMÓVEL.",
      "PARA REGULARIZAR ESSA SITUAÇÃO E GARANTIR QUE TODOS OS SEUS DADOS ESTEJAM CORRETOS, FAVOR LEVAR A MATRÍCULA AO RGI PARA CORREÇÃO NO REGISTRO Nº XXXX."
    ]
  },

  // --- AQUISIÇÃO CATEGORY ---
  {
    id: 'aquisicao-1',
    categoryId: 'aquisicao',
    title: 'APROVAÇÃO',
    category: 'approval',
    subtitle: 'APROVAÇÃO SEM RESSALVAS',
    message: `PREZADOS, REALIZADA A VALIDAÇÃO DO CONTRATO REGISTRADO, OS DOCUMENTOS APRESENTADOS ESTÃO DE ACORDO COM AS DEFINIÇÕES DO BANCO SANTANDER.

REGISTRO DA COMPRA E VENDA DO IMÓVEL COM OS DADOS CORRETOS, SOB O N º R-

REGISTRO DA ALIENAÇÃO FIDUCIÁRIA DO IMÓVEL A FAVOR DO BANCO SANTANDER, SOB O Nº R-

DADOS BANCÁRIOS NO SISTEMA AG C/C DE ACORDO COM CONTRATO REGISTRADO.

O PROCESSO SEGUIRÁ COM A LIBERAÇÃO DO RECURSO AO VENDEDOR / PROPONENTE, PORÉM FICOU PENDENTE O ENVIO DO DOCUMENTO “TANGÍVEL - PROPOSTA DE ADESÃO” DEVIDAMENTE ASSINADO. ESTE DOCUMENTO FOI DISPONIBILIZADO JUNTO AO COMBO DE CONTRATO. SEM A DEVOLUÇÃO, A COBERTURA SECURITÁRIA FICARÁ COMPROMETIDA.`
  },
  {
    id: 'aquisicao-2',
    categoryId: 'aquisicao',
    title: 'RECUSA / PENDÊNCIAS',
    category: 'rejection',
    subtitle: 'RECUSA COM PENDÊNCIAS',
    message: '', 
    multiSelectOptions: [
      "PREZADO(A)(S), O CONTRATO E A MATRÍCULA INDEXADOS ESTÃO CORROMPIDOS, IMPOSSIBILITANDO EFETUAR DOWNLOAD E VISUALIZAÇÃO. GENTILEZA INDEXAR NOVAMENTE O CONTRATO E MATRÍCULA NOS SEUS RESPECTIVOS CAMPOS.",
      "CONTRATO INCOMPLETO. GENTILEZA NOTAR QUE FOI INDEXADO SOMENTE AS PÁGINAS ÍMPARES DO CONTRATO REGISTRADO, FAVOR INDEXAR CONTRATO COMPLETO COM AS 19 PÁGINAS PARA ANÁLISE.",
      "MATRÍCULA INCOMPLETA, FAVOR INDEXAR MATRÍCULA COMPLETA COM TODOS OS REGISTROS E AVERBAÇÕES DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER (BRASIL) S/A.",
      "MATRÍCULA DESATUALIZADA. PREZADOS GENTILEZA, NOTAR QUE A MATRÍCULA INDEXADA NÃO ESTÁ ATUALIZADA. FAVOR INDEXAR MATRÍCULA ATUALIZADA COM TODOS OS REGISTROS E AVERBAÇÕES DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER (BRASIL) S/A.",
      "PREZADOS GENTILEZA, NOTAR QUE PARA SEGUIRMOS COM A ANÁLISE É NECESSÁRIO INDEXAR A VIA NEGOCIÁVEL DA CÉDULA DE CRÉDITO BANCÁRIA REGISTRADA.",
      "CONTRATO INCOMPLETO. GENTILEZA NOTAR QUE FOI INDEXADO SOMENTE AS PÁGINAS ÍMPARES DO CONTRATO REGISTRADO, FAVOR INDEXAR CONTRATO COMPLETO COM AS XX PÁGINAS PARA ANÁLISE.",
      "CONTRATO REGISTRADO NÃO INDEXADO - FAVOR INDEXAR O CONTRATO REGISTRADO PARA ANÁLISE.",
      "FALTA MATRÍCULA - FAVOR INDEXAR A MATRÍCULA ATUALIZADA COM TODAS AS AVERBAÇÕES E REGISTROS DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER BRASIL) S/A.",
      "CONSTA APENAS 01 ASSINATURA NO CAMPO CREDOR, FAVOR OBTER ASSINATURA DOS 02 REPRESENTANTES (CREDOR), POIS A REPRESENTAÇÃO SE FAZ COM A ASSINATURA EM CONJUNTO DE DOIS PROCURADORES.",
      "IDENTIFICAMOS UMA DIVERGÊNCIA ENTRE O VALOR DO SEU FINANCIAMENTO REGISTRADO EM CONTRATO E O VALOR CONSTANTE NA MATRÍCULA DO IMÓVEL.",
      "PARA REGULARIZAR ESSA SITUAÇÃO E GARANTIR QUE TODOS OS SEUS DADOS ESTEJAM CORRETOS, FAVOR LEVAR A MATRÍCULA AO RGI PARA CORREÇÃO NO REGISTRO Nº XXXX.",
      "OBSERVAR QUE FALTOU OS DADOS DE UM DOS QUALIFICADOS (XXXX) NA MATRÍCULA, FAVOR LEVAR AO CARTÓRIO PARA CORREÇÃO.",
      "FALTOU O FORMULÁRIO 1704, FAVOR PROVIDENCIAR O FORMULÁRIO 1704 DEVIDAMENTE ASSINADO, A ASSINATURA DO FORMULÁRIO PRECISA SER IGUAL A ASSINATURA DO CONTRATO REGISTRADO",
      "SOLICITAMOS PROVIDENCIAR O FORMULÁRIO 1704, POR TRATAR DE PAGAMENTO AO PROCURADOR, O QUAL ESTÁ QUALIFICADO EM CONTRATO, PARA VALIDAÇÃO DOS DADOS BANCÁRIOS. SOLICITAMOS QUE SEJA PREENCHIDO NO CAMPO DO PROCURADOR O NOME DO PROCURADOR E SEU CPF. OBS: A ASSINATURA DO FORMULÁRIO PRECISA SER IGUAL A ASSINATURA DO CONTRATO REGISTRADO.",
      "PROCURAÇÃO VENCIDA, FAVOR PROVIDENCIAR UMA NOVA PROCURAÇÃO/SUBSTABELECIMENTO COM PRAZO VIGENTE DE 90 DIAS CONTADOS A PARTIR DA DATA DE EMISSÃO.",
      "FALTOU A GUIA PARA PAGAMENTO, FAVOR PROVIDENCIAR A GUIA DE PAGAMENTO EM VICENDAS COM ID PARA PROVIDENCIARMOS O PAGAMENTO.",
      "GUIA VENCIDA, FAVOR PROVIDENCIAR A GUIA DE PAGAMENTO EM VICENDAS COM ID PARA PROVIDENCIARMOS O PAGAMENTO.",
      "GUIA ERRADA, FAVOR PROVIDENCIAR A GUIA CORRETA DE PAGAMENTO EM VICENDAS COM ID PARA PROVIDENCIARMOS O PAGAMENTO.",
      "GUIA SEM Nº DE ID, FAVOR PROVIDENCIAR A GUIA DE PAGAMENTO EM VICENDAS COM ID PARA PROVIDENCIARMOS O PAGAMENTO.",
      "O CONTRATO INDEXADO NÃO PERTENCE A PROPOSTA, FAVOR INDEXAR O CONTRATO XXXXX PARA PROSSEGUIRMOS.",
      "A MATRÍCULA INDEXADA NÃO PERTECE A PROPOSTA, FAVOR INDEXAR A MATRÍCULA XXXXX PARA PROSSEGUIRMOS."
    ]
  },

  // --- PAGAMENTO CATEGORY ---
  {
    id: 'pagamento-1',
    categoryId: 'pagamento',
    title: 'COMPROVANTE PADRÃO',
    category: 'general',
    subtitle: 'CONFIRMAÇÃO DE PAGAMENTO',
    message: `PAGAMENTO REALIZADO COM SUCESSO.

SEGUE EM ANEXO O COMPROVANTE DE TRANSFERÊNCIA BANCÁRIA REFERENTE AO CONTRATO Nº [NÚMERO].

DATA DA TRANSAÇÃO: [DATA]
VALOR: R$ [VALOR]`
  },

  // --- TABELA CATEGORY ---
  {
    id: 'tabela-1',
    categoryId: 'tabela',
    title: 'TABELA DE BANCOS',
    category: 'general',
    subtitle: 'CONSULTA DE CÓDIGOS',
    message: '',
    tableData: [
      { col1: '063', col2: '237', col3: 'BRADESCO', logoUrl: 'https://brandlogos.net/wp-content/uploads/2015/10/banco-bradesco-logo-vector-download.jpg' },
      { col1: '479', col2: '341', col3: 'ITAÚ', logoUrl: 'https://images.seeklogo.com/logo-png/51/2/itau-logo-png_seeklogo-512719.png' },
      { col1: '246', col2: '001', col3: 'BANCO DO BRASIL', logoUrl: 'https://i.pinimg.com/originals/c7/97/48/c79748db9ce6e04c9157d46d0d456c76.jpg' },
      { col1: '036', col2: '237', col3: 'BRADESCO', logoUrl: 'https://brandlogos.net/wp-content/uploads/2015/10/banco-bradesco-logo-vector-download.jpg' },
      { col1: '394', col2: '237', col3: 'BRADESCO', logoUrl: 'https://brandlogos.net/wp-content/uploads/2015/10/banco-bradesco-logo-vector-download.jpg' },
      { col1: '320', col2: '001', col3: 'BANCO DO BRASIL', logoUrl: 'https://i.pinimg.com/originals/c7/97/48/c79748db9ce6e04c9157d46d0d456c76.jpg' },
      { col1: '473', col2: '104', col3: 'CEF', logoUrl: 'https://i.pinimg.com/originals/a9/0a/6b/a90a6b5ab35de9ec6c20e6026987aa9d.jpg' },
      { col1: '106', col2: '341', col3: 'ITAÚ', logoUrl: 'https://images.seeklogo.com/logo-png/51/2/itau-logo-png_seeklogo-512719.png' },
      { col1: '353', col2: '033', col3: 'SANTANDER', logoUrl: 'https://i.pinimg.com/originals/e9/67/a4/e967a4935c65ed0da069364e952e4630.jpg' },
      { col1: '184', col2: '341', col3: 'ITAÚ', logoUrl: 'https://images.seeklogo.com/logo-png/51/2/itau-logo-png_seeklogo-512719.png' },
      { col1: '087', col2: '136', col3: 'CENTRAIS UNICRED', logoUrl: 'https://cooperativismodecredito.coop.br/wp-content/uploads/2024/06/Logo_Unicred.jpg' },
      { col1: '074', col2: '422', col3: 'SAFRA', logoUrl: 'https://www.safra.com.br/lumis-theme/br/com/bancosafra/safranet/theme/safranet/assets/img/logo-safra.svg' },
      { col1: '652', col2: '341', col3: 'ITAÚ', logoUrl: 'https://images.seeklogo.com/logo-png/51/2/itau-logo-png_seeklogo-512719.png' }
    ]
  }
];

// --- HELPER FOR SMART SEARCH ---
const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

function App() {
  const [activeTab, setActiveTab] = useState<'templates' | 'generator'>('templates');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Generator State
  const [genScenario, setGenScenario] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState('');

  // Search Logic (Smart Filtering)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    // Split query into tokens and normalize
    const terms = normalizeText(searchQuery).split(" ").filter(t => t.length > 0);
    
    return INITIAL_TEMPLATES.filter(t => {
      // Build a single searchable string from all template data
      let rawContent = `${t.title} ${t.subtitle || ''} ${t.message}`;
      
      if (t.multiSelectOptions) {
        rawContent += " " + t.multiSelectOptions.join(" ");
      }
      
      if (t.tableData) {
        rawContent += " " + t.tableData.map(r => `${r.col1} ${r.col2} ${r.col3}`).join(" ");
      }
      
      const normalizedContent = normalizeText(rawContent);

      // Check if ALL terms are present in the content (AND logic)
      return terms.every(term => normalizedContent.includes(term));
    });
  }, [searchQuery]);

  // Templates Logic (Category based)
  const categoryTemplates = selectedCategory 
    ? INITIAL_TEMPLATES.filter(t => t.categoryId === selectedCategory)
    : [];

  const handleGenerate = async () => {
    if (!genScenario.trim()) return;
    
    setIsGenerating(true);
    setGeneratedResult('');
    
    try {
      const result = await generateBankComment(genScenario);
      setGeneratedResult(result);
    } catch (error) {
      console.error(error);
      setGeneratedResult("Erro ao gerar comentário. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const activeCategoryData = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans relative selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Image - Only on Initial Dashboard (and when not searching) */}
      {activeTab === 'templates' && !selectedCategory && !searchQuery && (
        <div 
          className="fixed inset-0 z-0 transition-opacity duration-700 ease-in-out pointer-events-none"
          style={{
            backgroundImage: 'url("https://www.mobills.com.br/blog/wp-content/uploads/2023/03/financiamento-imobiliario-santander.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.4, 
          }}
        />
      )}

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-20 shadow-sm transition-colors">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <ShieldCheck className="text-blue-700" size={28} />
            <h1 className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
              Bank<span className="text-blue-700">Note</span> Pro
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Pesquisar comentários, pendências..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 border border-slate-200 rounded-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <nav className="flex gap-1 bg-slate-100 p-1 rounded-lg flex-shrink-0">
            <button
              onClick={() => {
                setActiveTab('templates');
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === 'templates' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Modelos
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeTab === 'generator' 
                  ? 'bg-white text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Gerador IA
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        
        {/* VIEW: SEARCH RESULTS (Overrrides everything else) */}
        {searchQuery && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Search className="text-blue-600" size={24} />
                  Resultados da Pesquisa
                </h2>
                <p className="text-sm text-slate-500">
                  {searchResults.length} resultado(s) encontrado(s) para "{searchQuery}"
                </p>
             </div>
             
             <div className="grid gap-6">
                {searchResults.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
                {searchResults.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-400">Nenhum resultado encontrado.</p>
                    <p className="text-xs text-slate-400 mt-2">Dica: Tente palavras-chave simples como "contrato", "matrícula" ou o código do banco.</p>
                  </div>
                )}
             </div>
          </div>
        )}

        {/* VIEW: CATEGORY DASHBOARD (Only if NOT searching and NO category selected) */}
        {activeTab === 'templates' && !selectedCategory && !searchQuery && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 text-center bg-white/60 p-6 rounded-2xl backdrop-blur-sm shadow-sm border border-white/50">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Comentário Banco</h2>
              <p className="text-slate-600 font-medium">Selecione o tipo de produto para acessar os modelos.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="group bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-400 hover:shadow-lg hover:bg-white transition-all text-left flex items-start gap-4 duration-300"
                  >
                    <div className={`p-3 rounded-lg ${cat.color} text-white shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW: TEMPLATE LIST (Only if NOT searching and category IS selected) */}
        {activeTab === 'templates' && selectedCategory && activeCategoryData && !searchQuery && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="mb-6 flex items-center gap-4">
              <button 
                onClick={() => setSelectedCategory(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
                aria-label="Voltar"
              >
                <ArrowLeft size={24} />
              </button>
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <activeCategoryData.icon className="text-blue-600" size={24} />
                  {activeCategoryData.title}
                </h2>
                <p className="text-sm text-slate-500">Lista de modelos disponíveis</p>
              </div>
            </div>

            <div className="grid gap-6">
              {categoryTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
              {categoryTemplates.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                  <p className="text-slate-400">Nenhum modelo encontrado nesta categoria.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW: AI GENERATOR */}
        {activeTab === 'generator' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white">
                <Sparkles size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">Gerador Inteligente</h2>
                <p className="text-sm text-slate-500">Crie novos comentários bancários com IA</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Descreva a situação:
                </label>
                <textarea
                  className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] text-slate-700 placeholder-slate-400"
                  placeholder="Ex: Criar nota de recusa por falta de assinatura do cônjuge no contrato de compra e venda..."
                  value={genScenario}
                  onChange={(e) => setGenScenario(e.target.value)}
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !genScenario.trim()}
                className={`
                  w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all
                  ${isGenerating || !genScenario.trim()
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                  }
                `}
              >
                {isGenerating ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Gerar Comentário
                  </>
                )}
              </button>

              {generatedResult && (
                <div className="mt-8 pt-6 border-t border-slate-100 animate-in slide-in-from-bottom-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Resultado Gerado</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-4">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-slate-700">{generatedResult}</pre>
                  </div>
                  <TemplateCard 
                    template={{
                      id: 'gen-temp',
                      categoryId: 'gen',
                      title: 'Resultado da IA',
                      category: 'general',
                      message: generatedResult
                    }} 
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;