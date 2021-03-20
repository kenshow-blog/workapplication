from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
import uuid
# Create your models here.


class Pdc(models.Model):

    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    userPdc = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userPdc')
    title = models.CharField(max_length=100)
    plan = models.CharField(max_length=400)
    do = models.CharField(max_length=400,null=True,blank=True)
    check = models.CharField(max_length=400,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Category(models.Model):
    item = models.CharField(max_length=100)

    def __str__(self):
        return self.item



class Action(models.Model):
    action = models.CharField(max_length=200, null=True,blank=True)
    pdca = models.ForeignKey(Pdc, on_delete=models.CASCADE, related_name="pdcs")
    action_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="action_user")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.action

