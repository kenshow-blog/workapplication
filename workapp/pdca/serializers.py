from rest_framework import serializers
from .models import Pdc, Action, Category

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['id', 'item']


class PdcSerializer(serializers.ModelSerializer):

    created_at = serializers.DateTimeField(
        format="%Y/%m/%d", read_only=True
    )
    updated_at = serializers.DateTimeField(
        format="%Y/%m/%d", read_only=True
    )
    class Meta:
        model = Pdc
        fields = ['id', 'userPdc', 'title', 'plan', 'do',
                    'check', 'created_at', 'updated_at']
        extra_kwargs = {'userPdc': {'read_only': True}}

class ActionSerializer(serializers.ModelSerializer):
    category_item = serializers.ReadOnlyField(
        source='category.item', read_only=True
    )
    created_at = serializers.DateTimeField(
        format="%Y/%m/%d", read_only=True
    )
    updated_at = serializers.DateTimeField(
        format="%Y/%m/%d", read_only=True
    )

    class Meta:
        model = Action
        fields = ['id', 'action', 'pdca', 'action_user','category', 'category_item',
                    'created_at', 'updated_at']

        extra_kwargs = {'action_user': {'read_only': True}}
    