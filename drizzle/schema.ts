import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Project submissions from the Resonance page
 */
export const submissions = mysqlTable("submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }),
  projectTitle: varchar("projectTitle", { length: 500 }).notNull(),
  description: text("description").notNull(),
  resonanceScore: int("resonanceScore"), // 0-100, calculated by AI
  aiAnalysis: text("aiAnalysis"), // AI's analysis of the project
  status: mysqlEnum("status", ["pending", "reviewed", "resonant", "not_resonant", "exceptional"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = typeof submissions.$inferInsert;

/**
 * Chat messages with Martin Field Bot
 */
export const chatMessages = mysqlTable("chatMessages", {
  id: int("id").autoincrement().primaryKey(),
  sessionId: varchar("sessionId", { length: 255 }).notNull(),
  role: mysqlEnum("role", ["user", "assistant", "system"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof chatMessages.$inferSelect;
export type InsertChatMessage = typeof chatMessages.$inferInsert;

/**
 * Companies/Organizations
 */
export const companies = mysqlTable("companies", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  tagline: text("tagline"),
  description: text("description"),
  websiteUrl: varchar("websiteUrl", { length: 512 }),
  logoUrl: varchar("logoUrl", { length: 512 }),
  industry: varchar("industry", { length: 128 }),
  location: varchar("location", { length: 255 }),
  founded: int("founded"),
  sortOrder: int("sortOrder").default(0),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Company = typeof companies.$inferSelect;
export type InsertCompany = typeof companies.$inferInsert;

/**
 * Books and Publications
 */
export const books = mysqlTable("books", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: text("subtitle"),
  description: text("description"),
  coverImageUrl: varchar("coverImageUrl", { length: 512 }),
  amazonUrl: varchar("amazonUrl", { length: 512 }),
  publishedYear: int("publishedYear"),
  isbn: varchar("isbn", { length: 32 }),
  publisher: varchar("publisher", { length: 255 }),
  pages: int("pages"),
  language: varchar("language", { length: 8 }).default("de"),
  status: mysqlEnum("status", ["published", "unpublished", "coming_soon"]).default("published"),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Book = typeof books.$inferSelect;
export type InsertBook = typeof books.$inferInsert;

/**
 * Philosophical Works and Concepts
 */
export const philosophicalWorks = mysqlTable("philosophical_works", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: text("subtitle"),
  description: text("description"),
  content: text("content"), // Full text or summary
  category: mysqlEnum("category", ["trimony", "brian", "manifestation", "consciousness", "other"]).notNull(),
  imageUrl: varchar("imageUrl", { length: 512 }),
  documentUrl: varchar("documentUrl", { length: 512 }),
  sortOrder: int("sortOrder").default(0),
  isPublic: boolean("isPublic").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PhilosophicalWork = typeof philosophicalWorks.$inferSelect;
export type InsertPhilosophicalWork = typeof philosophicalWorks.$inferInsert;

/**
 * Stakeholders - People and Organizations to connect with
 */
export const stakeholders = mysqlTable("stakeholders", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["person", "organization", "institution", "media"]).notNull(),
  role: varchar("role", { length: 255 }), // e.g., "Investor", "Academic", "Partner"
  email: varchar("email", { length: 320 }),
  website: varchar("website", { length: 512 }),
  linkedinUrl: varchar("linkedinUrl", { length: 512 }),
  description: text("description"),
  relevance: text("relevance"), // Why they are relevant
  status: mysqlEnum("status", ["potential", "contacted", "engaged", "partner", "inactive"]).default("potential"),
  priority: mysqlEnum("priority", ["low", "medium", "high"]).default("medium"),
  tags: text("tags"), // JSON array of tags
  notes: text("notes"),
  lastContactedAt: timestamp("lastContactedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Stakeholder = typeof stakeholders.$inferSelect;
export type InsertStakeholder = typeof stakeholders.$inferInsert;

/**
 * Synergies - Connections between different areas
 */
export const synergies = mysqlTable("synergies", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  sourceType: mysqlEnum("sourceType", ["company", "book", "philosophy", "stakeholder"]).notNull(),
  sourceId: int("sourceId").notNull(),
  targetType: mysqlEnum("targetType", ["company", "book", "philosophy", "stakeholder"]).notNull(),
  targetId: int("targetId").notNull(),
  synergyType: mysqlEnum("synergyType", ["conceptual", "practical", "business", "research"]).notNull(),
  strength: mysqlEnum("strength", ["weak", "medium", "strong"]).default("medium"),
  discoveredBy: mysqlEnum("discoveredBy", ["manual", "ai_agent"]).default("manual"),
  isActive: boolean("isActive").default(true),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Synergy = typeof synergies.$inferSelect;
export type InsertSynergy = typeof synergies.$inferInsert;

/**
 * Agent Activities - Log of intelligent agent actions
 */
export const agentActivities = mysqlTable("agent_activities", {
  id: int("id").autoincrement().primaryKey(),
  activityType: mysqlEnum("activityType", [
    "synergy_discovered",
    "stakeholder_identified",
    "opportunity_found",
    "content_analyzed",
    "recommendation_made"
  ]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  relatedType: mysqlEnum("relatedType", ["company", "book", "philosophy", "stakeholder", "synergy"]),
  relatedId: int("relatedId"),
  confidence: int("confidence"), // 0-100
  status: mysqlEnum("status", ["pending", "reviewed", "accepted", "rejected"]).default("pending"),
  metadata: text("metadata"), // JSON for additional data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AgentActivity = typeof agentActivities.$inferSelect;
export type InsertAgentActivity = typeof agentActivities.$inferInsert;

/**
 * Content Blocks - Flexible content management
 */
export const contentBlocks = mysqlTable("content_blocks", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 64 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  contentType: mysqlEnum("contentType", ["markdown", "html", "text"]).default("markdown"),
  category: varchar("category", { length: 64 }),
  language: varchar("language", { length: 8 }).default("de"),
  isPublic: boolean("isPublic").default(true),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContentBlock = typeof contentBlocks.$inferSelect;
export type InsertContentBlock = typeof contentBlocks.$inferInsert;

