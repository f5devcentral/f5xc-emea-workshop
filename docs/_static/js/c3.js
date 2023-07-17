function c3m1l1a() {        
    const config = {
      "metadata": {
        "name": "arcadia-stocks",
        "disable": false
      },
      "spec": {
        "service": {
          "num_replicas": 1,
          "containers": [
            {
              "name": "stocks",
              "image": {
                "name": "registry.hub.docker.com/sorinboiaf5/arcadia-stocks:ocp",
                "public": {},
                "pull_policy": "IMAGE_PULL_POLICY_DEFAULT"
              },
              "init_container": false,
              "flavor": "CONTAINER_FLAVOR_TYPE_TINY"
            }
          ],
          "deploy_options": {
            "deploy_re_sites": {
              "site": [
                {
                  "tenant": "ves-io",
                  "namespace": "system",
                  "name": "tn2-lon",
                  "kind": "site"
                }
              ]
            }
          },
          "advertise_options": {
            "advertise_in_cluster": {
              "port": {
                "info": {
                  "port": 80,
                  "protocol": "PROTOCOL_TCP",
                  "target_port": 8080
                }
              }
            }
          }
        }
      }
    }
    displayJSON(config,'Distributed Apps -> Applications -> Virtual K8s -> Click on vk8s-....-..... -> Workloads -> Add VK8s Workload -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c3m2l1a() {        
  const config = {
    "metadata": {
      "name": "arcadia-stocks-vk8s",
      "disable": false
    },
    "spec": {
      "origin_servers": [
        {
          "k8s_service": {
            "service_name": `arcadia-stocks.${info.namespace}`,
            "site_locator": {
              "virtual_site": {
                "tenant": "ves-io",
                "namespace": "shared",
                "name": "ves-io-all-res",
                "kind": "virtual_site"
              }
            },
            "vk8s_networks": {}
          }
        }
      ],
      "no_tls": {},
      "port": 80,
      "same_as_endpoint_port": {},
      "loadbalancer_algorithm": "LB_OVERRIDE",
      "endpoint_selection": "LOCAL_PREFERRED"
    }
  }
  displayJSON(config,'Web App & API Protection -> Load Balancers -> Origin Pool -> Add Origin Pool -> JSON -> Copy paste the JSON config -> Save and Exit');    
}

function c3m2l1b({ instructions } = { instructions: 'Web App & API Protection -> Load Balancers -> HTTP Load Balancer -> Click the 3 dots under the arcadia-re-lb row -> Manage Configuration -> Edit Configuration -> JSON -> Copy paste the JSON config -> Save and Exit' }) {
  
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
      },
      {
        prefix: '/v1/stock/',
        pool: 'arcadia-stocks-vk8s'
    }
    ]
  });
  
  displayJSON( config, instructions );    
}