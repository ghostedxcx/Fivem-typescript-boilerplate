const esBundle = require('esbuild');


function randomFileId(number) {
  return Math.floor(Math.random() * number);
}

const bundle_ent = [
  {
    target: "node14",
    entryPoints: ["./src/server/main.ts"],
    platform: "node",
    outfile: `./build/server/sv_${randomFileId(4000)}.js`,
  },
  {
    target: "es2020",
    entryPoints: ["./src/client/main.ts"],
    outfile: `./build/client/cl_${randomFileId(2000)}.js`,
  },
];

const bundle = async () => {
  try {
    const baseOptions = {
      logLevel: "info",
      bundle: true,
      charset: "utf8",
      minifyWhitespace: true,
      absWorkingDir: process.cwd(),
    };

    for (const targetOpts of bundle_ent) {
      const Options = { ...baseOptions, ...targetOpts };


      const { errors } = await esBundle.build(Options);

      if (errors.length) {
        console.error(`[ESBuild] Bundle failed with ${errors.length} errors`);
        process.exit(1);
      }
    }
  } catch (e) {
    console.log("[ESBuild] Build failed with error");
    console.error(e);
    process.exit(1);
  }
};

bundle().catch(() => process.exit(1));