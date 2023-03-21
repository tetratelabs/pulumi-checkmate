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

VERSION=1.0.1

default: build

build: schema bridge sdk

TFGEN=provider/cmd/pulumi-tfgen-checkmate
BRIDGE=provider/cmd/pulumi-resource-checkmate

# generates the provider schema
schema: providerversion
	cd $(TFGEN) && go run main.go schema -o ../pulumi-resource-checkmate

licenser:
	licenser apply Tetrate -r

# generates the typescript package for using the provider
# this requires the provider to be installed in $PATH
sdk: schema sdk.nodejs licenser

sdk.nodejs:
	cd $(TFGEN) && go run main.go nodejs -o ../../../sdk
	rm sdk/package.json sdk/tsconfig.json
	sed -i -e 's/.\/package.json/..\/package.json/' sdk/utilities.ts
	sed -i -e 's/$${VERSION}/'v${VERSION}/ sdk/scripts/install-pulumi-plugin.js

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

make providerversion:
	grep -q "\sVersion:.*${VERSION}" provider/resources.go || (echo provider/resources.go version does not match && false)

versioncheck: providerversion
	grep -q '"version": "'${VERSION} package.json || (echo package.json version does not match && false)
	grep -q "v${VERSION}" sdk/scripts/install-pulumi-plugin.js || (echo sdk/scripts/install-pulumi-plugin.js version does not match && false)

tagcheck: versioncheck
	git tag --points-at HEAD | grep -q v${VERSION} || (echo tag does not match specified version && false)
