Lab 1 - Malicious User Detection config
#######################################


1. Enabling Malicious User Detection is done at the **HTTP Load Balancer** level. In our example we will enable only **Spam Sources** and **Anonymous Proxies**

a) Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the **arcadia-re-lb** row -> Manage Configuration -> Edit Configuration -> Fill the bellow data


   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Malicious User Detection**                  Enable
   
      **User Identifier**                           Under the new **User Identification Policy** field chose **Add Item**
      ==========================================    ========================================================================================

b) Fill the bellow data -> **Configure**

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Name**                                      arcadia-user-identification
      ==========================================    ========================================================================================

c) Click **Add Item** -> Fill the bellow data -> Apply

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Identifier Type**                           HTTP Header Name

      **HTTP Header Name**                          Authorization
      ==========================================    ========================================================================================

d) Click **Add Item** -> Fill the bellow data -> Apply -> Apply -> Continue -> Save and Exit

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Identifier Type**                           Client IP Address
      ==========================================    ========================================================================================



   .. raw:: html   

      <script>c1m5l1a();</script>  

   .. raw:: html   

      <script>c1m5l1b();</script>        