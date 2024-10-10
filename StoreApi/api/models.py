from django.db import models




class Product(models.Model):
    name = models.CharField(max_length=20)
    description = models.TextField(max_length=150, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=1, null=False)

    def __str__(self):
        return self.name
