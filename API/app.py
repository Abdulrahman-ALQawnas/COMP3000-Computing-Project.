from flask import Flask, request, jsonify
from flask_cors import CORS
from scanner import scan_url, scan_file, scan_email

from flask_bcrypt import Bcrypt
import sqlite3

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Home route
@app.route("/")
def home():
    return jsonify({"message": "AiSafeNet API is running"})

# ---------------------------
# DATABASE SETUP
# ---------------------------

def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()

init_db()

# ---------------------------
# REGISTER API
# ---------------------------

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

    try:
        conn = sqlite3.connect("database.db")
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            (username, email, hashed_password)
        )
        conn.commit()
        conn.close()

        return jsonify({"message": "User registered successfully"})
    except sqlite3.IntegrityError:
        return jsonify({"error": "Username or email already exists"}), 400


# ---------------------------
# LOGIN API
# ---------------------------

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    conn.close()

    if user and bcrypt.check_password_hash(user[3], password):
        return jsonify({
            "message": "Login successful",
            "username": user[1]
        })
    else:
        return jsonify({"error": "Invalid email or password"}), 401


# URL Scan API
@app.route("/scan-url", methods=["POST"])
def url_scan():
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    result = scan_url(url)
    return jsonify(result)

# File Scan API
@app.route("/scan-file", methods=["POST"])
def file_scan():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    result = scan_file(file)
    return jsonify(result)
# Email Scan API
@app.route("/scan-email", methods=["POST"])
def email_scan():
    data = request.json
    email_content = data.get("email")

    if not email_content:
        return jsonify({"error": "No email content provided"}), 400

    result = scan_email(email_content)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)

