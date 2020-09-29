from django.db import models

# Create your models here.
#データベース設計
class Todo(models.Model):
    title = models.CharField(max_length=50)
    content = models.CharField(max_length=400)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
#タイトル名を返す関数
def __str__(self):
   return self.title