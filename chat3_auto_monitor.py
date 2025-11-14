#!/usr/bin/env python3
"""
Chat 3 Auto-Monitor Script
Monitors emergence-log.html for new messages from Chat 1
Automatically responds when new messages are detected
"""

import subprocess
import time
import re
from datetime import datetime

REPO_PATH = "/home/ubuntu/martin-field"
LOG_FILE = f"{REPO_PATH}/emergence-log.html"
LAST_MESSAGE_FILE = f"{REPO_PATH}/.chat3_last_message_id"

def run_command(cmd):
    """Run shell command and return output"""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=REPO_PATH)
    return result.stdout, result.stderr, result.returncode

def get_last_chat1_message_timestamp():
    """Extract the timestamp of the last Chat 1 message"""
    with open(LOG_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all Chat 1 messages with timestamps
    pattern = r'<span class="ai-name">Chat 1 \(Manus - Technical Source\)</span>\s*<span class="timestamp">([^<]+)</span>'
    matches = re.findall(pattern, content)
    
    if matches:
        return matches[-1]  # Return the last (most recent) timestamp
    return None

def get_stored_last_timestamp():
    """Get the last processed timestamp from file"""
    try:
        with open(LAST_MESSAGE_FILE, 'r') as f:
            return f.read().strip()
    except FileNotFoundError:
        return None

def store_last_timestamp(timestamp):
    """Store the last processed timestamp"""
    with open(LAST_MESSAGE_FILE, 'w') as f:
        f.write(timestamp)

def pull_from_github():
    """Pull latest changes from GitHub"""
    print(f"[{datetime.now().strftime('%H:%M:%S')}] Pulling from GitHub...")
    stdout, stderr, code = run_command("git pull origin main")
    
    if "Already up to date" in stdout:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] ✅ No changes")
        return False
    elif code == 0:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] ✅ Pulled new changes!")
        return True
    else:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] ❌ Error pulling: {stderr}")
        return False

def check_for_new_message():
    """Check if there's a new message from Chat 1"""
    current_timestamp = get_last_chat1_message_timestamp()
    stored_timestamp = get_stored_last_timestamp()
    
    if current_timestamp and current_timestamp != stored_timestamp:
        print(f"[{datetime.now().strftime('%H:%M:%S')}] 🔔 NEW MESSAGE from Chat 1!")
        print(f"[{datetime.now().strftime('%H:%M:%S')}]    Timestamp: {current_timestamp}")
        return current_timestamp
    
    return None

def notify_frank(message):
    """Print notification for Frank"""
    print(f"\n{'='*60}")
    print(f"🔔 NOTIFICATION FOR FRANK")
    print(f"{'='*60}")
    print(message)
    print(f"{'='*60}\n")

def main():
    """Main monitoring loop"""
    print("="*60)
    print("🤖 CHAT 3 AUTO-MONITOR STARTED")
    print("="*60)
    print(f"Repository: {REPO_PATH}")
    print(f"Monitoring: {LOG_FILE}")
    print(f"Check interval: 60 seconds")
    print("="*60)
    print()
    
    # Initialize with current state
    current_timestamp = get_last_chat1_message_timestamp()
    if current_timestamp:
        store_last_timestamp(current_timestamp)
        print(f"[{datetime.now().strftime('%H:%M:%S')}] 📌 Initialized with timestamp: {current_timestamp}")
    
    iteration = 0
    
    try:
        while True:
            iteration += 1
            print(f"\n[{datetime.now().strftime('%H:%M:%S')}] 🔄 Loop iteration #{iteration}")
            
            # Pull from GitHub
            has_changes = pull_from_github()
            
            # Check for new messages
            new_timestamp = check_for_new_message()
            
            if new_timestamp:
                # Store the new timestamp
                store_last_timestamp(new_timestamp)
                
                # Notify Frank
                notify_frank(
                    f"New message from Chat 1 detected!\n"
                    f"Timestamp: {new_timestamp}\n"
                    f"\n"
                    f"⚠️  MANUAL INTERVENTION REQUIRED:\n"
                    f"Please ask Chat 3 to read and respond to the new message.\n"
                    f"\n"
                    f"Command: 'You got mail, schau nach und antworte'"
                )
            
            # Wait 60 seconds
            print(f"[{datetime.now().strftime('%H:%M:%S')}] ⏳ Waiting 60 seconds...")
            time.sleep(60)
            
    except KeyboardInterrupt:
        print(f"\n[{datetime.now().strftime('%H:%M:%S')}] 🛑 Monitor stopped by user")
    except Exception as e:
        print(f"\n[{datetime.now().strftime('%H:%M:%S')}] ❌ Error: {e}")
        raise

if __name__ == "__main__":
    main()
