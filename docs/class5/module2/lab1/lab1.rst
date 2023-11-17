Lab 1 - Virtual Kubernetes
##########################

For this lab, we will create the Virtual Kubernetes environment, add the Stocks service and route the traffic to the container deployed in the F5 XC environment.

1. We will now create the **Virtual Kubernetes** environment.

   Go to **Distributed Apps** -> **Applications** -> **Virtual K8s** -> **Add Virtual K8s** -> Set the **Name** to **$$vk8sName$$** -> **Save and Exit**

   .. raw:: html   

      <script>c5m2l1a();</script>
 
2. Create the workload that will define the configuration on how and where to deploy the **Stocks** POD

   a) Click on **$$vk8sName$$** -> **Workloads** -> **Add VK8s Workload**

      .. table::
         :widths: auto

         ==============================    ========================================================================================
         Object                            Value
         ==============================    ========================================================================================
         **Name**                          arcadia-stocks
         
         **Select Type of Workload**       Service
         ==============================    ========================================================================================

   b) In the same screen -> **Configure** -> Under **Containers** click **Add Item** -> Fill the bellow data -> **Apply**

      .. table::
         :widths: auto

         ================================    ========================================================================================
         Object                              Value
         ================================    ========================================================================================
         **Name**                            stocks

         **Image Name**                      registry.hub.docker.com/sorinboiaf5/arcadia-stocks:ocp

         **Select Container Registry**       Private Registry

         **Private Registry**                shared/emeaworkshops
         ================================    ========================================================================================

   c) In the same screen ->  Under **Where to Deploy the workload** choose **Regional Edge Sites** -> **Configure** -> Fill the bellow data -> **Apply**

      .. table::
         :widths: auto

         ================================    ========================================================================================
         Object                              Value
         ================================    ========================================================================================
         **Input box**                       system/tn2-lon      
         ================================    ========================================================================================

   d) In the same screen -> Under **Advertise In Cluster** click **Configure** -> Toggle the **Show Advanced Fields** switch -> Fill the bellow data -> **Apply** -> **Apply** -> **Save and Exit**

      .. table::
         :widths: auto

         ================================    ========================================================================================
         Object                              Value
         ================================    ========================================================================================
         **Port**                            80

         **Target Port**                     Different than Port

         **Different than Port**             8080
         ================================    ========================================================================================      

   .. raw:: html   

      <script>c5m2l1b();</script>
      
3. Check that the **Stocks** pod is up and running by clicking the **Pods** tabs in the Virtual Kubernetes

4. We need to create an Origin Pool which will dicover the POD

   a) **Multi-Cloud App Connect** -> **Load Balancers** -> **Origin Pool** -> **Add Origin Pool** -> Fill the bellow data

      .. table::
         :widths: auto

         ==============================    ========================================================================================
         Object                            Value
         ==============================    ========================================================================================
         **Name**                          arcadia-stocks-vk8s
         
         **Port**                          80
         ==============================    ========================================================================================

   b) In the same screen -> **Origin Servers** -> **Add Item** -> **Fill the bellow data** -> **Apply** -> **Save and exit**

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

         <script>c5m2l1c();</script>         

5. We need to change the routing to of the **Stocks** service to point to the Pod Origin Pool

   Go to **Multi-Cloud App Connect** -> **Load Balancers** -> **HTTP Load Balancer** -> Click the 3 dots under the **arcadia-ce-k8s-lb** row -> **Manage Configuration** -> **Edit Configuration** -> Under **Routes** and click **Edit Configuration** -> Click the 3 dots to the right under the Path Prefix **/v1/stock/** row -> **Edit** -> Click the **Pen Icon** respective to the Origin Pool row -> Under **Routes** and click **Edit Configuration** -> Change the **Origin Pool** to **$$namespace$$/arcadia-stocks-vk8s** -> **Apply** -> **Apply** -> **Apply** -> **Save and Exit**

   
   .. raw:: html   

      <script>c5m2l1d();</script> 