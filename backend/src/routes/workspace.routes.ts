
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
