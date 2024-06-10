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
         stage('Docker Build & tag') { 
            steps {
                sh 'docker build -f frontend/Dockerfile -t chucksn611/radioappclient:latest frontend'
                sh 'docker build -f backend/Dockerfile -t chucksn611/radioapi:latest backend'
                sh 'docker tag chucksn611/radioappclient:latest chucksn611/radioappclient:1.0.$BUILD_NUMBER'
                sh 'docker tag chucksn611/radioapi:latest chucksn611/radioapi:1.0.$BUILD_NUMBER'
            }
        }
        stage('Docker login') { 
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-login-cred', passwordVariable: 'PASSWORD', usernameVariable: 'USER_NAME')]) {
                    sh 'echo $PASSWORD | docker login -u $USER_NAME --password-stdin'
                }
            }
        }
        stage('Docker push & logout') { 
            steps {
                sh """
                docker push chucksn611/radioappclient:latest
                docker push chucksn611/radioappclient:1.0.$BUILD_NUMBER
                docker push chucksn611/radioapi:latest
                docker push chucksn611/radioapi:$BUILD_NUMBER
                docker logout
                """
            }
        }
        
        
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
    post {
        always {
            cleanWs()
        }
    }
}
