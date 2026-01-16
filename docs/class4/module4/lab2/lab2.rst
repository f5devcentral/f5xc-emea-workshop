Configure BIG-IP for Local API Discovery
========================================

Now, we must configure the BIG-IP to collect the datas, format the datas, and send the datas to the LAD server.

There is a how-to into the LAD Console for TMUI, iControl REST and TMSH.

Click on ``Integration`` > ``Integration Guide``

.. image:: ../pictures/integration1.png
   :align: left
   :scale: 50%

You can see how it works and how it is interconnected.

In a nutshell, an irule attached to the API Application Virtual Server is collecting the requests and responses, formating the datas and send those datas to a pool where the LAD is a member.


Configure the BIG-IP via the TMUI
---------------------------------

Configure the Pool
^^^^^^^^^^^^^^^^^^

* Go to Local Traffic -> Pools and Create a new External pool for LAD Collector (logging-node-tls). 
* Pool member port must be ``6514``

.. image:: ../pictures/pool_list.png
   :align: left
   :scale: 50%

Configure the Internal VS
^^^^^^^^^^^^^^^^^^^^^^^^^

* Configure a VS (type Internal) named ``syslog-tls-virtual`` 
* With service port ``6514`` 
* Server SSL Profile : ``serverssl``
* Pool : logging-node-tls (created in the previous step)



Test your Rate Limiting config
------------------------------
