# Use the official Jenkins LTS image as a base
FROM jenkins/jenkins:lts

# Switch to root user to install Node.js and npm
USER root

# Install Node.js and npm
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Switch back to the Jenkins user
USER jenkins

# Set the working directory
WORKDIR /var/jenkins_home
