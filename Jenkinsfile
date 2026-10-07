pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        ECR_REGISTRY = '037063405906.dkr.ecr.ap-south-1.amazonaws.com'
        ECR_REPOSITORY = 'my-next-js'
        IMAGE_TAG = "${BUILD_NUMBER}"
        IMAGE_NAME = "${ECR_REGISTRY}/${ECR_REPOSITORY}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    echo "Building Docker image..."
                    
                    docker build \
                        -t ${IMAGE_NAME}:${IMAGE_TAG} \
                        .
                '''
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                    echo "Logging in to AWS ECR..."

                    aws ecr get-login-password --region ${AWS_REGION} | \
                    docker login \
                        --username AWS \
                        --password-stdin ${ECR_REGISTRY}
                '''
            }
        }

        stage('Push Image to ECR') {
            steps {
                sh '''
                    echo "Pushing image to ECR..."

                    docker push ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }

        stage('Deployment Info') {
            steps {
                echo "======================================"
                echo "Docker image pushed successfully!"
                echo "Image: ${IMAGE_NAME}:${IMAGE_TAG}"
                echo "Build Number: ${BUILD_NUMBER}"
                echo "======================================"
            }
        }
    }

    post {
        success {
            echo 'Build and ECR push successful!'
        }

        failure {
            echo 'Build or ECR push failed!'
        }
    }
}
