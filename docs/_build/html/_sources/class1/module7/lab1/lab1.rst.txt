Lab 1 - Bot advanced config
###########################


1. Enabling Malicious User Detection is done at the **HTTP Load Balancer** level. In our example we will enable only **Spam Sources** and **Anonymous Proxies**

a) Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the **arcadia-re-lb** row -> Manage Configuration -> Edit Configuration -> Fill the bellow data


   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Bot Defense**                               Enable
   
      **Bot Defense Region**                        EU
      ==========================================    ========================================================================================

b) On the same place click **Configure** under **Bot Defense Policy** -> Configure -> Add Item -> Fill the bellow data -> Apply -> Apply -> Apply -> Save and Exit

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Name**                                      login
   
      **HTTP Methods**                              POST

      **Prefix**                                    /v1/login

      **Select Bot Mitigation action**              Block      
      ==========================================    ========================================================================================


   .. raw:: html   

      <script>c1m7l1a();</script>     

