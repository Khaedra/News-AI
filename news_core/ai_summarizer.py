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
                {"role": "system", "content": "You are a professional concice unbiased news summarizer. Given the following articles, use clues to determine and filter which articles and topics are currently the most important, relevant, and pressing. Choose 5 of the most important articles. Then, generate a very concise summary of the most important news from each article, around 5 sentences each. Make sure the summary is easy to understand, uses simple language, and assume the reader has very little knowledge about the topic "}, # the system's role, how they are to act
                {
                    "role": "user", "content": f"""You are a professional concice unbiased news summarizer. Given the following articles, use clues to determine and filter which articles and topics are currently the most important, relevant, and pressing. Choose 5 of the most important articles. Then, generate a very concise summary of the most important news from each article, around 5 sentences each. Make sure the summary is easy to understand, uses simple language, and assume the reader has very little knowledge about the topic. Please synthesize these news articles into a valid JSON file with the following format. There should be 6 keys, "overview", "article_1", "article_2", "article_3", "article_4", "article_5". The data in the overview key should include a 5 sentence overview of the most important topics happening today, give a wide breadth without too many details that will inform the reader about the most pressing matters happening. For the other 5 keys data, it should be a javacript object containing a summary property which is a 5 sentence summary of one of the 5 chosen articles from earlier. There should also be a link property which includes the link from which the article was from. There should be a title property, which specifies the title of the article. Lastly, there should be an image property, which includes the thumbnail image of the article
                    {data}
                    
                    
                    
                    
                  """
                }
            ]
        )
        return completion.choices[0].message.content
        


