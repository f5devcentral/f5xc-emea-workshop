Lab 2 - Testing and Visibility
##############################

In order to make sure all is going to the internal endpoint we will need to generate traffic and look at the relevant dashboards.

1. Login into the app while using the **arcadia-re-lb** load balancer :ext_link:`http://arcadia-re-$$makeId$$.workshop.emea.f5se.com`

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Username**                                  satoshi@bitcoin.com
   
      **Password**                                  bitcoin
      ==========================================    ========================================================================================

2. Let's look where each request is going

   Browse to Web App & API Protection -> Dashboards -> Performance Dashboard -> Under **Load Balancers** click **arcadia-re-lb** -> Requests

   You can see that request before the origin pool change  where using the public IP address as the app Origin Server but now we can see the site name $$ceOnPrem.clusterName$$



