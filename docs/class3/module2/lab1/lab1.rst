Lab 1 - Routing config
######################


1. First we need to create a new origin pool which will point directly to application in the **F5 XC Virtual Kubernetes**.

a) Web App & API Protection -> Load Balancers -> Origin Pool -> Add Origin Pool -> Fill the bellow data

   .. table::
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Name**                          arcadia-stocks-vk8s
      
      **Port**                          80
      ==============================    ========================================================================================

b) In the same screen -> Origin Servers -> Add Item -> Fill the bellow data -> Apply -> Save and exit

   .. table::
      :widths: auto

      ================================    ========================================================================================
      Object                              Value
      ================================    ========================================================================================
      **Select Type of Origin Server**    K8s Service Name of Origin Server on given Sitess

      **Service Name**                    arcadia-stocks.$$namespace$$

      **Site or Virtual Site**            Virtual Site

      **Virtual Site**                    ves-io-shared/ves-io-all-res

      **Select Network on the site**      vK8s Networks on Site
      ================================    ========================================================================================



   .. raw:: html   

      <script>c3m2l1a();</script>        

2. Our next step is to change the routing of the **arcadia-re-lb** to point to the new created origin pool for the **/v1/stock/** route.

a) Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the **arcadia-re-lb** row -> Manage Configuration -> Edit Configuration -> Under **Routes** and click **Edit Configuration** -> Add Item -> Fill the bellow data -> Apply -> Apply -> Save and Exit

   
   .. table:: 
      :widths: auto

      ================================    ========================================================================================================
      Object                              Value
      ================================    ========================================================================================================
      **HTTP Method**                     Any

      **Prefix**                          /v1/stock/

      **Origin Pools**                    Click **Add Item** and set the **Origin Poll** to $$namespace$$/arcadia-stocks-vk8s -> Apply
      ================================    ========================================================================================================

   .. raw:: html 

         <script>c3m2l1b();</script>   