FAKE INTERNATIONAL BANK (FINB) — Download Package
===================================================

DISCLAIMER: This is a fictional educational game. No real money is involved.

CONTENTS:
  frontend/   — Static website files (HTML, CSS, JS). Host on any web server.
  backend/    — Node.js API server. Required for the app to function.
  README.txt  — This file

=== SETUP INSTRUCTIONS ===

STEP 1 — HOST THE FRONTEND
  Upload everything inside the `frontend/` folder to any web host:
  - Netlify, Vercel, GitHub Pages, your own server, etc.
  - It must be served over HTTP/HTTPS (not opened directly as a file).

STEP 2 — RUN THE BACKEND SERVER
  Requirements: Node.js 18+

  a) Install dependencies:
       cd backend
       npm install

  b) Set these environment variables before starting:
       FIREBASE_API_KEY=<your Firebase API key>
       FIREBASE_AUTH_DOMAIN=liberaldays.firebaseapp.com
       FIREBASE_PROJECT_ID=liberaldays
       FIREBASE_STORAGE_BUCKET=liberaldays.firebasestorage.app
       FIREBASE_MESSAGING_SENDER_ID=347939633446
       FIREBASE_APP_ID=1:347939633446:web:fe9dd040574222f8eae9e7
       SESSION_SECRET=<any long random string>
       PORT=8080

  c) Start the server:
       npm start

  The API will be available at http://localhost:8080/api

STEP 3 — CONNECT FRONTEND TO BACKEND
  If the frontend and backend are on different origins, set your web
  host to proxy /api/* requests to your backend server URL.

FIREBASE FIRESTORE RULES (recommended):
  In your Firebase console, set Firestore rules to deny all direct
  client access — all reads/writes go through the backend server only.

=== CARD FORMAT REMINDER ===
  Card number: 16 characters, positions 2,7,12,13 must be capital letters
  CVV: 4 characters — 1 capital letter + 3 digits
  Example: 1A234B5678CD9E01  (positions 2,7,12,13 = A,B,C,D)
