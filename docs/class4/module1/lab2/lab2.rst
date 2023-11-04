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
   :scale: 50%

Create a new API Definition and select the File created in the previous step. Select the version (so far, we have only one version)

.. note:: The API Definition is now created, and can be assigned to a Load Balancer

Assign API definition to the LB
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1. Edit the Load Balancer created in the previous Lab (sentence-re-lb)
2. Go to the section ``API Protection``
3. Enable API Definition and select the API Definition created previously. Keep the validation ``Disabled`` at the moment.

   .. image:: ../pictures/enable-api-def.png
      :align: center
      :scale: 70%


Apply API Protection rules
--------------------------

Understand the difference between API Protection and API Validation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Before enforcing any policy, it is important to understand the differences between ``API Protection`` and ``API Validation`` (+API Discovery)

In the slide below, you can understand the difference:

* API Protection only allow ``known API endpoints and methods`` and does not enforce responses.
   * API Protection is ``Failed-Close`` by design

* API Validation ``validates`` the OpenAPI Spec file with methods, endpoints and parameters. It validates also the responses.
   * API Validation is ``Failed-Open`` by design

* API Discovery is on top of ``API Validation`` and will disovery unknown specifications (methods, endpoints and parameters)
   * API Discovery can be used alone without API Validation if API Dev can't deliver with OAS file.

.. image:: ../pictures/slide-api-protection.png
   :align: center
   :scale: 70%


Create the default API Protection rule
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this lab, we will create an ``API Protection rule`` to enforce and only allow ``known specifications``. The endpoints defined in the OAS files are:

* /adjectives
* /animals
* /locations

As a reminder, the endpoint ``/colors`` is not defined in the specification file, and the base path is ``/api/``

#. Edit your Sentence Application LB
#. In ``API Protection rules`` , create a new rule

   .. image:: ../pictures/api-protection-rule1.png
      :align: center
      :scale: 70%

#. Create 2 rules in ``Server URLs and API Groups``
  
   #. Rule 1: allows the methods and endpoints defined in the OAS file.

      .. image:: ../pictures/allow-all-rule.png
         :align: center
         :scale: 50%

   #. Rule 2: deny the rest

      .. image:: ../pictures/deny-unknown.png
         :align: center
         :scale: 50%

#. You should now have 2 rules. Save all your configurations.

   .. image:: ../pictures/all-rules.png
      :align: center
      :scale: 50%


Test your API Protection LB
---------------------------

#. Open Postman
#. Run the below calls

   #. GET /api/adjectives
   #. GET /api/animals
   #. GET /api/locations
   
   .. note:: The 3 calls are successful because there are defined in the OAS file (method + endpoint)

#. Now, run the below call

   #. GET /api/colors

   .. note:: This call is denied because not part of the OAS file


