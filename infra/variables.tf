variable "aws_region" {
  type        = string
  description = "AWS region to deploy into."
  default     = "us-east-1"
}

variable "project_name" {
  type        = string
  description = "Used for naming AWS resources."
  default     = "planner"
}

variable "ecr_repository_name" {
  type        = string
  description = "ECR repository name for the webapp image."
  default     = "planner-webapp"
}

variable "ecs_cluster_name" {
  type        = string
  description = "ECS cluster name."
  default     = "planner-cluster"
}

variable "ecs_service_name" {
  type        = string
  description = "ECS service name."
  default     = "planner-service"
}

variable "container_name" {
  type        = string
  description = "Container name inside the ECS task definition."
  default     = "planner-webapp"
}

variable "container_port" {
  type        = number
  description = "Container port exposed by the nginx runtime container."
  default     = 80
}

variable "desired_count" {
  type        = number
  description = "Number of running tasks."
  default     = 1
}

variable "task_cpu" {
  type        = number
  description = "Fargate task CPU units."
  default     = 256
}

variable "task_memory" {
  type        = number
  description = "Fargate task memory (MiB)."
  default     = 512
}

variable "github_owner" {
  type        = string
  description = "GitHub org/user that owns the repository (for OIDC trust)."
  default     = "splack34"
}

variable "github_repo" {
  type        = string
  description = "GitHub repository name (for OIDC trust)."
  default     = "Planner"
}


