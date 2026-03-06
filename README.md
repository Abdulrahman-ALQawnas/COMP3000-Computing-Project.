...
# Name: Abdulrahman ALQawnas
# Student ID: 10876191
# Supervisor: Vasilios Kelefouras
...

# AI SafeNet – Intelligent Security Threat Analysis Platform
...

With the rapid growth of digital communication, individuals and small businesses face increasing exposure to cybersecurity risks such as phishing emails, malicious URLs, and suspicious files. Most existing cybersecurity solutions are either too technical or too expensive for non-experts. AI SafeNet aims to bridge this gap by providing a lightweight, intelligent, and userfriendly platform that analyzes potential security threats using artificial intelligence and automated threat-detection tools

AiSafeNet is a web-based cybersecurity tool designed to detect potential threats in URLs, files, and emails. The system helps users identify phishing attempts, suspicious links, and potentially malicious files using a lightweight analysis engine.

This project was developed as part of a computing/security project to demonstrate how web applications can help improve online safety by analyzing user-provided inputs.

...

# Problem statement 

Cyber threats are becoming more sophisticated, making it difficult for non-technical
users to identify attacks such as:

* Phishing emails designed to steal credentials.
* Malicious links that lead to malware or fake login pages
* Suspicious file hashes used as malware signatures
* Abnormal user behavior indicating compromise
  
...

# Features

## 🌐 URL Scanning

Detects suspicious or phishing-related patterns in URLs.

Assigns a risk score based on detected indicators.

## 📧 Email Scanning

Analyzes email content for phishing keywords.

Detects suspicious links embedded in the email body.

## 📁 File Scanning

Evaluates uploaded files based on extension and simple heuristics.

Flags potentially dangerous file types.

## 🔐 User Authentication

User registration and login system.

Passwords securely hashed using bcrypt.

## 🛡 Security-Oriented Design

Content Security Policy (CSP) compatible frontend.

Protection against common XSS injection patterns.

... 

# 🏗 System Architecture

AiSafeNet uses a client-server architecture:

## Frontend:

HTML

CSS

JavaScript (Event-driven, CSP-compliant)

## Backend:

Python

Flask API

## Database:

* SQLite

User
 │
 ▼
Frontend (HTML + JavaScript)
 │
 ▼
Flask API (Python Backend)
 │
 ▼
Scanning Engine (URL / Email / File)
 │
 ▼
Response with Risk Score

...

📂 Project Structure
``` 
AiSafeNet │ ├── backend │ ├── app.py │ ├── scanner.py │ └── database.db │ ├── frontend │ ├── login.html │ ├── register.html │ ├── dashboard.html │ ├── url-scan.html │ ├── file-scan.html │ ├── email-scan.html │ └── script.js │ └── README.md

```
---
## ⚙ Installation
### 1️⃣ Clone the repository 
```
git clone https://github.com/Abdulrahman-ALQawnas/COMP3000-Computing-Project.git

```

```
cd AiSafeNet
```
 ---
 ### 2️⃣ Install dependencies 
 ```
 pip install flask flask-cors flask-bcrypt
```
 ---
 ### 3️⃣ Run the backend server
 ``` 
 python app.py
 ```
The API will run at:
```
http://127.0.0.1:5000
```
--- 
### 4️⃣ Open the frontend
Open the HTML pages inside the **frontend folder** in your browser. 
Example:
``` 
frontend/login.html
```
 ---
 ## 🔎 API Endpoints
 ### Register User POST `/register` 
 Example request: 
 ```
 { "username": "user1", "email": "user@email.com", "password": "password123" }
```
 ---
 ### Login User POST `/login` 
 ``` 
 { "email": "user@email.com", "password": "password123" }
 ```
 ---
 ### URL Scan POST `/scan-url` 
 ```
 { "url": "https://example.com" }
 ```
 ---
 ### Email Scan POST `/scan-email`
 ```
 { "email": "email content here" }
```
---
### File Scan POST `/scan-file`
Multipart file upload.
---
## 🧪 Example Test Inputs
### Email Phishing Example 
```
URGENT: Your bank account has been suspended. Click here immediately to verify your password: http://secure-login-verification.com
 ```
 --- 
 ### Suspicious URL 
 ``` http://bank-login-verification-update.com ```
 ---
 ### Suspicious File 
 ```
 update_security.exe
```
 ---
 
 ## 🔒 Security Considerations 
 AiSafeNet was designed with several security practices: - No use of `eval()` or unsafe JavaScript execution - Event-driven JavaScript using `addEventListener` - DOM updates using `textContent` instead of `innerHTML` - Password hashing using bcrypt - Compatible with strict Content Security Policy (CSP) 
 
 ---
 
 ## 🚀 Future Improvements 
 1.  Machine learning phishing detection
 2.  Integration with VirusTotal API
 3.  Scan history for users
 4.  Dashboard analytics
 5.  JWT authentication
 6.  Real-time threat intelligence feeds

 ---
 
    ## 👩‍💻 This project developed as a cybersecurity and web application project.
    
 ---
    ## 📄 License This project is for educational and research purposes.
    
    --- 
    If you want, I can also help you create:
    - ⭐ **a better GitHub repo structure** 
    - ⭐ **a professional project description for GitHub**
    - ⭐ **screenshots section for README** 
    - ⭐ **badges (Python, Flask, Security, License)**
    - ⭐ **a GitHub portfolio-level README that looks very professional**.
  
