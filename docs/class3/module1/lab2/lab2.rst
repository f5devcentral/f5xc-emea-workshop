Lab 2 - Observe
###############

In order to make sure all is going to the correct endpoint we will need to relogin into the application and look at the relevant dashboards.

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

b) In the **Search** input enter **/v1/login** . When you observe the **Origin Server** column you can see that it mentions **$$ceOnPrem.clusterName$$** which is the on prem data center

c) In the **Search** input enter **/v1/stock/ticker/all** . When you observe the **Origin Server** column you can see that it mentions **$$awsSiteName$$** which is the AWS data center

3. Now let's try and buy some LTC. Did it work ?

