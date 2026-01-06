# WHATSAPPBOT

A small WhatsApp webhook receiver example using Express.

## Setup

1. Copy `.env.example` to `.env` and edit:

```
cp .env.example .env
# then edit .env and set VERIFY_TOKEN
```

2. Install dependencies:

```
npm install
```

3. Run in development (reloads with changes):

```
npm run dev
```

4. Run tests:

```
npm test
```

## Notes

- The app reads `VERIFY_TOKEN` from environment variables and exposes a GET endpoint for webhook verification and a POST endpoint for incoming events.
- Use `ngrok` or a similar tunneling tool to expose `http://localhost:3000/` to the public internet for webhook callbacks.

