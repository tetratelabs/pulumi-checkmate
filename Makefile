# Copyright 2023 Tetrate
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

default: build

build: schema bridge sdk

TFGEN=provider/cmd/pulumi-tfgen-checkmate
BRIDGE=provider/cmd/pulumi-resource-checkmate

# generates the provider schema
schema:
	cd $(TFGEN) && go run main.go schema -o ../pulumi-resource-checkmate

# generates the typescript package for using the provider
# this requires the provider to be installed in $PATH
sdk: schema
	cd $(TFGEN) && go run main.go nodejs -o ../../../sdk

# builds the pulumi terraform bridge
bridge: schema
	cd $(BRIDGE) && go build

# installs the bridge
install: bridge
	cd $(BRIDGE) && go install

# tests a simple pulumi program using this provider
# TODO: currently needs the bridge and provider to be installed
test: bridge
	cd $(BRIDGE)/test && pulumi up --stack dev
