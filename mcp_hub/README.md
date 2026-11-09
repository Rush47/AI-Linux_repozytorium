# AI Linux MCP Hub

Starter integrating the official GitHub MCP Server, OpenAI documentation MCP and OpenAI Agents SDK.

## Prerequisites
- Python 3.11+ and Docker with a running daemon
- OpenAI API key (API billing is separate from ChatGPT subscription)
- GitHub fine-grained PAT scoped to repositories and permissions needed

## Start
```bash
cd mcp_hub
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env locally, never commit it
python hub.py
```

Commands: `/agent Aria`, `/agent Alex`, `/agent Astyria`, `/agent Aurelius`, `/exit`.

This is an interactive CLI starter, not a deployed daemon, browser dashboard, Linux root shell, or migration of existing agent identities. The four names designate fresh agent instances. GitHub write access depends on PAT permissions. MCP approval is enabled for GitHub operations; do not grant broad root permissions to untrusted model output.

Official dependencies:
- https://github.com/github/github-mcp-server
- https://github.com/openai/openai-agents-python
- https://developers.openai.com/mcp
