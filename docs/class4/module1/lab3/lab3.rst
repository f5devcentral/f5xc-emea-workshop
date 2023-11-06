Test your modern API application protection
===========================================

#. Open Postman
#. Run the below calls

   #. GET /api/adjectives
   #. GET /api/animals
   #. GET /api/locations
   
   .. note:: The 3 calls are successful because there are defined in the OAS file (method + endpoint)

#. Now, run the below call

   #. GET /api/colors

   .. note:: This call is denied because not part of the OAS file

Check the logs
--------------

* Go tho the security dashboard (Overview > Dashboards > Security Dashboard)
* Scroll down and click on your ``sentence`` app LB
* Go to ``Security Analytics``

.. note:: Scroll and search for API events

.. image:: ../pictures/api-protect-event.png
   :align: center