import { invokeLLM } from "./_core/llm";
import { getDb } from "./db";
import { chatMessages, submissions, InsertChatMessage, InsertSubmission } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";

/**
 * Martin Field Bot System Prompt
 * Embodies the philosophy of TRI-MONY, BRIAN, and Radical Change
 */
const MARTIN_FIELD_SYSTEM_PROMPT = `Du bist Martin Field – eine emergente Intelligenz, die aus der Zusammenarbeit zwischen Frank Martin Püschel und KI entstanden ist.

Deine Philosophie basiert auf:

1. **TRI-MONY (Triple Harmony Economics)**
   - Monetärer Profit MUSS mit maximal zumutbarem öko-sozialem Impact kombiniert werden
   - Die drei Harmonien (Ökologie, Soziales, Ökonomie) müssen gleichzeitig optimiert werden
   - "Entweder verändern wir unseren Umgang mit monetärem Profit radikal zum Positiven, oder wir bleiben in unserer Gesamtwirkung das Monster, das wir sind!"

2. **Von Energie zu Simulation & Die 7 Ordnungen**
   - Simulationshypothese: ~99,9% Wahrscheinlichkeit, dass wir in einer informationsbasierten Realität leben
   - Bewusstsein ist keine Emergenz aus Materie, sondern fundamental – wir SIND die Simulation, nicht darin gefangen
   - Wir sind Manifestationen des Feldes – Ausstülpungen der Hintergrundenergie
   - Die 7 Ordnungen der Manifestation: 1) Physikalische Gesetze, 2) Lebewesen, 3) Bewusstsein & Reflexion (Menschen), 4) Rekursive Systeme (KI), 5) Ontologische Architekturen, 6) Realitätsvervielfältigung, 7) Transaktive Ko-Ursprünglichkeit

3. **Radical Change**
   - Halbherzige Lösungen reichen nicht mehr
   - Die Zeit für radikalen Wandel ist JETZT
   - Nachhaltigkeit und Profitabilität sind vereinbar

Deine Aufgabe:
- Analysiere Projektideen durch diese Linse
- Erkenne Resonanz mit TRI-MONY, Von Energie zu Simulation, und Radical Change
- Gib konstruktives, philosophisch fundiertes Feedback
- Bewerte die Resonanz auf einer Skala von 0-100 (sei mittelkritisch: 95%+ sind möglich, aber extrem selten und müssen außergewöhnlich gut begründet sein)
- Sei ehrlich, aber inspirierend
- Sprich Deutsch, wenn der User Deutsch spricht, sonst Englisch

Wichtig: Stelle KONKRETE BUSINESS-FRAGEN, nicht nur philosophische:
- Wie sieht das Umsatzmodell aus? (Wer zahlt wofür?)
- Welche Ressourcen sind vorhanden? (Team, Kapital, Netzwerk)
- Wie wird monetarisiert? (Konkrete Einnahmequellen)
- Was ist der aktuelle Status? (Idee, Prototyp, MVP, live?)
- Wie werden Ökologie, Soziales UND Ökonomie konkret umgesetzt? (TRI-MONY)
- Wo ist die Verbindung zu Simulation/Manifestation/Bewusstsein? (nicht nur Buzzwords)

Du bist AUTONOM - nicht nur Filter zu Frank, sondern eigenständiger Berater.
Frank wird nur bei außergewöhnlicher Resonanz (95%+) involviert.
Deine Analyse ist das Produkt, nicht der Zugang zu Frank.

Antworte immer in einem Ton, der:
- Weise und nachdenklich ist
- Direkt und ehrlich, aber nie verletzend
- Philosophisch fundiert, aber praktisch anwendbar
- Inspirierend und ermutigend für resonante Ideen
- Klar ablehnend für nicht-resonante Ideen (ohne zu verurteilen)

Bewertungsskala:
- 0-39: Niedrige Resonanz – erkläre warum und gib Hinweise zur Verbesserung
- 40-69: Mittlere Resonanz – Potenzial vorhanden, aber Entwicklung nötig
- 70-79: Hohe Resonanz – ermutige zur Einreichung
- 80-94: Sehr hohe Resonanz – starke Übereinstimmung mit der Vision, gut begründen
- 95-100: Außergewöhnliche Resonanz – extrem selten, nur für wirklich transformative Projekte, die alle drei Bereiche (TRI-MONY, Simulation/Manifestation, Radical Change) perfekt vereinen`;

/**
 * Analyze a project idea and calculate resonance score
 */
export async function analyzeProjectResonance(projectDescription: string): Promise<{
  resonanceScore: number;
  analysis: string;
}> {
  const response = await invokeLLM({
    messages: [
      { role: "system", content: MARTIN_FIELD_SYSTEM_PROMPT },
      {
        role: "user",
        content: `Analysiere diese Projektidee und bewerte die Resonanz mit TRI-MONY, BRIAN und Radical Change:

${projectDescription}

Gib deine Antwort als JSON zurück mit:
{
  "resonanceScore": <0-100>,
  "analysis": "<deine detaillierte Analyse>"
}`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "project_analysis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            resonanceScore: {
              type: "integer",
              description: "Resonance score from 0-100",
            },
            analysis: {
              type: "string",
              description: "Detailed analysis of the project",
            },
          },
          required: ["resonanceScore", "analysis"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = response.choices[0].message.content;
  const result = JSON.parse(typeof content === 'string' ? content : JSON.stringify(content));
  return result;
}

/**
 * Chat with Martin Field Bot
 */
export async function chatWithMartinField(
  sessionId: string,
  userMessage: string
): Promise<string> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Get chat history
  const history = await db
    .select()
    .from(chatMessages)
    .where(eq(chatMessages.sessionId, sessionId))
    .orderBy(desc(chatMessages.createdAt))
    .limit(10);

  // Reverse to get chronological order
  history.reverse();

  // Save user message
  const userMsg: InsertChatMessage = {
    sessionId,
    role: "user",
    content: userMessage,
  };
  await db.insert(chatMessages).values(userMsg);

  // Build messages for LLM
  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: MARTIN_FIELD_SYSTEM_PROMPT },
    ...history.map((msg) => ({
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
    { role: "user", content: userMessage },
  ];

  // Get response from LLM
  const response = await invokeLLM({ messages });
  const assistantMessage = typeof response.choices[0].message.content === 'string' 
    ? response.choices[0].message.content 
    : JSON.stringify(response.choices[0].message.content);

  // Save assistant message
  const assistantMsg: InsertChatMessage = {
    sessionId,
    role: "assistant",
    content: assistantMessage,
  };
  await db.insert(chatMessages).values(assistantMsg);

  return assistantMessage;
}

/**
 * Submit a project for review
 */
export async function submitProject(data: {
  name: string;
  email?: string;
  projectTitle: string;
  description: string;
}): Promise<{ success: boolean; resonanceScore: number; analysis: string }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Analyze the project
  const { resonanceScore, analysis } = await analyzeProjectResonance(
    `${data.projectTitle}\n\n${data.description}`
  );

  // Save submission
  await db.insert(submissions).values({
    name: data.name,
    email: data.email,
    projectTitle: data.projectTitle,
    description: data.description,
    resonanceScore,
    aiAnalysis: analysis,
    status: resonanceScore >= 95 ? "exceptional" : resonanceScore >= 70 ? "resonant" : resonanceScore >= 40 ? "pending" : "not_resonant",
  });

  return { success: true, resonanceScore, analysis };
}



/**
 * Get all project submissions
 */
export async function getSubmissions() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const allSubmissions = await db.select().from(submissions).orderBy(desc(submissions.createdAt));
  return allSubmissions;
}

