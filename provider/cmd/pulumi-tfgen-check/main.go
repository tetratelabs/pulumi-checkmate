package main

import (
	"github.com/pulumi/pulumi-terraform-bridge/pkg/tfpfbridge/tfgen"

	checkmate "github.com/tetratelabs/pulumi-checkmate/provider"
)

func main() {
	tfgen.Main("check", "0.0.1", checkmate.Provider())
}
