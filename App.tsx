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
  HandCoins,
  ChevronRight
} from 'lucide-react';

// --- CATEGORIES CONFIGURATION ---
const CATEGORIES: Category[] = [
  {
    id: 'ccb',
    title: 'CCB – USECASA, USEIMÓVEL',
    icon: HandCoins,
    color: 'bg-red-600',
    description: 'Imóvel como garantia do Empréstimo.'
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

// Mensagens de Aprovação específicas
const APPROVAL_CCB_MESSAGE = `PREZADOS, REALIZADA A VALIDAÇÃO DO CONTRATO REGISTRADO, OS DOCUMENTOS APRESENTADOS ESTÃO DE ACORDO COM AS DEFINIÇÕES DO BANCO SANTANDER.

REGISTRO DA ALIENAÇÃO FIDUCIÁRIA DO IMÓVEL A FAVOR DO BANCO SANTANDER, SOB O Nº R- XX.

DADOS BANCÁRIOS NO SISTEMA AG C/C DE ACORDO COM CONTRATO REGISTRADO.

O PROCESSO SEGUIRÁ COM A LIBERAÇÃO DO RECURSO AO VENDEDOR / PROPONENTE, PORÉM FICOU PENDENTE O ENVIO DO DOCUMENTO “TANGÍVEL - PROPOSTA DE ADESÃO” DEVIDAMENTE ASSINADO. ESTE DOCUMENTO FOI DISPONIBILIZADO JUNTO AO COMBO DE CONTRATO. SEM A DEVOLUÇÃO, A COBERTURA SECURITÁRIA FICARÁ COMPROMETIDA.`;

const APPROVAL_AQUISICAO_MESSAGE = `PREZADOS, REALIZADA A VALIDAÇÃO DO CONTRATO REGISTRADO, OS DOCUMENTOS APRESENTADOS ESTÃO DE ACORDO COM AS DEFINIÇÕES DO BANCO SANTANDER.

REGISTRO DA COMPRA E VENDA DO IMÓVEL COM OS DADOS CORRETOS, SOB O N º R- XX.

REGISTRO DA ALIENAÇÃO FIDUCIÁRIA DO IMÓVEL A FAVOR DO BANCO SANTANDER, SOB O Nº R- XX.

DADOS BANCÁRIOS NO SISTEMA AG C/C DE ACORDO COM CONTRATO REGISTRADO.

O PROCESSO SEGUIRÁ COM A LIBERAÇÃO DO RECURSO AO VENDEDOR / PROPONENTE, PORÉM FICOU PENDENTE O ENVIO DO DOCUMENTO “TANGÍVEL - PROPOSTA DE ADESÃO” DEVIDAMENTE ASSINADO. ESTE DOCUMENTO FOI DISPONIBILIZADO JUNTO AO COMBO DE CONTRATO. SEM A DEVOLUÇÃO, A COBERTURA SECURITÁRIA FICARÁ COMPROMETIDA.`;

// --- INITIAL TEMPLATES ---
const INITIAL_TEMPLATES: NoteTemplate[] = [
  {
    id: 'ccb-1',
    categoryId: 'ccb',
    title: 'APROVAÇÃO',
    category: 'approval',
    subtitle: 'APROVAÇÃO SEM RESSALVAS',
    message: APPROVAL_CCB_MESSAGE
  },
  {
    id: 'ccb-2',
    categoryId: 'ccb',
    title: 'RECUSA / PENDÊNCIAS',
    category: 'rejection',
    subtitle: 'RECUSA COM PENDÊNCIAS',
    message: '',
    multiSelectOptions: [
      "CONTRATO REGISTRADO SEM ASSINATURA, FAVOR PROVIDENCIAR AS ASSINATURAS DE TODOS OS PROPONETES PARA PROSSEGUIRMOS.",
      "FORMULÁRIO 1704 SEM ASSINATURA. FAVOR PROVIDENCIAR A ASSINATURA DO FORMULÁRIO 1704,POIS PRECISA SER IGUAL A ASSINATURA DO CONTRATO REGISTRADO.",
      "PREZADO(A)(S), O CONTRATO REGISTRADO ESTÁ CORROMPIDO, IMPOSSIBILITANDO EFETUAR DOWNLOAD E VISUALIZAÇÃO. GENTILEZA INDEXAR NOVAMENTE O CONTRATO NO SEU RESPECTIVO CAMPO.",
      "PREZADO(A)(S), A MATRÍCULA INDEXADA ESTÁ CORROMPIDA, IMPOSSIBILITANDO EFETUAR DOWNLOAD E VISUALIZAÇÃO. GENTILEZA INDEXAR NOVAMENTE A MATRÍCULA NO SEU RESPECTIVO CAMPO.",
      "CONTRATO INCOMPLETO. GENTILEZA NOTAR QUE FALTOU A(S) PÁGINA(S) XX DO CONTRATO REGISTRADO, FAVOR INDEXAR CONTRATO COMPLETO COM AS XX PÁGINAS PARA ANÁLISE.",
      "MATRÍCULA INCOMPLETA, FAVOR INDEXAR MATRÍCULA COMPLETA COM TODOS OS REGISTROS E AVERBAÇÕES DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER (BRASIL) S/A.",
      "MATRÍCULA DESATUALIZADA. PREZADOS GENTILEZA, NOTAR QUE A MATRÍCULA INDEXADA NÃO ESTÁ ATUALIZADA. FAVOR INDEXAR MATRÍCULA ATUALIZADA COM TODOS OS REGISTROS E AVERBAÇÕES DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER (BRASIL) S/A.",
      "PREZADOS GENTILEZA, NOTAR QUE PARA SEGUIRMOS COM A ANÁLISE É NECESSÁRIO INDEXAR A VIA NEGOCIÁVEL DA CÉDULA DE CRÉDITO BANCÁRIA REGISTRADA.",
      "CONTRATO REGISTRADO NÃO INDEXADO - FAVOR INDEXAR O CONTRATO REGISTRADO PARA ANÁLISE.",
      "FALTA MATRÍCULA - FAVOR INDEXAR A MATRÍCULA ATUALIZADA COM TODAS AS AVERBAÇÕES E REGISTROS DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER BRASIL) S/A.",
      "CONSTA APENAS 01 ASSINATURA NO CAMPO CREDOR, FAVOR OBTER ASSINATURA DOS 02 REPRESENTANTES (CREDOR), POIS A REPRESENTAÇÃO SE FAZ COM A ASSINATURA EM CONJUNTO DE DOIS PROCURADORES.",
      "IDENTIFICAMOS UMA DIVERGÊNCIA ENTRE O VALOR DO SEU FINANCIAMENTO REGISTRADO EM CONTRATO E O VALOR CONSTANTE NA MATRÍCULA DO IMÓVEL.",
      "PARA REGULARIZAR ESTA SITUAÇÃO E GARANTIR QUE TODOS OS SEUS DADOS ESTEJAM CORRETOS, FAVOR LEVAR A MATRÍCULA AO RGI PARA CORREÇÃO NO REGISTRO Nº XX.",
      "O CONTRATO INDEXADO NÃO PERTENCE A PROPOSTA, FAVOR INDEXAR O CONTRATO XX PARA PROSSEGUIRMOS.",
      "A MATRÍCULA INDEXADA NÃO PERTECE A PROPOSTA, FAVOR INDEXAR A MATRÍCULA XX PARA PROSSEGUIRMOS.",
      "PREZADOS PRENOTAÇÃO ANEXADA, AGUARDANDO CORREÇÃO. APÓS ANEXAR CONTRATO REGISTRADO CORRIGIDO E MATRÍCULA ATUALIZADA COM TODAS AS AVERBAÇÕES E REGISTRO DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER ATUAREMOS NA CONFERÊNCIA DE REGISTRO."
    ]
  },
  {
    id: 'aquisicao-1',
    categoryId: 'aquisicao',
    title: 'APROVAÇÃO',
    category: 'approval',
    subtitle: 'APROVAÇÃO SEM RESSALVAS',
    message: APPROVAL_AQUISICAO_MESSAGE
  },
  {
    id: 'aquisicao-2',
    categoryId: 'aquisicao',
    title: 'RECUSA / PENDÊNCIAS',
    category: 'rejection',
    subtitle: 'RECUSA COM PENDÊNCIAS',
    message: '', 
    multiSelectOptions: [
      "CONTRATO REGISTRADO SEM ASSINATURA, FAVOR PROVIDENCIAR AS ASSINATURAS DE TODOS OS PROPONETES PARA PROSSEGUIRMOS.",
      "FORMULÁRIO 1704 SEM ASSINATURA. FAVOR PROVIDENCIAR A ASSINATURA DO FORMULÁRIO 1704,POIS PRECISA SER IGUAL A ASSINATURA DO CONTRATO REGISTRADO.",
      "PREZADO(A)(S), O CONTRATO REGISTRADO ESTÁ CORROMPIDO, IMPOSSIBILITANDO EFETUAR DOWNLOAD E VISUALIZAÇÃO. GENTILEZA INDEXAR NOVAMENTE O CONTRATO NO SEU RESPECTIVO CAMPO.",
      "PREZADO(A)(S), A MATRÍCULA INDEXADA ESTÁ CORROMPIDA, IMPOSSIBILITANDO EFETUAR DOWNLOAD E VISUALIZAÇÃO. GENTILEZA INDEXAR NOVAMENTE A MATRÍCULA NO SEU RESPECTIVO CAMPO.",
      "CONTRATO INCOMPLETO. GENTILEZA NOTAR QUE FALTOU A(S) PÁGINA(S) XX DO CONTRATO REGISTRADO, FAVOR INDEXAR CONTRATO COMPLETO COM AS XX PÁGINAS PARA ANÁLISE.",
      "FORMULÁRIO 1704 IRREGULAR. OBSERVE QUE O FORMULÁRIO FOI ASSINADO DIGITALMENTE, ENQUANTO O CONTRATO REGISTRADO POSSUI ASSINATURA MANUSCRITA. A MODALIDADE DE ASSINATURA DO FORMULÁRIO DEVE SER IDÊNTICA À DO CONTRATO APRESENTADO.",
      "PREZADO(A)(S), O CONTRATO E A MATRÍCULA INDEXADOS ESTÃO CORROMPIDOS, IMPOSSIBILITANDO EFETUAR DOWNLOAD E VISUALIZAÇÃO. GENTILEZA INDEXAR NOVAMENTE O CONTRATO E MATRÍCULA NOS SEUS RESPECTIVOS CAMPOS.",
      "MATRÍCULA INCOMPLETA, FAVOR INDEXAR MATRÍCULA COMPLETA COM TODOS OS REGISTROS E AVERBAÇÕES DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER (BRASIL) S/A.",
      "MATRÍCULA DESATUALIZADA. PREZADOS GENTILEZA, NOTAR QUE A MATRÍCULA INDEXADA NÃO ESTÁ ATUALIZADA. FAVOR INDEXAR MATRÍCULA ATUALIZADA COM TODOS OS REGISTROS E AVERBAÇÕES DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER (BRASIL) S/A.",
      "CONTRATO REGISTRADO NÃO INDEXADO - FAVOR INDEXAR O CONTRATO REGISTRADO PARA ANÁLISE.",
      "FALTA MATRÍCULA - FAVOR INDEXAR A MATRÍCULA ATUALIZADA COM TODAS AS AVERBAÇÕES E REGISTROS DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER BRASIL) S/A.",
      "CONSTA APENAS 01 ASSINATURA NO CAMPO CREDOR, FAVOR OBTER ASSINATURA DOS 02 REPRESENTANTES (CREDOR), POIS A REPRESENTAÇÃO SE FAZ COM A ASSINATURA EM CONJUNTO DE DOIS PROCURADORES.",
      "IDENTIFICAMOS UMA DIVERGÊNCIA ENTRE O VALOR DO SEU FINANCIAMENTO REGISTRADO EM CONTRATO E O VALOR CONSTANTE NA MATRÍCULA DO IMÓVEL.",
      "PARA REGULARIZAR ESTA SITUAÇÃO E GARANTIR QUE TODOS OS SEUS DADOS ESTEJAM CORRETOS, FAVOR LEVAR A MATRÍCULA AO RGI PARA CORREÇÃO NO REGISTRO Nº XX.",
      "OBSERVAR QUE FALTOU OS DADOS DE UM DOS QUALIFICADOS (XX) NA MATRÍCULA, FAVOR LEVAR AO CARTÓRIO PARA CORREÇÃO.",
      "FALTOU O FORMULÁRIO 1704, FAVOR PROVIDENCIAR O FORMULÁRIO 1704 DEVIDAMENTE ASSINADO, A ASSINATURA DO FORMULÁRIO PRECISA SER IGUAL A ASSINATURA DO CONTRATO REGISTRADO",
      "SOLICITAMOS PROVIDENCIAR O FORMULÁRIO 1704, POR TRATAR DE PAGAMENTO AO PROCURADOR, O QUAL ESTÁ QUALIFICADO EM CONTRATO, PARA VALIDAÇÃO DOS DADOS BANCÁRIOS. SOLICITAMOS QUE SEJA PREENCHIDO NO CAMPO DO PROCURADOR O NOME DO PROCURADOR E SEU CPF. OBS: A ASSINATURA DO FORMULÁRIO PRECISA SER IGUAL A ASSINATURA DO CONTRATO REGISTRADO.",
      "PROCURAÇÃO VENCIDA, FAVOR PROVIDENCIAR UMA NOVA PROCURAÇÃO/SUBSTABELECIMENTO COM PRAZO VIGENTE DE 90 DIAS CONTADOS A PARTIR DA DATA DE EMISSÃO.",
      "FALTOU A GUIA PARA PAGAMENTO, FAVOR PROVIDENCIAR A GUIA DE PAGAMENTO EM VICENDAS COM ID PARA PROVIDENCIARMOS O PAGAMENTO.",
      "GUIA VENCIDA, FAVOR PROVIDENCIAR A GUIA DE PAGAMENTO EM VICENDAS COM ID PARA PROVIDENCIARMOS O PAGAMENTO.",
      "GUIA ERRADA, FAVOR PROVIDENCIAR A GUIA CORRETA DE PAGAMENTO EM VICENDAS COM ID PARA PROVIDENCIARMOS O PAGAMENTO.",
      "GUIA SEM Nº DE ID, FAVOR PROVIDENCIAR A GUIA DE PAGAMENTO EM VICENDAS COM ID PARA PROVIDENCIARMOS O PAGAMENTO.",
      "O CONTRATO INDEXADO NÃO PERTENCE A PROPOSTA, FAVOR INDEXAR O CONTRATO XX PARA PROSSEGUIRMOS.",
      "A MATRÍCULA INDEXADA NÃO PERTECE A PROPOSTA, FAVOR INDEXAR A MATRÍCULA XX PARA PROSSEGUIRMOS.",
      "PREZADOS PRENOTAÇÃO ANEXADA, AGUARDANDO CORREÇÃO. APÓS ANEXAR CONTRATO REGISTRADO CORRIGIDO E MATRÍCULA ATUALIZADA COM TODAS AS AVERBAÇÕES E REGISTRO DE COMPRA, VENDA E ALIENAÇÃO AO BANCO SANTANDER ATUAREMOS NA CONFERÊNCIA DE REGISTRO."
    ]
  },
  {
    id: 'arisp-1',
    categoryId: 'arisp',
    title: 'SOLICITAÇÃO DE CERTIDÃO PARA AVANÇO DE FASE POSTERIOR',
    category: 'general',
    toggleOptions: [
      {
        label: 'CP',
        value: 'cp',
        message: `SOLICITADO CERTIDÃO DIGITAL XX, AGUARDANDO DISPONIBILIZAÇÃO.

PARA CONFERÊNCIA TOTAL DO REGISTRO DO CONTRATO E POSTERIOR ENVIO PARA LIBERAÇÃO DO RECURSO, FOI SOLICITADO MATRÍCULA DO IMÓVEL INTERNAMENTE, SEM NECESSIDADE DE ATUAÇÃO DO CLIENTE.

APÓS DISPONIBILIZAÇÃO DA CERTIDÃO, A PROPOSTA SERÁ AVANÇADA.*

PREZADOS, REALIZADA A VALIDAÇÃO DO CONTRATO REGISTRADO, OS DOCUMENTOS APRESENTADOS ESTÃO DE ACORDO COM AS DEFINIÇÕES DO BANCO SANTANDER.

REGISTRO DA ALIENAÇÃO FIDUCIÁRIA DO IMÓVEL A FAVOR DO BANCO SANTANDER, SOB O Nº R- XX.

DADOS BANCÁRIOS NO SISTEMA AG C/C DE ACORDO COM CONTRATO REGISTRADO.`
      },
      {
        label: 'Aquisição',
        value: 'aquisicao',
        message: `SOLICITADO CERTIDÃO DIGITAL XX, AGUARDANDO DISPONIBILIZAÇÃO.

PARA CONFERÊNCIA TOTAL DO REGISTRO DO CONTRATO E POSTERIOR ENVIO PARA LIBERAÇÃO DO RECURSO, FOI SOLICITADO MATRÍCULA DO IMÓVEL INTERNAMENTE, SEM NECESSIDADE DE ATUAÇÃO DO CLIENTE.

APÓS DISPONIBILIZAÇÃO DA CERTIDÃO, A PROPOSTA SERÁ AVANÇADA.*

PREZADOS, REALIZADA A VALIDAÇÃO DO CONTRATO REGISTRADO, OS DOCUMENTOS APRESENTADOS ESTÃO DE ACORDO COM AS DEFINIÇÕES DO BANCO SANTANDER.

REGISTRO DA COMPRA E VENDA DO IMÓVEL COM OS DADOS CORRETOS, SOB O N º R- XX.

REGISTRO DA ALIENAÇÃO FIDUCIÁRIA DO IMÓVEL A FAVOR DO BANCO SANTANDER, SOB O Nº R- XX.

DADOS BANCÁRIOS NO SISTEMA AG C/C DE ACORDO COM CONTRATO REGISTRADO.`
      }
    ]
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

const normalizeText = (text: string) => {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDateTime = useMemo(() => {
    const dateStr = currentDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    const timeStr = currentDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    return `${dateStr.charAt(0).toUpperCase() + dateStr.slice(1)} - ${timeStr}`;
  }, [currentDate]);
  
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
    if (templates.length > 0) setActiveTemplateId(templates[0].id);
    else setActiveTemplateId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans relative selection:bg-red-100 selection:text-red-900">
      <header className="bg-red-600 sticky top-0 z-20 shadow-md transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer" onClick={() => setSelectedCategory(null)}>
            <ShieldCheck className="text-white" size={28} />
            <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block">
              Bank<span className="opacity-90">Note</span> Pro
            </h1>
          </div>
          <div className="flex-1 max-w-md relative">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-white transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Pesquisar comentários, pendências..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-transparent rounded-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all text-white placeholder:text-slate-300 shadow-inner"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white">
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a href="https://pf.santander.aceservices.accenture.com/lgn/realms/imobpf/protocol/openid-connect/auth?response_type=code&client_id=mortgage" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 text-red-600 bg-white hover:bg-slate-100 rounded-lg transition-all font-bold shadow-sm hover:shadow active:scale-[0.98]">
              <span className="hidden sm:inline text-sm">SCI</span>
            </a>
            <button onClick={() => setShowInfoModal(true)} className="flex items-center gap-2 px-3 py-2 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all font-medium border border-transparent">
              <Info size={20} />
              <span className="hidden sm:inline text-sm">Info</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {searchQuery && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
             <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Search className="text-red-600" size={24} /> Resultados da Pesquisa</h2>
                <p className="text-sm text-slate-500">{searchResults.length} resultado(s) encontrado(s) para "{searchQuery}"</p>
             </div>
             <div className="grid gap-6">
                {searchResults.map((template) => <TemplateCard key={template.id} template={template} />)}
                {searchResults.length === 0 && <div className="text-center py-12 bg-white rounded-xl shadow-sm"><p className="text-slate-400">Nenhum resultado encontrado.</p></div>}
             </div>
          </div>
        )}

        {!selectedCategory && !searchQuery && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 text-center bg-white p-6 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Comentário Banco</h2>
              <p className="text-slate-600 font-medium">Selecione o tipo de produto para acessar os modelos.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button key={cat.id} onClick={() => selectCategory(cat.id)} className="group bg-red-600 p-6 rounded-xl shadow-md hover:bg-red-700 hover:shadow-xl transition-all text-left flex items-start gap-4 duration-300">
                    <div className="p-3 rounded-lg bg-white/10 text-white shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{cat.title}</h3>
                      <p className="text-sm text-white/80 mt-1 leading-relaxed">{cat.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {selectedCategory && activeCategoryData && !searchQuery && (
          <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in duration-300">
            {/* Sidebar with Quick Links */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="sticky top-24">
                <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 mb-6 text-slate-600 hover:text-red-600 font-bold transition-colors group">
                  <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Voltar ao Menu</span>
                </button>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Próximos Itens</p>
                  {CATEGORIES.filter(c => c.id !== selectedCategory).map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => selectCategory(cat.id)}
                      className="w-full flex items-center justify-between p-3 rounded-lg bg-red-600 text-white font-bold text-sm shadow-sm hover:bg-red-700 transition-all group"
                    >
                      <span className="flex-1 text-left">{cat.title}</span>
                      <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 animate-in slide-in-from-right-8 duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-red-600 text-white rounded-lg shadow-sm">
                    <activeCategoryData.icon size={24} />
                  </div>
                  {activeCategoryData.title}
                </h2>
                <p className="text-sm text-slate-500 mt-2">{activeCategoryData.description}</p>
              </div>

              {categoryTemplates.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {categoryTemplates.map(template => {
                    const isActive = activeTemplate?.id === template.id;
                    const Icon = template.category === 'approval' ? CheckCircle : (template.category === 'rejection' ? XCircle : FileText);
                    const colorClass = isActive 
                      ? (template.category === 'approval' ? "bg-green-600 text-white" : "bg-red-600 text-white")
                      : "bg-white text-slate-700 hover:bg-slate-50";

                    return (
                      <button
                        key={template.id}
                        onClick={() => setActiveTemplateId(template.id)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center gap-2 shadow-sm ${colorClass} ${isActive ? 'ring-2 ring-offset-2 ring-slate-200' : ''}`}
                      >
                        <Icon size={16} />
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
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-red-600 py-3 text-center text-white text-sm font-bold z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.15)]">
        {formattedDateTime}
      </footer>

      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-4 flex justify-between items-center bg-slate-50 sticky top-0 z-10 shadow-sm">
              <div className="flex items-center gap-2 text-red-800">
                <Info size={24} />
                <h3 className="text-xl font-bold">Informações e Checklist</h3>
              </div>
              <button onClick={() => setShowInfoModal(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar text-slate-800 leading-relaxed text-sm">
               <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-bold text-center uppercase tracking-wide shadow-inner">
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