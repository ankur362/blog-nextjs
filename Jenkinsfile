```groovy
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t my-nextjs-app:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker stop my-nextjs-app || true
                    docker rm my-nextjs-app || true

                    docker run -d \
                        --name my-nextjs-app \
                        --restart unless-stopped \
                        -p 3000:3000 \
                        my-nextjs-app:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment successful!'
        }

        failure {
            echo 'Deployment failed!'
        }
    }
}
```
