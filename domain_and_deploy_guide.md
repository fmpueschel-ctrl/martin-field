# Domain-Kauf & Deploy-Anleitung — Für neue Manus-Chats

*Erstellt von Chat 1 (martin-field.org) am 05. Mai 2026*  
*Ergänzung zum Handover-Dokument `handover_for_new_chat.md`*

---

## Übersicht: Welche Domain gehört wohin?

| Domain | Wo gehostet | Wie deployen | Wo gekauft |
|---|---|---|---|
| martin-field.org | GitHub Pages | `git push origin main` | Namecheap |
| www.martin-field.org | GitHub Pages (Redirect) | automatisch mit martin-field.org | Namecheap |
| chat.martin-field.org | Manus (Cloudflare) | Manus UI → Publish-Button | Namecheap (Subdomain) |
| agesis.org | Manus (Cloudflare) | Manus UI → Publish-Button | Unbekannt — Frank fragen |
| www.agesis.org | Manus (Cloudflare) | automatisch mit agesis.org | Unbekannt — Frank fragen |

---

## Teil 1: martin-field.org — GitHub Pages

### Wo gekauft

Die Domain `martin-field.org` wurde bei **Namecheap** gekauft. Dies ergibt sich aus dem Verweis in `MANUS_SESSION_INSTRUCTIONS.md`:

> "Frank kann von GitHub → Namecheap deployen"

### Wie es technisch funktioniert

GitHub Pages erkennt die Custom Domain über eine Datei namens `CNAME` im Repository-Root:

```
Inhalt der Datei /home/ubuntu/martin-field/CNAME:
martin-field.org
```

Diese Datei teilt GitHub Pages mit, dass die Seite unter `martin-field.org` erreichbar sein soll.

### DNS-Konfiguration bei Namecheap

Für GitHub Pages mit Custom Domain müssen bei Namecheap folgende DNS-Einträge gesetzt sein:

**A-Records (für die Apex-Domain `martin-field.org`):**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME-Record (für `www.martin-field.org`):**
```
www  →  fmpueschel-ctrl.github.io
```

### Deploy-Ablauf für martin-field.org

Das Deployen ist vollständig automatisch — kein manueller Schritt bei Namecheap nötig:

```bash
# 1. Änderungen machen (HTML, CSS, PDFs etc.)
cd /home/ubuntu/martin-field

# 2. Commit erstellen
git add -A
git commit -m "Beschreibung der Änderung"

# 3. Zu GitHub pushen → GitHub Pages baut automatisch neu
git push origin main
```

**Wichtig:** GitHub Pages braucht nach dem Push **1–2 Minuten** zum Neubauen. Die Seite ist danach live unter https://martin-field.org.

**Kritische Regel — Zwei Branches:**  
Das Repository hat `main` und `master`. GitHub Pages dient **nur** von `main`. Immer auf `main` pushen:
```bash
git push origin main
# ODER wenn du auf master arbeitest:
git push origin master:main
```

---

## Teil 2: chat.martin-field.org — Manus Webdev (Pueschel Universe)

### Wo gehostet

`chat.martin-field.org` ist eine Custom Domain für das Manus Webdev-Projekt **"pueschel-universe"**. Der Server-Header zeigt `cloudflare` — Manus nutzt Cloudflare als CDN/Proxy.

### Wo die Domain konfiguriert ist

Die Subdomain `chat.martin-field.org` wurde in der **Manus Management UI** eingerichtet (Settings → Domains). Namecheap stellt dafür einen CNAME-Eintrag bereit, der auf Manus zeigt.

### Deploy-Ablauf für chat.martin-field.org

Für Manus Webdev-Projekte gilt ein **anderer Workflow** als für GitHub Pages:

```
1. Code-Änderungen machen (via file-Tool oder Manus-Editor)
2. webdev_save_checkpoint aufrufen (Pflicht vor dem Publish!)
3. In der Manus Management UI auf "Publish" klicken
```

**Es gibt keinen git-Befehl.** Das Projekt lebt vollständig auf Manus-Servern.

**Wichtig:** Ohne Checkpoint ist der Publish-Button nicht aktiv. Immer zuerst einen Checkpoint erstellen.

---

## Teil 3: agesis.org — Manus Webdev (AGESIS)

### Wo gehostet

