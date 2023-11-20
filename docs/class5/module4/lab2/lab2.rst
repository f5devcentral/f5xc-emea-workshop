Lab 2 - Expose the application to the world
###########################################

The application has been deployed now we need to publish it to the world.


1. Next we need to create the **Origin Pools** which will point to our new app services.

   Go to **Multi-Cloud App Connect** -> **Manage** -> **Load Balancers** -> **Origin Pools**

   We will need to create 5 **Origin Pools** each represeting the services that need to be accessed by users, create the **Origin Pools** based on the bellow data.

a) Click **Add Origin Pool**

   .. table::
      :widths: auto

      ==========================================    ====================================================================================================================      
      Object                                        Value
      ==========================================    ====================================================================================================================      
      **Name**                                      arcadia-frontend-appstack
         
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

      **Service Name**                              arcadia-frontend.default

      **Site**                                      system/$$ceOnPrem.clusterName$$

      **Select Network on the site**                vK8s Networks on Site
      ==========================================    ====================================================================================================================      


c) Repeat steps **a** and **b** for the other application services, the only thing that needs to be changed is the **Name** and **Service Name**.


   The additional services are:

   .. table::
      :widths: auto

      ==========================================    ====================================================================================================================      
      Name                                          Service Name
      ==========================================    ====================================================================================================================      
      arcadia-login-appstack                        arcadia-login.default

      arcadia-stock-transaction-appstack            arcadia-stock-transaction.default

      arcadia-stocks-appstack                       arcadia-stocks.default

      arcadia-users-appstack                        arcadia-users.default
      ==========================================    ====================================================================================================================      

   .. raw:: html   

      <script>c5m4l2a({name:'arcadia-frontend-appstack', serviceName: 'arcadia-frontend.default'});</script>
      <script>c5m4l2a({name:'arcadia-login-appstack', serviceName: 'arcadia-login.default'});</script>
      <script>c5m4l2a({name:'arcadia-stock-transaction-appstack', serviceName: 'arcadia-stock-transaction.default'});</script>
      <script>c5m4l2a({name:'arcadia-stocks-appstack', serviceName: 'arcadia-stocks.default'});</script>
      <script>c5m4l2a({name:'arcadia-users-appstack', serviceName: 'arcadia-users.default'});</script>


5. The last step will be to configure the **HTTP Load Balancer** that will enable to expose through the F5 XC platform the Kubernetes internal application.

   a) Go to **Multi-Cloud App Connect** -> **Manage** -> **Load Balancers** -> **HTTP Load Balancers** -> **Add HTTP Load Balancer** -> Fill the bellow data 
   
      .. table:: 
         :widths: auto

         ====================================    =================================================================================================
         Object                                  Value
         ====================================    =================================================================================================
         **Name**                                arcadia-ce-appstack-lb
                        
         **Domains**                             arcadia-ce-appstack-$$makeId$$.workshop.emea.f5se.com

         **Load Balancer Type**                  HTTP
                                                                                    
         **Automatically Manage DNS Records**    Enable 

         **Origin Pools**                        Click **Add Item**, for the **Origin Pool** select $$namespace$$/arcadia-frontend-appstack -> Apply
         ====================================    =================================================================================================

   b) On the same page go to **Routes** and click **Configure** -> Repeat this 4 times for each service ( **Add Item** -> Fill in the bellow -> **Apply** )

      .. table:: 
         :widths: auto

         ================================    ========================================================================================================
         **Prefix**                          **Origin Pools**
         ================================    ========================================================================================================
         /v1/login                           $$namespace$$/arcadia-login-appstack

         /v1/stockt                          $$namespace$$/arcadia-stock-transaction-appstack

         /v1/stock/                          $$namespace$$/arcadia-stocks-appstack

         /v1/user                            $$namespace$$/arcadia-users-appstack          
         ================================    ========================================================================================================

   c) We are almost done, click **Apply** -> **Save and Exit**


      .. raw:: html   

         <script>c5m4l2b();</script>


   6. All is done our application is published. Let's check that all is working well.

   Browse to `arcadia-ce-appstack-$$makeId$$.workshop.emea.f5se.com` and login to the app.

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Username**                                  satoshi@bitcoin.com
   
      **Password**                                  bitcoin
      ==========================================    ========================================================================================   

   Click on the **Exchange** tab on the left and go buy or sell some crypto currency.
   