from django.shortcuts import render

from rest_framework import viewsets
from .models import Article
from .serializers import ArticleSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .api_clients import GuardianAPI
from .serializers import ArticleSerializer
from .models import Article

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


def fetch_world_news(link):
    try: 
        guardian = GuardianAPI()
        articles = guardian.get_headlines_world()
        guardian.save_articles_to_db(articles)
        
        latestArticles = Article.objects.all().order_by('-published_date')[:5] #gets most recent 5 im assuming?
        serializer = ArticleSerializer(latestArticles, many = True) #what does many = true do
        
        return Response({'status': 'success', 'articles': serializer.data}) #dictionary with 2 fields, status and articles, accessed in component
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=500)
        
    


