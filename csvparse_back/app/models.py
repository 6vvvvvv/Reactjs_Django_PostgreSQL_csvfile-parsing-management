from django.db import models

# Create your models here.
class Table(models.Model):
    date=models.CharField(max_length=20)
    description=models.CharField(max_length=100)
    total=models.CharField(max_length=20)

    def __str__(self):
        return self.date+" "+self.description + " "+ self.total