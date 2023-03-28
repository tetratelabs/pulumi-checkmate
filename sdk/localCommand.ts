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

// *** WARNING: this file was generated by the Pulumi Terraform Bridge (tfgen) Tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as pulumi from "@pulumi/pulumi";
import * as utilities from "./utilities";

export class LocalCommand extends pulumi.CustomResource {
    /**
     * Get an existing LocalCommand resource's state with the given name, ID, and optional extra
     * properties used to qualify the lookup.
     *
     * @param name The _unique_ name of the resulting resource.
     * @param id The _unique_ provider ID of the resource to lookup.
     * @param state Any extra arguments used during the lookup.
     * @param opts Optional settings to control the behavior of the CustomResource.
     */
    public static get(name: string, id: pulumi.Input<pulumi.ID>, state?: LocalCommandState, opts?: pulumi.CustomResourceOptions): LocalCommand {
        return new LocalCommand(name, <any>state, { ...opts, id: id });
    }

    /** @internal */
    public static readonly __pulumiType = 'checkmate:index/localCommand:LocalCommand';

    /**
     * Returns true if the given object is an instance of LocalCommand.  This is designed to work even
     * when multiple copies of the Pulumi SDK have been loaded into the same process.
     */
    public static isInstance(obj: any): obj is LocalCommand {
        if (obj === undefined || obj === null) {
            return false;
        }
        return obj['__pulumiType'] === LocalCommand.__pulumiType;
    }

    /**
     * The command to run (passed to `sh -c`)
     */
    public readonly command!: pulumi.Output<string>;
    /**
     * Timeout for an individual attempt. If exceeded, the attempt will be considered failure and potentially retried. Default
     * 5000ms
     */
    public readonly commandTimeout!: pulumi.Output<number>;
    /**
     * Number of consecutive successes required before the check is considered successful overall. Defaults to 1.
     */
    public readonly consecutiveSuccesses!: pulumi.Output<number>;
    /**
     * If false, the resource will fail to create if the check does not pass. If true, the resource will be created anyway.
     * Defaults to false.
     */
    public readonly createAnywayOnCheckFailure!: pulumi.Output<boolean | undefined>;
    /**
     * Interval in milliseconds between attemps. Default 200
     */
    public readonly interval!: pulumi.Output<number>;
    /**
     * True if the check passed
     */
    public /*out*/ readonly passed!: pulumi.Output<boolean>;
    /**
     * Standard error output of the command
     */
    public /*out*/ readonly stderr!: pulumi.Output<string>;
    /**
     * Standard output of the command
     */
    public /*out*/ readonly stdout!: pulumi.Output<string>;
    /**
     * Overall timeout in milliseconds for the check before giving up, default 10000
     */
    public readonly timeout!: pulumi.Output<number>;
    /**
     * Working directory where the command will be run. Defaults to the current working directory
     */
    public readonly workingDirectory!: pulumi.Output<string>;

