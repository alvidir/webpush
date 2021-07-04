# Global about the project
VERSION=1.0.0
REPO=alvidir
PROJECT=webpush-notifier

proto:
	protoc -I=. ./proto/*.proto \
	--js_out=import_style=commonjs,binary:./src \
	--grpc_out=./src \
	--plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
	
	protoc -I=. ./proto/*.proto \
	--plugin ./node_modules/.bin/protoc-gen-ts \
	--plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_ts \
	--ts_out=import_style=typescript,binary:./src
	
build:
	podman build -t ${REPO}/${PROJECT}:${VERSION} -f ./dockerfile .

deploy:
	podman-compose -f docker-compose.yaml up --remove-orphans
	# delete -d in order to see output logs

undeploy:
	podman-compose -f docker-compose.yaml down