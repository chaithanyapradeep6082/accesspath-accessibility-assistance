
# AccessPath — Accessible Digital Navigation Assistant

AccessPath is an accessibility-focused software prototype designed to help people with visual impairments navigate multi-step digital tasks and understand information presented through charts and tables.

The project focuses on making a scholarship application workflow easier to access through keyboard navigation, adjustable text sizes, high-contrast display options, speech output, simplified instructions, and progress preservation.

## Problem Statement

People with visual impairments may encounter barriers when using online application systems, including inaccessible controls, complex instructions, and data visualisations that are difficult to interpret with assistive technologies.

AccessPath aims to reduce these barriers through an accessible, guided scholarship application experience and a data assistant that explains scholarship eligibility information in a more understandable format.

## Objectives

- Provide an accessible, guided scholarship application workflow.
- Support keyboard-based navigation and clear focus indicators.
- Offer adjustable text sizes and high-contrast display options.
- Provide speech output for supported content using browser capabilities.
- Present scholarship information through charts and accessible tabular data.
- Answer predefined questions about scholarship data.
- Preserve application progress when users move between sections.
- Demonstrate accessibility considerations relevant to BIS standards.

## Key Features

- **Guided application:** A step-by-step scholarship application form with validation.
- **Accessibility controls:** Text-size adjustment and high-contrast mode.
- **Speech support:** Browser-based text-to-speech for supported information.
- **Scholarship explorer:** Charts and tabular representations of scholarship data.
- **Data assistant:** Rule-based answers to supported questions about scholarship eligibility and cutoffs.
- **Progress preservation:** Local storage to retain progress in the browser.
- **Eligibility assistance:** Rule-based checks using the available scholarship criteria.

> This is a hackathon prototype. Scholarship records are illustrative sample data, not official scholarship information. The prototype does not claim formal accessibility certification or full compliance with any standard.

## Standards and Guidelines

The project is being developed with reference to:

- **BIS IS 17802 (Part 1):2021 — Accessibility for ICT Products and Services: Requirements.** The applicable clauses, current edition, and amendments must be checked against the official BIS publication before claiming alignment.
- **W3C Web Content Accessibility Guidelines (WCAG):** A complementary reference for web accessibility practices, including keyboard accessibility, text alternatives, contrast, and understandable interfaces.

The prototype aims to demonstrate selected accessibility practices. It is not a substitute for a formal accessibility audit or conformance assessment.

## Technology Stack

### Frontend
- React
- Vite
- JavaScript
- HTML and CSS
- Chart.js and react-chartjs-2
- Browser Speech Synthesis API
- Browser localStorage

### Backend
- Python
- Flask
- Flask-CORS
- CSV-based scholarship data
- Rule-based eligibility calculations and question answering

No external cloud AI API is required for the planned rule-based assistant.

## Project Structure

```text
accesspath-accessibility-assistance/
├── public/
├── src/
│   ├── components/
│   │   ├── AccessibilityControls.jsx
│   │   ├── DataAssistant.jsx
│   │   ├── ProgressIndicator.jsx
│   │   ├── ScholarshipChart.jsx
│   │   └── ScholarshipForm.jsx
│   ├── data/
│   │   └── scholarships.csv
│   ├── hooks/
│   │   └── useSpeech.js
│   ├── utils/
│   │   ├── accessibilityChecks.js
│   │   └── scholarshipCalculations.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── data/
│   │   └── scholarships.csv
│   ├── routes/
│   └── services/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

Some directories and files may be added as implementation progresses.

## Prerequisites

Install the following before running the application:

- Node.js and npm
- Python 3.10 or later
- Git

## Frontend Setup

From the project root, install the dependencies:

```bash
npm install
npm install chart.js react-chartjs-2 papaparse
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:5173`.

## Backend Setup

Once the backend files have been created, open a separate terminal from the project root.

Create and activate a Python virtual environment.

**Windows PowerShell:**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install the backend dependencies:

```bash
pip install -r backend/requirements.txt
```

Start the Flask server:

```bash
python backend/app.py
```

The backend is expected to expose endpoints for health checks, scholarship retrieval, eligibility evaluation, and supported data questions. The endpoint implementation and frontend integration are part of the development process.

## Proposed API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check backend availability |
| GET | `/api/scholarships` | Retrieve scholarship records |
| POST | `/api/eligibility` | Evaluate eligibility against defined criteria |
| POST | `/api/ask` | Answer supported questions about the dataset |

These endpoints describe the planned API and should be treated as implemented only after they have been developed and tested.

## Testing and Accessibility Checks

The prototype should be tested for:

- Keyboard-only navigation.
- Visible keyboard focus.
- Meaningful labels and form validation messages.
- Readable contrast and adjustable text sizes.
- Speech output for supported content.
- Access to chart information through an equivalent table.
- Preservation of application progress between sections.
- Correct eligibility calculations and answers for known test cases.
- Usability with browser accessibility tools and, where possible, a screen reader.

## Limitations

- The scholarship dataset is fictional and intended for demonstration.
- The assistant uses predefined rules rather than a general-purpose AI model.
- Browser speech availability and voice quality may vary by browser and operating system.
- The prototype requires further usability testing and accessibility evaluation.
- No formal BIS or WCAG conformance is claimed.

## Future Enhancements

- Integration with verified scholarship datasets.
- Broader screen-reader testing.
- Improved multilingual speech support.
- More comprehensive accessibility testing.
- Additional guided workflows and configurable eligibility rules.

## Team

Developed as a student hackathon project under the theme **Software Solutions for People with Disabilities**.

## License

A license can be added once the team decides how the project will be shared and reused.
