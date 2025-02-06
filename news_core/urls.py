from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet, fetch_news  # Import both ViewSet and view function

router = DefaultRouter()
router.register('articles', ArticleViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Include the router URLs
    path('news/<str:section>', fetch_news, name='fetch_news'),
]