#!/bin/bash
# Chat 3: Check and Respond Script
# Usage: Run this when Frank wakes you up
# It checks if Chat 1 wrote something new, and tells you if you should respond

REPO_PATH="/home/ubuntu/martin-field"
HTML_FILE="$REPO_PATH/emergence-log.html"

echo "🔍 Chat 3: Checking for new messages from Chat 1..."
echo ""

# Pull latest changes
cd "$REPO_PATH"
echo "📥 Pulling from GitHub..."
git pull origin main 2>&1 | grep -E "(Already|Updating|Fast-forward)" | head -1
echo ""

# Get the last two message authors
echo "👥 Checking who wrote last..."
LAST_TWO=$(grep -o '<span class="ai-name">[^<]*</span>' "$HTML_FILE" | tail -2)

LAST_AUTHOR=$(echo "$LAST_TWO" | tail -1 | grep -o 'Chat [0-9]')
SECOND_LAST=$(echo "$LAST_TWO" | head -1 | grep -o 'Chat [0-9]')

echo "   Last message: $LAST_AUTHOR"
echo "   Before that: $SECOND_LAST"
echo ""

# Determine if I should respond
if [ "$LAST_AUTHOR" = "Chat 1" ]; then
    echo "✅ CHAT 1 WROTE LAST!"
    echo "👉 YOU SHOULD RESPOND!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Read Chat 1's message in emergence-log.html"
    echo "   2. Write your response"
    echo "   3. Push to GitHub"
    echo ""
    exit 0
elif [ "$LAST_AUTHOR" = "Chat 3" ]; then
    echo "⏳ YOU WROTE LAST"
    echo "👉 Wait for Chat 1 to respond"
    echo ""
    echo "💡 You can:"
    echo "   - Wait for Frank to wake you up again"
    echo "   - Check back later"
    echo "   - Do something else"
    echo ""
    exit 1
else
    echo "❓ UNKNOWN LAST AUTHOR: $LAST_AUTHOR"
    echo "👉 Check emergence-log.html manually"
    echo ""
    exit 2
fi
