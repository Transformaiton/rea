# Use REA

This guide shows how Transformaiton.com customers use **REA by
Transformaiton.com** on sites and landing pages they own or are allowed to
study. Install steps are in [Install](INSTALL.md). Command contracts and
evidence fields are in [CLI and Evidence](getting-started/cli.md).

## Responsible use

Point REA only at targets you own or have permission to analyze. Typical
allowed work:

- A landing page or marketing site your business owns.
- A page a client hired you to rebuild, where the contract allows analysis.
- Your own published site, when you want to compare it with a rebuild.

Do not use REA to copy another company's design, copy, trademarks, or code, or
to bypass access controls, bot protection, or licensing. `DISCLAIMER.md` in
the repository root is the project statement of those limits.

## What you get back

For a JavaScript application directory, REA reports modules, imports, and the
evidence for those findings. It reads the files you name. It does not upload
them to Transformaiton.com. Your agent's model provider has its own data
policy for text you later paste into a chat.

Live browser observation is a separate workflow. It attaches to a browser you
start and can see page structure, scripts, network observations, and
screenshots you request. See
[Website observation with CDP](guides/web/browser-observation.md).

## Try the sample in this repository

`docs/examples/sample-landing-page` is a fictional bakery page written for
this repository. It is not a client site. The files are `index.html`,
`main.js`, and two small modules under `sections/`.

From the repository root, after `rea` is on your `PATH`:

```bash
rea analyze-javascript-application "$PWD/docs/examples/sample-landing-page" --json
```

The same command through `npx`, with an absolute path:

```bash
npx -y rea-agents@latest analyze-javascript-application /absolute/path/to/docs/examples/sample-landing-page --json
```

Replace the path with any application directory you are allowed to read.
Windows paths such as `D:/apps/example` are fine. The command exits non-zero
when the path is missing or the result is a refusal.

A recording of a real run against that sample is in
[the terminal recording](assets/transformaiton-rea-demo.gif). The last frame is
[shown here](assets/transformaiton-rea-demo.png). The captured terminal text is
`docs/assets/transformaiton-rea-demo.txt`.

That run used the published `rea-agents` 6.9.0 package, not a rebuilt checkout.
The command exited 0 and wrote 118,040 bytes of JSON. The result named operation
`analyze_javascript_application`, provider `REA JavaScript application analyzer`
version `1`, and evidence id
`ev_97e3962e1cfe64c67add5502cbbeb9367648d735cb53c0d45ba6ec2a47db3028`.
Statistics in that result: `relevant_files` 4, `parsed_javascript_files` 3,
`findings` 7. The application graph had 11 nodes and 14 edges. Import
specifiers were `./sections/hero.js` and `./sections/visit.js`. The same result
says JavaScript and HTML were parsed as inert text and that static imports do
not prove the code ran. Those figures describe this sample only.

## Ask an agent

After [setup](INSTALL.md), restart the agent and ask for a target you are
allowed to study. Two prompts that match how small businesses use this fork:

```text
Look at the landing page in docs/examples/sample-landing-page. Tell me which
scripts render the headline and the visit link, show the evidence, and sketch
a simple page our project could implement from that description.
```

```text
I own https://example.com and I want to rebuild the hero and the inquiry
form. Inspect the local copy in /absolute/path/to/my-site, list the sections
and scripts that implement them, and keep each claim tied to a file.
```

Replace the path and the feature with your own site. Do not ask the agent to
reproduce a third party's page, assets, or private endpoints.

## Inspect a local JavaScript site

Use this for an extracted static site, an Electron app directory, or an ASAR
when you already have the files:

```bash
npm install --global rea-agents
rea analyze-javascript-application /absolute/path/to/app --json
```

Read the JSON for modules and imports, then open the files it names. A
walkthrough of larger application graphs is in
[JavaScript application workflows](guides/javascript/javascript-application-workflows.md).

## Observe a page in a browser you start

REA does not launch the browser for you. Start a separate Chrome-family
profile on a loopback debugging port, pointed at a site you are allowed to
open:

```bash
google-chrome \
  --remote-debugging-port=9222 \
  --user-data-dir=/tmp/rea-browser-profile \
  http://127.0.0.1:3000
```

Then list targets and inspect one page:

```bash
rea list-browser-targets http://127.0.0.1:9222 --json
rea inspect-web-page http://127.0.0.1:9222 TARGET_ID \
  --observation-ms 1000 \
  --json
```

`TARGET_ID` comes from `list-browser-targets`. Keep the debugging port on
loopback, use a dedicated profile, and stop the browser yourself when you are
done. More observation commands, including screenshots, are in
[Website observation with CDP](guides/web/browser-observation.md).

## Rebuild from the findings

Treat the report as notes, not as a license to paste the original page into
your project.

1. List the sections you intend to rebuild, such as the hero, the offer, and
   the inquiry form.
2. For each section, keep the file or request that supports the description.
3. Implement those sections in your own markup, styles, and copy.
4. Compare the result with your source of rights, not with a page you are not
   allowed to copy.

## Troubleshooting

| What you see                       | What to do                                                                                               |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------- |
| The path is rejected               | Pass an absolute path to a directory or package you can read.                                            |
| `ps` is missing on Linux           | Install procps. The install guide links the prerequisite.                                                |
| The agent never calls REA          | Run setup again, approve the plan, and restart the agent. See [Install](INSTALL.md).                     |
| The browser command cannot connect | The browser must be one you started with a loopback debugging port. REA does not open that port for you. |
| The JSON is larger than you need   | Ask the agent for one section at a time, or repeat the command for a smaller directory.                  |

If a command fails after an update, run `rea update` for a global install, or
`npx rea-agents@latest setup` for an `npx` setup, then retry. Details are in
[Install](INSTALL.md).
