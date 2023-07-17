Lab 1 - Configuring the CE
##########################


1. We shall expose the application service directly on the CE while keeping the level of protection as the main load balancer.

a) Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the **arcadia-re-lb** row -> Clone Object

   .. table::
      :widths: auto


      =====================================    ========================================================================================
      Object                                   Value
      =====================================    ========================================================================================
      **Name**                                 arcadia-ce-lb

      **Domains**                              $$ceArcadia$$
      
      **Automatically Manage DNS Records**     Unchecked

      **VIP Advertisement**                    Custom      
      =====================================    ========================================================================================

b) On the same page click **Configure** under **VIP Advertisement -> Custom** -> Add Item -> Fill the bellow data -> Apply -> Save and exit

   .. table::
      :widths: auto

      ================================    ========================================================================================
      Object                              Value
      ================================    ========================================================================================
      **Site Reference**                  system/$$ceOnPrem.clusterName$$

      **Domains**                         $$ceArcadia$$      

      **VIP Advertisement**               Custom      
      ================================    ========================================================================================
  
 
   .. raw:: html   

      <script>c1ma1l1b();</script> 