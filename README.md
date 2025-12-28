# 🏡 House Price Prediction

A full-stack machine learning web application that predicts house values using real estate data and AI regression models. The system helps users estimate property prices based on features like location, number of rooms, population, and proximity to the ocean.

---

## 📌 Overview

This project leverages machine learning and data preprocessing pipelines to analyze property characteristics and demographic information to estimate the median value of a house. The backend is powered by FastAPI and serves predictions to a modern Next.js frontend in real time.

---

## 🎯 Objective

To build a predictive system that can:

- Analyze housing data and location features
- Estimate median house prices accurately
- Provide a user-friendly interface for users to input values and receive instant predictions

---

## ⚙️ Tools & Technologies

### 🧠 Backend
- Python
- FastAPI
- Scikit-learn
- RandomForestRegressor
- LinearRegression
- Joblib
- Pandas, NumPy, Matplotlib, Seaborn

### 💻 Frontend
- Next.js (React)
- HTML5 + CSS3 + Tailwind CSS
- Responsive form & animated result banner

### 🧪 Development
- Visual Studio Code
- REST API via Uvicorn
- Deployment-ready architecture

---

## 📊 Features

- Predicts house prices using regression models
- Inputs include:
    - Geographic coordinates (longitude, latitude)
    - Median income
    - Total rooms and bedrooms
    - Population, households, and housing age
    - Ocean proximity

- ⚙️ Supports multiple regression algorithms:
  - Linear Regression
  - Decision Tree
  - Random Forest
  - Tuned Random Forest with GridSearchCV

- 📈 Model Evaluation Metrics:
  - R² Score (Accuracy)
  - Mean Squared Error

- 🎯 Visual insights:
  - Heatmaps
  - Distribution histograms
  - Geographic scatter plots

---

## 🔄 Process Flow

### 🔹 Data Preprocessing
- Handled missing values
- Applied log transformations for skewed data
- One-hot encoded the `ocean_proximity` categorical feature
- Engineered new features:
  - `bedroom_ratio`
  - `household_rooms`

### 🔹 Model Development
- Split dataset into training and testing sets
- Trained and evaluated multiple models
- Used `GridSearchCV` to optimize hyperparameters
- Exported best model and scaler using `joblib`

### 🔹 Model Evaluation
- Linear Regression R² Score: `0.66`
- Random Forest Regressor R² Score: `0.81`
- GridSearch-Tuned RF Regressor R² Score: `0.78`

### 🔹 API & Frontend Integration
- FastAPI exposes `/predict` endpoint
- Next.js frontend sends user input via JSON
- Predicted value is rendered on a green animated banner

---

## 🚀 How to Run the Project

### ✅ Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

```

✅ Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev

```

## 📝 Summary 

The House Price Prediction project demonstrates how machine learning and data analytics can be applied to real-world real estate problems.
It delivers a practical and interactive solution for estimating property values, combining robust ML models with a modern full-stack implementation.

Demo - https://github.com/user-attachments/assets/0b4f9565-dc31-4093-910d-a1f8c84363d8
