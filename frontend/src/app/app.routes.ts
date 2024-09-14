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