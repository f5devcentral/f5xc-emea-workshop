Lab 2 - Expose the public application
#####################################

Create the networking objects
*****************************

For this lab, we will use the following configuration

1. Create the Origin Pool targeting Arcadia public app

.. table:: Origin Pool Config
   :widths: auto

   ====================    ========================================================================================
   Object                  Value
   ====================    ========================================================================================
   **Name**                arcadia-public-endpoint
   
   **Endpoint**            arcadia.emea.f5se.com

   **Port**                443 

   **TLS**                 Enable

   **TLS Verification**    Disable 
   ====================    ========================================================================================

2. Create the HTTP LB

.. table:: Configuration
   :widths: auto

   ====================================    ========================================================================================
   Object                                  Value
   ====================================    ========================================================================================
   **Name**                                arcadia-re-lb
                    
   **Domain**                              arcadia-re-$$makeId$$.workshop.emea.f5se.com

   **Load Balancer Type**                  HTTP
                                                                        
   **Automatically Manage DNS Records**    Enable 
   ====================================    ========================================================================================

|

3. So far, Arcadia is not protected but exposed all over the world on all F5XC RE. 
Check your Arcadia application is exposed and reachable from the F5XC Global Network by browsing to http://arcadia-re-$$makeId$$.workshop.emea.f5se.com

.. warning:: Some Service Providers have a very long recursive cache. It can take several minutes to get a DNS response. You can change your DNS server to 1.1.1.1 or 8.8.8.8 to fix that.