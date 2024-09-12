# .newgitignorey

```
# Dependencies
node_modules/

# Compiled output
/dist
/tmp
/out-tsc

# Environment variables
.env

# IDE files
.vscode/
.idea/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Angular cache
.angular/

# System files
.DS_Store
Thumbs.db

# Ignore all files with the .spec extension
*.spec.ts

*.md

#workspace not needed files
backend/src/controllers/credit.controller.ts
backend/src/controllers/credit-package.controller.ts
backend/src/controllers/payment.controller.ts
backend/src/controllers/subscription.controller.ts
backend/src/models/credit-package.model.ts
backend/src/routes/credit-package.routes.ts
backend/src/routes/credit.routes.ts
backend/src/routes/payment.routes.ts
backend/src/routes/subscription.routes.ts
backend/src/services/stripe.service.ts
backend/src/services/subscription-analytics.service.ts

#Frontend files:
frontend/src/app/components/credits/credits.component.ts
frontend/src/app/components/credit-package/credit-package.component.ts
frontend/src/app/components/subscription-management/subscription-management.component.ts
frontend/src/app/services/credit.service.ts
frontend/src/app/services/credit-package.service.ts
frontend/src/app/services/stripe.service.ts
frontend/src/app/services/subscription.service.ts

# Additional files to ignore
frontend/src/app/components/admin/**
backend/src/controllers/admin.controller.ts
backend/src/routes/admin.routes.ts
frontend/src/environments/environment.prod.ts
frontend/e2e/**
backend/test/**
*.log
*.lock
*.bak
*.swp
*.swo

```

# .newgitignore

```
# Dependencies
node_modules/

# Compiled output
/dist
/tmp
/out-tsc

# Environment variables
.env

# IDE files
.vscode/
.idea/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Angular cache
.angular/

# System files
.DS_Store
Thumbs.db

# Ignore all files with the .spec extension
*.spec.ts

*.md

#workspace not needed files
backend/src/controllers/credit.controller.ts
backend/src/controllers/credit-package.controller.ts
backend/src/controllers/payment.controller.ts
backend/src/controllers/subscription.controller.ts
backend/src/models/credit-package.model.ts
backend/src/routes/credit-package.routes.ts
backend/src/routes/credit.routes.ts
backend/src/routes/payment.routes.ts
backend/src/routes/subscription.routes.ts
backend/src/services/stripe.service.ts
backend/src/services/subscription-analytics.service.ts

#Frontend files:
frontend/src/app/components/credits/credits.component.ts
frontend/src/app/components/credit-package/credit-package.component.ts
frontend/src/app/components/subscription-management/subscription-management.component.ts
frontend/src/app/services/credit.service.ts
frontend/src/app/services/credit-package.service.ts
frontend/src/app/services/stripe.service.ts
frontend/src/app/services/subscription.service.ts

# Additional files to ignore
frontend/src/app/components/admin/**
backend/src/controllers/admin.controller.ts
backend/src/routes/admin.routes.ts
frontend/src/environments/environment.prod.ts
frontend/e2e/**
backend/test/**
*.log
*.lock
*.bak
*.swp
*.swo

```

# .gitignore

```
# Dependencies
node_modules/

# Compiled output
/dist
/tmp
/out-tsc

# Environment variables
.env

# IDE files
.vscode/
.idea/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Angular cache
.angular/

# System files
.DS_Store
Thumbs.db
# Ignore all files with the .spec extension
*.spec.ts

*.md

```

# backend/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "declaration": true,
    "typeRoots": ["./node_modules/@types", "./src/types"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}

```

# backend/package.json

```json
{
  "name": "code-input-tracking-platform-backend",
  "version": "1.0.0",
  "description": "Backend for Code-Input Tracking Platform",
  "main": "dist/server.js",
  "scripts": {
    "start": "node dist/server.js",
    "dev": "nodemon src/server.ts",
    "build": "tsc -p .",
    "lint": "eslint . --ext .ts",
    "test": "jest",
    "clean": "rm -rf dist",
    "prebuild": "npm run clean",
    "init-admin": "ts-node scripts/initAdminUser.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "express-rate-limit": "^7.4.0",
    "json2csv": "^6.0.0-alpha.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.5.4",
    "node-cron": "^3.0.3",
    "nodemailer": "^6.9.14",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "qrcode": "^1.5.4",
    "socket.io": "^4.7.5",
    "speakeasy": "^2.0.0",
    "stripe": "^16.8.0",
    "winston": "^3.14.2"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/jest": "^27.0.2",
    "@types/json2csv": "^5.0.7",
    "@types/jsonwebtoken": "^9.0.6",
    "@types/mongoose": "^5.11.97",
    "@types/node": "^16.11.6",
    "@types/node-cron": "^3.0.11",
    "@types/nodemailer": "^6.4.15",
    "@types/passport": "^1.0.16",
    "@types/passport-jwt": "^4.0.1",
    "@types/qrcode": "^1.5.5",
    "@types/speakeasy": "^2.0.10",
    "@typescript-eslint/eslint-plugin": "^5.3.0",
    "@typescript-eslint/parser": "^5.3.0",
    "eslint": "^8.2.0",
    "jest": "^27.3.1",
    "nodemon": "^3.1.4",
    "ts-jest": "^27.0.7",
    "ts-node": "^10.4.0",
    "typescript": "^4.4.4"
  }
}

```

# frontend/tsconfig.spec.json

```json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine"
    ]
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}

```

# frontend/tsconfig.json

```json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": false,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "forceConsistentCasingInFileNames": true,
    "lib": [
      "ES2022",
      "dom"
    ]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

```

# frontend/tsconfig.app.json

```json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": [
      "node"
    ]
  },
  "files": [
    "src/main.ts",
    "src/main.server.ts",
    "server.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}

```

# frontend/tailwind.config.js

```js
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'media', // or 'class' if you prefer to toggle dark mode manually
  theme: {
    extend: {
      colors: {
        primary: '#ff5722',
        secondary: '#4caf50',
        accent: '#9c27b0',
        // Add more custom colors as needed
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

# frontend/server.ts

```ts
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();

```

# frontend/postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

# frontend/package.json

```json
{
  "name": "frontend",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "serve:ssr:frontend": "node dist/frontend/server/server.mjs"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^18.1.3",
    "@angular/cdk": "^18.1.3",
    "@angular/common": "^18.0.0",
    "@angular/compiler": "^18.0.0",
    "@angular/core": "^18.2.0",
    "@angular/forms": "^18.0.0",
    "@angular/material": "^18.2.0",
    "@angular/platform-browser": "^18.0.0",
    "@angular/platform-browser-dynamic": "^18.0.0",
    "@angular/platform-server": "^18.0.0",
    "@angular/router": "^18.0.0",
    "@angular/ssr": "^18.0.6",
    "@auth0/angular-jwt": "^5.2.0",
    "@monaco-editor/react": "^4.6.0",
    "@ngrx/effects": "^18.0.2",
    "@ngrx/entity": "^18.0.2",
    "@ngrx/store": "^18.0.2",
    "@ngrx/store-devtools": "^18.0.2",
    "@ngx-translate/core": "^15.0.0",
    "@stripe/stripe-js": "^4.3.0",
    "express": "^4.18.2",
    "monaco-editor": "^0.50.0",
    "ngx-translate": "github:ngx-translate/core",
    "rxjs": "^7.8.1",
    "socket.io-client": "^4.7.5",
    "stripe": "^16.8.0",
    "tslib": "^2.6.3",
    "ws": "^8.18.0",
    "zone.js": "~0.14.3"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^18.0.6",
    "@angular/cli": "^18.2.0",
    "@angular/compiler-cli": "^18.0.0",
    "@types/bonjour": "^3.5.13",
    "@types/cookie": "^0.6.0",
    "@types/eslint-scope": "^3.7.7",
    "@types/express": "^4.17.17",
    "@types/jasmine": "~5.1.0",
    "@types/node": "^18.18.0",
    "autoprefixer": "^10.4.20",
    "jasmine-core": "~5.1.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "postcss": "^8.4.41",
    "postcss-loader": "^8.1.1",
    "tailwindcss": "^3.4.10",
    "typescript": "~5.4.2"
  }
}

```

# frontend/angular.json

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "frontend": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "stylePreprocessorOptions": {
              "includePaths": [
                "src/styles"
              ]
            },
            "outputPath": "dist/frontend",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            
            "tsConfig": "tsconfig.app.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              },
              {
                "glob": "**/*",
                "input": "node_modules/monaco-editor/min/vs",
                "output": "/assets/monaco/"
              }
            ],
          "styles": [
            "@angular/material/prebuilt-themes/indigo-pink.css",
            {
              "input": "src/styles.scss",
              "inject": true,
              "bundleName": "styles"
            }
          ],
            "scripts": [],
            "server": "src/main.server.ts",
            "prerender": true,
            "ssr": {
              "entry": "server.ts"
            }
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "1MB",
                  "maximumError": "2MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kB",
                  "maximumError": "4kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "frontend:build:production"
            },
            "development": {
              "buildTarget": "frontend:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              },
              {
                "glob": "**/*",
                "input": "node_modules/monaco-editor/min/vs",
                "output": "/assets/monaco/"
              }
            ],
          "styles": [
            "@angular/material/prebuilt-themes/cyan-orange.css",
            "src/styles.scss",
            {
              "input": "src/styles.scss",
              "inject": false,
              "bundleName": "styles"

            }
          ],
            "scripts": []
          }
        }
      }
    }
  }
}
```

# frontend/.stylelintrc.json

```json
{
    "extends": [
      "stylelint-config-standard-scss",
      "stylelint-config-recommended-scss"
    ],
    "rules": {
      "at-rule-no-unknown": [
        true,
        {
          "ignoreAtRules": [
            "tailwind",
            "apply",
            "variants",
            "responsive",
            "screen",
            "layer"
          ]
        }
      ]
    }
  }
```

# frontend/.gitignore

```
# See https://docs.github.com/get-started/getting-started-with-git/ignoring-files for more about ignoring files.

# Compiled output
/dist
/tmp
/out-tsc
/bazel-out

# Node
/node_modules
npm-debug.log
yarn-error.log

# IDEs and editors
.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# Visual Studio Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*

# Miscellaneous
/.angular/cache
.sass-cache/
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings

# System files
.DS_Store
Thumbs.db

```

# frontend/.editorconfig

```
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false

```

# backend/src/types.ts

```ts
import { Request } from 'express';
import { IUser } from '../src/models/user.model';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}
```

# backend/src/server.ts

```ts
//server.ts
import dotenv from 'dotenv';
dotenv.config();
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
import { createServer } from 'http';
import { Server } from 'socket.io';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import codeRoutes from './routes/code.routes';
import authRoutes from './routes/auth.routes';
import workspaceRoutes from './routes/workspace.routes';
import creditRoutes from './routes/credit.routes';
import paymentRoutes from './routes/payment.routes';
import creditPackageRoutes from './routes/credit-package.routes';
import subscriptionRoutes from './routes/subscription.routes';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
import { authMiddleware } from './middleware/auth.middleware';
import { setupScheduledTasks } from './utils/scheduled-tasks';
import { adminMiddleware } from './middleware/admin.middleware';
import { initializeIo } from './services/socket.service';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Stripe webhook route should be before the express.json() middleware
app.use('/api/payments/webhook', express.raw({type: 'application/json'}), paymentRoutes);

app.use(express.json());

mongoose.set('strictQuery', false);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/code_input_db');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

connectToMongoDB();

app.use('/api/auth', authRoutes);
app.use('/api/code', authMiddleware, codeRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/credits', creditRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/credit-packages', creditPackageRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', authMiddleware, adminMiddleware, adminRoutes);
app.use('/api/admin', adminRoutes);

// Set up scheduled tasks
setupScheduledTasks();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    methods: ['GET', 'POST']
  }
});

initializeIo(io);

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { httpServer, io };
```

# backend/src/declarations.d.ts

```ts
declare module 'jsonwebtoken';
declare module 'bcrypt';
declare module 'nodemailer';
declare module 'node-cron'
declare module 'express-rate-limit'
declare module 'speakeasy'
declare module 'winston'
declare module 'qrcode'
declare module 'json2csv'
```

# backend/src/code.routes.ts

```ts
// code.routes.ts

import { Router } from 'express';
import { interpretCode } from '../src/controllers/code.controller';

const router = Router();

router.post('/interpret', interpretCode);

export default router;
```

# frontend/src/styles.scss

```scss
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
@tailwind base;
@tailwind components;
@tailwind utilities;

// Global styles
body {
  @apply bg-gray-100 text-gray-800;
  font-family: 'Inter', sans-serif;
}

.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

// Typography
h1 {
  @apply text-4xl font-bold mb-4;
}

h2 {
  @apply text-3xl font-bold mb-4;
}

h3 {
  @apply text-2xl font-bold mb-4;
}

p {
  @apply text-base leading-relaxed mb-4;
}

// Buttons
.btn {
  @apply inline-block px-4 py-2 rounded-md font-semibold text-white transition duration-300 ease-in-out;
}

.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700;
}

.btn-secondary {
  @apply bg-gray-600 hover:bg-gray-700;
}

// Forms
.form-input {
  @apply w-full px-4 py-2 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

// Cards
.card {
  @apply bg-white rounded-lg shadow-md p-6;
}

.card-title {
  @apply text-xl font-semibold mb-4;
}

// Navigation
.nav {
  @apply flex items-center justify-between flex-wrap bg-white py-4 px-6 shadow-md;
}

.nav-item {
  @apply text-gray-800 hover:text-blue-600 mr-6;
}

.nav-item.active {
  @apply text-blue-600;
}

// Responsive utilities
@screen sm {
  .sm\:text-center {
    text-align: center;
  }
}

@screen md {
  .md\:flex {
    display: flex;
  }
}

@screen lg {
  .lg\:w-1\/2 {
    width: 50%;
  }
}
```

# frontend/src/main.ts

```ts
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
```

# frontend/src/main.server.ts

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

```

# frontend/src/index.html

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Code Input Tracking</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self' http://localhost:3000; img-src 'self' data:;">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body class="mat-typography">
  <app-root></app-root>
</body>
</html>
```

# frontend/public/favicon.ico

This is a binary file of the type: Binary

# backend/src/utils/scheduled-tasks.ts

```ts
// src/utils/scheduled-tasks.ts

import * as cron from 'node-cron';
import { checkExpiredGracePeriods } from '../controllers/payment.controller';

export const setupScheduledTasks = () => {
  // Run daily at midnight
  cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled task: Check expired grace periods');
    try {
      await checkExpiredGracePeriods();
    } catch (error) {
      console.error('Error in scheduled task:', error);
    }
  });
};
```

# backend/src/utils/passwordUtils.ts

```ts
// In backend/src/utils/passwordUtils.ts

export const isStrongPassword = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasNonalphas = /\W/.test(password);
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas;
};
```

# backend/src/types/node-cron.d.ts

```ts
// src/types/node-cron.d.ts

declare module 'node-cron' {
    namespace cron {
      interface ScheduledTask {
        start: () => void;
        stop: () => void;
      }
  
      function schedule(
        cronExpression: string,
        func: () => void,
        options?: { scheduled?: boolean; timezone?: string }
      ): ScheduledTask;
    }
  
    export = cron;
  }
```

# backend/src/scripts/initAdminUser.ts

```ts
import mongoose from 'mongoose';
import { User } from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

const initAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/code_input_db');

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'Admin User';

    if (!adminEmail || !adminPassword) {
      console.error('Admin email and password must be provided in environment variables.');
      process.exit(1);
    }

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const adminUser = await User.createAdminUser({
      email: adminEmail,
      password: adminPassword,
      name: adminName
    });

    console.log('Admin user created successfully:', adminUser.email);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
  }
};

initAdminUser();
```

# backend/src/services/validator.ts

```ts
// validator.ts

import { ParsedField, FieldOptions } from './types';

export interface ValidationRule {
  validate(field: ParsedField): ValidationError[];
}

export class ValidationError {
  constructor(public message: string, public field: string) {}
}
export class RequiredFieldValidator implements ValidationRule {
    validate(field: ParsedField): ValidationError[] {
      if (field.required && !('default' in field.options)) {
        return [{ field: field.name, message: `Required field '${field.name}' has no default value` }];
      }
      return [];
    }
  }
  
  export class RangeValidator implements ValidationRule {
    validate(field: ParsedField): ValidationError[] {
      if (field.type === 'NUMBER' && 'range' in field.options) {
        const range = field.options.range;
        if (range && 'default' in field.options) {
          const value = field.options.default as number;
          if (value < range.min || value > range.max) {
            return [{ field: field.name, message: `Default value ${value} is out of range [${range.min}, ${range.max}] for field '${field.name}'` }];
          }
        }
      }
      return [];
    }
  }

export class Validator {
  private rules: ValidationRule[] = [
    new RequiredFieldValidator(),
    new RangeValidator(),
    // Add more validation rules as needed
  ];

  validate(field: ParsedField): ValidationError[] {
    return this.rules.flatMap(rule => rule.validate(field));
  }

  addRule(rule: ValidationRule): void {
    this.rules.push(rule);
  }
}
```

# backend/src/services/types.ts

```ts
// types.ts

export interface ParsedStructure {
    entryName: string;
    fields: ParsedField[];
    validationErrors: ValidationError[];
  }
  
  export interface ParsedField {
    type: string;
    name: string;
    description: string;
    required: boolean;
    options: FieldOptions;
  }
  
  export type FieldOptions =
    | TextFieldOptions
    | NumberFieldOptions
    | DateFieldOptions
    | BooleanFieldOptions
    | ScaleFieldOptions
    | ListFieldOptions
    | TableFieldOptions
    | StopwatchFieldOptions
    | TimerFieldOptions;
  
  export interface TextFieldOptions {
    multiline?: boolean;
    default?: string;
  }
  
  export interface NumberFieldOptions {
    range?: { min: number; max: number };
    default?: number;
  }
  
  export interface DateFieldOptions {
    default?: string;
  }
  
  export interface BooleanFieldOptions {
    default?: boolean;
  }
  
  export interface ScaleFieldOptions {
    range: { min: number; max: number };
    default?: number;
  }
  
  export interface ListFieldOptions {
    minItems: number;
    maxItems: number;
    listFields: ParsedField[];
  }
  
  export interface TableFieldOptions {
    columns: ParsedField[];
  }
  
  export interface StopwatchFieldOptions {
    laps?: number;
    minLaps?: number;
    maxLaps?: number;
  }
  
  export interface ColumnFieldOptions {
    range?: { min: number; max: number };
    default?: any;
    multiline?: boolean;
  }
  
  export interface TimerFieldOptions {
    workDuration: number;
    breakDuration: number;
    sessions: number;
    longBreakDuration?: number;
    longBreakInterval?: number;
    sessionLabels?: { [key: number]: { work?: string; break?: string } };
  }
  
  export interface ValidationError {
    field: string;
    message: string;
  }
  
```

# backend/src/services/socket.service.ts

```ts
//backend/src/services/socket.service.ts
import { Server } from 'socket.io';

let io: Server;

export const initializeIo = (server: Server) => {
  io = server;
};

export const getIo = (): Server => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

export const emitWorkspaceUpdate = (workspaceId: string, data: any) => {
  io.to(`workspace:${workspaceId}`).emit('workspace:update', data);
};


export const joinWorkspace = (socketId: string, workspaceId: string) => {
  io.sockets.sockets.get(socketId)?.join(`workspace:${workspaceId}`);
};


export const leaveWorkspace = (socketId: string, workspaceId: string) => {
  io.sockets.sockets.get(socketId)?.leave(`workspace:${workspaceId}`);
};

export const emitCursorPosition = (workspaceId: string, userId: string, position: { x: number, y: number }) => {
  io.to(`workspace:${workspaceId}`).emit('workspace:cursorMove', { userId, position });
};

```

# backend/src/services/plugin.ts

```ts
// plugin.ts

import { FieldParserBase, ParsingContext } from './parser-types';
import { ValidationRule } from './validator';

export interface FieldTypePlugin {
  typeName: string;
  parser: new (context: ParsingContext) => FieldParserBase;
  validationRules?: ValidationRule[];
}

export class PluginManager {
  private plugins: Map<string, FieldTypePlugin> = new Map();

  registerPlugin(plugin: FieldTypePlugin): void {
    this.plugins.set(plugin.typeName.toUpperCase(), plugin);
  }

  getPlugin(typeName: string): FieldTypePlugin | undefined {
    return this.plugins.get(typeName.toUpperCase());
  }

  getAllPlugins(): FieldTypePlugin[] {
    return Array.from(this.plugins.values());
  }
}
```

# backend/src/services/performance-monitor.ts

```ts
export class PerformanceMetrics {
    totalParseTime: number = 0;
    parseCount: number = 0;
    cacheHits: number = 0;
    cacheMisses: number = 0;
    errorCount: number = 0;
    fieldParseTime: { [fieldType: string]: number } = {};
  }
  
  export class PerformanceMonitor {
    private metrics: PerformanceMetrics = new PerformanceMetrics();
  
    startParse(): number {
      return Date.now();
    }
  
    endParse(startTime: number): void {
      this.metrics.totalParseTime += Date.now() - startTime;
      this.metrics.parseCount++;
    }
  
    recordCacheHit(): void {
      this.metrics.cacheHits++;
    }
  
    recordCacheMiss(): void {
      this.metrics.cacheMisses++;
    }
  
    recordError(): void {
      this.metrics.errorCount++;
    }
  
    startFieldParse(fieldType: string): number {
      return Date.now();
    }
  
    endFieldParse(fieldType: string, startTime: number): void {
      const parseTime = Date.now() - startTime;
      this.metrics.fieldParseTime[fieldType] = (this.metrics.fieldParseTime[fieldType] || 0) + parseTime;
    }
  
    getMetrics(): PerformanceMetrics {
      return { ...this.metrics };
    }
  
    reset(): void {
      this.metrics = new PerformanceMetrics();
    }
  }
```

# backend/src/services/parser.service.ts

```ts

import { LexerService } from './lexer.service';
import { AsyncTokenStream } from './async-token-stream';
import { ConfigManager, ParserConfig } from './config';
import { ErrorRecoverySystem } from './error-recovery-system';
import { Logger } from './logger';
import { ParserCache } from './parser-cache';
import { PerformanceMonitor } from './performance-monitor';
import { PluginManager } from './plugin';
import { Validator } from './validator';
import { createHash } from 'crypto';
import { 
  FieldTypeConfig, 
  FieldTypePlugin, 
  ParserError, 
  PerformanceMetrics, 
  LogLevel,
  ErrorRecoveryStrategy
} from './parser-types';
import { 
  ParsedStructure, 
  ParsedField, 
  ListFieldOptions, 
  TableFieldOptions, 
  ColumnFieldOptions, 
  ValidationError,
  StopwatchFieldOptions, 
  TimerFieldOptions 
} from './types';

export class AsyncParserService {
  private context: AsyncParsingContext;
  private pluginManager: PluginManager;
  private validator: Validator;
  private configManager: ConfigManager;
  private cache: ParserCache;
  private errorRecoverySystem: ErrorRecoverySystem;
  private performanceMonitor: PerformanceMonitor;
  private logger: Logger;

  constructor(private input: string, config: ParserConfig, cacheSize: number = 100) {
    const lexer = new LexerService(input);
    this.context = new AsyncParsingContext(new AsyncTokenStream(lexer));
    this.pluginManager = new PluginManager();
    this.validator = new Validator();
    this.configManager = new ConfigManager(config);
    this.cache = new ParserCache(cacheSize);
    this.errorRecoverySystem = new ErrorRecoverySystem();
    this.performanceMonitor = new PerformanceMonitor();
    this.logger = Logger.getInstance();
    this.initializeFromConfig();
  }

  private initializeFromConfig(): void {
    this.configManager.getAllFieldTypeConfigs().forEach(fieldTypeConfig => {
      this.registerFieldType(fieldTypeConfig);
    });
  }

  private registerFieldType(fieldTypeConfig: FieldTypeConfig): void {
    const plugin: FieldTypePlugin = {
      typeName: fieldTypeConfig.name,
      parser: fieldTypeConfig.parser,
      validationRules: fieldTypeConfig.validationRules
    };
    this.pluginManager.registerPlugin(plugin);
    fieldTypeConfig.validationRules.forEach(rule => this.validator.addRule(rule));
  }

  async parse(): Promise<ParsedStructure> {
    await this.context.tokenStream.initialize();
    const parseStartTime = this.performanceMonitor.startParse();
    this.logger.info('Starting parsing process');
    const cacheKey = this.generateCacheKey(this.input);
    const cachedResult = this.cache.get(cacheKey);
    
    if (cachedResult) {
      this.logger.debug('Cache hit, returning cached result');
      this.performanceMonitor.recordCacheHit();
      this.performanceMonitor.endParse(parseStartTime);
      return cachedResult;
    }

    this.logger.debug('Cache miss, parsing input');
    this.performanceMonitor.recordCacheMiss();
    
    try {
      const result = await this.doParse();
      this.cache.set(cacheKey, result);
      this.performanceMonitor.endParse(parseStartTime);
      this.logger.info('Parsing completed successfully');
      return result;
    } catch (error) {
      this.performanceMonitor.recordError();
      if (error instanceof ParserError) {
        this.logger.error('ParserError encountered:', error.message);
        this.context.addError(error);
      } else {
        this.logger.error('Unexpected error during parsing:', error);
      }
      this.performanceMonitor.endParse(parseStartTime);
      return { entryName: '', fields: [], validationErrors: [] };
    }
  }

  private async doParse(): Promise<ParsedStructure> {
    this.logger.debug('Starting doParse method');
    const entryName = await this.parseEntry();
    const fields: ParsedField[] = [];
    const validationErrors: ValidationError[] = [];

    while (await this.context.tokenStream.peek() && !(await this.context.tokenStream.match('CHAR', '}'))) {
      try {
        const field = await this.parseNextField();
        fields.push(field);
        
        const fieldErrors = this.validator.validate(field);
        if (fieldErrors.length > 0) {
          this.logger.warn('Validation errors for field:', field.name, fieldErrors);
          validationErrors.push(...fieldErrors);
        }
      } catch (error) {
        if (error instanceof ParserError) {
          this.logger.error(`Error parsing field: ${error.message}`);
          this.context.addError(error);
          this.performanceMonitor.recordError();
          await this.errorRecoverySystem.recoverFromError(error, this.context.tokenStream);
        } else {
          throw error;
        }
      }
    }

    this.logger.debug('Completed doParse method');
    return { entryName, fields, validationErrors };
  }

  private async parseEntry(): Promise<string> {
    try {
      const nextToken = await this.context.tokenStream.peek();
      this.logger.debug(`Next token: ${JSON.stringify(nextToken)}`);
  
      if (!(await this.context.tokenStream.match('KEYWORD', 'ENTRY'))) {
        this.logger.error("Failed to match 'ENTRY' keyword");
        throw new ParserError("Expected 'ENTRY' keyword at the start", nextToken?.line || 0, nextToken?.column || 0);
      }
  
      const entryToken = await this.context.tokenStream.consume();
      this.logger.debug(`Entry token: ${JSON.stringify(entryToken)}`);
  
      if (!entryToken || entryToken.type !== 'STRING') {
        this.logger.error(`Invalid entry token: ${JSON.stringify(entryToken)}`);
        throw new ParserError("Expected string for ENTRY name", entryToken?.line || 0, entryToken?.column || 0);
      }
  
      const entryName = entryToken.value.slice(1, -1); // Remove quotes
      this.logger.debug(`Parsed entry name: ${entryName}`);
  
      if (!(await this.context.tokenStream.match('CHAR', '{'))) {
        this.logger.error("Failed to match '{' after ENTRY name");
        throw new ParserError("Expected '{' after ENTRY name", entryToken.line, entryToken.column);
      }
  
      return entryName;
    } catch (error) {
      if (error instanceof ParserError) {
        this.logger.error(`ParserError in parseEntry: ${error.message}`);
        await this.errorRecoverySystem.recoverFromError(error, this.context.tokenStream);
        return 'Default Entry Name';
      }
      throw error;
    }
  }

  private async parseNextField(): Promise<ParsedField> {
    const token = await this.context.tokenStream.peek();
    if (!token) {
      throw new ParserError('Unexpected end of input', 0, 0);
    }
    const fieldType = token.value.toUpperCase();
    await this.context.tokenStream.consume(); // Consume the field type token

    switch (fieldType) {
      case 'TEXT':
      case 'DATE':
      case 'BOOLEAN':
      case 'SCALE':
      case 'NUMBER':
        return this.parseSimpleField(fieldType);
      case 'TIMER':
        return this.parseTimerField();
      case 'LIST':
        return this.parseListField();
      case 'STOPWATCH':
        return this.parseStopwatchField();
      case 'TABLE':
        return this.parseTableField();
      default:
        throw new ParserError(`Unknown field type: ${fieldType}`, token.line, token.column);
    }
  }

  private async parseSimpleField(type: string): Promise<ParsedField> {
    const name = (await this.context.tokenStream.consume()).value;
    const description = this.removeQuotes((await this.context.tokenStream.consume()).value);
    let required = false;
    const options: any = {};

    while (await this.context.tokenStream.peek() && !(await this.isNewFieldStart())) {
      const token = await this.context.tokenStream.peek();
      if (!token) break;

      switch (token.value.toUpperCase()) {
        case 'REQUIRED':
          required = true;
          await this.context.tokenStream.consume();
          break;
        case 'DEFAULT':
          await this.context.tokenStream.consume();
          options.default = await this.parseDefaultValue(type);
          break;
        case 'RANGE':
          await this.context.tokenStream.consume();
          options.range = await this.parseRange();
          break;
        case 'MULTILINE':
          if (type === 'TEXT') {
            options.multiline = true;
            await this.context.tokenStream.consume();
          } else {
            throw new ParserError(`MULTILINE is not applicable for ${type} type`, token.line, token.column);
          }
          break;
        default:
          return { type, name, description, required, options };
      }
    }

    return { type, name, description, required, options };
  }



  private async parseRange(): Promise<{ min: number; max: number }> {
    const min = Number((await this.context.tokenStream.consume()).value);
    const max = Number((await this.context.tokenStream.consume()).value);
    return { min, max };
  }
  
  private async parseTimerField(): Promise<ParsedField> {
    const name = (await this.context.tokenStream.consume()).value;
    const description = this.removeQuotes((await this.context.tokenStream.consume()).value);
    const options: TimerFieldOptions = {
      workDuration: 0,
      breakDuration: 0,
      sessions: 0,
      longBreakDuration: undefined,
      longBreakInterval: undefined,
      sessionLabels: {}
    };

    await this.context.tokenStream.match('CHAR', '{');
    while (!(await this.context.tokenStream.match('CHAR', '}'))) {
      const token = await this.context.tokenStream.consume();
      switch (token.value.toUpperCase()) {
        case 'WORK':
          options.workDuration = Number((await this.context.tokenStream.consume()).value) * 60000;
          break;
        case 'BREAK':
          options.breakDuration = Number((await this.context.tokenStream.consume()).value) * 60000;
          break;
        case 'SESSIONS':
          options.sessions = Number((await this.context.tokenStream.consume()).value);
          break;
        case 'LONG_BREAK':
          options.longBreakDuration = Number((await this.context.tokenStream.consume()).value) * 60000;
          await this.context.tokenStream.match('KEYWORD', 'AFTER');
          options.longBreakInterval = Number((await this.context.tokenStream.consume()).value);
          break;
        case 'SESSION_LABELS':
          options.sessionLabels = await this.parseSessionLabels();
          break;
        default:
          throw new ParserError(`Unexpected token in TIMER field: ${token.value}`, token.line, token.column);
      }
    }

    return { type: 'TIMER', name, description, required: false, options };
  }
  private async parseSessionLabels(): Promise<{ [key: number]: { work?: string; break?: string } }> {
    const labels: { [key: number]: { work?: string; break?: string } } = {};
    await this.context.tokenStream.match('CHAR', '{');

    while (!(await this.context.tokenStream.match('CHAR', '}'))) {
      const sessionNumber = Number((await this.context.tokenStream.consume()).value);
      const phaseToken = await this.context.tokenStream.consume();
      const labelToken = await this.context.tokenStream.consume();

      if (!labels[sessionNumber]) {
        labels[sessionNumber] = {};
      }

      if (phaseToken.value === 'W') {
        labels[sessionNumber].work = labelToken.value.slice(1, -1); // Remove quotes
      } else if (phaseToken.value === 'B') {
        labels[sessionNumber].break = labelToken.value.slice(1, -1); // Remove quotes
      } else {
        throw new ParserError(`Unexpected phase identifier: ${phaseToken.value}`, phaseToken.line, phaseToken.column);
      }
    }

    return labels;
  }
  private async parseListField(): Promise<ParsedField> {
    const name = (await this.context.tokenStream.consume()).value;
    const description = this.removeQuotes((await this.context.tokenStream.consume()).value);
    const options: ListFieldOptions = { minItems: 0, maxItems: Infinity, listFields: [] };

    while (await this.context.tokenStream.peek() && (await this.context.tokenStream.peek())!.type !== 'CHAR') {
      if (await this.context.tokenStream.match('KEYWORD', 'MIN')) {
        options.minItems = Number((await this.context.tokenStream.consume()).value);
      } else if (await this.context.tokenStream.match('KEYWORD', 'MAX')) {
        options.maxItems = Number((await this.context.tokenStream.consume()).value);
      } else {
        break;
      }
    }

    await this.context.tokenStream.match('CHAR', '{');
    while (!(await this.context.tokenStream.match('CHAR', '}'))) {
      options.listFields.push(await this.parseNextField());
    }

    return { type: 'LIST', name, description, required: false, options };
  }


  private async parseStopwatchField(): Promise<ParsedField> {
    const name = (await this.context.tokenStream.consume()).value;
    const description = this.removeQuotes((await this.context.tokenStream.consume()).value);
    const options: StopwatchFieldOptions = { laps: undefined, minLaps: undefined, maxLaps: undefined };

    while (await this.context.tokenStream.peek() && !(await this.isNewFieldStart())) {
      const token = await this.context.tokenStream.peek();
      if (!token) break;

      switch (token.value.toUpperCase()) {
        case 'LAPS':
          await this.context.tokenStream.consume();
          options.laps = Number((await this.context.tokenStream.consume()).value);
          break;
        case 'MIN_LAPS':
          await this.context.tokenStream.consume();
          options.minLaps = Number((await this.context.tokenStream.consume()).value);
          break;
        case 'MAX_LAPS':
          await this.context.tokenStream.consume();
          options.maxLaps = Number((await this.context.tokenStream.consume()).value);
          break;
        default:
          return { type: 'STOPWATCH', name, description, required: false, options };
      }
    }

    return { type: 'STOPWATCH', name, description, required: false, options };
  }

  private async parseTableField(): Promise<ParsedField> {
    const name = (await this.context.tokenStream.consume()).value;
    const description = this.removeQuotes((await this.context.tokenStream.consume()).value);
    const options: TableFieldOptions = { columns: [] };

    await this.context.tokenStream.match('CHAR', '{');
    while (!(await this.context.tokenStream.match('CHAR', '}'))) {
      if (await this.context.tokenStream.match('KEYWORD', 'COLUMN')) {
        options.columns.push(await this.parseColumnField());
      } else {
        throw new ParserError("Expected 'COLUMN' keyword in TABLE definition", 0, 0);
      }
    }

    return { type: 'TABLE', name, description, required: false, options };
  }
  private async parseColumnField(): Promise<ParsedField> {
    const type = (await this.context.tokenStream.consume()).value.toUpperCase();
    const name = (await this.context.tokenStream.consume()).value;
    const description = this.removeQuotes((await this.context.tokenStream.consume()).value);
    
    const options: ColumnFieldOptions = {};
    let required = false;

    while (await this.context.tokenStream.peek() && !(await this.isNewColumnStart())) {
      const token = await this.context.tokenStream.peek();
      if (!token) break;

      switch (token.value.toUpperCase()) {
        case 'REQUIRED':
          required = true;
          await this.context.tokenStream.consume();
          break;
        case 'RANGE':
          await this.context.tokenStream.consume();
          options.range = await this.parseRange();
          break;
        case 'DEFAULT':
          await this.context.tokenStream.consume();
          options.default = await this.parseDefaultValue(type);
          break;
        default:
          return { type, name, description, required, options };
      }
    }

    return { type, name, description, required, options };
  }


  private async parseBaseField(type: string): Promise<Omit<ParsedField, 'options'>> {
    const name = (await this.context.tokenStream.consume()).value;
    const descriptionToken = await this.context.tokenStream.consume();
    const description = this.removeQuotes(descriptionToken.value);
    let required = false;
    return { type, name, description, required };
  }
  private removeQuotes(str: string): string {
    return str.replace(/^"|"$/g, '');
  }
  private async parseDefaultValue(type: string): Promise<any> {
    const token = await this.context.tokenStream.consume();
    switch (type.toUpperCase()) {
      case 'TEXT':
        return this.removeQuotes(token.value);
      case 'NUMBER':
      case 'SCALE':
        return Number(token.value);
      case 'BOOLEAN':
        return token.value.toLowerCase() === 'true';
      default:
        throw new ParserError(`DEFAULT is not implemented for ${type} type`, token.line, token.column);
    }
  }


  private async isNewFieldStart(): Promise<boolean> {
    const token = await this.context.tokenStream.peek();
    return token !== null && token.type === 'KEYWORD' && this.isKnownFieldType(token.value);
  }

  private async isNewColumnStart(): Promise<boolean> {
    const token = await this.context.tokenStream.peek();
    return token?.type === 'KEYWORD' && token.value.toUpperCase() === 'COLUMN';
  }

  private isKnownFieldType(type: string): boolean {
    return this.pluginManager.getPlugin(type.toUpperCase()) !== undefined;
  }

  private generateCacheKey(input: string): string {
    return createHash('md5').update(input).digest('hex');
  }

  public registerCustomFieldType(fieldTypeConfig: FieldTypeConfig): void {
    this.registerFieldType(fieldTypeConfig);
  }

  public registerErrorRecoveryStrategy(name: string, strategy: ErrorRecoveryStrategy): void {
    this.errorRecoverySystem.registerStrategy(name, strategy);
  }

  public getPerformanceMetrics(): PerformanceMetrics {
    return this.performanceMonitor.getMetrics();
  }

  public resetPerformanceMetrics(): void {
    this.performanceMonitor.reset();
  }

  public setLogLevel(level: LogLevel): void {
    this.logger.setLevel(level);
  }

  public clearCache(): void {
    this.cache.clear();
  }

  public getCacheSize(): number {
    return this.cache.getSize();
  }
}

