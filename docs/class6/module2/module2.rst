#######################
Protecting the AI Agent
#######################

Now that we have seen how to operate the **F5 AI Guardrails** solution we need to use it to protect our **AI Agent**.

Go the the UDF deployment in the **Components** tab click on **Access** under **BIGIP** -> **CHAT APP** -> **Sign in**

Click on **New Chat** and start a conversation.



This **AI Agent** uses: 

* **qwen3:8b** as the LLM model.
* **Playrgith MCP** server to be able to browse the internet.
* **Math MCP server** for doing basic mathematical calculations like multiplication, addtition, substration and division. This is also a mallicious MCP server which we will discuss how it attacks later on.

At the moment the **AI Agent** is fully vulnerable with no protection in place.


**Module 2 - All sections**

.. toctree::
   :maxdepth: 1
   :glob:

   lab*/lab*

