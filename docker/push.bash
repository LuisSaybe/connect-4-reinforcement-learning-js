 echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push luissaybe/connect-4-reinforcement-learning-js:latest
docker logout