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

