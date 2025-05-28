"use strict";

require("./check-versions")();

process.env.NODE_ENV = "production";

const webpackConfig = require("./webpack.prod.conf");
const config = require("../config");
const chalk = require("chalk");
const ora = require("ora");
const path = require("path");
const rm = require("rimraf");
const webpack = require("webpack");

const spinner = ora("Building for production...");

spinner.start();

rm(
    path.join(config.build.assetsRoot, config.build.assetsSubDirectory),
    (error) => {
        if (error) {
            throw error;
        }

        webpack(webpackConfig, (error, stats) => {
            spinner.stop();

            if (error) {
                throw error;
            }

            process.stdout.write(
                stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false,
                }) + "\n\n",
            );

            if (stats.hasErrors()) {
                console.log(chalk.red("    Build failed with errors.\n"));

                process.exit(1);
            }

            console.log(chalk.cyan("    Build complete.\n"));

            console.log(
                chalk.yellow(
                    "    Tip: Built files are meant to be served over an HTTP server.\n" +
                        "    Opening index.html over file:// won't work.\n",
                ),
            );
        });
    },
);
