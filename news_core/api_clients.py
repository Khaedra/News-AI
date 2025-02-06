import requests
from datetime import datetime, timedelta
from django.conf import settings
from .models import Article
from dotenv import load_dotenv
import os
from django.utils import timezone
from urllib.parse import urlencode
import requests

load_dotenv()

class GuardianAPI:
    def __init__(self):
        self.api_key = os.getenv('GUARDIAN_API_KEY')
        self.base_url = "https://content.guardianapis.com" 
        
    def get_headlines(self, section, page_size=25):
        
        params = {
            # 'q': section,
            'api-key': self.api_key,
            'show-fields': 'bodyText,headline,trailText,byline,wordcount',  
            'page-size': page_size,
            'order-by': "newest",
            'lang': 'en',
            
            
        }
        if section == "environment":
            params['tag'] = (
                "environment/climate-change|"
                "environment/pollution|"
                "environment/recycling|"
                "environment/energy|"
                "environment/conservation"
            )
        elif section == "tech":
            params['tag'] = (
                "technology/artificial-intelligence|"
                "technology/internet|"
                "technology/cryptocurrencies|"
                "technology/apple|"
                "technology/google|"
                "technology/microsoft"
            )
        elif section == "world":
            params['tag'] = (
                "world/canada|"
                "world/us-news|"
                "world/europe-news|"
                "world/china|"
                "world/middleeast|"
                "world/global-development"
            )

        # if section:
        #     params['section'] = section  # Correct parameter for filtering by section
        # if tag:
        #     params['tag'] = tag  # Filters articles based on tags

        return self._make_request('search', params)


    def _make_request(self, endpoint, params):
        try: 
            url = f"{self.base_url}/{endpoint}"
            
            full_url = f"{url}?{urlencode(params)}"
            print("Requesting URL:", full_url) 
            response = requests.get(url, params = params)
            
            response.raise_for_status()
            return response.json()['response']['results']
        except Exception as e:
            print(f"Error in making request to {endpoint}: {e}")
            return []
    
    def save_articles_to_db(self, articles, section):
        saved_articles = []
        for article in articles:
           
            try:
                # Convert wordcount to float, defaulting to 0 if not present or invalid
                wordcount = float(article['fields'].get('wordcount', 0))
                naive_datetime = datetime.strptime(article['webPublicationDate'], '%Y-%m-%dT%H:%M:%SZ') #converting naive dattime to aware
                aware_datetime = timezone.make_aware(naive_datetime);
                
                article_obj, created = Article.objects.update_or_create(
                    source_url=article['webUrl'],
                    defaults={
                        'title': article['webTitle'],
                        'section': section,
                        'content': article['fields'].get('bodyText', ''), 
                        'published_date': aware_datetime,
                        'wordcount': wordcount,
                        'apiUrl': article['apiUrl'],
                    }
                )
                saved_articles.append(article_obj)
            except Exception as e:
                print(f"Error saving article {article['webUrl']}: {e}")
        return saved_articles
            
        
            
            
        
    
                  
        
         
        
        
        