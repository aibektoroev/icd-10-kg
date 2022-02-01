from rest_framework import serializers
from .models import Alphabet, AlphabetCategory, AlphabetGroup, Chemicals, MKBRecord


class MKBRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MKBRecord
        fields = '__all__'


class MKBSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = MKBRecord
        fields = ['id', 'mkb_code', 'sign', 'title']


class AlphabetCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AlphabetCategory
        fields = '__all__'


class AlphabetGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlphabetGroup
        fields = '__all__'


class AlphabetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alphabet
        fields = '__all__'


class ChemicalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chemicals
        fields = '__all__'