pipeline {
    agent any

    environment {
        // Docker Hub credentials (stored in Jenkins credentials)
        DOCKER_HUB_CREDENTIALS = credentials('devsecops')
        IMAGE_NAME = 'shayfeld/devsecopsgames'
        SSH_CREDENTIALS = credentials('aws-ec2-ssh-key')
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Clone Git Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/shayfeld/DevSecOpsGmaesApp.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    sh "echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin"
                    sh "docker push ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                 // Use the SSH credentials stored in the environment variable
                withCredentials([sshUserPrivateKey(credentialsId: 'aws-ec2-ssh-key', keyFileVariable: 'SSH_KEY', usernameVariable: 'SSH_USER')]) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" ubuntu@3.120.187.182 << 'EOF'
                        
                        echo "Stopping and removing any existing container..."
                        sudo docker stop games || true
                        sudo docker rm games || true
                        
                        echo "Stopping and removing any existing images..."
                        sudo docker rmi shayfeld/devsecopsgames:latest
                        
                        echo "Pulling Docker image from Docker Hub..."
                        sudo docker pull ${IMAGE_NAME}:latest
                        
                        echo "Running Docker container..."
                        sudo docker run -d --name games -p 5000:5000 --restart always shayfeld/devsecopsgames:latest
                        
                        echo "test"
                        exit
                        EOF
                        '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for more details.'
        }
    }
}
