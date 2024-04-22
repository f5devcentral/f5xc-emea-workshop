API Inventory Management
========================

API Inventory Management is a feature designed to enhance your API ecosystem by simplifying the management of your API inventory. 

It allows for easy managing of discovered APIs, marking of non-API discoveries, removal of outdated endpoints, and seamless updates to API schemas. 
This tool keeps your API inventory organized, current, and secure, catering to your dynamic requirements.

Add Shadow API into the Inventory
---------------------------------

In the previous lab, we discoverd /api/colors as a ``shadow API``. DevOps already opened a ServiceNow ticket with SecOps to provide with the new OpenAPI Spec file including /colors.
But SecOps are in late in their ticketing queue, and they haven't yet seen this ticket. But they must take a decision about this endpoint.

SecOps can block the request with an API Protection rule. We have seen in ``Static API Protection`` lab how to create it. FYI, there is a shortcut directly into the API EndPoint screen.

**Don't block it now, it is a legitimate endpoint.**

.. image:: ../pictures/protection-rule-colors.png
   :align: left
   :scale: 50%



We will not block it, SecOps had the information from a side channel this endpoint is part of the application updated yesterday night.

We need to add this endpoint into the inventory (the OpenAPI Spec), but we will not update the Spec File as the source if truth are the DevOps. Instead, we will add the endpoint into the ``Inclusion List``.

.. note:: 

  The make it simple, the inventory = OpenAPI File + Inclusion List

Add Colors shadow API into the Inventory (inclusion list)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* Click on the dot (...) at the right of the /api/colors endpoint

* Click on ``Move to Inventory``

  .. image:: ../pictures/move-to-inventory.png
     :align: left
     :scale: 50%

* A warning message will confirm the add

  .. image:: ../pictures/warning-inventory.png
     :align: left
     :scale: 50%

* Click ``Move to Inventory``

* Now, you can see ``/api/colors`` is not a Shadow API anymore, but part of Inventory

  .. image:: ../pictures/moved-inventory.png
     :align: left
     :scale: 50%

How to find all endpoints added into the Inventory (inclusion list) ?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As we said, endpoints are not added into the OAS spec file because this file is maintenained by AppDev/DevOps. Instead, we create an ``Inventory Inclusion List``

* Go to API Management > Edit your API Definition

* You can see an API Inventory Inclusion List

  .. image:: ../pictures/oas-inclusion-list.png
     :align: left
     :scale: 50%

* Click on ``Edit Configuration`` to see the content

  .. image:: ../pictures/inclusion-list.png
     :align: left
     :scale: 50%

.. note:: 

    When AppDev/DevOps will push a new version of the OpenAPI Spec file to F5XC, a new version of the file will be available for the SecOps. SecOps will update the definition with this new file (let's say v2)
    If this version includes ``/api/colors``, the entry into the Inventory Inclusion List will not be taken in account. OAS spec file takes precedence on Inventory Inclusion List.

