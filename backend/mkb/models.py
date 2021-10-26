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
