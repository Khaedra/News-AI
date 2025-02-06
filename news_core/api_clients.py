import requests
from datetime import datetime, timedelta
from django.conf import settings
from .models import Article
from dotenv import load_dotenv
import os

load_dotenv()

class GuardianAPI:
    def __init__(self):
        self.api_key = os.getenv('GUARDIAN_API_KEY')
        self.base_url = "https://content.guardianapis.com" 
        
    def get_headlines_world(self, page_size = 3):
        params = {
                'api-key': self.api_key,
                'section': 'world', 
                'show-fields': 'body, headline, trailText, byline, wordcount',
                'page-size': page_size,
                'order-by': "newest",
                'lang': 'en',
        }
        return self._make_request('search', params)

    def _make_request(self, endpoint, params):
        try: 
            response = requests.get(f"{self.base_url}/{endpoint}", params = params)
            response.raise_for_status()
            return response.json()['response']['results']
        except Exception as e:
            print(f"Error in making request to {endpoint}: {e}")
            return []
    
    def save_articles_to_db(self, articles):
        for article in articles:
            Article.objects.get_or_create(
                source_url=article['webUrl'],  # Use source_url as unique identifier
                defaults={
                    'title': article['webTitle'],
                    'section': article['sectionId'],
                    'content': article['fields'].get('bodyText', ''),
                    'published_date': datetime.strptime(article['webPublicationDate'], '%Y-%m-%dT%H:%M:%SZ'),
                    'summary': article['fields'].get('trailText', '')
                }
            )
            
        
            
            
        
    
                  
        
         
        
        
        