from django.contrib import admin
from django.urls import path, include
from mkb import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'filterbyparent', views.FilterByParent, 'filtered')
router.register(r'getparentbycode', views.ParentByCode, 'parent')
router.register(r'records', views.RecordsViewSet, 'record')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/livesearch/', views.LiveSearchView.as_view(), name='rearchresults')
]