    /**
     * Create a LocalCommand resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args: LocalCommandArgs, opts?: pulumi.CustomResourceOptions)
    constructor(name: string, argsOrState?: LocalCommandArgs | LocalCommandState, opts?: pulumi.CustomResourceOptions) {
        let resourceInputs: pulumi.Inputs = {};
        opts = opts || {};
        if (opts.id) {
            const state = argsOrState as LocalCommandState | undefined;
            resourceInputs["command"] = state ? state.command : undefined;
            resourceInputs["commandTimeout"] = state ? state.commandTimeout : undefined;
            resourceInputs["consecutiveSuccesses"] = state ? state.consecutiveSuccesses : undefined;
            resourceInputs["createAnywayOnCheckFailure"] = state ? state.createAnywayOnCheckFailure : undefined;
            resourceInputs["interval"] = state ? state.interval : undefined;
            resourceInputs["passed"] = state ? state.passed : undefined;
            resourceInputs["stderr"] = state ? state.stderr : undefined;
            resourceInputs["stdout"] = state ? state.stdout : undefined;
            resourceInputs["timeout"] = state ? state.timeout : undefined;
            resourceInputs["workingDirectory"] = state ? state.workingDirectory : undefined;
        } else {
            const args = argsOrState as LocalCommandArgs | undefined;
            if ((!args || args.command === undefined) && !opts.urn) {
                throw new Error("Missing required property 'command'");
            }
            resourceInputs["command"] = args ? args.command : undefined;
            resourceInputs["commandTimeout"] = args ? args.commandTimeout : undefined;
            resourceInputs["consecutiveSuccesses"] = args ? args.consecutiveSuccesses : undefined;
            resourceInputs["createAnywayOnCheckFailure"] = args ? args.createAnywayOnCheckFailure : undefined;
            resourceInputs["interval"] = args ? args.interval : undefined;
            resourceInputs["timeout"] = args ? args.timeout : undefined;
            resourceInputs["workingDirectory"] = args ? args.workingDirectory : undefined;
            resourceInputs["passed"] = undefined /*out*/;
            resourceInputs["stderr"] = undefined /*out*/;
            resourceInputs["stdout"] = undefined /*out*/;
        }
        opts = pulumi.mergeOptions(utilities.resourceOptsDefaults(), opts);
        super(LocalCommand.__pulumiType, name, resourceInputs, opts);
    }
}

/**
 * Input properties used for looking up and filtering LocalCommand resources.
 */
export interface LocalCommandState {
    /**
     * The command to run (passed to `sh -c`)
     */
    command?: pulumi.Input<string>;
    /**
     * Timeout for an individual attempt. If exceeded, the attempt will be considered failure and potentially retried. Default
     * 5000ms
     */
    commandTimeout?: pulumi.Input<number>;
    /**
     * Number of consecutive successes required before the check is considered successful overall. Defaults to 1.
     */
    consecutiveSuccesses?: pulumi.Input<number>;
    /**
     * If false, the resource will fail to create if the check does not pass. If true, the resource will be created anyway.
     * Defaults to false.
     */
    createAnywayOnCheckFailure?: pulumi.Input<boolean>;
    /**
     * Interval in milliseconds between attemps. Default 200
     */
    interval?: pulumi.Input<number>;
    /**
     * True if the check passed
     */
    passed?: pulumi.Input<boolean>;
    /**
     * Standard error output of the command
     */
    stderr?: pulumi.Input<string>;
    /**
     * Standard output of the command
     */
    stdout?: pulumi.Input<string>;
    /**
     * Overall timeout in milliseconds for the check before giving up, default 10000
     */
    timeout?: pulumi.Input<number>;
    /**
     * Working directory where the command will be run. Defaults to the current working directory
     */
    workingDirectory?: pulumi.Input<string>;
}

/**
 * The set of arguments for constructing a LocalCommand resource.
 */
export interface LocalCommandArgs {
    /**
     * The command to run (passed to `sh -c`)
     */
    command: pulumi.Input<string>;
    /**
     * Timeout for an individual attempt. If exceeded, the attempt will be considered failure and potentially retried. Default
     * 5000ms
     */
    commandTimeout?: pulumi.Input<number>;
    /**
     * Number of consecutive successes required before the check is considered successful overall. Defaults to 1.
     */
    consecutiveSuccesses?: pulumi.Input<number>;
    /**
     * If false, the resource will fail to create if the check does not pass. If true, the resource will be created anyway.
     * Defaults to false.
     */
    createAnywayOnCheckFailure?: pulumi.Input<boolean>;
    /**
     * Interval in milliseconds between attemps. Default 200
     */
    interval?: pulumi.Input<number>;
    /**
     * Overall timeout in milliseconds for the check before giving up, default 10000
     */
    timeout?: pulumi.Input<number>;
    /**
     * Working directory where the command will be run. Defaults to the current working directory
     */
    workingDirectory?: pulumi.Input<string>;
}
