from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Article
from .serializers import ArticleSerializer
from .api_clients import GuardianAPI

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

@api_view(['GET'])  # Add this decorator
def fetch_world_news(request):  # Change parameter to request
    try: 
        guardian = GuardianAPI()
        articles = guardian.get_headlines_world()
        guardian.save_articles_to_db(articles)
        
        # Gets most recent 5 articles, ordered by published_date descending
        latest_articles = Article.objects.all().order_by('-published_date')[:5]
        
        # many=True tells the serializer to handle multiple objects
        serializer = ArticleSerializer(latest_articles, many=True)
        
        return Response({
            'status': 'success', 
            'articles': serializer.data
        })
    except Exception as e:
        return Response({
            'status': 'error', 
            'message': str(e)
        }, status=500)