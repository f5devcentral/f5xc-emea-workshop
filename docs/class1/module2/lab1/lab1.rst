Lab 1 - Waf config
##################


1. Create the **Web Application Firewall policy**
 
a) Web App & API Protection -> App Firewall -> Add App Firewall -> Fill the bellow data -> Save and Exit

   .. table:: Waf Policy
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Name**                          arcadia-waf
      
      **Enforcement Mode**              blocking
      ==============================    ========================================================================================


   .. raw:: html   

      <script>c1m2l1a();</script>  


2. Attach the **Web Application Firewall policy** to the **HTTP Load Balancer**

a) Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the **arcadia-re-lb** row -> Manage Configuration -> Edit Configuration -> Fill the bellow data -> Save and Exit


   .. table:: Attach WAF policy
      :widths: auto

      ==================================    ========================================================================================
      Object                                Value
      ==================================    ========================================================================================
      **Web Application Firewall (WAF)**    Enable
   
      **Enable**                            $$namespace$$/arcadia-waf
      ==================================    ========================================================================================

   .. raw:: html   

      <script>c1m2l1b();</script>

   