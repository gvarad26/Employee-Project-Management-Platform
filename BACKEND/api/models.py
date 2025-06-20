from django.db import models

# Create your models here.
class ProjectManager(models.Model):
    name=models.CharField(unique=True,max_length=100)
    created=models.DateTimeField(auto_now_add=True)
    modified=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name 

class Employees(models.Model):
    name=models.CharField(unique=True,max_length=100)
    created=models.DateTimeField(auto_now_add=True)
    modified=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name 

class Project(models.Model):
    name=models.CharField(unique=True,max_length=100)
    employees=models.ManyToManyField(Employees)
    projectmanager = models.ForeignKey(ProjectManager,on_delete=models.CASCADE,blank=True,null=True)
    start_date = models.DateField()
    end_date =models.DateField()
    comments=models.CharField(max_length=100,blank=True,null=True)
    status=models.CharField(max_length=100)
    created=models.DateTimeField(auto_now_add=True)
    modified=models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name 


