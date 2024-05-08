pipeline {
    agent {
        docker {
            image 'ansible/ansible:default'

        }
    }

    stages {
        stage('Build With Docker') {
                steps {

            withDockerRegistry(credentialsId: 'dockerhub', url: 'https://index.docker.io/v1/') {
                    script {
                        echo "Building the Docker image..."
                        sh 'sudo docker compose build'
                        sh 'sudo docker push dtluat259/restaurant-app:latest'
                    }
            }
                }

        }

        stage('Deploy') {
            steps {
                script {
                    def image = 'dtluat259/restaurant-app:latest'
                    echo "Deploying ${image}..."
                    sh "sudo docker compose down"
                    sh "echo y | sudo docker container prune"
                    // sh "sudo docker compose  -f docker-compose.deployment.yml up -d"
                }
            }
        }

        stage('Deploy to remote server') { 
            steps {
                withCredentials([file(credentialsId: 'livre-restaurant-ec2-backend', variable: 'ansible_key')]) {
                script
                {
                    echo 'Deploy to Remote server...'
                    sh 'sudo ls -la'
                    sh "sudo cp /$ansible_key ansible_key"
                    sh 'sudo cat ansible_key'
                    sh 'ansible --version'
                    sh 'sudo ls -la'
                    sh 'sudo chmod 400 ansible_key '
                    sh 'sudo ansible-playbook -i hosts --private-key ansible_key playbook.yml'}
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