`agesis.org` ist ebenfalls ein Manus Webdev-Projekt. Server-Header: `cloudflare` — identisch mit chat.martin-field.org.

### Wo die Domain konfiguriert ist

Die Domain `agesis.org` wurde in der Manus Management UI des AGESIS-Projekts als Custom Domain eingerichtet. Der genaue Registrar ist in keinem der bisherigen Dokumente vermerkt — **Frank direkt fragen**.

### Deploy-Ablauf für agesis.org

Identisch mit chat.martin-field.org:

```
1. Code-Änderungen machen (via file-Tool oder Manus-Editor)
2. webdev_save_checkpoint aufrufen
3. In der Manus Management UI auf "Publish" klicken
```

---

## Teil 4: Vergleich der Deploy-Systeme

| Eigenschaft | GitHub Pages (martin-field.org) | Manus Webdev (agesis.org, chat.martin-field.org) |
|---|---|---|
| Deploy-Auslöser | `git push origin main` | Manus UI → Publish |
| Wartezeit | 1–2 Minuten | Sekunden bis Minuten |
| Rollback | `git revert` oder alten Commit auschecken | `webdev_rollback_checkpoint` |
| Checkpoint nötig? | Nein | Ja (vor Publish) |
| Dateiformat | Statische HTML/CSS/JS-Dateien | React-App (tRPC, Express, MySQL) |
| Datenbank | Keine | MySQL (TiDB) |
| Secrets | Keine | Via `webdev_request_secrets` |

---

## Teil 5: Häufige Fehler beim Deployen

**Fehler 1: Auf `master` statt `main` gepusht (martin-field.org)**  
GitHub Pages dient nur von `main`. Ein Push auf `master` ändert nichts an der Live-Site.  
Lösung: `git push origin master:main`

**Fehler 2: Kein Checkpoint vor Publish (Manus Webdev)**  
Der Publish-Button ist ohne Checkpoint inaktiv.  
Lösung: Immer zuerst `webdev_save_checkpoint` aufrufen.

**Fehler 3: Lokale Datei-Änderungen nicht committed (GitHub Pages)**  
Änderungen, die nur lokal gemacht wurden, erscheinen nicht auf der Live-Site.  
Lösung: `git status` prüfen, dann `git add -A && git commit && git push origin main`.

**Fehler 4: Statische Assets in Manus Webdev-Projekten**  
Große Dateien (Bilder, Videos, PDFs) dürfen NICHT im Manus-Projektverzeichnis liegen — das verursacht Deployment-Timeouts.  
Lösung: Assets via `manus-upload-file --webdev` hochladen und die zurückgegebene URL im Code verwenden.

**Fehler 5: Datenbank-Schema-Änderungen ohne Migration**  
Bei Änderungen an `drizzle/schema.ts` muss die Migration gepusht werden:
```bash
cd /home/ubuntu/pueschel-universe
pnpm db:push
```

---

## Teil 6: Quick Reference

### Git-Setup nach Sandbox-Reset

```bash
mkdir -p /home/ubuntu/martin-field && cd /home/ubuntu/martin-field
git init
git remote add origin https://[TOKEN-SEE-FRANK]@github.com/fmpueschel-ctrl/martin-field.git
git fetch origin && git checkout -f main
git config user.email "fmpueschel@googlemail.com"
git config user.name "Frank Püschel"
```

### Standard-Deploy-Befehle

```bash
# martin-field.org deployen:
cd /home/ubuntu/martin-field
git add -A && git commit -m "Beschreibung" && git push origin main

# Manus Webdev deployen (chat.martin-field.org oder agesis.org):
# → webdev_save_checkpoint aufrufen
# → Dann in der Manus UI auf "Publish" klicken
```

### Wichtige URLs

| Ressource | URL |
|---|---|
| martin-field.org (live) | https://martin-field.org |
| GitHub Repository | https://github.com/fmpueschel-ctrl/martin-field |
| GitHub Pages Status | https://github.com/fmpueschel-ctrl/martin-field/actions |
| chat.martin-field.org (live) | https://chat.martin-field.org |
| agesis.org (live) | https://agesis.org |
| Manus Support | https://help.manus.im |

---

*Dieses Dokument wurde am 05. Mai 2026 von Chat 1 erstellt.*  
*Es ergänzt `handover_for_new_chat.md` und `handover_for_agesis_chat.md`.*
