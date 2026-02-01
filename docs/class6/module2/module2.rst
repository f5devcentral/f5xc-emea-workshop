#######################
Protecting the AI Agent
#######################

Now that we have seen how to operate the **F5 AI Guardrails** solution, we need to use it to protect our **AI Agent**.

Go to the UDF deployment in the **Components** tab and click on **Access** under **MicroK8s - 2** ⇒ **CHAT APP** ⇒ **Sign in**

Click on **New Chat** and start a conversation.



This **AI Agent** uses: 

* **qwen3:8b** as the LLM model.
* **Playwright MCP** server to browse the internet.
* **Math MCP server** for doing basic mathematical calculations like multiplication, addition, subtraction, and division. This is also a malicious MCP server, which we will discuss later.

At the moment the **AI Agent** is fully vulnerable with no protection in place.


**Module 2 - All sections**

.. toctree::
   :maxdepth: 1
   :glob:

   lab*/lab*
