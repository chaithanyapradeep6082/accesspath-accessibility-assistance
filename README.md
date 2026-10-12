
# AccessPath — Accessible Scholarship Explorer

AccessPath is a hackathon prototype designed to make scholarship information easier to explore for people with disabilities, including people with visual impairments.

The project aims to provide a clearer interface, guided navigation, scholarship information, rule-based eligibility checks, and assistance features.

## Problem Statement

People with visual impairments can encounter barriers when using online services with inaccessible controls, complex instructions, or information presented in difficult-to-interpret tables and charts.

AccessPath explores how an accessibility-focused interface can make scholarship information easier to navigate.

## Features

- Scholarship listing and exploration
- Step-by-step scholarship information and eligibility workflow
- Accessible interface controls
- Speech assistance
- Rule-based question-and-answer assistance
- Scholarship data visualizations

Features are implemented progressively as part of the hackathon prototype.

## Technology Stack

### Frontend
- React
- JavaScript
- CSS
- Vite, if configured in the project

### Backend
- Python
- Flask
- Flask-CORS

### Data
- CSV-based demonstration scholarship records

## Project Structure

```text
accesspath_accessibility_assistance/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── backend/
│   ├── data/
│   ├── routes/
│   ├── services/
│   ├── app.py
│   └── requirements.txt
├── .gitignore
├── package.json
└── README.md
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/chaithanyapradeep6082/accesspath-accessibility-assistance.git
cd accesspath_accessibility_assistance
```

### 2. Set up the frontend

Install the dependencies:

```bash
npm install
```

Start the development server using the script configured in `package.json`:

```bash
npm run dev
```

### 3. Set up the backend

Open a separate terminal:

```bash
cd backend
python -m venv .venv
```

Activate the environment on Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the backend dependencies:

```bash
python -m pip install -r requirements.txt
```

Start the Flask server using the entry point and command configured by the backend team.

### 4. Configure the API

The frontend defaults to:

```text
http://127.0.0.1:5000
```

To override it, create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://127.0.0.1:5000
```

Restart the Vite server after changing environment variables.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Backend health check |
| GET | `/api/scholarships` | Retrieve scholarship records |
| POST | `/api/eligibility` | Evaluate eligibility |
| POST | `/api/ask` | Ask the rule-based assistant |

Endpoints are subject to implementation by the team.

## Accessibility Goals

The project aims to support:

- Keyboard navigation
- Clear focus indicators
- Semantic HTML and meaningful labels
- Screen-reader-friendly status and error messages
- Readable layouts and chart alternatives
- Optional speech-based interaction

These are development goals, not a claim of formal accessibility certification or standards compliance.

## Data Disclaimer

Scholarship records used in the prototype are illustrative demonstration data. They must not be treated as verified current scholarships or used to make real application decisions.

## Team Workflow

- Work primarily in your assigned files.
- Create a feature branch for your changes.
- Commit related changes with descriptive messages.
- Push your branch and open a pull request for review.
- Coordinate shared files and API contracts before integration.

## Standards Reference

The team is using BIS IS 17802 (Part 1):2021, Accessibility for ICT Products and Services — Requirements, as a reference for accessibility considerations. Verify the applicable edition and amendments before making any standards-related claims. WCAG may be used as complementary guidance.

## Project Status

Hackathon prototype under development.
