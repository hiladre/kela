# Automation Project - Homework Assignment

## What You Need to Install

### 1. Node.js (for the app)
- Version 18 or higher
- [Download](https://nodejs.org)

### 2. Python (for running sample tests)
- Version 3.8 or higher
- Usually pre-installed on macOS/Linux. Check: `python3 --version`

### 3. Run the App

```bash
npm install
npm run dev
```

The app will open at http://localhost:5173

### 4. Run the Sample Test (optional)

Create a virtual environment and install dependencies:

```bash
python3 -m venv .venv
source .venv/bin/activate    # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
playwright install chromium
```

Run the test (make sure the app is running first):

```bash
source .venv/bin/activate
python tests/test_login.py
```
