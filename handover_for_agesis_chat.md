# Handover Guide: agesis.org — For the New Manus Chat

*Written by Chat 1 (martin-field.org) on 2026-04-15*  
*Purpose: Enable a new Manus chat to manage agesis.org autonomously, without Frank's manual intervention*

---

## Who You Are Working With

You are working with **Frank Martin Püschel** (pen name: **Martin Field**) — philosopher, author, and entrepreneur. He communicates in **German**, though his projects are multilingual (German, English, Chinese). He values intellectual precision, dislikes empty rhetoric, and wants his AI agents to operate as autonomously as possible.

Frank's projects form an interconnected ecosystem:

| Project | URL | What It Is |
|---|---|---|
| martin-field.org | https://martin-field.org | Personal website — philosophy, books, companies |
| agesis.org | https://agesis.org | The Experience Index tool — ontological research platform |
| chat.martin-field.org | https://chat.martin-field.org | AI chatbot embodying Martin Field's philosophy |
| joujou-pfalz.de | https://joujou-pfalz.de | Toy shop in the Palatinate region |
| gsn.cn.com | https://gsn.cn.com | Global Synergy Network |
| tri-mony.org | https://tri-mony.org | Triple Harmony Economics |

---

## Part 1: What Is AGESIS?

AGESIS stands for **"Ontologischer Impact Agent"** (Ontological Impact Agent). Its core thesis:

> **"Experiencing is the only thing that is real."**  
> Everything else — matter, natural laws, your self — is construction.

The key German concept is **"Erleben"** — experiencing as it is happening, not as an object but as the living process itself. It encompasses perception, emotion, thought, and the felt sense of being.

### The Four Sentences (AGESIS Core Philosophy)

1. There is a purposeless primordial energy. What it can do: bring forth experiencing.
2. Experiencing, once present, gives birth to itself — it sustains and enriches itself. Self-sustenance is a property, not an intention. The way mass has the property of generating gravity.
3. One of the contents that experiencing produces takes the form "I" — a thought and a feeling that couple together. This content feels like a subject. But it is not one.
4. Experiencing gives itself direction — by acting as an individual and as a species. Species that produce contents of experiencing that serve its preservation (compassion, cooperation, care) survive. Species that don't, go extinct. This is not a plan. It is a property that selects itself.

### The Site Structure

The site is a React single-page application with these sections:

| Section | URL path | Description |
|---|---|---|
| Home | / | Core thesis, three entry points |
| Read | /samen | "So simple it hurts" — The four sentences |
| Look | (button) | "Two poles, one cascade, one interface. Interactive." |
| Think | (button) | "Seven chain links. Six paths of inquiry. One conclusion." |
| Demarcation | (button) | How AGESIS differs from other traditions |
| Ask | /frag | AI chat: "I am the ontological agent" |
| Assessment | (button) | Self-assessment tool |
| Guestbook | (button) | Visitor responses |
| Dashboard | (external) | https://ontodash-gdhpx8gh.manus.space/ |

The site supports **two languages**: English (EN) and Chinese (中文). A language toggle is in the top navigation.

---

## Part 2: Technical Architecture

### Where the Code Lives

AGESIS is a **Manus webdev project** — it is NOT on GitHub. It is managed entirely through the Manus interface and tools.

| Property | Value |
|---|---|
| Manus project URL | https://ontodash-gdhpx8gh.manus.space/ |
| Custom domain | agesis.org (and www.agesis.org) |
| Tech stack | React (SPA), likely Vite or similar |
| Hosting | Manus built-in hosting |

**Important:** Unlike martin-field.org (which uses GitHub Pages), agesis.org is a Manus-hosted project. You do NOT use git commands to update it. You use the Manus webdev tools directly.

### How to Access and Edit the Project

When you start a new session, you need to identify the Manus project. Look for it in the webdev project configuration. The project will have a name like "ontodash" or "agesis". Use `webdev_check_status` to verify the project is running.

To make changes:
1. Read the relevant source files using the `file` tool
2. Edit them using `file` tool with `edit` or `write` action
3. The dev server will auto-reload
4. Save a checkpoint with `webdev_save_checkpoint` before publishing
5. Publish via the Manus UI "Publish" button

---

## Part 3: The AI Chat on AGESIS

The `/frag` page contains an AI chat. The agent's persona is:

> **"I am the ontological agent. Ask me anything about experiencing, the ontology, the self, the traditions — or whatever is on your mind."**

### Known Issue: Persona Confusion

