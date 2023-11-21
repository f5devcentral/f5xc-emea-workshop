Lab 1 - Deploy the application
##############################

For this lab, we will deploy the same application that we have used before right on the **Customer Edge** which will function as a **Kubernetes Cluster**.

1. Go to **Distributed Apps** -> **Managed K8s** -> **Overview** -> **$$ceOnPrem.clusterName$$**.

   You can observe all the Kubernetes objects and dashboard
 
2. Now we need to start deploying out app. First we need to download the kubeconfig file to access our kubernetes environment.

   a) **Distributed Apps** -> **Managed K8s** -> **Overview** -> Click on the **3 dots** to the right on the  **$$ceOnPrem.clusterName$$** row -> **Download Global Kubeconfig** 
     
   b) Go to the **UDF deployment** click **Components** on the **Jumphost** component click **Access**.  A drop down will open, click **WEB SHELL**, a new tab will shell access will open.

   c) We will now need to enter the kubeconfig file contents

      Run the bellow commands

      .. code-block:: none

         su ubuntu
         nano /home/ubuntu/.kube/config
      
      Paste the **kubeconfig** file contents.

      Click **CTRL + o** -> **Enter** to save the file

      Click **CTRL + x** to exit the file editor and get back to the bash


   d) Check that the connectivity to the Kubernetes cluster is working by running the bellow command

      .. code-block:: none

         kubectl get nodes

3. Run the bellow commands in order to deploy the app

   .. code-block:: none

         kubectl apply -f /home/ubuntu/lab/udf/appstack/arcadia.yaml

4. Return to the Kubernetes Dashboard and observe the newly created objects.

   Go to **Distributed Apps** -> **Managed K8s** -> **Overview** -> **$$ceOnPrem.clusterName$$**

   