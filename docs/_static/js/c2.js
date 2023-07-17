function c2m1l1a() {        
    const config = {
      "metadata": {
        "name": "arcadia-aws-private-endpoint",
        "disable": false
      },
      "spec": {
        "origin_servers": [
          {
            "private_name": {
                "dns_name": "arcadiaaws.aws.internal",
              "site_locator": {
                "site": {
                  "tenant": "f5-emea-workshop-dblyrrcj",
                  "namespace": "system",
                  "name": info.awsSiteName,
                  "kind": "site"
                }
              },
              "outside_network": {}
            }
          }
        ],
        "no_tls": {},
        "port": 31970,
        "same_as_endpoint_port": {},
        "loadbalancer_algorithm": "LB_OVERRIDE",
        "endpoint_selection": "LOCAL_PREFERRED"
      }
    }
    displayJSON(config,'Web App & API Protection -> Load Balancers -> Origin Pool -> Add Origin Pool -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c2m1l1b({ instructions } = { instructions: 'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-re-lb row -> Manage Configuration -> Edit Configuration -> JSON -> Copy paste the JSON config -> Save and Exit' }) {
  
    const config = lbConfig({
      name: 'arcadia-re-lb',
      namespace: info.namespace,
      poolName: 'arcadia-aws-private-endpoint',
      domains: [`arcadia-re-${info.makeId}.workshop.emea.f5se.com`],
      wafPolicy: 'arcadia-waf',
      activeServicePolicies: ['arcadia-parameter-inspection','default-allow'],
      ipi: ['SPAM_SOURCES','PROXY'],
      userIdentification: 'arcadia-user-identification',
      botDefense: 'enable',
      ddos: 'enable',
      routes:[
        {
            prefix: '/v1/users',
            pool: 'arcadia-onprem-private-endpoint'
        },
        {
            prefix: '/v1/login',
            pool: 'arcadia-onprem-private-endpoint'
        }
      ]
    });
    
    displayJSON( config, instructions );    
}

function c2m1l2a() {
    
    const config = lbConfig({
      name: 'arcadia-aws-to-onprem-lb',
      namespace: info.namespace,
      poolName: 'arcadia-onprem-private-endpoint',
      domains: ['arcadiaonprem.aws.internal'],
      advertiseCustom: info.awsSiteName
    });
    
    displayJSON(config,'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Add HTTP Load Balancer -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