class AsyncParsingContext {
  constructor(
    public readonly tokenStream: AsyncTokenStream,
    public readonly errors: ParserError[] = []
  ) {}

  addError(error: ParserError): void {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}



// Example usage:
// const inputStream = fs.createReadStream('large-input-file.txt');
// const config: ParserConfig = { /* configuration options */ };
// const parserService = new AsyncParserService(inputStream, config, 200);
// parserService.setLogLevel(LogLevel.DEBUG);
// parserService.parse(inputString).then(result => console.log(result));
```

# backend/src/services/parser-types.ts

```ts
// parser-types.ts

import { ParsedField, ValidationError } from './types';
import { AsyncTokenStream } from './async-token-stream';

export interface ErrorRecoveryStrategy {
    recover(error: ParserError, tokenStream: AsyncTokenStream): Promise<void>;
  }
  export abstract class FieldParserBase {
    constructor(protected context: ParsingContext) {}
    abstract parse(fieldType: string): Promise<ParsedField>;
  }

  

export interface Token {
    type: string;
    value: string;
    line: number;
    column: number;
  }

export class ParsingContext {
  constructor(
    public readonly tokenStream: AsyncTokenStream,
    public readonly errors: ParserError[] = []
  ) {}

  addError(error: ParserError): void {
    this.errors.push(error);
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}

export class ParserError extends Error {
    constructor(
      public message: string,
      public line: number,
      public column: number
    ) {
      super(message);
      this.name = 'ParserError';
    }
  }
export interface FieldTypeConfig {
  name: string;
  parser: new (context: ParsingContext) => FieldParserBase;
  validationRules: ValidationRule[];
}

export interface ValidationRule {
  validate(field: ParsedField): ValidationError[];
}

export interface FieldTypePlugin {
  typeName: string;
  parser: new (context: ParsingContext) => FieldParserBase;
  validationRules?: ValidationRule[];
}

export interface PerformanceMetrics {
  totalParseTime: number;
  parseCount: number;
  cacheHits: number;
  cacheMisses: number;
  errorCount: number;
  fieldParseTime: { [fieldType: string]: number };
}

export enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR
}
```

# backend/src/services/parser-cache.ts

```ts
import { ParsedStructure } from './types';

export class ParserCache {
  private cache: Map<string, ParsedStructure> = new Map();
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  get(key: string): ParsedStructure | undefined {
    const cachedResult = this.cache.get(key);
    if (cachedResult) {
      // Move the accessed item to the end to implement LRU
      this.cache.delete(key);
      this.cache.set(key, cachedResult);
    }
    return cachedResult;
  }

  set(key: string | undefined, value: ParsedStructure): void {
    if (key === undefined) return;
    
    if (this.cache.size >= this.maxSize) {
      // Remove the least recently used item (first item in the map)
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  getSize(): number {
    return this.cache.size;
  }
}
```

# backend/src/services/logger.ts

```ts
export enum LogLevel {
    DEBUG,
    INFO,
    WARN,
    ERROR
  }
  
  export class Logger {
    private static instance: Logger;
    private level: LogLevel = LogLevel.INFO;
  
    private constructor() {}
  
    static getInstance(): Logger {
      if (!Logger.instance) {
        Logger.instance = new Logger();
      }
      return Logger.instance;
    }
  
    setLevel(level: LogLevel): void {
      this.level = level;
    }
  
    debug(message: string, ...args: any[]): void {
      this.log(LogLevel.DEBUG, message, ...args);
    }
  
    info(message: string, ...args: any[]): void {
      this.log(LogLevel.INFO, message, ...args);
    }
  
    warn(message: string, ...args: any[]): void {
      this.log(LogLevel.WARN, message, ...args);
    }
  
    error(message: string, ...args: any[]): void {
      this.log(LogLevel.ERROR, message, ...args);
    }
  
    private log(level: LogLevel, message: string, ...args: any[]): void {
      if (level >= this.level) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${LogLevel[level]}] ${message}`;
        console.log(logMessage, ...args);
      }
    }
  }
```

# backend/src/services/lexer.service.ts

```ts
export type TokenType = 
  'KEYWORD' | 'IDENTIFIER' | 'NUMBER' | 'STRING' | 'CHAR' | 'EOF' |
  'TABLE_START' | 'TABLE_END' | 'COLUMN' | 'ROW' | 'PHASE_IDENTIFIER';

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}

export class LexerService {
  constructor(input: string) {
    this.input = input;
  }
  getInput(): string {
    return this.input;
  }
  private input: string;
  private position: number = 0;
  private line: number = 1;
  private column: number = 1;

  private keywords: Set<string> = new Set([
    'ENTRY', 'REQUIRED', 'DEFAULT', 'RANGE', 'MIN', 'MAX',
    'LIST', 'TABLE', 'COLUMN', 'END', 'MULTILINE',   
    'STOPWATCH', 'TIMER', 'WORK', 'BREAK', 'SESSIONS', 'LONG_BREAK', 'AFTER',
    'SESSION_LABELS'
  ]);



  async nextToken(): Promise<Token> {
    return new Promise(resolve => {
      setImmediate(() => {
        resolve(this.synchronousNextToken());
      });
    });
  }

  
  private synchronousNextToken(): Token {
    this.skipWhitespace();

    if (this.position >= this.input.length) {
      return this.createToken('EOF', '');
    }

    const char = this.input[this.position];

    if (this.isAlpha(char)) {
      return this.readIdentifierOrKeyword();
    }

    if (this.isDigit(char)) {
      return this.readNumber();
    }

    if (char === '"') {
      return this.readString();
    }

    // Handle curly braces
    if (char === '{' || char === '}') {
      this.position++;
      this.column++;
      return this.createToken('CHAR', char);
    }

    // Handle other single-character tokens
    this.position++;
    this.column++;
    return this.createToken('CHAR', char);
  }

  private skipWhitespace(): void {
    while (this.position < this.input.length && /\s/.test(this.input[this.position])) {
      if (this.input[this.position] === '\n') {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      this.position++;
    }
  }

  private readIdentifierOrKeyword(): Token {
    const start = this.position;
    while (this.position < this.input.length && this.isAlphaNumeric(this.input[this.position])) {
      this.position++;
      this.column++;
    }
    const value = this.input.slice(start, this.position);
    
    if (this.keywords.has(value.toUpperCase())) {
      return this.createToken('KEYWORD', value);
    }
    return this.createToken('IDENTIFIER', value);
  }

  private readNumber(): Token {
    const start = this.position;
    while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
      this.position++;
      this.column++;
    }
    // Handle decimal numbers
    if (this.input[this.position] === '.' && this.isDigit(this.input[this.position + 1])) {
      this.position++;
      this.column++;
      while (this.position < this.input.length && this.isDigit(this.input[this.position])) {
        this.position++;
        this.column++;
      }
    }
    return this.createToken('NUMBER', this.input.slice(start, this.position));
  }

  private readString(): Token {
    const start = this.position;
    this.position++; // Skip the opening quote
    this.column++;

    while (this.position < this.input.length && this.input[this.position] !== '"') {
      if (this.input[this.position] === '\n') {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      this.position++;
    }

    if (this.position >= this.input.length) {
      throw new Error(`Unterminated string at line ${this.line}, column ${this.column}`);
    }

    this.position++; // Skip the closing quote
    this.column++;

    const value = this.input.slice(start, this.position);
    return this.createToken('STRING', value);
  }



  private isAlpha(char: string): boolean {
    return /[a-zA-Z_]/.test(char);
  }

  private isDigit(char: string): boolean {
    return /[0-9]/.test(char);
  }

  private isAlphaNumeric(char: string): boolean {
    return this.isAlpha(char) || this.isDigit(char);
  }

  private createToken(type: TokenType, value: string): Token {
    return { type, value, line: this.line, column: this.column - value.length };
  }
}

export class LexerError extends Error {
  constructor(message: string, public line: number, public column: number) {
    super(`${message} at line ${line}, column ${column}`);
    this.name = 'LexerError';
  }
}
```

# backend/src/services/fieldParsers.ts

```ts
// fieldParsers.ts

import { FieldParserBase, ParsingContext, Token, ParserError } from './parser-types';
import { ParsedField } from './types';

export class DefaultFieldParser extends FieldParserBase {
    constructor(context: ParsingContext) {
      super(context);
    }
  
    async parse(fieldType: string): Promise<ParsedField> {
      const baseField = await this.parseBaseField(fieldType);
      const options: any = {};
  
      while (await this.context.tokenStream.peek() && !(await this.isNewFieldStart())) {
        const token = await this.context.tokenStream.peek();
        if (!token) break;
  
        switch (token.value.toUpperCase()) {
          case 'REQUIRED':
            baseField.required = true;
            await this.context.tokenStream.consume();
            break;
          case 'DEFAULT':
            await this.context.tokenStream.consume();
            options.default = await this.parseDefaultValue(fieldType);
            break;
          case 'RANGE':
            await this.context.tokenStream.consume();
            options.range = await this.parseRange();
            break;
          case 'MULTILINE':
            if (fieldType === 'TEXT') {
              options.multiline = true;
              await this.context.tokenStream.consume();
            } else {
              throw new ParserError(`MULTILINE is not applicable for ${fieldType} type`, token.line, token.column);
            }
            break;
          default:
            return { ...baseField, options };
        }
      }
  
      return { ...baseField, options };
    }
  
    private async parseBaseField(fieldType: string): Promise<Omit<ParsedField, 'options'>> {
      const name = (await this.ensureToken('IDENTIFIER', undefined, 'Expected field name')).value;
      const description = (await this.ensureToken('STRING', undefined, 'Expected field description')).value;
      return { type: fieldType, name, description, required: false };
    }
  
    private async parseDefaultValue(fieldType: string): Promise<any> {
      const token = await this.context.tokenStream.peek();
      if (!token) throw new ParserError('Unexpected end of input', 0, 0);
  
      switch (fieldType.toUpperCase()) {
        case 'TEXT':
        case 'DATE':
          return (await this.ensureToken('STRING', undefined, `Expected string for ${fieldType} default value`)).value;
        case 'NUMBER':
        case 'SCALE':
          return Number((await this.ensureToken('NUMBER', undefined, `Expected number for ${fieldType} default value`)).value);
        case 'BOOLEAN':
          const value = (await this.ensureToken('IDENTIFIER', undefined, 'Expected boolean value')).value.toLowerCase();
          if (value === 'true') return true;
          if (value === 'false') return false;
          throw new ParserError(`Invalid boolean value: ${value}`, token.line, token.column);
        default:
          throw new ParserError(`DEFAULT is not implemented for ${fieldType} type`, token.line, token.column);
      }
    }
  
    private async parseRange(): Promise<{ min: number; max: number }> {
      const min = Number((await this.ensureToken('NUMBER', undefined, 'Expected minimum value for range')).value);
      const max = Number((await this.ensureToken('NUMBER', undefined, 'Expected maximum value for range')).value);
      return { min, max };
    }
  
    private async isNewFieldStart(): Promise<boolean> {
      const token = await this.context.tokenStream.peek();
      return token !== null && token.type === 'IDENTIFIER' && this.isKnownFieldType(token.value);
    }
  
    private isKnownFieldType(type: string): boolean {
      const knownTypes = ['TEXT', 'NUMBER', 'DATE', 'BOOLEAN', 'SCALE', 'TIMER', 'LIST', 'STOPWATCH', 'TABLE'];
      return knownTypes.includes(type.toUpperCase());
    }
  
    private async ensureToken(expectedType: string, expectedValue: string | undefined, errorMessage: string): Promise<Token> {
      const token = await this.context.tokenStream.peek();
      if (!token || token.type !== expectedType || (expectedValue && token.value.toUpperCase() !== expectedValue.toUpperCase())) {
        throw new ParserError(errorMessage, token?.line || 0, token?.column || 0);
      }
      return this.context.tokenStream.consume();
    }
  }
```

# backend/src/services/error-recovery-system.ts

```ts
import { Token, TokenType } from './lexer.service';
import { AsyncTokenStream } from './async-token-stream';
import { ParserError } from './parser-types';

export interface ErrorRecoveryStrategy {
  recover(error: ParserError, tokenStream: AsyncTokenStream): Promise<void>;
}

class SkipToNextFieldStrategy implements ErrorRecoveryStrategy {
  async recover(error: ParserError, tokenStream: AsyncTokenStream): Promise<void> {
    console.log(`Recovering from error: ${error.message}`);
    while (await tokenStream.peek()) {
      const token = await tokenStream.peek();
      if (token && this.isFieldStart(token)) {
        break;
      }
      await tokenStream.consume();
    }
  }

  private isFieldStart(token: Token): boolean {
    return token.type === 'IDENTIFIER' && ['TEXT', 'NUMBER', 'DATE', 'BOOLEAN', 'SCALE', 'LIST', 'TABLE', 'STOPWATCH', 'TIMER'].includes(token.value.toUpperCase());
  }
}

class InsertMissingTokenStrategy implements ErrorRecoveryStrategy {
  constructor(private expectedType: TokenType, private expectedValue?: string) {}

  async recover(error: ParserError, tokenStream: AsyncTokenStream): Promise<void> {
    console.log(`Inserting missing token: ${this.expectedType} ${this.expectedValue || ''}`);
    // Simulate insertion of the missing token
    // This doesn't actually modify the token stream, but allows parsing to continue
  }
}

export class ErrorRecoverySystem {
  private strategies: Map<string, ErrorRecoveryStrategy> = new Map();

  constructor() {
    this.registerDefaultStrategies();
  }

  private registerDefaultStrategies(): void {
    this.strategies.set('default', new SkipToNextFieldStrategy());
    this.strategies.set('missingBrace', new InsertMissingTokenStrategy('CHAR', '{'));
    // Add more default strategies as needed
  }

  registerStrategy(name: string, strategy: ErrorRecoveryStrategy): void {
    this.strategies.set(name, strategy);
  }

  async recoverFromError(error: ParserError, tokenStream: AsyncTokenStream): Promise<void> {
    const strategy = this.getStrategy(error);
    await strategy.recover(error, tokenStream);
  }

  private getStrategy(error: ParserError): ErrorRecoveryStrategy {
    // Determine the appropriate strategy based on the error
    if (error.message.includes("Expected '{'")) {
      return this.strategies.get('missingBrace') || this.strategies.get('default')!;
    }
    return this.strategies.get('default')!;
  }
}
```

# backend/src/services/email.service.ts

```ts
// src/services/email.service.ts

import { IUser } from '../models/user.model';
import { ICreditPackage } from '../models/credit-package.model';

const nodemailer = require('nodemailer');

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  static async sendSubscriptionConfirmation(user: IUser, creditPackage: ICreditPackage) {
    await this.sendEmail({
      to: user.email,
      subject: 'Subscription Confirmation',
      text: `Thank you for subscribing to ${creditPackage.name}. Your subscription is now active.`,
    });
  }

  static async sendPaymentFailedNotification(user: IUser) {
    await this.sendEmail({
      to: user.email,
      subject: 'Payment Failed',
      text: 'Your recent payment has failed. Please update your payment method to avoid service interruption.',
    });
  }

  static async sendSubscriptionCancelledNotification(user: IUser) {
    await this.sendEmail({
      to: user.email,
      subject: 'Subscription Cancelled',
      text: 'Your subscription has been cancelled. We hope to see you again soon!',
    });
  }

  private static async sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
    try {
      await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        text,
      });
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  static async sendVerificationEmail(to: string, verificationURL: string) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: 'Email Verification',
      html: `
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationURL}">Verify Email</a>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Verification email sent to ${to}`);
    } catch (error) {
      console.error('Error sending verification email:', error);
      // Instead of throwing, we'll log the error and continue
    }
  }

  static async sendPasswordResetEmail(to: string, resetURL: string) {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: to,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetURL}">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
      `
    };

    await this.transporter.sendMail(mailOptions);
  }
}

```

# backend/src/services/config.ts

```ts
// config.ts

import { ValidationRule } from './validator';
import { FieldParserBase, ParsingContext } from './parser-types';

export interface FieldTypeConfig {
  name: string;
  parser: new (context: ParsingContext) => FieldParserBase;
  validationRules: ValidationRule[];
  options?: {
    [key: string]: {
      type: 'string' | 'number' | 'boolean';
      required?: boolean;
      defaultValue?: any;
    };
  };
}

export interface ParserConfig {
  fieldTypes: FieldTypeConfig[];
}

export class ConfigManager {
  private config: ParserConfig;

  constructor(config: ParserConfig) {
    this.config = config;
  }

  getFieldTypeConfig(typeName: string): FieldTypeConfig | undefined {
    return this.config.fieldTypes.find(ft => ft.name.toUpperCase() === typeName.toUpperCase());
  }

  getAllFieldTypeConfigs(): FieldTypeConfig[] {
    return this.config.fieldTypes;
  }
}
```

# backend/src/services/auth-logger.service.ts

```ts
// Create a new file: backend/src/services/auth-logger.service.ts

import { createLogger, format, transports } from 'winston';

const authLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'logs/auth.log' }),
    new transports.Console()
  ]
});

export const logAuthEvent = (event: string, userId: string, details: any = {}) => {
  authLogger.info({
    event,
    userId,
    ...details,
  });
};
```

# backend/src/services/async-token-stream.ts

```ts
import { LexerService, Token, TokenType } from './lexer.service';

export class AsyncTokenStream {
    constructor(private lexer: LexerService) {}
  
    getInput(): string {
        return this.lexer.getInput();
      }

    private currentToken: Token | null = null;


  async initialize(): Promise<void> {
    await this.advance();
  }

  async peek(): Promise<Token | null> {
    return this.currentToken;
  }

  async consume(): Promise<Token> {
    const token = this.currentToken;
    await this.advance();
    return token!;
  }

  async match(type: TokenType, value?: string): Promise<boolean> {
    const token = await this.peek();
    console.log(`Matching token: ${JSON.stringify(token)} against type: ${type}, value: ${value}`);
    if (!token) return false;
    if (token.type !== type) return false;
    if (value && token.value.toUpperCase() !== value.toUpperCase()) return false;
    await this.consume();
    return true;
  }

  private async advance(): Promise<void> {
    this.currentToken = await this.lexer.nextToken();
  }
}
```

# backend/src/routes/workspace.routes.ts

```ts
//src/routes/workspace.routes.ts
import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import * as workspaceController from '../controllers/workspace.controller';

const router = express.Router();

router.use(authMiddleware);

// Existing routes
router.post('/', workspaceController.createWorkspace);
router.get('/', workspaceController.getWorkspaces);
router.get('/:id', workspaceController.getWorkspace);
router.put('/:id', workspaceController.updateWorkspace);
router.delete('/:id', workspaceController.deleteWorkspace);

//  routes for invitations and role management
router.post('/:id/invite', workspaceController.inviteMember);
router.put('/:id/members/:userId', workspaceController.updateMemberRole);
router.delete('/:id/members/:userId', workspaceController.removeMember);

//  routes for joining and leaving workspaces
router.post('/:id/join', workspaceController.joinWorkspace);
router.post('/:id/leave', workspaceController.leaveWorkspace);
//  routes for log activity

router.get('/:id/activity-logs', authMiddleware, workspaceController.getActivityLogs);

// New folder routes
router.post('/:workspaceId/folders', workspaceController.createFolder);
router.put('/:workspaceId/folders/:folderId', workspaceController.updateFolder);
router.delete('/:workspaceId/folders/:folderId', workspaceController.deleteFolder);
router.get('/:workspaceId/folders', workspaceController.getFolders); // Add this line

//form inside folder
router.post('/:workspaceId/folders/:folderId/forms', workspaceController.createForm);
router.put('/:workspaceId/folders/:folderId/forms/:formId', workspaceController.updateForm);
router.delete('/:workspaceId/folders/:folderId/forms/:formId', workspaceController.deleteForm);
router.get('/:workspaceId/folders/:folderId/forms', workspaceController.getFormsInFolder);

router.post('/:workspaceId/folders/:folderId/forms/:formId/save', workspaceController.saveForm);
router.post('/:workspaceId/folders/:folderId/forms/:formId/submit', workspaceController.submitForm);

router.get('/:workspaceId/folders/:folderId/forms/:formId/submissions', workspaceController.getFormSubmissions);
router.get('/:workspaceId/folders/:folderId/forms/:formId/instances', workspaceController.getFormInstances);





export default router;
```

# backend/src/routes/user.routes.ts

```ts
// src/routes/user.routes.ts

import express, { Request, Response, NextFunction } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import * as userController from '../controllers/user.controller';

const router = express.Router();

// Protect all user routes
router.use(authMiddleware);

// Helper function to wrap async controllers
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/me', asyncHandler((req: AuthRequest, res: Response) => userController.getCurrentUser(req, res)));
router.put('/me', asyncHandler((req: AuthRequest, res: Response) => userController.updateUser(req, res)));
router.get('/me/credit-history', asyncHandler((req: AuthRequest, res: Response) => userController.getUserCreditHistory(req, res)));

export default router;
```

# backend/src/routes/code.routes.ts

```ts
import express from 'express';
import { interpretCode } from '../controllers/code.controller';

const router = express.Router();

router.post('/interpret', interpretCode);

export default router;

```

# backend/src/routes/auth.routes.ts

```ts
import express, { Request, Response, NextFunction } from 'express';
import * as authController from '../controllers/auth.controller';
import { loginLimiter, passwordResetLimiter } from '../middleware/rateLimiter';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = express.Router();

// Helper function to wrap async controllers
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Public routes
router.post('/register', asyncHandler(authController.register));
router.post('/login', loginLimiter, asyncHandler(authController.login));
router.post('/login-2fa', loginLimiter, asyncHandler(authController.login2FA));
router.post('/logout', authController.logout);
router.post('/request-password-reset', passwordResetLimiter, asyncHandler(authController.requestPasswordReset));
router.post('/reset-password', asyncHandler(authController.resetPassword));
router.post('/resend-verification-email', asyncHandler(authController.resendVerificationEmail));
router.get('/verify-email/:token', asyncHandler(authController.verifyEmail));

// Add this new route for refresh token
router.post('/refresh-token', asyncHandler(authController.refreshToken));

// Semi-protected route (requires a token but doesn't throw an error if not present)
router.post('/refresh-token', (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req as AuthRequest, res, (err?: any) => {
    if (err) {
      // If there's an error (no token), just continue to the controller
      return next();
    }
    next();
  });
}, asyncHandler(authController.refreshToken));

// Protected routes (require authentication)
router.use(authMiddleware);

// Helper function to convert AuthRequest to Request for protected routes
const authRequestHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  fn(req as AuthRequest, res, next).catch(next);
};

router.post('/enable-2fa', authRequestHandler(authController.enable2FA));
router.post('/verify-2fa', authRequestHandler(authController.verify2FA));
router.post('/disable-2fa', authRequestHandler(authController.disable2FA));
router.post('/change-password', authRequestHandler(authController.changePassword));
router.get('/2fa-status', authRequestHandler(authController.getTwoFAStatus));
router.get('/email-verification-status/:userId', authMiddleware, authController.getEmailVerificationStatus);
export default router;
```

# backend/src/models/workspace.model.ts

```ts
//backend/src/models/workspace.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';


export interface IForm {
  _id: mongoose.Types.ObjectId;
  name: string;
  structure: any;
  values?: Record<string, any>;
  submissions?: {
    _id: mongoose.Types.ObjectId;
    values: any;
    submissionDate: Date;
    createdAt: Date;
    updatedAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
  isTemplate: boolean;
  parentTemplateId?: mongoose.Types.ObjectId;
}



export interface IFolder {
  _id: mongoose.Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  forms: IForm[];
  subfolders: IFolder[];
}



export interface IWorkspaceMember {
  user: IUser['_id'];
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
    manageUsers: boolean;
  };
}

export interface IWorkspace extends Document {
  name: string;
  description: string;
  owner: IUser['_id'];
  members: IWorkspaceMember[];
  folders: IFolder[];
  createdAt: Date;
  updatedAt: Date;

}


const FormSchema: Schema = new Schema({
  name: { type: String, required: true },
  structure: { type: Schema.Types.Mixed, required: true, default: {} },
  isTemplate: { type: Boolean, default: false },
  parentTemplateId: { type: Schema.Types.ObjectId, ref: 'Form' },
  values: { type: Schema.Types.Mixed },
  submissions: [{
    values: { type: Schema.Types.Mixed },
    submissionDate: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const FolderSchema: Schema = new Schema({
  name: { type: String, required: true },
  forms: [FormSchema], // Array of forms
  subfolders: [{ type: Schema.Types.Mixed }], // Array of subfolders
}, { timestamps: true });


const WorkspaceSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['owner', 'admin', 'editor', 'viewer'], default: 'viewer' },
    permissions: {
      read: { type: Boolean, default: true },
      write: { type: Boolean, default: false },
      delete: { type: Boolean, default: false },
      manageUsers: { type: Boolean, default: false }
    }
  }],
  folders: [FolderSchema]
}, { timestamps: true });

export const Workspace = mongoose.model<IWorkspace>('Workspace', WorkspaceSchema);
```

# backend/src/models/user.model.ts

```ts
// src/models/user.model.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export interface IUser extends Document {
  id: string; 
  _id: mongoose.Types.ObjectId;
  email: string;
  stripeCustomerId?: string;
  password: string;
  name: string;
  isAdmin: boolean;
  role: 'user' | 'admin';
  credits: number;
  creditHistory: {
    amount: number;
    description: string;
    date: Date;
  }[];
  subscription?: {
    packageId: mongoose.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: 'active' | 'cancelled' | 'expired' | 'grace';
    stripeSubscriptionId: string;
    graceEndDate?: Date;
  };
  isEmailVerified: boolean;
  lastLogin: Date;
  twoFactorSecret?: string;
  isTwoFactorEnabled: boolean;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  passwordHistory: string[];
  accountStatus: 'active' | 'suspended' | 'deactivated';
  failedLoginAttempts: number;
  lockoutUntil: Date | null;

  comparePassword(candidatePassword: string): Promise<boolean>;
  generateVerificationToken(): string;
  incrementFailedLoginAttempts(): Promise<void>;
  resetFailedLoginAttempts(): Promise<void>;
  isLockedOut(): boolean;
  addPasswordToHistory(password: string): void;
  isPasswordInHistory(password: string): boolean;
  
  
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  credits: { type: Number, default: 0 },
  stripeCustomerId: { type: String },
  creditHistory: [{
    amount: Number,
    description: String,
    date: { type: Date, default: Date.now }
  }],
  subscription: {
    packageId: { type: Schema.Types.ObjectId, ref: 'CreditPackage' },
    startDate: Date,
    endDate: Date,
    status: { type: String, enum: ['active', 'cancelled', 'expired', 'grace'], default: 'active' },
    stripeSubscriptionId: String,
    graceEndDate: Date
  },
  isEmailVerified: { type: Boolean, default: false },
  lastLogin: Date,
  twoFactorSecret: { type: String },
  isTwoFactorEnabled: { type: Boolean, default: false },
  emailVerificationToken: { type: String, default: null },
  emailVerificationExpires: { type: Date, default: null },
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordHistory: [String],
  accountStatus: { type: String, enum: ['active', 'suspended', 'deactivated'], default: 'active' },
  failedLoginAttempts: { type: Number, default: 0 },
  lockoutUntil: { type: Date, default: null }
}, { timestamps: true });


UserSchema.statics.createAdminUser = async function(adminData: {
  email: string;
  password: string;
  name: string;
}): Promise<IUser> {
  const adminUser = new this({
    ...adminData,
    role: 'admin',
    isAdmin: true,
    isEmailVerified: true,
    accountStatus: 'active'
  });
  await adminUser.save();
  return adminUser;
};

interface IUserModel extends Model<IUser> {
  createAdminUser(adminData: {
    email: string;
    password: string;
    name: string;
  }): Promise<IUser>;
}

UserSchema.methods.getTwoFAStatus = function(): boolean {
  return this.isTwoFactorEnabled;
};


UserSchema.statics.createAdminUser = async function(adminData: {
  email: string;
  password: string;
  name: string;
}): Promise<IUser> {
  const adminUser = new this({
    ...adminData,
    role: 'admin',
    isAdmin: true,
    isEmailVerified: true
  });
  await adminUser.save();
  return adminUser;
};


UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.addPasswordToHistory(this.password);
    next();
  } catch (error: any) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.generateVerificationToken = function(): string {
  const verificationToken = crypto.randomBytes(20).toString('hex');
  this.emailVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
  this.emailVerificationExpires = new Date(Date.now() + 24 * 3600000); // 24 hours
  return verificationToken;
};

UserSchema.methods.incrementFailedLoginAttempts = async function() {
  this.failedLoginAttempts += 1;
  if (this.failedLoginAttempts >= 5) {
    this.lockoutUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes lockout
  }
  await this.save();
};

UserSchema.methods.resetFailedLoginAttempts = async function() {
  this.failedLoginAttempts = 0;
  this.lockoutUntil = null;
  await this.save();
};

UserSchema.methods.isLockedOut = function(): boolean {
  return this.lockoutUntil && this.lockoutUntil > new Date();
};

UserSchema.methods.addPasswordToHistory = function(password: string) {
  this.passwordHistory.push(password);
  if (this.passwordHistory.length > 5) {
    this.passwordHistory.shift();
  }
};

UserSchema.methods.isPasswordInHistory = function(password: string): boolean {
  return this.passwordHistory.some((oldPassword: string) => bcrypt.compareSync(password, oldPassword));
};

export const User = mongoose.model<IUser, IUserModel>('User', UserSchema);
```

# backend/src/models/code.model.ts

```ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ICode extends Document {
  rawCode: string;
  interpretedStructure: object;
  createdAt: Date;
}

const CodeSchema: Schema = new Schema({
  rawCode: { type: String, required: true },
  interpretedStructure: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Code = mongoose.model<ICode>('Code', CodeSchema);
```

# backend/src/models/activity-log.model.ts

```ts
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';
import { IWorkspace } from './workspace.model';

export interface IActivityLog extends Document {
  workspace: IWorkspace['_id'];
  user: IUser['_id'];
  action: string;
  details: string;
  createdAt: Date;
}

const ActivityLogSchema: Schema = new Schema({
  workspace: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  details: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ActivityLog = mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
```

# backend/src/middleware/rateLimiter.ts

```ts
// src/middleware/rateLimiter.ts
import rateLimit from 'express-rate-limit';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many login attempts, please try again after 15 minutes'
});

export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // limit each IP to 3 requests per windowMs
  message: 'Too many password reset attempts, please try again after an hour'
});
```

# backend/src/middleware/auth.middleware.ts

```ts
// backend/src/middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user.model';
import { AuthenticatedRequest } from '../types';
const JWT_SECRET = process.env.JWT_SECRET ;

export interface AuthRequest extends Request {
  user?: IUser;
  cache?: any;
  credentials?: any;
  destination?: any;
  integrity?: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string, role: string };
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      // Check if the route requires admin access
      const requiresAdmin = req.baseUrl.includes('/admin');
      if (requiresAdmin && user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden: Admin access required' });
      }

      (req as any).user = user;
      next();
    } catch (jwtError) {
      if (jwtError instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ error: 'Token expired', refreshRequired: true });
      } else {
        return res.status(401).json({ error: 'Invalid token' });
      }
    }
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

export const refreshTokenMiddleware = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const newToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    const newRefreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' });

    res.json({ token: newToken, refreshToken: newRefreshToken, user });
  } catch (error) {
    console.error('Refresh Token Error:', error);
    res.status(401).json({ error: 'Invalid refresh token' });
  }
};


export type AuthMiddleware = (
  req: Request | AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<void>;
```

# backend/src/middleware/admin.middleware.ts

```ts
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user.model';

interface AuthRequest extends Request {
  user?: IUser;
}

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as AuthRequest).user;
    console.log('Admin Middleware - User:', user);
    console.log('Admin Middleware - User Role:', user?.role);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    console.log('Admin Middleware - Access granted');
    next();
  } catch (error) {
    console.error('Error in admin middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
```

# backend/src/environments/environment.ts

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};

```

# backend/src/controllers/workspace.controller.ts

```ts
// /backend/src/controllers/workspace.controller.ts
import { Response ,Request} from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Workspace, IWorkspace ,IFolder , IForm} from '../models/workspace.model';
import { User } from '../models/user.model';
import { emitWorkspaceUpdate, getIo,emitCursorPosition } from '../services/socket.service';
import mongoose from 'mongoose';
import { ActivityLog } from '../models/activity-log.model';
import { Parser } from 'json2csv';

export const createWorkspace = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const { name, description } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length < 3 || name.trim().length > 50) {
      res.status(400).json({ message: 'Invalid workspace name. It must be between 3 and 50 characters.' });
      return;
    }
    const existingWorkspace = await Workspace.findOne({ name: name.trim(), owner: req.user._id });
    if (existingWorkspace) {
      res.status(409).json({ message: 'A workspace with this name already exists' });
      return;
    }
    const workspace = new Workspace({
      name: name.trim(),
      description: description || '',
      owner: req.user._id,
      members: [{ user: req.user._id, role: 'owner' }]
    });

    await workspace.save();
    await logActivity(workspace, req.user._id.toString(), 'create_workspace', `Created workspace: ${workspace.name}`);
    res.status(201).json(workspace);
  } catch (error: unknown) {
    console.error('Error creating workspace:', error);
    const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error creating workspace', error: errorMessage });
  }
};

export const getWorkspaces = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const workspaces = await Workspace.find({ 'members.user': req.user._id })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Workspace.countDocuments({ 'members.user': req.user._id });
    res.json({
      workspaces,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalWorkspaces: total
    });
  } catch (error) {
    console.error('Error fetching workspaces:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching workspaces', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching workspaces' });
    }
  }
};

export const getWorkspace = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const workspace = await Workspace.findOne({ _id: req.params.id, 'members.user': req.user._id });
    if (!workspace) {
      res.status(404).json({ message: 'Workspace not found or you do not have access to it' });
      return;
    }
    res.json(workspace);
  } catch (error) {
    console.error('Error fetching workspace:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching workspace', error: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching workspace' });
    }
  }
};



export const updateWorkspace = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const { name, description } = req.body;
    if (!name || typeof name !== 'string' || name.length < 3 || name.length > 50) {
      res.status(400).json({ message: 'Invalid workspace name. It must be between 3 and 50 characters.' });
      return;
    }
    const workspace = await Workspace.findById(req.params.id);
    
    if (!workspace) {
      res.status(404).json({ message: 'Workspace not found' });
      return;
    }
    if (!canModifyWorkspace(workspace, req.user._id.toString())) {
      res.status(403).json({ message: 'Forbidden: You do not have permission to update this workspace' });
      return;
    }
    
    workspace.set('name', name.trim());
    workspace.set('description', description || '');
    
    const updatedWorkspace = await workspace.save();
    await logActivity(updatedWorkspace, req.user._id.toString(), 'update_workspace', `Updated workspace: ${updatedWorkspace.name}`);

    if (updatedWorkspace && updatedWorkspace._id) {
      emitWorkspaceUpdate(updatedWorkspace._id.toString(), { 
        type: 'update', 
        workspace: updatedWorkspace.toObject() 
      });
    }
    
    res.json(updatedWorkspace);
  } catch (error) {
    console.error('Error updating workspace:', error);
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ message: 'Invalid workspace data', error: error.message });
      } else {
        res.status(500).json({ message: 'Error updating workspace', error: error.message });
      }
    } else {
      res.status(500).json({ message: 'Error updating workspace', error: 'Unknown error' });
    }
  }
};

export const deleteWorkspace = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      res.status(404).json({ message: 'Workspace not found' });
      return;
    }
    if (!canModifyWorkspace(workspace, req.user._id.toString())) {
      res.status(403).json({ message: 'Forbidden: You do not have permission to delete this workspace' });
      return;
    }
    await Workspace.findByIdAndDelete(workspace._id);
        // Log the activity
        await logActivity(workspace, req.user._id.toString(), 'delete_workspace', `Deleted workspace: ${workspace.name}`);
        
    res.json({ message: 'Workspace deleted successfully' });
  } catch (error: unknown) {
    console.error('Error deleting workspace:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error deleting workspace', error: error.message });
    } else {
      res.status(500).json({ message: 'Error deleting workspace', error: 'Unknown error' });
    }
  }
};

function isIWorkspace(workspace: any): workspace is IWorkspace {
  return workspace && typeof workspace === 'object' && '_id' in workspace;
}


export const inviteMember = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const { email, role } = req.body;
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      res.status(404).json({ message: 'Workspace not found' });
      return;
    }
    if (!canModifyWorkspace(workspace, req.user._id.toString())) {
      res.status(403).json({ message: 'Forbidden: You do not have permission to invite members' });
      return;
    }
    const invitedUser = await User.findOne({ email });
    if (!invitedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if (workspace.members.some(member => member.user.toString() === invitedUser._id.toString())) {
      res.status(400).json({ message: 'User is already a member of this workspace' });
      return;
    }
    workspace.members.push({
      user: invitedUser._id,
      role: role || 'viewer',
      permissions: {
        read: true,
        write: role === 'editor' || role === 'admin',
        delete: role === 'admin',
        manageUsers: role === 'admin'
      }
    });
       const updatedWorkspace = await workspace.save();
        // Log the activity
    await logActivity(updatedWorkspace, req.user._id.toString(), 'invite_member', `Invited ${invitedUser.email} to workspace: ${updatedWorkspace.name}`);
     if (updatedWorkspace && updatedWorkspace._id) {
      emitWorkspaceUpdate(updatedWorkspace._id.toString(), { 
        type: 'memberInvited', 
        workspace: updatedWorkspace.toObject() 
      });
    }
    
    res.status(200).json({ message: 'Member invited successfully' });
  } catch (error) {
    console.error('Error inviting member:', error);
    if (error instanceof mongoose.Error) {
      res.status(500).json({ message: 'Database error while inviting member', error: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: 'Error inviting member', error: error.message });
    } else {
      res.status(500).json({ message: 'Unknown error while inviting member' });
    }
  }
};

