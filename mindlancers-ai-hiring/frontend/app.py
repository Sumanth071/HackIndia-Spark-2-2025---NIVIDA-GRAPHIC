import streamlit as st
import requests

st.title("🧠 AI-Powered Hiring Platform")

# Freelancer Matching
st.header("🔍 Find Best Freelancers")
job_desc = st.text_area("Enter Job Description")
if st.button("Find Match"):
    response = requests.get("http://127.0.0.1:8000/match_freelancers/", params={"job_description": job_desc})
    freelancers = response.json()["freelancers"]
    for f in freelancers:
        st.write(f"✅ {f['name']} - {f['skills']} ({f['score']*100:.0f}% match)")

# AI Chatbot
st.header("💬 AI Chatbot")
query = st.text_input("Ask me anything...")
if st.button("Ask"):
    response = requests.get("http://127.0.0.1:8000/chat/", params={"query": query})
    st.write("🤖 AI:", response.json()["response"])

# Interview Questions
st.header("🎯 AI Interview Assistance")
job_role = st.selectbox("Select Job Role", ["Full-Stack Developer", "Machine Learning Engineer"])
if st.button("Generate Questions"):
    response = requests.get("http://127.0.0.1:8000/interview_questions/", params={"role": job_role})
    for q in response.json()["questions"]:
        st.write("📝", q)

# Resume Analysis
st.header("📄 Resume Analysis")
resume_text = st.text_area("Paste Resume Content Here")
if st.button("Analyze Resume"):
    response = requests.post("http://127.0.0.1:8000/analyze_resume/", json={"text": resume_text})
    st.write("🔍 Extracted Keywords:", ", ".join(response.json()["keywords"]))
