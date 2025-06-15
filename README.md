# Employee-Project-Management-Platform

# Django React Project

This is a full-stack web application built using Django (Backend) and React (Frontend). It provides a simple setup for learning and extending a modern web application using RESTful APIs and component-based frontend design.

---

## 📁 Project Structure


Django React Tutorial/
├── BACKEND/                 # Django backend
│   ├── api/                 # Django app with models, views, serializers
│   ├── db.sqlite3          # SQLite database
│   └── manage.py           # Django management script
├── FRONTEND/                # React frontend
│   ├── public/             # Public files
│   └── src/                # Source code with components, pages, and API calls


---

## 🚀 Features

### Backend (Django):

* REST API using Django REST Framework
* Models for managing employees and projects
* Serializers for data transformation
* Views and routers for API endpoints

### Frontend (React):

* Form handling and state management using React Hooks
* Fetching data from Django APIs
* UI components for CRUD operations

---

## ⚙ Getting Started

### Prerequisites

* Python 3.10+
* Node.js and npm

### Backend Setup

bash
cd BACKEND
python -m virtualenv venv
venv/scripts/activate
python manage.py migrate
python manage.py runserver


### Frontend Setup

bash
cd FRONTEND
npm install
npm run dev


---

## 🔄 API Endpoints (Sample)

* GET /api/employees/ - List all employees
* POST /api/projects/ - Create a new project

(Refer to api/urls.py and api/views.py for full API list)

---

## 🛠 Technologies Used

* *Backend*: Django, Django REST Framework
* *Frontend*: React, JavaScript, Axios, Material UI

---

## 🙋‍♂ Author

Varad Gorantyal

---

## 📬 Contact

For any questions or feedback, feel free to reach out!