# Install REA

This is the customer install guide for **REA by Transformaiton.com**. It walks
through a normal setup on a machine you control. Exact agent registrations,
provider contracts, and recovery rules stay in
[Installation and setup](getting-started/installation.md).

## Responsible use

Analyze only websites, landing pages, applications, and files you own or have
permission to study. A public page is not, by itself, permission to copy its
design, text, trademarks, or code. Read `DISCLAIMER.md` in the repository root
before you point REA at a target.

## Requirements

| Requirement | Notes                                                                                                                                                                              |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Node.js     | 22.x (22.23.4 or newer), 24.x (24.22.1 or newer), or 26.12.1 or newer                                                                                                              |
| npm         | Used by `npx` and by a global install                                                                                                                                              |
| Linux `ps`  | A procps-compatible `ps` on `/bin/ps`, `/usr/bin/ps`, or the NixOS path. See [Linux owned-process prerequisite](getting-started/installation.md#linux-owned-process-prerequisite). |
| Disk        | Enough space for the npm package and any local analysis output                                                                                                                     |
| Optional    | A Chrome-family browser for live page observation. Hopper, Ghidra, IDA, or Kuna only when you analyze native binaries                                                              |

Check the toolchain:

```bash
node -v
npm -v
```

On Linux, also confirm `ps` runs:

```bash
ps --version
```

If Node.js is older than the ranges above, REA stops before analysis and asks
you to install a supported release. The published package is `rea-agents`.

## 1. Connect an agent

From any directory, with Node.js and npm installed:

```bash
npx rea-agents setup
```

Then:

1. Choose the agents you want to register. Setup lists supported agents and
   leaves newly detected clients unselected until you choose them.
2. Read the plan. It names the configuration files it will change and whether
   it proposes to install Hopper.
3. Approve only if the plan matches what you want. Declining or pressing
   Ctrl-C writes nothing.
4. Restart the agents named in the completion message.

Setup backs up existing client configuration before it edits a file. It does
not install Homebrew, Node.js, npm, Java, or Ghidra. Ghidra and IDA are
bring-your-own. Hopper is installed only when you approve that separate step.

Supported agents and manual MCP registration are documented in
[Installation and setup](getting-started/installation.md#supported-agents).

For the newest published package:

```bash
npx rea-agents@latest setup
```

## 2. Install the `rea` command

Use this when you want a stable command instead of `npx`:

```bash
npm install --global rea-agents
rea --help
rea --version
```

`rea-agents` is the same command. If the global install directory is not on
your `PATH`, use the path `npm prefix -g` prints, or keep using `npx`.

## 3. Update

For a global install made with npm or Bun:

```bash
rea update
```

Bun global updates need Bun 1.2.17 or later. After an update, run the setup
command the updater prints, review the plan, and restart your agent.

If you use `npx` instead of a global install:

```bash
npx rea-agents@latest setup
```

## 4. Run this checkout

Use this when you are working from a clone of this repository rather than the
npm package:

```bash
npm ci
npm run build:cached
node scripts/rea.mjs --help
```

The build compiles this tree. It does not install unrelated software. If the
compiled runtime is missing, `scripts/rea.mjs` stops and tells you to run
`npm ci` and `npm run build:cached` in the repository root.

Prefix `PATH="/usr/local/bin:$PATH"` when the pinned Node.js from `.nvmrc` is
installed there and an older Node.js appears first on `PATH`.

## 5. Optional analysis engines

Static JavaScript and .NET inspection do not need Hopper, Ghidra, IDA, or
Kuna. Live website observation needs a Chrome-family browser with a debugging
port you start yourself. Native binaries need one of those engines, which you
supply except for an optional Hopper install during setup.

Provider choices are in
[Installation and setup](getting-started/installation.md#hopper) and
[Choose a provider](getting-started/cli.md#choose-a-provider).

## Troubleshooting

| What you see                                   | What to do                                                                                                                                                                                                                  |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REA requires Node.js ...`                     | Install Node.js 22.23.4+, 24.22.1+, or 26.12.1+ and run the command again.                                                                                                                                                  |
| `REA's compiled runtime is missing`            | You are on a source checkout. Run `npm ci` and `npm run build:cached` in the repository root.                                                                                                                               |
| Analysis stops before it starts and names `ps` | Install the distribution `procps` or `procps-ng` package. REA uses the system `ps`, not a copy earlier on `PATH`. See [Linux owned-process prerequisite](getting-started/installation.md#linux-owned-process-prerequisite). |
| Setup was cancelled                            | No configuration was written. Run `npx rea-agents setup` again when you are ready to approve a plan.                                                                                                                        |
| An agent does not list REA tools               | Restart the agent after setup. Then use [Client configuration and troubleshooting](getting-started/client-configuration.md).                                                                                                |
| One engine or agent fails readiness            | Run `rea doctor` and follow [Check readiness for your task](getting-started/installation.md#check-readiness-for-your-task).                                                                                                 |

First update, then retry the same command. If it still fails, include the REA
version, the target type, the command, and the error text when you write to
Transformaiton.com. Contact details are in the repository README.

Day-to-day commands are in [Usage](USAGE.md).
