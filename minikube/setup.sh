kubectl create deployment hello-node --image=gcr.io/hello-minikube-zero-install/hello-node;
kubectl expose deployment hello-node --type=LoadBalancer --port=8080;
minikube service hello-node
