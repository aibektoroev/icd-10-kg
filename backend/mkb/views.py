from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import MKBRecord
from .serializers import MKBRecordSerializer, MKBSearchSerializer


class FilterByParent(viewsets.ModelViewSet):
    http_method_names = ['get', 'head']

    def list(self, request):

        parents = [{ "id": 0, "mkb_code": "МКБ-10", "title": "Классы" }]

        parent = int(request.query_params.get('parent'))

        mkb_records = MKBRecord.records.filter(parent=parent).order_by("mkb_code").values()

        while parent:
            parent_record = MKBRecord.records.get(id=parent)
            parents.insert(1, {"id": parent_record.id, "mkb_code": parent_record.mkb_code, "title": parent_record.title})
            parent = parent_record.parent            
       
        return Response(data={"parents": parents,
                            "mkb_records": mkb_records},
                            status=status.HTTP_200_OK)


class ParentByCode(viewsets.ModelViewSet):
    http_method_names = ['get', 'head']

    def list(self, request):
        code = request.query_params.get('mkb_code')

        processed_code = None
        target_record = None
        parent = None

        try:
            target_record = MKBRecord.records.get(mkb_code=code)
            parent = MKBRecord.records.get(id=target_record.parent)

        except MKBRecord.DoesNotExist:
            if '-' in code:
                code = code.split('-')[0]

                try:
                    target_record = MKBRecord.records.get(mkb_code=code)
                    parent = MKBRecord.records.get(id=target_record.parent)

                except MKBRecord.DoesNotExist:
                    pass          

        if target_record is None:
            return Response(data= {"status": 204, "message": "The provided link points to no data or is of wrong format..."}, status=status.HTTP_204_NO_CONTENT)

        processed_code = target_record.mkb_code

        parent = { "id": parent.id, "mkb_code": parent.mkb_code, "title": parent.title }
            
        return Response(data={"processed_code": processed_code,
                            "parent": parent},
                            status=status.HTTP_200_OK)

        
class LiveSearchView(generics.ListAPIView):
    queryset = MKBRecord.records.all()
    serializer_class = MKBSearchSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ['mkb_code', 'title']


class RecordsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = MKBRecordSerializer
    queryset = MKBRecord.records.all()