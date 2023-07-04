Lab 2 - Testing and Visibility
##############################

1. First lets try and attack out application with an **XSS attack** using the bellow URL. Th attack will be blocked and a **support ID** will be provided. Save the **support ID** as it will be used in the next step.


   :ext_link:`http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/?a=%3Cscript%3Ealert(%27xss%27)`



2. Let's look at the blocked attack

a) Web App & API Protection -> Dashboards -> Security Dashboard -> Scrool down to the **Load Balancers** section and clikc on **arcadia-re-lb** -> Security Analytics

   Here you will me able to see all blocked attacks. 

3. If you want to filter a specific request that has been blocked

a) On the current page -> Add Filter -> Enter req_id -> In -> Enter the previous support ID -> In case nothing is shown click on the Refresh button

   Click the down arrow and you will see all the request details and why it has been blocked