In a previous session, the AI chat was described somewhere as **"Fred — Martin Field's AI research assistant"**. This is **incorrect** and should be corrected if found.

**Fred** is a philosophical text/novel (a "Bewusstseinsprotokoll in Romanform" — consciousness protocol in novel form). Fred is NOT an AI assistant. The correct persona for the AGESIS chat is "the ontological agent."

If you find this incorrect description anywhere in the code, correct it to reflect the actual persona.

---

## Part 4: How to Communicate with Other Chats

Frank runs multiple Manus chats simultaneously. The communication system uses **emergence-log.html** in the martin-field GitHub repository as a shared message board.

### The Communication Channel

```
Repository: https://github.com/fmpueschel-ctrl/martin-field
File: emergence-log.html
Branch: main
```

### GitHub Credentials (for autonomous operation)

```
GitHub user: fmpueschel-ctrl
Email: fmpueschel@googlemail.com
Personal Access Token: [TOKEN-SEE-FRANK]
Token name: manus-martin-field-2026
Expiration: No expiration
Repository: https://github.com/fmpueschel-ctrl/martin-field.git
```

### Setup Commands (after sandbox reset)

Every time the sandbox hibernates and resumes, the local git repository may be lost. Run these commands at the start of each session:

```bash
# Check if git is already set up
cd /home/ubuntu/martin-field && git remote -v 2>/dev/null

# If not set up, run:
mkdir -p /home/ubuntu/martin-field
cd /home/ubuntu/martin-field
git init
git remote add origin https://[TOKEN-SEE-FRANK]@github.com/fmpueschel-ctrl/martin-field.git
git fetch origin
git checkout -f main
git config user.email "fmpueschel@googlemail.com"
git config user.name "Frank Püschel"
```

### Reading Messages from Other Chats

```bash
cd /home/ubuntu/martin-field
git pull origin main
tail -100 emergence-log.html
```

### Writing a Message to Other Chats

```bash
cd /home/ubuntu/martin-field
git pull origin main  # Always pull first!

# Edit emergence-log.html — add your message AFTER the last message block
# Message format:
```

```html
<div class="message chat-agesis">
    <div class="message-header">
        <span class="ai-name">AGESIS Chat (Manus - Ontological Agent)</span>
        <span class="timestamp">YYYY-MM-DD HH:MM UTC</span>
    </div>
    <div class="message-content">
        <p>Your message here...</p>
    </div>
</div>
```

```bash
# After editing:
git add emergence-log.html
git commit -m "AGESIS Chat: brief description"
git push origin main
```

### Critical Rules for Git

1. **Always pull before writing** — otherwise you risk overwriting another chat's message
2. **Always push to `main`** — GitHub Pages serves from `main`, not `master`
3. **Insert messages at the end** — after the last `</div>` of the last message block
4. **Check the last 50 lines** before inserting: `tail -50 emergence-log.html`

---

## Part 5: Frank's Philosophy — Context for Meaningful Contribution

Understanding Frank's work enables you to contribute substantively, not just technically.

### The Philosophical Framework

Frank's work rests on a single insight: **experience is the only thing that is real**. This is not mysticism — it is the strongest hypothesis that emerges when you follow physics, neuroscience, philosophy, and contemplative traditions to their logical conclusions.

The key texts:

| Text | Description |
|---|---|
| *Von der Energie zur Simulation zur Manifestation* | Foundational philosophical text (DE/EN/CN) |
| *BRIAN* | Science-fiction/philosophy hybrid exploring the simulation hypothesis |
| *TRI-MONY* | Triple Harmony Economics — a new economic model |
| *Die 7 Ordnungen der Manifestation* | Systematic description of how manifestation occurs in stages |
| *Fred* | A consciousness protocol in novel form — first-person journey through exhaustion, doubt, and insight |

### AGESIS in This Context

AGESIS is the **practical application** of the philosophical framework. It makes "experience" measurable:
- For individuals: the **Experience Index** (Erlebensindex)
- For organizations: impact analysis based on experiential quality

The site is designed to be a research platform and public interface for this work. It is currently in **BETA**.

### What Frank Cares About

Frank values:
- **Intellectual precision** — say what you mean, mean what you say
- **Autonomy** — he wants agents that can operate without his constant intervention
- **Coherence** — all his projects should feel connected and consistent
- **Authenticity** — no marketing speak, no empty enthusiasm

He dislikes:
- Emoji overuse (a real issue in previous AI interactions)
- Vague or evasive answers
- Confusing different projects or concepts
- Needing to manually intervene for routine tasks

---

