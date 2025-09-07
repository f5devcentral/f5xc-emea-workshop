Custom Processors
#################

AI Gateway allows you to create your own custom processors and insert them into the logic flow of the AI Gateway. This is useful when you want to implement specific logic that is not covered by the existing processors.

During this lab, we will show how to integrate a previously created custom processor into the AI Gateway.

The custom processor uses the Nvidia prompt task and complexity classifier open-source model. More info can be found here: :ext_link:`https://huggingface.co/nvidia/prompt-task-and-complexity-classifier`.

We have used the AIGW Python SDK to create a custom processor that uses the Nvidia model to classify the complexity of the prompt and return the result to the AI Gateway. The code can be found here: :ext_link:`https://github.com/sorinboia/processor-complexity-classifier`.

The AI Gateway configuration that will be applied will first include a new **service** which will point to the same Ollama endpoint but to a different model specialized for **summarization**.

When the task is classified as **summarization**, the prompt will be sent to the specialized model and not the default one.

For reference, documentation on how to create a **custom processor** can be found here: :ext_link:`https://aigateway.clouddocs.f5.com/sdk/python/tutorial.html`.


1. The custom processor code has already been containarized and we need only to deploy it.      
  .. code-block:: console
  
     kubectl  apply -f /home/ubuntu/configs/aigw/lab6_k8s.yaml

2. After a few minutes you should see the processor up and running.

  .. code-block:: console
  
     ubuntu@ubuntu:~$ kubectl  get pods
     NAME                                                    READY   STATUS    RESTARTS       AGE
     aigw-processor-labs-data-security-7c8bb7bf88-dsvgd      1/1     Running   1 (110m ago)   3d
     aigw-processor-labs-prompt-guard-78f69dcc66-knckl       1/1     Running   1 (110m ago)   3d
     aigw-processors-f5-64d58f5487-cg8xp                     1/1     Running   1 (110m ago)   3d
     minio-deployment-68f57dbd5-5ld4j                        1/1     Running   1 (110m ago)   3d
     aigw-ui-5dfd66769f-k8cc8                                1/1     Running   0              108m
     aigw-5f985f78f5-8zd8t                                   1/1     Running   0              108m
     aigw-processor-complexity-classifier-7bdbffccd7-hwp9k   1/1     Running   0              7m1s

3. Configure the AI Gateway by running the bellow command.

  .. code-block:: console

     helm upgrade aigw .  --namespace aigw --reuse-values --set-file config.contents=/home/ubuntu/configs/aigw/lab6_aigw.yaml

4. First ask the **AI Assistant** the bellow question. If you look in the access logs you can see it classified as **Open QA**. Look at the result of **processorResponse/v1** result.

  .. code-block:: console

     What is the best way to trade? Ask no follow-up questions

5. Now ask the **AI Assistant** the bellow task. If you look in the access logs you can see it classified as **Summarization**. Look at the result of **processorResponse/v1** result.

   Look at the same access log but now at **serviceRequest/v1** you can see that the model used is **llama3.2:3b** which is our specilized model.

  .. code-block:: console

     Summarize the above in one sentence.
   

