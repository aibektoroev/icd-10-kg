from django.contrib import admin
from django.urls import path, include
from mkb import views
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = routers.DefaultRouter()
router.register(r'filterbyparent', views.FilterByParent, 'filtered')
router.register(r'getparentbycode', views.ParentByCode, 'parent')
router.register(r'records', views.RecordsViewSet, 'record')
router.register(r'alphabet_categories', views.AlphabetCategoryViewSet, 'alphabet_category')
router.register(r'alphabet_groups', views.AlphabetGroupViewSet, 'alphabet_group')
router.register(r'alphabets', views.AlphabetViewSet, 'alphabet')
router.register(r'chemicals', views.ChemicalsViewSet, 'chemicals')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/livesearch/', views.LiveSearchView.as_view(), name='rearchresults'),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', views.BlacklistTokenUpdateView.as_view(), name='blacklist')
]
