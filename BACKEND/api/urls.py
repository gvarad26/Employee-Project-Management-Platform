from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register('project',ProjectViewSet,basename='project')
router.register('projectmanager',ProjectManagerViewSet,basename='projectmanager')
router.register('employees',EmployeesViewSet,basename='employees')
urlpatterns = router.urls

# urlpatterns=[
#     path('',home)
# ]
