Lab 1 - IP Inteligence config
#############################


1. Enabling IP Intelligence it is very simple and it is done at the **HTTP Load Balancer** level. In our example we will enable only **Spam Sources** and **Anonymous Proxies**

a) Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the **arcadia-re-lb** row -> Manage Configuration -> Edit Configuration -> Fill the bellow data -> Save and Exit


   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **IP Reputation**                             Enable
   
      **List of IP Threat Categories to choose**    Spam Sources, Anonymous Proxies
      ==========================================    ========================================================================================

   .. raw:: html   

      <script>c1m4l1a();</script>  