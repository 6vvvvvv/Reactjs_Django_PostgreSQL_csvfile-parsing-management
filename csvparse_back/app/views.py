from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .serializers import TableSerializer
from .models import Table
from rest_framework.decorators import api_view
import json
# from .models import Table
# Create your views here.

# test only
def Home(request):
    return HttpResponse("build success")


class TableView(generics.ListCreateAPIView):
    serializer_class = TableSerializer
    queryset = Table.objects.all()


@api_view(['POST'])
# @api_view(['POST,DELETE'])
def SaveToDB(request):
    # print("****************************************")
    serializer = TableSerializer(data=request.data)
    print("serializer**************", serializer)

    if serializer.is_valid():
        date1 = request.data['date']
        description1 = request.data['description']
        total1 = request.data['total']
        print("date*************", date1)
        # print("description*************", description1)
        # print("total*************", total1)

        user = Table.objects.filter(
            date=date1, description=description1, total=total1)
        # print('user**************', user)
    if request.method == 'POST':

        if user:
            # print("exist************************")
            return Response(data="user existed in database, please do not save again", status=status.HTTP_400_BAD_REQUEST)
        else:
            # serializer = TableSerializer(data=request.data)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    # if request.method == 'DELETE':
    #     print("******************delete")

    #     if user:
    #         user.delete()
    #         return Response(status=status.HTTP_204_NO_CONTENT)
    #     else:
    #         return Response(data="user does not exist", status=status.HTTP_400_BAD_REQUEST)

