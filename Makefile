# Global about the project
VERSION=0.1.0
REPO=alvidir
PROJECT=webpush

proto:
	protoc --go_out=plugins=grpc:. --go_opt=paths=source_relative proto/notification.proto
	protoc --go_out=plugins=grpc:. --go_opt=paths=source_relative proto/receiver.proto
	protoc --go_out=plugins=grpc:. --go_opt=paths=source_relative proto/sender.proto

build:
	podman build -t ${REPO}/${PROJECT}:${VERSION}-envoy -f ./docker/envoy/dockerfile .
	podman build -t ${REPO}/${PROJECT}:${VERSION}-sender -f ./docker/sender/dockerfile .
	podman build -t ${REPO}/${PROJECT}:${VERSION}-receiver -f ./docker/receiver/dockerfile .

deploy:
	podman-compose -f docker-compose.yaml up --remove-orphans -d
	# delete -d in order to see output logs

undeploy:
	podman-compose -f docker-compose.yaml down

test:
	go test -v -race ./...

gomod:
	go mod tidy