from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, fetch_world_news  # Import both ViewSet and view function

router = DefaultRouter()
router.register('articles', ArticleViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Include the router URLs
    path('news/world', fetch_world_news, name='fetch_world_news'),
]