from django.shortcuts import render

from courselist.models import Course, Organization
from rest_framework import viewsets
from .serializers import CourseSerializer, OrganizationSerializer

# Create your views here.

class CourseView(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()


class OrganizationView(viewsets.ModelViewSet):
    serializer_class = OrganizationSerializer
    queryset = Organization.objects.all()

def index(request):
    courses = Course.objects.all()
    context = {
        'courses': courses
    }
    return render(request, 'index.html', context=context)
