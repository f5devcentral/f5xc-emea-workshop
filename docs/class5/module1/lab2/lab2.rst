Lab 2 - Deploy the Customer Edge
################################

The **Customer Edge** aka. **CE** will extend the F5 Cloud infrastructure into the local onprem environment and will enable us to use capabilities otherwise not possible:

* Load balance and provide high availability for the the onprem Kubernetes Worker nodes
* Automatically discover Kubernetes services
* Expose the onprem applications through F5 XC without exposing the app localy to the internet


1. Make sure you have logged in the F5 XC console. If you haven't yet follow the instrictions found :doc:`here <../../../intro/steps/intro3>` and then return to the guide.
   
   Go to **Multi-Cloud Network Connect** -> **Site Management** -> **App Stack Sites** -> **Add App Stack Site** -> Fill the bellow data -> **Save and Exit**

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Name**                                      $$ceOnPrem.clusterName$$

      **Generic Server Certified Hardware**         kvm-voltstack-combo
         
      **Master Nodes**                              Under **Name** enter the value **master**

      **Latitude**                                  40

      **Longitude**                                 40

      **Site Local K8s API accesse**                Enable Site Local API Access

      **Enable Site Local K8s API access**          system/k8s
      ==========================================    ========================================================================================      

   .. raw:: html   

      <script>c5m1l2a();</script>

2. First we need to register the **CE**.

   Go to the **UDF deployment** click **Components** on the **F5XC CE ( On prem )** component click **Access**.  A drop down will open, click **Site UI**, a new tab will open.

   Enter the default credentials as described bellow.

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Username**                                  admin
   
      **Password**                                  Volterra123
      ==========================================    ========================================================================================      




3. On the newly opened page click **Dashboard** and **Configure Now**, fill in the data as per the bellow table and finish by clicking **Save configuration**

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

      **Site Local K8s API access**                 Enable Site Local K8s API access

      **Enable Site Local K8s API access**          system/k8s
      ==========================================    ========================================================================================   

4. We will need to approve on the F5 XC console the newly deployed **CE**.

   Go to **Multi-Cloud Network Connect** -> **Site Management** -> **Registrations** .

   You will see in the **Pending Registrations** multiple **CE** entries that need to be approved.

   On the line respective to the **Cluster Name** **$$ceOnPrem.clusterName$$** click the **V** and after that **Save and Exit**.

   This will approve and trigger the initialization of the **CE**.

5. The initialization process takes around 15 - 20 minutes.

   We can observe the status by going to **Multi-Cloud Network Connect** -> **Overview** -> **Sites**.

   Once the health score of **$$ceOnPrem.clusterName$$** will reach 100% the **CE** will be fully operational.

