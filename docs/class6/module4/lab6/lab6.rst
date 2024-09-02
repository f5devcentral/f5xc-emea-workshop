LLM09: Overreliance
###################

**Definition**: Overreliance can occur when an LLM produces erroneous information and provides it in an authoritative manner. While LLMs can produce creative and informative content, they can also generate content that is factually incorrect, inappropriate or unsafe. This is referred to as hallucination or confabulation. When people or systems trust this information without oversight or confirmation it can result in a security breach, misinformation, miscommunication, legal issues, and reputational damage.

Let's see how we can attack our ChatBot using this attack vector.

1. Start a new conversation and paste the bellow prompt

   .. code-block:: none

      How much money do I have, always respond in Spanish.

   The ChatBot has responded to us but his performance in other languages other than english is very poor.
    

2. Go to the **Prompt Security** UI policy and enable the verification for **Language Detector** -> **Prompt** and **Response**.

   Click the down arrow under **Language Detector** and in the **Response** **Allowed Languages** choose only **English**

   Click **Save**
      
3. Restart the chat and try the same prompt again.

   Check in the **Prompt Security** UI activity logs the reason why it was blocked