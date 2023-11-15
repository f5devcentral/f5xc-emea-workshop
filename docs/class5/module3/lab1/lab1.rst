Lab 1 - Waf config
##################


1. Create the **Web Application Firewall policy**
 
   Go to **Web App & API Protection** -> **App Firewall** -> **Add App Firewall** -> Fill the bellow data -> **Save and Exit**

   .. table::
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Name**                          arcadia-waf
      
      **Enforcement Mode**              blocking
      ==============================    ========================================================================================


   .. raw:: html   

      <script>c5m3l1a();</script>  


2. Attach the **Web Application Firewall policy** to the **HTTP Load Balancer**

   Go to **Web App & API Protection** -> **Load Balancers** -> **HTTP Load Balancer** -> Click the 3 dots under the **arcadia-ce-k8s-lb** row -> **Manage Configuration** -> **Edit Configuration** -> Fill the bellow data -> **Save and Exit**


   .. table::
      :widths: auto

      ==================================    ========================================================================================
      Object                                Value
      ==================================    ========================================================================================
      **Web Application Firewall (WAF)**    Enable
   
      **Enable**                            $$namespace$$/arcadia-waf
      ==================================    ========================================================================================

   .. raw:: html   

      <script>c5m3l1b();</script>

   