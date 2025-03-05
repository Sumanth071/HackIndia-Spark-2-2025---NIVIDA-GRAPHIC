import openai

openai.api_key = ""

def chat_with_ai(query):
    response = openai.ChatCompletion.create(
        model="gpt-4o mini",
        messages=[{"role": "system", "content": "You are an AI hiring assistant."},
                  {"role": "user", "content": query}]
    )
    return response["choices"][0]["message"]["content"]
