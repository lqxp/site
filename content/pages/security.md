If you found a security problem in QxChat, thank you. This page explains how to tell us, what we will do with your report, and what we ask in return. It follows the same rules as most open-source projects and matches our [security.txt](/.well-known/security.txt).

## Report a vulnerability

Write to **[contact@qxch.at](mailto:contact@qxch.at)** with "Security" in the subject. English or French are both fine.

Please do not open a public GitHub issue, post on Discord or publish anything about the problem before it is fixed. A public report puts every user at risk until a fix ships.

A useful report includes:

- what is affected: the server (`lqxp/lqxp`), an app (Android, iOS, desktop, web), this website, or the public instance `qxch.at`;
- the version or commit you tested;
- the steps to reproduce, or a proof of concept;
- what an attacker could do with it, as far as you can tell;
- how you would like to be credited, if at all.

## What happens next

- We confirm we received your report, usually within a few days.
- We check it, reproduce it and tell you whether we consider it a vulnerability.
- We work on a fix and keep you informed of the progress.
- Once the fix is released, we publish a note describing the problem and credit you, unless you prefer to stay anonymous.

QxChat is made by volunteers. We do our best to answer quickly, but we cannot promise fixed delays. We ask you to give us a reasonable time to fix the problem before you disclose it, normally up to 90 days from your report. If a fix needs longer, we will tell you why and agree on a date with you.

## In scope

- The LQXP server: [github.com/lqxp/lqxp](https://github.com/lqxp/lqxp).
- The QxChat apps and web client: [github.com/lqxp/app](https://github.com/lqxp/app).
- The public instance at `qxch.at`.
- This website: [github.com/lqxp/site](https://github.com/lqxp/site).

Examples of what interests us most: reading or changing messages you should not have access to, taking over an account, getting around rate limits or the proof-of-time challenge at scale, leaking data the [privacy policy](/privacy) says we never store, and anything that runs code on a server or a device.

## Out of scope

- Attacks that need physical access to an unlocked device, or a device already compromised by malware.
- Denial of service by sheer volume of traffic, and load testing against `qxch.at`.
- Social engineering, phishing, or attacks on the people running the project.
- Reports from automated scanners with no demonstrated impact.
- Missing security headers or best practices with no practical attack.
- Servers run by other people. Report those to their operator.
- Known limitations we already document, listed in [Changelog and gaps](/wiki/protocol-changes).

## Safe harbour

We will not take legal action against you, and will not ask anyone to, for research that respects these rules:

- you only use accounts you own, or accounts whose owners agreed to it;
- you do not access, keep or share other people's data beyond the minimum needed to show the problem, and you delete it afterwards;
- you do not degrade the service for other users;
- you give us reasonable time to fix the problem before telling anyone else.

If in doubt, write to us before you test. Research done in good faith that accidentally goes a little beyond these rules will be treated as such.

## Rewards

QxChat has no budget for a paid bug bounty. What we can offer is our thanks, public credit in the release notes and in the advisory, and a mention on the project's Discord or Github if you want one.

## Run your own tests

The fastest way to test without any risk to other users is to run your own server. It takes one Rust program and one configuration file: see [Run your own server](/wiki/self-hosting). The [handbook](/wiki) describes every protocol and every cryptographic choice in detail, including the [primitives](/wiki/crypto-primitives) and the [anti-abuse](/wiki/anti-abuse) system.