// Make sure this function is defined in your file or imported
function canModifyWorkspace(workspace: any, userId: string): boolean {
  const member = workspace.members.find((m: any) => m.user.toString() === userId);
  return member && (member.role === 'owner' || member.role === 'admin' || member.permissions.manageUsers);
}
export const updateMemberRole = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const { role } = req.body;
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      res.status(404).json({ message: 'Workspace not found' });
      return;
    }
    if (!canModifyWorkspace(workspace, req.user._id.toString())) {
      res.status(403).json({ message: 'Forbidden: You do not have permission to update member roles' });
      return;
    }
    const memberIndex = workspace.members.findIndex(member => member.user.toString() === req.params.userId);
    if (memberIndex === -1) {
      res.status(404).json({ message: 'Member not found in this workspace' });
      return;
    }
    workspace.members[memberIndex].role = role;
    await workspace.save();
    res.status(200).json({ message: 'Member role updated successfully' });
  } catch (error: unknown) {
    console.error('Error updating member role:', error);
    res.status(500).json({ message: 'Error updating member role', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const removeMember = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      res.status(404).json({ message: 'Workspace not found' });
      return;
    }
    if (!canModifyWorkspace(workspace, req.user._id.toString())) {
      res.status(403).json({ message: 'Forbidden: You do not have permission to remove members' });
      return;
    }
    workspace.members = workspace.members.filter(member => member.user.toString() !== req.params.userId);
    await workspace.save();
    res.status(200).json({ message: 'Member removed successfully' });
  } catch (error: unknown) {
    console.error('Error removing member:', error);
    res.status(500).json({ message: 'Error removing member', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const joinWorkspace = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const workspaceId = req.params.id;
    const username = req.user.name || 'Anonymous';

    const io = getIo();
    // Use the socket ID from the handshake
    const socketId = req.headers['x-socket-id'] as string;
    const socket = io.sockets.sockets.get(socketId);
    
    if (socket) {
      socket.join(`workspace:${workspaceId}`);
      io.to(`workspace:${workspaceId}`).emit('workspace:userJoined', username);
      res.json({ message: 'Joined workspace successfully' });
    } else {
      res.status(400).json({ message: 'Socket not found' });
    }
  } catch (error) {
    console.error('Error joining workspace:', error);
    res.status(500).json({ message: 'Error joining workspace', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};



export const leaveWorkspace = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const workspaceId = req.params.id;
    const username = req.user.name || 'Anonymous';

    const io = getIo();
    // Use the socket ID from the handshake
    const socketId = req.headers['x-socket-id'] as string;
    const socket = io.sockets.sockets.get(socketId);
    
    if (socket) {
      socket.leave(`workspace:${workspaceId}`);
      io.to(`workspace:${workspaceId}`).emit('workspace:userLeft', username);
      res.json({ message: 'Left workspace successfully' });
    } else {
      res.status(400).json({ message: 'Socket not found' });
    }
  } catch (error) {
    console.error('Error leaving workspace:', error);
    res.status(500).json({ message: 'Error leaving workspace', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};
export const updateCursorPosition = (req: AuthRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized: User not authenticated' });
    return;
  }
  const { workspaceId, position } = req.body;
  emitCursorPosition(workspaceId, req.user._id.toString(), position);
  res.status(200).json({ message: 'Cursor position updated' });
};


export const updateMemberPermissions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const { role, permissions } = req.body;
    const workspace = await Workspace.findById(req.params.id);
    if (!workspace) {
      res.status(404).json({ message: 'Workspace not found' });
      return;
    }
    if (!canModifyWorkspace(workspace, req.user._id.toString())) {
      res.status(403).json({ message: 'Forbidden: You do not have permission to update member permissions' });
      return;
    }
    const memberIndex = workspace.members.findIndex(member => member.user.toString() === req.params.userId);
    if (memberIndex === -1) {
      res.status(404).json({ message: 'Member not found in this workspace' });
      return;
    }
    workspace.members[memberIndex].role = role;
    workspace.members[memberIndex].permissions = permissions;
    await workspace.save();
    res.status(200).json({ message: 'Member permissions updated successfully' });
  } catch (error: unknown) {
    console.error('Error updating member permissions:', error);
    res.status(500).json({ message: 'Error updating member permissions', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

async function logActivity(workspace: IWorkspace, userId: string, action: string, details: string) {
  try {
    if (workspace._id) {
      await ActivityLog.create({
        workspace: workspace._id,
        user: userId,
        action,
        details
      });
    } else {
      console.error('Workspace _id is undefined');
    }
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}

export const getActivityLogs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }

    const workspaceId = req.params.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const actionType = req.query.actionType as string;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : null;

    const query: any = { workspace: workspaceId };

    if (actionType) {
      query.action = actionType;
    }

    if (startDate && endDate) {
      query.createdAt = {
        $gte: startDate,
        $lte: endDate
      };
    }

    const [activityLogs, totalLogs] = await Promise.all([
      ActivityLog.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('user', 'name email')
        .lean(),
      ActivityLog.countDocuments(query)
    ]);

    res.json({
      activityLogs,
      currentPage: page,
      totalPages: Math.ceil(totalLogs / limit),
      totalLogs
    });
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    res.status(500).json({ message: 'Error fetching activity logs', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};


export const exportActivityLogs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }

    const workspaceId = req.params.id;
    const actionType = req.query.actionType as string;
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : null;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : null;

    const query: any = { workspace: workspaceId };

    if (actionType) {
      query.action = actionType;
    }

    if (startDate && endDate) {
      query.createdAt = {
        $gte: startDate,
        $lte: endDate
      };
    }

    const logs = await ActivityLog.find(query)
      .sort({ createdAt: -1 })
      .populate('user', 'name email');

    const fields = ['action', 'details', 'user.name', 'user.email', 'createdAt'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(logs);

    res.header('Content-Type', 'text/csv');
    res.attachment(`activity_logs_${workspaceId}.csv`);
    res.send(csv);
  } catch (error) {
    console.error('Error exporting activity logs:', error);
    res.status(500).json({ message: 'Error exporting activity logs', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};




//...previous old code of workspace.controller.ts

export const createFolder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { workspaceId } = req.params;
    const { name, parentFolderId } = req.body;
    console.log(`Creating folder '${name}' in workspace: ${workspaceId}, parent: ${parentFolderId || 'root'}`);

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      console.log(`Workspace not found: ${workspaceId}`);
      res.status(404).json({ message: 'Workspace not found' });
      return;
    }

    const newFolder = {
      _id: new mongoose.Types.ObjectId(),
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      forms: [],
      subfolders: []
    };

    if (parentFolderId) {
      const addSubfolderToParent = (folders: any[]): boolean => {
        for (let folder of folders) {
          if (folder._id.toString() === parentFolderId) {
            folder.subfolders.push(newFolder);
            return true;
          }
          if (folder.subfolders && addSubfolderToParent(folder.subfolders)) {
            return true;
          }
        }
        return false;
      };

      if (!addSubfolderToParent(workspace.folders)) {
        res.status(404).json({ message: 'Parent folder not found' });
        return;
      }
    } else {
      workspace.folders.push(newFolder);
    }

    await workspace.save();

    console.log(`Folder created successfully: ${newFolder._id}`);
    res.status(201).json(newFolder);
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ message: 'Error creating folder', error: (error as Error).message });
  }
};
export const updateFolder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { workspaceId, folderId } = req.params;
    const { name } = req.body;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      res.status(404).json({ message: 'Workspace not found' });
      return;
    }

    const updateFolder = (folders: any[]): boolean => {
      for (let folder of folders) {
        if (folder._id.toString() === folderId) {
          folder.name = name;
          return true;
        }
        if (folder.subfolders && updateFolder(folder.subfolders)) {
          return true;
        }
      }
      return false;
    };

    if (!updateFolder(workspace.folders)) {
      res.status(404).json({ message: 'Folder not found' });
      return;
    }

    await workspace.save();
    res.json({ message: 'Folder updated successfully' });
  } catch (error) {
    console.error('Error updating folder:', error);
    res.status(500).json({ message: 'Error updating folder', error: (error as Error).message });
  }
};

export const deleteFolder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { workspaceId, folderId } = req.params;
    console.log(`Attempting to delete folder ${folderId} from workspace ${workspaceId}`);

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      console.log(`Workspace ${workspaceId} not found`);
      res.status(404).json({ message: 'Workspace not found' });
      return;
    }

    const deleteFolderRecursive = (folders: any[]): boolean => {
      for (let i = 0; i < folders.length; i++) {
        if (folders[i]._id.toString() === folderId) {
          folders.splice(i, 1);
          return true;
        }
        if (folders[i].subfolders && deleteFolderRecursive(folders[i].subfolders)) {
          return true;
        }
      }
      return false;
    };

    if (!deleteFolderRecursive(workspace.folders)) {
      console.log(`Folder ${folderId} not found in workspace ${workspaceId}`);
      res.status(404).json({ message: 'Folder not found' });
      return;
    }

    await workspace.save();
    console.log(`Folder ${folderId} deleted successfully from workspace ${workspaceId}`);
    res.json({ message: 'Folder deleted successfully' });
  } catch (error) {
    console.error('Error deleting folder:', error);
    res.status(500).json({ message: 'Error deleting folder', error: (error as Error).message });
  }
};


export const getFolders = async (req: Request, res: Response) => {
  try {
    const { workspaceId } = req.params;
    const workspace = await Workspace.findById(workspaceId);
    
    if (!workspace) {
      return res.status(404).json({ message: 'Workspace not found' });
    }

    // Assuming folders are stored directly in the workspace document
    const folders = workspace.folders || [];

    res.status(200).json(folders);
  } catch (error) {
    console.error('Error getting folders:', error);

    // Checking if error is an instance of Error
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error getting folders', error: error.message });
    } else {
      res.status(500).json({ message: 'Error getting folders' });
    }
  }
};

export const getFormsInFolder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { workspaceId, folderId } = req.params;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      res.status(404).json({ message: 'Workspace not found' });
      return;
    }

    const folder = findFolderById(workspace.folders, folderId);
    if (!folder) {
      res.status(404).json({ message: 'Folder not found' });
      return;
    }

    const templates = folder.forms.filter(form => form.isTemplate);
    const instances = folder.forms.filter(form => !form.isTemplate);

    res.status(200).json({ templates, instances });
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'Error fetching forms', error: (error as Error).message });
  }
};  


// Helper functions
const findFolderById = (folders: IFolder[], id: string): IFolder | null => {
  for (const folder of folders) {
    if (folder._id.toString() === id) return folder;
    if (folder.subfolders) {
      const found = findFolderById(folder.subfolders, id);
      if (found) return found;
    }
  }
  return null;
};


// Update the helper function deleteFolderById to use IFolder
const deleteFolderById = (folders: IFolder[], id: string): boolean => {
  for (let i = 0; i < folders.length; i++) {
    if (folders[i]._id.toString() === id) {
      folders.splice(i, 1);
      return true;
    }
    if (folders[i].subfolders) {
      if (deleteFolderById(folders[i].subfolders, id)) return true;
    }
  }
  return false;
};


  // workspace controller


  export const createForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const { workspaceId, folderId } = req.params;
      const { name, structure, isTemplate = true, parentTemplateId } = req.body;
      
      console.log('Received form creation request:', { workspaceId, folderId, name, structure, isTemplate, parentTemplateId });
  
      if (!name || !structure) {
        res.status(400).json({ message: 'Name and structure are required' });
        return;
      }
  
      const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
        res.status(404).json({ message: 'Workspace not found' });
        return;
      }
  
      const folder = findFolderById(workspace.folders, folderId);
      if (!folder) {
        res.status(404).json({ message: 'Folder not found' });
        return;
      }
  
      const newForm: IForm = {
        _id: new mongoose.Types.ObjectId(),
        name,
        structure: {
          ...structure,
          parsedFields: structure.fields // Ensure we're storing the parsed fields
        },
        isTemplate,
        parentTemplateId: parentTemplateId ? new mongoose.Types.ObjectId(parentTemplateId) : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        submissions: []
      };
  
      folder.forms.push(newForm);
      await workspace.save();
  
      console.log('Form created successfully:', newForm);
      res.status(201).json({ message: 'Form created successfully', form: newForm });
    } catch (error) {
      console.error('Error creating form:', error);
      res.status(500).json({ message: 'Error creating form', error: (error as Error).message });
    }
  };
  

  export const updateForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const { workspaceId, folderId, formId } = req.params;
      const formData = req.body;
      
      console.log('Received form update request:', { workspaceId, folderId, formId, formData });

      const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
        res.status(404).json({ message: 'Workspace not found' });
        return;
      }

      const folder = findFolderById(workspace.folders, folderId);
      if (!folder) {
        res.status(404).json({ message: 'Folder not found' });
        return;
      }

      const formIndex = folder.forms.findIndex(form => form._id.toString() === formId);
      if (formIndex === -1) {
        res.status(404).json({ message: 'Form not found' });
        return;
      }

      folder.forms[formIndex] = {
        ...folder.forms[formIndex],
        ...formData,
        updatedAt: new Date()
      };

      await workspace.save();

      console.log('Form updated successfully:', folder.forms[formIndex]);
      res.json({ message: 'Form updated successfully', form: folder.forms[formIndex] });
    } catch (error) {
      console.error('Error updating form:', error);
      res.status(500).json({ message: 'Error updating form', error: (error as Error).message });
    }
  };



  export const deleteForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const { workspaceId, folderId, formId } = req.params;
      
      const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
        res.status(404).json({ message: 'Workspace not found' });
        return;
      }

      const deleteFormFromFolder = (folders: IFolder[]): boolean => {
        for (let folder of folders) {
          if (folder._id.toString() === folderId) {
            folder.forms = folder.forms.filter(form => form._id.toString() !== formId);
            return true;
          }
          if (folder.subfolders && deleteFormFromFolder(folder.subfolders)) {
            return true;
          }
        }
        return false;
      };

      if (!deleteFormFromFolder(workspace.folders)) {
        res.status(404).json({ message: 'Form not found' });
        return;
      }

      await workspace.save();

      // Emit socket event for form deletion
      const io = getIo();
      io.to(`workspace:${workspaceId}`).emit('form:delete', { folderId, formId });

      res.json({ message: 'Form deleted successfully' });
    } catch (error) {

      res.status(500).json({ message: 'Error deleting form', error: (error as Error).message });
    }
  };

  export const submitForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const { workspaceId, folderId, formId } = req.params;
      const { values, structure } = req.body;
  
      console.log('Received form submission:', { workspaceId, folderId, formId, values, structure });
  
      const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
        res.status(404).json({ message: 'Workspace not found' });
        return;
      }
  
      const folder = findFolderById(workspace.folders, folderId);
      if (!folder) {
        res.status(404).json({ message: 'Folder not found' });
        return;
      }
  
      const form = folder.forms.find(f => f._id.toString() === formId);
      if (!form) {
        res.status(404).json({ message: 'Form not found' });
        return;
      }
  
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
      let submittedInstance;
  
      if (form.isTemplate) {
        // Create a new instance based on the template
        const newInstance: IForm = {
          _id: new mongoose.Types.ObjectId(),
          name: `${form.name} - Instance ${formattedDate}`,
          structure: structure || form.structure || {},
          isTemplate: false,
          parentTemplateId: form._id,
          values: values,
          createdAt: currentDate,
          updatedAt: currentDate,
          submissions: [{
            _id: new mongoose.Types.ObjectId(),
            values: values,
            submissionDate: currentDate,
            createdAt: currentDate,
            updatedAt: currentDate
          }]
        };
  
        folder.forms.push(newInstance);
        submittedInstance = newInstance;
      } else {
        // Submit to an existing instance
        const newSubmission = {
          _id: new mongoose.Types.ObjectId(),
          values: values,
          submissionDate: currentDate,
          createdAt: currentDate,
          updatedAt: currentDate
        };
  
        if (!form.submissions) {
          form.submissions = [];
        }
        form.submissions.push(newSubmission);
        form.values = values;
        form.structure = structure || form.structure || {};
        form.updatedAt = currentDate;
        form.name = `${form.name.split(' - Instance')[0]} - Instance ${formattedDate}`;
        submittedInstance = form;
      }
  
      await workspace.save();
  
      console.log('Form submitted successfully:', submittedInstance);
      res.status(200).json({ 
        message: 'Form submitted successfully', 
        instance: submittedInstance 
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ message: 'Error submitting form', error: (error as Error).message });
    }
  };


  export const getFormInstances = async (req: Request, res: Response): Promise<void> => {
    try {
      const { workspaceId, folderId, formId } = req.params;
  
      const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
        res.status(404).json({ message: 'Workspace not found' });
        return;
      }
  
      const folder = findFolderById(workspace.folders, folderId);
      if (!folder) {
        res.status(404).json({ message: 'Folder not found' });
        return;
      }
  
      const instances = folder.forms.filter(form => !form.isTemplate && form.parentTemplateId?.toString() === formId);
  
      res.status(200).json(instances);
    } catch (error) {
      console.error('Error fetching form instances:', error);
      res.status(500).json({ message: 'Error fetching form instances', error: (error as Error).message });
    }
  };

  
  export const saveForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const { workspaceId, folderId, formId } = req.params;
      const { name, structure, values } = req.body;

      const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
        res.status(404).json({ message: 'Workspace not found' });
        return;
      }

      const folder = findFolderById(workspace.folders, folderId);
      if (!folder) {
        res.status(404).json({ message: 'Folder not found' });
        return;
      }

      const formIndex = folder.forms.findIndex(form => form._id.toString() === formId);
      if (formIndex === -1) {
        res.status(404).json({ message: 'Form not found' });
        return;
      }

      folder.forms[formIndex] = {
        ...folder.forms[formIndex],
        name,
        structure,
        values,
        updatedAt: new Date()
      };

      await workspace.save();

      res.status(200).json({ message: 'Form saved successfully', form: folder.forms[formIndex] });
    } catch (error) {
      console.error('Error saving form:', error);
      res.status(500).json({ message: 'Error saving form', error: (error as Error).message });
    }
  };

  export const getFormSubmissions = async (req: Request, res: Response): Promise<void> => {
    try {
      const { workspaceId, folderId, formId } = req.params;

      console.log('Fetching form submissions:', { workspaceId, folderId, formId });

      const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
        res.status(404).json({ message: 'Workspace not found' });
        return;
      }

      const folder = findFolderById(workspace.folders, folderId);
      if (!folder) {
        res.status(404).json({ message: 'Folder not found' });
        return;
      }

      const form = folder.forms.find(f => f._id.toString() === formId);
      if (!form) {
        res.status(404).json({ message: 'Form not found' });
        return;
      }

      const submissions = form.submissions || [];
      console.log(`Found ${submissions.length} submissions for form ${formId}`);

      res.status(200).json(submissions);
    } catch (error) {
      console.error('Error fetching form submissions:', error);
      res.status(500).json({ message: 'Error fetching form submissions', error: (error as Error).message });
    }
  };
```

# backend/src/controllers/user.controller.ts

```ts
// src/controllers/user.controller.ts

import { Response } from 'express';
import { User } from '../models/user.model';
import { AuthRequest } from '../middleware/auth.middleware';

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

export const updateUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const getUserCreditHistory = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.creditHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching credit history', error });
  }
};
```

# backend/src/controllers/code.controller.ts

```ts
// code.controller.ts
import { Request, Response } from 'express';
import { AsyncParserService } from '../services/parser.service';
import { ParserError } from '../services/parser-types';
import { ParserConfig } from '../services/config';
import { DefaultFieldParser } from '../services/fieldParsers'; // Add this import

const defaultConfig: ParserConfig = {
  fieldTypes: [
    { name: 'TEXT', parser: DefaultFieldParser, validationRules: [] },
    { name: 'NUMBER', parser: DefaultFieldParser, validationRules: [] },
    { name: 'DATE', parser: DefaultFieldParser, validationRules: [] },
    { name: 'BOOLEAN', parser: DefaultFieldParser, validationRules: [] },
    { name: 'SCALE', parser: DefaultFieldParser, validationRules: [] },
  ]
};

export const interpretCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    console.log("Received code for interpretation:");
    console.log(code); // Log the entire input
    const parser = new AsyncParserService(code, defaultConfig);
    const parsedStructure = await parser.parse();
    console.log("Parsed structure:", JSON.stringify(parsedStructure, null, 2));
    res.json({ success: true, structure: parsedStructure });
  } catch (error: unknown) {
    console.error('Error interpreting code:', error);
    if (error instanceof ParserError) {
      res.status(400).json({
        success: false,
        error: error.message,
        line: error.line,
        column: error.column,
        stack: error.stack
      });
    } else if (error instanceof Error) {
      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: error.message,
        stack: error.stack
      });
    } else {
      res.status(500).json({ success: false, error: 'Unknown error occurred' });
    }
  }
};
```

# backend/src/controllers/auth.controller.ts

```ts
//auth.contoller.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user.model';
import crypto from 'crypto';
import { EmailService } from '../services/email.service';
import speakeasy from 'speakeasy';
import { isStrongPassword } from '../utils/passwordUtils';
import { AuthRequest } from '../middleware/auth.middleware';
import { logAuthEvent } from '../services/auth-logger.service';
import QRCode from 'qrcode';
import { sign, verify } from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4200';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: 'Password does not meet strength requirements' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, password });
    const verificationToken = newUser.generateVerificationToken();
    await newUser.save();

    const verificationURL = `${FRONTEND_URL}/verify-email/${verificationToken}?email=${email}`;

    try {
      await EmailService.sendVerificationEmail(newUser.email, verificationURL);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
    }

    logAuthEvent('user_registered', newUser._id.toString());
    res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.' });
  } catch (error) {
    logAuthEvent('registration_error', 'unknown', { error: (error as Error).message });
    res.status(500).json({ message: 'Error registering user', error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      console.log(`Invalid password for user: ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.isLockedOut && user.isLockedOut()) {
      console.log(`Account locked for user: ${email}`);
      return res.status(423).json({ message: 'Account is locked. Please try again later.' });
    }

    if (!user.isEmailVerified && user.role !== 'admin') {
      return res.status(403).json({ 
        message: 'Email not verified. Please verify your email to login.',
        requiresVerification: true
      });
    }

    if (user.isTwoFactorEnabled) {
      return res.json({ requires2FA: true, userId: user._id });
    }

    await user.resetFailedLoginAttempts();

    const token = generateToken(user, rememberMe);
    const refreshToken = generateRefreshToken(user);
    logAuthEvent('successful_login', user._id.toString(), { rememberMe, role: user.role });

    user.lastLogin = new Date();
    await user.save();

    console.log('User logged in:', user);
    console.log('User role:', user.role);
    
    res.json({ 
      token, 
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    logAuthEvent('login_error', 'unknown', { error: (error as Error).message });
    res.status(500).json({ message: 'Error logging in', error: (error as Error).message });
  }
};



export const login2FA = async (req: Request, res: Response) => {
  try {
    const { email, password, token } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user.isTwoFactorEnabled) {
      return res.status(400).json({ message: '2FA is not enabled for this user' });
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret!,
      encoding: 'base32',
      token: token
    });

    if (!verified) {
      return res.status(400).json({ message: 'Invalid 2FA token' });
    }

    const jwtToken = generateToken(user, false);

    user.lastLogin = new Date();
    await user.save();

    res.json({ token: jwtToken, user: getUserResponseData(user) });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const logout = (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' });
};

export const enable2FA = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const secret = speakeasy.generateSecret({ length: 32 });
  req.user.twoFactorSecret = secret.base32;
  await req.user.save();

  const otpauthUrl = speakeasy.otpauthURL({
    secret: secret.ascii,
    label: req.user.email,
    issuer: process.env.TOTP_ISSUER || 'YourAppName'
  });

  const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);

  res.json({
    secret: secret.base32,
    qrCodeDataUrl
  });
};

export const verify2FA = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const { token } = req.body;
  const user = req.user;

  if (!user.twoFactorSecret) {
    res.status(400).json({ message: '2FA is not set up for this user' });
    return;
  }

  const verified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: 'base32',
    token: token,
    window: 1
  });

  if (verified) {
    user.isTwoFactorEnabled = true;
    await user.save();
    res.json({ verified: true, message: '2FA enabled successfully' });
  } else {
    res.status(400).json({ verified: false, message: 'Invalid token' });
  }
};

export const disable2FA = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const user = req.user;

  if (!user.isTwoFactorEnabled) {
    res.status(400).json({ message: '2FA is not enabled for this user' });
    return;
  }

  user.twoFactorSecret = undefined;
  user.isTwoFactorEnabled = false;
  await user.save();
  res.json({ disabled: true, message: '2FA disabled successfully' });
};

export const getTwoFAStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return
  }
  res.json({ enabled: req.user.isTwoFactorEnabled });
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    const resetURL = `${FRONTEND_URL}/reset-password/${resetToken}`;
    await EmailService.sendPasswordResetEmail(user.email, resetURL);

    res.status(200).json({ message: 'If a user with this email exists, a password reset link has been sent.' });
  } catch (error) {
    console.error('Error in password reset request:', error);
    res.status(500).json({ message: 'Error in password reset request', error });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    if (!isStrongPassword(newPassword)) {
      return res.status(400).json({ message: 'Password does not meet strength requirements' });
    }

    if (user.isPasswordInHistory(newPassword)) {
      return res.status(400).json({ message: 'Password has been used recently. Please choose a different password.' });
    }

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Error resetting password', error });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error });
  }
};

export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(400).json({ message: 'User not found' });
    return;
  }
  if (!(await user.comparePassword(currentPassword))) {
    res.status(400).json({ message: 'Current password is incorrect' });
    return;
  }

  if (!isStrongPassword(newPassword)) {
    res.status(400).json({ message: 'Password does not meet strength requirements' });
    return;
  }

  if (user.isPasswordInHistory(newPassword)) {
    res.status(400).json({ message: 'Password has been used recently' });
    return;
  }

  user.addPasswordToHistory(user.password);
  user.password = newPassword;
  await user.save();

  logAuthEvent('password_changed', user._id.toString());
  res.json({ message: 'Password changed successfully' });
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token', isExpired: true });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    const jwtToken = generateToken(user, false);

    res.status(200).json({ message: 'Email verified successfully', token: jwtToken });
  } catch (error) {
    console.error('Error verifying email:', error);
    res.status(500).json({ message: 'Error verifying email', error });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    const decoded = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newToken = generateToken(user, false);
    const newRefreshToken = generateRefreshToken(user);

    res.json({ 
      token: newToken, 
      refreshToken: newRefreshToken,
      user: getUserResponseData(user)
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};




export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email, isEmailVerified: false });

    if (!user) {
      return res.status(400).json({ message: 'User not found or already verified' });
    }

    const verificationToken = user.generateVerificationToken();
    await user.save();

    const verificationURL = `${FRONTEND_URL}/verify-email/${verificationToken}`;
    await EmailService.sendVerificationEmail(user.email, verificationURL);

    res.status(200).json({ message: 'Verification email resent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error resending verification email', error });
  }
};

// Helper functions
function generateToken(user: IUser, rememberMe: boolean): string {
  console.log('Generating token with secret:', process.env.JWT_SECRET);
  return sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: rememberMe ? '30d' : process.env.JWT_EXPIRATION }
  );
}
function generateRefreshToken(user: IUser): string {
  return sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: '7d' }
  );
}

function getUserResponseData(user: IUser) {
  return {
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    requires2FA: user.isTwoFactorEnabled,
    twoFactorCompleted: false,
    isEmailVerified: user.isEmailVerified
  };
}

export const getEmailVerificationStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    console.log('Checking email verification status for user:', userId);
    
    const user = await User.findById(userId);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User email verification status:', user.isEmailVerified);
    res.json({ isVerified: user.isEmailVerified });
  } catch (error) {
    console.error('Error checking email verification status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

```

# frontend/src/environments/environment.ts

```ts
// src/environments/environment.ts

export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  stripePublicKey: 'your_stripe_public_key_here'
};

```

# frontend/src/app/app.routes.ts

```ts
// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { CodeAnalysisComponent } from './components/code-analysis/code-analysis.component';
import { FormGeneratorComponent } from './components/form-generator/form-generator.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { WorkspaceListComponent } from './components/workspace/workspace-list/workspace-list.component';
import { WorkspaceDetailComponent } from './components/workspace/workspace-detail/workspace-detail.component';
import { CreditsComponent } from './components/credits/credits.component';
import { CreditPackageComponent } from './components/credit-package/credit-package.component';
import { AdminCreditPackagesComponent } from './components/admin/admin-credit-packages.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { EmailVerificationComponent } from './components/auth/email/email-verification/email-verification.component';
import { PasswordResetRequestComponent } from './components/auth/password-reset-request/password-reset-request.component';
import { PasswordResetComponent } from './components/auth/password-reset/password-reset.component';
import { TwoFactorAuthComponent } from './components/auth/two-factor-auth/two-factor-auth.component';
import { RequestVerificationEmailComponent } from './components/auth/email/request-verification-email/request-verification-email.component';
import { WorkspaceCreateComponent } from './components/workspace/workspace-create/workspace-create.component';

export const routes: Routes = [
  { path: '', component: CodeAnalysisComponent, canActivate: [AuthGuard] },
  { path: 'generate-form', component: FormGeneratorComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email/:token', component: EmailVerificationComponent },
  { path: 'request-verification-email', component: RequestVerificationEmailComponent },
  { path: 'password-reset-request', component: PasswordResetRequestComponent },
  { path: 'password-reset/:token', component: PasswordResetComponent },
  { 
    path: 'two-factor-auth', 
    component: TwoFactorAuthComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'workspaces', 
    children: [
      { path: '', component: WorkspaceListComponent },
      { path: 'create', component: WorkspaceCreateComponent },
      { path: ':id', component: WorkspaceDetailComponent }
    ],
    canActivate: [AuthGuard] 
  },
    { path: 'workspaces/:id', component: WorkspaceDetailComponent, canActivate: [AuthGuard] },
  { path: 'credits', component: CreditsComponent, canActivate: [AuthGuard] },
  { path: 'credit-packages', component: CreditPackageComponent, canActivate: [AuthGuard] },
  { path: 'admin/credit-packages', component: AdminCreditPackagesComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard] },
];
```

# frontend/src/app/app.config.ts

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { AuthInterceptor } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor]), withFetch()),
    provideClientHydration(),
    provideAnimations(),
    provideAnimationsAsync()
  ]
};
```

# frontend/src/app/app.config.server.ts

```ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

```

# frontend/src/app/app.component.ts

```ts
//src/app/app.component.ts
import { Component, inject, PLATFORM_ID, OnInit ,ViewEncapsulation , OnDestroy} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './services/auth.service';
import { CreditService ,CreditInfo } from '../app/services/credit.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { switchMap } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';
import { ConnectionStatusComponent } from './components/workspace/connection-status/connection-status.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    ConnectionStatusComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  authService = inject(AuthService);
  private creditService = inject(CreditService);

  creditInfo: CreditInfo | null = null;
  private creditSubscription: Subscription | null = null;

  credits: number = 0;

  ngOnInit() {
    this.authService.checkStoredAuthData();
    if (this.authService.currentUserValue) {
      this.startCreditUpdates();
    }
  }
  ngOnDestroy() {
    this.stopCreditUpdates();
  }

  private startCreditUpdates() {
    this.creditSubscription = timer(0, 60000) // Initial call and then every minute
      .pipe(
        switchMap(() => this.creditService.getCreditBalance())
      )
      .subscribe({
        next: (info) => this.creditInfo = info,
        error: (error) => console.error('Error loading credits', error)
      });
  }

  private stopCreditUpdates() {
    if (this.creditSubscription) {
      this.creditSubscription.unsubscribe();
      this.creditSubscription = null;
    }
  }

  getCreditsTooltip(): string {
    if (!this.creditInfo) return 'Loading credit information...';
    const lastUpdated = new Date(this.creditInfo.lastUpdated).toLocaleString();
    return `Last updated: ${lastUpdated}\nRecent transactions: ${this.creditInfo.recentTransactions.length}`;
  }


  isLargeScreen(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return window.innerWidth > 1200;
    }
    return true;
  }

  logout(): void {
    this.authService.logout();
    // Optionally, redirect to login page or home page after logout
  }

  loadCredits(): void {
    this.creditService.getCreditBalance().subscribe({
      next: (response) => this.credits = response.credits,
      error: (error) => console.error('Error loading credits', error)
    });
  }
}

```

# frontend/src/app/app.component.scss

```scss
.app-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .app-toolbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  
  .app-sidenav-container {
    flex: 1;
    margin-top: 64px;
  }
  
  .app-sidenav {
    width: 250px;
  }
  
  .app-content {
    padding: 20px;
  }
  
  .active-link {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 599px) {
    .app-sidenav-container {
      margin-top: 56px;
    }
  }
```

# frontend/src/app/app.component.html

```html
<!-- src/app/app.component.html-->
<div class="app-container">
  <mat-toolbar color="primary" class="app-toolbar">
    <button mat-icon-button (click)="sidenav.toggle()">
      <mat-icon>menu</mat-icon>
    </button>
    <span>Code Interpretation Platform</span>
    <span class="spacer"></span>
    <app-connection-status></app-connection-status>
    @if (authService.currentUserValue) {
      <span class="credits" [matTooltip]="getCreditsTooltip()">
        Credits: {{ creditInfo?.credits || 0 }}
      </span>
      <button mat-button (click)="logout()">Logout</button>
    } @else {
      <a mat-button routerLink="/login">Login</a>
      <a mat-button routerLink="/register">Register</a>
    }
  </mat-toolbar>

  
    <mat-sidenav-container class="app-sidenav-container">
      <mat-sidenav #sidenav mode="side" [opened]="isLargeScreen()" class="app-sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">
            <mat-icon matListItemIcon>code</mat-icon>
            <span matListItemTitle>Code Analysis</span>
          </a>
          <a mat-list-item routerLink="/workspaces" routerLinkActive="active-link">
            <mat-icon matListItemIcon>work</mat-icon>
            <span matListItemTitle>Workspaces</span>
          </a>
          <a mat-list-item routerLink="/credits" routerLinkActive="active-link">
            <mat-icon matListItemIcon>account_balance_wallet</mat-icon>
            <span matListItemTitle>Credits</span>
          </a>
          @if (authService.isAdmin()) {
            <a mat-list-item routerLink="/admin" routerLinkActive="active-link">
              <mat-icon matListItemIcon>dashboard</mat-icon>
              <span matListItemTitle>Admin Dashboard</span>
            </a>
          }
          
        </mat-nav-list>
      </mat-sidenav>
  
      <mat-sidenav-content class="app-content">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  </div>
```

# frontend/src/app/services/workspace.service.ts

```ts
//frontend/src/app/services/workspace.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject ,merge} from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError ,map} from 'rxjs/operators';
import { ActivityLogsResponse , ActivityLog } from '../interfaces/activity-log.interface';
import { WebSocketService } from './web-socket.service';
import {Workspace  , WorkspacesResponse  ,FormUpdate} from '../interfaces/workspace.interface'



@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private apiUrl = `${environment.apiUrl}/workspaces`;
  private formUpdateSubject = new BehaviorSubject<FormUpdate | null>(null);

  constructor(private http: HttpClient, private webSocketService: WebSocketService) {
    this.listenForActivityLogUpdates();
    this.handleReconnection();
  }

    private activityLogsSubject = new BehaviorSubject<ActivityLog[]>([]);

    getWorkspaces(page: number = 1, limit: number = 10): Observable<WorkspacesResponse> {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString());
  
      return this.http.get<WorkspacesResponse>(this.apiUrl, { params }).pipe(
        catchError(this.handleError)
      );
    }

    getWorkspace(id: string): Observable<Workspace | null> {
      return this.getWorkspaces().pipe(
        map(response => response.workspaces.find(w => w._id === id) || null),
        catchError(this.handleError)
      );
    }

    loadWorkspace(id: string): Observable<Workspace> {
      return this.http.get<Workspace>(`${this.apiUrl}/${id}`).pipe(
        catchError(this.handleError)
      );
    }
    
  createWorkspace(name: string, description: string): Observable<Workspace> {
    return this.http.post<Workspace>(this.apiUrl, { name, description }).pipe(
      catchError(this.handleError)
    );
  }



  updateWorkspace(id: string, name: string, description: string): Observable<Workspace> {
    return this.http.put<Workspace>(`${this.apiUrl}/${id}`, { name, description }).pipe(
      catchError(this.handleError)
    );
  }


  deleteWorkspace(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getUserRole(workspace: Workspace, userId: string): 'owner' | 'admin' | 'editor' | 'viewer' | null {
    const member = workspace.members.find(m => m.user === userId);
    return member ? member.role : null;
  }
  inviteMember(workspaceId: string, email: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${workspaceId}/invite`, { email, role });
  }

  updateMemberRole(workspaceId: string, userId: string, role: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${workspaceId}/members/${userId}`, { role });
  }

  removeMember(workspaceId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${workspaceId}/members/${userId}`);
  }

  joinWorkspace(id: string): Observable<any> {
    try {
      const headers = new HttpHeaders().set('x-socket-id', this.webSocketService.getSocketId());
      return this.http.post(`${this.apiUrl}/${id}/join`, {}, { headers });
    } catch (error) {
      console.error('Error getting socket ID:', error);
      return throwError(() => new Error('Unable to join workspace: Socket ID not available'));
    }
  }

  leaveWorkspace(id: string): Observable<any> {
    try {
      const headers = new HttpHeaders().set('x-socket-id', this.webSocketService.getSocketId());
      return this.http.post(`${this.apiUrl}/${id}/leave`, {}, { headers });
    } catch (error) {
      console.error('Error getting socket ID:', error);
      return throwError(() => new Error('Unable to leave workspace: Socket ID not available'));
    }
  }


  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status}, message: ${error.message}`;
      if (error.status === 404) {
        errorMessage = 'The requested resource was not found. Please check your workspace and folder IDs.';
      }
    }
    return throwError(() => new Error(errorMessage));
  }


  updateMemberPermissions(workspaceId: string, userId: string, role: string, permissions: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${workspaceId}/members/${userId}/permissions`, { role, permissions }).pipe(
      catchError(this.handleError)
    );
  }
  getActivityLogs(
    workspaceId: string, 
    page: number = 1, 
    limit: number = 20, 
    actionType?: string,
    startDate?: Date | null,
    endDate?: Date | null
  ): Observable<ActivityLogsResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (actionType) {
      params = params.set('actionType', actionType);
    }
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    return this.http.get<ActivityLogsResponse>(`${this.apiUrl}/${workspaceId}/activity-logs`, { params });
    }

  getRealtimeActivityLogs(workspaceId: string): Observable<ActivityLog[]> {
    return merge(
      this.activityLogsSubject.asObservable(),
      this.getActivityLogs(workspaceId).pipe(
        map(response => {
          this.activityLogsSubject.next(response.activityLogs);
          return response.activityLogs;
        })
      )
    );
  }
  private listenForActivityLogUpdates() {
    this.webSocketService.getActivityLogUpdates().subscribe(newLog => {
      if (newLog) {
        this.activityLogsSubject.next([newLog, ...this.activityLogsSubject.value]);
      }
    });
  }
  private handleReconnection() {
    this.webSocketService.getReconnectionStatus().subscribe(isReconnecting => {
      if (!isReconnecting) {
        // Reload data after successful reconnection
        this.reloadWorkspaceData();
      }
    });
  }

  private reloadWorkspaceData() {
    // Implement logic to reload necessary workspace data
    console.log('Reloading workspace data after reconnection');
    // Example: this.loadWorkspaces();
  }
  
  exportActivityLogs(
    workspaceId: string,
    actionType?: string,
    startDate?: Date | null,
    endDate?: Date | null
  ): Observable<Blob> {
    let params = new HttpParams();

    if (actionType) {
      params = params.set('actionType', actionType);
    }
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }

    return this.http.get(`${this.apiUrl}/${workspaceId}/activity-logs/export`, {
      params,
      responseType: 'blob'
    });
  }






  getFormUpdates(): Observable<FormUpdate | null> {
    return this.formUpdateSubject.asObservable();
  }

  submitForm(workspaceId: string, folderId: string, formId: string, formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}/submit`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  
}

