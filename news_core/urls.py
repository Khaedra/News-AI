from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet

router = DefaultRouter()
router.register('articles', ArticleViewSet)

urlpatterns = [
    path('news/world', views.fetch_world_news, name = 'fetch_world_news'),
]