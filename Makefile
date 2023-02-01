default: build

build: schema bridge sdk

# generates the provider schema
schema:
	cd provider/cmd/pulumi-tfgen-check && go run main.go schema -o ../pulumi-resource-check

# generates the typescript package for using the provider
# this requires the provider to be installed in $PATH
sdk: schema
	cd provider/cmd/pulumi-tfgen-check && go run main.go nodejs -o ../../../sdk

# builds the pulumi terraform bridge
bridge: schema
	cd provider/cmd/pulumi-resource-check && go build

# installs the bridge
install: bridge
	cd provider/cmd/pulumi-resource-check && go install

# tests a simple pulumi program using this provider
# TODO: currently needs the bridge and provider to be installed
test: bridge
	cd provider/cmd/pulumi-resource-check/test && pulumi up --stack dev