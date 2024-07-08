pipeline {
    agent { label 'ssh-agent' }
    tools {
        maven 'maven-3.9.8' 
    }
   
    environment {
        scannerHome = tool 'sonar-scanner-6.1.0'
        PATH = "${scannerHome}/bin:${PATH}"   
    }
    stages {
        stage('Git Checkout') {
            steps {
                git 'https://github.com/chucksn/radio-app-full-stack.git'
            }
        }
         stage('Docker Build & tag (Development)') { 
            steps {
                sh """
                docker build -f frontend-app/Dockerfile -t chucksn611/radioappclient:latest . \
                docker build -f backend-app/Dockerfile -t chucksn611/radioapi:latest . \
                docker tag chucksn611/radioappclient:latest chucksn611/radioappclient:${BRANCH_NAME} \
                docker tag chucksn611/radioapi:latest chucksn611/radioapi:${BRANCH_NAME} 
                """
            }
        }
        // stage('Docker login') { 
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: 'docker-login-cred', passwordVariable: 'PASSWORD', usernameVariable: 'USER_NAME')]) {
        //             sh 'echo $PASSWORD | docker login -u $USER_NAME --password-stdin'
        //         }
        //     }
        // }
        // stage('Docker push & logout') { 
        //     steps {
        //         sh """
        //         docker push chucksn611/radioappclient:latest
        //         docker push chucksn611/radioappclient:1.0.$BUILD_NUMBER
        //         docker push chucksn611/radioapi:latest
        //         docker push chucksn611/radioapi:$BUILD_NUMBER
        //         docker logout
        //         """
        //     }
        // }
        
        
        stage('Code Quality Analysis (sonarQube)') { 
            steps {
                withSonarQubeEnv('sonarqube-server') {
                    sh 'sonar-scanner'
                }
                
            }
        }
        stage('Quality Gate') { 
            steps {
                timeout(time: 1, unit: 'HOURS') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
