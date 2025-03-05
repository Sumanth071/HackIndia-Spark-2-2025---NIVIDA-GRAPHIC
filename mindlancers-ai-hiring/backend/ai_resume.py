import re

def analyze_resume(text):
    keywords = re.findall(r'\b[A-Za-z]+\b', text)
    return list(set(keywords))
