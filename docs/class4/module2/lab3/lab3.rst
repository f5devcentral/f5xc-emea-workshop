API Discovery outcomes
======================

At the first stage, API Discovery process requires several hours to collect datas and make them visible. Don't be surprised if you must wait 2 hours to see the first datas.

But in this lab, the instructor have ``super powers`` and can force the discovery.

Endpoint Discovery
------------------

* Switch to ``Dashboard`` > ``Security Dashboard``
* Click on your Application Load Balancer
* Go to the ``API Endpoints`` tab

You can see the ``Graph`` page with the Octopus :) It represents what is known and what is seen.

.. image:: ../pictures/octopus.png
   :align: left
   :scale: 50%

Understand the API Discovery elements
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

On the top left corner, there are 3 important elements:

* Inventory : Endpoints known by the OpenAPI Spec file

  * In our lab, there are 3 endpoints know (adjectives, animals, locations)

* Discovered : What the F5 XC platform is seeing at the moment (Known and Unknown endpoints)
* Shadow : What is ``Discovered`` but **NOT PART** of the ``Inventory``

You can filter on ``Shadow`` only for instance. You can see the ``/colors`` as a Shadow API.

Go deeper into the discovery
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Click on the ``/colors`` shadow API endpoint. A pop-up will appear on the right side of the screen.
* You can see on the op right corner, 2 actions

  * API Protection rule : if you want to block this endpoint. Let's say SecOps have this power to block unknown endpoints.

  * Rate Limiting : if you want to Rate Limit this endpoint because SecOps don't have the full power and don't want to break the app.

* Click on the ``Discovered`` tab and navigate into the sub-menus. You will see all the details discovered by the platform. We will go in details in some of them in few minutes.

.. image:: ../pictures/discovered.png
   :align: left
   :scale: 50%


PII Discovery
-------------

* Switch to the ``Table`` view, instead of the ``Graph`` view
* You can see more information in this screen, such as PII
* Click on an endpoint with PII deteted, such as French SSN

  .. image:: ../pictures/pii-1.png
     :align: left
     :scale: 50%

* Click on ``Discovered`` tab and check the PII detected (request and response)

  .. image:: ../pictures/pii-2.png
     :align: left
     :scale: 50%

.. warning:: I anticipate a question : Can we hide those PII in the response. Currently, only Dataguard can do it, but not with Custom PII. This feature is in the roadmap. OWASP Top 10 does not require to ``hide`` sensitive datas.


Authentication Discovery
------------------------

* Click on an endpoint with an ``Authenticated`` state.
* Click on ``Discovered`` tab and check the Authentication details

  .. image:: ../pictures/auth-discovery.png
     :align: left
     :scale: 50%

* You can notice the information collected from the OpenAPI Spec, and also the information discovered. If both don't match, a Security Posture is raised.

  .. image:: ../pictures/basic-auth.png
     :align: left
     :scale: 50%

AI/ML Security Posture
----------------------

