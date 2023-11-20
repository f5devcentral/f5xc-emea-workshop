Lab 1 - Deploy the CE on K8s
############################


1. Go to the **UDF deployment** click **Components** on the **MicroK8s** component click **Access**.  A drop down will open, click **WEB SHELL**, a new tab will shell access will open.
 
2. Find K8s configuration for our application. In order to achive this run the bellow commands.

   .. code-block:: none

      su ubuntu
      cd /home/ubuntu/cek8s
      sed -i 's/<cluster name>/$$cek8s$$/' ce_k8s.yml
      kubectl apply -f ce_k8s.yml

3. Since this is a new **CE** we will need to approve on the F5 XC console.

   Go to **Multi-Cloud Network Connect** -> **Site Management** -> **Registrations** .

   You will see in the **Pending Registrations** multiple **CE** entries that need to be approved.

   On the line respective to the **Cluster Name** **$$cek8s$$** click the **V** and after that **Save and Exit**.

   This will approve and trigger the initialization of the **CE**.

5. The initialization process takes around 10 minutes.

   We can observe the status by going to **Multi-Cloud Network Connect** -> **Overview** -> **Sites**.

   Once the health score of **$$cek8s$$** will reach 100% the **CE** will be fully operational.