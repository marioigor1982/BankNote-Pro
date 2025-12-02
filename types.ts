export interface TableRow {
  col1: string; // FEBRABAN
  col2: string; // CÓDIGO
  col3: string; // NOME
  logoUrl?: string; // URL direta do logo
}

export interface NoteTemplate {
  id: string;
  categoryId: string; // Links the template to a main category folder
  title: string;
  subtitle?: string;
  message: string;
  category: 'contract' | 'general' | 'rejection' | 'approval';
  lastUsed?: number;
  multiSelectOptions?: string[]; // Selectable text blocks
  tableData?: TableRow[]; // Specific data for consultation tables
}

export interface GenerationRequest {
  scenario: string;
  tone: 'formal' | 'neutral' | 'strict';
}

export interface Category {
  id: string;
  title: string;
  icon: any;
  color: string;
  description: string;
}