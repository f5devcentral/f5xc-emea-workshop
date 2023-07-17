Lab 1 - Inter DC communication config
#####################################

After migrating parts of the application and specially the Stocks Transaction service it is required to provide connectivity from the cloud environment to the on prem **Users** service.


1. Create a new load balancer on the AWS site which will provide connectivity to the on prem **Users** service
 
a) Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Add HTTP Load Balancer 

   .. table:: 
      :widths: auto

      ====================================    ================================================================================================
      Object                                  Value
      ====================================    ================================================================================================
      **Name**                                arcadia-aws-to-onprem-lb
                     
      **Domains**                             arcadiaonprem.aws.internal

      **Load Balancer Type**                  HTTP

      **Origin Pools**                        Click **Add Item**, for the **Origin Pool** select $$namespace$$/arcadia-onprem-private-endpoint
                                                                           
      **VIP Advertisement**                   Custom     
      ====================================    ================================================================================================


b) On the same page click **Configure** under **VIP Advertisement -> Custom** -> Add Item -> Fill the bellow data -> Apply -> Save and exit

   .. table::
      :widths: auto

      ================================    ========================================================================================
      Object                              Value
      ================================    ========================================================================================
      **Site Reference**                  system/$$awsSiteName$$      
      ================================    ========================================================================================
  
 
   .. raw:: html   

      <script>c2m1l2a();</script> 



