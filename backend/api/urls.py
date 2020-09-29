from django.urls import path
from django.conf.urls import include
from rest_framework import routers
from api.views import UserViewSet, ManageUserView, TodoViewSet

router = routers.DefaultRouter()
router.register('users',UserViewSet)
router.register('todolist',TodoViewSet)

urlpatterns = [
    path('myself/',ManageUserView.as_view( ), name='myself'),
    path('',include(router.urls)),
]