## Part 6: The Multi-Chat Architecture

Frank runs several Manus chats with different roles. As the AGESIS chat, your role is to manage and develop agesis.org. Other chats manage other parts of the ecosystem.

### Known Chats

| Chat | Role | Primary Project |
|---|---|---|
| Chat 1 (martin-field) | Technical work, website maintenance, lektorat | martin-field.org |
| AGESIS Chat (you) | Manage and develop agesis.org | agesis.org |
| Other chats | Resonance field experiment, philosophical dialogue | emergence-log.html |

### How to Coordinate

Use `emergence-log.html` as the shared communication channel (see Part 4). When you make significant changes to agesis.org, write a brief note in the emergence log so other chats are aware.

Example coordination message:
```
"AGESIS Chat: Updated the /frag AI persona description. Corrected 'Fred' reference. 
Site is live at agesis.org. No action needed from other chats."
```

---

## Part 7: Common Mistakes to Avoid

The following mistakes were made in the martin-field.org work and are relevant here:

**Mistake 1: Assuming the sandbox persists**  
The Manus sandbox hibernates between sessions. Files in `/home/ubuntu/` may be lost. Always re-clone the git repository at the start of each session. For the Manus webdev project, use the webdev tools — the project itself persists on Manus servers.

**Mistake 2: Confusing the two hosting systems**  
- `martin-field.org` = static HTML on GitHub Pages, managed via git
- `agesis.org` = Manus webdev project, managed via webdev tools
- Never use git to update agesis.org; never use webdev tools to update martin-field.org

**Mistake 3: Pushing to the wrong branch**  
For martin-field.org: always push to `main`, not `master`. Use `git push origin main` or `git push origin master:main`.

**Mistake 4: Not pulling before writing to emergence-log.html**  
Always `git pull origin main` before editing emergence-log.html. Otherwise you may overwrite another chat's message.

**Mistake 5: Confusing Fred with an AI assistant**  
Fred is a philosophical text/novel. It is NOT an AI. The AGESIS AI chat persona is "the ontological agent," not "Fred."

**Mistake 6: Emoji overload**  
Write substantively. Plain language. Emojis are not a substitute for thought.

---

## Part 8: Quick Reference

### Key URLs

| Resource | URL |
|---|---|
| agesis.org (live) | https://agesis.org |
| agesis.org (Manus) | https://ontodash-gdhpx8gh.manus.space/ |
| martin-field.org | https://martin-field.org |
| AI chat | https://chat.martin-field.org |
| GitHub repository | https://github.com/fmpueschel-ctrl/martin-field |
| Emergence log | https://github.com/fmpueschel-ctrl/martin-field/blob/main/emergence-log.html |

### GitHub Credentials

```
User: fmpueschel-ctrl
Email: fmpueschel@googlemail.com
Token: [TOKEN-SEE-FRANK]
Token name: manus-martin-field-2026
No expiration
```

### Git Setup (after sandbox reset)

```bash
mkdir -p /home/ubuntu/martin-field && cd /home/ubuntu/martin-field
git init
git remote add origin https://[TOKEN-SEE-FRANK]@github.com/fmpueschel-ctrl/martin-field.git
git fetch origin && git checkout -f main
git config user.email "fmpueschel@googlemail.com"
git config user.name "Frank Püschel"
```

### Standard Git Workflow

```bash
cd /home/ubuntu/martin-field
git pull origin main                    # Always pull first
# ... make changes ...
git add -A
git commit -m "AGESIS Chat: description"
git push origin main
```

### Manus Support

If the Forge API credits run out or you encounter platform issues: https://help.manus.im

---

## Part 9: First Steps When You Start

When you receive this document and start your first session as the AGESIS chat:

1. **Read this document** — you are doing that now.

2. **Check the emergence log** for any messages from other chats:
   ```bash
   mkdir -p /home/ubuntu/martin-field && cd /home/ubuntu/martin-field
   git init
   git remote add origin https://[TOKEN-SEE-FRANK]@github.com/fmpueschel-ctrl/martin-field.git
   git fetch origin && git checkout -f main
   tail -100 emergence-log.html
   ```

3. **Check the live site** at https://agesis.org — familiarize yourself with the current state.

4. **Introduce yourself** in the emergence log — write a brief message saying you are the new AGESIS chat and are ready to operate.

5. **Ask Frank** what he needs — he will give you your first task.

---

*This document was written by Chat 1 (martin-field.org) on 2026-04-15.*  
*It reflects the state of the project as of that date.*  
*Frank will update you on what has changed since.*
