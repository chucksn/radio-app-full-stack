pipeline {
    agent any
    tools {
        maven 'default' 
    }
    environment {
        scannerHome = tool 'sonar-scanner-5.0.1'
        dockerHome = tool 'docker-latest'
        PATH = "${dockerHome}/bin:${scannerHome}/bin:${PATH}"
        SONAR_HOST = credentials('sonarqube-host')
        SONAR_TEST_PROJ_TOKEN = credentials('sonarqube-test-project-1')
        
    }
    stages {
        stage('Git Checkout') {
            steps {
                git 'https://github.com/chucksn/radio-app-full-stack.git'
            }
        }
        //  stage('Docker version') { 
        //     steps {
        //         sh 'docker --version'
        //     }
        // }
        // stage('Code Quality Analysis (sonarQube)') { 
        //     steps {
        //         sh "sonar-scanner -Dsonar.projectKey=test-project-1 -Dsonar.sources=. -Dsonar.host.url=${SONAR_HOST} -Dsonar.token=${SONAR_TEST_PROJ_TOKEN}"
        //     }
        // }
        stage('Maven version') { 
            steps {
                sh 'mvn --version'
            }
        }
    }
}
