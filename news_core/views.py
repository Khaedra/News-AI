from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Article
from .serializers import ArticleSerializer
from .api_clients import GuardianAPI
from .filter import Filter
from .ai_summarizer import AISummarizer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

@api_view(['GET'])  # Add this decorator
def fetch_news(request, section):  # Change parameter to request
    try: 
        guardian = GuardianAPI()
        ai = AISummarizer()
       
        articles = guardian.get_headlines(section) 
      
        print(f"Fetched {len(articles)} articles from Section: {section}")
        guardian.save_articles_to_db(articles, section)
        
        Filter.maintain_section_limit(section)
        # Article.objects.all().delete()
        # Gets most recent 5 articles, ordered by published_date descending
        latest_articles = Article.objects.all().filter(section = section).order_by('-published_date')[:15]
        
        # many=True tells the serializer to handle multiple objects
        serializer = ArticleSerializer(latest_articles, many=True)
        
        result = ai.summarize(serializer.data)
        
        return Response({
            'status': 'success', 
            'articles': serializer.data,  # being show in browser
            'response': result,
        })
    except Exception as e:
        return Response({
            'status': 'error', 
            'message': str(e)
        }, status=500)