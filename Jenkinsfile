pipeline {
    agent any

    stages {
        stage('Build With Docker') {
            steps {
                sh 'docker compose up --build -d'
            }
        }
    }
}