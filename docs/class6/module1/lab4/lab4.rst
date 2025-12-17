F5 AI Guardrails Console
########################

Now that we have a basic understanding on how **F5 AI Guardrails** is implemented within an application let's start by exploring the **console**.




1. Go the the UDF deployment in the **Components** tab click on **Access** under **F5 AI Guardrails** -> **F5 AI Guardrails console**.   
   Now you can see the console.

2. When deploying a model inline ( not needed for out of band) we need to point **F5 AI Guardrails** to a backend inference server.

   In the main left tab go to **Connections**, observe all the built in inference endpoints that we can connect to. You can also see the Ollama inference which has been pre configured. 

   Click on **Manage** on the **Ollama** row. Click on the **three dots** on the **Llama3-2** row -> **Manage model**.

   You can oberve the custom config we have created in order to connect to the model on the **Ollama** inference endpoint.

3. Next let's have a chat. In the main left tab go to **Chat**.

   In the **Project** input make sure **Global** is selected and in the **Chat with** input **Llama3-2** is selected.

   Now go ahead and have a chat with the backend model.



   

   





