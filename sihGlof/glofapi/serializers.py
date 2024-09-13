from rest_framework import serializers
from glofapi.models import GLOFattributes

class GLOFSerializer(serializers.ModelSerializer):
    class Meta:
        model = GLOFattributes
        fields = '__all__'