from rest_framework import serializers
from .models import MKBRecord


class MKBRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MKBRecord
        fields = '__all__'


class MKBSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = MKBRecord
        fields = ['id', 'mkb_code', 'title']