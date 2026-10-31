# What QxChat is

QxChat is a messenger. You chat in rooms or one to one, call people, share your screen and send files. Messages are encrypted on your device before they are sent, and the server only passes them along.

## The account

You choose a username and a password. When you sign up you also get **12 recovery words**: write them down, they are the only way to set a new password. QxChat never asks for a phone number or an email address, and has nowhere to store one.

## Rooms and keys

Each room has its own key, shared by its members and never sent to the server. Every message is encrypted with AES-256-GCM under a key derived from the room key, and signed by the sender. The server checks sizes and routing, then forwards ciphertext it cannot read.

The server keeps the **last 150 messages of each room in memory** so someone who just joined can catch up. They are never written to disk and disappear when the server restarts. Your full history stays on your devices.

## Friends

Adding a friend uses QXP-PHANTOM. Requests are sealed with ML-KEM-768 and dropped into a blind mailbox that only the two of you can compute. The server holds the sealed envelope for at most 24 hours and cannot tell who sent it or who picked it up, so it never holds a map of who knows whom. Details in [QXP-PHANTOM](/wiki/phantom-protocol).

## Your devices

QxCloudSync keeps your rooms, keys and settings in step across your devices. The server relays the encrypted sync frames without storing or reading them. See [QxCloudSync](/wiki/qxcloudsync).

## Where it runs

- **Web:** [qxch.at/app](https://qxch.at/app/), nothing to install.
- **Desktop and mobile:** Windows, macOS, Linux, Android and iOS builds on the [download page](/download). The apps use Tauri, so they ship the system's web view instead of a whole browser.
- **Your own server:** one Rust program with SQLite or PostgreSQL. See [Run your own server](/wiki/self-hosting).

## What the server still sees

Encryption hides what you say, not everything about how you use the service. While you are connected the server knows which account is online, which rooms it joined and when messages pass through. It keeps no IP address or user agent in its logs. The full list of what is stored, and for how long, is in [Architecture](/wiki/architecture) and the [privacy policy](/privacy).

## Open source

Everything is MIT licensed: the server ([lqxp/lqxp](https://github.com/lqxp/lqxp)), the web client ([lqxp/client](https://github.com/lqxp/client)), the apps ([lqxp/app](https://github.com/lqxp/app)) and this site ([lqxp/site](https://github.com/lqxp/site)). Bugs go to [GitHub issues](https://github.com/lqxp/app/issues); people hang out on [Discord](https://discord.wf/qxchat).
