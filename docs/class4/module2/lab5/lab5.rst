Enable API on-premises discovery  (under construction)
======================================================

In the previous lab, we learnt how F5 Distributed Cloud can discover API Endpoints when those endpoints are exposed on F5 Distributed Cloud infrastructure. 
But many modern applications (API firt) reside on-premises behind BIG-IP. In order to offer the same level of services, F5 deployed the on-premises API Discovery for BIG-IP.

In this lab, you will learn how to ``onboard`` a BIG-IP into F5XC, in order to enable the API Discovery feature on this BIG-IP.

Key take aways before jumping into the lab:

* Out of Band Discovery
* CE required on BIG-IP Network
* CE collects and anonymises logs from BIG-IP
* F5XC runs API Discovery engine in F5XC infrastructure
* Outcomes

  * Inventory
  * Security Insights risks
  * Compliance
  * Authentication state
  * Sensitive Data

.. image:: ../pictures/cbip-apid-archi.png
   :align: left
   :scale: 50%


Deploy Customer Edge (CE)
-------------------------

The CE (Customer Edge) is already deployed for you. You can find it into Multi-Cloud Network Connect > Overview > Infrastructure > Sites
The CE is deployed with 2 NICs

* NIC Outside in charge of IPSEC tunnels between CE and RE
* NIC Inside in charge of configuring BIG-IP and collect logs from BIG-IP

In a nutshell, F5XC will configure the BIG-IP to collect request logs from the Virtual Server, and send those logs to the CE. Then the CE will anonymize the logs and send them to the F5XC infrastructure to render the API Discovery endpoints and insights.


Onboard on-premises BIG-IP
--------------------------

The BIG-IP is already up and running into your lab environment. Each student has his own BIG-IP.

Go to Multi-Cloud App Connect tile > Manage > Service Discovery, and create a new Service Discovery type BIG-IP

.. image:: ../pictures/add-service-discovery.png
   :align: left
   :scale: 50%


Configure the service discovery so it can find the BIG-IP

* Select your CE under ``Reference``
* Select ``Site Local Network`` under ``Network Type`` <- This is the interface on the BIG-IP Mgmt network
* Click ``Add Item`` under ``Classic BIG-IP Clusters``

.. image:: ../pictures/create-service-discovery.png
   :align: left
   :scale: 50%

* Give a name to the BIG-IP such as ``bigip1``
* Click Add Item under ``Classic BIG-IP Devices``
* Configure with the BIG-IP settings
  
  * Management IP: ``10.1.1.8``
  * Admin username: ``admin``
  * Admin password: ``admin``

* Apply

Your configuration should look like this

.. image:: ../pictures/cbip-config.png
   :align: left
   :scale: 50%


Enable API Discovery on BIG-IP Virtual Server
---------------------------------------------




Check API Endpoints discovered on BIG-IP VS
-------------------------------------------