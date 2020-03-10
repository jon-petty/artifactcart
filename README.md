# Description

This is a sample cart.

## Getting Started

### Prerequisites
The following need to be installed to run this sample.

* [Docker](https://docs.docker.com/install/linux/docker-ce/debian/)
* [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)
* [Skaffold](https://skaffold.dev/docs/install/)
* [Kustomize](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/INSTALL.md)

### Starting the sample

When everything is installed, go into the project directory, launch Minikube, and then launch the environment 
with Skaffold.

```shell script
sudo minikube start
sudo skaffold dev
``` 

You can tell if it's running by checking your kubernetes environment. Note that everything should be 
in the `artifactcart-jp` namespace.

There should be two pods, two services, and an ingress.

```shell script
jpetty@ubuntu:~/src/artifact_cart$ sudo kubectl config set-context --current --namespace=artifactcart-jp

jpetty@ubuntu:~/src/artifact_cart$ sudo kubectl get all
NAME                                         READY   STATUS    RESTARTS   AGE
pod/artifactcart-selenium-765d5bf88b-5q8wg   1/1     Running   0          16s
pod/artifactcart-web-db77d8687-rd4wz         1/1     Running   0          16s

NAME                            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)             AGE
service/artifactcart-selenium   ClusterIP   10.96.202.191    <none>        4444/TCP,5900/TCP   16s
service/artifactcart-web        ClusterIP   10.108.172.174   <none>        80/TCP              16s

NAME                                    READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/artifactcart-selenium   1/1     1            1           16s
deployment.apps/artifactcart-web        1/1     1            1           16s

NAME                                               DESIRED   CURRENT   READY   AGE
replicaset.apps/artifactcart-selenium-765d5bf88b   1         1         1       16s
replicaset.apps/artifactcart-web-db77d8687         1         1         1       16s

jpetty@ubuntu:~/src/artifact_cart$ sudo kubectl get ingress
NAME          HOSTS              ADDRESS         PORTS   AGE
web-ingress   artifactcart.com   192.168.1.180   80      52s
```

The last step is to edit your `/etc/hosts` file to point to the Kubernetes ingress. First get the 
IP address, in the following example it's `192.168.1.80`.

```shell script
jpetty@ubuntu:~/src/artifact_cart$ sudo kubectl get ingress
NAME          HOSTS              ADDRESS         PORTS   AGE
web-ingress   artifactcart.com   192.168.1.180   80      52s
```

Then add `192.168.1.180 artifactcart.com` to your `/etc/hosts` file. Replace the IP address with whatever
yours happens to be.

The sample is now hosted at [http://artifactcart.com/artifactcart.html](http://artifactcart.com/artifactcart.html)

## Running unit tests

List the pods

```shell script
jpetty@ubuntu:~/src/artifact_cart$ sudo kubectl get pods
NAME                                     READY   STATUS    RESTARTS   AGE
artifactcart-selenium-765d5bf88b-5q8wg   1/1     Running   0          5m28s
artifactcart-web-db77d8687-rd4wz         1/1     Running   0          5m28s
```

Login to the `artifactcart-web` pod. In this example, it's the following.

```shell script
jpetty@ubuntu:~/src/artifact_cart$ sudo kubectl exec -it artifactcart-web-db77d8687-rd4wz bash
root@artifactcart-web-db77d8687-rd4wz:/usr/src/app/artifactcart#
```

Then run the unit tests with `npm run test`.

```shell script
root@artifactcart-web-db77d8687-rd4wz:/usr/src/app/artifactcart# npm run test
npm WARN npm npm does not support Node.js v10.15.2
npm WARN npm You should probably upgrade to a newer version of node as we
npm WARN npm can't make any promises that npm will work with this version.
npm WARN npm Supported releases of Node.js are the latest release of 4, 6, 7, 8, 9.
npm WARN npm You can find the latest version at https://nodejs.org/

> artifactcart@1.0.0 test /usr/src/app/artifactcart
> jest

 PASS  src/js/components/ArtifactCart.test.js
  ✓ Adds items to the cart (172ms)
  ✓ Updates the cart total (60ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.02s
Ran all test suites.
```

## Rebuild files after you change them

Skaffold copies files into the containers automatically, but it doesn't rebuild files right now.
Run the following command to rebuild everything.

```bash script
npm run build && cp -r dist/* /usr/share/nginx/html/. && cp src/html/artifactcart.html /usr/share/nginx/html/.
```

## Important file locations

* Kubernetes configuration
  * /config/kubernetes
* Applcation docker file
  * /artifactcart/Docker
* React files
  * /artifactcart/artifactcart
  
## Notes

* The headless selenium browser isn't used yet