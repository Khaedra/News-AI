from .models import Article

class Filter:
    MAX_AGE_DAYS = 3
    MAX_ARTICLES = 30
    
    @classmethod
    def maintain_section_limit(cls, section):
        article_ids = Article.objects.filter(section=section)\
        .order_by('-published_date')\
        .values_list('id', flat=True)[15:]  # Get IDs instead of slicing a queryset

        if article_ids:  # Only delete if there are IDs to delete
            Article.objects.filter(id__in=article_ids).delete()




    
    
    
    