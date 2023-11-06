Lab 2 - Deploy the Customer Edge
################################

The **Customer Edge** aka. **CE** will extend the F5 Cloud infrastructure into the local onprem environment and will enable us to use capabilities otherwise not possible:

* Load balance and provide high availability for the the onprem Kubernetes Worker nodes
* Automatically discover Kubernetes services
* Expose the onprem applications through F5 XC without exposing the app localy to the internet

1. First we need to register the **CE**.
   Go to the **UDF deployment** click **Components** on the **F5XC CE ( On prem )** component click **Access**.  A drop down will open, click **Site UI**, a new tab will shell access will open.
   Enter the default credentials as described bellow.

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Username**                                  admin
   
      **Password**                                  Volterra123
      ==========================================    ========================================================================================      




2. On the newly opened page click **Dashboard** and **Configure Now**, fill in the data as per the bellow table and finish by clicking **Save configuration**

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Token**                                     771e948b-f6ef-4338-9b50-953762f7a2a7
   
      **Cluster name**                              ce-k8s-$$makeId$$

      **Hostname**                                  master

      **Certified Hardware**                        kvm-voltstack-combo

      **Latitude**                                  0

      **Longitude**                                 0
      ==========================================    ========================================================================================   

3. Make sure you have logged in the F5 XC console. If you haven't yet follow the instrictions found :doc:`here <../../../intro/steps/intro3>` and then return to the guide.

