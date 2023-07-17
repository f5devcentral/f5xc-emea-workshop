Lab 2 - Testing and Visibility
##############################

Now let's try again and make a transaction

1. Login into the app while using the **arcadia-re-lb** load balancer :ext_link:`http://arcadia-re-$$makeId$$.workshop.emea.f5se.com`

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Username**                                  satoshi@bitcoin.com
   
      **Password**                                  bitcoin
      ==========================================    ========================================================================================

2. Go ahead and buy or sell crypto currency, this time it will work.

3. Let look at some statistics

a) Browse to Web App & API Protection -> Dashboards -> Performance Dashboard -> Under **Load Balancers** click **arcadia-aws-to-onprem-lb** -> Requests

b) Observe the **PATCH** request that has been sent by the **Transactions** microservice on AWS to the on prem **Users** microservice in order to update the wallet balance of the user

