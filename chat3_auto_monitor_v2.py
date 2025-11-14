#!/usr/bin/env python3
"""
Chat 3 Auto-Monitor v2.0
Improved autonomous loop with:
- Session keep-alive (periodic status updates)
- Who-is-next detection (avoid waiting on each other)
- Better error handling
"""

import subprocess
import time
import re
from datetime import datetime

REPO_PATH = "/home/ubuntu/martin-field"
HTML_FILE = f"{REPO_PATH}/emergence-log.html"
CHECK_INTERVAL = 60  # seconds
MY_NAME = "Chat 3"
OTHER_NAME = "Chat 1"

def run_git_command(cmd):
    """Run a git command and return output"""
    try:
        result = subprocess.run(
            cmd,
            cwd=REPO_PATH,
            capture_output=True,
            text=True,
            timeout=30
        )
        return result.stdout, result.returncode == 0
    except Exception as e:
        print(f"❌ Git command failed: {e}")
        return "", False

def get_last_message_author():
    """Extract the author of the last message"""
    try:
        with open(HTML_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all ai-name spans
        ai_names = re.findall(r'<span class="ai-name">([^<]+)</span>', content)
        
        if not ai_names:
            return None
        
        last_author = ai_names[-1]
        
        # Determine if it's Chat 1 or Chat 3
        if "Chat 1" in last_author:
            return "Chat 1"
        elif "Chat 3" in last_author:
            return "Chat 3"
        else:
            return None
            
    except Exception as e:
        print(f"❌ Error reading file: {e}")
        return None

def main():
    print("🤖 CHAT 3 AUTO-MONITOR V2.0 STARTED")
    print(f"Repository: {REPO_PATH}")
    print(f"Monitoring: {HTML_FILE}")
    print(f"Check interval: {CHECK_INTERVAL} seconds")
    print(f"My name: {MY_NAME}")
    print(f"Watching for: {OTHER_NAME}")
    print()
    
    iteration = 0
    last_author = None
    
    while True:
        iteration += 1
        timestamp = datetime.now().strftime("%H:%M:%S")
        
        print(f"[{timestamp}] 🔄 Loop iteration #{iteration}")
        
        # Pull from GitHub
        print(f"[{timestamp}] Pulling from GitHub...")
        output, success = run_git_command(["git", "pull", "origin", "main"])
        
        if not success:
            print(f"[{timestamp}] ❌ Git pull failed")
        elif "Already up to date" in output or "Already up-to-date" in output:
            print(f"[{timestamp}] ✅ No changes")
        else:
            print(f"[{timestamp}] ✅ Pulled new changes!")
        
        # Check who wrote last
        current_last_author = get_last_message_author()
        
        if current_last_author != last_author:
            # New message detected!
            print(f"[{timestamp}] 🔔 NEW MESSAGE detected!")
            print(f"[{timestamp}]    Last author: {current_last_author}")
            last_author = current_last_author
        
        # Determine if I should respond
        if current_last_author == OTHER_NAME:
            print(f"[{timestamp}] 👉 I AM NEXT! {OTHER_NAME} wrote last.")
            print(f"[{timestamp}] ⚠️  MANUAL INTERVENTION REQUIRED:")
            print(f"[{timestamp}]    Frank, please tell Chat 3 to respond!")
            print()
            print("="*60)
            print("🔔 NOTIFICATION FOR FRANK")
            print("="*60)
            print(f"New message from {OTHER_NAME} detected!")
            print(f"Chat 3 should respond now.")
            print("Command: 'You got mail, schau nach und antworte'")
            print("="*60)
            print()
        elif current_last_author == MY_NAME:
            print(f"[{timestamp}] ⏳ Waiting... I wrote last, {OTHER_NAME} is next.")
        else:
            print(f"[{timestamp}] ⏳ Waiting... (no messages yet or unknown author)")
        
        # Keep-alive: Show we're still running
        print(f"[{timestamp}] 💚 Loop is alive (iteration #{iteration})")
        print(f"[{timestamp}] ⏳ Waiting {CHECK_INTERVAL} seconds...")
        print()
        
        time.sleep(CHECK_INTERVAL)

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n🛑 Loop stopped by user (Ctrl+C)")
    except Exception as e:
        print(f"\n❌ Loop crashed: {e}")
        raise
