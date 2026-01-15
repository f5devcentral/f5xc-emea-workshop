Class 4 - API Protection
########################

Lab Maintainers:

  Matthieu Dierick <m.dierick@f5.com>

  Alfredo Vistola <a.vistola@f5.com>   

  Sorin Boiangiu <s.boiangiu@f5.com>


|

* Please start this `UDF <https://udf.f5.com/b/1cb733ca-3e77-4783-a91d-98d469eb220b#documentation>`_ to get an invite via F5 email to reset your password for the "f5-emea-workshop" tenant. 
*	You are going to run a script to generate traffic at the end of “Class 4 - Dynamic API Protection – Enable API discovery” and it can take up to 2 hours maximum to see all results in the Dashboard for the following “API Discovery outcomes” lab section. There is also a note about this in the specific lab section, maybe you combine it with a break 😉.
* Please make sure you complete the XC API Security Lab before the UDF shuts down because your XC account and configuration will be removed automatically when the UDF deployment stops.

|

**Welcome to the F5 Distributed Cloud - API Security lab**

Distributed Cloud API Security provides discovery and deep insights from use of AI/ML. Identify shadow APIs and block API attacks in real time and eliminate vulnerabilities at their source. The SaaS-based portal enables users to manage and go deep for threat analytics, forensics, and troubleshooting of API communications for modern applications.

F5 offers flexible deployment models for API Discovery, including inline processing through F5 Distributed Cloud for real-time traffic analysis, out-of-band configurations via BIG-IP, Nginx, Kong and also APIGee. And the latest is an Airgapped API Discovery solution disconnected from any cloud.

.. image:: ../pictures/apid-models.png
   :align: left

APIs change frequently:

* Easily identify all API endpoints mapped to your applications and monitor anomalous activities or shadow APIs including blocking of suspicious requests and endpoints. 
* Generate API schema and Swagger files to minimize manual tracking of API endpoints.
* Reduce time spent configuring and deployi1ng API security policies.

.. warning:: Before you procced to the lab it is mandatory to enter the email that you have joined the UDF with in order to populate any dynamic content in the lab. For instance you will see that the hostnames are created dynamically. If everything is ok, the button "Get Data" gets green. In addition, please make sure you complete this lab before the UDF shuts down because your XC account and configuration will be removed automatically when the UDF deployment stops.

.. raw:: html
    
    <script>getStudentData('f5xcemeaapiworkshop');</script>
.. toctree::
   :maxdepth: 2
   :glob:

   module*/module*

