from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpRequest, HttpResponse
from glofapi.models import GLOFattributes
from glofapi.serializers import GLOFSerializer

# Create your views here.
@api_view(['GET'])
def get_other_data(request:HttpRequest) -> Response:
    """
    Expected JSON data(raw JSON data/form data)
    """
    if request.method == 'GET':
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')
        glofs = GLOFattributes.objects.filter(latitude=latitude, longitude=longitude)
        if glofs.exists():
            serializer = GLOFSerializer(glofs, many=True)
            return Response({
                'data': serializer.data
            })
        return Response({
            'message': f'No data available for latitude = {latitude} and longitude = {longitude}'
        })
    return Response({
        'message': f'Only GET request is allowed but got {request.method}.'
    })

def home(request:HttpRequest) -> HttpResponse:
    return HttpResponse({
        '<h1>HELLO</h1>'
    })