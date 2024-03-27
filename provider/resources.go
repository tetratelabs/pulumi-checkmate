// Copyright 2023 Tetrate
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package check

import (
	_ "embed"
	"unicode"

	framework "github.com/hashicorp/terraform-plugin-framework/provider"
	tfpfbridge "github.com/pulumi/pulumi-terraform-bridge/pf/tfbridge"
	"github.com/pulumi/pulumi-terraform-bridge/v3/pkg/tfbridge"
	"github.com/pulumi/pulumi/sdk/v3/go/common/tokens"

	provider "github.com/tetratelabs/terraform-provider-checkmate/pkg"
)

const checkPkg = "checkmate"
const checkMod = "index"

func getProvider() framework.Provider {
	return provider.NewProvider()
}

func checkMember(mod string, mem string) tokens.ModuleMember {
	return tokens.ModuleMember(checkPkg + ":" + mod + ":" + mem)
}

func checkType(mod string, typ string) tokens.Type {
	return tokens.Type(checkMember(mod, typ))
}

func checkResourceTok(mod string, res string) tokens.Type {
	fn := string(unicode.ToLower(rune(res[0]))) + res[1:]
	return checkType(mod+"/"+fn, res)
}

func Provider() tfbridge.ProviderInfo {
	return tfbridge.ProviderInfo{
        P: tfpfbridge.ShimProvider(provider.NewProvider()),
		Name:              "checkmate",
		GitHubOrg:         "tetratelabs",
		TFProviderVersion: "1.7.0",
		Version:           "1.7.0",
		Resources: map[string]*tfbridge.ResourceInfo{
			"checkmate_http_health":   {Tok: checkResourceTok(checkMod, "HttpHealth")},
			"checkmate_local_command": {Tok: checkResourceTok(checkMod, "LocalCommand")},
			"checkmate_tcp_echo":      {Tok: checkResourceTok(checkMod, "TcpEcho")},
		},
		JavaScript: &tfbridge.JavaScriptInfo{
			PackageName: "@tetratelabs/pulumi-checkmate",
			Dependencies: map[string]string{
				"@pulumi/pulumi": "^3.0.0",
			},
			DevDependencies: map[string]string{
				"@types/node": "^10.0.0", // so we can access strongly typed node definitions.
			},
		},
        MetadataInfo: tfbridge.NewProviderMetadata([]byte{}),
	}
}
