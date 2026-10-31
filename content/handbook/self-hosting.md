# Run your own server

The QxChat server, `qxprotocol`, is one Rust program configured by one TOML file. It stores accounts in SQLite out of the box or in PostgreSQL, and it serves the web client itself, so the people you invite only need your address.

## What you need

- Rust 1.88 or newer, `git` and `bun`.
- A writable `QXP_ROOT` folder, with outbound access to GitHub and the Bun registry (the server builds the web client on startup).
- A domain and a TLS certificate if other people will connect. A TURN server if you want calls to work across strict networks.

## Quick start

```sh
git clone https://github.com/lqxp/lqxp
cd lqxp
cp files/config.example.toml files/config.custom.toml
$EDITOR files/config.custom.toml
cargo run --release
```

The server listens on port 4560. Open `http://localhost:4560/app/`.

On the very first start with an empty database, the server refuses to start on purpose. Add `createIfMissing = true` under `[database]`, start once, then remove the line.

## With Docker

```sh
docker compose up -d --build
```

The compose file mounts `files/config.custom.toml` read-only, plus the SQLite database and `files/database.json`.

## The config file

| Section | What it sets |
| --- | --- |
| `[api]` | Public domain, ports, entry points |
| `[web]` | Where the web client comes from: a signed release, or a build from the client repository |
| `[network]` | Upload folder, public folder, the embedded web chat |
| `[rtc]` | TURN servers, relay-only mode, whether calls are on |
| `[database]` | SQLite path or PostgreSQL URL, `createIfMissing` |
| `[security]` | CAPTCHA, proof-of-time difficulty, Privacy Pass, abuse thresholds |

## Pointing the apps at your server

Desktop and mobile builds read `QXP_SERVER_ORIGIN`, `QXP_API_BASE_URL` and `QXP_WS_URL`, plus `QXP_TURN_URLS`, `QXP_TURN_USERNAME`, `QXP_TURN_CREDENTIAL` and `QXP_CALLS_ENABLED` for calls. See the [app repository](https://github.com/lqxp/app).

## Updating

On bare metal, `./update.sh` pulls, rebuilds and restarts through PM2. With Docker, pull and run `docker compose up -d --build` again.

Room messages live in memory only, so a restart clears them from the server. Accounts, rooms and settings are kept in the database.
