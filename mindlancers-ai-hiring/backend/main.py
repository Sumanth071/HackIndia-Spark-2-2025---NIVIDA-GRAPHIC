from fastapi import FastAPI
from ai_matcher import find_best_freelancers
from ai_chatbot import chat_with_ai
from ai_interview import generate_interview_questions
from ai_resume import analyze_resume

app = FastAPI()

@app.get("/match_freelancers/")
def match_freelancers(job_description: str):
    return {"freelancers": find_best_freelancers(job_description)}

@app.get("/chat/")
def chat(query: str):
    return {"response": chat_with_ai(query)}

@app.get("/interview_questions/")
def interview_questions(role: str):
    return {"questions": generate_interview_questions(role)}

@app.post("/analyze_resume/")
def analyze_resume(text: str):
    return {"keywords": analyze_resume(text)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
