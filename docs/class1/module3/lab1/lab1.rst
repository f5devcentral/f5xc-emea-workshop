Lab 1 - Rules config
####################


1. Create the **default service policy** which will allow all
 
a) Web App & API Protection -> Service Policies -> Service Policies -> Add Service Policy -> Fill the bellow data -> Save and Exit

   .. table::
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Name**                          default-allow
      
      **Select Policy Rules**           Allow All Requests
      ==============================    ========================================================================================


   .. raw:: html   

      <script>c1m3l1a();</script>  

2. Create the **service policy** which will verify that the email parameter value is in the appropiate email format

a) Web App & API Protection -> Service Policies -> Service Policies -> Add Service Policy -> Fill the bellow data

   .. table::
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Name**                          arcadia-parameter-inspection
      ==============================    ========================================================================================

b) On the same page click Configure -> Add Item -> Fill the bellow data

   .. table::
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Name**                          email
      
      **HTTP Method**                   POST
      ==============================    ========================================================================================

c) On the same page click Configure under the HTTP Path section -> Add Item under the Exact Values section -> Fill the bellow data -> Apply

   .. table::
      :widths: auto

      ================================    ========================================================================================
      Object                              Value
      ================================    ========================================================================================
      **Input box that just appeared**    /v1/login   
      ================================    ========================================================================================

d) On the same page click the Show Advanced Fields switch under the Request Match section -> Add Item under Argument Matchers -> 

   .. table::
      :widths: auto

      ===============================    ========================================================================================
      Object                             Value
      ===============================    ========================================================================================
      **Argument Name**                  email
      ===============================    ========================================================================================

c) On the same page click Add Item under the Regex Values section -> Fill the bellow data -> Apply -> Apply -> Apply -> Save and Exit

   .. table::
      :widths: auto

      ================================    ========================================================================================
      Object                              Value
      ================================    ========================================================================================
      **Input box that just appeared**    .. code::

                                             [A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}  

      **Invert Matcher**                  Checked
      ================================    ========================================================================================

   .. raw:: html   

    <script>c1m3l1b();</script>  

3. Before we apply the **service policy** let's do some tests

a. First let's do a **curl** request that will simulate a user login request. All will be fine and we expect for the request to succeseed.

   .. code-block:: none

      curl -H "Content-Type: application/json;charset=UTF-8" --data-raw "{\"email\":\"satoshi@bitcoin.com\",\"password\":\"bitcoin\"}" http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/v1/login

b. Now we will re run the same request but with the email paramter value being just a number. We won't be able to login but the request will not be blocked.

   .. code-block:: none

      curl -H "Content-Type: application/json;charset=UTF-8" --data-raw "{\"email\":\"11223344\",\"password\":\"bitcoin\"}" http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/v1/login


4. Apply the **service policies** to the **HTTP Load Balancer**

a) Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the **arcadia-re-lb** row -> Manage Configuration -> Edit Configuration -> Fill the bellow data -> Save and Exit


   .. table::
      :widths: auto

      ==================================    ========================================================================================
      Object                                Value
      ==================================    ========================================================================================
      **Service Policies**                  Apply Specified Service Policies
      ==================================    ========================================================================================

b) On the same page click Configure under Policies -> Add Item -> Fill the bellow data -> Apply -> Save and Exit

   .. table::
      :widths: auto

      ==================================    ========================================================================================
      Object                                Value
      ==================================    ========================================================================================
      **First Input Box**                   $$namespace$$/arcadia-parameter-inspection

      **Second Input Box**                  $$namespace$$/default-allow
      ==================================    ========================================================================================


   .. raw:: html   

      <script>c1m3l1c();</script>