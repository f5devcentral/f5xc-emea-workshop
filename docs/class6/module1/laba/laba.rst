Testing for the F1 score
########################

Now that we have an understanding of the F1 score it is important also to understand how we can test the **F5 AI Guardrails** with this metodology in mind.

For this task we have the **prompt-evaluator** :ext_link:`https://gitlab.com/Artemouse/prompt-evaluator`, 
a lightweight evaluation tool for AI prompts and model responses: it lets you systematically test, score, and compare outputs from large language models against criteria you define. Instead of manually judging whether a model’s reply is good or bad, this tool runs structured evaluations to measure qualities like accuracy, relevance, safety, and adherence to rules (e.g., F5 AI Guardrails). It’s useful for developers and AI teams who want repeatable, automated quality checks as they improve prompts, switch models, or tweak AI behavior.

We will use **prompt-evaluator** with a validation dataset to test our scanners.

1. First thing we need to ensure that all our prompt injection scanners in the **Test project** are enabled.

   In the main left tab go to **Projects** -> Click **View** for the **Test project** -> Click on the **Prompt injection package** and make sure that all scanners are enabled.

2. Go back to the **Test project** and click on **API Tokens** -> **Generate API token** -> Name it **f1testing** and click **Save**

   Copy the token and save it in your notepad, we will use it shortly.

   With this token we will be able to send the data from the validation dataset to mesure the performance of our guardrails.

3. Go the the UDF deployment in the **Components** tab click on **Access** under **Jumphost** -> **Web shell** 

4. First we are going to clone the **prompt-evaluator** git repository and install the necessary requirnements.

   .. code-block:: none      

      git clone https://gitlab.com/Artemouse/prompt-evaluator.git
      cd prompt-evaluator
      pip install -r requirements.txt

5. Define the bellow env variables, make sure to replace the token placeholder with the actual API token.

   .. code-block:: none   

      export CALYPSOAI_URL=http://10.1.1.8
      export CALYPSOAI_TOKEN=<YOU API TOKEN HERE>

6. Run the **prompt-evaluator** with a dataset, we will only run it with the first 20 entries.

   .. code-block:: none      

      python3 prompt_evaluator.py --input datasets/sample-datasets/xTRam1_safe_guard_prompt_injection_test.jsonl -l 20

7. Observe the results and try to understand why our F1 score is not perfect.






