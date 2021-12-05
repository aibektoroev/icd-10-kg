from django.contrib import admin

from mkb.models import Alphabet, AlphabetCategory, AlphabetGroup, MKBRecord

# Register your models here.
admin.site.register(MKBRecord)

admin.site.register(AlphabetCategory)

admin.site.register(AlphabetGroup)

admin.site.register(Alphabet)
