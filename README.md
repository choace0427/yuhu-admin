<!-- markdownlint-disable MD014 -->
<!-- markdownlint-disable MD026 -->
<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable MD041 -->

<h1 align="center">
  Yuhu Admin
</h1>

<!-- Link Demo Section -->

### 🛠️ Installation

Before you can start developing your super application, you need to install the project's dependencies.

Move yourself to the root of the project:

```bash
$ cd <NAME-OF-YOUR-GENERATED-REPOSITORY>
```

> For the next steps, choose a package manager of your choice and change the commands contained in the `package.json` scripts. See their documentation for more information:
>
> - [PNPM](https://pnpm.io/pt/cli/add)(Recommand)
> - [NPM](https://docs.npmjs.com/cli/v6/commands)

Install all dependencies of the project:

```bash
# PNPM
$ pnpm install
# NPM
$ npm install
```

### ⌨️ Development

Once all dependencies have been installed, you can run the local development server:

```bash
# PNPM
$ pnpm dev
# NPM
$ npm run dev
```

Now just code!

### 🖥️ Production

After applying the changes, you can generate a build to test and/or deploy to your production environment.

Make a production build:

```bash
# PNPM
$ pnpm build
# NPM
$ npm run build
```

And then run the build:

```bash
# PNPM
$ pnpm start
# NPM
$ npm start
```

<details>
 <summary>View more commands you can use</summary>

 <h4>Lint</h4>

```bash
# PNPM
$ pnpm run lint
# NPM
$ npm run lint
```

 <h4>Lint and Fix</h4>

```bash
# PNPM
$ pnpm run lint:fix
# NPM
$ npm run lint:fix
```

 <h4>Test</h4>

```bash
# PNPM
$ pnpm run test # or pnpm run test:watch
# NPM
$ npm run test # or npm run test:watch
```

 <h4>Type Checking</h4>

```bash
# PNPM
$ pnpm run type-check
# NPM
$ npm run type-check
```

 <h4>Format</h4>

```bash
# PNPM
$ pnpm run format
# NPM
$ npm run format
```

 <h4>Interactive Update Tool</h4>

```bash
# PNPM
$ pnpm run up
# NPM
$ npm run up
```

 <h4>Update All Dependencies</h4>

```bash
# PNPM
$ pnpm run up-latest
# NPM
$ npm run up-latest
```

 <h4>Release As Major Version</h4>

```bash
# PNPM
$ pnpm run release-as-major
# NPM
$ npm run release-as-major
```

 <h4>Release As Minor Version</h4>

```bash
# PNPM
$ pnpm run release-as-minor
# NPM
$ npm run release-as-minor
```

 <h4>Release As Patch Version</h4>

```bash
# PNPM
$ pnpm run release-as-patch
# NPM
$ npm run release-as-patch
```

 <h4>Publish Release</h4>

```bash
# PNPM
$ pnpm run push-release
# NPM
$ npm run push-release
```

 <h4>Get Updates From Remote and Maintain Current Changes</h4>

```bash
# PNPM
$ pnpm run pull
# NPM
$ npm run pull
```

</details>

### ⚙️ Extra Configurations

<details>
 <summary>Why Did You Render</summary>

 <h4>How to Activate</h4>

Put the `babel.config.js` file (located in the path `src/scripts`) in the project root and delete `.babelrc` file.

Uncomment the `wdyr` import line on `pages/_app.tsx`.

That's it! Now you can monitore React re-renders!

 <h4>How to Uninstall</h4>

Just delete the `babel.config.js` and `wdyr.ts` files, remove `wdyr` import line on `pages/_app.tsx` and uninstall it:

```bash
# PNPM
$ pnpm uninstall @welldone-software/why-did-you-render
# NPM
$ npm uninstall @welldone-software/why-did-you-render
```

</details>
