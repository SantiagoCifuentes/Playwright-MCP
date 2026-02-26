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
               bat 'npx playwright test --project=chromium --project=firefox' //using only chromium and firefox.. for what I have read for some reason webkit is unstable in windows, so I will not use it for now, but it can be added if needed
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