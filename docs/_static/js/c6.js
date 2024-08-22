

function c6m1l1a() {    
        
    const config = {
        "metadata": {
          "name": "arcadia-public-endpoint",
          "namespace": info.namespace,
          "labels": {},
          "annotations": {},
          "disable": false
        },
        "spec": {
          "origin_servers": [
            {
              "public_name": {
                "dns_name": info.hostArcadia
              },
              "labels": {}
            }
          ],
          "use_tls": {
            "use_host_header_as_sni": {},
            "tls_config": {
              "default_security": {}
            },
            "skip_server_verification": {},
            "no_mtls": {}
          },
          "port": 443,
          "same_as_endpoint_port": {},
          "healthcheck": [],
          "loadbalancer_algorithm": "LB_OVERRIDE",
          "endpoint_selection": "LOCAL_PREFERRED"
        }
      }
    displayJSON(config,'Web App & API Protection -> Load Balancers -> Origin Pool -> Add Origin Pool -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c6m1l1b() {
    
    const config = lbConfig({
      name: 'arcadia-re-lb',
      namespace: info.namespace,
      poolName: 'arcadia-public-endpoint',
      domains: [`arcadia-re-${info.makeId}.workshop.emea.f5se.com`]
    });
    
    displayJSON(config,'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Add HTTP Load Balancer -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c1m2l1a() {
  
  const config = {
    "metadata": {
      "name": "arcadia-waf",
      "namespace": info.namespace,
      "labels": {},
      "annotations": {},
      "disable": false
    },
    "spec": {
      "blocking": {},
      "default_detection_settings": {},
      "default_bot_setting": {},
      "allow_all_response_codes": {},
      "default_anonymization": {},
      "use_default_blocking_page": {}
    }
  }
    displayJSON(config,'Web App & API Protection -> App Firewall -> Add App Firewall -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c1m2l1b() {
  
  const config = lbConfig({
    name: 'arcadia-re-lb',
    namespace: info.namespace,
    poolName: 'arcadia-public-endpoint',
    domains: [`arcadia-re-${info.makeId}.workshop.emea.f5se.com`],
    wafPolicy: 'arcadia-waf'
  });
    displayJSON(config,'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-re-lb row -> Manage Configuration -> Edit Configuration -> -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c1m3l1a() {
  
  const config = {
    "metadata": {
      "name": "default-allow",
      "namespace": info.namespace,
      "disable": false
    },
    "spec": {
      "any_server": {},
      "allow_all_requests": {}
    }
  }
    displayJSON(config,'Web App & API Protection -> Service Policies -> Service Policies -> Add Service Policy -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c1m3l1b() {
  
  const config = {
    "metadata": {
      "name": "arcadia-parameter-inspection",
      "namespace": info.namespace,
      "disable": false
    },
    "spec": {
      "any_server": {},
      "rule_list": {
        "rules": [
          {
            "metadata": {
              "name": "email",
              "disable": false
            },
            "spec": {
              "action": "DENY",
              "any_client": {},
              "label_matcher": {},
              "path": {
                "exact_values": [
                  "/v1/login"
                ]
              },
              "http_method": {
                "methods": [
                  "POST"
                ],
                "invert_matcher": false
              },
              "any_ip": {},
              "any_asn": {},
              "body_matcher": {},
              "arg_matchers": [
                {
                  "name": "email",
                  "item": {
                    "regex_values": [
                      "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}"
                    ]
                  },
                  "invert_matcher": true
                }
              ],
              "waf_action": {
                "none": {}
              },
              "domain_matcher": {},
              "bot_action": {
                "none": {}
              },
              "mum_action": {
                "default": {}
              },
              "user_identity_matcher": {}
            }
          }
        ]
      }
    }
  }
  displayJSON(config,'Web App & API Protection -> Service Policies -> Service Policies -> Add Service Policy -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c1m3l1c() {
  
  const config = lbConfig({
    name: 'arcadia-re-lb',
    namespace: info.namespace,
    poolName: 'arcadia-public-endpoint',
    domains: [`arcadia-re-${info.makeId}.workshop.emea.f5se.com`],
    wafPolicy: 'arcadia-waf',
    activeServicePolicies: ['arcadia-parameter-inspection','default-allow']
  });
  
  
    displayJSON(config,'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-re-lb row -> Manage Configuration -> Edit Configuration -> -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c1m4l1a() {
  
  const config = lbConfig({
    name: 'arcadia-re-lb',
    namespace: info.namespace,
    poolName: 'arcadia-public-endpoint',
    domains: [`arcadia-re-${info.makeId}.workshop.emea.f5se.com`],
    wafPolicy: 'arcadia-waf',
    activeServicePolicies: ['arcadia-parameter-inspection','default-allow'],
    ipi: ['SPAM_SOURCES','PROXY']
  });
  displayJSON(config,'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-re-lb row -> Manage Configuration -> Edit Configuration -> JSON -> Copy paste the JSON config -> Save and Exit');    
}


function c1m5l1a() {
  
  const config = {
      "metadata": {
        "name": "arcadia-user-identification",
        "namespace": info.namespace,
        "labels": {},
        "annotations": {},
        "disable": false
      },
      "spec": {
        "rules": [
          {
            "http_header_name": "Authorization"
          },
          {
            "client_ip": {}
          }
        ]
      }
    }
    displayJSON(config,'Web App & API Protection -> Shared Objects -> User Identifications -> Add User Identification -> Edit Configuration -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c1m5l1b() {
  
  const config = lbConfig({
    name: 'arcadia-re-lb',
    namespace: info.namespace,
    poolName: 'arcadia-public-endpoint',
    domains: [`arcadia-re-${info.makeId}.workshop.emea.f5se.com`],
    wafPolicy: 'arcadia-waf',
    activeServicePolicies: ['arcadia-parameter-inspection','default-allow'],
    ipi: ['SPAM_SOURCES','PROXY'],
    userIdentification: 'arcadia-user-identification'
  });
    displayJSON(config,'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-re-lb row -> Manage Configuration -> Edit Configuration -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c1m6l1a() {
  
  const config = {
    "metadata": {
      "name": "arcadia-waf",
      "namespace": info.namespace,
      "labels": {},
      "annotations": {},
      "disable": false
    },
    "spec": {
      "blocking": {},
      "default_detection_settings": {},
      "bot_protection_setting": {
        "malicious_bot_action": "BLOCK",
        "suspicious_bot_action": "BLOCK",
        "good_bot_action": "REPORT"
      },
      "allow_all_response_codes": {},
      "default_anonymization": {},
      "use_default_blocking_page": {}
    },
  }
    displayJSON(config,'Web App & API Protection -> App Firewall -> Click the 3 dots under the arcadia-waf row -> Manage Configuration -> Edit Configuration -> JSON -> Copy paste the JSON config -> Save and Exit');    
}


function c1m7l1a() {
  
  const config = lbConfig({
    name: 'arcadia-re-lb',
    namespace: info.namespace,
    poolName: 'arcadia-public-endpoint',
    domains: [`arcadia-re-${info.makeId}.workshop.emea.f5se.com`],
    wafPolicy: 'arcadia-waf',
    activeServicePolicies: ['arcadia-parameter-inspection','default-allow'],
    ipi: ['SPAM_SOURCES','PROXY'],
    userIdentification: 'arcadia-user-identification',
    botDefense: 'enable'
  });
  displayJSON(config,'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-re-lb row -> Manage Configuration -> Edit Configuration -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c1m8l1a() {
  
  const config = lbConfig({
    name: 'arcadia-re-lb',
    namespace: info.namespace,
    poolName: 'arcadia-public-endpoint',
    domains: [`arcadia-re-${info.makeId}.workshop.emea.f5se.com`],
    wafPolicy: 'arcadia-waf',
    activeServicePolicies: ['arcadia-parameter-inspection','default-allow'],
    ipi: ['SPAM_SOURCES','PROXY'],
    userIdentification: 'arcadia-user-identification',
    botDefense: 'enable',
    ddos: 'enable',
  });
    displayJSON(config,'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-re-lb row -> Manage Configuration -> Edit Configuration -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c1m9l1a() {        
  const config = {
    "metadata": {
      "name": "arcadia-onprem-private-endpoint",
      "disable": false
    },
    "spec": {
      "origin_servers": [
        {
          "private_ip": {
            "ip": "10.1.1.6",
            "site_locator": {
              "site": {
                "tenant": "f5-emea-workshop-dblyrrcj",
                "namespace": "system",
                "name": info.ceOnPrem.clusterName,
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

function c1m9l1b({ instructions } = { instructions: 'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-re-lb row -> Manage Configuration -> Edit Configuration -> JSON -> Copy paste the JSON config -> Save and Exit' }) {
  
  const config = lbConfig({
    name: 'arcadia-re-lb',
    namespace: info.namespace,
    poolName: 'arcadia-onprem-private-endpoint',
    domains: [`arcadia-re-${info.makeId}.workshop.emea.f5se.com`],
    wafPolicy: 'arcadia-waf',
    activeServicePolicies: ['arcadia-parameter-inspection','default-allow'],
    ipi: ['SPAM_SOURCES','PROXY'],
    userIdentification: 'arcadia-user-identification',
    botDefense: 'enable',
    ddos: 'enable',
  });
  
  displayJSON(config, instructions);    
}

function c1m9l1c({ instructions } = { instructions: 'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-re-lb row -> Manage Configuration -> Edit Configuration -> JSON -> Copy paste the JSON config -> Save and Exit' }) {
  

  const config = lbConfig({
    name: 'arcadia-re-lb',
    namespace: info.namespace,
    poolName: 'arcadia-public-endpoint',
    domains: [`arcadia-re-${info.makeId}.workshop.emea.f5se.com`],
    wafPolicy: 'arcadia-waf',
    activeServicePolicies: ['arcadia-parameter-inspection','default-allow'],
    ipi: ['SPAM_SOURCES','PROXY'],
    userIdentification: 'arcadia-user-identification',
    botDefense: 'enable',
    ddos: 'enable',
  });

  
    displayJSON(config, instructions );    
}

function c1ma1l1b() {
  

  const config = lbConfig({
    name: 'arcadia-ce-lb',
    namespace: info.namespace,
    poolName: 'arcadia-onprem-private-endpoint',
    domains: [info.ceArcadia],
    wafPolicy: 'arcadia-waf',
    activeServicePolicies: ['arcadia-parameter-inspection','default-allow'],
    ipi: ['SPAM_SOURCES','PROXY'],
    userIdentification: 'arcadia-user-identification',
    botDefense: 'enable',
    ddos: 'enable',
    advertiseCustom: info.ceOnPrem.clusterName
  });

  
    displayJSON(config,'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-re-lb row -> Manage Configuration -> Edit Configuration -> JSON -> Copy paste the JSON config -> Save and Exit');    
}