```

# frontend/src/app/services/web-socket.service.ts

```ts
//backend/src/app/services/web-socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ActivityLog } from '../interfaces/activity-log.interface';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;
  private workspaceUpdateSubject = new BehaviorSubject<any>(null);
  private activeUsersSubject = new BehaviorSubject<string[]>([]);
  private activityLogSubject = new BehaviorSubject<ActivityLog | null>(null);
  private reconnectionSubject = new BehaviorSubject<boolean>(false);
  private cursorPositionsSubject = new BehaviorSubject<{[userId: string]: {x: number, y: number}}>({});
  private connectionStatusSubject = new BehaviorSubject<'connected' | 'disconnected' | 'connecting'>('disconnected');
  private reconnectionAttemptsSubject = new BehaviorSubject<number>(0);
  private reconnectionAttempts = 0;
  private maxReconnectionAttempts = 5;
  private formUpdateSubject = new BehaviorSubject<any>(null);
  
  constructor() {
    this.socket = io(environment.apiUrl, {
      transports: ['websocket'],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectionAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      randomizationFactor: 0.5
    });
    this.setupSocketListeners();
  }

  private setupSocketListeners() {
    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectionSubject.next(false);
      this.reconnectionAttempts = 0;
      this.connectionStatusSubject.next('connected');
      this.reconnectionAttemptsSubject.next(0);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      this.reconnectionSubject.next(true);
      this.connectionStatusSubject.next('disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.reconnectionAttempts++;
      this.reconnectionAttemptsSubject.next(this.reconnectionAttempts);
      this.connectionStatusSubject.next('connecting');
      if (this.reconnectionAttempts > this.maxReconnectionAttempts) {
        this.reconnectionSubject.next(false);
        console.error('Max reconnection attempts reached');
      }
    });


  

    this.socket.on('workspace:update', (data) => {
      this.workspaceUpdateSubject.next(data);
    });

    this.socket.on('workspace:userJoined', (username: string) => {
      const currentUsers = this.activeUsersSubject.value;
      if (!currentUsers.includes(username)) {
        this.activeUsersSubject.next([...currentUsers, username]);
      }
    });

    this.socket.on('workspace:userLeft', (username: string) => {
      const currentUsers = this.activeUsersSubject.value;
      this.activeUsersSubject.next(currentUsers.filter(user => user !== username));
    });

    this.socket.on('activityLog:new', (activityLog: ActivityLog) => {
      this.activityLogSubject.next(activityLog);
    });

    this.socket.on('workspace:cursorMove', ({ userId, position }) => {
      this.cursorPositionsSubject.next({
        ...this.cursorPositionsSubject.value,
        [userId]: position
      });
    });

    
    this.socket.on('form:update', (data) => {
      this.formUpdateSubject.next(data);
    });

    this.socket.on('form:create', (data) => {
      this.formUpdateSubject.next({ ...data, action: 'create' });
    });

    this.socket.on('form:delete', (data) => {
      this.formUpdateSubject.next({ ...data, action: 'delete' });
    });
  }

  getFormUpdates(): Observable<any> {
    return this.formUpdateSubject.asObservable();
  }

  joinWorkspace(workspaceId: string) {
    this.socket.emit('joinWorkspace', workspaceId);
  }

  leaveWorkspace(workspaceId: string) {
    this.socket.emit('leaveWorkspace', workspaceId);
  }

  getWorkspaceUpdates(): Observable<any> {
    return this.workspaceUpdateSubject.asObservable();
  }

  getActiveUsers(): Observable<string[]> {
    return this.activeUsersSubject.asObservable();
  }

  getActivityLogUpdates(): Observable<ActivityLog | null> {
    return this.activityLogSubject.asObservable();
  }

  getSocketId(): string {
    if (this.socket.id) {
      return this.socket.id;
    }
    throw new Error('Socket ID is not available');
  }

  getCursorPositions(): Observable<{[userId: string]: {x: number, y: number}}> {
    return this.cursorPositionsSubject.asObservable();
  }

  updateCursorPosition(workspaceId: string, position: {x: number, y: number}) {
    this.socket.emit('workspace:cursorMove', { workspaceId, position });
  }

  getReconnectionStatus(): Observable<boolean> {
    return this.reconnectionSubject.asObservable();
  }

  reconnect() {
    if (this.socket.disconnected) {
      this.socket.connect();
    }
  }

  getConnectionStatus(): Observable<'connected' | 'disconnected' | 'connecting'> {
    return this.connectionStatusSubject.asObservable();
  }

  getReconnectionAttempts(): Observable<number> {
    return this.reconnectionAttemptsSubject.asObservable();
  }
  
}
```

# frontend/src/app/services/user.service.ts

```ts
// src/app/services/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  _id: string;
  name: string;
  email: string;
  credits: number;
  role: 'user' | 'admin';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/me`);
  }

  updateUser(userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/me`, userData);
  }

  getUserCreditHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/me/credit-history`);
  }
}
```

# frontend/src/app/services/time-management.service.ts

```ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs';

export interface StopwatchData {
  totalDuration: number;
  startTime: string;
  endTime: string;
  laps: LapData[];
  isRunning: boolean;
}

export interface LapData {
  lapNumber: number;
  lapTime: number;
  cumulativeTime: number;
  timestamp: string;
}

export interface TimerData {
  totalDuration: number;
  startTime: string;
  endTime: string;
  currentPhase: 'work' | 'break' | 'longBreak';
  currentSession: number;
  remainingTime: number;
  sessions: SessionData[];
  isRunning: boolean;
}

export interface SessionData {
  sessionNumber: number;
  workDuration: number;
  breakDuration: number;
  workStartTime: string;
  workEndTime: string;
  breakStartTime: string;
  breakEndTime: string;
  completed: boolean;
}

export interface TimerSettings {
  workDuration: number;
  breakDuration: number;
  sessions: number;
  longBreakDuration?: number;
  longBreakInterval?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TimeManagementService {
  private stopwatchSubject = new BehaviorSubject<StopwatchData | null>(null);
  private timerSubject = new BehaviorSubject<TimerData | null>(null);
  private stopwatchData: StopwatchData | null = null;
  private timerData: TimerData | null = null;
  private timerSettings: TimerSettings | null = null;
  private stopwatchInterval: Subscription | null = null;
  private timerInterval: Subscription | null = null;

  constructor() {
    console.log('TimeManagementService initialized');
  }

  // Common methods
  start(type: 'stopwatch' | 'timer'): void {
    if (type === 'stopwatch') {
      this.startStopwatch();
    } else {
      this.startTimer();
    }
  }

  stop(type: 'stopwatch' | 'timer'): void {
    if (type === 'stopwatch') {
      this.stopStopwatch();
    } else {
      this.stopTimer();
    }
  }

  reset(type: 'stopwatch' | 'timer'): void {
    if (type === 'stopwatch') {
      this.resetStopwatch();
    } else {
      this.resetTimer();
    }
  }

  // Stopwatch methods
  private startStopwatch(): void {
    if (this.stopwatchInterval) {
      console.warn('Stopwatch is already running');
      return;
    }
    const startTime = Date.now() - (this.stopwatchData?.totalDuration || 0);
    this.stopwatchData = this.stopwatchData || {
      totalDuration: 0,
      startTime: new Date(startTime).toISOString(),
      endTime: '',
      laps: [],
      isRunning: true
    };
    this.stopwatchInterval = interval(10).subscribe(() => {
      if (this.stopwatchData) {
        this.stopwatchData.totalDuration = Date.now() - startTime;
        this.updateStopwatchSubject();
      }
    });
    console.log('Stopwatch started');
  }

  private stopStopwatch(): void {
    if (this.stopwatchInterval) {
      this.stopwatchInterval.unsubscribe();
      this.stopwatchInterval = null;
      if (this.stopwatchData) {
        this.stopwatchData.endTime = new Date().toISOString();
        this.stopwatchData.isRunning = false;
        this.updateStopwatchSubject();
      }
      console.log('Stopwatch stopped');
    } else {
      console.warn('Stopwatch is not running');
    }
  }

  private resetStopwatch(): void {
    this.stopStopwatch();
    this.stopwatchData = {
      totalDuration: 0,
      startTime: '',
      endTime: '',
      laps: [],
      isRunning: false
    };
    this.updateStopwatchSubject();
    console.log('Stopwatch reset');
  }

  lap(): void {
    if (this.stopwatchData && this.stopwatchData.isRunning) {
      const lastLap = this.stopwatchData.laps[this.stopwatchData.laps.length - 1];
      const lapTime = this.stopwatchData.totalDuration - (lastLap?.cumulativeTime || 0);
      this.stopwatchData.laps.push({
        lapNumber: this.stopwatchData.laps.length + 1,
        lapTime: lapTime,
        cumulativeTime: this.stopwatchData.totalDuration,
        timestamp: new Date().toISOString()
      });
      this.updateStopwatchSubject();
      console.log('Lap recorded');
    } else {
      console.warn('Cannot record lap: Stopwatch is not running');
    }
  }

  private updateStopwatchSubject(): void {
    this.stopwatchSubject.next(this.stopwatchData);
  }

  // Timer methods
  setTimerSettings(settings: TimerSettings): void {
    this.timerSettings = settings;
    this.resetTimer();
    console.log('Timer settings updated', settings);
  }

  private startTimer(): void {
    if (!this.timerSettings) {
      console.error('Cannot start timer: settings not set');
      return;
    }
    if (this.timerInterval) {
      console.warn('Timer is already running');
      return;
    }
    if (!this.timerData) {
      this.initializeTimerData();
    }
    this.timerData!.isRunning = true;
    this.timerInterval = interval(1000).subscribe(() => {
      if (this.timerData) {
        this.timerData.remainingTime--;
        this.timerData.totalDuration++;
        if (this.timerData.remainingTime <= 0) {
          this.moveToNextPhase();
        }
        this.updateTimerSubject();
      }
    });
    console.log('Timer started');
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      this.timerInterval.unsubscribe();
      this.timerInterval = null;
      if (this.timerData) {
        this.timerData.endTime = new Date().toISOString();
        this.timerData.isRunning = false;
        this.updateTimerSubject();
      }
      console.log('Timer stopped');
    } else {
      console.warn('Timer is not running');
    }
  }

  private resetTimer(): void {
    this.stopTimer();
    this.initializeTimerData();
    console.log('Timer reset');
  }

  skipPhase(): void {
    if (this.timerData && this.timerData.isRunning) {
      this.moveToNextPhase();
      console.log('Skipped to next phase');
    } else {
      console.warn('Cannot skip phase: Timer is not running');
    }
  }

  private initializeTimerData(): void {
    if (!this.timerSettings) {
      console.error('Cannot initialize timer data: settings not set');
      return;
    }
    this.timerData = {
      totalDuration: 0,
      startTime: new Date().toISOString(),
      endTime: '',
      currentPhase: 'work',
      currentSession: 1,
      remainingTime: this.timerSettings.workDuration,
      sessions: [],
      isRunning: false
    };
    this.timerData.sessions.push(this.createNewSession(1));
    this.updateTimerSubject();
    console.log('Timer data initialized', this.timerData);
  }

  private moveToNextPhase(): void {
    if (!this.timerData || !this.timerSettings) {
      console.error('Cannot move to next phase: timer data or settings not set');
      return;
    }
    const currentSession = this.timerData.sessions[this.timerData.currentSession - 1];
    if (this.timerData.currentPhase === 'work') {
      currentSession.workEndTime = new Date().toISOString();
      if (this.timerData.currentSession < this.timerSettings.sessions) {
        this.timerData.currentPhase = this.shouldTakeLongBreak() ? 'longBreak' : 'break';
        this.timerData.remainingTime = this.getBreakDuration();
        currentSession.breakStartTime = new Date().toISOString();
      } else {
        this.completeTimer();
        return;
      }
    } else {
      currentSession.breakEndTime = new Date().toISOString();
      currentSession.completed = true;
      if (this.timerData.currentSession < this.timerSettings.sessions) {
        this.timerData.currentSession++;
        this.timerData.currentPhase = 'work';
        this.timerData.remainingTime = this.timerSettings.workDuration;
        this.timerData.sessions.push(this.createNewSession(this.timerData.currentSession));
      } else {
        this.completeTimer();
        return;
      }
    }
    this.updateTimerSubject();
    console.log('Moved to next phase', this.timerData);
  }

  private getBreakDuration(): number {
    if (!this.timerSettings || !this.timerData) {
      console.error('Timer settings or data is not initialized');
      return 0;
    }
  
    const { longBreakDuration, longBreakInterval, breakDuration } = this.timerSettings;
  
    if (this.shouldTakeLongBreak()) {
      console.log(`Long break triggered at session ${this.timerData.currentSession}`);
      return longBreakDuration || breakDuration;
    }
  
    console.log(`Regular break duration returned: ${breakDuration}`);
    return breakDuration;
  }

  private shouldTakeLongBreak(): boolean {
    if (!this.timerSettings || !this.timerData) return false;
    const { longBreakInterval } = this.timerSettings;
    return !!longBreakInterval && this.timerData.currentSession % longBreakInterval === 0;
  }

  private createNewSession(sessionNumber: number): SessionData {
    return {
      sessionNumber,
      workDuration: this.timerSettings?.workDuration || 0,
      breakDuration: this.getBreakDuration(),
      workStartTime: new Date().toISOString(),
      workEndTime: '',
      breakStartTime: '',
      breakEndTime: '',
      completed: false
    };
  }

  private completeTimer(): void {
    if (this.timerData) {
      this.timerData.endTime = new Date().toISOString();
      this.timerData.isRunning = false;
      this.stopTimer();
      console.log('Timer completed', this.timerData);
    }
  }

  private updateTimerSubject(): void {
    this.timerSubject.next(this.timerData);
  }

  // Data retrieval methods
  getStopwatchData(): Observable<StopwatchData | null> {
    return this.stopwatchSubject.asObservable();
  }

  getTimerData(): Observable<TimerData | null> {
    return this.timerSubject.asObservable();
  }
}
```

# frontend/src/app/services/notification.service.ts

```ts
// src/app/services/notification.service.ts

import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }

  showWarning(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['warning-snackbar']
    });
  }

  showInfo(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['info-snackbar']
    });
  }
}
```

# frontend/src/app/services/form-management.service.ts

```ts
// src/app/services/form-management.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Form, FormTemplate, FormInstance, FormSubmission, SavedForm ,AnyForm} from '../interfaces/workspace.interface';
@Injectable({
  providedIn: 'root'
})
export class FormManagementService {
  private apiUrl = `${environment.apiUrl}/workspaces`;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    console.error('FormManagementService: An error occurred:', error);
    return throwError(() => new Error(`Error: ${error.message}`));
  }

  getFormsInFolder(workspaceId: string, folderId: string): Observable<{templates: FormTemplate[], instances: FormInstance[]}> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (Array.isArray(response)) {
          // If the response is an array, we need to filter it
          return {
            templates: response.filter((form): form is FormTemplate => form.isTemplate === true),
            instances: response.filter((form): form is FormInstance => form.isTemplate === false)
          };
        } else if (response && typeof response === 'object' && 'templates' in response && 'instances' in response) {
          // If the response is already in the correct format, return it as is
          return response as {templates: FormTemplate[], instances: FormInstance[]};
        } else {
          // If the response is in an unexpected format, throw an error
          throw new Error('Unexpected response format from API');
        }
      }),
      catchError(this.handleError)
    );
  }

  createForm(workspaceId: string, folderId: string, formData: Partial<FormTemplate> | Partial<FormInstance>): Observable<Form> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms`;
    console.log('Creating form with URL:', url);
    console.log('Form data:', formData);
    return this.http.post<FormTemplate>(url, formData).pipe(
      tap(response => console.log('Create form response:', response)),
      catchError(this.handleError)
    );
  }

  updateForm(workspaceId: string, folderId: string, formId: string, formData: Partial<FormTemplate> | Partial<FormInstance>): Observable<Form> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}`;
    return this.http.put<Form>(url, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteForm(workspaceId: string, folderId: string, formId: string): Observable<void> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  saveForm(workspaceId: string, folderId: string, formId: string, formData: any): Observable<Form> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}/save`;
    return this.http.post<Form>(url, formData).pipe(
      catchError(this.handleError)
    );
  }

  submitForm(workspaceId: string, folderId: string, templateId: string, formData: any): Observable<{ message: string, instance: FormInstance }> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${templateId}/submit`;
    return this.http.post<{ message: string, instance: FormInstance }>(url, formData).pipe(
      catchError(this.handleError)
    );
  }
  getFormSubmissions(workspaceId: string, folderId: string, formId: string): Observable<FormSubmission[]> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}/submissions`;
    return this.http.get<FormSubmission[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  loadSavedForms(workspaceId: string, folderId: string): Observable<SavedForm[]> {
    return this.http.get<Form[]>(`${this.apiUrl}/${workspaceId}/folders/${folderId}/forms`).pipe(
      map(forms => forms.map(form => ({
        ...form,
        workspaceId,
        folderId
      }))),
      catchError(this.handleError)
    );
  }
  getFormInstances(workspaceId: string, folderId: string, templateId: string): Observable<Form[]> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${templateId}/instances`;
    return this.http.get<Form[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  viewForm(workspaceId: string, folderId: string, formId: string): Observable<SavedForm> {
    return this.http.get<Form>(`${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${formId}`).pipe(
      map(form => ({
        ...form,
        workspaceId,
        folderId
      })),
      catchError(this.handleError)
    );
  }

  getFormTemplate(workspaceId: string, folderId: string, templateId: string): Observable<FormTemplate> {
    const url = `${this.apiUrl}/${workspaceId}/folders/${folderId}/forms/${templateId}`;
    return this.http.get<FormTemplate>(url).pipe(
      catchError(this.handleError)
    );
  }
}
```

# frontend/src/app/services/form-generator.service.ts

```ts
//src/app/services/form-generator.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {
  generateHtmlForm(code: string): string {
    const lines = code.split('\n');
    let html = '<form>';
    
    for (const line of lines) {
      const [type, name, ...rest] = line.split(' ');
      switch (type) {
        case 'TEXT':
          html += `<div><label for="${name}">${rest.join(' ')}</label><input type="text" id="${name}" name="${name}"></div>`;
          break;
        case 'NUMBER':
          html += `<div><label for="${name}">${rest.join(' ')}</label><input type="number" id="${name}" name="${name}"></div>`;
          break;
        case 'DATE':
          html += `<div><label for="${name}">${rest.join(' ')}</label><input type="date" id="${name}" name="${name}"></div>`;
          break;
        // Add more cases for other field types
      }
    }
    
    html += '</form>';
    return html;
  }

  exportAsJson(code: string): string {
    const lines = code.split('\n');
    const jsonObj: any = {};
    
    for (const line of lines) {
      const [type, name, ...rest] = line.split(' ');
      jsonObj[name] = { type, description: rest.join(' ') };
    }
    
    return JSON.stringify(jsonObj, null, 2);
  }

  exportAsCsv(code: string): string {
    const lines = code.split('\n');
    let csv = 'Field Name,Type,Description\n';
    
    for (const line of lines) {
      const [type, name, ...rest] = line.split(' ');
      csv += `"${name}","${type}","${rest.join(' ')}"\n`;
    }
    
    return csv;
  }
}
```

# frontend/src/app/services/folder-management.service.ts

```ts
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Folder } from '../interfaces/workspace.interface'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
;

@Injectable({
  providedIn: 'root'
})
export class FolderManagementService {
  private apiUrl = `${environment.apiUrl}/workspaces`;

  constructor(private http: HttpClient) {}

  getFolders(workspaceId: string): Observable<Folder[]> {
    return this.http.get<Folder[]>(`${this.apiUrl}/${workspaceId}/folders`).pipe(
      map(response => response || []),
      catchError(this.handleError)
    );
  }

  addFolder(workspaceId: string, folderName: string, parentFolderId?: string): Observable<Folder> {
    return this.http.post<Folder>(`${this.apiUrl}/${workspaceId}/folders`, { name: folderName, parentFolderId }).pipe(
      catchError(this.handleError)
    );
  }

  editFolder(workspaceId: string, folderId: string, folderName: string): Observable<Folder> {
    return this.http.put<Folder>(`${this.apiUrl}/${workspaceId}/folders/${folderId}`, { name: folderName }).pipe(
      catchError(this.handleError)
    );
  }

  deleteFolder(workspaceId: string, folderId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${workspaceId}/folders/${folderId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.status === 404) {
      console.warn('Folders endpoint not found or no folders exist. Returning empty array.');
      return [];
    }
    return throwError(() => new Error(`Error: ${error.message}`));
  }

}
```

# frontend/src/app/services/cursor-position.service.ts

```ts
import { Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursorPositionService {
  constructor(private webSocketService: WebSocketService) {}

  updatePosition(workspaceId: string, position: {x: number, y: number}) {
    this.webSocketService.updateCursorPosition(workspaceId, position);
  }

  getCursorPositions(): Observable<{[userId: string]: {x: number, y: number}}> {
    return this.webSocketService.getCursorPositions();
  }
}
```

# frontend/src/app/services/code.service.ts

```ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ParsedStructure } from '../components/code-analysis/code-analysis.component';
@Injectable({
  providedIn: 'root'
})
export class CodeService {
  private apiUrl = 'http://localhost:3000/api/code';

  constructor(private http: HttpClient) { }

  interpretCode(code: string): Observable<{ structure: ParsedStructure }> {
    console.log('CodeService: Interpreting code:', code);
    return this.http.post<{ structure: ParsedStructure }>(`${this.apiUrl}/interpret`, { code })
      .pipe(
        map((response: { structure: ParsedStructure }) => {
          // Transform the sessionLabels structure if it exists
          if (response.structure.fields) {
            response.structure.fields = response.structure.fields.map((field: any) => {
              if (field.type === 'TIMER' && field.options && field.options.sessionLabels) {
                field.options.sessionLabels = this.transformSessionLabels(field.options.sessionLabels);
              }
              return field;
            });
          }
          return response;
        }),
        tap(response => console.log('CodeService: Received response:', response)),
        catchError(this.handleError)
      );
  }

  private transformSessionLabels(sessionLabels: any): { [key: number]: { work?: string, break?: string } } {
    const transformedLabels: { [key: number]: { work?: string, break?: string } } = {};
    for (const [key, value] of Object.entries(sessionLabels)) {
      const sessionNumber = parseInt(key, 10);
      if (!transformedLabels[sessionNumber]) {
        transformedLabels[sessionNumber] = {};
      }
      if (typeof value === 'object' && value !== null) {
        if ('work' in value) {
          transformedLabels[sessionNumber].work = (value as any).work as string;
        }
        if ('break' in value) {
          transformedLabels[sessionNumber].break = (value as any).break as string;
        }
      }
    }
    return transformedLabels;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('CodeService: Error occurred:', error);
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.error || error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
```

# frontend/src/app/services/auth.service.ts

```ts
  // src/app/services/auth.service.ts
  import { Injectable, inject, PLATFORM_ID } from '@angular/core';
  import { BehaviorSubject, Observable,throwError,of } from 'rxjs';
  import { environment } from '../../environments/environment';
  import { isPlatformBrowser } from '@angular/common';
  import { Router } from '@angular/router';
  import { JwtHelperService } from '@auth0/angular-jwt';
  import { catchError, switchMap, tap,map } from 'rxjs/operators';
  import { HttpClient, HttpErrorResponse } from '@angular/common/http';
  export interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    requires2FA: boolean;
    twoFactorCompleted: boolean;
    isEmailVerified: boolean;
  }

  interface AuthResponse {
    token: string;
    user: User;
    refreshToken: string; 
    requiresVerification?: boolean
    
  }

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private platformId = inject(PLATFORM_ID);
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser: Observable<User | null>;
    private jwtHelper: JwtHelperService = new JwtHelperService();
    private refreshTokenTimeout: any;
    private  STORAGE_KEY = 'auth_data';

    constructor(
      private http: HttpClient,
      private router: Router
    ) {
      this.currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());
      this.currentUser = this.currentUserSubject.asObservable();
      console.log('AuthService initialized with user:', this.currentUserSubject.value);
    }
    
    getTwoFAStatus(): Observable<{ enabled: boolean }> {
      return this.http.get<{ enabled: boolean }>(`${environment.apiUrl}/auth/2fa-status`);
    }
    public get currentUserValue(): User | null {
      return this.currentUserSubject.value;
    }

    private getStoredUser(): User | null {
      if (isPlatformBrowser(this.platformId)) {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
      }
      return null;
    }

    enable2FA(): Observable<{ secret: string; otpauthUrl: string; qrCodeDataUrl: string }> {
      return this.http.post<{ secret: string; otpauthUrl: string; qrCodeDataUrl: string }>(`${environment.apiUrl}/auth/enable-2fa`, {});
    }
  verify2FA(token: string): Observable<{ verified: boolean; message: string }> {
    console.log('Verifying 2FA with token:', token);
    return this.http.post<{ verified: boolean; message: string }>(`${environment.apiUrl}/auth/verify-2fa`, { token })
      .pipe(
        tap(response => console.log('2FA verification response:', response)),
        catchError(error => {
          console.error('Error during 2FA verification:', error);
          return throwError(() => error);
        })
      );
  }
    disable2FA(): Observable<{ disabled: boolean; message: string }> {
      return this.http.post<{ disabled: boolean; message: string }>(`${environment.apiUrl}/auth/disable-2fa`, {});
    }
    

    login2FA(email: string, password: string, token: string): Observable<User> {
      return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login-2fa`, { email, password, token })
        .pipe(
          tap(response => {
            if (!response.user.requires2FA) {
              this.handleAuthentication(response, true);
            }
          }),
          map(response => response.user)
        );
    }
    private checkEmailVerificationStatus(userId: string): Observable<boolean> {
      const url = `${environment.apiUrl}/auth/email-verification-status/${userId}`;
      console.log('Checking email verification status:', url);
      return this.http.get<{ isVerified: boolean }>(url)
        .pipe(
          tap(response => console.log('Email verification response:', response)),
          map(response => response.isVerified),
          catchError(error => {
            console.error('Error checking email verification status:', error);
            if (error.status === 404) {
              console.error('Route not found. Make sure the backend route is correctly set up.');
            }
            // If there's an error, assume the email is not verified
            return of(false);
          })
        );
    }
    
    login(email: string, password: string, rememberMe: boolean): Observable<User> {
      console.log('Attempting login for email:', email);
      return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, { email, password, rememberMe })
        .pipe(
          tap(response => {
            console.log('Login response received:', response);
            this.handleAuthentication(response, rememberMe);
          }),
          switchMap(response => {
            return this.checkEmailVerificationStatus(response.user.id).pipe(
              map(isVerified => {
                response.user.isEmailVerified = isVerified;
                return response.user;
              })
            );
          })
        );
    }
    isTokenValid(): boolean {
      const token = this.getToken();
      console.log('Checking token validity for token:', token);
      const isValid = !!token && !this.jwtHelper.isTokenExpired(token);
      console.log('Is token valid?', isValid);
      return isValid;
    }

    private handleAdminAuthentication(authResult: AuthResponse, rememberMe: boolean): void {
      console.log('Handling admin authentication:', authResult);
      const expirationDate = this.jwtHelper.getTokenExpirationDate(authResult.token);
      this.setAuthData(authResult.token, authResult.refreshToken, authResult.user, expirationDate!, rememberMe);
      this.currentUserSubject.next(authResult.user);
      console.log('Admin token stored:', authResult.token);
    }
    

    private handleAuthentication(authResult: AuthResponse, rememberMe: boolean): void {
      console.log('Handling authentication:', authResult);
      const expiresIn = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
      const expirationDate = new Date(new Date().getTime() + expiresIn);
      console.log('Expiration date:', expirationDate);
      this.setAuthData(authResult.token, authResult.refreshToken, authResult.user, expirationDate, rememberMe);
      this.startRefreshTokenTimer();
    }
    private setAuthData(token: string, refreshToken: string, user: User, expirationDate: Date, rememberMe: boolean): void {
      const authData = { token, refreshToken, user, expirationDate: expirationDate.toISOString() };
      console.log('Setting auth data:', authData);
      if (isPlatformBrowser(this.platformId)) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(this.STORAGE_KEY, JSON.stringify(authData));
        console.log('Auth data stored in', rememberMe ? 'localStorage' : 'sessionStorage');
      }
      this.currentUserSubject.next(user);
    }
    
    private startRefreshTokenTimer() {
      const token = this.getToken();
      if (!token) return;

      const expires = this.jwtHelper.getTokenExpirationDate(token)!.getTime() - Date.now() - (60 * 1000);
      this.refreshTokenTimeout = setTimeout(() => {
        this.refreshToken().subscribe();
      }, Math.max(0, expires));
    }


    private stopRefreshTokenTimer() {
      clearTimeout(this.refreshTokenTimeout);
    }


  private storeAuthData(token: string, user: User, expirationDate: Date | null, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('token', token);
    storage.setItem('user', JSON.stringify(user));
    if (expirationDate) {
      storage.setItem('expirationDate', expirationDate.toISOString());
    }
    console.log('Auth data stored:', { token, user, expirationDate });
  }

    register(userData: { name: string; email: string; password: string }): Observable<any> {
      return this.http.post(`${environment.apiUrl}/auth/register`, userData).pipe(
        catchError(this.handleError)
      );
    }
    
    

    sendVerificationEmail(email: string): Observable<any> {
      return this.http.post(`${environment.apiUrl}/auth/send-verification-email`, { email });
    }
    verifyEmail(token: string): Observable<any> {
      return this.http.get(`${environment.apiUrl}/auth/verify-email/${token}`).pipe(
        catchError(this.handleVerificationError)
      );
    }
    
    private handleVerificationError(error: HttpErrorResponse): Observable<never> {
      let errorMessage = 'An error occurred during email verification.';
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else if (error.status === 400) {
        errorMessage = error.error.message || 'Invalid or expired verification token';
      }
      return throwError(() => new Error(errorMessage));
    }
    

    requestPasswordReset(email: string): Observable<any> {
      return this.http.post(`${environment.apiUrl}/auth/request-password-reset`, { email });
    }
    resendVerificationEmail(email: string): Observable<any> {
      return this.http.post(`${environment.apiUrl}/auth/resend-verification-email`, { email }).pipe(
        catchError(this.handleError)
      );
    }
    
    resetPassword(token: string, newPassword: string): Observable<any> {
      return this.http.post(`${environment.apiUrl}/auth/reset-password`, { token, newPassword });
    }
    changePassword(currentPassword: string, newPassword: string): Observable<any> {
      return this.http.post(`${environment.apiUrl}/auth/change-password`, { currentPassword, newPassword });
    }
      



    logout(): void {
      console.log('Logging out user:', this.currentUserValue?.email);
      this.stopRefreshTokenTimer();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('expirationDate');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('expirationDate');
        console.log('Cleared auth data from storage');
      }
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']); 
    }

    checkStoredAuthData(): void {
      if (isPlatformBrowser(this.platformId)) {
        const authData = JSON.parse(localStorage.getItem('authData') || sessionStorage.getItem('authData') || 'null');
        if (authData && new Date(authData.expirationDate) > new Date()) {
          this.setAuthData(authData.token, authData.refreshToken, authData.user, new Date(authData.expirationDate), true);
          this.autoLogout(new Date(authData.expirationDate));
        } else {
          this.logout();
        }
      }
    }
    private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
    
    private autoLogout(expirationDate: Date | null): void {
      if (expirationDate) {
        const expiresIn = expirationDate.getTime() - Date.now();
        setTimeout(() => this.logout(), expiresIn);
      }
    }

    isLoggedIn(): boolean {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      return !!token && !this.jwtHelper.isTokenExpired(token);
    }
    getToken(): string | null {
      if (isPlatformBrowser(this.platformId)) {
        const authDataString = localStorage.getItem(this.STORAGE_KEY) || sessionStorage.getItem(this.STORAGE_KEY);
        if (authDataString) {
          const authData = JSON.parse(authDataString);
          return authData?.token || null;
        }
      }
      return null;
    }
    
    private getRefreshToken(): string | null {
      if (isPlatformBrowser(this.platformId)) {
        const authDataString = localStorage.getItem(this.STORAGE_KEY) || sessionStorage.getItem(this.STORAGE_KEY);
        if (authDataString) {
          const authData = JSON.parse(authDataString);
          return authData.refreshToken || null;
        }
      }
      return null;
    }
    
    refreshToken(): Observable<AuthResponse> {
      console.log('Attempting to refresh token');
      const currentUser = this.currentUserValue;
      if (currentUser && currentUser.role === 'admin') {
        console.log('Admin user, skipping token refresh');
        return throwError(() => new Error('Token refresh not required for admin'));
      }
      
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        console.error('No refresh token available');
        this.logout();
        return throwError(() => new Error('No refresh token available'));
      }
  
      return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh-token`, { refreshToken }).pipe(
        tap(response => {
          console.log('Refresh token response:', response);
          this.handleAuthentication(response, true);
        }),
        catchError(error => {
          console.error('Error refreshing token:', error);
          this.logout();
          return throwError(() => error);
        })
      );
    }


    isAdmin(): boolean {
      const currentUser = this.currentUserValue;
      return currentUser?.role === 'admin';
    }

  }

```

# frontend/src/app/services/auth.interceptor.ts

```ts
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

// Define the AuthResponse interface
interface AuthResponse {
  token: string;
  user: any; 
}

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let isRefreshing = false;
  let refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  const addToken = (request: HttpRequest<unknown>, token: string) => {
    console.log('Adding token to request:', token);
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  };


  const handleError = (error: HttpErrorResponse, request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    if (error.status === 401) {
      const currentUser = authService.currentUserValue;
      if (currentUser && currentUser.role === 'admin') {
        console.log('Admin user encountered 401, logging out');
        authService.logout();
        return throwError(() => error);
      }

      if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);

        return authService.refreshToken().pipe(
          switchMap((response: AuthResponse) => {
            isRefreshing = false;
            refreshTokenSubject.next(response.token);
            console.log('Token refreshed, retrying request with new token');
            return next(addToken(request, response.token));
          }),
          catchError((refreshError) => {
            isRefreshing = false;
            console.error('Token refresh failed, logging out');
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      } else {
        return refreshTokenSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap(token => {
            console.log('Using newly refreshed token for queued request');
            return next(addToken(request, token));
          })
        );
      }
    }
    return throwError(() => error);
  };

  const token = authService.getToken();
  console.log('Current token:', token);
  
  if (token && !req.url.includes('/auth/refresh-token') && !req.url.includes('/auth/login')) {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  } else {
    console.log('Not adding token to request:', req.url);
  }
  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.log('401 error encountered, handling error');
        return handleError(error, req, next);
      }
      return throwError(() => error);
    })
  );
}
```

# frontend/src/app/services/admin.service.ts

