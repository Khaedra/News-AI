from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

class AISummarizer:
    def __init__(self):
        self.client = OpenAI(api_key = os.getenv('OPENAI_API_KEY'))
        
    def summarize(self, data):
        completion = self.client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a professional concice unbiased news summarizer. Given the following articles, use clues to determine and filter which articles and topics are currently the most important, relevant, and pressing. Choose around 5 articles. Then, generate a very concise summary of the most important news from each article, 2-3 sentences each. Make sure the summary is easy to understand and assume the reader has very little knowledge about the topic "}, # the system's role, how they are to act
                {
                    "role": "user", "content": f"""Please synthesize these news articles into a brief summary:
                    {data}
                    
                    Provide:
                    1. A 2-3 sentence overview
                    2. 3-4 key takeaways
                    3. Brief context for complex topics"""
                }
            ]
        )
        return completion.choices[0].message.content
        


