from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import HttpRequest, HttpResponse
from glofapi.models import GLOFattributes
from glofapi.serializers import GLOFSerializer

# Create your views here.
@api_view(['POST'])
def get_other_data(request:HttpRequest) -> Response:
    """
    Query parameters: latitude and longitude
    """
    if request.method == 'POST':
        latitude = request.data.get('latitude', None)
        longitude = request.data.get('longitude', None)
        if latitude is None or longitude is None:
            return Response({
                'message': f'Latitude and longitude cannot be None.'
            })
        glofs = GLOFattributes.objects.filter(latitude=str(latitude).strip(), longitude=str(longitude).strip())
        if glofs.exists():
            serializer = GLOFSerializer(glofs, many=True)
            return Response({
                'data': serializer.data
            })
        return Response({
            'message': f'No data available for latitude = {latitude} and longitude = {longitude}'
        })
    return Response({
        'message': f'Only POST request is allowed but got {request.method}.'
    })

def home(request:HttpRequest) -> HttpResponse:
    return HttpResponse('<h1>HELLO</h1>')