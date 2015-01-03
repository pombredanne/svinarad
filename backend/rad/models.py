from django.db import models
from django.conf import settings
from geoposition.fields import GeopositionField 
from django_fsm import FSMField, transition

UserModel = settings.AUTH_USER_MODEL

class JobStatus:
  OPEN = 'open'
  WORKER_ENGAGED = 'drafted'
  WORK_DONE = 'work-done'
  EMPLOYER_SATISFIED = 'employer-satisfied'
  WORKER_PAYED = 'worker-payed'
  CANCELED = 'canceled'

class JobNotOpenException(Exception):
  pass

# Create your models here.
class Job(models.Model):
  name = models.CharField(max_length=150)
  state = FSMField(default=JobStatus.OPEN, protected=True)
  credit = models.FloatField(default=0)
  location = GeopositionField()
  datetime = models.DateTimeField()
  description = models.CharField(max_length=150)
  instructions = models.TextField()
  applicants = models.ManyToManyField('Worker')
  worker = models.ForeignKey('Worker', related_name='jobs', blank=True, null=True)
  owner = models.ForeignKey('Employer', related_name='owned') 
  percentage = models.FloatField(default=0)


  def apply(self, worker):
    if self.state == JobStatus.OPEN:
      self.applicants.add(worker)
    else :
      raise JobNotOpenException('Sorry, job is not avalaible for applicants')


  @transition(field=state, source=JobStatus.OPEN, target=JobStatus.WORKER_ENGAGED)
  def draft(self, worker): 
    self.worker = worker 

  @transition(field=state, source=JobStatus.WORKER_ENGAGED, target=JobStatus.WORK_DONE)
  def work_done(self): 
    self.percentage = 100

  @transition(field=state, source=JobStatus.WORK_DONE, target=JobStatus.EMPLOYER_SATISFIED)
  def satisfied(self):
    pass

  @transition(field=state, source=JobStatus.EMPLOYER_SATISFIED, target=JobStatus.WORKER_PAYED)
  def worker_payed(self, ammount):
    pass

  @transition(field=state, source='*', target=JobStatus.OPEN)
  def break_cooperation(self, reason):
    self.reasons.add(reason)

class Worker(models.Model):
  user = models.OneToOneField(UserModel)
  rating = models.FloatField(default=1)

class Employer(models.Model):
  user = models.OneToOneField(UserModel)
  rating = models.FloatField(default=1)

class Reason(models.Model):
  job = models.ForeignKey(Job, related_name='reasons', blank=True, null=True)
  initiator = models.ForeignKey(UserModel)
  details = models.TextField()
  feedback = models.IntegerField(default=0)
  created_at = models.DateTimeField(auto_now_add=True)


