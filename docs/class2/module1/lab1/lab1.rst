Lab 1 - Routing configuration
#############################


1. First we need to create a new origin pool which will point directly to application in the **AWS Datacenter**.

a) Web App & API Protection -> Load Balancers -> Origin Pool -> Add Origin Pool -> Fill the bellow data

   .. table::
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Name**                          arcadia-aws-private-endpoint
      
      **Port**                          31970
      ==============================    ========================================================================================

b) In the same screen -> Origin Servers -> Add Item -> Fill the bellow data -> Apply -> Save and exit

   .. table::
      :widths: auto

      ================================    ========================================================================================
      Object                              Value
      ================================    ========================================================================================
      **Select Type of Origin Server**    DNS Name of Origin Server on given Sites

      **DNS Name**                        arcadiaaws.aws.internal

      **Site**                            system/$$awsSiteName$$

      **Select Network on the site**      Outside Network
      ================================    ========================================================================================



   .. raw:: html   

      <script>c2m1l1a();</script>        

2. Our next step is to change the default pool of the **arcadia-re-lb** to point directly to the AWS origin pool, while configuring specific routes **/v1/login** and **/v1/users** to be routed to the on prem environment.

a) Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the **arcadia-re-lb** row -> Manage Configuration -> Edit Configuration -> Click the **pen icon** under the **arcadia-public-endpoint origin pool** -> Change the **Origin Pool** field from **$$namespace$$/arcadia-onprem-private-endpoint** to **$$namespace$$/arcadia-aws-private-endpoint** -> Apply 

b) On the same page go to **Routes** and click **Configure** -> Add Item -> Fill in the bellow -> Apply
   
   .. table:: 
      :widths: auto

      ================================    ========================================================================================================
      Object                              Value
      ================================    ========================================================================================================
      **HTTP Method**                     Any

      **Prefix**                          /v1/users

      **Origin Pools**                    Click **Add Item** and set the **Origin Pool** to $$namespace$$/arcadia-onprem-private-endpoint -> Apply
      ================================    ========================================================================================================

c) Add Item -> Fill in the bellow -> Apply -> Apply -> Save and Exit
   
   .. table:: 
      :widths: auto

      ================================    ========================================================================================================
      Object                              Value
      ================================    ========================================================================================================
      **HTTP Method**                     Any

      **Prefix**                          /v1/login

      **Origin Pools**                    Click **Add Item** and set the **Origin Pool** to $$namespace$$/arcadia-onprem-private-endpoint -> Apply
      ================================    ========================================================================================================

   .. raw:: html 

         <script>c2m1l1b();</script>   
