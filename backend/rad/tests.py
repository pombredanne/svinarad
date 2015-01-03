from rad.models import Job, Worker, Employer, JobStatus, Reason
from django.contrib.auth.models import User 
import pytest
from datetime import datetime


@pytest.fixture
def zika():
  u = User.objects.create_user('Zika', 'zile@car.me',  'zilelegenda')
  u.save()
  w = Worker.objects.create(user=u)
  w.save()
  return w

@pytest.fixture
def costa():
  u = User.objects.create_user('Costa Coffee', 'cc@costacoffee.ce', 'ccgocedelceva')
  u.save()
  e = Employer.objects.create(user=u)
  e.save()
  return e

@pytest.fixture
def neki_posao(costa):
  j = Job(name="Neki job", owner=costa, credit=100, datetime=datetime.now(), instructions='Just od it') 
  j.save()
  return j 

@pytest.mark.django_db
def test_first(zika, costa):
  j = Job(name="Neki job", owner=costa, credit=100, datetime=datetime.now(), instructions='Just od it') 

  j.save()
  assert zika.user.email == "zile@car.me" 
  assert len(costa.owned.all()) == 1 

@pytest.mark.django_db
def test_tranitions(zika, costa, neki_posao): 
   neki_posao.apply(zika)
   neki_posao.save()
   assert len(neki_posao.applicants.all()) == 1 

   neki_posao.draft(zika)
   neki_posao.save()

   assert neki_posao.state == JobStatus.WORKER_ENGAGED

@pytest.mark.django_db
def test_cancelations(zika, costa, neki_posao):
  neki_posao.apply(zika)
  neki_posao.save()

  neki_posao.draft(zika)
  neki_posao.save()

  r = Reason(job=neki_posao, initiator=zika.user, details='U kosti su svi kreteni')
  r.save()

  neki_posao.break_cooperation(r)
  neki_posao.save()

  assert neki_posao.state == JobStatus.OPEN
  assert len(neki_posao.reasons.all()) == 1 


  neki_posao.draft(zika)
  neki_posao.save()

  r2 = Reason(job=neki_posao, initiator=costa.user, details='A, bogami i Zika je kreten')
  r2.save()

  neki_posao.work_done()

  neki_posao.break_cooperation(r2)

  neki_posao.save()

  assert len(neki_posao.reasons.all()) == 2 


