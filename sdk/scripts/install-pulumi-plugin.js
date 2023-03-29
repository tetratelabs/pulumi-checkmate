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

"use strict";
var childProcess = require("child_process");

var args = process.argv.slice(2);

if (args.indexOf("v1.2.2") !== -1) {
	process.exit(0);
}

var res = childProcess.spawnSync("pulumi", ["plugin", "install"].concat(args), {
    stdio: ["ignore", "inherit", "inherit"]
});

if (res.error && res.error.code === "ENOENT") {
    console.error("\nThere was an error installing the resource provider plugin. " +
            "It looks like `pulumi` is not installed on your system. " +
            "Please visit https://pulumi.com/ to install the Pulumi CLI.\n" +
            "You may try manually installing the plugin by running " +
            "`pulumi plugin install " + args.join(" ") + "`");
} else if (res.error || res.status !== 0) {
    console.error("\nThere was an error installing the resource provider plugin. " +
            "You may try to manually installing the plugin by running " +
            "`pulumi plugin install " + args.join(" ") + "`");
}

process.exit(0);
