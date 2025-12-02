import { GoogleGenAI } from "@google/genai";
import { NoteTemplate } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBankComment = async (scenario: string): Promise<string> => {
  try {
    const prompt = `
      Você é um assistente bancário sênior especializado em contratos imobiliários e validação de documentos (CCB).
      
      Tarefa: Escreva um comentário formal de validação bancária baseado neste cenário: "${scenario}".
      
      Regras:
      1. Use linguagem corporativa, formal e direta.
      2. Escreva todo o texto em CAIXA ALTA (Uppercase).
      3. Seja conciso.
      4. Se for uma aprovação, mencione "SEM RESSALVAS".
      5. Se houver pendências, liste-as claramente.
      6. Retorne APENAS o texto da mensagem, sem introduções ou explicações extras.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating bank comment:", error);
    throw new Error("Falha ao gerar comentário. Verifique sua conexão ou tente novamente.");
  }
};