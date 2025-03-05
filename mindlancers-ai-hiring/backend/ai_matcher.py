from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

# Sample freelancer profiles
freelancers = [
    {"name": "Alice", "skills": "Python, Machine Learning, Flask"},
    {"name": "Bob", "skills": "Python, Flask, Django"},
    {"name": "Charlie", "skills": "Java, Spring Boot, AI"}
]

def find_best_freelancers(job_description):
    vectorizer = TfidfVectorizer()
    corpus = [job_description] + [f["skills"] for f in freelancers]
    tfidf_matrix = vectorizer.fit_transform(corpus)

    similarity_scores = np.dot(tfidf_matrix[0].toarray(), tfidf_matrix[1:].toarray().T)[0]
    ranked_freelancers = sorted(zip(freelancers, similarity_scores), key=lambda x: x[1], reverse=True)
    
    return [{"name": f["name"], "skills": f["skills"], "score": round(score, 2)} for f, score in ranked_freelancers]