```ts
// frontend/src/app/services/admin.service.ts

import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams,HttpErrorResponse , HttpHeaders} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, tap ,map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export interface AnalyticsData {
  activeSubscribers: number;
  monthlyRecurringRevenue: number;
  churnRate: number;
  newSubscribers: number;
  averageRevenuePerUser: number;
  subscriptionGrowthRate: number;
}


export interface User {
  id: string;
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  status: 'active' | 'suspended';
  createdAt: Date;
  lastLoginAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  packageId: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate: Date;
  stripeSubscriptionId: string;
}
export interface CreditPackage {
  _id?: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  isSubscription: boolean;
  durationDays: number;
  stripePriceId: string;
}
export interface CreditPackageUpdate extends CreditPackage {
  _id: string;  // Make _id required for updates
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  
  getSubscriptionAnalytics(): Observable<AnalyticsData> {
    console.log('Fetching subscription analytics');
    const token = this.authService.getToken();
    console.log('Current token:', token); // Add this line for debugging
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<AnalyticsData>(`${this.apiUrl}/subscription-analytics`, { headers }).pipe(
      tap(response => console.log('Received analytics:', response)),
      catchError(error => {
        console.error('Error fetching analytics:', error);
        return throwError(() => error);
      })
    );
  }
  getAllUsers(page: number = 1, limit: number = 10, sort: string = 'name', order: string = 'asc', search?: string): Observable<{ users: User[], total: number, page: number, totalPages: number }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('sort', sort)
      .set('order', order);
  
    if (search && search.trim() !== '') {
      params = params.set('search', search.trim());
    }
  
    return this.http.get<{ users: User[], total: number, page: number, totalPages: number }>(`${this.apiUrl}/users`, { params }).pipe(
      map(response => ({
        ...response,
        users: response.users.map(user => ({
          ...user,
          id: user._id // Ensure id is set to _id for consistency
        }))
      })),
      tap(response => console.log('Received response:', response)),
      catchError(error => {
        console.error('Error in getAllUsers:', error);
        return throwError(() => error);
      })
    );
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching user:', error);
        return throwError(() => new Error('Failed to fetch user details'));
      })
    );
  }

  updateUser(id: string, update: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, update);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message || error.statusText}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }


  suspendUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/suspend`, {}).pipe(
      catchError(this.handleError)
    );
  }
  
  activateUser(userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${userId}/activate`, {}).pipe(
      catchError(this.handleError)
    );
  }

  getAllSubscriptions(page: number = 1, limit: number = 10): Observable<{ subscriptions: Subscription[], total: number }> {
    return this.http.get<{ subscriptions: Subscription[], total: number }>(`${this.apiUrl}/subscriptions`, {
      params: { page: page.toString(), limit: limit.toString() }
    });
  }

  getSubscription(id: string): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.apiUrl}/subscriptions/${id}`);
  }

  cancelSubscription(id: string): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.apiUrl}/subscriptions/${id}/cancel`, {});
  }

  getAllCreditPackages(): Observable<CreditPackage[]> {
    return this.http.get<CreditPackage[]>(`${this.apiUrl}/credit-packages`);
  }

  createCreditPackage(packageData: Omit<CreditPackage, 'id'>): Observable<CreditPackage> {
    console.log('Creating credit package:', packageData);
    return this.http.post<CreditPackage>(`${this.apiUrl}/credit-packages`, packageData)
      .pipe(catchError(this.handleError));
  }

  updateCreditPackage(id: string, packageData: Partial<CreditPackage>): Observable<CreditPackage> {
    return this.http.put<CreditPackage>(`${this.apiUrl}/credit-packages/${id}`, packageData);
  }

  deleteCreditPackage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/credit-packages/${id}`);
  }

  testAdminRoute(): Observable<any> {
    const url = `${this.apiUrl}/test`;
    console.log('Testing admin route:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Admin route test response:', response)),
      catchError(error => {
        console.error('Error testing admin route:', error);
        return throwError(() => error);
      })
    );

  }

  testUsersRoute(): Observable<any> {
    const url = `${this.apiUrl}/users-test`;
    console.log('Testing users route:', url);
    return this.http.get(url).pipe(
      tap(response => console.log('Users route test response:', response)),
      catchError(error => {
        console.error('Error testing users route:', error);
        return throwError(() => error);
      })
    );
  }

}
```

# frontend/src/app/pipes/format-time.pipe.ts

```ts
// src/app/pipes/format-time.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime',
  standalone: true
})
export class FormatTimePipe implements PipeTransform {
  transform(seconds: number | null): string {
    if (seconds === null || isNaN(seconds)) {
      return '00:00';
    }

    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    let result = '';
    if (days > 0) result += `${days}d `;
    if (hours > 0 || days > 0) result += `${this.pad(hours)}:`;
    result += `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
    
    return result.trim();
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
```

# frontend/src/app/interfaces/workspace.interface.ts

```ts
// src/app/interfaces/workspace.interface.ts

export interface Workspace {
  _id: string;
  name: string;
  description: string;
  owner: string;
  members: WorkspaceMember[];
  folders: Folder[];
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkspaceMember {
  user: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  permissions: {
    read: boolean;
    write: boolean;
    delete: boolean;
    manageUsers: boolean;
  };
}

export interface WorkspacesResponse {
  workspaces: Workspace[];
  currentPage: number;
  totalPages: number;
  totalWorkspaces: number;
}

export interface Folder {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  forms: string[]; // IDs of both templates and instances
  subfolders: Folder[];
}

export interface Form {
  _id: string;
  name: string;
  structure: any;
  isTemplate: boolean;
  parentTemplateId?: string;
  values?: Record<string, any>;
  submissions?: FormSubmission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface FormTemplate extends Form {
  isTemplate: true;
}

export interface FormInstance extends Form {
  isTemplate: false;
  parentTemplateId: string;
  values: Record<string, any>;
  submissionDate: Date;
}


export interface FormSubmission {
  _id: string;
  formId: string;
  values: any;
  submissionDate: Date;
}

export interface FormUpdate {
  action: 'create' | 'update' | 'delete';
  form?: Form;
  formId?: string;
}

export interface SavedForm extends Form {
  workspaceId: string;
  folderId: string;
}
export type AnyForm = FormTemplate | FormInstance;
```

# frontend/src/app/interfaces/field-config.ts

```ts
// src/app/shared/interfaces/field-config.interface.ts

export interface FieldConfig {
    name: string;
    type: string;
    description: string;
    required: boolean;
    options: {
      range?: { min: number; max: number };
      default?: any;
      multiline?: boolean;
      columns?: FieldConfig[];
      minItems?: number;
      maxItems?: number;
      listFields?: FieldConfig[];
      laps?: number;
      minLaps?: number;
      maxLaps?: number;
      workDuration?: number;
      breakDuration?: number;
      sessions?: number;
      longBreakDuration?: number;
      longBreakInterval?: number;
      maxLength?: number;
      sessionLabels?: Map<number, string> | { [key: number]: string };
            };
  }
```

# frontend/src/app/interfaces/activity-log.interface.ts

```ts
export interface ActivityLog {
    _id: string;
    workspace: string;
    user: {
      _id: string;
      name: string;
      email: string;
    };
    action: string;
    details: string;
    createdAt: Date;
  }
  
  export interface ActivityLogsResponse {
    activityLogs: ActivityLog[];
    currentPage: number;
    totalPages: number;
    totalLogs: number;
  }
```

# frontend/src/app/guards/auth.guard.ts

```ts
//frontend/guard/guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      if (!currentUser.isEmailVerified && currentUser.role !== 'admin') {
        this.router.navigate(['/request-verification-email'], { queryParams: { email: currentUser.email } });
         return false;
      }
      
      
      if (currentUser.requires2FA && !currentUser.twoFactorCompleted) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url, requires2FA: true } });
        return false;
      }

      // Check if the route requires admin role
      if (route.data['roles'] && route.data['roles'].indexOf(currentUser.role) === -1) {
        this.router.navigate(['/']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
```

# frontend/src/app/guards/admin.guard.ts

```ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
```

# frontend/src/app/dialogs/workspaces/form-dialog.component.ts

```ts
// src/app/components/workspace/form-dialog/form-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogContent
  ],
  template: `
    <h2 mat-dialog-title>{{ data.isNew ? 'Create' : 'Edit' }} Form</h2>
    <mat-dialog-content>
      <form [formGroup]="formGroup">
        <mat-form-field>
          <mat-label>Form Name</mat-label>
          <input matInput formControlName="name" required>
          <!-- <mat-error *ngIf="formGroup.get('name')?.hasError('required') && formGroup.get('name')?.touched">
            Form name is required
          </mat-error> -->
        </mat-form-field>
        <!-- Add more fields for form structure as needed -->
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="primary" [disabled]="formGroup.invalid" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
    }
  `]
})
export class FormDialogComponent {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: any, isNew: boolean }
  ) {
    this.formGroup = this.fb.group({
      name: [data.form.name || '', [Validators.required]],
      // Add more form controls for the form structure as needed
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close({
        ...this.data.form,
        ...this.formGroup.value
      });
    }
  }
}

```

# frontend/src/app/dialogs/workspaces/folder-dialog.component.ts

```ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-folder-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <h1 mat-dialog-title>{{ data.name ? 'Edit' : 'Add' }} Folder</h1>
    <div mat-dialog-content>
      <form [formGroup]="folderForm">
        <mat-form-field>
          <mat-label>Folder Name</mat-label>
          <input matInput formControlName="name" required>
          <mat-error *ngIf="folderForm.get('name')?.hasError('required')">
            Folder name is required
          </mat-error>
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button [disabled]="folderForm.invalid" (click)="onSubmit()">
        {{ data.name ? 'Update' : 'Add' }}
      </button>
    </div>
  `
})
export class FolderDialogComponent {
  folderForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FolderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private fb: FormBuilder
  ) {
    this.folderForm = this.fb.group({
      name: [data.name, [Validators.required, Validators.minLength(1)]]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.folderForm.valid) {
      this.dialogRef.close(this.folderForm.value.name);
    }
  }
}
```

# frontend/src/app/dialogs/workspaces/confirm-dialog.component.ts

```ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Confirm</button>
    </mat-dialog-actions>
  `
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) {}
}

```

# frontend/src/app/components/user-profile/user-profile.component.ts

```ts
// src/app/components/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule ,AbstractControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { SubscriptionManagementComponent } from '../subscription-management/subscription-management.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule, 
    SubscriptionManagementComponent
  ],
  template: `
    <div class="profile-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>User Profile</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p><strong>Name:</strong> {{ user?.name }}</p>
          <p><strong>Email:</strong> {{ user?.email }}</p>
          <p><strong>Credits:</strong> {{ user?.credits }}</p>
        </mat-card-content>
        <mat-card-actions>
          <a mat-raised-button color="primary" routerLink="/two-factor-auth">Manage Two-Factor Authentication</a>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Change Password</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="changePasswordForm" (ngSubmit)="onChangePassword()">
            <mat-form-field>
              <input matInput type="password" formControlName="currentPassword" placeholder="Current Password">
              <mat-error *ngIf="changePasswordForm.get('currentPassword')?.hasError('required')">Current password is required</mat-error>
            </mat-form-field>
            <mat-form-field>
              <input matInput type="password" formControlName="newPassword" placeholder="New Password">
              <mat-error *ngIf="changePasswordForm.get('newPassword')?.hasError('required')">New password is required</mat-error>
              <mat-error *ngIf="changePasswordForm.get('newPassword')?.hasError('minlength')">Password must be at least 8 characters long</mat-error>
              <mat-error *ngIf="changePasswordForm.get('newPassword')?.hasError('weakPassword')">Password must contain uppercase, lowercase, number, and special character</mat-error>
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="changePasswordForm.invalid">Change Password</button>
          </form>
        </mat-card-content>
      </mat-card>

      <app-subscription-management></app-subscription-management>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 20px auto;
    }
    mat-card {
      margin-bottom: 20px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  `]
})
export class UserProfileComponent implements OnInit {
  user: any = null;
  changePasswordForm: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]]
    });
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => this.user = user,
      error: (error) => this.notificationService.showError('Error loading user profile')
    });
  }

  passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    
    if (hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas) {
      return null;
    } else {
      return { 'weakPassword': true };
    }
  }

  onChangePassword() {
    if (this.changePasswordForm.valid) {
      const { currentPassword, newPassword } = this.changePasswordForm.value;
      this.authService.changePassword(currentPassword, newPassword).subscribe({
        next: () => {
          this.notificationService.showSuccess('Password changed successfully');
          this.changePasswordForm.reset();
        },
        error: (error) => {
          this.notificationService.showError(error.error.message || 'Failed to change password');
        }
      });
    }
  }
}
```

# frontend/src/app/components/time-management/timer.component.ts

```ts
import { Component, input, output, ChangeDetectionStrategy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule ,} from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { TimerSettings } from './time-management.types';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressBarModule, FormatTimePipe,MatIconModule],
  template: `
<div class="timer">
  <div class="time-display-container">
    <div class="time-display">{{ currentTime() / 1000 | formatTime }}</div>
    <button mat-icon-button 
            class="reset-current-button"
            (click)="resetCurrentPhase($event)"
            [disabled]="isAllSessionsCompleted()"
            aria-label="Reset current phase">
      <mat-icon>refresh</mat-icon>
    </button>
  </div>
  <mat-progress-bar [value]="progress()"></mat-progress-bar>
  <div class="timer-info">
    {{ currentSessionLabel() }} - {{ currentPhase() }}
  </div>
  <div class="controls">
    <button mat-raised-button color="primary" 
            (click)="toggleTimer($event)"
            [disabled]="isAllSessionsCompleted()">
      {{ isRunning() ? 'Pause' : 'Start' }}
    </button>
    <button mat-raised-button 
            (click)="skipPhase($event)" 
            [disabled]="!isRunning() || isAllSessionsCompleted()">
      Skip
    </button>
    <button mat-raised-button 
            (click)="resetTimer($event)">
      Reset All
    </button>
  </div>
  <div class="completed-sessions">
    <h4>Completed Sessions</h4>
    <ul>
      @for (session of completedSessions(); track session.id) {
        <li>
          {{ session.label }}: 
          {{ session.phase | titlecase }} - 
          {{ session.duration / 1000 | formatTime }}
        </li>
      }
    </ul>
  </div>
</div>
  `,
  styles: [`
    .timer .timer-info {
      font-weight: bold;
      color: #3498db;
    }
    .timer mat-progress-bar {
      height: 8px;
      border-radius: 4px;
      overflow: hidden;
    }
    .time-display-container {
  position: relative;
  padding-bottom: 30px; // Add space for the reset button
}

.reset-current-button {
  position: absolute;
  right: 0;
  bottom: 0;
  color: #555;
  background-color: transparent;

  &:hover:not(:disabled) {
    color: #3498db;
  }

  &:disabled {
    opacity: 0.5;
  }
}

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent {
  settings = input.required<TimerSettings>();
  valueChange = output<any>();
  isAllSessionsCompleted = signal(false);

  currentTime = signal(0);
  isRunning = signal(false);
  progress = signal(0);
  currentSession = signal(1);
  currentPhase = signal<'work' | 'break' | 'long break'>('work');
  completedSessions = signal<Array<{ id: number, sessionNumber: number, label: string, phase: string, duration: number }>>([]);

  private intervalId: number | null = null;
  private phaseDuration = 0;
  private phaseStartTime = 0;
  private sessionIdCounter = 0;

  currentSessionLabel = computed(() => {
    const sessionLabels = this.settings().sessionLabels;
    const currentSession = this.currentSession();
    const currentPhase = this.currentPhase();
    const totalSessions = this.settings().sessions;

    if (currentSession > totalSessions) {
      return 'All sessions completed';
    }

    if (sessionLabels && sessionLabels[currentSession]) {
      const phaseLabel = currentPhase === 'work' ? sessionLabels[currentSession].work : sessionLabels[currentSession].break;
      if (phaseLabel) {
        return `Session ${currentSession}: ${phaseLabel}`;
      }
    }
    
    return `Session ${currentSession}: ${this.capitalizeFirstLetter(currentPhase)}`;
  });

private capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  

  toggleTimer(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isRunning.update(running => !running);
    if (this.isRunning()) {
      this.startTimer();
      console.log('Timer resumed');
    } else {
      this.stopTimer();
      console.log('Timer paused');
    }
  }

  skipPhase(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isRunning()) {
      this.completeCurrentPhase();
      this.moveToNextPhase();
    }
  }

  resetTimer(event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.stopTimer();
    this.currentSession.set(1);
    this.currentPhase.set('work');
    this.progress.set(0);
    this.completedSessions.set([]);
    this.sessionIdCounter = 0;
    this.isAllSessionsCompleted.set(false);
    this.isRunning.set(false);  // Ensure the timer is not running after reset
  
    this.phaseDuration = this.settings().workDuration;
    this.currentTime.set(this.phaseDuration);
    this.phaseStartTime = Date.now();
  
    console.log('Timer reset:', {
      currentPhase: this.currentPhase(),
      currentSession: this.currentSession(),
      phaseDuration: this.phaseDuration,
      currentTime: this.currentTime(),
      isRunning: this.isRunning()
    });
  }


  resetCurrentPhase(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.isAllSessionsCompleted()) return;
  
    this.currentTime.set(this.phaseDuration);
    this.phaseStartTime = Date.now();
    this.updateProgress();
  
    console.log('Current phase reset:', {
      currentPhase: this.currentPhase(),
      currentSession: this.currentSession(),
      phaseDuration: this.phaseDuration,
      currentTime: this.currentTime()
    });
  }
  

  ngOnInit() {
    this.resetTimer();
  }
  private startTimer() {
    this.phaseStartTime = Date.now();
    this.intervalId = window.setInterval(() => {
      const now = Date.now();
      const elapsed = now - this.phaseStartTime;
      if (elapsed >= this.phaseDuration) {
        this.completeCurrentPhase();
        this.moveToNextPhase();
      } else {
        this.currentTime.set(this.phaseDuration - elapsed);
        this.updateProgress();
      }
    }, 100);
    console.log('Timer started');
  }

  private stopTimer() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private completeCurrentPhase() {
    const elapsedTime = this.phaseDuration - this.currentTime();
    this.completedSessions.update(sessions => [
      ...sessions,
      {
        id: ++this.sessionIdCounter,
        sessionNumber: this.currentSession(),
        label: this.currentSessionLabel(),
        phase: this.currentPhase(),
        duration: elapsedTime
      }
    ]);
  }
  private moveToNextPhase() {
    if (this.currentPhase() === 'work') {
      if (this.currentSession() % this.settings().longBreakInterval === 0) {
        this.currentPhase.set('long break');
        this.phaseDuration = this.settings().longBreakDuration;
      } else {
        this.currentPhase.set('break');
        this.phaseDuration = this.settings().breakDuration;
      }
    } else {
      this.currentPhase.set('work');
      this.phaseDuration = this.settings().workDuration;
      this.currentSession.update(session => session + 1);
      
      if (this.currentSession() > this.settings().sessions) {
        this.isAllSessionsCompleted.set(true);
        this.isRunning.set(false);
        this.stopTimer();
        return;
      }

      
    }

  
    this.currentTime.set(this.phaseDuration);
    this.phaseStartTime = Date.now();
    this.updateProgress();
  
    console.log('Moved to next phase:', {
      currentPhase: this.currentPhase(),
      currentSession: this.currentSession(),
      phaseDuration: this.phaseDuration,
      currentTime: this.currentTime()
    });
  
    this.valueChange.emit({
      phase: this.currentPhase(),
      session: this.currentSession(),
      time: Math.round(this.phaseDuration / 1000),
      completedSessions: this.completedSessions().map(session => ({
        ...session,
        duration: Math.round(session.duration / 1000)
      }))
    });
    console.log('valueChange event emitted:', {
      phase: this.currentPhase(),
      session: this.currentSession(),
      time: Math.round(this.phaseDuration / 1000)
    });
  }

  private updateProgress() {
    this.progress.set(((this.phaseDuration - this.currentTime()) / this.phaseDuration) * 100);
  }
}
```

# frontend/src/app/components/time-management/timer.component.html

```html
<div class="timer">
    <div class="time-display">{{ currentTime() | formatTime }}</div>
    <mat-progress-bar [value]="progress()"></mat-progress-bar>
    <div class="timer-info">
      Session {{ currentSession() }}/{{ settings().sessions }} -
      {{ currentPhase() }}
    </div>
    <div class="controls">
      <button mat-raised-button color="primary" (click)="toggleTimer()">
        {{ isRunning() ? 'Pause' : 'Start' }} Timer
      </button>
      <button mat-raised-button (click)="skipPhase()" [disabled]="!isRunning()">Skip Phase</button>
      <button mat-raised-button (click)="resetTimer()">Reset Timer</button>
    </div>
  </div>
```

# frontend/src/app/components/time-management/time-management.types.ts

```ts
export interface StopwatchSettings {
    laps?: number;
    minLaps?: number;
    maxLaps?: number;
  }
  
  export interface TimerSettings {
    workDuration: number;
    breakDuration: number;
    sessions: number;
    longBreakDuration: number;
    longBreakInterval: number;
    sessionLabels?: { [key: number]: { work?: string, break?: string } };
  }

  export interface ExtendedTimerSettings extends TimerSettings {
    sessionLabels?: { [key: number]: { work?: string, break?: string } };
  }
  
```

# frontend/src/app/components/time-management/time-management.component.ts

```ts
import { Component, input, output, ChangeDetectionStrategy, ViewEncapsulation, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopwatchComponent } from './stopwatch.component';
import { TimerComponent } from './timer.component';
import { TimerSettings, StopwatchSettings } from './time-management.types';

const DEFAULT_STOPWATCH_SETTINGS: StopwatchSettings = {
  laps: undefined,
  minLaps: undefined,
  maxLaps: undefined
};

const DEFAULT_TIMER_SETTINGS: TimerSettings = {
  workDuration: 25 * 60 * 1000,
  breakDuration: 5 * 60 * 1000,
  sessions: 4,
  longBreakDuration: 15 * 60 * 1000,
  longBreakInterval: 4
};

