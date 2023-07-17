Lab 1 - DDOS protection config
##############################


1. Enabling DDOS protection is done at the **HTTP Load Balancer** level. 

a) Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the **arcadia-re-lb** row -> Manage Configuration -> Edit Configuration -> Fill the bellow data -> Save and Exit


   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **DDoS Detection**                            Enable
   
      **Auto Mitigation**                           Enable
      ==========================================    ========================================================================================



   .. raw:: html   

      <script>c1m8l1a();</script>        