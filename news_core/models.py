from django.db import models
from django.utils import timezone

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    source_url = models.URLField()
    published_date = models.DateTimeField()
    apiUrl = models.TextField(default = "")
    created_at = models.DateTimeField(auto_now_add=True)
    section = models.TextField(default='uncategorized')
    wordcount = models.FloatField(default = 0)
    thumbnail = models.TextField(default = "")

    def __str__(self):
        return self.title

    @property #so you can say article.age instead of article.age()
    def age(self):
        return (timezone.now() - self.published_date).days
    
    class Meta: # a meta class has information on the model itself, not changing any fields. Rank in descending order 
        indexes = [models.Index(fields=['-published_date']),
                   ]
        
# Create your models here.