@Component({
  selector: 'app-time-management',
  standalone: true,
  imports: [CommonModule, StopwatchComponent, TimerComponent],
  template: `
    <div class="time-management" (click)="handleClick($event)">
      <h3>{{ label() }}</h3>
      @if (description()) {
        <p class="description">{{ description() }}</p>
      }
      @if (type() === 'stopwatch') {
        <app-stopwatch
          [settings]="stopwatchSettings()"
          (valueChange)="onValueChange($event)">
        </app-stopwatch>
      }@if (type() === 'timer') {
      <app-timer
        [settings]="timerSettings()"
        (valueChange)="onValueChange($event)">
      </app-timer>
    }
    </div>
  `,
  styleUrls: ['./time-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeManagementComponent {
  label = input('Time Management');
  description = input('');
  type = input<'stopwatch' | 'timer'>('stopwatch');
  settings = input<TimerSettings | StopwatchSettings | undefined>(undefined);
  valueChange = output<any>();

  stopwatchSettings = computed<StopwatchSettings>(() => {
    const settings = this.settings();
    if (this.type() === 'stopwatch' && settings && 'laps' in settings) {
      return settings;
    }
    return DEFAULT_STOPWATCH_SETTINGS;
  });

  timerSettings = computed<TimerSettings>(() => {
    const settings = this.settings();
    if (this.type() === 'timer' && settings && 'workDuration' in settings) {
      return settings;
    }
    return DEFAULT_TIMER_SETTINGS;
  });

  onValueChange(event: any) {
    this.valueChange.emit(event);
  }

  handleClick(event: Event) {
    if (event.target instanceof HTMLButtonElement) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
```

# frontend/src/app/components/time-management/time-management.component.scss

```scss
// Shared styles
.time-management {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
    h3 {
      font-size: 24px;
      color: #333;
      margin-bottom: 10px;
      text-align: center;
    }
  
    .description {
      font-style: italic;
      color: #666;
      margin-bottom: 20px;
      text-align: center;
    }
  
    .time-display {
      font-size: 48px;
      font-weight: bold;
      color: #2c3e50;
      text-align: center;
      margin: 20px 0;
    }
  
    .controls {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 20px;
  
      button {
        min-width: 100px;
      }
    }
  
    .timer-info {
      font-size: 18px;
      color: #34495e;
      text-align: center;
      margin: 10px 0;
    }
  
    mat-progress-bar {
      margin-bottom: 20px;
    }
  
    .laps {
      max-height: 200px;
      overflow-y: auto;
      padding: 10px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  
      h4 {
        font-size: 18px;
        color: #2c3e50;
        margin-bottom: 10px;
      }
  
      ul {
        list-style-type: none;
        padding: 0;
  
        li {
          font-size: 16px;
          color: #34495e;
          margin-bottom: 5px;
          padding: 5px;
          background-color: #ecf0f1;
          border-radius: 4px;
  
          &:nth-child(even) {
            background-color: #f9f9f9;
          }
        }
      }
    }
  }
  
  // Component-specific styles
  app-stopwatch, app-timer {
    display: block;
    width: 100%;
  }
```

# frontend/src/app/components/time-management/time-management.component.html

```html

```

# frontend/src/app/components/time-management/stopwatch.component.ts

```ts
import { Component, input, output, ChangeDetectionStrategy, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { StopwatchSettings } from './time-management.types';

@Component({
  selector: 'app-stopwatch',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormatTimePipe],
  template: `
    <div class="stopwatch">
      <div class="time-display">{{ currentTime() | formatTime }}</div>
      <div class="controls">
        <button mat-raised-button color="primary" (click)="toggleStopwatch($event)" [disabled]="isCompleted()">
          {{ isRunning() ? 'Stop' : 'Start' }} Stopwatch
        </button>
        <button mat-raised-button (click)="lap($event)" [disabled]="!isRunning() || isLapDisabled() || isCompleted()">Lap</button>
        <button mat-raised-button (click)="resetStopwatch($event)">Reset</button>
      </div>
      @if (stopwatchState()) {
        <div class="state-message">{{ stopwatchState() }}</div>
      }
      @if (laps().length) {
        <div class="laps">
          <h4>Laps</h4>
          <ul>
            @for (lap of laps(); track lap.number) {
              <li>Lap {{ lap.number }}: {{ lap.time | formatTime }}</li>
            }
          </ul>
        </div>
      }
    </div>
  `,
  styles: [/* ... existing styles ... */],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StopwatchComponent {
  settings = input.required<StopwatchSettings>();
  valueChange = output<any>();

  currentTime = signal(0);
  isRunning = signal(false);
  laps = signal<{ number: number; time: number }[]>([]);
  stopwatchState = signal('');

  private intervalId: number | null = null;
  private startTime = 0;
  private pausedTime = 0;
  private lastLapTime = 0;

  constructor() {
    effect(() => {
      if (this.isRunning() && !this.isCompleted()) {
        this.startStopwatch();
      } else {
        this.stopStopwatch();
      }
    }, { allowSignalWrites: true }); // Allowing signal writes within the effect
  }

  isCompleted = computed(() => {
    const settings = this.settings();
    const lapCount = this.laps().length;

    if (settings.laps !== undefined && lapCount >= settings.laps) {
      return true;
    }

    if (settings.maxLaps !== undefined && lapCount >= settings.maxLaps) {
      return true;
    }

    return false;
  });

  toggleStopwatch(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.isCompleted()) {
      this.isRunning.update(running => !running);
      this.updateStopwatchState();
    }
  }

  lap(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.isRunning() && !this.isLapDisabled() && !this.isCompleted()) {
      const currentLapTime = this.currentTime() - this.lastLapTime;
      this.laps.update(laps => [...laps, { number: laps.length + 1, time: currentLapTime }]);
      this.lastLapTime = this.currentTime();
      
      this.valueChange.emit({ laps: this.laps(), completed: this.isCompleted() });
      
      this.updateStopwatchState();
  
      if (this.isCompleted()) {
        this.stopStopwatch();
      }
    }
  }

  resetStopwatch(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.isRunning.set(false);
    this.currentTime.set(0);
    this.laps.set([]);
    this.pausedTime = 0;
    this.lastLapTime = 0;
    this.stopwatchState.set('');
    this.valueChange.emit({ laps: [], completed: false });
  }

  isLapDisabled = computed(() => {
    if (!this.isRunning()) return true;
    const settings = this.settings();
    if (settings.laps !== undefined) return this.laps().length >= settings.laps;
    if (settings.maxLaps !== undefined) return this.laps().length >= settings.maxLaps;
    return false;
  });

  private startStopwatch() {
    this.startTime = Date.now() - this.pausedTime;
    this.intervalId = window.setInterval(() => {
      this.currentTime.set(Math.floor((Date.now() - this.startTime) / 1000));
      if (this.isCompleted()) {
        this.stopStopwatch();
      }
    }, 1000);
  }

  private stopStopwatch() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning.set(false);
    this.pausedTime = this.currentTime() * 1000;
  }

  private updateStopwatchState() {
    const settings = this.settings();
    const lapCount = this.laps().length;

    if (settings.laps !== undefined && lapCount === settings.laps) {
      this.stopwatchState.set('Completed: Exact number of laps reached');
    } else if (settings.maxLaps !== undefined && lapCount >= settings.maxLaps) {
      this.stopwatchState.set('Completed: Maximum number of laps reached');
    } else if (settings.minLaps !== undefined && lapCount >= settings.minLaps) {
      this.stopwatchState.set('Minimum number of laps reached');
    } else {
      this.stopwatchState.set('');
    }
  }
}
```

# frontend/src/app/components/result-display/result-display.component.ts

```ts
import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-result-display',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule],
  template: `
    @if (result) {
      <h2>Analysis Result:</h2>
      <mat-expansion-panel class="entry-panel" [expanded]="true">
        <mat-expansion-panel-header>
          <mat-panel-title>Entry Name: {{ result.entryName }}</mat-panel-title>
        </mat-expansion-panel-header>
        @for (field of result.fields; track field.name) {
          <mat-expansion-panel class="field-panel" [expanded]="expandedFields().has(field.name)" (opened)="expandField(field.name)" (closed)="collapseField(field.name)">
            <mat-expansion-panel-header>
              <mat-panel-title>{{ field.name }} ({{ field.type }})</mat-panel-title>
            </mat-expansion-panel-header>
            <div class="field-details">
              <p><strong>Description:</strong> {{ field.description }}</p>
              <p><strong>Required:</strong> {{ field.required ? 'Yes' : 'No' }}</p>
              @if (hasOptions(field)) {
                <div class="options">
                  <h4>Options:</h4>
                  <ul>
                    @for (option of getOptionEntries(field.options); track option[0]) {
                      <li>
                        <strong>{{ formatOptionName(option[0]) }}:</strong>
                        @switch (option[0]) {
                          @case ('range') {
                            Min: {{ option[1].min }}, Max: {{ option[1].max }}
                          }
                          @case ('columns') {
                            <ul class="column-list">
                              @for (column of option[1]; track column.name) {
                                <li>
                                  <strong>{{ column.name }} ({{ column.type }})</strong>
                                  <p>Description: {{ column.description }}</p>
                                  <p>Required: {{ column.required ? 'Yes' : 'No' }}</p>
                                  @if (hasOptions(column)) {
                                    <div class="nested-options">
                                      <h6>Column Options:</h6>
                                      <ul>
                                        @for (colOption of getOptionEntries(column.options); track colOption[0]) {
                                          <li>
                                            <strong>{{ formatOptionName(colOption[0]) }}:</strong>
                                            @if (isObject(colOption[1])) {
                                              {{ formatObject(colOption[1]) }}
                                            } @else {
                                              {{ colOption[1] }}
                                            }
                                          </li>
                                        }
                                      </ul>
                                    </div>
                                  }
                                </li>
                              }
                            </ul>
                          }
                          @case ('laps') {
                            {{ option[1] }}
                          }
                          @case ('workDuration') {
                            {{ formatDuration(option[1]) }}
                          }
                          @case ('breakDuration') {
                            {{ formatDuration(option[1]) }}
                          }
                          @case ('sessions') {
                            {{ option[1] }}
                          }
                          @case ('longBreakDuration') {
                            {{ formatDuration(option[1]) }}
                          }
                          @case ('longBreakInterval') {
                            {{ option[1] }}
                          }
                          @default {
                            @if (isObject(option[1])) {
                              {{ formatObject(option[1]) }}
                            } @else {
                              {{ option[1] }}
                            }
                          }
                        }
                      </li>
                    }
                  </ul>
                </div>
              }
              @if (field.type === 'STOPWATCH') {
                <div class="stopwatch-info">
                  <h5>Stopwatch Configuration:</h5>
                  <p>Laps: {{ field.options.laps || 'Not specified' }}</p>
                </div>
              }
              @if (field.type === 'TIMER') {
                <div class="timer-info">
                  <h5>Timer Configuration:</h5>
                  <p>Work Duration: {{ formatDuration(field.options.workDuration) }}</p>
                  <p>Break Duration: {{ formatDuration(field.options.breakDuration) }}</p>
                  <p>Sessions: {{ field.options.sessions }}</p>
                  @if (field.options.longBreakDuration) {
                    <p>Long Break Duration: {{ formatDuration(field.options.longBreakDuration) }}</p>
                  }
                  @if (field.options.longBreakInterval) {
                    <p>Long Break Interval: Every {{ field.options.longBreakInterval }} sessions</p>
                  }
                </div>
              }
            </div>
          </mat-expansion-panel>
        }
      </mat-expansion-panel>
    }
  `,
  styleUrls: ['./result-display.component.scss']
})
export class ResultDisplayComponent {
  @Input() result: any = null;
  expandedFields = signal<Set<string>>(new Set());

  hasOptions(field: any): boolean {
    return field.options && Object.keys(field.options).length > 0;
  }

  getOptionEntries(options: Record<string, any>): [string, any][] {
    return Object.entries(options);
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }

  formatObject(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }

  formatOptionName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  expandField(fieldName: string): void {
    this.expandedFields().add(fieldName);
  }

  collapseField(fieldName: string): void {
    this.expandedFields().delete(fieldName);
  }

  formatDuration(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  }
}
```

# frontend/src/app/components/result-display/result-display.component.scss

```scss
.entry-panel {
    margin-bottom: 24px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: box-shadow 0.3s ease;
  
    &:hover {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .mat-expansion-panel-header {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      padding: 16px 24px;
      background-color: #f5f5f5;
    }
  }
  
  .field-panel {
    margin-bottom: 16px;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: box-shadow 0.3s ease;
  
    &:hover {
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
  
    .mat-expansion-panel-header {
      font-size: 16px;
      font-weight: 500;
      color: #555;
      padding: 12px 20px;
      background-color: #fff;
      transition: background-color 0.3s ease;
  
      &:hover {
        background-color: #f9f9f9;
      }
    }
  }
  
  .field-details {
    padding: 16px 24px;
    background-color: #fff;
  
    p {
      margin-bottom: 8px;
      font-size: 14px;
      color: #666;
  
      strong {
        font-weight: 600;
        color: #333;
      }
    }
  }
  
  .options {
    margin-top: 16px;
  
    h4 {
      font-size: 16px;
      font-weight: 600;
      color: #555;
      margin-bottom: 8px;
    }
  
    ul {
      list-style-type: none;
      padding-left: 0;
  
      li {
        margin-bottom: 6px;
        font-size: 14px;
        color: #666;
  
        strong {
          font-weight: 600;
          color: #333;
        }
      }
    }
  }
  
  .nested-field {
    margin-top: 12px;
    margin-left: 24px;
    padding: 12px 16px;
    border: 1px dashed #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
  
    h5 {
      font-size: 14px;
      font-weight: 600;
      color: #555;
      margin-bottom: 6px;
    }
  
    p {
      margin-bottom: 6px;
      font-size: 13px;
      color: #777;
  
      strong {
        font-weight: 600;
        color: #444;
      }
    }
  }
  
  .nested-options {
    margin-top: 8px;
    padding-left: 20px;
  
    h6 {
      font-size: 13px;
      font-weight: 600;
      color: #666;
      margin-bottom: 4px;
    }
  
    ul {
      list-style-type: none;
      padding-left: 0;
  
      li {
        margin-bottom: 4px;
        font-size: 12px;
        color: #888;
  
        strong {
          font-weight: 600;
          color: #555;
        }
      }
    }
  }
```

# frontend/src/app/components/result-display/result-display.component.html

```html
<p>result-display works!</p>

```

# frontend/src/app/components/monaco-editor/monaco-editor.component.ts

```ts
import { Component, ElementRef, Input, OnInit, ViewChild, forwardRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-monaco-editor',
  standalone: true,
  imports: [FormsModule],
  template: `<div #editorContainer class="editor-container"></div>`,
  styles: [`
    .editor-container {
      height: 400px;
      border: 1px solid #ccc;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonacoEditorComponent),
      multi: true
    }
  ]
})
export class MonacoEditorComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  @Input() options: any = {};
  
  private editor: any = null;
  private _value: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMonaco();
    }
  }

  private async initMonaco() {
    if (!this.editorContainer) {
      throw new Error('Editor container not found.');
    }

    const monaco = await import('monaco-editor');
    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this._value,
      language: 'plaintext',
      theme: 'vs-dark',
      ...this.options
    });

    this.editor.onDidChangeModelContent(() => {
      const newValue = this.editor?.getValue();
      this._value = newValue || '';
      this.onChange(this._value);
      this.onTouched();
    });
  }

  writeValue(value: string): void {
    this._value = value || '';
    if (this.editor) {
      this.editor.setValue(this._value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private onChange = (_: any) => {};
  private onTouched = () => {};
}
```

# frontend/src/app/components/form-generator/form-generator.component.ts

```ts
//src/app/components/form-generator/form-generator.component.ts
import { Component, Input,Output,EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormControl, FormBuilder, FormGroup, Validators, FormArray, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TimeManagementComponent } from '../time-management/time-management.component';
import { TimeManagementService } from '../../services/time-management.service';
import { DynamicFieldComponent } from '../dynamic-field/dynamic-field.component';
import { FieldConfig } from '../../interfaces/field-config';
import { TimerSettings } from '../time-management/time-management.types';
//src/app/components/form-generator/form-generator.component.ts


interface StopwatchSettings {
  laps?: number;
  minLaps?: number;
  maxLaps?: number;
}


interface ExtendedTimerSettings extends TimerSettings {
  sessionLabels?: { [key: number]: { work?: string, break?: string } };
}

interface StopwatchFieldOptions {
  laps?: number;
  minLaps?: number;
  maxLaps?: number;
}
@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    TimeManagementComponent,
    DynamicFieldComponent
  ],
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGeneratorComponent implements OnChanges {

  @Input() parsedCode: any;
  @Input() isTemplate: boolean = true;
  @Input() initialValues: any = {};
  @Input() readOnly: boolean = false;
  @Output() formSaved = new EventEmitter<{formData: any, structure: any}>();
  @Output() formSubmitted = new EventEmitter<{formData: any, structure: any}>();

  
  @Output() templateSaved = new EventEmitter<{formData: any, structure: any}>();
  @Output() instanceSubmitted = new EventEmitter<{formData: any, structure: any}>();

  form!: FormGroup;
  fields: FieldConfig[] = [];
  entryName: string = '';
  private tableDataSources: { [key: string]: MatTableDataSource<FormGroup> } = {};

  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  private snackBar = inject(MatSnackBar);
  private timeManagementService = inject(TimeManagementService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parsedCode'] && this.parsedCode) {
      console.log('FormGeneratorComponent: Parsed code changed:', this.parsedCode);
      this.entryName = this.parsedCode.entryName || 'Dynamic Form';
      this.fields = this.parsedCode.parsedFields || this.parsedCode.fields || [];
      this.createForm();
      
      if (this.initialValues) {
        console.log('FormGeneratorComponent: Applying initial values:', this.initialValues);
        this.form.patchValue(this.initialValues);
      }

      if (changes['readOnly']) {
        if (this.form) {
          if (this.readOnly) {
            this.form.disable();
          } else {
            this.form.enable();
          }
        }
      }
    }}

  getFormControl(fieldName: string): AbstractControl {
    const control = this.form.get(fieldName);
    if (!control) {
      console.error(`Control ${fieldName} not found`);
      return new FormControl(); // Return a new FormControl as a fallback
    }
    return control;
  }

  getFormArray(fieldName: string): FormArray | null {
    const control = this.form.get(fieldName);
    return control instanceof FormArray ? control : null;
  }
  


  getListItemControl(listName: string, index: number, fieldName: string): AbstractControl {
    const listArray = this.form.get(listName) as FormArray;
    if (listArray && listArray.length > index) {
      const listItemGroup = listArray.at(index) as FormGroup;
      if (listItemGroup) {
        const control = listItemGroup.get(fieldName);
        if (control) {
          return control;
        }
      }
    }
    console.error(`Control ${listName}[${index}].${fieldName} not found`);
    return new FormControl(); // Return a new FormControl as a fallback
  }

  createForm(): void {
    console.log('FormGeneratorComponent: Creating form');
    const group: { [key: string]: AbstractControl } = {};
    this.fields.forEach(field => {
      if (!field.name || !field.type) {
        console.error('FormGeneratorComponent: Invalid field structure: missing name or type', field);
        return;
      }
      console.log(`FormGeneratorComponent: Processing field: ${field.name} (${field.type})`);
      const validators = this.getValidators(field);
      switch (field.type.toUpperCase()) {
        case 'TEXT':
          // Log the multiline option if it's set
          if (field.options && field.options['multiline']) {
            console.log(`Multiline option set for field: ${field.name}`);
          }
          group[field.name] = new FormControl(this.getDefaultValue(field), validators);
          break;
          
        case 'NUMBER':
        case 'DATE':
        case 'SCALE':
        case 'BOOLEAN':
          group[field.name] = new FormControl(this.getDefaultValue(field), validators);
          break;
        case 'LIST':
          group[field.name] = this.createListFormArray(field);
          break;
        case 'TABLE':
          group[field.name] = this.createTableFormArray(field);
          break;
        case 'STOPWATCH':
          group[field.name] = new FormControl({
            laps: [],
            completed: false
          }, { validators: this.getStopwatchValidators(field) });
          break;
        case 'TIMER':
          group[field.name] = new FormControl({
            currentTime: 0,
            currentPhase: 'work',
            currentSession: 1,
            completed: false
          });
          break;
        default:
          console.error(`FormGeneratorComponent: Unsupported field type: ${field.type}`);
      }
    });
    this.form = this.fb.group(group);
    console.log('FormGeneratorComponent: Created form:', this.form);
  }

  onSave(): void {
    if (this.form.valid) {
      const formData = this.prepareFormData();
      const structure = {
        entryName: this.parsedCode?.entryName || 'Untitled Form',
        fields: this.fields
      };
      this.templateSaved.emit({ formData, structure });
    } else {
      this.form.markAllAsTouched();
      this.snackBar.open('Please fill all required fields correctly.', 'Close', { duration: 3000 });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.prepareFormData();
      const structure = {
        entryName: this.parsedCode?.entryName || 'Untitled Form',
        fields: this.fields
      };
      this.instanceSubmitted.emit({ formData, structure });
    } else {
      this.form.markAllAsTouched();
      this.snackBar.open('Please fill all required fields correctly.', 'Close', { duration: 3000 });
    }
  }

  

  private prepareFormData(): any {
    const formData = { ...this.form.value };
    this.fields.forEach(field => {
      if (field.type === 'STOPWATCH' || field.type === 'TIMER') {
        formData[field.name] = this.form.get(field.name)?.value;
      } else if (field.type === 'DATE' && formData[field.name]) {
        // Convert date to ISO string for consistent format
        formData[field.name] = new Date(formData[field.name]).toISOString();
      }
    });
    return formData;
  }
  //others methods not necesary for our work

  createListItemGroup(field: FieldConfig): FormGroup {
    console.log('Creating list item group for field:', field.name);
    const group: { [key: string]: AbstractControl } = {};
    
    if (field.options?.listFields && Array.isArray(field.options.listFields)) {
      field.options.listFields.forEach(listField => {
        console.log('Processing list field:', listField.name, 'of type:', listField.type);
        if (listField.name) {
          group[listField.name] = new FormControl(
            this.getDefaultValue(listField),
            this.getValidators(listField)
          );
        }
      });
    } else {
      console.warn('No listFields found for:', field.name);
    }
    
    console.log('Created group:', group);
    console.log('FormGeneratorComponent: Form created:', this.form);
    return this.fb.group(group);
  }
  


  createTableRowGroup(field: FieldConfig): FormGroup {
    const rowGroup: { [key: string]: AbstractControl } = {};
    if (field.options?.columns && Array.isArray(field.options.columns)) {
      field.options.columns.forEach((column: FieldConfig) => {
        rowGroup[column.name] = this.fb.control(
          this.getDefaultValue(column),
          { validators: this.getValidators(column) }
        );
      });
    } else {
      console.error(`Invalid or missing columns for TABLE field: ${field.name}`, field);
    }
    return this.fb.group(rowGroup);
  }

  onTimerValueChange(fieldName: string, value: any) {
    console.log(`Timer ${fieldName} value changed:`, value);
    this.form.get(fieldName)?.setValue(value);
  }


private getBooleanDefaultValue(field: FieldConfig): boolean {
  if (field.options?.default !== undefined) {
    return field.options.default === true || field.options.default === 'true';
  }
  return false;
}
  initializeTableDataSources(): void {
    this.fields.forEach(field => {
      if (field.type === 'TABLE') {
        const tableArray = this.form.get(field.name) as FormArray;
        if (tableArray) {
          this.tableDataSources[field.name] = new MatTableDataSource<FormGroup>(tableArray.controls as FormGroup[]);
        }
      }
    });
  }



  getStopwatchValidators(field: FieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    const options = field.options as StopwatchFieldOptions;

    if (options.laps !== undefined) {
      validators.push(this.exactLapsValidator(options.laps));
    }
    if (options.minLaps !== undefined) {
      validators.push(this.minLapsValidator(options.minLaps));
    }
    if (options.maxLaps !== undefined) {
      validators.push(this.maxLapsValidator(options.maxLaps));
    }

    return validators;
  }
  exactLapsValidator(requiredLaps: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const laps = control.value.laps;
      return laps.length === requiredLaps ? null : { 'exactLaps': { required: requiredLaps, actual: laps.length } };
    };
  }

  minLapsValidator(minLaps: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const laps = control.value.laps;
      return laps.length >= minLaps ? null : { 'minLaps': { required: minLaps, actual: laps.length } };
    };
  }

  maxLapsValidator(maxLaps: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const laps = control.value.laps;
      return laps.length <= maxLaps ? null : { 'maxLaps': { allowed: maxLaps, actual: laps.length } };
    };
  }

  getValidators(field: FieldConfig): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.type.toUpperCase() === 'NUMBER' && field.options?.range) {
      if (field.options.range.min !== undefined) {
        validators.push(Validators.min(field.options.range.min));
      }
      if (field.options.range.max !== undefined) {
        validators.push(Validators.max(field.options.range.max));
      }
    }
    // Add custom validator for TEXT fields with maxLength
    if (field.type.toUpperCase() === 'TEXT' && field.options?.maxLength) {
      validators.push(Validators.maxLength(field.options.maxLength));
    }
    return validators;
  }
  

  getDefaultValue(field: FieldConfig): string | number | boolean | null {
    if (field.options?.default !== undefined) {
      return field.options.default;
    }
    switch (field.type.toUpperCase()) {
      case 'BOOLEAN':
        return false;
      case 'NUMBER':
      case 'SCALE':
        return null; // Changed to null to allow for empty initial state
      case 'DATE':
        return null;
      default:
        return '';
    }
  }

  getListControls(listName: string): AbstractControl[] {
    const listArray = this.form.get(listName);
    return listArray instanceof FormArray ? listArray.controls : [];
  }
  createListFormArray(field: FieldConfig): FormArray {
    console.log('Creating list form array for field:', field.name);
    const minItems = field.options?.minItems || 1;
    const listArray = this.fb.array([] as AbstractControl[]);
    
    for (let i = 0; i < minItems; i++) {
      const itemGroup = this.createListItemGroup(field);
      listArray.push(itemGroup as unknown as AbstractControl);
    }
    
    return listArray;
  }


  addListItem(field: FieldConfig): void {
    console.log('Adding list item for field:', field.name);
    const listArray = this.getFormArray(field.name);
    if (listArray) {
      if (field.options?.maxItems && listArray.length >= field.options.maxItems) {
        this.snackBar.open(`Maximum of ${field.options.maxItems} items allowed.`, 'Close', { duration: 3000 });
        return;
      }
      const newGroup = this.createListItemGroup(field);
      console.log('New group created:', newGroup);
      listArray.push(newGroup);
      console.log('List array after push:', listArray);
      this.cdr.detectChanges();
    } else {
      console.error(`FormArray not found for field: ${field.name}`);
    }
  }
  

  removeListItem(fieldName: string, index: number): void {
    const listArray = this.form.get(fieldName) as FormArray;
    if (listArray) {
      const field = this.fields.find(f => f.name === fieldName);
      if (field?.options?.minItems && listArray.length <= field.options.minItems) {
        this.snackBar.open(`Minimum of ${field.options.minItems} items required.`, 'Close', { duration: 3000 });
        return;
      }
      listArray.removeAt(index);
      this.cdr.detectChanges();
    }
  }


  createTableFormArray(field: FieldConfig): FormArray {
    const tableArray = this.fb.array([] as FormGroup[]);
    if (field.options?.columns) {
      const initialRow = this.createTableRowGroup(field);
      tableArray.push(initialRow);
    } else {
      console.error(`Missing columns for TABLE field: ${field.name}`, field);
    }
    return tableArray;
  }



  getTableDataSource(fieldName: string): MatTableDataSource<FormGroup> {
    return this.tableDataSources[fieldName];
  }

  updateTableDataSource(fieldName: string): void {
    const tableArray = this.form.get(fieldName) as FormArray;
    if (tableArray) {
      if (!this.tableDataSources[fieldName]) {
        this.tableDataSources[fieldName] = new MatTableDataSource<FormGroup>();
      }
      this.tableDataSources[fieldName].data = tableArray.controls as FormGroup[];
    }
  }

  addTableRow(field: FieldConfig): void {
    const tableArray = this.form.get(field.name) as FormArray;
    if (tableArray) {
      const newRow = this.createTableRowGroup(field);
      tableArray.push(newRow);
      this.updateTableDataSource(field.name);
      console.log(`Added new row to ${field.name}. Current rows:`, tableArray.length);
      this.cdr.detectChanges();
    } else {
      console.error(`FormArray not found for field: ${field.name}`);
    }
  }

  removeTableRow(field: FieldConfig, index: number): void {
    const tableArray = this.form.get(field.name) as FormArray;
    if (tableArray) {
      tableArray.removeAt(index);
      this.updateTableDataSource(field.name);
      console.log(`Removed row ${index} from ${field.name}. Current rows:`, tableArray.length);
      this.cdr.detectChanges();
    } else {
      console.error(`FormArray not found for field: ${field.name}`);
    }
  }

  getTableColumns(field: FieldConfig): string[] {
    return [...(field.options.columns?.map((column: FieldConfig) => column.name) || []), 'actions'];
  }

  getScaleRange(range?: { min: number; max: number }): number[] {
    const min = range?.min ?? 1;
    const max = range?.max ?? 5;
    return Array.from({length: max - min + 1}, (_, i) => i + min);
  }


  isFormControl(fieldName: string): boolean {
    return this.form.get(fieldName) instanceof FormControl;
  }

  isFormArray(fieldName: string): boolean {
    return this.form.get(fieldName) instanceof FormArray;
  }


  onStopwatchValueChange(fieldName: string, value: any) {
    console.log(`Stopwatch ${fieldName} value changed:`, value);
    this.form.get(fieldName)?.setValue(value);
  }

  getStopwatchSettings(field: FieldConfig): StopwatchSettings {
    return {
      laps: field.options.laps,
      minLaps: field.options.minLaps,
      maxLaps: field.options.maxLaps
    };
  }
  
  getTimerSettings(field: FieldConfig): ExtendedTimerSettings {
    const settings: ExtendedTimerSettings = {
      workDuration: field.options.workDuration || 25 * 60 * 1000,
      breakDuration: field.options.breakDuration || 5 * 60 * 1000,
      sessions: field.options.sessions || 4,
      longBreakDuration: field.options.longBreakDuration || 15 * 60 * 1000,
      longBreakInterval: field.options.longBreakInterval || 4,
      sessionLabels: {}
    };

    // Transform sessionLabels if necessary
    if (typeof field.options.sessionLabels === 'object' && field.options.sessionLabels !== null) {
      const transformedLabels: { [key: number]: { work?: string, break?: string } } = {};
      for (const [key, value] of Object.entries(field.options.sessionLabels)) {
        const sessionNumber = parseInt(key, 10);
        if (!transformedLabels[sessionNumber]) {
          transformedLabels[sessionNumber] = {};
        }
        if (typeof value === 'object' && value !== null) {
          if ('work' in value) {
            transformedLabels[sessionNumber].work = (value as any).work as string;
          }
          if ('break' in value) {
            transformedLabels[sessionNumber].break = (value as any).break as string;
          }
        } else if (typeof value === 'string') {
          // Handle the case where it's a string (old format)
          transformedLabels[sessionNumber].work = value;
        }
      }
      settings.sessionLabels = transformedLabels;
    }

    return settings;
  }
  


}

```

# frontend/src/app/components/form-generator/form-generator.component.scss

```scss
// Variables
$primary-color: #3f51b5;
$accent-color: #ff4081;
$warn-color: #f44336;
$background-color: #f5f5f5;
$card-background: #ffffff;
$text-color: #333333;
$border-color: #e0e0e0;
$shadow-color: rgba(0, 0, 0, 0.1);

// Mixins
@mixin card-style {
  background-color: $card-background;
  border-radius: 8px;
  box-shadow: 0 2px 4px $shadow-color;
  padding: 20px;
  margin-bottom: 20px;
}

@mixin responsive-font($min-size, $max-size, $min-width: 480px, $max-width: 1200px) {
  font-size: calc(#{$min-size} + (#{str-replace(#{$max-size}, 'px', '')} - #{str-replace(#{$min-size}, 'px', '')}) * ((100vw - #{$min-width}) / (#{str-replace(#{$max-width}, 'px', '')} - #{str-replace(#{$min-width}, 'px', '')})));

  @media (max-width: #{$min-width}) {
    font-size: $min-size;
  }
  @media (min-width: #{$max-width}) {
    font-size: $max-size;
  }
}

// Main Styles
:host {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}

.form-generator {
  flex-grow: 1;
  width: 100%;
  max-width: 2000px;
  margin: 0 auto;
  padding: 30px;
  background-color: $background-color;

  &__content {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }

  &__form-container,
  &__result-display {
    @include card-style;
  }

  &__form-container {
    flex: 1 1 600px;
  }

  &__result-display {
    flex: 1 1 400px;
  }

  &__title {
    @include responsive-font(1.8rem, 3rem);
    & {
      color: $primary-color;
      text-align: center;
      margin-bottom: 30px;
    }
  }

  &__form {
    display: flex;
    flex-direction: column;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }

  &__field-container {
    @include card-style;

    &--full {
      grid-column: 1 / -1;
    }
  }

  &__field {
    width: 100%;

    .mat-mdc-form-field-subscript-wrapper {
      font-size: 12px;
    }
  }

  &__checkbox-field {
    margin: 16px 0;
  }

  &__list,
  &__table {
    width: 100%;
    margin-bottom: 20px;
  }

  &__list-title,
  &__table-title {
    @include responsive-font(1.3rem, 1.5rem);
    & {
      color: $primary-color;
      margin-bottom: 15px;
    }
  }

  &__list-description,
  &__table-description {
    @include responsive-font(0.9rem, 1rem);
    & {
      color: lighten($text-color, 20%);
      margin-bottom: 20px;
    }
  }
  
  &__list-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__list-item {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    border: 1px solid $border-color;
    border-radius: 8px;
    padding: 20px;
  }

  &__list-item-fields {
    flex-grow: 1;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
  }

  &__table-container {
    overflow-x: auto;
    margin-bottom: 20px;
  }

  &__mat-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;

    .mat-mdc-header-cell,
    .mat-mdc-cell {
      padding: 15px;
      text-align: left;
      vertical-align: middle;
    }

    .mat-mdc-header-cell {
      font-weight: bold;
      color: $primary-color;
      background-color: lighten($primary-color, 45%);
      border-bottom: 2px solid $primary-color;
    }

    .mat-mdc-row {
      background-color: $card-background;
      box-shadow: 0 2px 4px $shadow-color;
      transition: box-shadow 0.3s ease;

      &:hover {
        box-shadow: 0 4px 8px $shadow-color;
      }
    }

    .mat-mdc-cell {
      &:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }

      &:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }

    .mat-mdc-form-field {
      width: 100%;
    }
  }

  &__submit {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }

  // Material Design Overrides
  .mat-mdc-form-field {
    width: 100%;

    .mat-mdc-form-field-flex {
      background-color: transparent;
    }

    .mat-mdc-text-field-wrapper {
      background-color: transparent !important;
      padding-bottom: 0;
    }

    .mat-mdc-form-field-underline {
      display: none;
    }

    .mat-mdc-form-field-infix {
      border-top: none;
      padding: 0.5em 0;
    }

    &.mat-focused .mat-mdc-form-field-flex {
      background-color: rgba(0, 0, 0, 0.06);
    }
  }

  .mat-mdc-checkbox {
    margin-right: 10px;
  }

  .mat-mdc-raised-button {
    margin-right: 8px;
  }

  // Responsive adjustments
  @media (max-width: 1200px) {
    padding: 20px;

    &__content {
      flex-direction: column;
    }

    &__form-container,
    &__result-display {
      flex-basis: 100%;
    }
  }

  @media (max-width: 768px) {
    &__grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    padding: 15px;

    &__mat-table {
      .mat-mdc-header-cell,
      .mat-mdc-cell {
        padding: 10px;
      }
    }
  }
}

// Loading spinner styles
mat-progress-spinner {
  margin: 40px auto;
}

// Print styles
@media print {
  .form-generator {
    background-color: white;
    box-shadow: none;
    padding: 0;

    &__field-container,
    &__list,
    &__table {
      box-shadow: none;
      border: 1px solid $border-color;
      page-break-inside: avoid;
    }

    &__mat-table .mat-mdc-row {
      box-shadow: none;
    }

    button {
      display: none;
    }
  }
}

// Helper function
@function str-replace($string, $search, $replace: '') {
  $index: str-index($string, $search);
  @if $index {
    @return str-slice($string, 1, $index - 1) + $replace + str-replace(str-slice($string, $index + str-length($search)), $search, $replace);
  }
  @return $string;
}
```

# frontend/src/app/components/form-generator/form-generator.component.html

```html
<!--src/app/components/form-generator/form-generator.component.html-->
<div class="form-generator">
  <h1 class="form-generator__title">{{ parsedCode?.entryName || 'Dynamic Form Generator' }}</h1>
  @if (form) {
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-generator__form">
      <div class="form-generator__grid">
        @for (field of fields; track field.name) {
          <div class="form-generator__field-container" [ngClass]="{'form-generator__field-container--full': field.type === 'LIST' || field.type === 'TABLE' || field.type === 'STOPWATCH' || field.type === 'TIMER'}">
            @switch (field.type) {
              @case ('TEXT') {
                <app-dynamic-field [field]="field" [control]="getFormControl(field.name)"></app-dynamic-field>
              }
              @case ('NUMBER') {
                <app-dynamic-field [field]="field" [control]="getFormControl(field.name)"></app-dynamic-field>
              }
              @case ('DATE') {
                <app-dynamic-field [field]="field" [control]="getFormControl(field.name)"></app-dynamic-field>
              }
              @case ('BOOLEAN') {
                <app-dynamic-field [field]="field" [control]="getFormControl(field.name)"></app-dynamic-field>
              }
              @case ('SCALE') {
                <app-dynamic-field [field]="field" [control]="getFormControl(field.name)"></app-dynamic-field>
              }
              @case ('LIST') {
                <div class="form-generator__list">
                  <h3 class="form-generator__list-title">{{ field.name }}</h3>
                  <p class="form-generator__list-description">{{ field.description }}</p>
                  <div class="form-generator__list-items" [formArrayName]="field.name">
                    @for (item of getListControls(field.name); track $index) {
                      <div class="form-generator__list-item">
                        <div class="form-generator__list-item-fields" [formGroupName]="$index">
                          @for (listField of field.options.listFields || []; track listField.name) {
                            @if (item.get(listField.name)) {
                              <app-dynamic-field
                                [field]="listField"
                                [control]="item.get(listField.name)!"
                              ></app-dynamic-field>
                            }
                          }
                        </div>
                        <button mat-icon-button color="warn" (click)="removeListItem(field.name, $index)" type="button">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    }
                  </div>
                  <button mat-raised-button color="primary" (click)="addListItem(field)" type="button">
                    Add Item
                  </button>
                </div>
              }
              @case ('TABLE') {
                <div class="form-generator__table">
                  <h3 class="form-generator__table-title">{{ field.name }}</h3>
                  <p class="form-generator__table-description">{{ field.description }}</p>
                  <div class="form-generator__table-container">
                    <table mat-table [dataSource]="getTableDataSource(field.name)" class="form-generator__mat-table">
                      @for (column of field.options.columns || []; track column.name) {
                        <ng-container [matColumnDef]="column.name">
                          <th mat-header-cell *matHeaderCellDef>{{ column.description }}</th>
                          <td mat-cell *matCellDef="let rowGroup">
                            <div [formGroup]="rowGroup">
                              <app-dynamic-field [field]="column" [control]="rowGroup.get(column.name)"></app-dynamic-field>
                            </div>
                          </td>
                        </ng-container>
                      }
                      <ng-container matColumnDef="actions">
                        <th mat-header-cell *matHeaderCellDef>Actions</th>
                        <td mat-cell *matCellDef="let rowGroup; let rowIndex = index">
                          <button mat-icon-button color="warn" type="button" (click)="removeTableRow(field, rowIndex)">
                            <mat-icon>delete</mat-icon>
                          </button>
                        </td>
                      </ng-container>
                      <tr mat-header-row *matHeaderRowDef="getTableColumns(field)"></tr>
                      <tr mat-row *matRowDef="let rowGroup; columns: getTableColumns(field);"></tr>
                    </table>
                  </div>
                  <button mat-raised-button color="accent" type="button" (click)="addTableRow(field)">
                    <mat-icon>add</mat-icon> Add Row
                  </button>
                </div>
              }
              @case ('STOPWATCH') {
                <div class="form-generator__stopwatch">
                  <app-time-management
                    [label]="field.name"
                    [description]="field.description"
                    [type]="'stopwatch'"
                    [settings]="getStopwatchSettings(field)"
                    (valueChange)="onStopwatchValueChange(field.name, $event)">
                  </app-time-management>
                </div>
              }
              @case ('TIMER') {
                <div class="form-generator__timer">
                  <app-time-management
                    [label]="field.name"
                    [description]="field.description"
                    [type]="'timer'"
                    [settings]="getTimerSettings(field)"
                    (valueChange)="onTimerValueChange(field.name, $event)">
                  </app-time-management>
                </div>
              }
            }
          </div>
        }
      </div>

      
      <div class="form-generator__actions">
        @if (isTemplate) {
          <button mat-raised-button color="primary" type="button" (click)="onSave()" [disabled]="form.pristine">Save Template</button>
        } @else {
          <button mat-raised-button color="accent" type="submit" [disabled]="form.invalid">Submit Form</button>
        }
      </div>
    </form>
  } @else {
    <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
  }
</div>


```

# frontend/src/app/components/dynamic-field/dynamic-field.component.ts

```ts
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FieldConfig } from '../../interfaces/field-config';

@Component({
  selector: 'app-dynamic-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  
  template: `
    <ng-container [ngSwitch]="field.type">
    <mat-form-field *ngSwitchCase="'TEXT'">
        @if (field.options.multiline) {
          <textarea matInput [formControl]="formControl" [placeholder]="field.name" 
                    [required]="field.required" [attr.maxlength]="field.options.maxLength"
                    rows="3"></textarea>
        } @else {
          <input matInput [formControl]="formControl" [placeholder]="field.name" 
                 [required]="field.required" [attr.maxlength]="field.options.maxLength">
        }
        <mat-error *ngIf="formControl.invalid">{{getErrorMessage()}}</mat-error>
         </mat-form-field>
      <mat-form-field *ngSwitchCase="'NUMBER'">
        <input matInput type="number" [formControl]="formControl" [placeholder]="field.name" 
               [required]="field.required" [min]="field.options.range?.min ?? null" [max]="field.options.range?.max ?? null">
        <mat-error *ngIf="formControl.invalid">{{getErrorMessage()}}</mat-error>
      </mat-form-field>
      <mat-form-field *ngSwitchCase="'DATE'">
        <input matInput [matDatepicker]="picker" [formControl]="formControl" [placeholder]="field.name" [required]="field.required">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
        <mat-error *ngIf="formControl.invalid">{{getErrorMessage()}}</mat-error>
      </mat-form-field>
      <mat-checkbox *ngSwitchCase="'BOOLEAN'" [formControl]="formControl">
        {{field.name}}
      </mat-checkbox>
      <mat-form-field *ngSwitchCase="'SCALE'">
        <mat-select [formControl]="formControl" [placeholder]="field.name" [required]="field.required">
          <mat-option *ngFor="let value of getScaleRange()" [value]="value">{{value}}</mat-option>
        </mat-select>
        <mat-error *ngIf="formControl.invalid">{{getErrorMessage()}}</mat-error>
      </mat-form-field>
    </ng-container>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
    }
  `]
})
export class DynamicFieldComponent implements OnInit, OnDestroy {
  @Input() field!: FieldConfig;
  @Input() control: AbstractControl | null = null;

  private destroy$ = new Subject<void>();

  get formControl(): FormControl {
    if (this.control instanceof FormControl) {
      return this.control;
    }
    if (this.control instanceof AbstractControl) {
      return new FormControl(this.control.value, this.control.validator);
    }
    console.warn(`No valid control for ${this.field.name}. Creating a new FormControl.`);
    return new FormControl();
  }

  ngOnInit() {
    this.setValidators();
    this.listenForChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setValidators() {
    const validators: ValidatorFn[] = [];
    if (this.field.required) {
      validators.push(Validators.required);
    }
    if (this.field.type === 'NUMBER' && this.field.options.range) {
      if (this.field.options.range.min !== undefined) {
        validators.push(Validators.min(this.field.options.range.min));
      }
      if (this.field.options.range.max !== undefined) {
        validators.push(Validators.max(this.field.options.range.max));
      }
    }
    if (this.field.type === 'TEXT' && this.field.options.maxLength) {
      validators.push(Validators.maxLength(this.field.options.maxLength));
    }
    this.formControl.setValidators(validators);
    this.formControl.updateValueAndValidity();
  }

  listenForChanges() {
    if (!this.control) {
      console.warn(`No control found for ${this.field.name}. Cannot listen for changes.`);
      return;
    }

    this.formControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        console.log(`${this.field.name} value changed:`, value);
        if (this.control && !(this.control instanceof FormControl)) {
          this.control.setValue(value, { emitEvent: false });
        }
      });
  }

  getErrorMessage(): string {
    if (this.formControl.hasError('required')) {
      return 'This field is required';
    }
    if (this.formControl.hasError('min')) {
      return `Minimum value is ${this.field.options.range?.min}`;
    }
    if (this.formControl.hasError('max')) {
      return `Maximum value is ${this.field.options.range?.max}`;
    }
    if (this.formControl.hasError('maxlength')) {
      return `Maximum length is ${this.field.options.maxLength} characters`;
    }
    return 'Invalid input';
  }

  getScaleRange(): number[] {
    const min = this.field.options.range?.min ?? 1;
    const max = this.field.options.range?.max ?? 5;
    return Array.from({length: max - min + 1}, (_, i) => i + min);
  }
}
```

# frontend/src/app/components/dynamic-field/dynamic-field.component.scss

```scss

```

# frontend/src/app/components/dynamic-field/dynamic-field.component.html

```html
<p>dynamic-field works!</p>

```

# frontend/src/app/components/code-input/code-input.component.ts

```ts
//src/app/components/code-input/code-input.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, inject, signal, computed, effect, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef, DestroyRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, Subject } from 'rxjs';
import * as monaco from 'monaco-editor';

interface FieldOptions {
  required?: boolean;
  default?: any;
  min?: number;
  max?: number;
  after?: number;
  laps?: number;
  min_laps?: number;
  max_laps?: number;
  [key: string]: any;
}

interface Token {
  type: string;
  value: string;
  line: number;
  column: number;
}

export interface ASTNode {
  type: string;
  name?: string;
  description?: string;
  options?: { [key: string]: any };
  children?: ASTNode[];
  line: number;
  column: number;
  dataType?: string;
}

class ParseError extends Error {
  constructor(message: string, public line: number, public column: number) {
    super(message);
    this.name = 'ParseError';
  }
}

enum LogLevel {
  DEBUG,
  INFO,
  WARN,
  ERROR
}

type LogSettings = {
  tokenization: boolean;
  parsing: boolean;
  validation: boolean;
  details: boolean;
};

@Component({
  selector: 'app-code-input',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="p-4">
      @if (isBrowser()) {
        <div #editorContainer class="editor-container" aria-label="Code Editor"></div>
      } @else {
        <textarea 
          [ngModel]="code()" 
          (ngModelChange)="updateCode($event)" 
          rows="10" 
          cols="50" 
          class="w-full p-2 border rounded"
          aria-label="Code Input">
        </textarea>
      }
      <button mat-raised-button color="primary" (click)="submitCode()" [disabled]="!isValidCode()" aria-label="Interpret Code">
        Interpret Code
      </button>
      @if (isValidating()) {
        <mat-spinner diameter="20" aria-label="Validating"></mat-spinner>
      }
      @if (errorMessage()) {
        <div class="error-message mt-2 text-red-500" role="alert">{{ errorMessage() }}</div>
      }
    </div>
  `,
  styles: [`
    .editor-container {
      height: 400px;
      border: 1px solid #ccc;
      margin-bottom: 10px;
    }
    .error-message {
      font-size: 0.875rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeInputComponent implements AfterViewInit {
  @ViewChild('editorContainer', { static: false }) editorContainer!: ElementRef<HTMLElement>;
  @Output() codeSubmitted = new EventEmitter<string>();

  onSubmit(): void {
    if (this.isValidCode()) {
      this.codeSubmitted.emit(this.code());
    }
  }

  private editor: monaco.editor.IStandaloneCodeEditor | null = null;
  private tokens = signal<Token[]>([]);
  private current = signal(0);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  code = signal('// Enter your code here');
  isValidCode = signal(false);
  isBrowser = computed(() => isPlatformBrowser(this.platformId));
  errorMessage = signal('');
  isValidating = signal(false);

  private logMessages = signal<string[]>([]);
  private logSettings = signal<LogSettings>({
    tokenization: false,
    parsing: false,
    validation: false,
    details: false
  });

  private codeChangeSubject = new Subject<string>();

  private originalCode: string = '';
  private parsedAST: ASTNode | null = null;
  constructor() {
    this.codeChangeSubject.pipe(
      debounceTime(300),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(() => {
      this.validateCode();
    });

    effect(() => {
      this.codeChangeSubject.next(this.code());
    });

    // Activate all logs
    this.logSettings.set({
      tokenization: false,
      parsing: false,
      validation: false,
      details: false
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initMonaco();
    }
  }

  private async initMonaco() {
    if (!this.editorContainer) {
      console.error('Editor container not found.');
      return;
    }
  
    // Ensure monaco is loaded only in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      try {
        const monaco = await import('monaco-editor');
  
        this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
          value: this.code(),
          language: 'plaintext',
          theme: 'vs-dark',
          minimap: { enabled: false },
          automaticLayout: true
        });
  
        this.editor.onDidChangeModelContent(() => {
          this.code.set(this.editor?.getValue() || '');
        });
      } catch (error) {
        console.error('Error loading or initializing Monaco editor:', error);
      }
    } else {
      console.warn('Monaco editor is not supported in server-side rendering.');
    }
  }

  updateCode(newCode: string) {
    this.code.set(newCode);
    if (this.editor) {
      this.editor.setValue(newCode);
    }
    this.originalCode = newCode;
    this.codeChangeSubject.next(newCode);
  }
  
  
  private log(category: keyof LogSettings, message: string, data?: any, level: LogLevel = LogLevel.INFO): void {
    if (this.logSettings()[category]) {
      const logMessage = `[${new Date().toISOString()}] [${LogLevel[level]}] [${category.toUpperCase()}] ${message}`;
      // console.log(logMessage, data);
      this.logMessages.update(messages => [...messages, logMessage + (data ? ` ${JSON.stringify(data)}` : '')]);
    }
  }

  setLogSettings(settings: Partial<LogSettings>) {
    this.logSettings.update(current => ({ ...current, ...settings }));
  }


  submitCode() {
    if (this.isValidCode()) {
      this.log('validation', 'Submitting code');
      this.codeSubmitted.emit(this.code());
    }
  }

  
  onCodeSubmitted(code: string): void {
    this.originalCode = code;
    this.codeSubmitted.emit(code);
  }

  getOriginalCode(): string {
    return this.originalCode;
  }


  getLogs(): string[] {
    return this.logMessages();
  }

  private validateCode() {
    console.log('Validating code:', this.code());
    this.log('validation', 'Starting code validation');
    this.isValidating.set(true);
    this.isValidCode.set(false);
    this.errorMessage.set('');
    this.tokens.set([]);
    this.current.set(0);

    try {
      this.tokenize(this.code());
      if (this.tokens().length > 0) {
        const ast = this.parse();
        this.log('parsing', 'Parsed AST', ast);
        this.isValidCode.set(true);
      } else {
        this.isValidCode.set(false);
      }
    } catch (error) {
      if (error instanceof ParseError) {
        this.errorMessage.set(`${error.message} (Line: ${error.line}, Column: ${error.column})`);
      } else if (error instanceof Error) {
        this.errorMessage.set(error.message);
      } else {
        this.errorMessage.set('An unknown error occurred');
      }
      this.log('validation', 'Validation error', { error: this.errorMessage() });
      this.isValidCode.set(false);
    } finally {
      this.isValidating.set(false);
      this.cdr.markForCheck();
    }
  }


  private tokenize(input: string): void {
    this.log('tokenization', 'Starting tokenization');
    const tokenPatterns = [
      { regex: /^\/\/.*/, type: 'COMMENT' },
      { regex: /^(ENTRY|TEXT|NUMBER|DATE|BOOLEAN|SCALE|LIST|TABLE|TIMER|STOPWATCH|COLUMN|WORK|BREAK|SESSIONS|LONG_BREAK|SESSION_LABELS|AFTER)\b/, type: 'KEYWORD' },
      { regex: /^(REQUIRED|DEFAULT|RANGE|MIN|MAX|LAPS|MIN_LAPS|MAX_LAPS|MULTILINE)\b/, type: 'OPTION' },
      { regex: /^"[^"]*"/, type: 'STRING' },
      { regex: /^[WB](?=\s)/, type: 'PHASE_IDENTIFIER' }, // New pattern for W and B
      { regex: /^[a-zA-Z_]\w*/, type: 'IDENTIFIER' },
      { regex: /^\d+/, type: 'NUMBER' },
      { regex: /^[{}]/, type: 'BRACE' },
      { regex: /^\s+/, type: 'WHITESPACE' },
    ];

  
    let pos = 0;
    let line = 1;
    let column = 1;
    const newTokens: Token[] = [];
  
    while (pos < input.length) {
      let match = null;
      for (const pattern of tokenPatterns) {
        match = input.slice(pos).match(pattern.regex);
        if (match) {
          if (pattern.type !== 'WHITESPACE' && pattern.type !== 'COMMENT') {
            const token = {
              type: pattern.type,
              value: match[0],
              line,
              column
            };
            newTokens.push(token);
            this.log('tokenization', `Token found: ${JSON.stringify(token)}`);
            
            // Additional logging for LONG_BREAK
            // if (token.value === 'LONG_BREAK') {
            //   console.log(`LONG_BREAK token found: ${JSON.stringify(token)}`);
            // }
          }
          if (match[0].includes('\n')) {
            const lines = match[0].split('\n');
            line += lines.length - 1;
            column = lines[lines.length - 1].length + 1;
          } else {
            column += match[0].length;
          }
          pos += match[0].length;
          break;
        }
      }
      if (!match) {
        const errorMessage = `Unexpected character: ${input[pos]}`;
        this.log('tokenization', errorMessage, null, LogLevel.ERROR);
        console.error(errorMessage, `at line ${line}, column ${column}`);
        throw new ParseError(errorMessage, line, column);
      }
    }
  
    this.tokens.set(newTokens);
    this.log('tokenization', 'Tokenization complete', { tokenCount: newTokens.length });
    // console.log('Tokenization complete. Tokens:', newTokens);
  }
  private parse(): ASTNode {
    this.log('parsing', 'Starting parsing');
    try {
      const ast = this.parseEntry();
      this.log('parsing', 'Parsed AST', ast);
      return ast;
    } catch (error) {
      if (error instanceof ParseError) {
        throw error;
      } else {
        throw new ParseError('Unexpected end of input', this.tokens()[this.current() - 1]?.line || 0, this.tokens()[this.current() - 1]?.column || 0);
      }
    }
  }
  
  // This method can be used to get the parsed AST if needed
  getParsedAST(): ASTNode | null {
    return this.parsedAST;
  }


  private parseEntry(): ASTNode {
    this.log('parsing', 'Parsing ENTRY');
    const token = this.consume('KEYWORD', 'ENTRY');
    const name = this.consume('STRING').value.slice(1, -1); // Remove quotes
    this.consume('BRACE', '{');
    
    const children = [];
    while (this.peek().type !== 'BRACE' || this.peek().value !== '}') {
      children.push(this.parseField());
    }
    
    this.consume('BRACE', '}');
    
    return {
      type: 'ENTRY',
      name,
      children,
      line: token.line,
      column: token.column
    };
  }
  
  
  private parseField(): ASTNode {
    this.log('parsing', 'Parsing field');
    const token = this.consume('KEYWORD');
    const fieldType = token.value;
    
    try {
      switch (fieldType) {
        case 'TEXT':
        case 'NUMBER':
        case 'DATE':
        case 'BOOLEAN':
        case 'SCALE':
        case 'STOPWATCH':
          return this.parseSimpleField(fieldType);
        case 'LIST':
        case 'TABLE':
          return this.parseComplexField(fieldType);
        case 'TIMER':
          return this.parseTimerField();
        default:
          throw new ParseError(`Unexpected field type: ${fieldType}`, token.line, token.column);
      }
    } catch (error: unknown) {
      if (error instanceof ParseError) {
        throw error;
      } else if (error instanceof Error) {
        throw new ParseError(`Error parsing ${fieldType} field: ${error.message}`, token.line, token.column);
      } else {
        throw new ParseError(`Unknown error parsing ${fieldType} field`, token.line, token.column);
      }
    }
  }
  

  private parseTimerField(): ASTNode {
    const name = this.consume('IDENTIFIER').value;
    const description = this.consume('STRING').value.slice(1, -1);
    const options: { [key: string]: any } = {};
    
    this.consume('BRACE', '{');
    

    while (this.peek().type !== 'BRACE' || this.peek().value !== '}') {
      const token = this.consume('KEYWORD');
      this.log('parsing', `Parsing TIMER field keyword: ${token.value}`);
      switch (token.value) {
        case 'WORK':
          options['workDuration'] = this.parseNumber(); // Keep in seconds
          break;
        case 'BREAK':
          options['breakDuration'] = this.parseNumber(); // Keep in seconds
          break;
        case 'SESSIONS':
          options['sessions'] = this.parseNumber();
          break;
          case 'SESSION_LABELS':
            options['sessionLabels'] = this.parseSessionLabels();
            break;
        case 'LONG_BREAK':
          options['longBreakDuration'] = this.parseNumber(); // Keep in seconds
          this.consume('KEYWORD', 'AFTER');
          options['longBreakInterval'] = this.parseNumber();
          break;
        default:
          throw new ParseError(`Unexpected keyword in TIMER: ${token.value}`, token.line, token.column);
      }
    }
    
    this.consume('BRACE', '}');
    
    const lastToken = this.tokens()[this.current() - 1];
    return { 
      type: 'TIMER', 
      name, 
      description, 
      options, 
      line: lastToken.line, 
      column: lastToken.column 
    };
  }
  
  private parseSessionLabels(): { [key: number]: { work?: string, break?: string } } {
    const labels: { [key: number]: { work?: string, break?: string } } = {};
    this.consume('BRACE', '{');
    while (this.peek().type !== 'BRACE' || this.peek().value !== '}') {
      const sessionNumberToken = this.parseNumber();
      const sessionNumber = Number(sessionNumberToken.value);
      const phaseIdentifierToken = this.consume('PHASE_IDENTIFIER');
      const phaseIdentifier = phaseIdentifierToken.value;
      const label = this.consume('STRING').value.slice(1, -1);
      
      if (!labels[sessionNumber]) {
        labels[sessionNumber] = {};
      }
      
      if (phaseIdentifier === 'W') {
        labels[sessionNumber].work = label;
      } else if (phaseIdentifier === 'B') {
        labels[sessionNumber].break = label;
      } else {
        throw new ParseError(
          `Unexpected phase identifier: ${phaseIdentifier}`,
          phaseIdentifierToken.line,
          phaseIdentifierToken.column
        );
      }
    }
    this.consume('BRACE', '}');
    return labels;
  }

  private parseNumber(): Token {
    return this.consume('NUMBER');
  }
  

  private parseSimpleField(type: string): ASTNode {
    this.log('parsing', `Parsing simple field: ${type}`);
    const name = this.consume('IDENTIFIER').value;
    const description = this.consume('STRING').value.slice(1, -1);
    const options = this.parseOptions();
    
    const lastToken = this.tokens()[this.current() - 1];
    return { type, name, description, options, line: lastToken.line, column: lastToken.column };
  }

  private parseComplexField(type: string): ASTNode {
    this.log('parsing', `Parsing complex field: ${type}`);
    const name = this.consume('IDENTIFIER').value;
    const description = this.consume('STRING').value.slice(1, -1);
    const options = this.parseOptions();
    
    this.consume('BRACE', '{');
    const children = [];
    
    while (this.peek().type !== 'BRACE' || this.peek().value !== '}') {
      if (type === 'TABLE') {
        children.push(this.parseColumn());
      } else {
        children.push(this.parseField());
      }
    }
    
    this.consume('BRACE', '}');
    
    const lastToken = this.tokens()[this.current() - 1];
    return { type, name, description, options, children, line: lastToken.line, column: lastToken.column };
  }
  

  private parseColumn(): ASTNode {
    this.log('parsing', 'Parsing COLUMN');
    this.consume('KEYWORD', 'COLUMN');
    const dataType = this.consume('KEYWORD').value;
    this.log('details', `COLUMN data type: ${dataType}`);
    const name = this.consume('IDENTIFIER').value;
    this.log('details', `COLUMN name: ${name}`);
    const description = this.consume('STRING').value.slice(1, -1);
    this.log('details', `COLUMN description: ${description}`);
    const options = this.parseOptions();
    this.log('details', `COLUMN options:`, options);
    
    const lastToken = this.tokens()[this.current() - 1];
    return { 
      type: 'COLUMN', 
      dataType, 
      name, 
      description, 
      options, 
      line: lastToken.line, 
      column: lastToken.column 
    };
  }

  private parseTimerSetting(): ASTNode {
    this.log('parsing', 'Parsing timer setting');
    const type = this.consume('KEYWORD').value;
    const value = parseInt(this.consume('NUMBER').value, 10);
    const options = type === 'LONG_BREAK' ? this.parseOptions() : {};
    
    const lastToken = this.tokens()[this.current() - 1];
    return { 
      type, 
      name: type.toLowerCase(),
      options: { ...options, value }, 
      line: lastToken.line, 
      column: lastToken.column 
    };
  }

  private parseOptions(): { [key: string]: any } {
    this.log('parsing', 'Parsing options');
    const options: { [key: string]: any } = {};
    
    while (this.peek().type === 'OPTION' || (this.peek().type === 'KEYWORD' && ['RANGE', 'MIN', 'MAX'].includes(this.peek().value))) {
      const optionToken = this.consume(this.peek().type);
      const option = optionToken.value;
      this.log('details', `Parsing option: ${option}`);
      
      switch (option) {
        case 'REQUIRED':
          options['required'] = true;
          break;
        case 'MULTILINE':
          options['multiline'] = true;
          break;
        case 'DEFAULT':
          options['default'] = this.parseDefaultValue();
          break;
        case 'RANGE':
          const minToken = this.consume('NUMBER');
          const maxToken = this.consume('NUMBER');
          options['range'] = {
            min: parseInt(minToken.value, 10),
            max: parseInt(maxToken.value, 10)
          };
          break;
        case 'MIN':
          options['min'] = parseInt(this.consume('NUMBER').value, 10);
          break;
        case 'MAX':
          options['max'] = parseInt(this.consume('NUMBER').value, 10);
          break;
        case 'LAPS':
          options['laps'] = parseInt(this.consume('NUMBER').value, 10);
          break;
          case 'MIN_LAPS':
            options['minLaps'] = parseInt(this.consume('NUMBER').value, 10);
            break;
          case 'MAX_LAPS':
            options['maxLaps'] = parseInt(this.consume('NUMBER').value, 10);
            break;
        case 'AFTER':
          options['after'] = parseInt(this.consume('NUMBER').value, 10);
          break;
        default:
          throw new ParseError(`Unexpected option: ${option}`, optionToken.line, optionToken.column);
      }
    }
    
    return options;
  }

  private parseDefaultValue(): any {
    this.log('parsing', 'Parsing default value');
    const nextToken = this.peek();
    switch (nextToken.type) {
      case 'NUMBER':
        return parseInt(this.consume('NUMBER').value, 10);
      case 'STRING':
        return this.consume('STRING').value.slice(1, -1);
      case 'IDENTIFIER':
        const value = this.consume('IDENTIFIER').value.toLowerCase();
        return value === 'true' ? true : value === 'false' ? false : value;
      default:
        throw new ParseError(`Unexpected default value type: ${nextToken.type}`, nextToken.line, nextToken.column);
    }
  }

  private consume(expectedType: string, expectedValue?: string): Token {
    const tokenArray = this.tokens();
    const currentIndex = this.current();
    if (currentIndex >= tokenArray.length) {
      const lastToken = tokenArray[tokenArray.length - 1];
      throw new ParseError('Unexpected end of input', lastToken.line, lastToken.column);
    }
    const token = tokenArray[currentIndex];
    if (token.type !== expectedType) {
      throw new ParseError(`Expected token type ${expectedType}, but got ${token.type}`, token.line, token.column);
    }
    if (expectedValue && token.value !== expectedValue) {
      throw new ParseError(`Expected token value ${expectedValue}, but got ${token.value}`, token.line, token.column);
    }
    this.current.set(currentIndex + 1);
    this.log('details', `Consumed token: ${token.type} ${token.value}`);
    return token;
  }

  private peek(): Token {
    const tokenArray = this.tokens();
    const currentIndex = this.current();
    return tokenArray[currentIndex] || { type: 'EOF', value: '', line: -1, column: -1 };
  }

}
```

# frontend/src/app/components/code-input/code-input.component.scss

```scss

```

# frontend/src/app/components/code-input/code-input.component.html

```html
<p>code-input works!</p>

```

# frontend/src/app/components/code-analysis/code-analysis.component.ts

```ts
import { Component, Input, Output, EventEmitter, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CodeService } from '../../services/code.service';
import { CreditService } from '../../services/credit.service';
import { CodeInputComponent } from '../code-input/code-input.component';
import { ResultDisplayComponent } from '../result-display/result-display.component';
import { FormGeneratorComponent } from '../form-generator/form-generator.component';
import { Form  } from '../../interfaces/workspace.interface';

export interface ParsedStructure {
  entryName: string;
  fields: ParsedField[];
}

export interface ParsedField {
  type: string;
  name: string;
  description: string;
  required: boolean;
  options: FieldOptions;
  fields?: ParsedField[]; // For nested structures like LIST and TABLE
}

interface FieldOptions {
  default?: any;
  range?: { min: number; max: number };
  min?: number;
  max?: number;
  columns?: ParsedField[];
  laps?: number;
  minLaps?: number;
  maxLaps?: number;
  workDuration?: number;
  breakDuration?: number;
  sessions?: number;
  longBreakDuration?: number;
  longBreakInterval?: number;
  listFields: ParsedField[];
}

@Component({
  selector: 'app-code-analysis',
  standalone: true,
  imports: [CommonModule, CodeInputComponent, ResultDisplayComponent, FormGeneratorComponent, MatSnackBarModule],
  template: `
    @if (loading()) {
      <div class="loading">Interpreting code...</div>
    }
    <div>
      <app-code-input (codeSubmitted)="interpretCode($event)"></app-code-input>
      @if (interpretedStructure()) {
        <app-result-display [result]="interpretedStructure()"></app-result-display>
        <app-form-generator [parsedCode]="interpretedStructure()"></app-form-generator>
        @if (hasTables()) {
          <div class="table-info">
            <h3>Table Information:</h3>
            <ul>
              @for (table of tables(); track table.name) {
                <li>{{ table.name }}: {{ table.options.columns?.length || 0 }} columns</li>
              }
            </ul>
          </div>
        }
      }
      @if (error()) {
        <div class="error">{{ error() }}</div>
      }
    </div>
    <div class="credit-info">
      Available Credits: {{ credits() }}
    </div>
  `,
  styles: [/* ... styles remain the same ... */]
})
export class CodeAnalysisComponent {
  @Input() workspaceId: string = '';
  @Input() folderId: string = '';
  @Output() formGenerated = new EventEmitter<any>();

  private interpretedStructureSignal = signal<ParsedStructure | null>(null);
  private errorSignal = signal<string | null>(null);
  private loadingSignal = signal(false);
  private creditsSignal = signal(0);

  interpretedStructure = computed(() => this.interpretedStructureSignal());
  error = computed(() => this.errorSignal());
  loading = computed(() => this.loadingSignal());
  credits = computed(() => this.creditsSignal());

  tables = computed(() => {
    if (!this.interpretedStructure()) return [];
    return this.getAllTables(this.interpretedStructure()!.fields);
  });

  hasTables = computed(() => this.tables().length > 0);

  private codeService = inject(CodeService);
  private creditService = inject(CreditService);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.loadCredits();
  }

  interpretCode(code: string): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    if (this.credits() < 1) {
      this.snackBar.open('Insufficient credits. Please purchase more credits to continue.', 'Close', { duration: 5000 });
      this.loadingSignal.set(false);
      return;
    }

    this.codeService.interpretCode(code).subscribe({
      next: (response) => {
        this.processInterpretedStructure(response.structure);
        this.loadingSignal.set(false);
        this.snackBar.open('Code interpreted successfully', 'Close', { duration: 3000 });
        this.useCredits(1, 'Code Analysis');
      },
      error: (error) => {
        this.interpretedStructureSignal.set(null);
        this.errorSignal.set(this.getDetailedErrorMessage(error));
        this.loadingSignal.set(false);
        this.snackBar.open('Error interpreting code. See details below.', 'Close', { duration: 5000 });
      }
    });
  }

  private loadCredits(): void {
    this.creditService.getCreditBalance().subscribe({
      next: (response) => {
        this.creditsSignal.set(response.credits);
        if (response.credits < 5) {
          this.snackBar.open('Low credit balance. Please consider purchasing more credits.', 'Close', { duration: 5000 });
        }
      },
      error: (error) => console.error('Error loading credits', error)
    });
  }

  private useCredits(amount: number, description: string): void {
    this.creditService.useCredits(amount, description).subscribe({
      next: (response) => {
        this.creditsSignal.set(response.credits);
        if (response.credits < 5) {
          this.snackBar.open('Low credit balance. Please consider purchasing more credits.', 'Close', { duration: 5000 });
        }
      },
      error: (error) => console.error('Error using credits', error)
    });
  }

  


  private processInterpretedStructure(structure: ParsedStructure): void {
    console.log('CodeAnalysisComponent: Processing interpreted structure:', structure);
    if (structure.fields && Array.isArray(structure.fields)) {
      structure.fields = structure.fields.map(field => this.processField(field));
    } else {
      console.warn('CodeAnalysisComponent: No fields found in the interpreted structure');
    }
    console.log('CodeAnalysisComponent: Processed fields:', structure.fields);
    this.interpretedStructureSignal.set(structure);
    
    const templateForm: Form = {
      _id: 'temp_' + Date.now(),
      name: structure.entryName || 'New Template',
      structure: structure,
      isTemplate: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.formGenerated.emit(templateForm);
  }


  private processField(field: ParsedField): ParsedField {
    console.log('CodeAnalysisComponent: Processing field:', field);
    switch (field.type.toUpperCase()) {
      case 'TEXT':
      case 'NUMBER':
      case 'DATE':
      case 'BOOLEAN':
      case 'SCALE':
        console.log(`CodeAnalysisComponent: Processing ${field.type} field`);
        break;
      case 'LIST':
        console.log('CodeAnalysisComponent: Processing LIST field');
        if ('listFields' in field.options && Array.isArray(field.options.listFields)) {
          field.options.listFields = field.options.listFields.map(listField => this.processField(listField));
        }
        break;
      case 'TABLE':
        console.log('CodeAnalysisComponent: Processing TABLE field');
        if ('columns' in field.options && Array.isArray(field.options.columns)) {
          field.options.columns = field.options.columns.map(column => this.processField(column));
        }
        break;
      case 'STOPWATCH':
        console.log('CodeAnalysisComponent: Processing STOPWATCH field');
        break;
      case 'TIMER':
        console.log('CodeAnalysisComponent: Processing TIMER field');
        break;
      default:
        console.warn(`CodeAnalysisComponent: Unknown field type: ${field.type}`);
    }
    return field;
  }


  private getAllTables(fields: ParsedField[]): ParsedField[] {
    let tables: ParsedField[] = [];
    for (const field of fields) {
      if (field.type.toUpperCase() === 'TABLE') {
        tables.push(field);
      }
      if (field.fields) {
        tables = tables.concat(this.getAllTables(field.fields));
      }
    }
    return tables;
  }

  private getDetailedErrorMessage(error: any): string {
    if (error.name === 'ParserError' || error.name === 'LexerError') {
      return `${error.name} at line ${error.line}, column ${error.column}: ${error.message}`;
    }
    return error.message || 'An unexpected error occurred';
  }
}

```

# frontend/src/app/components/code-analysis/code-analysis.component.scss

```scss

```

# frontend/src/app/components/code-analysis/code-analysis.component.html

```html
<p>code-analysis works!</p>

```

# frontend/src/app/components/workspace/workspace-list/workspace-list.component.ts

```ts
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../../services/workspace.service';
import { Workspace, WorkspacesResponse } from '../../../interfaces/workspace.interface';

@Component({
  selector: 'app-workspace-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  template: `
    <h2>Your Workspaces</h2>
    <mat-list>
      @for (workspace of workspaces; track workspace._id) {
        <mat-list-item>
          <span matListItemTitle>{{ workspace.name }}</span>
          <span matListItemLine>{{ workspace.description }}</span>
          <span matListItemLine>Created: {{ workspace.createdAt | date }}</span>
          <button class="view" mat-icon-button [routerLink]="['/workspaces', workspace._id]">
            <mat-icon>visibility</mat-icon>
          </button>
        </mat-list-item>
      } @empty {
        <mat-list-item>No workspaces found.</mat-list-item>
      }
    </mat-list>
    <mat-paginator
      [length]="totalWorkspaces"
      [pageSize]="pageSize"
      [pageSizeOptions]="[5, 10, 25]"
      (page)="onPageChange($event)"
      aria-label="Select page">
    </mat-paginator>
    <button mat-raised-button color="primary" routerLink="/workspaces/create">Create New Workspace</button>
  `,
  styles: [`
    :host {
      display: block;
      padding: 20px;
    }
    button.view {
      position: absolute;
      bottom: 50px;
      right: 16px;

    }
    mat-list-item {
      margin-bottom: 16px;
    }
  `]
})
export class WorkspaceListComponent implements OnInit {
  workspaces: Workspace[] = [];
  totalWorkspaces: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private workspaceService: WorkspaceService) {}

  ngOnInit(): void {
    this.loadWorkspaces();
  }

  loadWorkspaces(): void {
    this.workspaceService.getWorkspaces(this.currentPage, this.pageSize).subscribe({
      next: (response: WorkspacesResponse) => {
        this.workspaces = response.workspaces;
        this.totalWorkspaces = response.totalWorkspaces;
      },
      error: (error) => console.error('Error loading workspaces', error)
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadWorkspaces();
  }
}
```

# frontend/src/app/components/workspace/workspace-detail/workspace-detail.component.ts

```ts
//src/app/components/workspace/workspace-detail/workspace-detail.component.ts
import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { WorkspaceService } from '../../../services/workspace.service';
import { WebSocketService } from '../../../services/web-socket.service';
import { ConfirmDialogComponent } from '../../../dialogs/workspaces/confirm-dialog.component';
import { PermissionManagementComponent } from '../permission-management/permission-management.component';
import { AuthService } from '../../../services/auth.service';
import { ActivityLogComponent } from '../activity-log/activity-log.component';
import { FolderManagementComponent } from '../folder-management/folder-management.component';
import { FormManagementComponent } from '../form-management/form-management.component';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { FormManagementService } from '../../../services/form-management.service';
import { Workspace, Form, FormTemplate, FormInstance } from '../../../interfaces/workspace.interface';

@Component({
  selector: 'app-workspace-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    PermissionManagementComponent,
    ActivityLogComponent,
    FolderManagementComponent,
    FormManagementComponent,
    FormGeneratorComponent
  ],
  templateUrl: './workspace-detail.component.html',
})
export class WorkspaceDetailComponent implements OnInit, OnDestroy {
  workspace = signal<Workspace | null>(null);
  loading = signal(true);
  workspaceForm: FormGroup;
  canManageUsers = signal(false);
  activeUsers: string[] = [];
  selectedFolderId = signal<string | null>(null);
  selectedForm = signal<any | null>(null);
  
  private workspaceUpdateSubscription: Subscription | null = null;
  private activeUsersSubscription: Subscription | null = null;
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private workspaceService = inject(WorkspaceService);
  private webSocketService = inject(WebSocketService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private formManagementService = inject(FormManagementService);
  

  templates = signal<FormTemplate[]>([]);
  instances = signal<FormInstance[]>([]);
  constructor() {
    this.workspaceForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadWorkspace(id);
      this.webSocketService.joinWorkspace(id);
      this.subscribeToWorkspaceUpdates(id);
      this.subscribeToActiveUsers();
      this.checkUserPermissions();
    } else {
      this.loading.set(false);
    }
  }

  ngOnDestroy(): void {
    const currentWorkspace = this.workspace();
    if (currentWorkspace) {
      this.webSocketService.leaveWorkspace(currentWorkspace._id);
    }
    this.workspaceUpdateSubscription?.unsubscribe();
    this.activeUsersSubscription?.unsubscribe();
  }
  loadWorkspace(id: string): void {
    this.workspaceService.getWorkspaces().subscribe({
      next: (response) => {
        const workspace = response.workspaces.find(w => w._id === id);
        if (workspace) {
          this.workspace.set(workspace);
          this.workspaceForm.patchValue({
            name: workspace.name,
            description: workspace.description
          });
        } else {
          this.snackBar.open('Workspace not found', 'Close', { duration: 5000 });
        }
        this.loading.set(false);
      },
      error: (error: Error) => {
        console.error('Error loading workspace', error);
        this.snackBar.open('Error loading workspace. Please try again.', 'Close', { duration: 5000 });
        this.loading.set(false);
      }
    });
  }


  onSubmit(): void {
    if (this.workspaceForm.valid) {
      const currentWorkspace = this.workspace();
      if (currentWorkspace?._id) {
        const { name, description } = this.workspaceForm.value;
        this.workspaceService.updateWorkspace(currentWorkspace._id, name, description).subscribe({
          next: () => {
            this.snackBar.open('Workspace updated successfully', 'Close', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error updating workspace', error);
            this.snackBar.open('Error updating workspace. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    }
  }

  onDelete(): void {
    const currentWorkspace = this.workspace();
    if (currentWorkspace?._id) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Delete Workspace',
          message: `Are you sure you want to delete the workspace "${currentWorkspace.name}"?`
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.workspaceService.deleteWorkspace(currentWorkspace._id).subscribe({
            next: () => {
              this.snackBar.open('Workspace deleted successfully', 'Close', { duration: 3000 });
              this.router.navigate(['/workspaces']);
            },
            error: (error) => {
              console.error('Error deleting workspace', error);
              this.snackBar.open('Error deleting workspace. Please try again.', 'Close', { duration: 5000 });
            }
          });
        }
      });
    }
  }

  private checkUserPermissions() {
    const currentUser = this.authService.currentUserValue;
    const currentWorkspace = this.workspace();
    if (currentWorkspace && currentUser) {
      const currentMember = currentWorkspace.members.find(m => m.user === currentUser.id);
      this.canManageUsers.set(currentMember?.role === 'owner' || currentMember?.role === 'admin' || !!currentMember?.permissions?.manageUsers);
    }
  }

  onPermissionsUpdated() {
    const currentWorkspace = this.workspace();
    if (currentWorkspace?._id) {
      this.loadWorkspace(currentWorkspace._id);
    }
  }

  private subscribeToWorkspaceUpdates(workspaceId: string): void {
    this.workspaceUpdateSubscription = this.webSocketService.getWorkspaceUpdates().subscribe(
      update => {
        if (update && update.workspace._id === workspaceId) {
          this.workspace.set(update.workspace);
          this.workspaceForm.patchValue({
            name: update.workspace.name,
            description: update.workspace.description
          });
        }
      }
    );
  }

  private subscribeToActiveUsers(): void {
    this.activeUsersSubscription = this.webSocketService.getActiveUsers().subscribe(
      (users: string[]) => {
        this.activeUsers = users;
      }
    );
  }

  onFolderSelected(folderId: string): void {
    this.selectedFolderId.set(folderId);
    this.selectedForm.set(null);
    this.loadFormsInFolder(folderId);
  }






  onFormSaved(event: { formData: any, structure: any }): void {
    const workspaceId = this.workspace()?._id;
    const folderId = this.selectedFolderId();
    const selectedForm = this.selectedForm();
    
    if (!workspaceId || !folderId || !selectedForm) {
      this.snackBar.open('Unable to save form: Workspace, folder, or form not selected', 'Close', { duration: 3000 });
      return;
    }
    this.formManagementService.saveForm(workspaceId, folderId, selectedForm._id, event).subscribe({
      next: (savedForm) => {
        console.log('Form saved successfully:', savedForm);
        this.snackBar.open('Form saved successfully!', 'Close', { duration: 3000 });
        this.loadFormsInFolder(folderId);
      },
      error: (error) => {
        console.error('Error saving form:', error);
        this.snackBar.open('Error saving form. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }

  onFormSubmitted(event: { formData: any, structure: any }): void {
    const workspaceId = this.workspace()?._id;
    const folderId = this.selectedFolderId();
    const selectedForm = this.selectedForm();
    
    if (!workspaceId || !folderId || !selectedForm) {
      this.snackBar.open('Unable to submit form: Workspace, folder, or form not selected', 'Close', { duration: 3000 });
      return;
    }
    this.formManagementService.submitForm(workspaceId, folderId, selectedForm._id, event.formData).subscribe({
      next: (submission) => {
        console.log('Form submitted successfully:', submission);
        this.snackBar.open('Form submitted successfully!', 'Close', { duration: 3000 });
        this.loadFormsInFolder(folderId);
      },
      error: (error) => {
        console.error('Error submitting form:', error);
        this.snackBar.open('Error submitting form. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }

  onFormSelected(form: Form): void {
    this.selectedForm.set(form);
  }

  loadFormsInFolder(folderId: string): void {
    const workspaceId = this.workspace()?._id;
    if (workspaceId) {
      this.formManagementService.getFormsInFolder(workspaceId, folderId).subscribe({
        next: ({templates, instances}) => {
          this.templates.set(templates as FormTemplate[]);
          this.instances.set(instances as FormInstance[]);
        },
        error: (error) => {
          console.error('Error loading forms:', error);
          this.snackBar.open('Error loading forms. Please try again.', 'Close', { duration: 5000 });
        }
      });
    }
  }
  

}
```

# frontend/src/app/components/workspace/workspace-detail/workspace-detail.component.html

```html
<!-- src/app/components/workspace/workspace-detail/workspace-detail.component.html -->
@if (loading()) {
  <mat-spinner></mat-spinner>
}

@if (workspace()) {
  <mat-card>
    <mat-card-header>
      <mat-card-title>{{ workspace()?.name }}</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <form [formGroup]="workspaceForm" (ngSubmit)="onSubmit()">
        <mat-form-field>
          <mat-label>Workspace Name</mat-label>
          <input matInput formControlName="name" required>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>
      </form>
      <h3>Active Users</h3>
      <mat-list>
        @for (user of activeUsers; track user) {
          <mat-list-item>
            <span matListItemTitle>{{ user }}</span>
          </mat-list-item>
        }
      </mat-list>
    </mat-card-content>
    <mat-card-actions>
      <button mat-raised-button color="primary" (click)="onSubmit()">Save</button>
      <button mat-raised-button color="warn" (click)="onDelete()">Delete</button>
    </mat-card-actions>
  </mat-card>
  
  <app-folder-management 
    [workspaceId]="workspace()?._id ?? ''"
    (folderSelected)="onFolderSelected($event)">
  </app-folder-management>
  
  @if (workspace() && selectedFolderId()) {
    <app-form-management
      [workspaceId]="workspace()?._id ?? ''"
      [folderId]="selectedFolderId()!"
      [selectedForm]="selectedForm()"
      (formSelected)="onFormSelected($event)">
    </app-form-management>
  }
  
  @if (canManageUsers()) {
    <app-permission-management
      [members]="workspace()?.members ?? []"
      [workspaceId]="workspace()?._id ?? ''"
      (permissionsUpdated)="onPermissionsUpdated()">
    </app-permission-management>
    <app-activity-log [workspaceId]="workspace()?._id ?? ''"></app-activity-log>
  }
}

@if (!workspace()) {
  <p>Workspace not found.</p>
}
```

# frontend/src/app/components/workspace/workspace-create/workspace-create.component.ts

```ts
//frontend/src/app/components/workspace/workspace-create/workspace-create.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WorkspaceService } from '../../../services/workspace.service';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-workspace-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  template: `
    <h2>Create New Workspace</h2>
    <form [formGroup]="workspaceForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Workspace Name</mat-label>
        <input matInput formControlName="name" required>
        <mat-error *ngIf="workspaceForm.get('name')?.hasError('required')">Workspace name is required</mat-error>
        <mat-error *ngIf="workspaceForm.get('name')?.hasError('minlength')">Workspace name must be at least 3 characters long</mat-error>
        <mat-error *ngIf="workspaceForm.get('name')?.hasError('maxlength')">Workspace name cannot exceed 50 characters</mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Description</mat-label>
        <textarea matInput formControlName="description" rows="3"></textarea>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="workspaceForm.invalid">Create Workspace</button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 300px;
      margin: 0 auto;
    }
    mat-form-field {
      width: 100%;
      margin-bottom: 20px;
    }
  `]
})
export class WorkspaceCreateComponent {
  workspaceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private workspaceService: WorkspaceService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.workspaceForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.workspaceForm.valid) {
      const { name, description } = this.workspaceForm.value;
      this.workspaceService.createWorkspace(name, description).subscribe({
        next: () => {
          this.snackBar.open('Workspace created successfully', 'Close', { duration: 3000 });
          this.router.navigate(['/workspaces']);
        },
        error: (error) => {
          console.error('Error creating workspace', error);
          this.snackBar.open('Failed to create workspace. Please try again.', 'Close', { duration: 5000 });
        }
      });
    }
  }
}
```

# frontend/src/app/components/workspace/permission-management/permission-management.component.ts

```ts
//frontend/src/app/components/workspace/permission-management/permission-management.component.ts
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkspaceService } from '../../../services/workspace.service';
import { WorkspaceMember } from '../../../interfaces/workspace.interface';

@Component({
    selector: 'app-permission-management',
    standalone: true,
    imports: [FormsModule, CommonModule],
    template: `
    <h3>Manage Permissions</h3>
    <ul>
      @for (member of members; track member.user) {
        <li>
          {{ member.user }}
          <select [(ngModel)]="member.role" (change)="updatePermissions(member)">
            <option value="viewer">Viewer</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
          <label><input type="checkbox" [(ngModel)]="member.permissions.read" (change)="updatePermissions(member)"> Read</label>
          <label><input type="checkbox" [(ngModel)]="member.permissions.write" (change)="updatePermissions(member)"> Write</label>
          <label><input type="checkbox" [(ngModel)]="member.permissions.delete" (change)="updatePermissions(member)"> Delete</label>
          <label><input type="checkbox" [(ngModel)]="member.permissions.manageUsers" (change)="updatePermissions(member)"> Manage Users</label>
        </li>
      }
    </ul>
  `
})
export class PermissionManagementComponent {
  @Input() members: WorkspaceMember[] = [];
  @Input() workspaceId: string = '';
  @Output() permissionsUpdated = new EventEmitter<void>();

  constructor(private workspaceService: WorkspaceService) {}

  updatePermissions(member: WorkspaceMember) {
    this.workspaceService.updateMemberPermissions(this.workspaceId, member.user, member.role, member.permissions)
      .subscribe({
        next: () => {
          this.permissionsUpdated.emit();
        },
        error: (error) => console.error('Error updating permissions:', error)
      });
  }
}
```

# frontend/src/app/components/workspace/form-view-submit/form-view-submit.component.ts

```ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-view-submit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <h2>{{ formData.name }}</h2>
      @for (field of formData.structure.fields; track field.name) {
        <mat-form-field>
          <mat-label>{{ field.name }}</mat-label>
          <input matInput [formControlName]="field.name" [placeholder]="field.description">
        </mat-form-field>
      }
      <button mat-raised-button color="primary" type="submit">Submit</button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 400px;
      margin: 0 auto;
    }
  `]
})
export class FormViewSubmitComponent implements OnInit {
    @Input() formData: any;
    @Output() formSubmitted = new EventEmitter<any>();
  
    form!: FormGroup;
  
    constructor(private fb: FormBuilder) {}
  
    ngOnInit() {
      this.createForm();
    }
  
    createForm() {
      const group: any = {};
      this.formData.structure.fields.forEach((field: any) => {
        group[field.name] = [''];
      });
      this.form = this.fb.group(group);
    }
  
    onSubmit() {
      if (this.form.valid) {
        this.formSubmitted.emit(this.form.value);
      }
    }
  }
```

# frontend/src/app/components/workspace/form-management/form-management.component.ts

```ts
//src/app/components/workspace/form-management/form-management.component.ts
import { Component, Input, Output, inject, OnInit, signal, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef,computed, effect } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormDialogComponent } from '../../../dialogs/workspaces/form-dialog.component';
import { ConfirmDialogComponent } from '../../../dialogs/workspaces/confirm-dialog.component';
import { FormManagementService } from '../../../services/form-management.service';
import { FormGeneratorComponent } from '../../form-generator/form-generator.component';
import { CodeAnalysisComponent } from '../../code-analysis/code-analysis.component';
import { Form, FormTemplate, FormInstance, FormSubmission } from '../../../interfaces/workspace.interface';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatListModule } from '@angular/material/list'; 
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-form-management',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,  
    FormsModule, 
    MatListModule,        
    MatSlideToggleModule,
    FormGeneratorComponent,
    CodeAnalysisComponent,
    DatePipe,             
    JsonPipe             
  ],
  template: `
<div class="form-management">
  @if (folderId) {
    <h3>Forms in {{folderName()}}</h3>
    <button mat-raised-button color="primary" (click)="addForm()">Add Form Template</button>
    
    <mat-accordion>
      @for (template of templates(); track template._id) {
        <mat-expansion-panel>
          <mat-expansion-panel-header>
            <mat-panel-title>
              {{template.name}} (Template)
            </mat-panel-title>
          </mat-expansion-panel-header>
          
          <div class="template-actions">
            <button mat-button (click)="viewForm(template, true)">View</button>
            <button mat-button (click)="editForm(template)">Edit</button>
            <button mat-button (click)="deleteForm(template)">Delete</button>
            <button mat-button (click)="createInstance(template)">Create Instance</button>
          </div>
          <div class="instances">
            <h4>Instances</h4>
            @if (getInstancesForTemplate(template._id).length > 0) {
              <mat-list>
                @for (instance of getInstancesForTemplate(template._id); track instance._id) {
                  <mat-list-item>
                    <span matListItemTitle>{{instance.name}}</span>
                    <button mat-icon-button (click)="viewForm(instance, false)">
                      <mat-icon>visibility</mat-icon>
                    </button>
                  </mat-list-item>
                }
              </mat-list>
            } @else {
              <p>No instances for this template.</p>
            }
          </div>
        </mat-expansion-panel>
      }
    </mat-accordion>

    @if (selectedFormSignal()) {
    <h3>{{ selectedFormSignal()?.name || selectedFormSignal()?.structure?.entryName || 'Untitled Form' }}</h3>
    
    <mat-slide-toggle [(ngModel)]="isEditable" (change)="onEditableToggle()">
      {{ isEditable() ? 'Editable' : 'Read-only' }}
    </mat-slide-toggle>

    @if (selectedFormStructure() && selectedFormStructure().fields?.length > 0) {
      <app-form-generator
        [parsedCode]="selectedFormStructure()"
        [initialValues]="selectedFormSignal()?.values"
        [isTemplate]="isEditingTemplate()"
        [readOnly]="!isEditable"
        (templateSaved)="onFormSaved($event)"
        (instanceSubmitted)="onFormSubmitted($event)">
      </app-form-generator>
    } @else {
      <p>No form structure available or no fields defined. Please try reloading the form or add fields to the form structure.</p>
    }

      @if (!isEditingTemplate()) {
        <h4>Submissions</h4>
        @if (submissions().length > 0) {
          <mat-list>
            @for (submission of submissions(); track submission._id) {
              <mat-list-item>
                <span matListItemTitle>Submitted on: {{ submission.submissionDate | date:'medium' }}</span>
                <pre matListItemLine>{{ submission.values | json }}</pre>
              </mat-list-item>
            }
          </mat-list>
        } @else {
          <p>No submissions for this form yet.</p>
        }
      }
    } @else {
      <p>No form selected. Please select a form to view or edit.</p>
    }
    
    <div class="debug-info">
      <h4>Debug Information:</h4>
      <p><strong>Selected Form:</strong> {{ selectedFormSignal() | json }}</p>
      <p><strong>Form Structure:</strong> {{ selectedFormStructure() | json }}</p>
      <p><strong>Is Editing Template:</strong> {{ isEditingTemplate() }}</p>
      <p><strong>Is Editable:</strong> {{ isEditable() }}</p>
    </div>

    <app-code-analysis 
      [workspaceId]="workspaceId"
      [folderId]="folderId"
      (formGenerated)="onFormGenerated($event)">
    </app-code-analysis>
  } @else {
    <p>Please select a folder to manage forms.</p>
  }
</div>
  `
})


