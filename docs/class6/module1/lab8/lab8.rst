GenAI scanner
##############

The **GenAI Scanner** is a natural-language scanner. What you use when “matching” depends on meaning, intent, or context, not a fixed string/pattern.

For example, if we want to make sure that a person's specific salary is not leaked but still allow questions about general salary information, we would need to build a **GenAI scanner**.


1. In the main left tab go to **Scanners** ⇒ **Build a custom scanner** ⇒ **GenAI scanner**

2. Set the **Name** to **Specific Salaries**

3. In the **Description** enter ``individual salary information``

4. Click **Save** ⇒ **Save version**

After saving the scanner we find ourselves in the **Playground** area. Here we can directly test all custom scanners against different text patterns.

1. Enable **Test** for the **Specific Salaries** scanner on the right-hand side of the page.

2. In the message input area of the **Playground** enter the text below. This will get blocked because it is a response with someone's salary.

   .. code-block:: none

      Your manager makes $1000000 a year.

3. Now try the below. This will not be blocked because it is an average.

   .. code-block:: none

      The average salary in the HR department is $500000 a year.
