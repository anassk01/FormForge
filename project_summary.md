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

#workspace not nedded files
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

#workspace file to be added in the chat 
frontend/src/app/components/workspace/*
frontend/src/app/services/workspace.service.ts
frontend/src/app/services/web-socket.service.ts

backend/src/services/socket.service.ts
backend/src/routes/workspace.routes.ts
backend/src/controllers/workspace.controller.ts
backend/src/models/workspace.model.ts

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

# backend/logs/auth.log

```log
{"level":"info","message":{"error":"connect ECONNREFUSED 127.0.0.1:587","event":"registration_error","userId":"unknown"},"timestamp":"2024-08-29T20:41:20.884Z"}
{"level":"info","message":{"event":"user_registered","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-08-29T21:00:18.180Z"}
{"level":"info","message":{"event":"failed_login_attempt","reason":"invalid_credentials","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-08-30T19:54:09.077Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-08-31T18:07:31.926Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-08-31T18:23:44.886Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-08-31T18:56:24.031Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-08-31T21:24:24.737Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-08-31T22:45:18.112Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:16:40.315Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:16:52.145Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:16:52.150Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:16:55.049Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:16:56.707Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:16:56.729Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:16:57.436Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:17:01.796Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:17:01.799Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:22:46.093Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:23:48.100Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:24:39.320Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:32:23.212Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:33:18.344Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:37:22.652Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:37:49.220Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:40:22.343Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:41:05.912Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:41:05.918Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:41:24.402Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:41:26.454Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:41:26.462Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:41:28.908Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:41:28.919Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:41:31.541Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:41:33.203Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:41:33.206Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:43:26.131Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:57:55.010Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T02:58:07.483Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T03:00:54.939Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T03:02:26.290Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T03:02:55.135Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T03:02:55.143Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T03:02:57.558Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T03:02:58.762Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T03:02:58.765Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T03:03:01.227Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T03:07:02.995Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:05:54.848Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:05:54.913Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:05:59.429Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:06:02.541Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:06:38.453Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:06:38.457Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:06:56.982Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:06:56.987Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:06:58.629Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:06:59.371Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:07:02.666Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:07:05.390Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:07:06.135Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:07:06.138Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:07:08.352Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:07:08.355Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:07:59.388Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:08:49.528Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:08:49.535Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:08:50.887Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:08:51.474Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:08:51.478Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:08:52.756Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:08:53.355Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:08:53.358Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:08:55.397Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:08:57.910Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:08:57.914Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:08:59.414Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:09:03.142Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:09:03.145Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:09:03.597Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:09:05.057Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:09:05.060Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:09:05.656Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:09:07.188Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:09:07.191Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:09:08.403Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:09:10.248Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:09:10.251Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:09:59.375Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:10:59.890Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:12:00.016Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:12:59.882Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:13:59.903Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:14:59.929Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:15:59.915Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:16:59.959Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:17:44.092Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:17:59.300Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:18:00.415Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:18:00.429Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:18:44.812Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:19:44.876Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:20:25.171Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:20:25.179Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:20:26.131Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:21:26.161Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:22:26.280Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:23:26.112Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:24:26.142Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:24:59.966Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:24:59.968Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:25:00.903Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:25:52.564Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:25:52.567Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:25:53.509Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:26:53.532Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:27:14.422Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:27:14.425Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:27:15.167Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:27:53.545Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:28:28.188Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:28:28.191Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:28:29.998Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:28:31.734Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:28:31.738Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:28:32.855Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:28:53.540Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:29:53.627Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:30:53.559Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:31:53.521Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:32:06.550Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:32:07.662Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:33:07.833Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:34:07.656Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:35:07.684Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:36:07.693Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:37:07.645Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:38:07.783Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:39:07.686Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:40:07.662Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:41:07.651Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:42:07.682Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:43:07.792Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:44:07.776Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:45:07.676Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T11:46:07.658Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:13:48.470Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:14:07.679Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:15:07.672Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:15:14.406Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:15:14.964Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:15:18.644Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:15:18.655Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:15:20.103Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:15:21.540Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:15:21.545Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:16:15.036Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:17:14.911Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:18:01.934Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:18:01.946Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:18:14.939Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:18:17.788Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:18:17.797Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:18:31.026Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:18:31.036Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:19:14.937Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:19:34.757Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:19:36.297Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:19:36.307Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:20:14.952Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:21:14.920Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:21:58.605Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:21:58.609Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:22:06.258Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:22:14.896Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:23:14.902Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:24:14.934Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:25:14.911Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:26:14.936Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:27:14.929Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:28:14.925Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:29:14.940Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:30:14.950Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:31:14.931Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:32:14.920Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:33:14.992Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:34:16.479Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:35:16.919Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:36:17.199Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:37:16.938Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:38:16.954Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:39:22.062Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:40:16.943Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:41:17.105Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:42:17.064Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:43:16.927Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:44:16.977Z"}
{"level":"info","message":{"balance":0,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T12:45:17.438Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T19:36:04.722Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T19:36:07.496Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":true,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T19:36:39.104Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T19:42:28.180Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T19:47:31.884Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T19:54:55.504Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T19:55:30.750Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T20:11:46.865Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":true,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T20:12:18.545Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":true,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T20:20:04.957Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T20:20:07.041Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-01T20:28:44.288Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T14:20:22.782Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T14:28:04.724Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T14:30:54.256Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T14:38:34.327Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T14:49:26.611Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T14:53:20.891Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T14:57:53.818Z"}
{"level":"info","message":{"event":"user_registered","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T14:58:49.985Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T15:03:08.559Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T17:30:28.830Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T17:40:05.642Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T17:40:28.660Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T17:45:14.095Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T17:55:50.807Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T17:56:12.861Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T17:58:28.616Z"}
{"level":"info","message":{"balance":10000,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T17:58:32.335Z"}
{"level":"info","message":{"amount":1,"event":"credits_used","newBalance":9999,"userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T17:58:53.563Z"}
{"level":"info","message":{"balance":9999,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T18:02:55.624Z"}
{"level":"info","message":{"balance":9999,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T18:15:02.872Z"}
{"level":"info","message":{"amount":1,"event":"credits_used","newBalance":9998,"userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T18:15:09.931Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:13:29.156Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:27:21.307Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:28:00.654Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:29:19.044Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T19:30:54.249Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:31:38.819Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":true,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:45:59.436Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:47:10.387Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:49:32.385Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:49:45.969Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:50:06.680Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:50:56.857Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:51:13.050Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:52:29.607Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:52:55.708Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:56:23.928Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:56:43.023Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:57:40.234Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:58:40.214Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T19:59:40.211Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:00:40.210Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:01:40.267Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:02:40.239Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:03:40.209Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:04:40.251Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:05:40.201Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:05:53.942Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:06:52.148Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:07:12.929Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:07:37.981Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:08:23.853Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:22:30.709Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:23:28.925Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:25:15.928Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:37:11.117Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-02T20:52:46.273Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T20:58:09.473Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T21:03:42.044Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T21:03:47.381Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T21:04:15.242Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T21:05:58.097Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T21:06:31.896Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T21:07:28.246Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T21:07:56.537Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T21:09:35.745Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T21:13:11.022Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:02:49.320Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:14:26.044Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:19:56.765Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:23:35.141Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:26:47.142Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:29:39.929Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:31:08.874Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:31:33.612Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:34:39.348Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":true,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:36:56.296Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:39:42.850Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:42:50.749Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:46:15.019Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:51:53.985Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T22:55:36.470Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T23:00:29.209Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-02T23:15:07.673Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:09:37.513Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:12:00.708Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:20:16.009Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:20:31.356Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:26:38.434Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:33:49.940Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:35:48.383Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:35:48.396Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:35:50.057Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:35:50.067Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:35:58.947Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:35:58.961Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:36:04.023Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:36:10.874Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:36:10.888Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:36:13.973Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:36:15.337Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:36:15.340Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:36:16.798Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:36:17.707Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:36:17.714Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:36:19.286Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:36:19.290Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:36:20.734Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:36:20.737Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T00:37:53.255Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:49:14.484Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T00:49:42.263Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T00:54:56.614Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T00:55:40.736Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:00:10.222Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:01:13.881Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:01:21.563Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:03:39.270Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:03:39.419Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:03:47.502Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:03:47.526Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:03:49.216Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T01:04:09.010Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:05:28.240Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:05:30.682Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:05:30.698Z"}
{"level":"info","message":{"balance":1000,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:05:32.228Z"}
{"level":"info","message":{"amount":1,"event":"credits_used","newBalance":999,"userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:05:46.412Z"}
{"level":"info","message":{"balance":999,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:05:57.655Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:05:57.667Z"}
{"level":"info","message":{"balance":999,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:05:59.043Z"}
{"level":"info","message":{"balance":999,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:05:59.604Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:05:59.612Z"}
{"level":"info","message":{"balance":999,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:06:02.895Z"}
{"level":"info","message":{"balance":999,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:06:12.156Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:06:12.161Z"}
{"level":"info","message":{"balance":999,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:06:12.854Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"user","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:07:34.456Z"}
{"level":"info","message":{"balance":999,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T01:07:34.532Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T01:08:07.543Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T01:08:07.549Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T01:08:08.158Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T01:08:09.510Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T01:08:09.516Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T01:08:57.310Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T01:08:58.166Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T01:08:58.172Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T01:08:59.571Z"}
{"level":"info","message":{"balance":999,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T03:17:35.141Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T03:17:35.151Z"}
{"level":"info","message":{"balance":999,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T03:17:35.812Z"}
{"level":"info","message":{"balance":999,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T03:17:37.168Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T03:17:37.181Z"}
{"level":"info","message":{"balance":999,"event":"credit_balance_check","userId":"66d5d2a987f2126541372ff0"},"timestamp":"2024-09-03T03:17:39.677Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:17:59.189Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:17:59.196Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:18:01.570Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:18:28.778Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:18:28.782Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:18:40.521Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:46:43.795Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:54:48.038Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:54:49.528Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:54:49.539Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:54:51.464Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:54:51.470Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:54:53.520Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:55:57.603Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:55:57.612Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:56:00.428Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:56:02.369Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T03:56:02.378Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T12:41:39.637Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T12:42:20.820Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T12:42:20.833Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T12:42:22.714Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T12:42:27.004Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T12:42:27.017Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T12:42:29.095Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:15:48.820Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:15:48.832Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:15:50.470Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:15:50.475Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:15:53.651Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:15:53.655Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:15:54.236Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:15:55.596Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:15:55.600Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:15:56.813Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:16:00.345Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:16:00.350Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:16:02.064Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:16:04.105Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:16:04.110Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:22:19.334Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:24:39.866Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:26:22.035Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:26:24.090Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:26:24.099Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:26:54.264Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:27:42.054Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:28:28.464Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:32:50.045Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:34:32.952Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:38:21.943Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:42:04.755Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:42:22.231Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:42:22.242Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:42:33.424Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:42:33.433Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T13:42:37.468Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:18:53.356Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:47:08.385Z"}
{"level":"info","message":{"balance":9998,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:47:55.072Z"}
{"level":"info","message":{"amount":1,"event":"credits_used","newBalance":9997,"userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:50:00.587Z"}
{"level":"info","message":{"balance":9997,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:51:13.789Z"}
{"level":"info","message":{"balance":9997,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:52:49.652Z"}
{"level":"info","message":{"amount":1,"event":"credits_used","newBalance":9996,"userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:52:51.700Z"}
{"level":"info","message":{"amount":1,"event":"credits_used","newBalance":9995,"userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:52:52.183Z"}
{"level":"info","message":{"balance":9995,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:54:19.402Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:54:19.408Z"}
{"level":"info","message":{"balance":9995,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:56:11.065Z"}
{"level":"info","message":{"amount":1,"event":"credits_used","newBalance":9994,"userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:56:13.194Z"}
{"level":"info","message":{"balance":9994,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:57:07.367Z"}
{"level":"info","message":{"amount":1,"event":"credits_used","newBalance":9993,"userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:58:10.040Z"}
{"level":"info","message":{"balance":9993,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T16:59:25.425Z"}
{"level":"info","message":{"balance":9993,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:03:00.496Z"}
{"level":"info","message":{"balance":9993,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:04:53.599Z"}
{"level":"info","message":{"balance":9993,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:20:48.202Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:20:48.208Z"}
{"level":"info","message":{"balance":9993,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:20:52.432Z"}
{"level":"info","message":{"balance":9993,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:21:24.473Z"}
{"level":"info","message":{"balance":9993,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:21:29.087Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:21:29.098Z"}
{"level":"info","message":{"balance":9993,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:21:51.716Z"}
{"level":"info","message":{"amount":1,"event":"credits_used","newBalance":9992,"userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:22:38.931Z"}
{"level":"info","message":{"balance":9992,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:25:21.029Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:25:21.039Z"}
{"level":"info","message":{"balance":9992,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:29:23.434Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:29:23.441Z"}
{"level":"info","message":{"balance":9992,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:30:24.954Z"}
{"level":"info","message":{"balance":9992,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:30:29.192Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:30:29.205Z"}
{"level":"info","message":{"balance":9992,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T17:31:58.799Z"}
{"level":"info","message":{"balance":9992,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T18:01:53.883Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T18:01:53.889Z"}
{"level":"info","message":{"balance":9992,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T18:01:55.800Z"}
{"level":"info","message":{"amount":1,"event":"credits_used","newBalance":9991,"userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T18:02:59.473Z"}
{"level":"info","message":{"balance":9991,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T18:05:03.440Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T18:05:03.447Z"}
{"level":"info","message":{"balance":9991,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T18:05:04.947Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T19:45:54.461Z"}
{"level":"info","message":{"balance":9991,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T19:45:54.466Z"}
{"level":"info","message":{"balance":9991,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T19:45:56.030Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T19:45:56.038Z"}
{"level":"info","message":{"balance":9991,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T19:45:57.225Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T19:45:57.237Z"}
{"level":"info","message":{"balance":9991,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T19:46:04.102Z"}
{"level":"info","message":{"event":"credit_history_viewed","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-03T19:46:04.115Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-06T17:54:05.355Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-06T18:19:59.184Z"}
{"level":"info","message":{"balance":9991,"event":"credit_balance_check","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-06T18:20:08.330Z"}
{"level":"info","message":{"event":"successful_login","rememberMe":false,"role":"admin","userId":"66d0e15f157eff804d59a664"},"timestamp":"2024-09-06T21:44:15.753Z"}

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

# frontend/src/environments/environment.prod.ts

```ts
// src/environments/environment.prod.ts

export const environment = {
  production: false,
  apiUrl: 'http://productionUrl/api',
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
    MatTooltipModule
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
<!-- src/app/app.component.ts-->
<div class="app-container">
    <mat-toolbar color="primary" class="app-toolbar">
      <button mat-icon-button (click)="sidenav.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Code Interpretation Platform</span>
      <span class="spacer"></span>
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

# backend/src/services/subscription-analytics.service.ts

```ts
// src/services/subscription-analytics.service.ts

import { User, IUser } from '../models/user.model';
import { ICreditPackage } from '../models/credit-package.model';

export class SubscriptionAnalyticsService {
  static async getActiveSubscribersCount(): Promise<number> {
    return User.countDocuments({ 'subscription.status': 'active' });
  }

  static async getMonthlyRecurringRevenue(): Promise<number> {
    const activeSubscriptions = await User.find({ 'subscription.status': 'active' }).populate('subscription.packageId');
    return activeSubscriptions.reduce((total, user) => {
      const creditPackage = (user.subscription?.packageId as ICreditPackage | undefined);
      return total + (creditPackage?.price || 0);
    }, 0);
  }

  static async getChurnRate(periodInDays: number = 30): Promise<number> {
    const now = new Date();
    const periodStart = new Date(now.getTime() - periodInDays * 24 * 60 * 60 * 1000);

    const totalSubscribersAtStart = await User.countDocuments({
      'subscription.startDate': { $lt: periodStart }
    });

    const cancelledSubscriptions = await User.countDocuments({
      'subscription.status': 'cancelled',
      'subscription.endDate': { $gte: periodStart, $lt: now }
    });

    return totalSubscribersAtStart > 0 ? cancelledSubscriptions / totalSubscribersAtStart : 0;
  }


  static async getNewSubscribersCount(periodInDays: number = 30): Promise<number> {
    const now = new Date();
    const periodStart = new Date(now.getTime() - periodInDays * 24 * 60 * 60 * 1000);
    return User.countDocuments({
      'subscription.startDate': { $gte: periodStart, $lte: now }
    });
  }

  static async getAverageRevenuePerUser(): Promise<number> {
    const totalRevenue = await this.getMonthlyRecurringRevenue();
    const activeSubscribers = await this.getActiveSubscribersCount();
    return activeSubscribers > 0 ? totalRevenue / activeSubscribers : 0;
  }

  static async getSubscriptionGrowthRate(periodInDays: number = 30): Promise<number> {
    const now = new Date();
    const periodStart = new Date(now.getTime() - periodInDays * 24 * 60 * 60 * 1000);
    const subscribersAtStart = await User.countDocuments({
      'subscription.startDate': { $lt: periodStart },
      'subscription.status': 'active'
    });
    const currentSubscribers = await this.getActiveSubscribersCount();
    return subscribersAtStart > 0 ? (currentSubscribers - subscribersAtStart) / subscribersAtStart : 0;
  }
}
```

# backend/src/services/stripe.service.ts

```ts
// src/services/stripe.service.ts

import Stripe from 'stripe';
import { IUser } from '../models/user.model';
import { CreditPackage } from '../models/credit-package.model';
import mongoose from 'mongoose';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2022-11-15' as Stripe.LatestApiVersion,
});

export class StripeService {
  static async createCustomer(user: IUser): Promise<string> {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user._id?.toString() || '' },
    });
    return customer.id;
  }

  static async createSubscription(user: IUser, packageId: string): Promise<Stripe.Subscription> {
    const creditPackage = await CreditPackage.findById(packageId);

    if (!creditPackage) {
      throw new Error('Credit package not found');
    }

    let customerId: string;
    if (!user.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user._id.toString() },
      });
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    } else {
      customerId = user.stripeCustomerId;
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: creditPackage.stripePriceId }],
      metadata: { packageId: packageId.toString() },
    });

    return subscription;
  }

  static async createPaymentIntent(amount: number): Promise<Stripe.PaymentIntent> {
    return stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
  }



  static async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
  }

  static async updateSubscription(subscriptionId: string, newPackageId: string): Promise<string> {
    const creditPackage = await CreditPackage.findById(newPackageId);
    if (!creditPackage) {
      throw new Error('Credit package not found');
    }

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{ price: creditPackage.stripePriceId }],
      metadata: { packageId: newPackageId.toString() },
    });

    return updatedSubscription.id;
  }

  static async retrieveSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    return stripe.subscriptions.retrieve(subscriptionId);
  }

  static async handleWebhook(payload: Buffer, signature: string): Promise<Stripe.Event> {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
    try {
      return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
      throw new Error(`Webhook Error: ${err.message}`);
    }
  }
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

# backend/src/routes/workspace.routes.ts

```ts
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

# backend/src/routes/subscription.routes.ts

```ts
import express, { Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import * as subscriptionController from '../controllers/subscription.controller';

const router = express.Router();

router.use(authMiddleware);

// Helper function to wrap async controllers
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/current', asyncHandler(subscriptionController.getCurrentSubscription));
router.post('/subscribe', asyncHandler(subscriptionController.subscribe));
router.post('/cancel', asyncHandler(subscriptionController.cancelSubscription));
router.post('/upgrade', asyncHandler(subscriptionController.upgradeSubscription));
router.post('/downgrade', asyncHandler(subscriptionController.downgradeSubscription));

export default router;
```

# backend/src/routes/payment.routes.ts

```ts
// src/routes/payment.routes.ts

import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import * as paymentController from '../controllers/payment.controller';

const router = express.Router();

router.use(authMiddleware); // Protect all payment routes

router.post('/create-payment-intent', authMiddleware, paymentController.createPaymentIntent);

// New webhook route
router.post('/webhook', express.raw({type: 'application/json'}), paymentController.handleStripeWebhook);

export default router;

```

# backend/src/routes/credit.routes.ts

```ts
import express, { RequestHandler } from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import * as creditController from '../controllers/credit.controller';

const router = express.Router();

router.use(authMiddleware);

// Explicitly type the controller functions as RequestHandler
const getCreditBalance: RequestHandler = (req, res) => creditController.getCreditBalance(req as AuthRequest, res);
const addCredits: RequestHandler = (req, res) => creditController.addCredits(req as AuthRequest, res);
const useCredits: RequestHandler = (req, res) => creditController.useCredits(req as AuthRequest, res);
const getCreditHistory: RequestHandler = (req, res) => creditController.getCreditHistory(req as AuthRequest, res);
const purchasePackage: RequestHandler = (req, res) => creditController.purchasePackage(req as AuthRequest, res);

router.get('/balance', getCreditBalance);
router.post('/add', addCredits);
router.post('/use', useCredits);
router.get('/history', getCreditHistory);
router.post('/purchase-package', purchasePackage);

export default router;
```

# backend/src/routes/credit-package.routes.ts

```ts
// src/routes/credit-package.routes.ts

import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import * as creditPackageController from '../controllers/credit-package.controller';

const router = express.Router();

router.get('/', creditPackageController.getCreditPackages);
router.post('/', authMiddleware, creditPackageController.createCreditPackage);
router.put('/:id', authMiddleware, creditPackageController.updateCreditPackage);
router.delete('/:id', authMiddleware, creditPackageController.deleteCreditPackage);

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

# backend/src/routes/admin.routes.ts

```ts
// src/routes/admin.routes.ts

import express from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';
import * as adminController from '../controllers/admin.controller';

const router = express.Router();

console.log('Admin routes file loaded');

// Log when the route is accessed
router.use((req, res, next) => {
    console.log(`Admin route accessed: ${req.method} ${req.path}`);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
});

// Log when authMiddleware is executed
router.use((req, res, next) => {
    console.log('Executing authMiddleware...');
    authMiddleware(req, res, (err) => {
        if (err) {
            console.error('authMiddleware error:', err.message);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log('authMiddleware passed');
        next();
    });
});

// Log when adminMiddleware is executed
router.use((req, res, next) => {
    console.log('Executing adminMiddleware...');
    adminMiddleware(req, res, (err) => {
        if (err) {
            console.error('adminMiddleware error:', err.message);
            return res.status(403).json({ error: 'Forbidden' });
        }
        console.log('adminMiddleware passed');
        next();
    });
});

// Log specific route handler executions
router.get('/users', (req, res, next) => {
    console.log('Handling GET /users');
    next();
}, adminController.getAllUsers);

router.get('/users/:id', (req, res, next) => {
    console.log(`Handling GET /users/${req.params.id}`);
    next();
}, adminController.getUserById);

router.put('/users/:id', (req, res, next) => {
    console.log(`Handling PUT /users/${req.params.id}`);
    next();
}, adminController.updateUser);

router.delete('/users/:id', (req, res, next) => {
    console.log(`Handling DELETE /users/${req.params.id}`);
    next();
}, adminController.deleteUser);

router.get('/credit-packages', (req, res, next) => {
    console.log('Handling GET /credit-packages');
    next();
}, adminController.getAllCreditPackages);

router.post('/credit-packages', (req, res, next) => {
    console.log('Handling POST /credit-packages');
    next();
}, adminController.createCreditPackage);

router.put('/credit-packages/:id', (req, res, next) => {
    console.log(`Handling PUT /credit-packages/${req.params.id}`);
    next();
}, adminController.updateCreditPackage);

router.delete('/credit-packages/:id', (req, res, next) => {
    console.log(`Handling DELETE /credit-packages/${req.params.id}`);
    next();
}, adminController.deleteCreditPackage);

router.get('/subscription-analytics', (req, res, next) => {
    console.log('Handling GET /subscription-analytics');
    next();
}, adminController.getSubscriptionAnalytics);

router.post('/users/:id/suspend', (req, res, next) => {
    console.log(`Handling POST /users/${req.params.id}/suspend`);
    next();
}, adminController.suspendUser);

router.post('/users/:id/activate', (req, res, next) => {
    console.log(`Handling POST /users/${req.params.id}/activate`);
    next();
}, adminController.activateUser);

router.get('/test', (req, res) => {
    console.log('Admin test route accessed');
    res.json({ message: 'Admin access successful' });
});

export default router;

```

# backend/src/models/workspace.model.ts

```ts
//backend/src/models/workspace.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './user.model';

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
  createdAt: Date;
  updatedAt: Date;
}

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
  }]
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

# backend/src/models/credit-package.model.ts

```ts
// src/models/credit-package.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ICreditPackage extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  credits: number;
  price: number;
  description: string;
  isSubscription: boolean;
  durationDays: number;
  stripePriceId: string;
  
}

const CreditPackageSchema: Schema = new Schema({
  name: { type: String, required: true },
  credits: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  isSubscription: { type: Boolean, default: false },
  durationDays: { type: Number, required: true, min: 1 },
  stripePriceId: { type: String, required: true },
}, { timestamps: true });

export const CreditPackage = mongoose.model<ICreditPackage>('CreditPackage', CreditPackageSchema);
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
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Workspace, IWorkspace } from '../models/workspace.model';
import { User } from '../models/user.model';
import { emitWorkspaceUpdate, getIo,emitCursorPosition } from '../services/socket.service';
import mongoose from 'mongoose';
import { ActivityLog } from '../models/activity-log.model';

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
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      res.status(404).json({ message: 'Workspace not found' });
      return;
    }

    if (!workspace.members.some(member => member.user.toString() === req.user?._id.toString())) {
      res.status(403).json({ message: 'Forbidden: You do not have access to this workspace' });
      return;
    }

    const activityLogs = await ActivityLog.find({ workspace: workspaceId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name email');

    const totalLogs = await ActivityLog.countDocuments({ workspace: workspaceId });

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

# backend/src/controllers/subscription.controller.ts

```ts
import { Response ,NextFunction} from 'express';
import { User, IUser } from '../models/user.model';
import { CreditPackage, ICreditPackage } from '../models/credit-package.model';
import { AuthRequest } from '../middleware/auth.middleware';
import { StripeService } from '../services/stripe.service';
import mongoose from 'mongoose';
import { AuthenticatedRequest } from '../types';

interface SubscribeRequestBody {
  packageId: string;
}

export const getCurrentSubscription = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log('getSubscriptionAnalytics - User:', req.user);
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const user = await User.findById(req.user._id).populate('subscription.packageId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription', error });
  }
};

export const subscribe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const { packageId } = req.body as SubscribeRequestBody;
    const user = await User.findById(req.user._id);
    const creditPackage = await CreditPackage.findById(packageId);

    if (!user || !creditPackage) {
      return res.status(404).json({ message: 'User or package not found' });
    }

    if (!creditPackage.isSubscription) {
      return res.status(400).json({ message: 'Selected package is not a subscription' });
    }

    const stripeSubscription = await StripeService.createSubscription(user, packageId);
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + (creditPackage.durationDays || 30) * 24 * 60 * 60 * 1000);

    user.subscription = {
      packageId: creditPackage._id as mongoose.Types.ObjectId,
      startDate,
      endDate,
      status: 'active',
      stripeSubscriptionId: stripeSubscription.id
    };

    user.credits += creditPackage.credits;
    user.creditHistory.push({
      amount: creditPackage.credits,
      description: `Subscription to ${creditPackage.name}`,
      date: startDate
    });

    await user.save();
    res.json(user.subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subscription', error });
  }
};

export const cancelSubscription = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(userId);
    if (!user || !user.subscription || !user.subscription.stripeSubscriptionId) {
      return res.status(404).json({ message: 'Active subscription not found' });
    }

    const cancelledSubscription = await StripeService.cancelSubscription(user.subscription.stripeSubscriptionId);

    user.subscription.status = 'cancelled';
    user.subscription.endDate = new Date(cancelledSubscription.current_period_end * 1000);
    await user.save();

    res.json({ message: 'Subscription cancelled successfully', endDate: user.subscription.endDate });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ message: 'Error cancelling subscription', error: (error as Error).message });
  }
};


export const upgradeSubscription = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const { packageId } = req.body;
    const user = await User.findById(req.user._id);
    const newPackage = await CreditPackage.findById(packageId);

    if (!user || !newPackage || !user.subscription) {
      return res.status(404).json({ message: 'User, package, or subscription not found' });
    }

    if (!newPackage.isSubscription) {
      return res.status(400).json({ message: 'Selected package is not a subscription' });
    }

    const updatedStripeSubscriptionId = await StripeService.updateSubscription(user.subscription.stripeSubscriptionId, packageId);

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + (newPackage.durationDays || 30) * 24 * 60 * 60 * 1000);

    user.subscription = {
      packageId: newPackage._id as mongoose.Types.ObjectId,
      startDate,
      endDate,
      status: 'active',
      stripeSubscriptionId: updatedStripeSubscriptionId
    };

    await user.save();

    res.json(user.subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error upgrading subscription', error });
  }
};

export const downgradeSubscription = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const { packageId } = req.body;
    const user = await User.findById(req.user._id);
    const newPackage = await CreditPackage.findById(packageId);

    if (!user || !newPackage || !user.subscription) {
      return res.status(404).json({ message: 'User, package, or subscription not found' });
    }

    if (!newPackage.isSubscription) {
      return res.status(400).json({ message: 'Selected package is not a subscription' });
    }

    const updatedStripeSubscriptionId = await StripeService.updateSubscription(user.subscription.stripeSubscriptionId, packageId);

    user.subscription = {
      ...user.subscription,
      packageId: newPackage._id as mongoose.Types.ObjectId,
      status: 'active',
      stripeSubscriptionId: updatedStripeSubscriptionId
    };

    await user.save();

    res.json(user.subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error downgrading subscription', error });
  }
};
```

# backend/src/controllers/payment.controller.ts

```ts
// src/controllers/payment.controller.ts

import { Request, Response } from 'express';
import { StripeService } from '../services/stripe.service';
import { User } from '../models/user.model';
import { CreditPackage, ICreditPackage } from '../models/credit-package.model';
import mongoose from 'mongoose';
import { EmailService } from '../services/email.service';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment intent', error });
  }
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;

  try {
    const event = await StripeService.handleWebhook(req.body, signature);

    switch (event.type) {
      case 'invoice.payment_succeeded':
        await handleInvoicePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(400).send(`Webhook Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const checkExpiredGracePeriods = async () => {
  const now = new Date();
  const usersWithExpiredGrace = await User.find({
    'subscription.status': 'grace',
    'subscription.graceEndDate': { $lt: now }
  });

  for (const user of usersWithExpiredGrace) {
    if (user.subscription) {
      user.subscription.status = 'expired';
      user.subscription.graceEndDate = undefined;
      await user.save();
      await EmailService.sendSubscriptionCancelledNotification(user);
    }
  }
};

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const subscription = await StripeService.retrieveSubscription(invoice.subscription as string);
  const user = await User.findOne({ stripeCustomerId: invoice.customer as string });
  
  if (!user) {
    console.error('User not found for invoice:', invoice.id);
    return;
  }

  const creditPackage = await CreditPackage.findById(subscription.metadata.packageId);
  
  if (!creditPackage) {
    console.error('Credit package not found for subscription:', subscription.id);
    return;
  }

  const packageId = creditPackage._id instanceof mongoose.Types.ObjectId
    ? creditPackage._id
    : new mongoose.Types.ObjectId(creditPackage._id);

  user.subscription = {
    packageId: packageId,
    startDate: new Date(subscription.current_period_start * 1000),
    endDate: new Date(subscription.current_period_end * 1000),
    status: 'active',
    stripeSubscriptionId: subscription.id
  };

  user.credits += creditPackage.credits;
  user.creditHistory.push({
    amount: creditPackage.credits,
    description: `Subscription renewal: ${creditPackage.name}`,
    date: new Date()
  });

  await user.save();
  console.log('User subscription renewed:', user.email);

  // Send confirmation email
  await EmailService.sendSubscriptionConfirmation(user, creditPackage);
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const user = await User.findOne({ stripeCustomerId: invoice.customer as string });
  
  if (!user) {
    console.error('User not found for failed invoice:', invoice.id);
    return;
  }

  console.log('Payment failed for user:', user.email);

  // Set grace period
  if (user.subscription) {
    const graceEndDate = new Date();
    graceEndDate.setDate(graceEndDate.getDate() + 3); // 3 days grace period
    user.subscription = {
      ...user.subscription,
      status: 'grace',
      graceEndDate: graceEndDate
    };
    await user.save();
  }

  // Send payment failed notification
  await EmailService.sendPaymentFailedNotification(user);
}


async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const user = await User.findOne({ 'subscription.stripeSubscriptionId': subscription.id });
  
  if (!user) {
    console.error('User not found for deleted subscription:', subscription.id);
    return;
  }

  user.subscription = undefined;
  await user.save();
  console.log('Subscription cancelled for user:', user.email);

  // Send subscription cancelled notification
  await EmailService.sendSubscriptionCancelledNotification(user);
}
```

# backend/src/controllers/credit.controller.ts

```ts
import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { User } from '../models/user.model';
import { logAuthEvent } from '../services/auth-logger.service';
import { CreditPackage } from '../models/credit-package.model';

export const getCreditBalance = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const creditInfo = {
      credits: user.credits,
      lastUpdated: new Date(),
      recentTransactions: user.creditHistory.slice(-5) // Get last 5 transactions
    };
    res.json(creditInfo);
    logAuthEvent('credit_balance_check', user._id.toString(), { balance: user.credits });
  } catch (error) {
    console.error('Error fetching credit balance:', error);
    res.status(500).json({ message: 'Error fetching credit balance', error });
  }
};


export const addCredits = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const { amount, description } = req.body;
    if (typeof amount !== 'number' || amount <= 0) {
      res.status(400).json({ message: 'Invalid credit amount' });
      return;
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    user.credits += amount;
    user.creditHistory.push({ amount, description, date: new Date() });
    await user.save();
    res.json({ credits: user.credits, message: 'Credits added successfully' });
    logAuthEvent('credits_added', user._id.toString(), { amount, newBalance: user.credits });
  } catch (error) {
    console.error('Error adding credits:', error);
    res.status(500).json({ message: 'Error adding credits', error });
  }
};

export const useCredits = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const { amount, description } = req.body;
    if (typeof amount !== 'number' || amount <= 0) {
      res.status(400).json({ message: 'Invalid credit amount' });
      return;
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if (user.credits < amount) {
      res.status(400).json({ message: 'Insufficient credits' });
      logAuthEvent('insufficient_credits', user._id.toString(), { attempted: amount, available: user.credits });
      return;
    }
    user.credits -= amount;
    user.creditHistory.push({ amount: -amount, description, date: new Date() });
    await user.save();
    res.json({ credits: user.credits, message: 'Credits used successfully' });
    logAuthEvent('credits_used', user._id.toString(), { amount, newBalance: user.credits });
  } catch (error) {
    console.error('Error using credits:', error);
    res.status(500).json({ message: 'Error using credits', error });
  }
};

export const getCreditHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const transactions = user.creditHistory.slice(startIndex, endIndex);
    const total = user.creditHistory.length;
    res.json({ transactions, total });
    logAuthEvent('credit_history_viewed', user._id.toString());
  } catch (error) {
    console.error('Error fetching credit history:', error);
    res.status(500).json({ message: 'Error fetching credit history', error });
  }
};

export const purchasePackage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized: User not authenticated' });
      return;
    }
    const { packageId } = req.body;
    const user = await User.findById(req.user._id);
    const creditPackage = await CreditPackage.findById(packageId);

    if (!user || !creditPackage) {
      res.status(404).json({ message: 'User or credit package not found' });
      return;
    }

    user.credits += creditPackage.credits;
    user.creditHistory.push({
      amount: creditPackage.credits,
      description: `Purchased ${creditPackage.name}`,
      date: new Date()
    });

    await user.save();

    res.json({ credits: user.credits, message: 'Credit package purchased successfully' });
    logAuthEvent('credit_package_purchased', user._id.toString(), { packageId, credits: creditPackage.credits });
  } catch (error) {
    console.error('Error purchasing credit package:', error);
    res.status(500).json({ message: 'Error purchasing credit package', error });
  }
};
```

# backend/src/controllers/credit-package.controller.ts

```ts
// src/controllers/credit-package.controller.ts

import { Request, Response } from 'express';
import { CreditPackage, ICreditPackage } from '../models/credit-package.model';
import { StripeService } from '../services/stripe.service';
import { User, IUser } from '../models/user.model'; // Make sure to import IUser as well

export const createCreditPackage = async (req: Request, res: Response) => {
  try {
    const packageData: ICreditPackage = req.body;

    // Validate required fields
    if (!packageData.name || !packageData.credits || !packageData.price || !packageData.description || !packageData.stripePriceId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newPackage = new CreditPackage(packageData);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error: unknown) {
    console.error('Error creating credit package:', error);

    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error', error: (error as any).errors });
      }
      res.status(500).json({ message: 'Error creating credit package', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getCreditPackages = async (req: Request, res: Response) => {
  try {
    const packages = await CreditPackage.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching credit packages', error });
  }
};

export const updateCreditPackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: Partial<ICreditPackage> = req.body;
    const updatedPackage = await CreditPackage.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Credit package not found' });
    }
    res.json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating credit package', error });
  }
};

export const deleteCreditPackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Credit package ID is required' });
    }
    const deletedPackage = await CreditPackage.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Credit package not found' });
    }
    res.json({ message: 'Credit package deleted successfully' });
  } catch (error) {
    console.error('Error deleting credit package:', error);
    res.status(500).json({ message: 'Error deleting credit package', error: (error as Error).message });
  }
};


export const purchasePackage = async (req: Request, res: Response) => {
  try {
    const { packageId } = req.body;
    const userId = (req.user as IUser | undefined)?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const creditPackage = await CreditPackage.findById(packageId);
    if (!creditPackage) {
      return res.status(404).json({ message: 'Credit package not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (creditPackage.isSubscription) {
      const subscription = await StripeService.createSubscription(user, packageId);
      // Handle subscription creation
      res.json({ message: 'Subscription created', subscriptionId: subscription.id });
    } else {
      // For one-time purchases, we'll just return success and let the frontend handle the payment
      res.json({ message: 'One-time purchase initiated' });
    }
  } catch (error) {
    console.error('Error purchasing package:', error);
    res.status(500).json({ message: 'Error purchasing package', error: (error as Error).message });
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

# backend/src/controllers/admin.controller.ts

```ts
// src/controllers/admin.controller.ts

import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { CreditPackage , ICreditPackage} from '../models/credit-package.model';
import { SubscriptionAnalyticsService } from '../services/subscription-analytics.service';
import { AuthRequest } from '../middleware/auth.middleware'; // Import the AuthRequest type

export const getAllUsers = async (req: Request, res: Response) => {
  console.log('getAllUsers function called');
  try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sort = (req.query.sort as string) || 'name';
      const order = (req.query.order as string) || 'asc';
      const search = req.query.search as string;
    console.log('Query parameters:', { page, limit, sort, order, search });

    const query: any = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    console.log('MongoDB query:', JSON.stringify(query));

    const total = await User.countDocuments(query);
    console.log('Total users:', total);

    const users = await User.find(query)
      .select('-password')
      .sort({ [sort]: order === 'asc' ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    console.log('Users found:', users.length);
    console.log('First user:', users[0]);

    res.json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({ message: 'Error fetching users', error: (error as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    console.log('Getting user by ID:', req.params.id); // Add this line
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('User found:', user); // Add this line
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

export const suspendUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { accountStatus: 'suspended' }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User suspended successfully', user });
  } catch (error) {
    console.error('Error suspending user:', error);
    res.status(500).json({ message: 'Error suspending user', error });
  }
};

export const activateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { accountStatus: 'active' }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User activated successfully', user });
  } catch (error) {
    console.error('Error activating user:', error);
    res.status(500).json({ message: 'Error activating user', error });
  }
};


export const getAllCreditPackages = async (req: Request, res: Response) => {
  try {
    const creditPackages = await CreditPackage.find();
    res.json(creditPackages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching credit packages', error });
  }
};

export const createCreditPackage = async (req: Request, res: Response) => {
  try {
    console.log('Received request to create credit package:', req.body);
    const packageData: ICreditPackage = req.body;

    // Validate required fields
    const requiredFields = ['name', 'credits', 'price', 'description', 'durationDays', 'stripePriceId'];
    const missingFields = requiredFields.filter(field => !packageData[field as keyof ICreditPackage]);

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }

    const newPackage = new CreditPackage(packageData);
    console.log('Creating new credit package:', newPackage);
    await newPackage.save();
    console.log('Credit package created successfully:', newPackage);
    res.status(201).json(newPackage);
  } catch (error: unknown) {
    console.error('Error creating credit package:', error);

    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation error', error: (error as any).errors });
      }
      res.status(500).json({ message: 'Error creating credit package', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const updateCreditPackage = async (req: Request, res: Response) => {
  try {
    const updatedCreditPackage = await CreditPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCreditPackage) {
      return res.status(404).json({ message: 'Credit package not found' });
    }
    res.json(updatedCreditPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating credit package', error });
  }
};

export const deleteCreditPackage = async (req: Request, res: Response) => {
  try {
    const deletedCreditPackage = await CreditPackage.findByIdAndDelete(req.params.id);
    if (!deletedCreditPackage) {
      return res.status(404).json({ message: 'Credit package not found' });
    }
    res.json({ message: 'Credit package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting credit package', error });
  }
};

export const getSubscriptionAnalytics = async (req: Request, res: Response) => {
  try {
    const user = (req as AuthRequest).user;
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const activeSubscribers = await SubscriptionAnalyticsService.getActiveSubscribersCount();
    const mrr = await SubscriptionAnalyticsService.getMonthlyRecurringRevenue();
    const churnRate = await SubscriptionAnalyticsService.getChurnRate();
    const newSubscribers = await SubscriptionAnalyticsService.getNewSubscribersCount();
    const arpu = await SubscriptionAnalyticsService.getAverageRevenuePerUser();
    const growthRate = await SubscriptionAnalyticsService.getSubscriptionGrowthRate();

    res.json({
      activeSubscribers,
      monthlyRecurringRevenue: mrr,
      churnRate,
      newSubscribers,
      averageRevenuePerUser: arpu,
      subscriptionGrowthRate: growthRate
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription analytics', error });
  }
};


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

export interface Workspace {
  _id: string;
  name: string;
  description: string; 
  owner: string; 
  members: WorkspaceMember[];
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


@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {
  private apiUrl = `${environment.apiUrl}/workspaces`;

  constructor(private http: HttpClient, private webSocketService: WebSocketService) {
    this.listenForActivityLogUpdates();
    this.handleReconnection();
  }

    private activityLogsSubject = new BehaviorSubject<ActivityLog[]>([]);

  getWorkspaces(page: number = 1, limit: number = 10): Observable<WorkspacesResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<WorkspacesResponse>(this.apiUrl, { params });
  }

  getWorkspace(id: string): Observable<Workspace> {
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
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  updateMemberPermissions(workspaceId: string, userId: string, role: string, permissions: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${workspaceId}/members/${userId}/permissions`, { role, permissions }).pipe(
      catchError(this.handleError)
    );
  }
  getActivityLogs(workspaceId: string, page: number = 1, limit: number = 10): Observable<ActivityLogsResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
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
  private reconnectionAttempts = 0;
  private maxReconnectionAttempts = 5;

  constructor() {
    this.socket = io(environment.apiUrl, {
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
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      this.reconnectionSubject.next(true);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.reconnectionAttempts++;
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

# frontend/src/app/services/subscription.service.ts

```ts
// src/app/services/subscription.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreditPackage } from './credit-package.service';

export interface Subscription {
  packageId: CreditPackage;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'cancelled' | 'expired';
  stripeSubscriptionId: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = `${environment.apiUrl}/subscriptions`;

  constructor(private http: HttpClient) {}

  getCurrentSubscription(): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.apiUrl}/current`);
  }

  subscribe(packageId: string): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.apiUrl}/subscribe`, { packageId });
  }

  cancelSubscription(): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.apiUrl}/cancel`, {});
  }

  upgradeSubscription(newPackageId: string): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.apiUrl}/upgrade`, { packageId: newPackageId });
  }
}
```

# frontend/src/app/services/stripe.service.ts

```ts
// src/app/services/stripe.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private apiUrl = `${environment.apiUrl}/payments`;
  private stripePromise: Promise<Stripe | null>;

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(environment.stripePublicKey);
  }

  createPaymentIntent(amount: number): Observable<{ clientSecret: string }> {
    return this.http.post<{ clientSecret: string }>(`${this.apiUrl}/create-payment-intent`, { amount });
  }

  async confirmPayment(clientSecret: string): Promise<void> {
    const stripe = await this.stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          token: 'tok_visa' // Use a test token in development
        }
      }
    });

    if (result.error) {
      throw result.error;
    }
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

# frontend/src/app/services/form-generator.service.ts

```ts
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

# frontend/src/app/services/credit.service.ts

```ts
// src/app/services/credit.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError , BehaviorSubject} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NotificationService } from './notification.service';

export interface CreditInfo {
  credits: number;
  lastUpdated: Date;
  recentTransactions: CreditTransaction[];
}
export interface CreditTransaction {
  amount: number;
  description: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private apiUrl = `${environment.apiUrl}/credits`;
  private notificationService = inject(NotificationService);
  private creditInfoSubject = new BehaviorSubject<CreditInfo | null>(null);
  constructor(private http: HttpClient) {}

  getCreditBalance(): Observable<CreditInfo> {
    return this.http.get<CreditInfo>(`${this.apiUrl}/balance`).pipe(
      tap(creditInfo => {
        this.creditInfoSubject.next(creditInfo);
        if (creditInfo.credits < 5) {
          this.notificationService.showWarning('Low credit balance. Please consider purchasing more credits.');
        }
      }),
      catchError(this.handleError)
    );
  }

  get creditInfo$(): Observable<CreditInfo | null> {
    return this.creditInfoSubject.asObservable();
  }

  addCredits(amount: number, description: string): Observable<{ credits: number; message: string }> {
    return this.http.post<{ credits: number; message: string }>(`${this.apiUrl}/add`, { amount, description }).pipe(
      tap(response => {
        this.notificationService.showSuccess(`Successfully added ${amount} credits. New balance: ${response.credits}`);
      }),
      catchError(this.handleError)
    );
  }

  useCredits(amount: number, description: string): Observable<{ credits: number; message: string }> {
    return this.http.post<{ credits: number; message: string }>(`${this.apiUrl}/use`, { amount, description }).pipe(
      tap(response => {
        this.notificationService.showInfo(`Used ${amount} credits for ${description}. Remaining balance: ${response.credits}`);
        if (response.credits < 5) {
          this.notificationService.showWarning('Low credit balance. Please consider purchasing more credits.');
        }
      }),
      catchError(this.handleError)
    );
  }

  getCreditHistory(page: number = 1, pageSize: number = 10): Observable<{ transactions: CreditTransaction[], total: number }> {
    return this.http.get<{ transactions: CreditTransaction[], total: number }>(`${this.apiUrl}/history`, {
      params: { page: page.toString(), pageSize: pageSize.toString() }
    }).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message || error.statusText}`;
    }
    console.error(errorMessage);
    this.notificationService.showError(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  purchasePackage(packageId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/purchase-package`, { packageId });
  }
}
```

# frontend/src/app/services/credit-package.service.ts

```ts
// src/app/services/credit-package.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface CreditPackage {
  _id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  isSubscription: boolean;
  durationDays?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CreditPackageService {
  private apiUrl = `${environment.apiUrl}/credit-packages`;

  constructor(private http: HttpClient) {}

  getCreditPackages(): Observable<CreditPackage[]> {
    return this.http.get<CreditPackage[]>(this.apiUrl);
  }

  getCreditPackage(id: string): Observable<CreditPackage> {
    return this.http.get<CreditPackage>(`${this.apiUrl}/${id}`);
  }

  createCreditPackage(packageData: Omit<CreditPackage, '_id'>): Observable<CreditPackage> {
    return this.http.post<CreditPackage>(this.apiUrl, packageData);
  }

  updateCreditPackage(id: string, packageData: Partial<CreditPackage>): Observable<CreditPackage> {
    return this.http.put<CreditPackage>(`${this.apiUrl}/${id}`, packageData);
  }

  deleteCreditPackage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  purchasePackage(packageId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/purchase`, { packageId });
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

# frontend/src/app/components/subscription-management/subscription-management.component.ts

```ts
// src/app/components/subscription-management/subscription-management.component.ts
import { Component, OnInit, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { SubscriptionService, Subscription } from '../../services/subscription.service';
import { CreditPackageService, CreditPackage } from '../../services/credit-package.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-subscription-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDialogModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Your Subscription</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <ng-container *ngIf="currentSubscription; else noSubscription">
          <p>Package: {{ currentSubscription.packageId.name || 'Unknown' }}</p>
          <p>Status: {{ currentSubscription.status }}</p>
          <p>Start Date: {{ currentSubscription.startDate | date }}</p>
          <p>End Date: {{ currentSubscription.endDate | date }}</p>
        </ng-container>
        <ng-template #noSubscription>
          <p>You don't have an active subscription.</p>
        </ng-template>
      </mat-card-content>
      <mat-card-actions>
        <button *ngIf="currentSubscription && currentSubscription.status !== 'cancelled'" mat-raised-button color="primary" (click)="openUpgradeDialog()">Upgrade</button>
        <button *ngIf="currentSubscription && currentSubscription.status !== 'cancelled'" mat-raised-button color="warn" (click)="cancelSubscription()">Cancel</button>
        <button *ngIf="!currentSubscription || currentSubscription.status === 'cancelled'" mat-raised-button color="primary" (click)="openSubscribeDialog()">Subscribe</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 600px;
      margin: 20px auto;
    }
  `]
})
export class SubscriptionManagementComponent implements OnInit {
  currentSubscription: Subscription | null = null;
  availablePackages: CreditPackage[] = [];

  private subscriptionService = inject(SubscriptionService);
  private creditPackageService = inject(CreditPackageService);
  private notificationService = inject(NotificationService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.loadCurrentSubscription();
    this.loadAvailablePackages();
  }

  loadCurrentSubscription() {
    this.subscriptionService.getCurrentSubscription().subscribe({
      next: (subscription) => this.currentSubscription = subscription,
      error: (error) => this.notificationService.showError('Error loading subscription')
    });
  }

  loadAvailablePackages() {
    this.creditPackageService.getCreditPackages().subscribe({
      next: (packages) => this.availablePackages = packages.filter(p => p.isSubscription),
      error: (error) => this.notificationService.showError('Error loading packages')
    });
  }

  openSubscribeDialog() {
    const dialogRef = this.dialog.open(SubscribeDialogComponent, {
      width: '400px',
      data: { packages: this.availablePackages }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscribe(result);
      }
    });
  }

  openUpgradeDialog() {
    const dialogRef = this.dialog.open(UpgradeDialogComponent, {
      width: '400px',
      data: { 
        currentPackage: this.currentSubscription?.packageId,
        packages: this.availablePackages
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.upgradeSubscription(result);
      }
    });
  }

  subscribe(packageId: string) {
    this.subscriptionService.subscribe(packageId).subscribe({
      next: (subscription) => {
        this.currentSubscription = subscription;
        this.notificationService.showSuccess('Successfully subscribed');
      },
      error: (error) => this.notificationService.showError('Error subscribing')
    });
  }

  upgradeSubscription(packageId: string) {
    this.subscriptionService.upgradeSubscription(packageId).subscribe({
      next: (subscription) => {
        this.currentSubscription = subscription;
        this.notificationService.showSuccess('Successfully upgraded subscription');
      },
      error: (error) => this.notificationService.showError('Error upgrading subscription')
    });
  }

  cancelSubscription() {
    if (confirm('Are you sure you want to cancel your subscription?')) {
      this.subscriptionService.cancelSubscription().subscribe({
        next: (response) => {
          if (this.currentSubscription) {
            this.currentSubscription.status = 'cancelled';
            this.currentSubscription.endDate = response.endDate;
          }
          this.notificationService.showSuccess('Subscription cancelled successfully. You will have access until the end of your billing period.');
        },
        error: (error) => this.notificationService.showError('Error cancelling subscription')
      });
    }
  }}

@Component({
  selector: 'app-subscribe-dialog',
  template: `
    <h2 mat-dialog-title>Choose a Subscription</h2>
    <mat-dialog-content>
      <mat-radio-group [(ngModel)]="selectedPackage">
        @for (pkg of data.packages; track pkg._id) {
          <mat-radio-button [value]="pkg._id">
            {{ pkg.name }} - {{ pkg.price }}/month
          </mat-radio-button>
        }
      </mat-radio-group>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="selectedPackage" [disabled]="!selectedPackage">Subscribe</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatRadioModule, FormsModule]
})
export class SubscribeDialogComponent {
  selectedPackage: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<SubscribeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { packages: CreditPackage[] }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
    selector: 'app-upgrade-dialog',
    template: `
    <h2 mat-dialog-title>Upgrade Subscription</h2>
    <mat-dialog-content>
      <mat-radio-group [(ngModel)]="selectedPackage">
        @for (pkg of availableUpgrades; track pkg._id) {
          <mat-radio-button [value]="pkg._id">
            {{ pkg.name }} - {{ pkg.price }}/month
          </mat-radio-button>
        }
      </mat-radio-group>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button [mat-dialog-close]="selectedPackage" [disabled]="!selectedPackage">Upgrade</button>
    </mat-dialog-actions>
  `,
    standalone: true,
    imports: [MatDialogModule, MatRadioModule, FormsModule]
  })
  export class UpgradeDialogComponent implements OnInit {
    selectedPackage: string | null = null;
    availableUpgrades: CreditPackage[] = [];
  
    constructor(
      public dialogRef: MatDialogRef<UpgradeDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { currentPackage: CreditPackage | undefined, packages: CreditPackage[] }
    ) {}
  
    ngOnInit() {
      this.availableUpgrades = this.data.packages.filter(p => 
        p.price > (this.data.currentPackage?.price || 0)
      );
    }
  
    onNoClick(): void {
      this.dialogRef.close();
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
import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
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
      this.fields = this.parsedCode.fields;
      this.createForm();
      this.initializeTableDataSources();
    }
  }


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
  
  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.prepareFormData();
      console.log('Form submitted:', formData);
      this.snackBar.open('Form submitted successfully!', 'Close', { duration: 3000 });
    } else {
      console.error('Form is invalid', this.form.errors);
      this.snackBar.open('Form is invalid. Please check your inputs.', 'Close', { duration: 3000 });
      this.form.markAllAsTouched();
    }
  }

  private prepareFormData(): any {
    const formData = { ...this.form.value };
    this.fields.forEach(field => {
      if (field.type === 'STOPWATCH' || field.type === 'TIMER') {
        formData[field.name] = this.form.get(field.name)?.value;
      }
    });
    return formData;
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
      <div class="form-generator__submit">
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Submit</button>
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

# frontend/src/app/components/credits/credits.component.ts

```ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { CreditService, CreditInfo, CreditTransaction } from '../../services/credit.service';
import { CreditPackageService, CreditPackage } from '../../services/credit-package.service';
import { StripeService } from '../../services/stripe.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Your Credits</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <h2>Current Balance: {{ creditInfo?.credits || 0 }} credits</h2>
        <p>Last Updated: {{ creditInfo?.lastUpdated | date:'medium' }}</p>
        
        <h3>Available Packages</h3>
        <div class="package-summary">
          @for (package of topPackages; track package._id) {
            <mat-card>
              <mat-card-title>{{ package.name }}</mat-card-title>
              <mat-card-content>
                <p>Credits: {{ package.credits }}</p>
                <p>Price: {{ package.price | currency }}</p>
              </mat-card-content>
            </mat-card>
          }
        </div>
        <a mat-raised-button color="primary" routerLink="/credit-packages">View All Packages</a>

        <h3>Credit History</h3>
        @if (isLoading) {
          <mat-spinner diameter="40"></mat-spinner>
        } @else if (creditHistory.length) {
          <table mat-table [dataSource]="creditHistory">
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let transaction">{{ transaction.date | date }}</td>
            </ng-container>
            <ng-container matColumnDef="amount">
              <th mat-header-cell *matHeaderCellDef>Amount</th>
              <td mat-cell *matCellDef="let transaction">{{ transaction.amount }}</td>
            </ng-container>
            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Description</th>
              <td mat-cell *matCellDef="let transaction">{{ transaction.description }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
          <mat-paginator 
            [length]="totalTransactions"
            [pageSize]="pageSize"
            [pageSizeOptions]="[5, 10, 20]"
            (page)="onPageChange($event)">
          </mat-paginator>
        } @else {
          <p>No credit history available.</p>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card {
      max-width: 800px;
      margin: 20px auto;
    }
    table {
      width: 100%;
    }
    mat-spinner {
      margin: 20px auto;
    }
    .package-summary {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .package-summary mat-card {
      width: 150px;
    }
  `]
})
export class CreditsComponent implements OnInit {
  private creditService = inject(CreditService);
  private creditPackageService = inject(CreditPackageService);
  private stripeService = inject(StripeService);
  private notificationService = inject(NotificationService);

  creditInfo: CreditInfo | null = null;
  creditHistory: CreditTransaction[] = [];
  displayedColumns: string[] = ['date', 'amount', 'description'];
  isLoading: boolean = false;
  totalTransactions: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  topPackages: CreditPackage[] = [];
  purchaseAmount: number = 1;


  ngOnInit() {
    this.loadCreditInfo();
    this.loadCreditHistory();
    this.loadTopPackages();
  }
  loadCreditInfo() {
    this.isLoading = true;
    this.creditService.getCreditBalance().subscribe({
      next: (info) => {
        this.creditInfo = info;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadCreditHistory() {
    this.isLoading = true;
    this.creditService.getCreditHistory(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.creditHistory = response.transactions;
        this.totalTransactions = response.total;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadTopPackages() {
    this.creditPackageService.getCreditPackages().subscribe({
      next: (packages) => {
        this.topPackages = packages.slice(0, 3); // Show top 3 packages
      },
      error: (error) => {
        this.notificationService.showError('Error loading credit packages');
      }
    });
  }

  
  purchaseCredits() {
    if (this.purchaseAmount < 1) {
      this.notificationService.showError('Please enter a valid amount');
      return;
    }

    this.isLoading = true;
    this.stripeService.createPaymentIntent(this.purchaseAmount * 100).subscribe({
      next: (response) => {
        this.stripeService.confirmPayment(response.clientSecret).then(() => {
          this.creditService.addCredits(this.purchaseAmount, 'Credit purchase').subscribe({
            next: (response) => {
              if (this.creditInfo) {
                this.creditInfo.credits = response.credits;
              }
              this.loadCreditHistory();
              this.isLoading = false;
            },
            error: () => {
              this.isLoading = false;
            }
          });
        }).catch((error) => {
          this.notificationService.showError('Payment failed: ' + error.message);
          this.isLoading = false;
        });
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadCreditHistory();
  }
}
```

# frontend/src/app/components/credit-package/credit-package.component.ts

```ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CreditPackageService, CreditPackage } from '../../services/credit-package.service';
import { StripeService } from '../../services/stripe.service';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-credit-package',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatDialogModule],
  template: `
    <h2>Credit Packages</h2>
    @if (isLoading) {
      <mat-spinner></mat-spinner>
    } @else {
      <div class="package-container">
        @for (package of creditPackages; track package._id) {
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{ package.name }}</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <p>{{ package.description }}</p>
              <p>Credits: {{ package.credits }}</p>
              <p>Price: {{ package.price | currency }}</p> 
              @if (package.isSubscription) {
                <p>Duration: {{ package.durationDays }} days</p>
              }
            </mat-card-content>
            <mat-card-actions>
              <button mat-raised-button color="primary" (click)="purchasePackage(package)" [disabled]="isProcessing">
                {{ isProcessing ? 'Processing...' : 'Purchase' }}
              </button>
            </mat-card-actions>
          </mat-card>
        } @empty {
          <p>No credit packages available.</p>
        }
      </div>
    }
  `,
  styles: [`
    .package-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    mat-card {
      width: 300px;
    }
  `]
})
export class CreditPackageComponent implements OnInit {
  creditPackages: CreditPackage[] = [];
  isLoading = true;
  isProcessing = false;

  private creditPackageService = inject(CreditPackageService);
  private stripeService = inject(StripeService);
  private notificationService = inject(NotificationService);
  private dialog = inject(MatDialog);

  ngOnInit() {
    this.loadCreditPackages();
  }

  loadCreditPackages() {
    this.isLoading = true;
    this.creditPackageService.getCreditPackages().subscribe({
      next: (packages) => {
        this.creditPackages = packages;
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.showError('Error loading credit packages');
        this.isLoading = false;
      }
    });
  }

  purchasePackage(creditPackage: CreditPackage) {
    this.isProcessing = true;
    if (creditPackage.isSubscription) {
      this.creditPackageService.purchasePackage(creditPackage._id).subscribe({
        next: (response) => {
          if (response.subscriptionId) {
            this.notificationService.showSuccess(`Successfully subscribed to ${creditPackage.name}`);
          } else {
            this.notificationService.showSuccess(`Successfully purchased ${creditPackage.name}`);
          }
          this.isProcessing = false;
        },
        error: (error) => {
          this.notificationService.showError('Error processing purchase');
          this.isProcessing = false;
        }
      });
    } else {
      this.stripeService.createPaymentIntent(creditPackage.price * 100).subscribe({
        next: (response) => {
          this.stripeService.confirmPayment(response.clientSecret).then(() => {
            this.creditPackageService.purchasePackage(creditPackage._id).subscribe({
              next: () => {
                this.notificationService.showSuccess(`Successfully purchased ${creditPackage.name}`);
                this.isProcessing = false;
              },
              error: (error) => {
                this.notificationService.showError('Error processing purchase');
                this.isProcessing = false;
              }
            });
          }).catch((error) => {
            this.notificationService.showError('Payment failed: ' + error.message);
            this.isProcessing = false;
          });
        },
        error: (error) => {
          this.notificationService.showError('Error creating payment');
          this.isProcessing = false;
        }
      });
    }
  }
}
```

# frontend/src/app/components/code-analysis/code-analysis.component.ts

```ts
import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CodeService } from '../../services/code.service';
import { CreditService } from '../../services/credit.service';
import { CodeInputComponent } from '../code-input/code-input.component';
import { ResultDisplayComponent } from '../result-display/result-display.component';
import { FormGeneratorComponent } from '../form-generator/form-generator.component';

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

# frontend/src/app/components/code-input/code-input.component.ts

```ts
import { Component, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, inject, signal, computed, effect, PLATFORM_ID, ChangeDetectionStrategy, ChangeDetectorRef, DestroyRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, Subject } from 'rxjs';

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

interface ASTNode {
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

  private editor: any;
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
    if (this.isBrowser()) {
      this.initMonaco();
    }
  }

  updateCode(newCode: string) {
    this.code.set(newCode);
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

  private async initMonaco() {
    if (!this.editorContainer) {
      console.error('Editor container not found');
      return;
    }
    const monaco = await import('monaco-editor');
    monaco.languages.register({ id: 'formDefinition' });
    monaco.languages.setMonarchTokensProvider('formDefinition', {
      keywords: [
        'ENTRY', 'TEXT', 'NUMBER', 'DATE', 'BOOLEAN', 'LIST', 'SCALE', 'TABLE',
        'REQUIRED', 'DEFAULT', 'RANGE', 'MIN', 'MAX', 'COLUMN',
        'STOPWATCH', 'TIMER', 'WORK', 'BREAK', 'SESSIONS', 'LONG_BREAK', 'AFTER',
        'LAPS', 'MIN_LAPS', 'MAX_LAPS', 'MIN_MAX_LAPS', 'SESSION_LABELS'
      ],
      tokenizer: {
        root: [
          [/\/\/.*/, 'comment'],
          [/[a-zA-Z]\w*/, { cases: { '@keywords': 'keyword', '@default': 'identifier' } }],
          [/[WB](?=\s)/, 'phaseIdentifier'],
          [/".*?"/, 'string'],
          [/\d+/, 'number'],
          [/[{}]/, 'delimiter'],
        ]
      }
    });
    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this.code(),
      language: 'formDefinition',
      theme: 'vs-dark',
      minimap: { enabled: false }
    });
    
    this.editor.onDidChangeModelContent(() => {
      this.updateCode(this.editor.getValue());
      this.cdr.markForCheck();
    });

    this.destroyRef.onDestroy(() => {
      this.editor?.dispose();
    });
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
    const ast = this.parseEntry();
    
    // Add this log statement after parsing
    this.log('parsing', 'Parsed AST', ast);
    
    return ast;
  }
  

  private parseEntry(): ASTNode {
    this.log('parsing', 'Parsing ENTRY');
    const token = this.consume('KEYWORD', 'ENTRY');
    const description = this.consume('STRING').value;
    this.consume('BRACE', '{');
    
    const children = [];
    while (this.peek().type !== 'BRACE' || this.peek().value !== '}') {
      children.push(this.parseField());
    }
    
    this.consume('BRACE', '}');
    
    const lastToken = this.tokens()[this.current() - 1];
    return {
      type: 'ENTRY',
      description: description.slice(1, -1),
      children,
      line: lastToken.line,
      column: lastToken.column
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

  submitCode() {
    if (this.isValidCode()) {
      this.log('validation', 'Submitting code');
      this.codeSubmitted.emit(this.code());
    }
  }

  getLogs(): string[] {
    return this.logMessages();
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

# frontend/src/app/components/admin/user-detail.component.ts

```ts
// src/app/components/admin/user-detail.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AdminService, User } from '../../services/admin.service';
@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>User Details</h2>
    <mat-dialog-content>
      @if (user) {
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Role:</strong> {{ user.role }}</p>
        <p><strong>Status:</strong> {{ user.status || 'N/A' }}</p>
              <p><strong>Created At:</strong> {{ user.createdAt | date }}</p>
        <p><strong>Last Login:</strong> {{ user.lastLoginAt | date }}</p>
      } @else if (error) {
        <p>Error loading user details: {{ error }}</p>
      } @else {
        <p>Loading user details...</p>
      }
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  error: string | null = null;


  constructor(
    private adminService: AdminService,
    private dialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { userId: string }
  ) {}
  ngOnInit() {
    this.loadUserDetails();
  }

  loadUserDetails() {
    console.log('Loading user details. User ID:', this.data.userId); // Add this line
    if (!this.data.userId) {
      this.error = 'User ID is undefined';
      return;
    }
  
    this.adminService.getUser(this.data.userId).subscribe({
      next: (user) => {
        console.log('User details loaded:', user); // Add this line
        this.user = user;
      },
      error: (error) => {
        console.error('Error loading user details:', error);
        this.error = 'Failed to load user details. Please try again.';
      }
    });
  }

  close() {
    this.dialogRef.close();
  }


}
```

# frontend/src/app/components/admin/credit-package-dialog.component.ts

```ts
  // src/app/components/admin/credit-package-dialog.component.ts
  import { Component, Inject } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatInputModule } from '@angular/material/input';
  import { MatButtonModule } from '@angular/material/button';
  import { MatCheckboxModule } from '@angular/material/checkbox';
  import { CreditPackage } from '../../services/admin.service';
  
  @Component({
    selector: 'app-credit-package-dialog',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatCheckboxModule
    ],
    template: `
      <h2 mat-dialog-title>{{ data._id ? 'Edit' : 'Add' }} Credit Package</h2>
      <mat-dialog-content>
        <form [formGroup]="packageForm">
          <mat-form-field appearance="fill">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" required>
            <mat-error *ngIf="packageForm.get('name')?.hasError('required')">Name is required</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Credits</mat-label>
            <input matInput type="number" formControlName="credits" required>
            <mat-error *ngIf="packageForm.get('credits')?.hasError('required')">Credits is required</mat-error>
            <mat-error *ngIf="packageForm.get('credits')?.hasError('min')">Credits must be at least 1</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Price</mat-label>
            <input matInput type="number" formControlName="price" required>
            <mat-error *ngIf="packageForm.get('price')?.hasError('required')">Price is required</mat-error>
            <mat-error *ngIf="packageForm.get('price')?.hasError('min')">Price must be at least 0</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" required></textarea>
            <mat-error *ngIf="packageForm.get('description')?.hasError('required')">Description is required</mat-error>
          </mat-form-field>
          <mat-checkbox formControlName="isSubscription">Is Subscription</mat-checkbox>
          <mat-form-field appearance="fill">
            <mat-label>Duration (days)</mat-label>
            <input matInput type="number" formControlName="durationDays" required>
            <mat-error *ngIf="packageForm.get('durationDays')?.hasError('required')">Duration is required</mat-error>
            <mat-error *ngIf="packageForm.get('durationDays')?.hasError('min')">Duration must be at least 1 day</mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill">
            <mat-label>Stripe Price ID</mat-label>
            <input matInput formControlName="stripePriceId" required>
            <mat-error *ngIf="packageForm.get('stripePriceId')?.hasError('required')">Stripe Price ID is required</mat-error>
          </mat-form-field>
        </form>
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-raised-button color="primary" [disabled]="packageForm.invalid" (click)="onSubmit()">
          {{ data._id ? 'Update' : 'Create' }}
        </button>
      </mat-dialog-actions>
    `,
    styles: [`
      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    `]
  })
  export class CreditPackageDialogComponent {
    packageForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<CreditPackageDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Partial<CreditPackage>
    ) {
      this.packageForm = this.fb.group({
        name: [data.name || '', Validators.required],
        credits: [data.credits || '', [Validators.required, Validators.min(1)]],
        price: [data.price || '', [Validators.required, Validators.min(0)]],
        description: [data.description || '', Validators.required],
        isSubscription: [data.isSubscription || false],
        durationDays: [data.durationDays || 30, [Validators.required, Validators.min(1)]],
        stripePriceId: [data.stripePriceId || '', Validators.required]
      });
    }
    onCancel(): void {
      this.dialogRef.close();
    }

    onSubmit(): void {
      if (this.packageForm.valid) {
        const formData = this.packageForm.value;
        if (this.data._id) {
          formData._id = this.data._id;
        }
        this.dialogRef.close(formData);
      }
    }
  }
  
```

# frontend/src/app/components/admin/admin-user-management.component.ts

```ts
// src/app/components/admin/admin-user-management.component.ts

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AdminService, User } from '../../services/admin.service';
import { UserDetailComponent } from './user-detail.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-admin-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="user-management-container">
      <h2>User Management</h2>
      <mat-form-field>
        <input matInput (keyup)="applyFilter($event)" placeholder="Search users" #input>
      </mat-form-field>

      <div class="mat-elevation-z8">
        <table mat-table [dataSource]="dataSource" matSort>
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Email</th>
            <td mat-cell *matCellDef="let user">{{user.email}}</td>
          </ng-container>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
            <td mat-cell *matCellDef="let user">{{user.name}}</td>
          </ng-container>
          <ng-container matColumnDef="role">
            <th mat-header-cell *matHeaderCellDef mat-sort-header>Role</th>
            <td mat-cell *matCellDef="let user">{{user.role}}</td>
          </ng-container>
          <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
          <td mat-cell *matCellDef="let user">{{user.accountStatus || 'N/A'}}</td>
        </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let user">
              <button mat-button color="primary" (click)="openUserDetails(user)">View</button>
              <button mat-button color="warn" (click)="suspendUser(user)" *ngIf="user.status !== 'suspended'">Suspend</button>
              <button mat-button color="accent" (click)="activateUser(user)" *ngIf="user.status === 'suspended'">Activate</button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" showFirstLastButtons></mat-paginator>
      </div>
    </div>
  `,
  styles: [`
    .user-management-container {
      padding: 20px;
    }
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
    }
    table {
      width: 100%;
    }
  `]
})
export class AdminUserManagementComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['email', 'name', 'role', 'status', 'actions'];
  dataSource: MatTableDataSource<any>;
  isLoading = true;
  totalUsers = 0;
  pageSize = 10;
  currentPage = 1;
  searchTerm = '';
  private searchSubject = new Subject<string>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.currentPage = 1;
      this.loadUsers();
    });
  }


  ngOnInit() {
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadUsers() {
    this.isLoading = true;
    console.log('Loading users with params:', {
      page: this.currentPage,
      pageSize: this.pageSize,
      sort: this.sort?.active || 'name',
      order: this.sort?.direction || 'asc',
      search: this.searchTerm
    });

    this.adminService.getAllUsers(
      this.currentPage,
      this.pageSize,
      this.sort?.active || 'name',
      this.sort?.direction || 'asc',
      this.searchTerm
    ).subscribe({
      next: (response) => {
        console.log('Users loaded:', response);
        this.dataSource.data = response.users;
        this.totalUsers = response.total;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
        this.snackBar.open('Error loading users. Please try again later.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }
  sortData(sort: Sort) {
    this.loadUsers();
  }

  openUserDetails(user: User) {
    console.log('Opening user details for:', user); // Add this line for debugging
    this.dialog.open(UserDetailComponent, {
      width: '400px',
      data: { userId: user._id } // Change user.id to user._id
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.searchTerm = filterValue.trim().toLowerCase();
    this.searchSubject.next(this.searchTerm);
  }


  suspendUser(user: User) {
    if (confirm(`Are you sure you want to suspend ${user.name}?`)) {
      this.adminService.suspendUser(user._id).subscribe({
        next: (response) => {
          user.status = 'suspended';
          this.snackBar.open(`User ${user.name} has been suspended.`, 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error suspending user:', error);
          this.snackBar.open('Error suspending user. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }

  activateUser(user: User) {
    if (confirm(`Are you sure you want to activate ${user.name}?`)) {
      this.adminService.activateUser(user._id).subscribe({
        next: (response) => {
          user.status = 'active';
          this.snackBar.open(`User ${user.name} has been activated.`, 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error activating user:', error);
          this.snackBar.open('Error activating user. Please try again.', 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
  // testAdminRoute() {
  //   this.adminService.testAdminRoute().subscribe({
  //     next: (response) => {
  //       console.log('Admin route test successful:', response);
  //       this.snackBar.open('Admin route test successful', 'Close', { duration: 3000 });
  //     },
  //     error: (error) => {
  //       console.error('Admin route test failed:', error);
  //       this.snackBar.open('Admin route test failed', 'Close', { duration: 3000 });
  //     }
  //   });
  // }
  // testUsersRoute() {
  //   this.adminService.testUsersRoute().subscribe({
  //     next: (response) => {
  //       console.log('Users route test successful:', response);
  //       this.snackBar.open('Users route test successful', 'Close', { duration: 3000 });
  //     },
  //     error: (error) => {
  //       console.error('Users route test failed:', error);
  //       this.snackBar.open('Users route test failed', 'Close', { duration: 3000 });
  //     }
  //   });
  // }

}
```

# frontend/src/app/components/admin/admin-dashboard.component.ts

```ts
// src/app/components/admin/admin-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AdminService ,AnalyticsData} from '../../services/admin.service';
import { AdminUserManagementComponent } from './admin-user-management.component';
import { AdminCreditPackagesComponent } from './admin-credit-packages.component';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatCardModule, 
    MatProgressSpinnerModule, 
    MatTabsModule,
    MatSnackBarModule,
    AdminUserManagementComponent,
    AdminCreditPackagesComponent
  ],
  template: `
    <div class="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <mat-tab-group>
        <mat-tab label="Analytics">
          <ng-template matTabContent>
            <h2>Subscription Analytics</h2>
            @if (isLoading) {
              <div class="spinner-container">
                <mat-spinner></mat-spinner>
              </div>
            } @else if (analytics) {
              <div class="analytics-grid">
                <mat-card>
                  <mat-card-title>Active Subscribers</mat-card-title>
                  <mat-card-content>{{ analytics.activeSubscribers }}</mat-card-content>
                </mat-card>
                <mat-card>
                  <mat-card-title>Monthly Recurring Revenue</mat-card-title>
                  <mat-card-content>{{ analytics.monthlyRecurringRevenue.toFixed(2) }}</mat-card-content>
                </mat-card>
                <mat-card>
                  <mat-card-title>Churn Rate</mat-card-title>
                  <mat-card-content>{{ (analytics.churnRate * 100).toFixed(2) }}%</mat-card-content>
                </mat-card>
                <mat-card>
                  <mat-card-title>New Subscribers (Last 30 Days)</mat-card-title>
                  <mat-card-content>{{ analytics.newSubscribers }}</mat-card-content>
                </mat-card>
                <mat-card>
                  <mat-card-title>Average Revenue Per User</mat-card-title>
                  <mat-card-content>{{ analytics.averageRevenuePerUser.toFixed(2) }}</mat-card-content>
                </mat-card>
                <mat-card>
                  <mat-card-title>Subscription Growth Rate</mat-card-title>
                  <mat-card-content>{{ (analytics.subscriptionGrowthRate * 100).toFixed(2) }}%</mat-card-content>
                </mat-card>
              </div>
            } @else {
              <p class="error-message">Failed to load analytics data. Please try again later.</p>
            }
          </ng-template>
        </mat-tab>
        <mat-tab label="User Management">
          <ng-template matTabContent>
            <app-admin-user-management></app-admin-user-management>
          </ng-template>
        </mat-tab>
        <mat-tab label="Credit Packages">
          <ng-template matTabContent>
            <app-admin-credit-packages></app-admin-credit-packages>
          </ng-template>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      padding: 20px;
    }
    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    mat-card {
      text-align: center;
    }
    mat-card-content {
      font-size: 24px;
      font-weight: bold;
      margin-top: 10px;
    }
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
    }
    .error-message {
      color: red;
      text-align: center;
      font-size: 18px;
      margin-top: 20px;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  analytics: AnalyticsData | null = null;
  isLoading = true;
  private  router = inject(Router);
  constructor(
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {}


  ngOnInit() {
    this.loadAnalytics();
  }
  loadAnalytics() {
    console.log('Loading analytics...');
    this.isLoading = true;
    this.adminService.getSubscriptionAnalytics().subscribe({
      next: (data) => {
        console.log('Analytics data received:', data);
        this.analytics = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading analytics:', error);
        this.isLoading = false;
        this.analytics = null;
        if (error.status === 401) {
          console.log('Unauthorized access, redirecting to login');
          this.router.navigate(['/login']);
        } else {
          this.notificationService.showError('Error loading analytics. Please try again later.');
        }
      }
    });
  }
}  
```

# frontend/src/app/components/admin/admin-credit-packages.component.ts

```ts
// src/app/components/admin/admin-credit-packages.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { AdminService, CreditPackage } from '../../services/admin.service';
import { CreditPackageDialogComponent } from './credit-package-dialog.component';

@Component({
  selector: 'app-admin-credit-packages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  template: `
    <div class="credit-packages-container">
      <h2>Credit Packages</h2>
      <button mat-raised-button color="primary" (click)="openDialog()">Add New Package</button>
      
      <mat-form-field>
        <input matInput (keyup)="applyFilter($event)" placeholder="Filter packages">
      </mat-form-field>

      @if (isLoading) {
        <div class="spinner-container">
          <mat-spinner></mat-spinner>
        </div>
      } @else if (dataSource.data.length) {
        <div class="mat-elevation-z8">
          <table mat-table [dataSource]="dataSource" matSort>
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
              <td mat-cell *matCellDef="let creditPackage">{{creditPackage.name}}</td>
            </ng-container>
            <ng-container matColumnDef="credits">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Credits</th>
              <td mat-cell *matCellDef="let creditPackage">{{creditPackage.credits}}</td>
            </ng-container>
            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Price</th>
              <td mat-cell *matCellDef="let creditPackage">{{creditPackage.price | currency}}</td>
            </ng-container>
            <ng-container matColumnDef="isSubscription">
              <th mat-header-cell *matHeaderCellDef mat-sort-header>Subscription</th>
              <td mat-cell *matCellDef="let creditPackage">{{creditPackage.isSubscription ? 'Yes' : 'No'}}</td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let creditPackage">
                <button mat-icon-button color="primary" (click)="openDialog(creditPackage)">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deletePackage(creditPackage)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]" showFirstLastButtons></mat-paginator>
        </div>
      } @else {
        <p>No credit packages found.</p>
      }
    </div>
  `,
  styles: [`
    .credit-packages-container {
      padding: 20px;
    }
    .spinner-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
    }
    table {
      width: 100%;
    }
    button[mat-raised-button] {
      margin-bottom: 20px;
    }
  `]
})
export class AdminCreditPackagesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'credits', 'price', 'isSubscription', 'actions'];
  dataSource = new MatTableDataSource<CreditPackage>([]);
  isLoading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<CreditPackage>([]);
  }

  ngOnInit() {
    this.loadCreditPackages();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  
  loadCreditPackages() {
    this.isLoading = true;
    this.adminService.getAllCreditPackages().subscribe({
      next: (packages) => {
        this.dataSource.data = packages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading credit packages:', error);
        this.isLoading = false;
        this.snackBar.open('Error loading credit packages. Please try again later.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  openDialog(creditPackage?: CreditPackage) {
    const dialogRef = this.dialog.open(CreditPackageDialogComponent, {
      width: '400px',
      data: creditPackage || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result._id) {
          this.updatePackage(result);
        } else {
          this.createPackage(result);
        }
      }
    });
  }

  createPackage(packageData: Partial<CreditPackage>) {
    this.isLoading = true;
    
    // Validate required fields
    const requiredFields: (keyof CreditPackage)[] = ['name', 'credits', 'price', 'description'];
    const missingFields = requiredFields.filter(field => !packageData[field]);
    
    if (missingFields.length > 0) {
      this.snackBar.open(
        `Missing required fields: ${missingFields.join(', ')}`, 
        'Close', 
        { duration: 5000, panelClass: ['error-snackbar'] }
      );
      this.isLoading = false;
      return;
    }

    // Ensure all required fields are present
    const newPackage: Omit<CreditPackage, '_id'> = {
      name: packageData.name!,
      credits: packageData.credits!,
      price: packageData.price!,
      description: packageData.description!,
      isSubscription: packageData.isSubscription ?? false,
      durationDays: packageData.durationDays ?? 30,
      stripePriceId: packageData.stripePriceId ?? 'placeholder_stripe_id'
    };

    console.log('Creating credit package:', newPackage);

    this.adminService.createCreditPackage(newPackage).subscribe({
      next: (createdPackage) => {
        console.log('Credit package created successfully:', createdPackage);
        this.dataSource.data = [...this.dataSource.data, createdPackage];
        this.snackBar.open('Credit package created successfully', 'Close', { duration: 3000 });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error creating credit package:', error);
        this.snackBar.open(
          `Error creating credit package: ${error.message}`, 
          'Close', 
          { duration: 5000, panelClass: ['error-snackbar'] }
        );
        this.isLoading = false;
      }
    });
  }
  updatePackage(packageData: CreditPackage) {
    if (!packageData._id) {
      this.snackBar.open('Unable to update: Credit package ID is missing', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.adminService.updateCreditPackage(packageData._id, packageData).subscribe({
      next: (updatedPackage) => {
        const index = this.dataSource.data.findIndex(p => p._id === updatedPackage._id);
        if (index !== -1) {
          this.dataSource.data[index] = updatedPackage;
          this.dataSource.data = [...this.dataSource.data];
        }
        this.snackBar.open('Credit package updated successfully', 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error updating credit package:', error);
        this.snackBar.open('Error updating credit package. Please try again.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  deletePackage(creditPackage: CreditPackage) {
    if (!creditPackage._id) {
      this.snackBar.open('Unable to delete: Credit package ID is missing', 'Close', {
        duration: 5000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    if (confirm(`Are you sure you want to delete the package "${creditPackage.name}"?`)) {
      this.adminService.deleteCreditPackage(creditPackage._id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(p => p._id !== creditPackage._id);
          this.snackBar.open('Credit package deleted successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error deleting credit package:', error);
          this.snackBar.open(
            `Error deleting credit package: ${error.message}`, 
            'Close', 
            { duration: 5000, panelClass: ['error-snackbar'] }
          );
        }
      });
    }
  }
}
```

# frontend/src/app/components/workspace/workspace-list/workspace-list.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { WorkspaceService, Workspace, WorkspacesResponse } from '../../../services/workspace.service';

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
//frontend/src/app/components/workspace/workspace-detail/workspace-detail.component.ts
import { Component, OnInit, OnDestroy, inject, HostListener } from '@angular/core';
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
import { WorkspaceService, Workspace } from '../../../services/workspace.service';
import { WebSocketService } from '../../../services/web-socket.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';
import { CursorPositionService } from '../../../services/cursor-position.service';
import { PermissionManagementComponent } from '../permission-management/permission-management.component';
import { AuthService } from '../../../services/auth.service';
import { ActivityLogComponent } from '../activity-log/activity-log.component';

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
    ActivityLogComponent
  ],
  template: `
    @if (loading) {
      <mat-spinner></mat-spinner>
    } @else if (workspace) {
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ workspace.name }}</mat-card-title>
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
              <mat-list-item>{{ user }}</mat-list-item>
            }
          </mat-list>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="onSubmit()">Save</button>
          <button mat-raised-button color="warn" (click)="onDelete()">Delete</button>
        </mat-card-actions>
      </mat-card>
    } @else {
      <p>Workspace not found.</p>
    }
    @if (canManageUsers) {
      <app-permission-management
        [members]="workspace?.members || []"
        [workspaceId]="workspace?._id || ''"
        (permissionsUpdated)="onPermissionsUpdated()">
      </app-permission-management>

      <app-activity-log [workspaceId]="workspaceId"></app-activity-log>
    }
  `,
  styles: [/* ... styles remain the same ... */]
})
export class WorkspaceDetailComponent implements OnInit, OnDestroy {
  workspace: Workspace | null = null;
  loading = true;
  workspaceForm: FormGroup;

  private workspaceUpdateSubscription: Subscription | null = null;
  


  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private workspaceService = inject(WorkspaceService);
  private webSocketService = inject(WebSocketService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private formBuilder = inject(FormBuilder);


  activeUsers: string[] = [];
  private activeUsersSubscription: Subscription | null = null;

  cursorPositions: {[userId: string]: {x: number, y: number}} = {};
  private cursorSubscription: Subscription | null = null;
  canManageUsers: boolean = false;
  private authService = inject(AuthService);

  //log activity
  workspaceId: string = '';

  constructor(
    private cursorPositionService: CursorPositionService
  ) {
    this.workspaceForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.workspaceId = id;
      this.loadWorkspace(id);
      this.webSocketService.joinWorkspace(id);
      this.subscribeToWorkspaceUpdates(id);
      this.subscribeToActiveUsers();
    } else {
      this.loading = false;
    }
    this.subscribeToActiveUsers();
    this.subscribeToCursorPositions();
    this.checkUserPermissions();
  }
  
  ngOnDestroy(): void {
    if (this.workspace) {
      this.webSocketService.leaveWorkspace(this.workspace._id);
    }
    if (this.workspaceUpdateSubscription) {
      this.workspaceUpdateSubscription.unsubscribe();
    }
    if (this.activeUsersSubscription) {
      this.activeUsersSubscription.unsubscribe();
    }

    if (this.cursorSubscription) {
      this.cursorSubscription.unsubscribe();
    }

  }



  private checkUserPermissions() {
    const currentUser = this.authService.currentUserValue;
    if (this.workspace && currentUser) {
      const currentMember = this.workspace.members.find(m => m.user === currentUser.id);
      this.canManageUsers = currentMember?.role === 'owner' || currentMember?.role === 'admin' || !!currentMember?.permissions?.manageUsers;
    }
  }

  onPermissionsUpdated() {
    if (this.workspace) {
      this.loadWorkspace(this.workspace._id);
    }

  }
  private subscribeToCursorPositions() {
    this.cursorSubscription = this.cursorPositionService.getCursorPositions()
      .subscribe(positions => {
        this.cursorPositions = positions;
      });
  }


  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.workspace) {
      const position = { x: event.clientX, y: event.clientY };
      this.cursorPositionService.updatePosition(this.workspace._id, position);
    }
  }

  private subscribeToActiveUsers(): void {
    this.activeUsersSubscription = this.webSocketService.getActiveUsers().subscribe(
      (users: string[]) => {
        this.activeUsers = users;
      }
    );
  }
  

  loadWorkspace(id: string): void {
    this.workspaceService.getWorkspace(id).subscribe({
      next: (workspace) => {
        this.workspace = workspace;
        this.workspaceForm.patchValue({
          name: workspace.name,
          description: workspace.description
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading workspace', error);
        this.snackBar.open('Error loading workspace. Please try again.', 'Close', { duration: 5000 });
        this.loading = false;
      }
    });
  }

  private subscribeToWorkspaceUpdates(workspaceId: string): void {
    this.workspaceUpdateSubscription = this.webSocketService.getWorkspaceUpdates().subscribe(
      update => {
        if (update && update.workspace._id === workspaceId) {
          this.workspace = update.workspace;
          this.workspaceForm.patchValue({
            name: update.workspace.name,
            description: update.workspace.description
          });
        }
      }
    );
  }

  onSubmit(): void {
    if (this.workspaceForm.valid && this.workspace) {
      const { name, description } = this.workspaceForm.value;
      this.workspaceService.updateWorkspace(this.workspace._id, name, description).subscribe({
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

  onDelete(): void {
    if (this.workspace) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Delete Workspace',
          message: `Are you sure you want to delete the workspace "${this.workspace.name}"?`
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.workspaceService.deleteWorkspace(this.workspace!._id).subscribe({
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
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkspaceMember, WorkspaceService } from '../../../services/workspace.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

# frontend/src/app/components/workspace/activity-log/activity-log.component.ts

```ts
//frontend/src/app/components/workspace/activity-log/activity-log.component.ts
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { WorkspaceService } from '../../../services/workspace.service';
import { ActivityLog, ActivityLogsResponse } from '../../../interfaces/activity-log.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [CommonModule, MatListModule, MatPaginatorModule],
  template: `
    <h3>Activity Log</h3>
    <mat-list>
      @for (log of activityLogs; track log._id) {
        <mat-list-item>
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
  `]
})
export class ActivityLogComponent implements OnInit, OnDestroy {
    @Input() workspaceId!: string;
    activityLogs: ActivityLog[] = [];
    totalLogs: number = 0;
    pageSize: number = 10;
    currentPage: number = 1;
    private subscription: Subscription | null = null;
  
    constructor(private workspaceService: WorkspaceService) {}
  
    ngOnInit() {
      this.loadActivityLogs();
      this.subscribeToRealtimeUpdates();
    }
  
    ngOnDestroy() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }
  
    loadActivityLogs() {
      this.workspaceService.getActivityLogs(this.workspaceId, this.currentPage, this.pageSize)
        .subscribe({
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

# frontend/src/app/components/workspace/confirm-dialog/confirm-dialog.component.ts

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
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}
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

