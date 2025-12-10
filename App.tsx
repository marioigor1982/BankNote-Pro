import React, { useState, useMemo, useEffect } from 'react';
import { NoteTemplate, Category } from './types';
import { TemplateCard } from './components/TemplateCard';
import { 
  ShieldCheck, 
  ArrowLeft,
  Building2,
  FileSignature,
  Wallet,
  TableProperties,
  Search,
  X,
  ScrollText,
  Mail,
  Info,
  CheckCircle,
  XCircle,
  FileText
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
    id: 'arisp',
    title: 'ARISP / CERTIDÕES',
    icon: ScrollText,
    color: 'bg-orange-600',
    description: 'Solicitações e validações de certidões digitais.'
  },
  {
    id: 'pagamento',
    title: 'CONFIRMAÇÃO DE PAGAMENTO',
    icon: Wallet,
    color: 'bg-purple-600',
    description: 'Comprovantes e validações de fluxo financeiro.'
  },
  {
    id: 'emails',
    title: 'REDIGIR E-MAILS',
    icon: Mail,
    color: 'bg-cyan-600',
    description: 'Modelos de e-mails para comunicação interna e externa.'
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
      "PARA REGULARIZAR ESSA SITUAÇÃO E GARANTIR QUE TODOS OS SEUS DADOS ESTEJAM CORRETOS, FAVOR LEVAR A MATRÍCULA AO RGI PARA CORREÇÃO NO REGISTRO Nº XXXX.",
      "O CONTRATO INDEXADO NÃO PERTENCE A PROPOSTA, FAVOR INDEXAR O CONTRATO XXXXX PARA PROSSEGUIRMOS.",
      "A MATRÍCULA INDEXADA NÃO PERTECE A PROPOSTA, FAVOR INDEXAR A MATRÍCULA XXXXX PARA PROSSEGUIRMOS.",
      "PREZADOS PRENOTAÇÃO ANEXADA, AGUARDANDO CORREÇÃO. APÓS ANEXAR CONTRATO REGISTRADO CORRIGIDO E MATRÍCULA ATUALIZADA COM TODAS AS AVERBAÇÕES E REGISTRO DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER ATUAREMOS NA CONFERÊNCIA DE REGISTRO."
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
      "A MATRÍCULA INDEXADA NÃO PERTECE A PROPOSTA, FAVOR INDEXAR A MATRÍCULA XXXXX PARA PROSSEGUIRMOS.",
      "PREZADOS PRENOTAÇÃO ANEXADA, AGUARDANDO CORREÇÃO. APÓS ANEXAR CONTRATO REGISTRADO CORRIGIDO E MATRÍCULA ATUALIZADA COM TODAS AS AVERBAÇÕES E REGISTRO DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER ATUAREMOS NA CONFERÊNCIA DE REGISTRO."
    ]
  },

  // --- ARISP CATEGORY ---
  {
    id: 'arisp-1',
    categoryId: 'arisp',
    title: 'SOLICITAÇÃO DE CERTIDÃO PARA AVANÇO DE FASE POSTERIOR',
    category: 'general',
    message: `SOLICITADO CERTIDÃO DIGITAL XXXXXXXXXXX, AGUARDANDO DISPONIBILIZAÇÃO.

PARA CONFERÊNCIA TOTAL DO REGISTRO DO CONTRATO E POSTERIOR ENVIO PARA LIBERAÇÃO DO RECURSO, FOI SOLICITADO MATRÍCULA DO IMÓVEL INTERNAMENTE, SEM NECESSIDADE DE ATUAÇÃO DO CLIENTE.

APÓS DISPONIBILIZAÇÃO DA CERTIDÃO, A PROPOSTA SERÁ AVANÇADA.*

PREZADOS, REALIZADA A VALIDAÇÃO DO CONTRATO REGISTRADO, OS DOCUMENTOS APRESENTADOS ESTÃO DE ACORDO COM AS DEFINIÇÕES DO BANCO SANTANDER.

REGISTRO DA ALIENAÇÃO FIDUCIÁRIA DO IMÓVEL A FAVOR DO BANCO SANTANDER, SOB O Nº R-

DADOS BANCÁRIOS NO SISTEMA AG C/C DE ACORDO COM CONTRATO REGISTRADO`
  },
  {
    id: 'arisp-2',
    categoryId: 'arisp',
    title: 'SITE ARISP/ ONR INDISPONÍVEL (FORA DO AR)',
    category: 'general',
    message: `SITE DA ARISP INDISPONIVEL. NÃO SENDO POSSIVEL SEGUIR COM A APROVAÇÃO DA CONFERÊNCIA DE REGISTRO.

PREZADOS, REALIZADA A VALIDAÇÃO DO CONTRATO REGISTRADO, OS DOCUMENTOS APRESENTADOS ESTÃO DE ACORDO COM AS DEFINIÇÕES DO BANCO SANTANDER.

REGISTRO DA COMPRA E VENDA DO IMÓVEL COM OS DADOS CORRETOS, SOB O N º R-

REGISTRO DA ALIENAÇÃO FIDUCIÁRIA DO IMÓVEL A FAVOR DO BANCO SANTANDER, SOB O Nº R-

DADOS BANCÁRIOS NO SISTEMA AG C/C DE ACORDO COM CONTRATO REGISTRADO.`
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

  // --- EMAILS CATEGORY ---
  {
    id: 'email-1',
    categoryId: 'emails',
    title: 'PAGAMENTO MANUAL AO PROCURADOR',
    category: 'email',
    emailData: {
      to: 'Financeiro_Sant <Financeiro_Sant@accenture.com>',
      subject: 'CONTINGÊNCIA | PROPOSTA XX.XXX.XXX | PAGAMENTO MANUAL AO PROCURADOR',
      body: `Financeiro, bom dia!


Favor seguir com o pagamento manual para o procurador conforme formulário 1704, procuração e contrato registrado anexos.


OBS.: Após aprovação, nos retornar para o avanço da fase. Gentileza “ flegar” pagamento manual.`
    }
  },
  {
    id: 'email-2',
    categoryId: 'emails',
    title: 'PAGAMENTO VIA GUIA JUDICIAL',
    category: 'email',
    emailData: {
      to: 'Financeiro_Sant <Financeiro_Sant@accenture.com>',
      subject: 'CONTINGÊNCIA | PROPOSTA XX.XXX.XXX | PAGAMENTO POR GUIA JUDICIAL | ESPÓLIO DE XXXXXX XXXXX XXXXXX | PROCESSO XXXXXXXXXXXXXXXXXXXX',
      body: `Financeiro, bom dia!

Favor seguir com o pagamento referente ESPÓLIO DE MARINA DUARTE DO PRADO, via GUIA JUDICIAL anexa.

Processo: 10063570620208260704
ID 081020000179580929.

A guia judicial anexa está com o vencimento para 18/09/2025.

OBS.: Após aprovação, nos retornar para o avanço da fase. Gentileza “ flegar” pagamento manual.

Grato.`
    }
  },
  {
    id: 'email-3',
    categoryId: 'emails',
    title: 'INDISPONIBILIDADE DE BENS',
    category: 'email',
    emailData: {
      to: 'cioperacoesfinanceiroacc@santander.com.br',
      subject: 'MARIA DA SILVA | INDISPONIBILIDADE DE BENS | PROPOSTA XX.XXX.XXX | CONTRATO 00XXXXXXXX',
      body: `Bom dia!
 
A proposta informada, apresentou INDISPONIBILIDADE DE BENS conforme AV nº xx na matrícula XX.XXX (no anexo) portanto aguardamos um parecer para prosseguirmos neste caso. 


No anexo, segue a matrícula com informação constante na mesma. 
 
Informamos que a proposta se encontra em pausa para avanço até a segunda ordem.`
    }
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  // Search Logic (Smart Filtering)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    // Split query into tokens and normalize
    const terms = normalizeText(searchQuery).split(" ").filter(t => t.length > 0);
    
    return INITIAL_TEMPLATES.filter(t => {
      // Build a single searchable string from all template data
      let rawContent = `${t.title} ${t.subtitle || ''} ${t.message || ''}`;
      
      if (t.multiSelectOptions) {
        rawContent += " " + t.multiSelectOptions.join(" ");
      }
      
      if (t.tableData) {
        rawContent += " " + t.tableData.map(r => `${r.col1} ${r.col2} ${r.col3}`).join(" ");
      }

      if (t.emailData) {
        rawContent += " " + t.emailData.subject + " " + t.emailData.body;
      }
      
      const normalizedContent = normalizeText(rawContent);

      // Check if ALL terms are present in the content (AND logic)
      return terms.every(term => normalizedContent.includes(term));
    });
  }, [searchQuery]);

  // Templates Logic (Category based)
  const categoryTemplates = useMemo(() => {
    if (!selectedCategory) return [];
    return INITIAL_TEMPLATES.filter(t => t.categoryId === selectedCategory);
  }, [selectedCategory]);

  const activeCategoryData = CATEGORIES.find(c => c.id === selectedCategory);

  // Active template logic (defaults to first one if none selected)
  const activeTemplate = useMemo(() => {
    if (!activeTemplateId) return categoryTemplates[0];
    return categoryTemplates.find(t => t.id === activeTemplateId) || categoryTemplates[0];
  }, [categoryTemplates, activeTemplateId]);

  // Handle Category Click
  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Reset active template to the first one of the new category
    const templates = INITIAL_TEMPLATES.filter(t => t.categoryId === categoryId);
    if (templates.length > 0) {
        setActiveTemplateId(templates[0].id);
    } else {
        setActiveTemplateId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans relative selection:bg-blue-100 selection:text-blue-900">
      
      {/* Background Image - Only on Initial Dashboard (and when not searching) */}
      {!selectedCategory && !searchQuery && (
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

          {/* Botão de Informações */}
          <button 
            onClick={() => setShowInfoModal(true)}
            className="flex items-center gap-2 px-3 py-2 text-slate-600 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all font-medium border border-slate-200 hover:border-blue-200"
            title="Informações do Analista"
          >
            <Info size={20} />
            <span className="hidden sm:inline text-sm">Informações</span>
          </button>
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
        {!selectedCategory && !searchQuery && (
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
                    onClick={() => selectCategory(cat.id)}
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

        {/* VIEW: TEMPLATE LIST / TABS (Only if NOT searching and category IS selected) */}
        {selectedCategory && activeCategoryData && !searchQuery && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300">
            
            {/* Header: Back Button + Title */}
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
                <p className="text-sm text-slate-500">Selecione a ação desejada abaixo</p>
              </div>
            </div>

            {/* TAB BUTTONS (Only if there are multiple templates) */}
            {categoryTemplates.length > 1 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {categoryTemplates.map(template => {
                  const isActive = activeTemplate?.id === template.id;
                  
                  let colorClass = "bg-white text-slate-600 border-slate-200 hover:border-blue-300";
                  let Icon = FileText;

                  if (template.category === 'approval') {
                    colorClass = isActive 
                      ? "bg-green-600 text-white border-green-600 shadow-md ring-2 ring-green-200 ring-offset-1" 
                      : "bg-white text-green-700 border-green-200 hover:bg-green-50";
                    Icon = CheckCircle;
                  } else if (template.category === 'rejection') {
                    colorClass = isActive 
                      ? "bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-200 ring-offset-1" 
                      : "bg-white text-red-700 border-red-200 hover:bg-red-50";
                    Icon = XCircle;
                  } else {
                    // General / Email
                    colorClass = isActive
                      ? "bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-200 ring-offset-1"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50";
                  }

                  return (
                    <button
                      key={template.id}
                      onClick={() => setActiveTemplateId(template.id)}
                      className={`px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 border flex items-center gap-2 ${colorClass}`}
                    >
                      <Icon size={18} className={isActive ? "text-white" : ""} />
                      {template.title}
                    </button>
                  )
                })}
              </div>
            )}

            {/* ACTIVE CARD CONTENT */}
            {activeTemplate ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <TemplateCard template={activeTemplate} />
              </div>
            ) : (
               <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                  <p className="text-slate-400">Nenhum modelo encontrado nesta categoria.</p>
               </div>
            )}

          </div>
        )}
      </main>

      {/* MODAL DE INFORMAÇÕES */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
              <div className="flex items-center gap-2 text-blue-800">
                <Info size={24} />
                <h3 className="text-xl font-bold">Informações e Checklist</h3>
              </div>
              <button 
                onClick={() => setShowInfoModal(false)}
                className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 overflow-y-auto custom-scrollbar text-slate-800 leading-relaxed">
              
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-bold text-center uppercase text-sm tracking-wide">
                *** ATENÇÃO ANALISTA, REVISE AS INFORMAÇÕES ***
              </div>

              {/* COMPRADOR */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-blue-800 border-b border-blue-100 pb-1 mb-3">COMPRADOR</h4>
                <div className="space-y-3">
                  <p><strong>Declaração Pessoal de Saúde:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                    <li>A seguradora selecionada está de acordo com Produto (CP: Zurich Comercial / Aquisição: HDI, Zurich ou Zurich Comercial)</li>
                    <li>Está em nome do cliente</li>
                    <li>Está válida (Prazo: 180 dias)</li>
                    <li>Totalmente preenchida e assinada</li>
                    <li>Consta Apontamento?</li>
                    <li><strong>Checar Comentários:</strong></li>
                    <li>Retornou da Seguradora? Qual o parecer da Seguradora?</li>
                    <li>Redução de prazo: enviar para Apoio Comercial 1 com comentário Banco</li>
                    <li>Parecer desfavorável para um dos proponentes: enviar para Apoio Comercial 1 com comentário Banco</li>
                  </ul>
                  
                  <p className="mt-2"><strong>Proposta de Crédito:</strong></p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                    <li>Está em nome do cliente e assinada</li>
                    <li>Profissão, e-mail, nº RG, órgão expedidor/UF e filiação informados</li>
                  </ul>
                </div>
              </div>

              {/* COMPRADOR/VENDEDOR PF */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-blue-800 border-b border-blue-100 pb-1 mb-3">COMPRADOR/VENDEDOR PF</h4>
                <div className="space-y-4">
                  <div>
                    <strong className="text-slate-700">Estado Civil - SOLTEIRO:</strong>
                    <ul className="list-disc pl-5 text-sm text-slate-600 mt-1">
                      <li>Possui união estável</li>
                      <li>Se estrangeiro, foi apresentado RNE válido ou passaporte com visto definitivo</li>
                      <li>Apresentou Certidão de Casamento com averbação do atual estado civil</li>
                    </ul>
                  </div>

                  <div>
                    <strong className="text-slate-700">Estado Civil - CASADO:</strong>
                    <ul className="list-disc pl-5 text-sm text-slate-600 mt-1">
                      <li>Certidão de Casamento</li>
                      <li>Comunhão Parcial de Bens: antes de 26/12/77</li>
                      <li>Comunhão Universal de Bens: após 26/12/77 + Pacto Registrado no Cartório de Imóveis</li>
                      <li>Separação Total de Bens: para todos os casos + Pacto Registrado no Cartório de Imóveis</li>
                      <li>Participação Final nos Aquestos: para todos os casos</li>
                      <li>Certidão de Casamento traduzida, juramentada e registrada no Cartório de Títulos e Documentos (Para os casos de casamento estrangeiro)</li>
                    </ul>
                  </div>

                  <div>
                    <strong className="text-slate-700">DIVORCIADO / SEPARADO:</strong>
                    <ul className="list-disc pl-5 text-sm text-slate-600 mt-1">
                      <li>Possui união estável</li>
                      <li>Apresentou Certidão de Casamento com averbação do atual estado civil</li>
                    </ul>
                  </div>

                  <div>
                    <strong className="text-slate-700">VIÚVO:</strong>
                    <ul className="list-disc pl-5 text-sm text-slate-600 mt-1">
                      <li>Possui união estável</li>
                      <li>Apresentou Certidão de Casamento com averbação do óbito ou Certidão de Óbito acompanhada da Certidão de Casamento</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* VENDEDOR PF */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-blue-800 border-b border-blue-100 pb-1 mb-3">VENDEDOR PF</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  <li>Opção de Compra e Venda</li>
                  <li>Estado Civil (Vide acima)</li>
                  <li>Consta conta corrente do vendedor</li>
                  <li>Certidão Negativa de Débitos Trabalhistas (CNDT)</li>
                  <li>Venda de Ascendente para Descendente: declaração dos vendedores indicando os herdeiros com qualificação completa e assinatura</li>
                  <li>Documentação dos herdeiros recepcionados</li>
                  <li className="mt-2"><strong>Procuração (Comprador: com poderes para compra e Vendedor com poderes para Venda e receber):</strong></li>
                  <li>Está válida (Prazo: 90 dias a partir do traslado)</li>
                  <li>Possui poderes para compra conforme 238</li>
                  <li>Procuração lavrada no exterior</li>
                  <li>Consta endereço do imóvel objeto do financiamento</li>
                </ul>
              </div>

              {/* VENDEDOR PJ */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-blue-800 border-b border-blue-100 pb-1 mb-3">VENDEDOR PJ</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  <li>Opção de Compra e Venda</li>
                  <li>Consta conta corrente do vendedor</li>
                  <li>E-mail (não poderá ser utilizado caixa jurídica)</li>
                  <li className="mt-2"><strong>Carta Assinada pelos Representantes Legais:</strong></li>
                  <li>Consta data da última alteração contratual</li>
                  <li>Consta os representantes</li>
                  <li className="mt-2"><strong>Consulta Serasa:</strong></li>
                  <li>Possui apontamento (direcionar para a equipe do Jurídico) ou analisar os apontamentos</li>
                  <li className="mt-2"><strong>Certidão de Débitos Relativos a Créditos Tributários Federais e à Dívida Ativa da União:</strong> (Certidão Unificada do INSS). Caso não seja possível emitir internamente, solicitar ao cliente via parecer.</li>
                  <li className="mt-2"><strong>Contrato Social e/ou Alterações Contratuais (LTDA):</strong></li>
                  <li>Consta em nome da Vendedora</li>
                  <li>Documento Consolidado</li>
                  <li>Documento registrado na Junta Comercial</li>
                  <li className="mt-2"><strong>Estatuto Social (S/A):</strong></li>
                  <li>Consta em nome da Vendedora</li>
                  <li>Ata que elegeu a diretoria</li>
                  <li>Documento registrado na Junta Comercial</li>
                </ul>
              </div>

              {/* IMÓVEL */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-blue-800 border-b border-blue-100 pb-1 mb-3">IMÓVEL</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  <li><strong>Matrícula do Imóvel:</strong></li>
                  <li>Está em nome dos atuais vendedores</li>
                  <li>Consta averbação da Construção</li>
                  <li>Está válida (Prazo: 30 dias)</li>
                  <li>Título aquisitivo descrito conforme Compra e Venda</li>
                  <li>Endereço do Imóvel Inscrição imobiliária comparada com o IPTU</li>
                  <li>O Imóvel é do estado MT. Atentar-se quanto a validade da Matricula do Imóvel corresponder aos seguintes estados: SP, RJ, PA, ES ou PE, para os casos de vencida solicitar a Matrícula Interna.</li>
                  <li className="mt-2"><strong>Certidão Negativa de Tributos Imobiliários:</strong></li>
                  <li>Está válida (Prazo de 90 dias, caso não possua validade expressa no documento)</li>
                  <li>Certidão Positiva com Efeito de Negativa, se sim: Imóvel gravado com usufruto/inalienabilidade/penhora - Se sim solicitou cancelamento</li>
                  <li>Declaração de ciência de débitos em aberto, isentando o Banco Santander de qualquer responsabilidade, datada e assinada pelo cliente.</li>
                  <li className="mt-2"><strong>Imóvel Foreiro União/Marinha:</strong></li>
                  <li>Certidão Positiva, se sim: Comprovante de pagamento do Laudêmio CAT- Tela consulta de débitos do exercício atual</li>
                  <li>Imóvel Foro Particular ou ocupação - Tela onde consta o valor da dívida total (incluindo dívida ativa)</li>
                  <li>Comprovante de pagamento do Laudêmio Autorização do Senhorio</li>
                  <li>Cálculo demonstrando que a dívida é inferior a 5% do valor de avaliação</li>
                </ul>
              </div>

              {/* IPTU */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-blue-800 border-b border-blue-100 pb-1 mb-3">IPTU & ÔNUS</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  <li>IPTU atualizado (ano vigente/anterior)</li>
                  <li>Consta metragens do imóvel</li>
                  <li>Consta Inscrição Imobiliária</li>
                  <li>Endereço do Imóvel conforme matrícula</li>
                  <li className="mt-2"><strong>Ônus/Hipoteca/Alienação Fiduciária:</strong></li>
                  <li>Declaração de ciência de débitos em aberto, isentando o Banco Santander de qualquer responsabilidade, datada e assinada pelo cliente.</li>
                  <li>Cadastro realizado em sistema, em caso negativa cadastrá-lo</li>
                  <li>Exigência Cartorária</li>
                  <li>Necessário inclusão de cláusula</li>
                  <li>Necessário apresentação de documentos complementares</li>
                  <li>Necessário inclusão de condicionantes</li>
                </ul>
              </div>

              {/* FGTS & COMPROVANTES */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-blue-800 border-b border-blue-100 pb-1 mb-3">FGTS & COMPROVANTES</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  <li>Proposta enquadrada no SFH (Imóvel residencial, imóvel objeto do financiamento não pode ter utilização do FGTS a menos de 3 anos, não ter imóvel impeditivo, para os estados de: São Paulo, Minas Gerais, Distrito Federal e Rio de Janeiro respeitando limites atuais.</li>
                  <li className="mt-2"><strong>Autorização para movimentação de Conta Vinculada do FGTS:</strong></li>
                  <li>Documento Legível e sem rasuras</li>
                  <li>Cabeçalho completo: nome, data de nascimento, CPF e PIS/PASEP</li>
                  <li>Código Empregado, código empregador e valores de acordo com o extrato do FGTS</li>
                  <li>Valor total disponível para saque</li>
                  <li>Assinado com local e data</li>
                  <li>Nome do Titular</li>
                  <li>Número do PIS</li>
                  <li>Item FMP "Fundo Mútuo de Privatização" preenchido</li>
                  <li className="mt-2"><strong>Extrato Atualizado do FGTS (90 dias):</strong></li>
                  <li>Situação da conta</li>
                  <li>Base da conta</li>
                  <li className="mt-2"><strong>Declaração de Imposto de Renda:</strong></li>
                  <li>Consta em nome do cliente</li>
                  <li>Se apresentado a retificadora após 30/04, deverá apresentar juntamente a Original</li>
                  <li>Consta Protocolo de Entrega</li>
                  <li>Existe imóvel declarado no IR: Imóvel declarado no IR situa-se no mesmo local do imóvel objeto do financiamento ou no mesmo local de residência do cliente, se sim, solicitar matrícula atuallizada constando a venda</li>
                  <li className="mt-2"><strong>Comprovante de Residência:</strong></li>
                  <li>Está válido (Prazo: 90 dias) Somente deverá ser solicitado caso o cliente não se enquadre pelo local de trabalho e no IR a cidade do endereço esteja diferente.</li>
                  <li>Ano Anterior (Quando houver imóvel declarado no IR ou quando não há enquadramento pelo local de trabalho)</li>
                  <li><strong>Comprovante de Domicílio Profissional:</strong> Caso processo não seja enquadrado pelo local de residência ou município informado no formulário, deverá solicitar declaração do empregador</li>
                </ul>
              </div>

              {/* MINUTA */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-blue-800 border-b border-blue-100 pb-1 mb-3">MINUTA</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  <li>Conferir campos de assinatura de todos os participantes</li>
                  <li>Checado qualificação dos compradores e vendedores</li>
                  <li>Cláusulas incluídas e conferidas</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;