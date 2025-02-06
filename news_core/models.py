from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    source_url = models.URLField()
    published_date = models.DateTimeField()
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    section = models.TextField()

    def __str__(self):
        return self.title
# Create your models here.
