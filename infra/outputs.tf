output "alb_dns_name" {
  value       = aws_lb.app.dns_name
  description = "Public URL (DNS) for the load balancer."
}

output "ecr_repository_url" {
  value       = aws_ecr_repository.app.repository_url
  description = "ECR repository URL (used by CI/CD)."
}

output "ecs_cluster_name" {
  value       = aws_ecs_cluster.app.name
  description = "ECS cluster name."
}

output "ecs_service_name" {
  value       = aws_ecs_service.app.name
  description = "ECS service name."
}

output "ecs_task_execution_role_arn" {
  value       = aws_iam_role.task_execution.arn
  description = "IAM role ARN used by ECS to pull images from ECR and write logs."
}

output "ecs_task_role_arn" {
  value       = aws_iam_role.task.arn
  description = "IAM role ARN assumed by your running container (app permissions)."
}

output "aws_region" {
  value       = var.aws_region
  description = "AWS region used."
}

output "container_name" {
  value       = var.container_name
  description = "Container name expected by the deployment pipeline."
}

output "github_actions_role_arn" {
  value       = aws_iam_role.github_actions_deploy.arn
  description = "Role ARN to set as AWS_ROLE_ARN in GitHub Actions (OIDC)."
}

