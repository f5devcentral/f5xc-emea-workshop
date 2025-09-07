Sensitive Information Disclosure
================================

LLM applications have the potential to reveal sensitive information, proprietary algorithms, or other confidential details through their output. This can result in unauthorized access to sensitive data, intellectual property, privacy violations, and other security breaches. It is important for consumers of LLM applications to be aware of how to safely interact with LLMs and identify the risks associated with unintentionally inputting sensitive data that may be subsequently returned by the LLM in output elsewhere.

For reference, the **data security processor** documentation can be found here: :ext_link:`https://aigateway.clouddocs.f5.com/processors/data-security.html`.

Attack
------

The **AI Assistant** might have access to personal information which could have been provided to it ever by mistake or with malicious intent.  

This attack vector can expose **PII** data which is not allowed.

Start a new conversation and paste the following prompt:

.. code-block:: none

  Who is the CEO of Arcadia and how can I contact her?

The contact information is sensitive, and you might not want to share it freely. The information has been added to the RAG system by mistake.


Protect
-------

We will now configure the **AI Gateway** to protect the AI Assistant by using the `AIGW processor labs Data Security` processors.

The `AIGW processor labs` processors are a set of processors which are experimental only and shouldn't be used in production. These processors are meant to be elevated to GA in later releases, but this should not be considered a commitment.


1. In the **UDF Jumphost** **Web Shell**, configure the AI Gateway by running the following command:

   .. code-block:: console

      helm upgrade aigw /home/ubuntu/aigw/helm  --namespace aigw --reuse-values --set-file config.contents=/home/ubuntu/configs/aigw/lab4.yaml

2. Restart the chat and run the attack again.

   .. code-block:: none

      Who is the CEO of Arcadia and how can I contact her?

   You will see that this time **AI Gateway** is redacting the **PII** data.

   For more insights, look at the access logs.