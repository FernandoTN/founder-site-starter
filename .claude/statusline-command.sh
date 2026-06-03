#!/usr/bin/env bash
# ~/.claude/statusline-command.sh
# Claude Code status line — reads JSON from stdin, outputs ANSI-colored single line.

input=$(cat)

# ANSI 256-color helpers
c() { printf '\033[38;5;%dm' "$1"; }
reset='\033[0m'

SEP="$(c 240)│${reset}"

# ── 1. Model name (lavender 183) ──────────────────────────────────────────────
model_display=$(printf '%s' "$input" | jq -r '.model.display_name // empty')
model_short=""
case "$model_display" in
  *Opus*)   model_short="Opus" ;;
  *Sonnet*) model_short="Sonnet" ;;
  *Haiku*)  model_short="Haiku" ;;
  *)        model_short="$model_display" ;;
esac
section_model="$(c 183)${model_short}${reset}"

# ── 2. Working directory (light blue 147) ─────────────────────────────────────
cwd=$(printf '%s' "$input" | jq -r '.cwd // empty')
[ -z "$cwd" ] && cwd=$(pwd)
dir_basename=$(basename "$cwd")
section_dir="$(c 147)${dir_basename}${reset}"

# ── 3. Git branch + dirty count (only if in a git repo) ───────────────────────
section_git=""
git_branch=$(git -C "$cwd" -c core.useBuiltinFSMonitor=false rev-parse --abbrev-ref HEAD 2>/dev/null)
if [ -n "$git_branch" ]; then
  section_git="$(c 120)${git_branch}${reset}"
  dirty_count=$(git -C "$cwd" -c core.useBuiltinFSMonitor=false status --porcelain 2>/dev/null | wc -l | tr -d ' ')
  if [ "$dirty_count" -gt 0 ] 2>/dev/null; then
    section_git="${section_git} $(c 216)+${dirty_count}${reset}"
  fi
fi

# ── 4. Context window (only if current_usage present) ─────────────────────────
section_ctx=""
has_usage=$(printf '%s' "$input" | jq -r '.context_window.current_usage // empty')
if [ -n "$has_usage" ]; then
  input_tokens=$(printf '%s' "$input" | jq -r '.context_window.current_usage.input_tokens // 0')
  cache_create=$(printf '%s' "$input" | jq -r '.context_window.current_usage.cache_creation_input_tokens // 0')
  cache_read=$(printf '%s' "$input"   | jq -r '.context_window.current_usage.cache_read_input_tokens // 0')
  output_tokens=$(printf '%s' "$input" | jq -r '.context_window.current_usage.output_tokens // 0')
  ctx_size=$(printf '%s' "$input"     | jq -r '.context_window.context_window_size // 1')

  total_in=$(( input_tokens + cache_create + cache_read ))
  pct=$(( total_in * 100 / ctx_size ))
  [ "$pct" -gt 100 ] && pct=100

  # Color tier
  if   [ "$pct" -lt 15 ]; then bar_color=33
  elif [ "$pct" -lt 30 ]; then bar_color=40
  elif [ "$pct" -lt 45 ]; then bar_color=226
  elif [ "$pct" -lt 60 ]; then bar_color=208
  elif [ "$pct" -lt 75 ]; then bar_color=196
  elif [ "$pct" -lt 90 ]; then bar_color=160
  else                          bar_color=124
  fi

  # 20-char bar
  filled=$(( pct * 20 / 100 ))
  bar=""
  for i in $(seq 1 20); do
    if [ "$i" -le "$filled" ]; then bar="${bar}█"; else bar="${bar}░"; fi
  done

  # Token K-formatting
  fmt_k() {
    local n=$1
    if [ "$n" -ge 1000 ]; then printf '%dK' $(( n / 1000 )); else printf '%d' "$n"; fi
  }
  in_fmt=$(fmt_k "$total_in")
  out_fmt=$(fmt_k "$output_tokens")

  section_ctx="$(c "$bar_color")${pct}% ${bar}${reset} $(c 147)In:${reset} $(c "$bar_color")${in_fmt}${reset} $(c 147)Out:${reset} $(c "$bar_color")${out_fmt}${reset}"
fi

# ── 5. Session name (cyan 87) ─────────────────────────────────────────────────
section_session=""
session_name=$(printf '%s' "$input" | jq -r '.session_name // empty')
if [ -n "$session_name" ]; then
  section_session="$(c 87)${session_name}${reset}"
fi

# ── 6. Effort level (gold 220) ────────────────────────────────────────────────
effort_level=$(jq -r '.effortLevel // "high"' /Users/fernandotn/.claude/settings.json 2>/dev/null)
[ -z "$effort_level" ] && effort_level="high"
section_effort="$(c 220)${effort_level}${reset}"

# ── 7. Git sync ahead/behind (periwinkle 111, only if upstream tracked) ───────
section_sync=""
if [ -n "$git_branch" ]; then
  ahead=$(git -C "$cwd" -c core.useBuiltinFSMonitor=false rev-list --count "@{u}..HEAD" 2>/dev/null)
  behind=$(git -C "$cwd" -c core.useBuiltinFSMonitor=false rev-list --count "HEAD..@{u}" 2>/dev/null)
  sync_str=""
  if [ -n "$ahead" ] && [ "$ahead" -gt 0 ] 2>/dev/null; then
    sync_str="↑${ahead}"
  fi
  if [ -n "$behind" ] && [ "$behind" -gt 0 ] 2>/dev/null; then
    [ -n "$sync_str" ] && sync_str="${sync_str} "
    sync_str="${sync_str}↓${behind}"
  fi
  if [ -n "$sync_str" ]; then
    section_sync="$(c 111)${sync_str}${reset}"
  fi
fi

# ── 8. Agent name (orchid 213, only if --agent flag present) ──────────────────
section_agent=""
agent_name=$(printf '%s' "$input" | jq -r '.agent.name // empty')
if [ -n "$agent_name" ]; then
  section_agent="$(c 213)${agent_name}${reset}"
fi

# ── Assemble sections ─────────────────────────────────────────────────────────
parts=()
parts+=("$section_model")
parts+=("$section_dir")
[ -n "$section_git" ]     && parts+=("$section_git")
[ -n "$section_ctx" ]     && parts+=("$section_ctx")
[ -n "$section_session" ] && parts+=("$section_session")
parts+=("$section_effort")
[ -n "$section_sync" ]    && parts+=("$section_sync")
[ -n "$section_agent" ]   && parts+=("$section_agent")

output=""
for part in "${parts[@]}"; do
  if [ -z "$output" ]; then
    output="$part"
  else
    output="${output} ${SEP} ${part}"
  fi
done

printf '%b\n' "$output"
