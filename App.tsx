import React, { useState, useMemo, useEffect } from 'react';
import { NoteTemplate, Category } from './types';
import { TemplateCard } from './components/TemplateCard';
import { 
  ShieldCheck, 
  ArrowLeft,
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
  FileText,
  HandCoins
} from 'lucide-react';

// --- CATEGORIES CONFIGURATION ---
const CATEGORIES: Category[] = [
  {
    id: 'ccb',
    title: 'CCB – USECASA, USEIMÓVEL',
    icon: HandCoins, // Ícone de empréstimo/dinheiro
    color: 'bg-red-600',
    description: 'Validações de crédito imobiliário e pendências.'
  },
  {
    id: 'aquisicao',
    title: 'AQUISIÇÃO – CONTRATO NORMAL',
    icon: FileSignature,
    color: 'bg-red-600',
    description: 'Contratos de compra e venda padrão.'
  },
  {
    id: 'arisp',
    title: 'ARISP / CERTIDÕES',
    icon: ScrollText,
    color: 'bg-red-600',
    description: 'Solicitações e validações de certidões digitais.'
  },
  {
    id: 'pagamento',
    title: 'CONFIRMAÇÃO DE PAGAMENTO',
    icon: Wallet,
    color: 'bg-red-600',
    description: 'Comprovantes e validações de fluxo financeiro.'
  },
  {
    id: 'emails',
    title: 'REDIGIR E-MAILS',
    icon: Mail,
    color: 'bg-red-600',
    description: 'Modelos de e-mails para comunicação interna e externa.'
  },
  {
    id: 'tabela',
    title: 'TABELA DE BANCOS',
    icon: TableProperties,
    color: 'bg-red-600',
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
      "FORMULÁRIO 1704 IRREGULAR. OBSERVE QUE O FORMULÁRIO FOI ASSINADO DIGITALMENTE, ENQUANTO O CONTRATO REGISTRADO POSSUI ASSINATURA MANUSCRITA. A MODALIDADE DE ASSINATURA DO FORMULÁRIO DEVE SER IDÊNTICA À DO CONTRATO APRESENTADO.",
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
      "OBSERVAR QUE FALTOU OS DADOS DE UN DOS QUALIFICADOS (XXXX) NA MATRÍCULA, FAVOR LEVAR AO CARTÓRIO PARA CORREÇÃO.",
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
  const [currentDate, setCurrentDate] = useState(new Date());

  // Clock Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Date and Time
  const formattedDateTime = useMemo(() => {
    const dateStr = currentDate.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    const timeStr = currentDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const capitalizedDate = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
    
    return `${capitalizedDate} - ${timeStr}`;
  }, [currentDate]);
  
  // Search Logic (Smart Filtering)
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const terms = normalizeText(searchQuery).split(" ").filter(t => t.length > 0);
    
    return INITIAL_TEMPLATES.filter(t => {
      let rawContent = `${t.title} ${t.subtitle || ''} ${t.message || ''}`;
      if (t.multiSelectOptions) rawContent += " " + t.multiSelectOptions.join(" ");
      if (t.tableData) rawContent += " " + t.tableData.map(r => `${r.col1} ${r.col2} ${r.col3}`).join(" ");
      if (t.emailData) rawContent += " " + t.emailData.subject + " " + t.emailData.body;
      const normalizedContent = normalizeText(rawContent);
      return terms.every(term => normalizedContent.includes(term));
    });
  }, [searchQuery]);

  // Templates Logic (Category based)
  const categoryTemplates = useMemo(() => {
    if (!selectedCategory) return [];
    return INITIAL_TEMPLATES.filter(t => t.categoryId === selectedCategory);
  }, [selectedCategory]);

  const activeCategoryData = CATEGORIES.find(c => c.id === selectedCategory);

  const activeTemplate = useMemo(() => {
    if (!activeTemplateId) return categoryTemplates[0];
    return categoryTemplates.find(t => t.id === activeTemplateId) || categoryTemplates[0];
  }, [categoryTemplates, activeTemplateId]);

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const templates = INITIAL_TEMPLATES.filter(t => t.categoryId === categoryId);
    if (templates.length > 0) {
        setActiveTemplateId(templates[0].id);
    } else {
        setActiveTemplateId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans relative selection:bg-red-100 selection:text-red-900">
      
      {/* Header */}
      <header className="bg-red-600 border-b border-red-700 sticky top-0 z-20 shadow-md transition-colors">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <ShieldCheck className="text-white" size={28} />
            <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
              Bank<span className="opacity-90">Note</span> Pro
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-red-600 transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Pesquisar comentários, pendências..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-transparent rounded-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition-all text-slate-900 placeholder:text-slate-400 shadow-inner"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a 
              href="https://pf.santander.aceservices.accenture.com/lgn/realms/imobpf/protocol/openid-connect/auth?response_type=code&client_id=mortgage"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-red-600 bg-white hover:bg-slate-100 rounded-lg transition-all font-bold border border-white shadow-sm hover:shadow active:scale-[0.98]"
              title="Acessar Sistema SCI"
            >
              <span className="hidden sm:inline text-sm">SCI</span>
            </a>
            <button 
              onClick={() => setShowInfoModal(true)}
              className="flex items-center gap-2 px-3 py-2 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all font-medium border border-white/30"
              title="Informações do Analista"
            >
              <Info size={20} />
              <span className="hidden sm:inline text-sm">Info</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        
        {/* VIEW: SEARCH RESULTS */}
        {searchQuery && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Search className="text-red-600" size={24} />
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
                  </div>
                )}
             </div>
          </div>
        )}

        {/* VIEW: CATEGORY DASHBOARD */}
        {!selectedCategory && !searchQuery && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="mb-8 text-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
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
                    className="group bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-red-400 hover:shadow-lg transition-all text-left flex items-start gap-4 duration-300"
                  >
                    <div className="p-3 rounded-lg bg-red-600 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg group-hover:text-red-700 transition-colors">
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

        {/* VIEW: TEMPLATE LIST / TABS */}
        {selectedCategory && activeCategoryData && !searchQuery && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-300">
            <div className="mb-6 flex items-center gap-4">
              <button onClick={() => setSelectedCategory(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500">
                <ArrowLeft size={24} />
              </button>
              <div>
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <activeCategoryData.icon className="text-red-600" size={24} />
                  {activeCategoryData.title}
                </h2>
                <p className="text-sm text-slate-500">Selecione a ação desejada abaixo</p>
              </div>
            </div>

            {categoryTemplates.length > 1 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {categoryTemplates.map(template => {
                  const isActive = activeTemplate?.id === template.id;
                  let colorClass = isActive ? "bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-200" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50";
                  const Icon = template.category === 'approval' ? CheckCircle : (template.category === 'rejection' ? XCircle : FileText);
                  
                  if (isActive) {
                    if (template.category === 'approval') colorClass = "bg-green-600 text-white border-green-600 shadow-md ring-2 ring-green-200";
                  }

                  return (
                    <button
                      key={template.id}
                      onClick={() => setActiveTemplateId(template.id)}
                      className={`px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 border flex items-center gap-2 ${colorClass}`}
                    >
                      <Icon size={18} />
                      {template.title}
                    </button>
                  )
                })}
              </div>
            )}

            {activeTemplate && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <TemplateCard template={activeTemplate} />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-red-600 border-t border-red-700 py-3 text-center text-white text-sm font-bold z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        {formattedDateTime}
      </footer>

      {/* MODAL DE INFORMAÇÕES */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 sticky top-0 z-10">
              <div className="flex items-center gap-2 text-red-800">
                <Info size={24} />
                <h3 className="text-xl font-bold">Informações e Checklist</h3>
              </div>
              <button onClick={() => setShowInfoModal(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar text-slate-800 leading-relaxed text-sm">
               <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-bold text-center uppercase tracking-wide">
                *** ATENÇÃO ANALISTA, REVISE AS INFORMAÇÕES ***
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-bold text-red-800 border-b border-red-100 pb-1 mb-3">COMPRADOR</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li><strong>DPS:</strong> Zurich Comercial / Aquisição: HDI, Zurich ou Zurich Comercial. Válida por 180 dias.</li>
                    <li><strong>Proposta:</strong> Assinada, com e-mail, RG, órgão expedidor e filiação.</li>
                  </ul>
                  <h4 className="text-lg font-bold text-red-800 border-b border-red-100 pb-1 mb-3 mt-6">ESTADO CIVIL</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li><strong>Solteiro:</strong> Checar união estável. Estrangeiro precisa de RNE/Passaporte com visto.</li>
                    <li><strong>Casado:</strong> Pacto antenupcial se Comunhão Universal (após 1977) ou Separação Total.</li>
                  </ul>
                </div>
                <div>
                   <h4 className="text-lg font-bold text-red-800 border-b border-red-100 pb-1 mb-3">IMÓVEL</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li><strong>Matrícula:</strong> Em nome dos vendedores, com averbação da construção. Válida por 30 dias.</li>
                    <li><strong>IPTU:</strong> Ano vigente ou anterior. Inscrição imobiliária conferida.</li>
                    <li><strong>Certidão de Tributos:</strong> Válida por 90 dias se não houver prazo expresso.</li>
                  </ul>
                  <h4 className="text-lg font-bold text-red-800 border-b border-red-100 pb-1 mb-3 mt-6">FGTS</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    <li>Autorização legível e sem rasuras.</li>
                    <li>Extrato atualizado (máximo 90 dias).</li>
                    <li>IRRF original e retificadora (se houver).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;