# Global about the project
VERSION=1.0.0
REPO=alvidir
PROJECT=webpush

proto:
	protoc -I=. ./proto/*.proto \
	--plugin ./node_modules/.bin/protoc-gen-grpc-web \
  	--js_out=import_style=commonjs,binary:./notifier/src

build:
	podman build -t ${REPO}/${PROJECT}:${VERSION}-subscriber -f ./docker/subscriber/dockerfile .
	podman build -t ${REPO}/${PROJECT}:${VERSION}-notifier -f ./docker/notifier/dockerfile .

deploy:
	podman-compose -f docker-compose.yaml up --remove-orphans -d
	# delete -d in order to see output logs

undeploy:
	podman-compose -f docker-compose.yaml down