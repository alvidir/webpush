# Global about the project
VERSION=0.1.0
REPO=alvidir
PROJECT=webpush

proto:
	protoc --go_out=plugins=grpc:. --go_opt=paths=source_relative proto/notification.proto
	protoc --go_out=plugins=grpc:. --go_opt=paths=source_relative proto/notifier.proto

build:
	podman build -t ${REPO}/${PROJECT}:${VERSION}-subscriber -f ./docker/subscriber/dockerfile .
	podman build -t ${REPO}/${PROJECT}:${VERSION}-notifier -f ./docker/notifier/dockerfile .

deploy:
	podman-compose -f docker-compose.yaml up --remove-orphans -d
	# delete -d in order to see output logs

undeploy:
	podman-compose -f docker-compose.yaml down

test:
	go test -v -race ./...

gomod:
	go mod tidy