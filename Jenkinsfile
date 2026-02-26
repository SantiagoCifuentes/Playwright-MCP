pipeline {
    agent any

    parameters {
        booleanParam(name: 'SMOKE', defaultValue: false, description: 'Set to true to run only smoke tests (@smoke)')
    }

    options {
        // discard old builds, keep last 10
        buildDiscarder(logRotator(numToKeepStr: '10'))
        // add timestamps to console output
        timestamps()
        // overall pipeline timeout
        timeout(time: 30, unit: 'MINUTES')
    }

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
                script {
                    def cmd = 'npx playwright test --project=chromium --project=firefox' // //using only chromium and firefox.. for what I have read for some reason webkit is unstable in windows, so I will not use it for now, but it can be added if needed
            }
                    if (params.SMOKE) {
                        echo 'Running smoke tests only'
                        cmd += ' --grep @smoke'
                    }
                    bat cmd
                }
            }
        }

    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', fingerprint: true
            echo 'Pipeline finished.'
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
        failure {
            echo 'Tests failed.'
        }
        success {
            echo 'All tests passed.'
        }
    }
}