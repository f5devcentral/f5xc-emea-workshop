Rate Limiting protection
========================

There are multiple options to do Rate Limiting in F5XC. In this lab, we are focusing on API Protection Rate Limiting. 

The goal is to rate limit an endpoint at risk because we discovered an attack or it is a shadow API and we are not sure if we should allow or block it.

Enable Rate Limiting from the Security Dashboard
------------------------------------------------

* Go to the Security Dashboard for your application LB to the ``API Endpoints`` view.

  .. image:: ../pictures/security-endpoints.png
    :align: center
    :scale: 50%

* Look for ``/api/colors``, click on the three dots (...) at the right of the /api/colors endpoint and select ``Edit Rate Limit``

  .. image:: ../pictures/edit-rate-limit.png
    :align: center
    :scale: 50%
 
* Keep the default Rate Limit Threshold of 1 Second.

  .. image:: ../pictures/rl-colors.png
    :align: center
    :scale: 50%

* Apply, Apply ... and Save

Test your Rate Limiting config
------------------------------

Run the traffic generator script to simulate traffic

* SSH or WEBSSH to the Jumphost
* Run the script in the /home/ubuntu/api-protection-lab folder

.. code-block:: none

   cd /home/ubuntu/api-protection-lab
   bash rate-limit.sh sentence-re-$$makeId$$.workshop.emea.f5se.com

* You should see a respone code 429 - Too Many Requests

.. code-block:: HTML

  <html><head><title>Error Page</title></head>
  <body>The requested URL was rejected. Please consult with your administrator.<br/><br/>
  Your support ID is a8c0fa99-7f85-4c81-b245-2d7d94457f8a<h2>Error 429 - Too Many Requests</h2>F5 site: tn2-lon<br/><br/><a href='javascript:history.back();'>[Go Back]</a></body></html>

* Also check the logs in the Security Dashboard - Security Analytics

  .. image:: ../pictures/rate-limit-logs.png
    :align: center
    :scale: 50%

* You succesfully completed the API security lab :-)
