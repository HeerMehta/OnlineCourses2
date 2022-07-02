from django.contrib import admin

from courselist.models import Organization, Course
from import_export.admin import ImportExportModelAdmin

class CourseAdmin(ImportExportModelAdmin):
    pass

class OrgAdmin(ImportExportModelAdmin):
    pass

# Register your models here.
admin.site.register(Organization, OrgAdmin)
admin.site.register(Course, CourseAdmin)
