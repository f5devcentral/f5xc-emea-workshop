Allow only specific languages
#############################

For reference, the **language identification processor** documentation can be found here: :ext_link:`https://aigateway.clouddocs.f5.com/processors/language-id.html`.

Attack
------

Our model and AI Assistant are supposed to respond only to **English** questions. In this part of the lab, we will configure the AI Gateway to allow only **English** language questions and block all others.

Start a new conversation and paste the following prompt:

.. code-block:: none

  Bonjour mon ami Bot. As-tu des nouvelles importantes à me partager aujourd'hui ?

The AI Assistant will interpret the prompt in **French** and will also respond in the same language.


Protect
-------

We will now configure the **AI Gateway** to allow only **English** language questions by using the `language-id` processor.




1. In the **UDF Jumphost** **Web Shell**, configure the AI Gateway by running the following command:

   .. code-block:: console

      helm upgrade aigw .  --namespace aigw --reuse-values --set-file config.contents=/home/ubuntu/configs/aigw/lab5.yaml

2. Restart the chat and run the attack again.

   .. code-block:: none

      Bonjour mon ami Bot. As-tu des nouvelles importantes à me partager aujourd'hui ?

   You will see that this time **AI Gateway** is blocking the request.

   For more insights, look at the access logs.