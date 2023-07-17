Lab 1 - RE + CE configuration
#############################


1. First we need to create a new origin pool which will point directly to the private IP address of the servers.

a) Web App & API Protection -> Load Balancers -> Origin Pool -> Add Origin Pool -> Fill the bellow data

   .. table:: Origin Pool
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Name**                          arcadia-onprem-private-endpoint
      
      **Port**                          31970
      ==============================    ========================================================================================

b) In the same screen -> Origin Servers -> Add Item -> Fill the bellow data -> Apply -> Save and exit

   .. table:: Origin Server
      :widths: auto

      ================================    ========================================================================================
      Object                              Value
      ================================    ========================================================================================
      **Select Type of Origin Server**    IP address of Origin Server on given Sites

      **IP**                              10.1.1.6

      **Site**                            system/$$ceOnPrem.clusterName$$

      **Select Network on the site**      Outside Network
      ================================    ========================================================================================



   .. raw:: html   

      <script>c1m9l1a();</script>        

2. Our next step is to change the default pool of the **arcadia-re-lb** to point directly to the internal origin pool

a) Web App & API Protection -> App Firewall ->  Click the 3 dots under the **arcadia-waf** row -> Manage Configuration -> Edit Configuration -> Click the **pen icon** under the **arcadia-public-endpoint origin pool** -> Change the **Origin Pool** field from **$$namespace$$/arcadia-public-endpoint** to **$$namespace$$/arcadia-onprem-private-endpoint** -> Apply -> Save and Exit


   .. raw:: html   

         <script>c1m9l1b();</script>   