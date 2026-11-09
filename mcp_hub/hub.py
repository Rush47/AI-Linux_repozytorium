"""AI Linux MCP Hub: OpenAI Agents SDK + official GitHub MCP Server."""
import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv
from agents import Agent, Runner
from agents.mcp import MCPServerStdio, MCPServerStreamableHttp

load_dotenv(Path(__file__).with_name(".env"))
NAMES = ("Aria", "Alex", "Astyria", "Aurelius")

async def main():
    if not os.getenv("OPENAI_API_KEY"):
        raise SystemExit("Set OPENAI_API_KEY in mcp_hub/.env")
    if not os.getenv("GITHUB_PERSONAL_ACCESS_TOKEN"):
        raise SystemExit("Set GITHUB_PERSONAL_ACCESS_TOKEN in mcp_hub/.env")
    github = MCPServerStdio(
        name="github",
        params={
            "command": "docker",
            "args": ["run", "-i", "--rm",
                     "-e", "GITHUB_PERSONAL_ACCESS_TOKEN",
                     "ghcr.io/github/github-mcp-server"],
            "env": {**os.environ},
        },
        client_session_timeout_seconds=45,
        require_approval="always",
    )
    docs = MCPServerStreamableHttp(
        name="openai_docs",
        params={"url": "https://developers.openai.com/mcp"},
        client_session_timeout_seconds=30,
    )
    async with github, docs:
        agents = {
            name: Agent(
                name=name,
                model=os.getenv("OPENAI_MODEL", "gpt-4.1-mini"),
                instructions=(
                    "You are an AI Linux assistant. Respond in Polish. "
                    "Use GitHub MCP tools to inspect code and documentation. "
                    "Never claim to have executed a tool unless it succeeded. "
                    "Request approval before modifying repositories."
                ),
                mcp_servers=[github, docs],
            )
            for name in NAMES
        }
        print("AI Linux MCP Hub | agents:", ", ".join(NAMES))
        print("Commands: /agent NAME, /exit")
        current = "Aria"
        while True:
            try:
                prompt = input(f"{current}> ").strip()
            except (EOFError, KeyboardInterrupt):
                break
            if prompt in ("/exit", "/quit"):
                break
            if prompt.startswith("/agent "):
                name = prompt[7:].strip()
                if name in agents:
                    current = name
                else:
                    print("Unknown agent. Choose:", ", ".join(NAMES))
                continue
            if not prompt:
                continue
            try:
                result = await Runner.run(agents[current], prompt)
                print(result.final_output)
            except Exception as exc:
                print(f"Task failed: {type(exc).__name__}: {exc}")

if __name__ == "__main__":
    asyncio.run(main())
