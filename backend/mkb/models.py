from django.db import models


class MKBRecord(models.Model):
    mkb_code = models.CharField(max_length=10, unique=True, blank=False, null=False)
    sign = models.CharField(max_length=1, blank=True, null=True)
    title = models.TextField(blank=False, null=False)
    subtitle = models.TextField(blank=True, null=True)
    actual = models.BooleanField(default=True)
    act_date = models.DateField(blank=True, null=True)
    parent = models.IntegerField(default=0, blank=False, null=False)

    records = models.Manager()

    def __str__(self):
        return "{}: {} - {}".format(self.id, self.mkb_code, self.title)

    class Meta:
        managed = True
        db_table = 'MKBRecord'


class AlphabetCategory(models.Model):
    name = models.CharField(max_length=120, unique=True, blank=False, null=False)
    details = models.TextField(blank=True, null=True)

    categories = models.Manager()

    def __str__(self):
        return "{}: {}".format(self.id, self.name)

    class Meta:
        managed = True
        db_table = 'AlphabetCategory'


class AlphabetGroup(models.Model):
    category = models.ForeignKey(AlphabetCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True, blank=False, null=False)

    groups = models.Manager()

    def __str__(self):
        return "{}: {}".format(self.id, self.name)

    class Meta:
        managed = True
        db_table = 'AlphabetGroup'


class Alphabet(models.Model):
    group = models.ForeignKey(AlphabetGroup, on_delete=models.CASCADE)
    phrase = models.CharField(max_length=250, blank=False, null=False)
    details = models.TextField(blank=True, null=True)

    alphabets = models.Manager()
    
    def __str__(self):
        return "{}: {}".format(self.id, self.phrase)

    class Meta:
        managed = True
        db_table = 'Alphabet'
