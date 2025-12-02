import React, { useState, useMemo } from 'react';
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
  Mail
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
      "A MATRÍCULA INDEXADA NÃO PERTECE A PROPOSTA, FAVOR INDEXAR A MATRÍCULA XXXXX PARA PROSSEGUIRMOS."
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
      subject: 'PROPOSTA XX.XXX.XXX | PAGAMENTO POR GUIA JUDICIAL | ESPÓLIO DE XXXXXX XXXXX XXXXXX | PROCESSO XXXXXXXXXXXXXXXXXXXX',
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
  const [searchQuery, setSearchQuery] = useState('');
  
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
  const categoryTemplates = selectedCategory 
    ? INITIAL_TEMPLATES.filter(t => t.categoryId === selectedCategory)
    : [];

  const activeCategoryData = CATEGORIES.find(c => c.id === selectedCategory);

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
        {selectedCategory && activeCategoryData && !searchQuery && (
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
      </main>
    </div>
  );
}

export default App;