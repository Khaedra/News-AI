from django.core.management.base import BaseCommand
import requests
from django.conf import settings
from dotenv import load_dotenv
import os
load_dotenv()


class Command(BaseCommand):
    help = 'Test Guardian API connection'

    def handle(self, *args, **options):
        params = {
            'api-key': os.getenv("GUARDIAN_API_KEY"),
            'section': 'world',
            'show-fields': 'headline,trailText,bodyText,byline,wordcount',
            'page-size': 3,
            'order-by': 'newest',
        }
        
        try:
            response = requests.get('https://content.guardianapis.com/search', params=params)
            data = response.json()
          
            
            if data['response']['status'] == 'ok':
                self.stdout.write(self.style.SUCCESS(f"Total results: {data['response']['total']}\n"))
                for article in data['response']['results']:
                    self.stdout.write(f"Title: {article['webTitle']}")
                    self.stdout.write(f"Section: {article['sectionName']}")
                    self.stdout.write(f"URL: {article['webUrl']}")
                    self.stdout.write(f"Fields: {article.get('fields', {})}\n")
                    self.stdout.write('-' * 80 + '\n')
            else:
                self.stdout.write(self.style.ERROR(f"Error: {data['response']['status']}"))
                
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error making request: {str(e)}"))