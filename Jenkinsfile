pipeline {
    agent any

    stages {
        stage('Build With Docker') {
            withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                steps {
                    script {
                        echo "Building the Docker image..."
                        sh 'docker compose build'
                        sh 'docker push dtluat259/restaurant-app:latest'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def image = 'dtluat259/restaurant-app:latest'
                    echo "Deploying ${image}..."
                    sh "docker compose down"
                    sh "echo y | docker container prune"
                    sh "docker-compose -f docker-compose.deployment.yml up -d"
                }
            }
        }
    }
}