from django.db import models

# Create your models here.
class Organization(models.Model):
    org_name = models.CharField(max_length=120, null=False)
    contact = models.IntegerField(max_length=15, default=0)
    email = models.CharField(max_length=200, default="Email Not Found")

    def __str__(self) -> str:
        return self.org_name


class Course(models.Model):
    course_name = models.CharField(max_length=200, null=False)
    price = models.IntegerField(max_length=5, default=0)
    duration = models.IntegerField(max_length=5, null=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    description = models.TextField(null=False)
