#!/usr/bin/env node
"use strict";
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileOperationHelper_1 = require("../lib/util/fileOperationHelper");
const pathsConstants_1 = require("../lib/util/PathsConstants");
const config = require("../lib/config");
const nodePath = require("path");
module.exports = (function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield modifyPackageJson();
        yield config.checkConfiguration();
    });
}());
// 调整package.json文件
function modifyPackageJson() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let pathToPackageJson = pathsConstants_1.path.getPackageJsonFile();
            let packageJson = yield fileOperationHelper_1.default.readTextFromFile(pathToPackageJson);
            let packageJsonParsed = JSON.parse(packageJson);
            let instrumentOpenRUMValue = "node " + nodePath.relative(pathsConstants_1.path.getApplicationPath(), nodePath.join(__dirname, "instrument.js"));
            if (packageJsonParsed.scripts === undefined) {
                packageJsonParsed.scripts = {};
            }
            if (packageJsonParsed.scripts.instrumentOpenRUM === instrumentOpenRUMValue) {
                console.warn("No need to modify the package.json as it already includes the instrument OpenRUM script!");
            }
            else {
                packageJsonParsed.scripts.instrumentOpenRUM = instrumentOpenRUMValue;
                yield fileOperationHelper_1.default.writeTextToFile(pathToPackageJson, JSON.stringify(packageJsonParsed, null, "\t"));
                console.info("Modified package.json - You are now able to call npm run instrument OpenRUM!");
            }
        }
        catch (e) {
           console.error("Could not find package.json - please add instrument OpenRUM script manually!");
        }
    });
}
