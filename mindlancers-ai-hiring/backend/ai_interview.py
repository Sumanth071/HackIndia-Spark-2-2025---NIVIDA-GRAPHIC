def generate_interview_questions(role):
    questions = {
        "Full-Stack Developer": [
            "Can you explain the difference between client-side and server-side rendering?",
            "How do you manage state in a React application?",
            "Describe your experience with backend technologies like Node.js and Django."
        ],
        "Machine Learning Engineer": [
            "What is overfitting, and how do you prevent it?",
            "Explain the difference between supervised and unsupervised learning.",
            "What is a confusion matrix in classification models?"
        ]
    }
    return questions.get(role, ["What relevant experience do you have?"])
