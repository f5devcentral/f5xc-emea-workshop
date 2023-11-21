Lab 3 - Expose the application to the world
###########################################

The **Customer Edge** is up an running in order to expose the inernal K8s application we will need to go through a few steps:

* **CE** will discover the K8s
* Publish the application on the F5 XC platform and define the routing to each service based on the HTTP Path.


1. First we need to import the **kubeconfig** file that will be used to access the Kubernetes API in order to discover the application service.

   Go to the **Multi-Cloud App Connect** -> **Manage** -> **Service Discoveries** -> **Add Discovery** -> Fill in the bellow data -> **Save and Exit** .

   

   .. table::
      :widths: auto

      ==========================================    ====================================================================================================================      
      Object                                        Value
      ==========================================    ====================================================================================================================      
      **Name**                                      $$kubeconfig$$
         
      **Virtual-Site or Site or Network**           Site

      **Reference**                                 system/$$ceOnPrem.clusterName$$

      **Network Type**                              Site Local Network

      **K8S Discovery Configuration**               Click on **Configure** -> **Configure**  -> In the **Secret to Blindfold** paste the `kubeconfig`_ -> Apply -> Apply      
      ==========================================    ====================================================================================================================      

   .. _kubeconfig: ../../../_static/files/kubeconfig.yaml
      
2. In the current view ( **Service Discoveries** ) click **Refresh**.

   You can observe that **$$kubeconfig$$** has discovered 6 services. Click on the **6 Services** and you will be able to see the services and PODs of our application.

3. Now we configure a HTTP health check that will help us check the availability of the kubernetes cluster and send traffic only to working servers.

   Go to **Multi-Cloud App Connect** -> **Manage** -> **Load Balancers** -> **Health Checks** -> **Add Health Check** -> Fill the bellow data -> **Save and Exit**

   .. table::
      :widths: auto

      ==========================================    ====================================================================================================================      
      Object                                        Value
      ==========================================    ====================================================================================================================      
      **Name**                                      arcadia-hc
         
      **HTTP HealthCheck**                          Click **Edit Configuration** -> Change the **Path** to **/healthz** -> Apply
      ==========================================    ====================================================================================================================      

   .. raw:: html   

      <script>c5m1l3a();</script>  

4. Next we need to create the **Origin Pools** which will point to our services.

   Go to **Multi-Cloud App Connect** -> **Manage** -> **Load Balancers** -> **Origin Pools**

   We will need to create 5 **Origin Pools** each represeting the services that need to be accessed by users, create the **Origin Pools** based on the bellow data.

a) Click **Add Origin Pool**

   .. table::
      :widths: auto

      ==========================================    ====================================================================================================================      
      Object                                        Value
      ==========================================    ====================================================================================================================      
      **Name**                                      arcadia-frontend
         
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

      **Site**                                      system/$$ceOnPrem.clusterName$$

      **Select Network on the site**                Outside Network
      ==========================================    ====================================================================================================================      


c) Repeat steps **a** and **b** for the other application services, the only thing that needs to be changed is the **Name** and **Service Name**.


   The additional services are:

   .. table::
      :widths: auto

      ==========================================    ====================================================================================================================      
      Name                                          Service Name
      ==========================================    ====================================================================================================================      
      arcadia-login                                 arcadia-login.arcadiacrypto

      arcadia-stock-transaction                     arcadia-stock-transaction.arcadiacrypto

      arcadia-stocks                                arcadia-stocks.arcadiacrypto

      arcadia-users                                 arcadia-users.arcadiacrypto
      ==========================================    ====================================================================================================================      

   .. raw:: html   

      <script>c5m1l3b({name:'arcadia-frontend', serviceName: 'arcadia-frontend.arcadiacrypto'});</script>
      <script>c5m1l3b({name:'arcadia-login', serviceName: 'arcadia-login.arcadiacrypto'});</script>
      <script>c5m1l3b({name:'arcadia-stock-transaction', serviceName: 'arcadia-stock-transaction.arcadiacrypto'});</script>
      <script>c5m1l3b({name:'arcadia-stocks', serviceName: 'arcadia-stocks.arcadiacrypto'});</script>
      <script>c5m1l3b({name:'arcadia-users', serviceName: 'arcadia-users.arcadiacrypto'});</script>


5. The last step will be to configure the **HTTP Load Balancer** that will enable to expose through the F5 XC platform the Kubernetes internal application.

   a) Go to **Multi-Cloud App Connect** -> **Manage** -> **Load Balancers** -> **HTTP Load Balancers** -> **Add HTTP Load Balancer** -> Fill the bellow data 
   
      .. table:: 
         :widths: auto

         ====================================    =================================================================================================
         Object                                  Value
         ====================================    =================================================================================================
         **Name**                                arcadia-ce-k8s-lb
                        
         **Domains**                             arcadia-ce-k8s-$$makeId$$.workshop.emea.f5se.com

         **Load Balancer Type**                  HTTP
                                                                                    
         **Automatically Manage DNS Records**    Enable 

         **Origin Pools**                        Click **Add Item**, for the **Origin Pool** select $$namespace$$/arcadia-frontend -> Apply
         ====================================    =================================================================================================

   b) On the same page go to **Routes** and click **Configure** -> Repeat this 4 times for each service ( **Add Item** -> Fill in the bellow -> **Apply** )

      .. table:: 
         :widths: auto

         ================================    ========================================================================================================
         **Prefix**                          **Origin Pools**
         ================================    ========================================================================================================
         /v1/login                           $$namespace$$/arcadia-login

         /v1/stockt                          $$namespace$$/arcadia-stock-transaction

         /v1/stock/                          $$namespace$$/arcadia-stocks

         /v1/user                            $$namespace$$/arcadia-users          
         ================================    ========================================================================================================

   c) We are almost done, click **Apply** -> **Save and Exit**


      .. raw:: html   

         <script>c5m1l3c();</script>


   6. All is done our application is published. Let's check that all is working well.

   Browse to `arcadia-ce-k8s-$$makeId$$.workshop.emea.f5se.com` and login to the app.

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Username**                                  satoshi@bitcoin.com
   
      **Password**                                  bitcoin
      ==========================================    ========================================================================================   

   Click on the **Exchange** tab on the left and go buy or sell some crypto currency.