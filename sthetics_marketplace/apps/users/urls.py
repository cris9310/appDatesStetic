from django.urls import path
from .views import *

urlpatterns=[
    path('register/client/', RegisterClientView.as_view(), name='register-client'),
    path('register/professional/', RegisterProfessionalView.as_view(), name='register-professional'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile/update/', UpdateProfileView.as_view(), name='profile-update'),
    path('password/change/', ChangePasswordView.as_view(), name='password-change'),
    path('delete/', DeleteAccountView.as_view(), name='account-delete'),
    path('professionals/', ProfessionalListView.as_view(), name='professional-list'),
    path('professionals/<int:id>/', ProfessionalDetailView.as_view(), name='professional-detail'),



]