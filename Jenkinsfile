
pipeline {
    agent any

    options {
        disableConcurrentBuilds(abortPrevious: true)
        timestamps()
    }

    triggers {
        githubPush()
    }

    environment {
        IMAGE_NAME = "my-next-js"
        CONTAINER_NAME = "my-next-js"
        PORT = "3000"
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
                    set -e

                    echo "Building Docker image..."

                    docker build \
                        -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                        -t ${IMAGE_NAME}:latest \
                        .

                    echo "Docker image built successfully."
                '''
            }
        }

        stage('Stop Existing Container') {
            steps {
                sh '''
                    echo "Stopping existing container..."

                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true

                    echo "Existing container removed."
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    set -e

                    echo "Starting new container..."

                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        --restart unless-stopped \
                        -p ${PORT}:${PORT} \
                        ${IMAGE_NAME}:latest

                    echo "Container started successfully."
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    echo "Waiting for application to start..."

                    sleep 10

                    echo "Checking application..."

                    curl -f http://localhost:${PORT} || {
                        echo "Health check failed."
                        docker logs ${CONTAINER_NAME}
                        exit 1
                    }

                    echo "Application is healthy."
                '''
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                    echo "Cleaning unused Docker images..."

                    docker image prune -f

                    echo "Cleanup completed."
                '''
            }
        }
    }

    post {
        success {
            echo "Next.js deployment completed successfully."
        }

        failure {
            echo "Next.js deployment failed."

            sh '''
                docker logs ${CONTAINER_NAME} || true
            '''
        }
    }
}