export class FormManagementComponent implements OnChanges, OnInit {  
  @Input() workspaceId!: string;
  @Input() folderId!: string;
  @Input() selectedForm: Form | null = null;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() formSelected = new EventEmitter<Form>();

  templates = signal<FormTemplate[]>([]);
  instances = signal<FormInstance[]>([]);
  submissions = signal<FormSubmission[]>([]);
  folderName = signal<string>('');
  private _selectedFormSignal = signal<Form | null>(null);
  
  selectedFormSignal = computed(() => this._selectedFormSignal());
  private _selectedFormStructure = signal<any>(null);

  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private formManagementService = inject(FormManagementService);
  private cdr = inject(ChangeDetectorRef);

  isEditingTemplate = computed(() => this._isEditingTemplate());
  private _isEditable = signal<boolean>(false);
  isEditable = computed(() => this._isEditable());
  

onEditableToggle(): void {
  this._isEditable.update(value => !value);
  console.log('Editable mode:', this._isEditable());
}

  selectedFormStructure = computed(() => this._selectedFormStructure());
  private _isEditingTemplate = signal<boolean>(true);
  ngOnInit() {
    // Ensure consistency between selectedFormSignal and selectedFormStructure
    effect(() => {
      const selectedForm = this._selectedFormSignal();
      if (selectedForm && selectedForm.structure) {
        this._selectedFormStructure.set(selectedForm.structure);
      } else if (!selectedForm) {
        this._selectedFormStructure.set(null);
      }
    });
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['folderId'] && this.folderId) {
      this.loadForms();
    }
    if (changes['selectedForm']) {
      this._selectedFormSignal.set(this.selectedForm);
    }
  }

  loadForms(): void {
    if (!this.workspaceId || !this.folderId) {
      console.error('WorkspaceId or FolderId is missing');
      return;
    }
    this.formManagementService.getFormsInFolder(this.workspaceId, this.folderId).subscribe({
      next: ({templates, instances}) => {
        this.templates.set(templates);
        this.instances.set(instances);
        console.log('Loaded forms:', { templates, instances });
      },
      error: (error) => {
        console.error('Error loading forms:', error);
        this.snackBar.open('Error loading forms. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }

  loadInstancesForTemplate(templateId: string): void {
    this.formManagementService.getFormInstances(this.workspaceId, this.folderId, templateId).subscribe({
      next: (instances) => {
        this.instances.set(instances.filter((instance): instance is FormInstance => 
          !instance.isTemplate && 'submissionDate' in instance
        ));
      },
      error: (error) => {
        console.error('Error loading form instances:', error);
        this.snackBar.open('Error loading form instances. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }
  
  createInstance(template: FormTemplate): void {
    this._selectedFormSignal.set({ ...template, isTemplate: false as const, values: {} });
    this._selectedFormStructure.set(template.structure);
    this._isEditingTemplate.set(false);
  }

  onFormSaved(event: { formData: any, structure: any }): void {
    const selectedForm = this.selectedFormSignal();
    if (selectedForm) {
      if (this.isEditingTemplate()) {
        if (selectedForm._id.startsWith('temp_')) {
          // This is a new template, so we need to create it
          this.createFormTemplate(selectedForm as FormTemplate, event);
        } else {
          // This is an existing template, so we update it
          this.updateFormTemplate(selectedForm as FormTemplate, event);
        }
      } else {
        this.createFormInstance(selectedForm as FormTemplate, event);
      }
    } else {
      this.snackBar.open('No form selected. Please select a form before saving.', 'Close', { duration: 5000 });
    }
  }
  private createFormTemplate(template: FormTemplate, event: { formData: any, structure: any }): void {
    this.formManagementService.createForm(
      this.workspaceId,
      this.folderId,
      {
        name: template.name,
        structure: event.structure,
        isTemplate: true as const
      }
    ).subscribe({
      next: (createdTemplate) => {
        this.snackBar.open('Template created successfully!', 'Close', { duration: 3000 });
        this.loadForms();
        this._selectedFormSignal.set(createdTemplate);
        this._selectedFormStructure.set(createdTemplate.structure);
      },
      error: (error) => {
        console.error('Error creating template:', error);
        this.snackBar.open(`Error creating template: ${error.message}`, 'Close', { duration: 5000 });
      }
    });
  }


  onFormSubmitted(event: { formData: any, structure: any }): void {
    const selectedForm = this.selectedFormSignal();
    if (selectedForm && !this.isEditingTemplate()) {
      this.submitFormInstance(selectedForm as FormTemplate, event.formData);
    } else {
      this.snackBar.open('Cannot submit a template. Please create an instance first.', 'Close', { duration: 5000 });
    }
  }


  private createFormInstance(template: FormTemplate, event: { formData: any, structure: any }): void {
    this.formManagementService.createForm(
      this.workspaceId,
      this.folderId,
      {
        name: `${template.name} - Instance`,
        structure: template.structure,
        isTemplate: false as const,
        parentTemplateId: template._id,
        values: event.formData
      }
    ).subscribe({
      next: (createdInstance) => {
        this.snackBar.open('Form instance created successfully!', 'Close', { duration: 3000 });
        this.loadForms();
        this.loadInstancesForTemplate(template._id);
      },
      error: (error) => {
        console.error('Error creating form instance:', error);
        this.snackBar.open(`Error creating form instance: ${error.message}`, 'Close', { duration: 5000 });
      }
    });
  }




  private submitFormInstance(template: FormTemplate, formData: any): void {
    const submissionData = {
      values: formData,
      structure: template.structure || {}
    };

    this.formManagementService.submitForm(
      this.workspaceId,
      this.folderId,
      template._id,
      submissionData
    ).subscribe({
      next: (response) => {
        this.snackBar.open('Form instance submitted successfully!', 'Close', { duration: 3000 });
        if (response.instance) {
          this.updateInstancesAfterSubmission(response.instance);
        }
        this.loadForms();
      },
      error: (error) => {
        console.error('Error submitting form instance:', error);
        this.snackBar.open(`Error submitting form instance: ${error.message}`, 'Close', { duration: 5000 });
      }
    });
  }

  private updateInstancesAfterSubmission(newInstance: FormInstance): void {
    const currentInstances = this.instances();
    const updatedInstances = [...currentInstances];
    const existingIndex = updatedInstances.findIndex(i => i._id === newInstance._id);
    
    if (existingIndex !== -1) {
      updatedInstances[existingIndex] = newInstance;
    } else {
      updatedInstances.push(newInstance);
    }
    
    this.instances.set(updatedInstances);
    console.log('Updated instances:', updatedInstances);
  }


getInstancesForTemplate(templateId: string): FormInstance[] {
  return this.instances().filter(instance => instance.parentTemplateId === templateId);
}

  private updateFormTemplate(template: FormTemplate, event: { formData: any, structure: any }): void {
    this.formManagementService.updateForm(
      this.workspaceId,
      this.folderId,
      template._id,
      { ...event.formData, structure: event.structure, isTemplate: true }
    ).subscribe({
      next: (updatedForm) => {
        this.snackBar.open('Template updated successfully!', 'Close', { duration: 3000 });
        this.loadForms();
      },
      error: (error) => {
        console.error('Error updating template:', error);
        this.snackBar.open(`Error updating template: ${error.message}`, 'Close', { duration: 5000 });
      }
    });
  }

  private updateFormInstance(instance: FormInstance, event: { formData: any, structure: any }): void {
    this.formManagementService.updateForm(
      this.workspaceId,
      this.folderId,
      instance._id,
      { ...event.formData, structure: event.structure }
    ).subscribe({
      next: (updatedForm) => {
        this.snackBar.open('Instance updated successfully!', 'Close', { duration: 3000 });
        this.loadForms();
      },
      error: (error) => {
        console.error('Error updating instance:', error);
        this.snackBar.open('Error updating instance. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }
  
  addForm(): void {
    if (!this.workspaceId || !this.folderId) {
      this.snackBar.open('Unable to add form: Workspace or folder not selected', 'Close', { duration: 3000 });
      return;
    }

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      data: { form: {}, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const formData = {
          name: result.name,
          structure: result.structure || {},
          isTemplate: true
        };

        this.formManagementService.createForm(this.workspaceId, this.folderId, formData).subscribe({
          next: (createdForm) => {
            this.snackBar.open('Form created successfully', 'Close', { duration: 3000 });
            this.loadForms();
            this._selectedFormSignal.set(createdForm);
          },
          error: (error: Error) => {
            console.error('Error creating form:', error);
            this.snackBar.open('Error creating form. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  editForm(form: Form): void {
    if (!this.folderId) return;

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '400px',
      data: { form: form, isNew: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.folderId) {
        this.formManagementService.updateForm(this.workspaceId, this.folderId, form._id, result).subscribe({
          next: () => {
            this.snackBar.open('Form updated successfully', 'Close', { duration: 3000 });
            this.loadForms();
          },
          error: (error: Error) => {
            console.error('Error updating form:', error);
            this.snackBar.open('Error updating form. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  deleteForm(form: Form): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { 
        title: 'Confirm Deletion', 
        message: `Are you sure you want to delete the form "${form.name}"? This action cannot be undone.` 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.formManagementService.deleteForm(this.workspaceId, this.folderId, form._id).subscribe({
          next: () => {
            this.snackBar.open('Form deleted successfully!', 'Close', { duration: 3000 });
            this.loadForms();
            if (this.selectedFormSignal() === form) {
              this._selectedFormSignal.set(null);
            }
          },
          error: (error) => {
            console.error('Error deleting form:', error);
            this.snackBar.open(`Error deleting form: ${error.message}`, 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  private loadSubmissions(formId: string): void {
    this.formManagementService.getFormSubmissions(this.workspaceId, this.folderId, formId).subscribe({
      next: (submissions) => {
        this.submissions.set(submissions);
      },
      error: (error) => {
        console.error('Error loading submissions:', error);
        this.snackBar.open('Error loading submissions. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }


  viewForm(form: Form, isTemplate: boolean): void {
    console.log('Viewing form:', JSON.stringify(form, null, 2));
    this._selectedFormSignal.set(form);
    this._isEditingTemplate.set(isTemplate);
    this.formSelected.emit(form);
    
    if (form.structure) {
      console.log('Setting form structure:', JSON.stringify(form.structure, null, 2));
      this._selectedFormStructure.set(form.structure);
    } else {
      console.warn('No structure found in the form, setting to empty object');
      this._selectedFormStructure.set({});
    }
    
    if (!isTemplate && 'submissionDate' in form) {
      this.loadSubmissions(form._id);
    }
  }


  onTemplateSaved(event: { formData: any, structure: any }): void {
    const selectedForm = this.selectedFormSignal();
    if (selectedForm && selectedForm.isTemplate) {
      this.formManagementService.updateForm(
        this.workspaceId,
        this.folderId,
        selectedForm._id,
        { ...event.formData, structure: event.structure }
      ).subscribe({
        next: (updatedForm) => {
          this.snackBar.open('Template saved successfully!', 'Close', { duration: 3000 });
          this.loadForms();
          this._selectedFormSignal.set(updatedForm);
        },
        error: (error) => {
          console.error('Error saving template:', error);
          this.snackBar.open('Error saving template. Please try again.', 'Close', { duration: 5000 });
        }
      });
    }
  }
  


  onInstanceSubmitted(event: { formData: any, structure: any }): void {
    const selectedForm = this.selectedFormSignal();
    if (selectedForm && selectedForm.isTemplate) {
      this.formManagementService.submitForm(
        this.workspaceId,
        this.folderId,
        selectedForm._id,
        { ...event.formData, parentTemplateId: selectedForm._id }
      ).subscribe({
        next: (submittedInstance) => {
          this.snackBar.open('Form instance submitted successfully!', 'Close', { duration: 3000 });
          this.loadForms();
          this.loadSubmissions(selectedForm._id);
        },
        error: (error) => {
          console.error('Error submitting form instance:', error);
          this.snackBar.open('Error submitting form instance. Please try again.', 'Close', { duration: 5000 });
        }
      });
    }
  }

  


  onFormGenerated(generatedForm: any): void {
    console.log('FormManagementComponent: onFormGenerated called', generatedForm);
    if (!generatedForm.name || !generatedForm.structure) {
      console.error('Invalid form data:', generatedForm);
      this.snackBar.open('Error: Form name and structure are required', 'Close', { duration: 5000 });
      return;
    }

    const newForm: FormTemplate = {
      _id: generatedForm._id || 'temp_' + Date.now(),
      name: generatedForm.name,
      structure: generatedForm.structure,
      isTemplate: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this._selectedFormSignal.set(newForm);
    this._selectedFormStructure.set(newForm.structure);
    // this.isEditingTemplate.set(true);
    console.log('FormManagementComponent: Selected form set', this._selectedFormSignal());
    console.log('FormManagementComponent: Form structure set', this._selectedFormStructure());
    this.cdr.detectChanges();
  }



}
```

# frontend/src/app/components/workspace/form-editor/form-editor.component.ts

```ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule],
  template: `
    <textarea [(ngModel)]="code" rows="10" cols="50"></textarea>
    <button mat-raised-button color="primary" (click)="onSave()">Save Changes</button>
  `,
  styles: [`
    textarea {
      width: 100%;
      margin-bottom: 10px;
    }
  `]
})
export class FormEditorComponent {
  @Input() code: string = '';
  @Output() codeChanged = new EventEmitter<string>();

  onSave() {
    this.codeChanged.emit(this.code);
  }
}
```

# frontend/src/app/components/workspace/form-dialog/form-dialog.component.ts

```ts
// src/app/components/workspace/form-dialog/form-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { Form } from '../../../interfaces/workspace.interface';

@Component({
  selector: 'app-form-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogActions,
    MatDialogContent
  ],
  template: `
    <h2 mat-dialog-title>{{ data.isNew ? 'Create' : 'Edit' }} Form</h2>
    <mat-dialog-content>
      <form [formGroup]="formGroup">
        <mat-form-field>
          <mat-label>Form Name</mat-label>
          <input matInput formControlName="name" required>
          <!-- <mat-error *ngIf="formGroup.get('name')?.hasError('required') && formGroup.get('name')?.touched">
            Form name is required
          </mat-error> -->
        </mat-form-field>
        <!-- Add more fields for form structure as needed -->
      </form>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button color="primary" [disabled]="formGroup.invalid" (click)="onSave()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
    }
  `]
})
export class FormDialogComponent {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: Partial<Form>, isNew: boolean }
  ) {
    this.formGroup = this.fb.group({
      name: [data.form.name || '', [Validators.required]],
            // Add more form controls for the form structure as needed
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close({
        ...this.data.form,
        ...this.formGroup.value
      });
    }
  }
}

```

# frontend/src/app/components/workspace/folder-management/folder-management.component.ts

```ts
import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTreeModule, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FolderDialogComponent } from '../../../dialogs/workspaces/folder-dialog.component';
import { ConfirmDialogComponent } from '../../../dialogs/workspaces/confirm-dialog.component';
import { FolderManagementService } from '../../../services/folder-management.service';
import { Folder } from '../../../interfaces/workspace.interface';

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
  _id: string;
}

@Component({
  selector: 'app-folder-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <h3>Folders</h3>
    <button mat-raised-button color="primary" (click)="addFolder()">Add Folder</button>
    @if (dataSource.data.length) {
        <mat-tree [dataSource]="dataSource" [treeControl]="treeControl">
              <mat-tree-node *matTreeNodeDef="let node" matTreeNodePadding>
        <button mat-icon-button disabled></button>
        {{node.name}}
        <button mat-icon-button (click)="selectFolder(node)"><mat-icon>folder_open</mat-icon></button>
        <button mat-icon-button (click)="editFolder(node)"><mat-icon>edit</mat-icon></button>
        <button mat-icon-button (click)="deleteFolder(node)"><mat-icon>delete</mat-icon></button>
      </mat-tree-node>

      <mat-tree-node *matTreeNodeDef="let node; when: hasChild" matTreeNodePadding>
        <button mat-icon-button matTreeNodeToggle
                [attr.aria-label]="'Toggle ' + node.name">
          <mat-icon class="mat-icon-rtl-mirror">
            {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
          </mat-icon>
        </button>
        {{node.name}}
        <button mat-icon-button (click)="selectFolder(node)"><mat-icon>folder_open</mat-icon></button>
        <button mat-icon-button (click)="editFolder(node)"><mat-icon>edit</mat-icon></button>
        <button mat-icon-button (click)="deleteFolder(node)"><mat-icon>delete</mat-icon></button>
        <button mat-icon-button (click)="addSubfolder(node)"><mat-icon>add</mat-icon></button>
      </mat-tree-node>
    </mat-tree>    } @else {
      <p>No folders found. Click 'Add Folder' to create one.</p>
    }
  `
})
export class FolderManagementComponent {
  @Input() workspaceId!: string;
  @Output() folderSelected = new EventEmitter<string>();

  private _transformer = (node: Folder, level: number): FlatNode => {
    return {
      expandable: !!node.subfolders && node.subfolders.length > 0,
      name: node.name,
      level: level,
      _id: node._id,
    };
  };

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.subfolders
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private folderManagementService = inject(FolderManagementService);

  ngOnInit() {
    this.loadFolders();
  }
  loadFolders() {
    this.folderManagementService.getFolders(this.workspaceId).subscribe({
      next: (folders) => {
        this.dataSource.data = folders;
        if (folders.length === 0) {
          this.snackBar.open('No folders found. You can create a new folder.', 'Close', { duration: 5000 });
        }
      },
      error: (error) => {
        console.error('Error loading folders:', error);
        this.snackBar.open('Error loading folders. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  addFolder(parentNode?: FlatNode): void {
    const dialogRef = this.dialog.open(FolderDialogComponent, {
      width: '250px',
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.folderManagementService.addFolder(this.workspaceId, result, parentNode?._id).subscribe({
          next: () => {
            this.snackBar.open('Folder created successfully', 'Close', { duration: 3000 });
            this.loadFolders();
          },
          error: (error) => {
            console.error('Error creating folder:', error);
            this.snackBar.open('Error creating folder. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  editFolder(node: FlatNode): void {
    const dialogRef = this.dialog.open(FolderDialogComponent, {
      width: '250px',
      data: { name: node.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.folderManagementService.editFolder(this.workspaceId, node._id, result).subscribe({
          next: () => {
            this.snackBar.open('Folder updated successfully', 'Close', { duration: 3000 });
            this.loadFolders();
          },
          error: (error) => {
            console.error('Error updating folder:', error);
            this.snackBar.open('Error updating folder. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  deleteFolder(node: FlatNode): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: 'Delete Folder', message: `Are you sure you want to delete "${node.name}"?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.folderManagementService.deleteFolder(this.workspaceId, node._id).subscribe({
          next: () => {
            this.snackBar.open('Folder deleted successfully', 'Close', { duration: 3000 });
            this.loadFolders();
          },
          error: (error) => {
            console.error('Error deleting folder:', error);
            this.snackBar.open('Error deleting folder. Please try again.', 'Close', { duration: 5000 });
          }
        });
      }
    });
  }

  addSubfolder(node: FlatNode): void {
    this.addFolder(node);
  }

  selectFolder(node: FlatNode): void {
    this.folderSelected.emit(node._id);
  }
}
```

# frontend/src/app/components/workspace/connection-status/connection-status.component.ts

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WebSocketService } from '../../../services/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-connection-status',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="connection-status">
      <mat-icon [ngClass]="status">
        {{ getStatusIcon() }}
      </mat-icon>
      <span>{{ getStatusText() }}</span>
      <span *ngIf="reconnectionAttempts > 0">(Attempt {{ reconnectionAttempts }})</span>
    </div>
  `,
  styles: [`
    .connection-status {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-right: 16px;
    }
    mat-icon {
      margin-right: 8px;
    }
    .connected { color: #4caf50; }
    .disconnected { color: #f44336; }
    .connecting { color: #ff9800; }
  `]
})
export class ConnectionStatusComponent implements OnInit, OnDestroy {
  status: 'connected' | 'disconnected' | 'connecting' = 'disconnected';
  reconnectionAttempts: number = 0;
  private statusSubscription: Subscription | null = null;
  private attemptsSubscription: Subscription | null = null;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit() {
    this.statusSubscription = this.webSocketService.getConnectionStatus()
      .subscribe(status => this.status = status);
    
    this.attemptsSubscription = this.webSocketService.getReconnectionAttempts()
      .subscribe(attempts => this.reconnectionAttempts = attempts);
  }

  ngOnDestroy() {
    if (this.statusSubscription) this.statusSubscription.unsubscribe();
    if (this.attemptsSubscription) this.attemptsSubscription.unsubscribe();
  }

  getStatusIcon(): string {
    switch (this.status) {
      case 'connected': return 'check_circle';
      case 'disconnected': return 'error';
      case 'connecting': return 'sync';
    }
  }

  getStatusText(): string {
    switch (this.status) {
      case 'connected': return 'Connected';
      case 'disconnected': return 'Disconnected';
      case 'connecting': return 'Connecting';
    }
  }
}
```

# frontend/src/app/components/workspace/activity-log-detail/activity-log-detail.component.ts

```ts
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ActivityLog } from '../../../interfaces/activity-log.interface';

@Component({
  selector: 'app-activity-log-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Activity Log Detail</h2>
    <mat-dialog-content>
      <p><strong>Action:</strong> {{ data.log.action }}</p>
      <p><strong>Details:</strong> {{ data.log.details }}</p>
      <p><strong>User:</strong> {{ data.log.user.name }} ({{ data.log.user.email }})</p>
      <p><strong>Date:</strong> {{ data.log.createdAt | date:'medium' }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onClose()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 300px;
    }
  `]
})
export class ActivityLogDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<ActivityLogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { log: ActivityLog }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
```

# frontend/src/app/components/workspace/activity-log/activity-log.component.ts

```ts
import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { WorkspaceService } from '../../../services/workspace.service';
import { ActivityLog, ActivityLogsResponse } from '../../../interfaces/activity-log.interface';
import { Subscription, BehaviorSubject } from 'rxjs';
import { ActivityLogDetailComponent } from '../activity-log-detail/activity-log-detail.component';
import { throttleTime, tap } from 'rxjs/operators';
import {MatPaginatorModule , PageEvent} from '@angular/material/paginator';




@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [
    CommonModule, 
    MatListModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatPaginatorModule,
    MatDialogModule,
    ScrollingModule
  ],

  template: `
    <h3>Activity Log</h3>
    
    <!-- Filter controls -->
    <div class="filters">
      <mat-form-field>
        <mat-label>Action Type</mat-label>
        <mat-select [(ngModel)]="actionTypeFilter" (selectionChange)="applyFilters()">
          <mat-option value="">All</mat-option>
          <mat-option value="create">Create</mat-option>
          <mat-option value="update">Update</mat-option>
          <mat-option value="delete">Delete</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Date Range</mat-label>
        <mat-date-range-input [rangePicker]="picker">
          <input matStartDate placeholder="Start date" [(ngModel)]="startDate" (dateChange)="applyFilters()">
          <input matEndDate placeholder="End date" [(ngModel)]="endDate" (dateChange)="applyFilters()">
        </mat-date-range-input>
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-date-range-picker #picker></mat-date-range-picker>
      </mat-form-field>
    </div>

    <button mat-raised-button color="primary" (click)="exportLogs()">Export Logs</button>
    
    <cdk-virtual-scroll-viewport itemSize="50" class="virtual-scroll-viewport">
      <mat-list>
        @for (log of activityLogs; track log._id) {
          <mat-list-item (click)="openLogDetail(log)">
            <span matListItemTitle>{{ log.action }}</span>
            <span matListItemLine>{{ log.details }}</span>
            <span matListItemLine>By {{ log.user.name }} on {{ log.createdAt | date:'medium' }}</span>
          </mat-list-item>
        }
      </mat-list>
    </cdk-virtual-scroll-viewport>

    <mat-list>
      @for (log of activityLogs; track log._id) {
        <mat-list-item (click)="openLogDetail(log)">
          <span matListItemTitle>{{ log.action }}</span>
          <span matListItemLine>{{ log.details }}</span>
          <span matListItemLine>By {{ log.user.name }} on {{ log.createdAt | date:'medium' }}</span>
        </mat-list-item>
      } @empty {
        <mat-list-item>No activity logs found.</mat-list-item>
      }
    </mat-list>

    <mat-paginator
      [length]="totalLogs"
      [pageSize]="pageSize"
      [pageSizeOptions]="[5, 10, 25]"
      (page)="onPageChange($event)"
      aria-label="Select page of activity logs">
    </mat-paginator>
  `,
  styles: [`
    :host {
      display: block;
      margin-top: 20px;
    }
    .filters {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }
    button {
      margin-bottom: 16px;
    }
  `]
})
export class ActivityLogComponent implements OnInit, OnDestroy {
  @Input() workspaceId!: string;
  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;
  activityLogs: ActivityLog[] = [];
  private activityLogsSubject = new BehaviorSubject<ActivityLog[]>([]);
  private subscription: Subscription | null = null;

  totalLogs: number = 0;
  pageSize: number = 10;
  private currentPage = 1;
  private loading = false;

  // New filter properties
  actionTypeFilter: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(
    private workspaceService: WorkspaceService ,     
    private dialog: MatDialog)
   {}

  ngOnInit() {
    this.loadActivityLogs();
    this.subscribeToRealtimeUpdates();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  private loadInitialLogs() {
    this.loadLogs();
  }


  private setupVirtualScrolling() {
    this.subscription = this.viewport.scrolledIndexChange.pipe(
      throttleTime(200),
      tap((index) => {
        const end = this.viewport.getRenderedRange().end;
        const total = this.viewport.getDataLength();
        if (end === total && !this.loading) {
          this.loadMoreLogs();
        }
      })
    ).subscribe();
  }

  private loadLogs() {
    this.loading = true;
    this.workspaceService.getActivityLogs(
      this.workspaceId,
      this.currentPage,
      this.pageSize,
      this.actionTypeFilter,
      this.startDate,
      this.endDate
    ).subscribe({
      next: (response) => {
        this.activityLogs = [...this.activityLogs, ...response.activityLogs];
        this.activityLogsSubject.next(this.activityLogs);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading activity logs:', error);
        this.loading = false;
      }
    });
  }

  private loadMoreLogs() {
    this.currentPage++;
    this.loadLogs();
  }



  loadActivityLogs() {
    this.workspaceService.getActivityLogs(
      this.workspaceId, 
      this.currentPage, 
      this.pageSize,
      this.actionTypeFilter,
      this.startDate,
      this.endDate
    ).subscribe({
      next: (response: ActivityLogsResponse) => {
        this.activityLogs = response.activityLogs;
        this.totalLogs = response.totalLogs;
      },
      error: (error) => console.error('Error loading activity logs:', error)
    });
  }

  private subscribeToRealtimeUpdates() {
    this.subscription = this.workspaceService.getRealtimeActivityLogs(this.workspaceId)
      .subscribe({
        next: (logs) => {
          this.activityLogs = logs;
          this.totalLogs = this.totalLogs + 1; // Increment total logs count
        },
        error: (error) => console.error('Error in real-time activity logs:', error)
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadActivityLogs();
  }


  applyFilters() {
    this.currentPage = 1;
    this.activityLogs = [];
    this.loadLogs();
  }

  openLogDetail(log: ActivityLog) {
    this.dialog.open(ActivityLogDetailComponent, {
      width: '400px',
      data: { log }
    });
  }


  exportLogs() {
    this.workspaceService.exportActivityLogs(
      this.workspaceId,
      this.actionTypeFilter,
      this.startDate,
      this.endDate
    ).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `activity_logs_${this.workspaceId}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

}
```

# frontend/src/app/components/auth/two-factor-auth/two-factor-auth.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

interface TwoFAStatus {
  enabled: boolean;
}

@Component({
  selector: 'app-two-factor-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="two-factor-auth-container">
      <h2>Two-Factor Authentication</h2>
      @if (twoFAEnabled) {
        <p>Two-factor authentication is currently enabled.</p>
        <button mat-raised-button color="warn" (click)="disable2FA()">Disable 2FA</button>
      } @else {
        @if (secret && qrCodeDataUrl) {
          <img [src]="qrCodeDataUrl" alt="QR Code for 2FA">
          <p>Secret key: {{ secret }}</p>
          <p>Scan the QR code or enter the secret key in your authenticator app.</p>
          <form [formGroup]="verificationForm" (ngSubmit)="verify2FA()">
            <mat-form-field>
              <mat-label>Verification Code</mat-label>
              <input matInput formControlName="token" required>
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="verificationForm.invalid">Verify</button>
          </form>
        } @else {
          <button mat-raised-button color="primary" (click)="enable2FA()">Enable 2FA</button>
        }
      }
    </div>
  `,
  styles: [`
    .two-factor-auth-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    mat-form-field {
      width: 100%;
      max-width: 300px;
    }
    img {
      max-width: 200px;
      margin-bottom: 20px;
    }
  `]
})
export class TwoFactorAuthComponent implements OnInit {
  twoFAEnabled = false;
  secret: string | null = null;
  qrCodeDataUrl: string | null = null;
  verificationForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.verificationForm = this.formBuilder.group({
      token: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  ngOnInit() {
    this.checkTwoFAStatus();
  }

  checkTwoFAStatus() {
    this.authService.getTwoFAStatus().subscribe({
      next: (status: TwoFAStatus) => {
        this.twoFAEnabled = status.enabled;
      },
      error: (error: any) => {
        console.error('Error checking 2FA status:', error);
        this.snackBar.open('Failed to check 2FA status.', 'Close', { duration: 5000 });
      }
    });
  }

  enable2FA() {
    this.authService.enable2FA().subscribe({
      next: (response: { secret: string; qrCodeDataUrl: string }) => {
        this.secret = response.secret;
        this.qrCodeDataUrl = response.qrCodeDataUrl;
      },
      error: (error: any) => {
        console.error('Error enabling 2FA:', error);
        this.snackBar.open('Failed to enable 2FA. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }

  verify2FA() {
    if (this.verificationForm.valid) {
      const token = this.verificationForm.value.token;
      this.authService.verify2FA(token).subscribe({
        next: (response: { verified: boolean; message: string }) => {
          if (response.verified) {
            this.twoFAEnabled = true;
            this.snackBar.open(response.message, 'Close', { duration: 5000 });
          } else {
            this.snackBar.open(response.message, 'Close', { duration: 5000 });
          }
        },
        error: (error: any) => {
          console.error('Error verifying 2FA:', error);
          this.snackBar.open('Failed to verify 2FA. Please try again.', 'Close', { duration: 5000 });
        }
      });
    }
  }

  disable2FA() {
    this.authService.disable2FA().subscribe({
      next: (response: { disabled: boolean; message: string }) => {
        if (response.disabled) {
          this.twoFAEnabled = false;
          this.secret = null;
          this.qrCodeDataUrl = null;
          this.snackBar.open(response.message, 'Close', { duration: 5000 });
        } else {
          this.snackBar.open('Failed to disable 2FA. Please try again.', 'Close', { duration: 5000 });
        }
      },
      error: (error: any) => {
        console.error('Error disabling 2FA:', error);
        this.snackBar.open('Failed to disable 2FA. Please try again.', 'Close', { duration: 5000 });
      }
    });
  }
}
```

# frontend/src/app/components/auth/register/register.component.ts

```ts
// src/app/components/auth/register/register.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule ,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput type="password" formControlName="password" placeholder="Password" required>
        <mat-error *ngIf="registerForm.get('password')?.hasError('required')">Password is required</mat-error>
        <mat-error *ngIf="registerForm.get('password')?.hasError('weakPassword')">Password does not meet strength requirements</mat-error>
      </mat-form-field>
      <div class="password-requirements">
        Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.
      </div>
      <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">Register</button>
    </form>

  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    mat-form-field {
      width: 100%;
      max-width: 300px;
      margin-bottom: 20px;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]]
    });
  }

  passwordStrengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    
    if (hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas) {
      return null;
    } else {
      return { 'weakPassword': true };
    }
  }


  onSubmit(): void {
    if (this.registerForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          this.snackBar.open(response.message || 'Registration successful. Please check your email to verify your account.', 'Close', { duration: 5000 });
          this.router.navigate(['/verify-email'], { queryParams: { email: this.registerForm.value.email } });
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.snackBar.open(error.error.message || 'Registration failed. Please try again.', 'Close', { duration: 5000 });
          this.isLoading = false;
        }
      });
    }
  }
  
  
}
```

# frontend/src/app/components/auth/password-reset-request/password-reset-request.component.ts

```ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-password-reset-request',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <form [formGroup]="resetForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="resetForm.invalid || isLoading">
        {{ isLoading ? 'Sending...' : 'Reset Password' }}
      </button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    mat-form-field {
      width: 100%;
      max-width: 300px;
    }
  `]
})
export class PasswordResetRequestComponent {
  resetForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.authService.requestPasswordReset(this.resetForm.value.email).subscribe({
        next: () => {
          this.snackBar.open('Password reset email sent. Please check your inbox.', 'Close', { duration: 5000 });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Password reset request failed:', error);
          this.snackBar.open(error.error.message || 'Failed to send reset email. Please try again.', 'Close', { duration: 5000 });
          this.isLoading = false;
        }
      });
    }
  }
}
```

# frontend/src/app/components/auth/password-reset/password-reset.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <form [formGroup]="resetForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>New Password</mat-label>
        <input matInput type="password" formControlName="password" required>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Confirm Password</mat-label>
        <input matInput type="password" formControlName="confirmPassword" required>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="resetForm.invalid || isLoading">
        {{ isLoading ? 'Resetting...' : 'Set New Password' }}
      </button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    mat-form-field {
      width: 100%;
      max-width: 300px;
    }
  `]
})
export class PasswordResetComponent implements OnInit {
  resetForm: FormGroup;
  isLoading = false;
  token: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token');
    if (!this.token) {
      this.snackBar.open('Invalid password reset link', 'Close', { duration: 5000 });
      this.router.navigate(['/login']);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value ? null : { mismatch: true };
  }
  onSubmit(): void {
    if (this.resetForm.valid && !this.isLoading && this.token) {
      this.isLoading = true;
      this.authService.resetPassword(this.token, this.resetForm.value.password).subscribe({
        next: () => {
          this.snackBar.open('Password reset successful. You can now log in with your new password.', 'Close', { duration: 5000 });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Password reset failed:', error);
          this.snackBar.open(error.error.message || 'Failed to reset password. Please try again.', 'Close', { duration: 5000 });
          this.isLoading = false;
        }
      });
    }
  }
}
```

# frontend/src/app/components/auth/login/login.component.ts

```ts
//frontend/src/app/login.component.ts
import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatCheckboxModule, 
    MatIconModule,
    MatSnackBarModule
  ],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required>
        <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
        <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Please enter a valid email</mat-error>
      </mat-form-field>
      <mat-form-field>
        <mat-label>Password</mat-label>
        <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" required>
        <button mat-icon-button matSuffix (click)="togglePasswordVisibility()" type="button">
          <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
        </button>
        <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
      </mat-form-field>
      @if (requires2FA) {
        <mat-form-field>
          <mat-label>2FA Code</mat-label>
          <input matInput formControlName="twoFactorCode" required>
          <mat-error *ngIf="loginForm.get('twoFactorCode')?.hasError('required')">2FA Code is required</mat-error>
        </mat-form-field>
      }
      <mat-checkbox formControlName="rememberMe">Remember me</mat-checkbox>
      <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid || isLoading">
        {{ isLoading ? 'Logging in...' : 'Login' }}
      </button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    mat-form-field {
      width: 100%;
      max-width: 300px;
      margin-bottom: 20px;
    }
    mat-checkbox {
      margin-bottom: 20px;
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;
  requires2FA = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false],
      twoFactorCode: ['']
    });
  }
  ngOnInit(): void {
    // Check if the user just verified their email
    this.route.queryParams.subscribe(params => {
      if (params['verified'] === 'true') {
        this.snackBar.open('Email verified successfully. You can now log in.', 'Close', { duration: 5000 });
      }
    });
  }
  


  onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      const { email, password, rememberMe, twoFactorCode } = this.loginForm.value;
      if (this.requires2FA) {
        this.authService.login2FA(email, password, twoFactorCode).subscribe({
          next: (user) => this.handleSuccessfulLogin(user),
          error: (error) => this.handleLoginError(error)
        });
      } else {
        this.authService.login(email, password, rememberMe).subscribe({
          next: (user) => {
            console.log('Login response user:', user); // Add this line to log the user object
            if (!user.isEmailVerified) {
              this.handleUnverifiedEmail(user.email);
            } else if (user.requires2FA) {
              this.requires2FA = true;
              this.snackBar.open('Please enter your 2FA code to complete login.', 'Close', { duration: 5000 });
            } else {
              this.handleSuccessfulLogin(user);
            }
          },
          error: (error) => this.handleLoginError(error)
        });
      }
    }
  }


  private handleUnverifiedEmail(email: string): void {
    this.snackBar.open('Email not verified. Please verify your email to login.', 'Resend', { duration: 10000 })
      .onAction().subscribe(() => {
        this.resendVerificationEmail(email);
      });
    this.isLoading = false;
  }

  private handleSuccessfulLogin(user: any): void {
    console.log('Handling successful login for user:', user);
    if (user.isEmailVerified === false) {
      this.handleUnverifiedEmail(user.email);
    } else {
      this.snackBar.open('Login successful', 'Close', { duration: 3000 });
      if (user.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
    }
    this.isLoading = false;
  }

  
  private handleLoginError(error: any): void {
    console.error('Login failed:', error);
    if (error.error?.message === 'Email not verified') {
      this.snackBar.open('Email not verified. Please verify your email to login.', 'Verify', { duration: 10000 })
        .onAction().subscribe(() => {
          const email = this.loginForm.get('email')?.value;
          this.router.navigateByUrl(`/request-verification-email?email=${encodeURIComponent(email)}`);
        });
    } else {
      this.snackBar.open(error.error?.message || 'Login failed. Please check your credentials.', 'Close', { duration: 5000 });
    }
    this.isLoading = false;
  }


  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
  resendVerificationEmail(email: string): void {
    this.isLoading = true;
    this.authService.resendVerificationEmail(email).subscribe({
      next: () => {
        this.snackBar.open('Verification email resent. Please check your inbox.', 'Close', { duration: 5000 });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error resending verification email:', error);
        this.snackBar.open('Failed to resend verification email. Please try again.', 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

}


```

# frontend/src/app/components/auth/email/request-verification-email/request-verification-email.component.ts

```ts
// component/auth/email/request-verification-email.component.ts
import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-verification-email',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  template: `
    <form [formGroup]="requestForm" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput formControlName="email" required>
        <mat-error *ngIf="requestForm.get('email')?.hasError('required')">Email is required</mat-error>
        <mat-error *ngIf="requestForm.get('email')?.hasError('email')">Please enter a valid email</mat-error>
      </mat-form-field>
      <button mat-raised-button color="primary" type="submit" [disabled]="requestForm.invalid || isLoading">
        {{ isLoading ? 'Sending...' : 'Request Verification Email' }}
      </button>
    </form>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    mat-form-field {
      width: 100%;
      max-width: 300px;
      margin-bottom: 20px;
    }
  `]
})
export class RequestVerificationEmailComponent implements OnInit {
  requestForm: FormGroup;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.requestForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.requestForm.patchValue({ email: params['email'] });
      }
    });
  }


  onSubmit(): void {
    if (this.requestForm.valid && !this.isLoading) {
      this.isLoading = true;
      const email = this.requestForm.get('email')?.value;
      this.authService.resendVerificationEmail(email).subscribe({
        next: () => {
          this.snackBar.open('Verification email sent. Please check your inbox.', 'Close', { duration: 5000 });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error sending verification email:', error);
          this.snackBar.open('Failed to send verification email. Please try again later.', 'Close', { duration: 5000 });
          this.isLoading = false;
        }
      });
    }
  }
}
```

# frontend/src/app/components/auth/email/email-verification/email-verification.component.ts

```ts
// src/app/components/auth/email/email-verification/email-verification.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="email-verification-container">
      <h2>Email Verification</h2>
      @if (isLoading) {
        <mat-spinner></mat-spinner>
      } @else if (isVerified) {
        <p>Your email has been successfully verified. You can now log in.</p>
      } @else {
        <p>{{ errorMessage }}</p>
        @if (isExpired) {
          <button mat-raised-button color="primary" (click)="resendVerificationEmail()">Resend Verification Email</button>
        }
      }
    </div>
  `,
  styles: [`
    .email-verification-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
  `]
})
export class EmailVerificationComponent implements OnInit {
  isLoading = true;
  isVerified = false;
  isExpired = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.verifyEmail(token);
    } else {
      this.isLoading = false;
      this.errorMessage = 'Invalid verification link';
    }
  }

  private verifyEmail(token: string) {
    this.authService.verifyEmail(token).subscribe({
      next: () => {
        this.isVerified = true;
        this.snackBar.open('Email verified successfully', 'Close', { duration: 5000 });
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (error) => {
        console.error('Email verification failed:', error);
        if (error.error?.isExpired) {
          this.isExpired = true;
          this.errorMessage = 'Your verification link has expired. Please request a new one.';
        } else {
          this.errorMessage = 'Email verification failed. Please try again or contact support.';
        }
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }


  resendVerificationEmail() {
    const email = this.route.snapshot.queryParamMap.get('email');
    if (email) {
      this.isLoading = true;
      this.authService.resendVerificationEmail(email).subscribe({
        next: () => {
          this.snackBar.open('Verification email resent. Please check your inbox.', 'Close', { duration: 5000 });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error resending verification email:', error);
          this.snackBar.open('Failed to resend verification email. Please try again.', 'Close', { duration: 5000 });
          this.isLoading = false;
        }
      });
    } else {
      this.snackBar.open('Email address not found. Please try requesting a new verification email.', 'Close', { duration: 5000 });
    }
  }
}
```

