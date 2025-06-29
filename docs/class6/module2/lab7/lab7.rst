Full config
###########

We hope you enjoyed the **AI Gateway**  lab and have gained a better understanding of how to use it to protect your AI applications.

In case you just want to apply the full configuration at the same time for all that has been presented in this lab you can run the bellow commands.


1. Deploy the custom processor.
  .. code-block:: console

     kubectl apply -f /home/ubuntu/configs/aigw/lab6_k8s.yaml

2. Configure the AI Gateway by running the following command.

  .. code-block:: console

     helm upgrade aigw oci://private-registry.f5.com/aigw/charts/aigw  --namespace aigw --reuse-values --set-file config.contents=/home/ubuntu/configs/aigw/lab7.yaml

