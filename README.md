# xrwvm-fullstack_developer_capstone - Final Project

## Project Overview
This project is a full-stack web application developed for **Cars Dealership**, a national car retailer in the United States. The application allows users to browse nationwide dealership branches, filter by state, view reviews, register/login, and post feedback with automated sentiment analysis.

---

## Tech Stack & Architecture

- **Frontend:** React, HTML5, CSS3, JavaScript (ES6+), Bootstrap
- **Backend Framework:** Django (Python), Node.js / Express (Microservices), Flask (Sentiment Analyzer)
- **Databases:** SQLite (Django default models), MongoDB (Dealerships & Reviews)
- **DevOps & CI/CD:** Docker, Kubernetes, GitHub Actions, IBM Cloud Code Engine

---

## Main Features & Application Endpoints

* **User Authentication:** User registration, login, and logout functionalities.
* **Dealership Directory:** Browse all dealers and filter dealers by state (e.g., Kansas).
* **Reviews System:** View customer reviews per dealer and submit new reviews.
* **Microservices Integration:**
  * Node.js microservice connected to MongoDB for dealership and review data.
  * Flask microservice providing Watson/NLTK sentiment analysis on submitted reviews.

---

## File Structure Highlights

```text
.
├── server/
│   ├── frontend/
│   │   ├── static/          # HTML pages (About.html, Contact.html) and assets
│   │   └── src/             # React components (Register.jsx, Dealers, Reviews)
│   ├── djangoapp/           # Django app logic, models, views, and urls
│   └── djangoproj/          # Django project settings
├── .github/workflows/       # GitHub Actions CI/CD workflows
└── README.md
