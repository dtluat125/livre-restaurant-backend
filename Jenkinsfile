pipeline {
    agent {
        docker {
            image 'khaliddinh/ansible'
        }
    }

    stages {
        stage('Build With Docker') {
                steps {

            withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
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
            stages {

        stage('Deploy to remote server') { 
            steps {
                withCredentials([file(credentialsId: 'livre-restaurant-ec2-backend', variable: 'ansible_key')]) {
                script
                {
                    echo 'Deploy to Remote server...'
                    sh 'ls -la'
                    sh "cp /$ansible_key ansible_key"
                    sh 'cat ansible_key'
                    sh 'ansible --version'
                    sh 'ls -la'
                    sh 'chmod 400 ansible_key '
                    sh 'ansible-playbook -i hosts --private-key ansible_key playbook.yml'}
                }
            }
        }
        
    }

    }
}
post {
    // Clean after build
    always {
        cleanWs()
    }
}