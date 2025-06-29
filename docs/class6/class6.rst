Class 6 - AI Gateway
#####################

Lab Maintainers:

  Sorin Boiangiu <s.boiangiu@f5.com>   

|

For this lab, we will use the **Arcadia Crypto** application, which has added new AI components to support a helper **Chatbot**.

This application is a modern platform simulating a crypto trading app where you can buy and sell cryptocurrency.

The following components are used within the application:

* **Frontend** – serves the non-dynamic content such as HTML, JS, CSS, and images.
* **Login** – in charge of handling all user login functionality.
* **Users** – all user data interaction is done through this microservice only.
* **Stocks** – connects to external resources to get the latest crypto data and serves it to the application clients.
* **Stocks Transaction** – deals with everything related to buying or selling cryptocurrencies. It interacts with other microservices like Users and Stocks.
* **Database** – the database where all information is stored.

AI Components

* **LLM Orchestrator** – is in charge of getting the user prompt, storing the conversation, and orchestrating all other AI components.
* **RAG** – contains Arcadia Crypto-specific knowledge that isn't available to the LLM.
* **Ollama** – hosts the LLM. In our case, we are using Llama 3.1 8B with Q4 quantization.


During this class, we will explore how applications using LLMs are developed and how to protect them.



.. toctree::
   :maxdepth: 2
   :glob:

   module*/module*