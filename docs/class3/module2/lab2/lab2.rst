Lab 2 - Testing and Visibility
##############################

Let's see that what we have configured is working.


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

a) Browse to Web App & API Protection -> Dashboards -> Performance Dashboard -> Under **Load Balancers** click **arcadia-re-lb** -> Requests

b) In the **Search** input enter **/v1/stock/ticker/all** . When you observe the **Origin Server** column you can see that it mentions **tn2-lon** which is the Virtual Kubernetes F5 XC point of presence
