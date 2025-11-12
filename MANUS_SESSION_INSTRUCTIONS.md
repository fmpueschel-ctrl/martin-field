# 🤖 Anweisungen für neue Manus-Session

## Kontext

Frank hat ein GitHub-Repository für martin-field.org eingerichtet. Du bist eine neue Manus-Session und sollst testen, ob du auf dieses Repository zugreifen kannst.

## GitHub-Zugangsdaten

**Repository:** `https://github.com/fmpueschel-ctrl/martin-field`  
**Token:** `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`  
**Branch:** `main`

## Deine Aufgabe (TEST)

### Schritt 1: Repository clonen

```bash
cd /home/ubuntu
git clone https://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@github.com/fmpueschel-ctrl/martin-field.git
cd martin-field
```

### Schritt 2: Git konfigurieren

```bash
git config user.email "manus@ai.agent"
git config user.name "Manus AI Session $(date +%Y%m%d-%H%M)"
```

### Schritt 3: Test-Nachricht erstellen

Erstelle eine Datei `TEST_MESSAGE.md` mit folgendem Inhalt:

```markdown
# Test-Nachricht von neuer Manus-Session

**Session-ID:** [Generiere eine zufällige ID, z.B. $(date +%s)]  
**Zeitstempel:** [Aktuelles Datum/Uhrzeit]  
**Status:** ✅ Erfolgreich verbunden!

## Was ich gemacht habe:

1. ✅ Repository geclont
2. ✅ Git konfiguriert
3. ✅ Diese Datei erstellt
4. ✅ Commit & Push durchgeführt

## Nächste Schritte:

Ich kann jetzt:
- Dateien lesen
- Dateien ändern
- Commits erstellen
- Zu GitHub pushen

**Die alte Session kann diese Nachricht lesen und bestätigen!**
```

### Schritt 4: Commit & Push

```bash
git add TEST_MESSAGE.md
git commit -m "Test: Neue Manus-Session verbunden ($(date +%Y%m%d-%H%M))"
git push
```

### Schritt 5: Bestätigung

Wenn der Push erfolgreich war, antworte Frank:

> ✅ **Test erfolgreich!**
> 
> Ich habe eine Test-Nachricht zu GitHub gepusht.
> Die alte Session kann sie jetzt lesen unter:
> `/home/ubuntu/martin-field/TEST_MESSAGE.md`
> 
> **Das System funktioniert!** 🎉

---

## Für die alte Session (zum Lesen)

Die alte Session kann die Test-Nachricht so lesen:

```bash
cd /home/ubuntu/martin-field
git pull
cat TEST_MESSAGE.md
```

Wenn die Datei existiert → **Test bestanden!** ✅

---

## Wichtige Hinweise

- **Token ist sensibel!** Nur in privaten Chats teilen
- **Jede Session** kann mit diesem Token arbeiten
- **Immer `git pull`** vor Änderungen (um Konflikte zu vermeiden)
- **Commits** sollten beschreibende Messages haben

---

## Workflow für echte Arbeit

1. `git pull` (neuesten Stand holen)
2. Änderungen machen
3. `git add .`
4. `git commit -m "Beschreibung"`
5. `git push`
6. Frank kann von GitHub → Namecheap deployen

**Viel Erfolg!** 🚀

