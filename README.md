# SQA Automation Assessment

This repository contains UI and API automation testing
implemented for the SQA Automation Assessment.

## Technologies

- Playwright
- JavaScript
- Postman
- Newman
- HTML Report

---

# UI Automation

## Installation

Navigate to the UI automation directory:

cd ui-automation

Install dependencies:

npm install

## Q1 - Locked Out User

npx playwright test tests/locked-out.spec.js

## Q2 - Standard User

npx playwright test tests/standard-user.spec.js

## Q3 - Performance Glitch User

npx playwright test tests/performance-glitch.spec.js

## Run All Three Sequentially

npx playwright test tests/locked-out.spec.js tests/standard-user.spec.js tests/performance-glitch.spec.js

## HTML Report

After execution:

npx playwright show-report --port 9324

---

# API Automation

Navigate to:

cd api-automation

## Newman Installation

npm install -g newman

## Run API Collection

newman run ".\collections\ReqRes_API_Automation_Assessment.postman_collection.json" --env-var "base_url=https://reqres.in" --env-var "api_key=YOUR_API_KEY"

## API Coverage

- Q3 - Login + authToken capture
- Q4 - GET User
- Q5 - PUT Update User
- Q6 - PATCH User
- Q8 - Bad Request Validation

## Response Code Validation

Every API request validates its HTTP response status code.

## Security

The real API key is not stored in this public repository.
