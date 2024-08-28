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

# Terraform provider version
PROVIDER_VERSION=1.8.3

# Pulumi bridged provider version (this package)
VERSION=1.8.3

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
	sed -e 's/$${VERSION}/${VERSION}/g' \
		-e 's/$${PROVIDER_VERSION}/${PROVIDER_VERSION}/g' package.json.tpl > package.json
	rm sdk/package.json sdk/tsconfig.json
	sed -i -e 's/.\/package.json/..\/package.json/' sdk/utilities.ts
	mkdir -p sdk/scripts
	sed -e 's/$${VERSION}/'v${VERSION}/ install-pulumi-plugin.js > sdk/scripts/install-pulumi-plugin.js

# builds the pulumi terraform bridge
bridge: schema
	cd $(BRIDGE) && go build

# installs the bridge
install: bridge
	cd $(BRIDGE) && go install

# tests a simple pulumi program using this provider
# TODO: currently needs the bridge and provider to be installed
test: install
	cd $(BRIDGE)/test && pulumi up --stack dev

providerversion:
	grep -q "github.com/tetratelabs/terraform-provider-checkmate\s\s*v${PROVIDER_VERSION}" go.mod || (echo go.mod tf provider version does not match && false)
	grep -q "\sTFProviderVersion:.*${PROVIDER_VERSION}" provider/resources.go || (echo provider/resources.go tf provider version does not match && false)
	grep -q "\sVersion:.*${VERSION}" provider/resources.go || (echo provider/resources.go version does not match && false)

versioncheck: providerversion
	grep -q '"version": "'${VERSION} package.json || (echo package.json version does not match && false)
	grep -q "v${VERSION}" sdk/scripts/install-pulumi-plugin.js || (echo sdk/scripts/install-pulumi-plugin.js version does not match && false)

tagcheck: versioncheck
	git tag --points-at HEAD | grep -q v${VERSION} || (echo tag does not match specified version && false)

check: licenser
	[ -z "`git status -uno --porcelain`" ] || (git status && echo 'Check failed. This could be a failed check or dirty git state.'; exit 1)
