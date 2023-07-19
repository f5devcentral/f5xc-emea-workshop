Lab 3 - Create and Apply a WAAP Policy
######################################

It is time to create your first WAAP policy and assign it on your HTTPS LB.

Create a WAAP Policy
********************

*  Create a new WAAP policy and customize it with few settings (Menu App Firewall)

  .. image:: ../pictures/lab3/waap-config.png
     :align: center
     :scale: 50%


.. note:: Do not save yet your WAAP policy, we will customize the Blocking page

|



|

Customize the blocking page
***************************

* Still in your WAAP policy configuration screen, scroll down and enable ``Show Advanced Fields`` in ``Advanced Configuration``

* For the Blocking Response Page, change to ``Custom``
* Customize the page as you want, or use the code below. Select ``Base64(binary)``, in order to be sure some metacharacters will not be skipped (there is a COPY button on the top right of the string)

.. code-block:: Base64

    string:///PHN0eWxlPmJvZHkgeyBmb250LWZhbWlseTogU291cmNlIFNhbnMgUHJvLCBzYW5zLXNlcmlmOyB9PC9zdHlsZT4KPGh0bWwgc3R5bGU9Im1hcmdpbjogMDsiPjxoZWFkPjx0aXRsZT5SZWplY3RlZCBSZXF1ZXN0PC90aXRsZT48L2hlYWQ+Cjxib2R5IHN0eWxlPSJtYXJnaW4gOiAwOyI+CjxkaXYgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICMwNDZiOTk7IGhlaWdodDogNDBweDsgd2lkdGg6IDEwMCU7Ij48L2Rpdj4KPGRpdiBzdHlsZT0ibWluLWhlaWdodDogMTAwcHg7IGJhY2tncm91bmQtY29sb3I6IHdoaXRlOyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij48L2Rpdj4KPGRpdiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjogI2ZkYjgxZTsgaGVpZ2h0OiA1cHg7IHdpZHRoOiAxMDAlOyI+PC9kaXY+CjxkaXYgaWQ9Im1haW4tY29udGVudCIgc3R5bGU9IndpZHRoOiAxMDAlOyAiPgogIDx0YWJsZSB3aWR0aD0iMTAwJSI+CiAgICA8dHI+PHRkIHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7Ij4KCSAgPGRpdiBzdHlsZT0ibWFyZ2luLWxlZnQ6IDUwcHg7Ij4KICAgICAgICA8ZGl2IHN0eWxlPSJtYXJnaW4tYm90dG9tOiAzNXB4OyI+PGJyLz4KICAgICAgICAgIDxzcGFuIHN0eWxlPSJmb250LXNpemU6IDQwcHQ7IGNvbG9yOiAjMDQ2Yjk5OyI+UmVqZWN0ZWQgUmVxdWVzdDwvc3Bhbj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6IDE0cHQ7Ij4KICAgICAgICAgIDxwPlRoZSByZXF1ZXN0ZWQgVVJMIHdhcyByZWplY3RlZC4gUGxlYXNlIGNvbnN1bHQgd2l0aCB5b3VyIGFkbWluaXN0cmF0b3IuPC9wPgogICAgICAgICAgPHA+WW91ciBTdXBwb3J0IElEIGlzOiA8c3BhbiBzdHlsZT0iY29sb3I6cmVkOyBmb250LXdlaWdodDpib2xkIj57e3JlcXVlc3RfaWR9fTwvc3Bhbj48L3A+CgkJICA8cD48YSBocmVmPSJqYXZhc2NyaXB0Omhpc3RvcnkuYmFjaygpIj5bR28gQmFja108L2E+PC9wPgogICAgICAgICAgPHA+PGltZyBzcmM9Imh0dHBzOi8vaW1hZ2Uuc3ByZWFkc2hpcnRtZWRpYS5uZXQvaW1hZ2Utc2VydmVyL3YxL21wL3Byb2R1Y3RzL1QxNDU5QTgzOU1QQTQ0NTlQVDI4RDE4OTUwMTU4MEZTMTU2NC92aWV3cy8xLHdpZHRoPTU1MCxoZWlnaHQ9NTUwLGFwcGVhcmFuY2VJZD04MzksYmFja2dyb3VuZENvbG9yPUYyRjJGMi9jYXQtcGV3LXBldy1tYWRhZmFrYXMtYXV0b2NvbGxhbnQuanBnIj48L3A+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC90ZD48L3RyPgogIDwvdGFibGU+CjwvZGl2Pgo8ZGl2IHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyMjIyOyBwb3NpdGlvbjogZml4ZWQ7IGJvdHRvbTogMHB4OyBoZWlnaHQ6IDQwcHg7IHdpZHRoOiAxMDAlOyB0ZXh0LWFsaWduOiBjZW50ZXI7Ij48L2Rpdj4KPC9ib2R5Pgo8L2h0bWw+

|

Test you WAAP Policy
********************

* First, try to send a XSS or any other attack on any field or parameter

  .. note:: You should see your custom blocking page

* Then, run a CURL and check if the CURL request is blocked by the Bot Protection
  
  * curl -k https://YOUR_APP_FQDN/

  .. note:: Has the default CURL been blocked ??? WHY ???
  
* Now, send a more customized CURL request

  * For Mac Users

  .. code-block:: bash

    curl 'https://<TO_BE_REPLACED_BY_YOUR_FQDN>/trading/rest/buy_stocks.php' \
    -H 'authorization: Basic YWRtaW46aWxvdmVibHVl' \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36' \
    -H 'content-type: application/json; charset=UTF-8' \
    -H 'x-requested-with: XMLHttpRequest' \
    --data-raw '{"trans_value":330,"qty":2,"company":"FFIV","action":"buy","stock_price":165}' \
    --compressed    

  * For Windows Users

  .. code-block:: bash

    curl --location --request POST "https://<TO_BE_REPLACED_BY_YOUR_FQDN>/trading/rest/buy_stocks.php" --header "authorization: Basic YWRtaW46YWRtaW4uRjVkZW1vLmNvbQ==" --header "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36" --header "content-type: application/json; charset=UTF-8" --header "x-requested-with: XMLHttpRequest" --header "Cookie: 3ba01=3b7f08b7c6ff531030e6f43656582f0b000004c246698307ddbe" --data-raw "{\"trans_value\": 330,\"qty\": 2,\"company\": \"FFIV\",\"action\": \"buy\",\"stock_price\": 165}"

.. note:: Has the customized CURL been blocked ??? WHY ???

|

Look at WAAP analytics in F5XC Console
**************************************

* In ``Overview > Dashboards > Security Dashboard`` menu, select your LB, and check ``Security Analytics``

.. image:: ../pictures/lab3/analytics1.png
   :align: center