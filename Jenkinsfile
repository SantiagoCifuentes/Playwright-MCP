pipeline {
    agent any

    tools {
        nodejs "NODEJS"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx playwright test'
            }
        }

    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
            echo 'Pipeline finished.'
        }
        failure {
            echo 'Tests failed.'
        }
        success {
            echo 'All tests passed.'
        }
    }
}