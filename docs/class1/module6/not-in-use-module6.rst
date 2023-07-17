Bot Standard
############

As part of the Web Application Firewall policy that we have previously deployed the **Bot Standard** protection is enabled.
This capability clasiffies bots based on the user agent request. 

The default configuration will behave as bellow.

.. table::
   :widths: auto

   ==========================================    ========================================================================================
   Object                                        Value
   ==========================================    ========================================================================================
   **Malicious Bot**                             Block

   **Suspicious Bot**                            Report

   **Good Bot**                                  Report
   ==========================================    ========================================================================================

**Suspicious Bot** is clasified based non-malicious tools detection like **curl**.
 
We will change the **Suspicious Bot** to blocking.




**Module 6 - All sections**

.. toctree::
   :maxdepth: 1
   :glob:

   lab*/lab*

