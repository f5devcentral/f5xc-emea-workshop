variable "resource_prefix" {
  default = "Matt"
}

variable "cluster_name" {
  default     = "aksdierick"
  description = "K8S Cluster for Matt"
}

variable "location" {
  default     = "westeurope"
  description = "The Azure Region in which all resources in this example should be provisioned"
}

variable "vm_size" {
  default     = "Standard_B2ms"
  description = "2 vpus, 8 GiB memory"
}
