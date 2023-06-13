Lab 2 - Expose the public application
#####################################

Create the networking objects
*****************************

For this lab, we will use the following object naming convention

.. table:: Naming Convention
   :widths: auto

   ===============    ========================================================================================
   Object               Value
   ===============    ========================================================================================
   HTTP LB              **EMEA-SE** tenant : https://arcadia-<se_name>.emea-ent.f5demos.com
                        
                        **F5-EMEA-WORKSHOP** tenant : https://arcadia-<student_name>.workshop.emea.f5se.com

                        **F5-CHANNEL** tenant : https://arcadia-<partner-name>.f5-channel.f5demos.com
                        
                        Enable HTTPS AutoCert

   Origin Pool          https://arcadia.emea.f5se.com

                        Port 443 

                        Enable TLS

                        Disable TLS Verification
   ===============    ========================================================================================

* Check you are in your Namespace
* Create the Origin Pool targeting Arcadia public app
* Create the HTTPS LB

.. warning:: Disable TLS verification in the Origin Pool because the certification on https://arcadia.emea.f5se.com does not contain the Cert Chain.

|

Test your Anycast HTTPS LB
**************************

* Check your Arcadia application is exposed and reachable from the F5XC Global Network

.. note:: So far, Arcadia is not protected but exposed all over the world on all F5XC RE.

.. warning:: Some Service Providers have a very long recursive cache. It can take several minutes to get a DNS response. You can change your DNS server to 1.1.1.1 or 8.8.8.8 to fix that.