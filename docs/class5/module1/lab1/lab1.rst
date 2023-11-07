Lab 1 - Deploy the application
##############################

For this lab, we will need to access the on prem Kubernetes environment and deploy the app.

1. Go to the **UDF deployment** click **Components** on the **MicroK8s** component click **Access**.  A drop down will open, click **WEB SHELL**, a new tab will shell access will open.
 
2. Find K8s configuration for our application. In order to achive this run the bellow commands.

   .. code-block:: none

      su ubuntu
      cd /home/ubuntu/arcadia_crypto
      ls

3. Observe the configuration that delpoys the application by running the bellow commands.
   **arcadia.yaml** deploys the application pods and services.
   
   .. code-block:: none

      cat *

4. Deploy the **Arcadia Crypto** application

   .. code-block:: none

      kubectl apply -f arcadia.yaml

5. The application has been deployed. Check that all application PODs are up and **Running**

   .. code-block:: none

      kubectl get pods
