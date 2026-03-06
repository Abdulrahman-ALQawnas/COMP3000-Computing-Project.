import random
import re

def scan_url(url):
    # Simple phishing keyword check
    suspicious_keywords = ["login", "verify", "bank", "secure"]

    for word in suspicious_keywords:
        if word in url.lower():
            return {
                "url": url,
                "status": "Dangerous",
                "risk_score": random.randint(70, 95)
            }

    return {
        "url": url,
        "status": "Safe",
        "risk_score": random.randint(0, 40)
    }


def scan_file(file):
    filename = file.filename

    suspicious_extensions = [".exe", ".bat", ".js"]

    for ext in suspicious_extensions:
        if filename.endswith(ext):
            return {
                "file": filename,
                "status": "Malicious",
                "risk_score": random.randint(75, 98)
            }

    return {
        "file": filename,
        "status": "Clean",
        "risk_score": random.randint(5, 30)
    }

def scan_email(email_content):
    phishing_keywords = [
        "urgent",
        "verify your account",
        "bank",
        "password",
        "click here",
        "login immediately",
        "suspended",
        "security alert"
    ]

    suspicious_score = 0

    content_lower = email_content.lower()

    for keyword in phishing_keywords:
        if keyword in content_lower:
            suspicious_score += 15

    # Check for suspicious links
    urls = re.findall(r'(https?://\S+)', email_content)
    if len(urls) > 0:
        suspicious_score += 20

    # Cap risk score
    risk_score = min(suspicious_score + random.randint(5, 20), 100)

    if risk_score > 60:
        status = "Phishing"
    elif risk_score > 30:
        status = "Suspicious"
    else:
        status = "Safe"

    return {
        "status": status,
        "risk_score": risk_score,
        "detected_links": urls
    }