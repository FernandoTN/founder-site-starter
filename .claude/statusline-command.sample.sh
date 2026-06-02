#!/usr/bin/env bash
# Sample Claude Code status line for take-home users.
#
# Fernando already has one configured globally — DO NOT wire this into a project
# settings.json for the demo, or it would OVERRIDE his nicer global status line.
# This is a reference so attendees can get the "context fuel gauge" feel.
#
# To use it yourself:
#   1. chmod +x .claude/statusline-command.sample.sh
#   2. In ~/.claude/settings.json add:
#        { "statusLine": { "type": "command",
#          "command": "bash ~/path/to/statusline-command.sample.sh" } }
#   (or just run /statusline in a session and describe what you want in English.)
#
# Claude Code pipes a JSON blob about the session to this script on stdin.

input=$(cat)

if command -v jq >/dev/null 2>&1; then
  model=$(printf '%s' "$input" | jq -r '.model.display_name // "Claude"')
  dir=$(printf '%s'  "$input" | jq -r '.workspace.current_dir // .cwd // "."')
  # Cost/context fields vary by version; fall back gracefully if absent.
  cost=$(printf '%s' "$input" | jq -r '(.cost.total_cost_usd // empty)')
else
  model="Claude"; dir="."; cost=""
fi

base=$(basename "$dir")
branch=$(git -C "$dir" rev-parse --abbrev-ref HEAD 2>/dev/null)

line="🌿 ${model}  ·  ${base}"
[ -n "$branch" ] && line="${line}  ·  ⎇ ${branch}"
[ -n "$cost" ]   && line="${line}  ·  \$$(printf '%.2f' "$cost" 2>/dev/null || echo "$cost")"

printf '%s' "$line"
