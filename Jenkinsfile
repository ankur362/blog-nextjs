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
                    docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                    docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Stop Existing Container') {
            steps {
                sh '''
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        --restart unless-stopped \
                        -p ${PORT}:${PORT} \
                        ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                    sleep 10

                    curl -f http://localhost:${PORT} || {
                        echo "Health check failed"
                        docker logs ${CONTAINER_NAME}
                        exit 1
                    }
                '''
            }
        }

        stage('Cleanup') {
            steps {
                sh '''
                    docker image prune -f
                '''
            }
        }
    }

    post {
        success {
            echo "Next.js deployment successful!"
        }

        failure {
            echo "Next.js deployment failed!"
            docker logs ${CONTAINER_NAME} || true
        }
    }
}
