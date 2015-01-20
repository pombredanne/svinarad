from django.conf import settings
from django.conf.urls import patterns, include, url
from django.contrib import admin


urlpatterns = patterns('',
	url(r'^admin/', include(admin.site.urls)),
  url(r'^accounts/', include('allauth.urls')),
)

urlpatterns += patterns('',    
	url(r'^api-auth/', include('rest_framework.urls',
							namespace='rest_framework')),
	url(r'^docs/', include('rest_framework_swagger.urls')),
)

if settings.DEBUG:
   # static files (images, css, javascript, etc.)
   urlpatterns += patterns('',
       (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
       'document_root': settings.MEDIA_ROOT}))
