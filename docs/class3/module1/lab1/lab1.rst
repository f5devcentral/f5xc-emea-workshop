Lab 1 - Workload config
#######################


1. First we need to create a new origin pool which will point directly to application in the **AWS Datacenter**.

a) Distributed Apps -> Applications -> Virtual K8s -> Click on **$$vk8sName$$** -> Workloads -> Add VK8s Workload

   .. table::
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Name**                          arcadia-stocks
      
      **Select Type of Workload**       Service
      ==============================    ========================================================================================

b) In the same screen -> Configure -> Under **Containers** click Add Item -> Fill the bellow data -> Apply 

   .. table::
      :widths: auto

      ================================    ========================================================================================
      Object                              Value
      ================================    ========================================================================================
      **Name**                            stocks

      **Image Name**                      registry.hub.docker.com/sorinboiaf5/arcadia-stocks:ocp
      ================================    ========================================================================================

c) In the same screen ->  Under **Where to Deploy the workload** choose **Regional Edge Sites** -> Configure -> Fill the bellow data -> Apply 

   .. table::
      :widths: auto

      ================================    ========================================================================================
      Object                              Value
      ================================    ========================================================================================
      **Input box**                       system/tn2-lon      
      ================================    ========================================================================================

d) In the same screen -> Under **Advertise In Cluster** click **Configure** -> Toggle the **Show Advanced Fields** switch -> Fill the bellow data -> Apply -> Apply -> Save and Exit

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

      <script>c3m1l1a();</script>        

