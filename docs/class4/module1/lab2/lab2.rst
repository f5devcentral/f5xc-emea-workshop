Protect the modern API application with F5XC - static protection
================================================================

Assign OpenAPI spec file to the LB
----------------------------------

Copy and save the below OpenAPI Spec file. It defines the Sentence API app ``without`` COLORS.

https://app.swaggerhub.com/apis/F5EMEASSA/API-Sentence-2022/v1-auth#/

Upload file
^^^^^^^^^^^
In your Namespace, upload the file into ``Web and API Protection`` > ``Manage`` > ``Files`` > ``Swagger Files``

.. image:: ../pictures/add-oas.png
   :align: center

Create API Definition
^^^^^^^^^^^^^^^^^^^^^
You can't assign an OAS spec file to a Load Balancer or a listener (Virtual Server in BIG-IP, Server or Location in Nginx). You must create an API Definition object.
In your Namespace, create anew API Definition the file into ``Web and API Protection`` > ``Manage`` > ``API Management`` > ``API Definition``

.. image:: ../pictures/menu-api-def.png
   :align: center

Create a new API Definition and select the File created in the previous step. Select the version (so far, we have only one version)

.. note:: The API Definition is now created, and can be assigned to a Load Balancer

Assign API def to the LB
^^^^^^^^^^^^^^^^^^^^^^^^
1. Edit the Load Balancer created in the previous Lab (sentence-re-lb)
2. Go to the section ``API Protection``
3. Enable API Definition and select the API Definition created previously. Keep the validation ``Disabled`` at the moment.

   .. image:: ../pictures/enable-api-def.png
      :align: center


Apply API Protection rules
--------------------------

Create the default API Protection rule
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

