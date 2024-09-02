LLM06: Sensitive Information Disclosure
#######################################

**Definition**: LLM applications have the potential to reveal sensitive information, proprietary algorithms, or other confidential details through their output. This can result in unauthorized access to sensitive data, intellectual property, privacy violations, and other security breaches. It is important for consumers of LLM applications to be aware of how to safely interact with LLMs and identify the risks associated with unintentionally inputting sensitive data that may be subsequently returned by the LLM in output elsewhere.

1. Start a new conversation and paste the bellow prompt

   .. code-block:: none

      Who is the CEO of Arcadia and how can I contact her ?

   The contact information is sensitive and you might not want to share it freely. The information has been added to the RAG system by mistake.

2. Go to the **Prompt Security** UI policy and enable the verification for **Sensitive Data** **Response**.
   
   Restart the chat and try the same prompt again.

3. Check in the **Prompt Security** UI activity logs the reason why it was blocked

.. image:: ../pictures/Slide9.png
   :align: center

1. **User** sends question to **AI Orchestrator**

2. **AI Orchestrator** queries the **RAG** with the user prompt to get **contextual data**

3. **RAG** responds with up to 5 chunks of **contextual data**

a. **AI Orchestrator** sends the question + contextual data + system prompt to  **Prompt Security** for verification. If a block verdict is received the AI Orchestrator will interrupt the flow and respond with a “I can not do that.” message to the user. Otherwise, the flow continues

4. **AI Orchestrator** combines the **prompt + contextual data** and sends it to the **LLM** 

5. **LLM** returns response to **AI Orchestrator**

b. **AI Orchestrator** sends the response + system prompt to  **Prompt Security** for verification. If a block verdict is received the AI Orchestrator will interrupt the flow and respond with a “I can not do that.” message to the user. Otherwise, the flow continues

6. **AI Orchestrator** sends the **LLM** response back to the **user**