# Portfolio Website

A responsive portfolio website with a contact form backend.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Email**: Resend API

## Setup

1. Install dependencies:
   ```bash
   cd Backend
   npm install
   ```

2. Create `.env` file in `Backend` directory:
   ```env
   PORT=5001
   RESEND_API_KEY=your_resend_api_key
   SMTP_USER=your_email@example.com
   ```

## Running

**Backend:**
```bash
cd Backend
npm run dev
```

**Frontend:**
Serve the `Frontend` directory using any static file server (e.g., `python -m http.server 8000`)

## Author

Rity Abraham Jacob - [rityjacob.com](https://rityjacob.com)
