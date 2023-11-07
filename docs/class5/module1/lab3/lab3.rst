Lab 3 - Expose the application to the world
###########################################

The **Customer Edge** is up an running in order to expose the inernal K8s application we will need to go through a few steps:

* **CE** will discover the K8s
* Publish the application on the F5 XC platform and define the routing to each service based on the HTTP Path.


1. First we need to import the **kubeconfig** file that will be used to access the Kubernetes API in order to discover the application service.

   Go to the **Multi-Cloud App Connect** -> **Manage** -> **Service Discoveries** -> **Add Discovery** -> Fill in the bellow data -> **Save and Exit** .

   

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Username**                                  admin
   
      **Kubeconfig**                                `YAML file`
      ==========================================    ========================================================================================      

   .. _YAML file: ./files/kubeconfig.yaml
       :target: _blank


2. On the newly opened page click **Dashboard** and **Configure Now**, fill in the data as per the bellow table and finish by clicking **Save configuration**

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Token**                                     771e948b-f6ef-4338-9b50-953762f7a2a7
   
      **Cluster name**                              $$ceOnPrem.clusterName$$

      **Hostname**                                  master

      **Certified Hardware**                        kvm-voltstack-combo

      **Latitude**                                  40

      **Longitude**                                 40
      ==========================================    ========================================================================================   

3. Make sure you have logged in the F5 XC console. If you haven't yet follow the instrictions found :doc:`here <../../../intro/steps/intro3>` and then return to the guide.

   We will need to approve on the F5 XC console the newly deployed **CE**.

   Go to **Multi-Cloud Network Connect** -> **Site Management** -> **Registrations** .

   You will see in the **Pending Registrations** multiple **CE** entries that need to be approved.

   On the line respective to the **Cluster Name** **$$ceOnPrem.clusterName$$** click the **V** and after that **Save and Exit**.

   This will approve and trigger the initialization of the **CE**.

4. The initialization process takes around 15 - 20 minutes.

   We can observe the status by going to **Multi-Cloud Network Connect** -> **Overview** -> **Sites**.

   Once the health score of **$$ceOnPrem.clusterName$$** will reach 100% the **CE** will be fully operational.

