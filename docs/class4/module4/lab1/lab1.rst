Install LAD server on Linux server
==================================

Local API Discovery, aka LAD, is a local server collecting logs from BIG-IP and delivering API Discovery locally. Compared to other F5 API Discovery solutions, LAD is fully local and air gapped.
It fits perfectly for environments where cloud storage or cloud connectivity is a challenge.

.. image:: ./pictures/intro-lad.png
   :align: left
   :scale: 50%

Simplified Architecture
-----------------------

The LAD Server acts as a syslog receiver collecting access/request logs from the BIG-IP. In this lab, it is a Ubuntu server with 2 interfaces

* NIC1 to BIG-IP mgmt network
* NIC2 to BIG-IP self-ip backend network

.. image:: ./pictures/lad-archi.png
   :align: left
   :scale: 50%


JWT Access Control
------------------


Enable JWT Access Control
^^^^^^^^^^^^^^^^^^^^^^^^^
