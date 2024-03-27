# Checkmate Provider for Pulumi

Make "readiness" a resource.

Generated from the [checkmate](https://github.com/tetratelabs/terraform-provider-checkmate) terraform provider

## Updating
To update the terraform provider version, you need to edit 3 files:
* `Makefile`
* `go.mod`
* `provider/resources.go`

And then run `make`. If any of the versions are mistmatched, make should fail and print a message indicating which file.

## Publishing
Run `git tag v{new version}` and push.
You can run `make tagcheck` to double check that the tag matches the provider version.
