# Global about the project
VERSION=1.0.0
REPO=alvidir
PROJECT=webpush-notifier

proto:
	protoc -I=. ./proto/*.proto \
	--plugin ./node_modules/.bin/protoc-gen-grpc-web \
  	--js_out=import_style=commonjs,binary:./notifier/src

build:
	podman build -t ${REPO}/${PROJECT}:${VERSION} -f ./docker/dockerfile .

deploy:
	podman-compose -f docker-compose.yaml up --remove-orphans -d
	# delete -d in order to see output logs

undeploy:
	podman-compose -f docker-compose.yaml down