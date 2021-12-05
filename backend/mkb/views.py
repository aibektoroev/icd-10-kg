from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets, views
from rest_framework import generics
from rest_framework import filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import AlphabetCategory, AlphabetGroup, Alphabet, MKBRecord
from .serializers import AlphabetCategorySerializer, AlphabetGroupSerializer, AlphabetSerializer, MKBRecordSerializer, MKBSearchSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class FilterByParent(viewsets.ModelViewSet):
    http_method_names = ['get', 'head']

    def list(self, request):

        parents = [{ "id": 0, "mkb_code": "МКБ-10", "sign": "", "title": "Классы" }]

        parent = int(request.query_params.get('parent'))

        try:
            mkb_records = MKBRecord.records.filter(parent=parent).order_by("mkb_code").values()

            while parent:
                parent_record = MKBRecord.records.get(id=parent)
                parents.insert(1, {"id": parent_record.id, "mkb_code": parent_record.mkb_code, "sign": parent_record.sign, "title": parent_record.title})
                parent = parent_record.parent            
        
            return Response(data={"parents": parents,
                                "mkb_records": mkb_records},
                                status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_404_NOT_FOUND, data={"message": "Ошибка 404: Запись не существует"})



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

        parent = { "id": parent.id, "mkb_code": parent.mkb_code, "sign": parent.sign, "title": parent.title }
            
        return Response(data={"processed_code": processed_code,
                            "parent": parent},
                            status=status.HTTP_200_OK)

        
class LiveSearchView(generics.ListAPIView):
    queryset = MKBRecord.records.all()
    serializer_class = MKBSearchSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter,)    
    search_fields = ['mkb_code', 'title']
    ordering = 'mkb_code'


class RecordsViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = MKBRecordSerializer
    queryset = MKBRecord.records.all()



class AlphabetCategoryViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = AlphabetCategorySerializer
    queryset = AlphabetCategory.categories.all()


class AlphabetGroupViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = AlphabetGroupSerializer
    
    def list(self, request):

        cat_id = int(request.query_params.get('category'))

        category = AlphabetCategory.categories.get(id=cat_id)

        groups = AlphabetGroup.groups.filter(category=category.id).order_by("name").values()

        category = AlphabetCategorySerializer(category).data

        return Response(data={"category": category, "groups": groups},
                                status=status.HTTP_200_OK)


class AlphabetViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = AlphabetSerializer
    
    def list(self, request):

        group_id = int(request.query_params.get('group'))

        group = AlphabetGroup.groups.get(id=group_id)

        alphabets = Alphabet.alphabets.filter(group=group).order_by("id").values()

        group = AlphabetGroupSerializer(group).data

        return Response(data={"group": group, "alphabets": alphabets},
                                status=status.HTTP_200_OK)



class BlacklistTokenUpdateView(views.APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)