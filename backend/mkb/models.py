from django.db import models


class MKBRecord(models.Model):
    mkb_code = models.CharField(max_length=10, unique=True, blank=False, null=False)
    title = models.TextField(blank=False, null=False)
    subtitle = models.TextField(null=True, blank=True)
    contents = models.TextField(null=True, blank=True)
    actual = models.BooleanField(default=True)
    act_date = models.DateField(null=True, blank=True)
    parent = models.IntegerField(default=0, blank=False, null=False)

    records = models.Manager()

    class Meta:
        managed = True
        db_table = 'MKBRecord'


class AlphabetCategory(models.Model):
    name = models.CharField(max_length=120, unique=True, blank=False, null=False)
    details = models.TextField(blank=True, null=True)

    categories = models.Manager()

    class Meta:
        managed = True
        db_table = 'AlphabetCategory'


class AlphabetGroup(models.Model):
    category = models.ForeignKey(AlphabetCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True, blank=False, null=False)

    groups = models.Manager()

    class Meta:
        managed = True
        db_table = 'AlphabetGroup'


class Alphabet(models.Model):
    group = models.ForeignKey(AlphabetGroup, on_delete=models.CASCADE)
    phrase = models.CharField(max_length=250, blank=False, null=False)
    details = models.TextField(blank=True, null=True)

    alphabets = models.Manager()

    class Meta:
        managed = True
        db_table = 'Alphabet'
