Lab 2 - Testing
###############

In order to test we will behave as a bad actor.

1. Browse to the app :ext_link:`http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/` and login

   .. table::
      :widths: auto

      ==========================================    ========================================================================================
      Object                                        Value
      ==========================================    ========================================================================================
      **Username**                                  satoshi@bitcoin.com
   
      **Password**                                  bitcoin
      ==========================================    ========================================================================================


2. Now we have access to authenticated APIs which we now can try and break. Copy and paste the bellow Javascript code into your brower console.
   The code will try and attack the internal APIs of the application that can only be accessed after authentication.

   .. code::

        // A helper function to delay execution
        function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function runRequests() {
        const requests = [
            {url: '/v1/stockt', method: 'POST', data: '{"symbol":"<script","transactionType":"buy","amount":1}' },
            {url: '/v1/stockt', method: 'POST', data: '{"symbol":"ltc","transactionType":"SELECT ItemName FROM Items WHERE ItemNumber = 999; DROP TABLE USERS ","amount":1}' },
            {url: '/v1/stockt', method: 'POST', data: '{"symbol":"/etc/passwd","transactionType":"buy","amount":1}' },
            {url: '/v1/fuzzingattack', method: 'GET'},  
        ];

        while(true) { // infinite loop to start over when all requests have been processed
            for(let i = 0; i < requests.length; i++) { // process each request
            let item = requests[i];
            let headers = { 'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('authUser')).jwt}` };

            let requestOptions = {
                method: item.method,
                headers: headers,
            };

            if(item.method === 'POST') {
                headers['Content-Type'] = 'application/json';
                requestOptions.body = item.data;
            }

            // Fetch returns a Promise that resolves to the Response to that request, whether it is successful or not
            await fetch(location.origin + item.url, requestOptions);

            await sleep(1000); // Wait for 3 seconds before the next request
            }
        }
        }

        runRequests();

3. In the browser network tab follow the request and you will observe that after some short time F5 XC will start blocking the user by returning a HTTP 503

   We will be able to track this user in the F5XC console to **Web App & API Protection** -> **Dashboards** -> **Security** -> Click on the **arcadia-re-lb** Load Balancer -> **Malicious Users** -> **Refresh**

4. Hacker understands that he can't attack the internal APIs and decides to move to public endpoints. We will simulate this by browsing to the following URLs :ext_link:`http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/?a=/etc/passwd`  and holding **F5 button** on the keyboard to generate multiple requests

5. Since the user has not logged in we will block it based on IP address go to the **Malicious Users** dashboard like in step 3 and you will be able to follow and indetify these attacks