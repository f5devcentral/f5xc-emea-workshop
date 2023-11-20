Lab 2 - Expose the application to the world
###########################################

Just like the previous parts of the lab we need again to publish the app to the world but this time through the Kubernetes Ingress **CE**.


1. Next we need to create the **Origin Pools** which will point to our new app services.

   Go to **Multi-Cloud App Connect** -> **Manage** -> **Load Balancers** -> **Origin Pools**

   We will need to create 5 **Origin Pools** each represeting the services that need to be accessed by users, create the **Origin Pools** based on the bellow data.

a) Click **Add Origin Pool**

   .. table::
      :widths: auto

      ==========================================    ====================================================================================================================      
      Object                                        Value
      ==========================================    ====================================================================================================================      
      **Name**                                      arcadia-frontend-cek8s
         
      **Port**                                      80

      **Health Checks**                             Click **Add Item** -> In the new dropdown choose **$$namespace$$/arcadia-hc**
      ==========================================    ====================================================================================================================      

b) Under **Origin Servers** click **Add Item** -> Fill the bellow data -> **Apply** -> **Save and Exit**

   .. table::
      :widths: auto

      ==========================================    ====================================================================================================================      
      Object                                        Value
      ==========================================    ====================================================================================================================      
      **Select Type of Origin Server**              K8s Service Name of Origin Server on given Sites

      **Service Name**                              arcadia-frontend.arcadiacrypto

      **Site**                                      system/$$cek8s$$

      **Select Network on the site**                vK8s Networks on Site
      ==========================================    ====================================================================================================================      


c) Repeat steps **a** and **b** for the other application services, the only thing that needs to be changed is the **Name** and **Service Name**.


   The additional services are:

   .. table::
      :widths: auto

      ==========================================    ====================================================================================================================      
      Name                                          Service Name
      ==========================================    ====================================================================================================================      
      arcadia-login-cek8s                           arcadia-login.arcadiacrypto

      arcadia-stock-transaction-cek8s               arcadia-stock-transaction.arcadiacrypto

      arcadia-stocks-cek8s                          arcadia-stocks.arcadiacrypto

      arcadia-users-cek8s                           arcadia-users.arcadiacrypto
      ==========================================    ====================================================================================================================      

   .. raw:: html   

      <script>c5m4l2a({name:'arcadia-frontend-cek8s', serviceName: 'arcadia-frontend.arcadiacrypto'});</script>
      <script>c5m4l2a({name:'arcadia-login-cek8s', serviceName: 'arcadia-login.arcadiacrypto'});</script>
      <script>c5m4l2a({name:'arcadia-stock-transaction-cek8s', serviceName: 'arcadia-stock-transaction.arcadiacrypto'});</script>
      <script>c5m4l2a({name:'arcadia-stocks-cek8s', serviceName: 'arcadia-stocks.arcadiacrypto'});</script>
      <script>c5m4l2a({name:'arcadia-users-cek8s', serviceName: 'arcadia-users.arcadiacrypto'});</script>


5. The last step will be to configure the **HTTP Load Balancer** that will enable to expose through the F5 XC platform the Kubernetes internal application.

   a) Go to **Multi-Cloud App Connect** -> **Manage** -> **Load Balancers** -> **HTTP Load Balancers** -> **Add HTTP Load Balancer** -> Fill the bellow data 
   
      .. table:: 
         :widths: auto

         ====================================    =================================================================================================
         Object                                  Value
         ====================================    =================================================================================================
         **Name**                                arcadia-ce-cek8s-lb
                        
         **Domains**                             arcadia-ce-cek8s-$$makeId$$.workshop.emea.f5se.com

         **Load Balancer Type**                  HTTP
                                                                                    
         **Automatically Manage DNS Records**    Enable 

         **Origin Pools**                        Click **Add Item**, for the **Origin Pool** select $$namespace$$/arcadia-frontend-cek8s -> Apply
         ====================================    =================================================================================================

   b) On the same page go to **Routes** and click **Configure** -> Repeat this 4 times for each service ( **Add Item** -> Fill in the bellow -> **Apply** )

      .. table:: 
         :widths: auto

         ================================    ========================================================================================================
         **Prefix**                          **Origin Pools**
         ================================    ========================================================================================================
         /v1/login                           $$namespace$$/arcadia-login-cek8s

         /v1/stockt                          $$namespace$$/arcadia-stock-transaction-cek8s

         /v1/stock/                          $$namespace$$/arcadia-stocks-cek8s

         /v1/user                            $$namespace$$/arcadia-users-cek8s          
         ================================    ========================================================================================================

   c) We are almost done, click **Apply** -> **Save and Exit**


      .. raw:: html   

         <script>c5m5l2a();</script>


   6. All is done our application is published. Let's check that all is working well.

   Browse to `arcadia-ce-cek8s-$$makeId$$.workshop.emea.f5se.com` and login to the app.

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Username**                                  satoshi@bitcoin.com
   
      **Password**                                  bitcoin
      ==========================================    ========================================================================================   

   Click on the **Exchange** tab on the left and go buy or sell some crypto currency.
   