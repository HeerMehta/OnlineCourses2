from rest_framework import serializers
from .models import Course, Organization

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'course_name', 'price', 'duration', 'organization', 'description')



class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ('id', 'org_name', 'contact', 'email')