export interface TableRow {
  col1: string; // FEBRABAN
  col2: string; // CÓDIGO
  col3: string; // NOME
  logoUrl?: string; // URL direta do logo
}

export interface EmailData {
  to?: string; // Destinatário padrão
  subject: string;
  body: string;
}

export interface NoteTemplate {
  id: string;
  categoryId: string; // Links the template to a main category folder
  title: string;
  subtitle?: string;
  message?: string; // Optional now, as email templates use emailData
  category: 'contract' | 'general' | 'rejection' | 'approval' | 'email';
  lastUsed?: number;
  multiSelectOptions?: string[]; // Selectable text blocks
  disableAutoNumbering?: boolean; // If true, disables "1. ", "2. " prefixes in multi-select
  tableData?: TableRow[]; // Specific data for consultation tables
  emailData?: EmailData; // Specific structure for emails
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