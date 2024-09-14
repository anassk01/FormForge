// /backend/src/controllers/workspace.controller.ts
import { Response ,Request} from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
<<<<<<< HEAD
import { Workspace, IWorkspace ,IFolder , IForm} from '../models/workspace.model';
=======
import { Workspace, IWorkspace ,IFolder , IForm,IFormSubmission,ITimeManagementData} from '../models/workspace.model';
>>>>>>> 643a323 (V1.0)
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
  
<<<<<<< HEAD
      const newForm: IForm = {
        _id: new mongoose.Types.ObjectId(),
        name,
        structure: {
          ...structure,
          parsedFields: structure.fields // Ensure we're storing the parsed fields
        },
        isTemplate,
        parentTemplateId: parentTemplateId ? new mongoose.Types.ObjectId(parentTemplateId) : undefined,
=======
      let parentTemplateObjectId: mongoose.Types.ObjectId | undefined;
      if (parentTemplateId && parentTemplateId !== 'undefined' && !parentTemplateId.startsWith('temp_')) {
        try {
          parentTemplateObjectId = new mongoose.Types.ObjectId(parentTemplateId);
        } catch (error) {
          console.error('Invalid parentTemplateId:', parentTemplateId);
          res.status(400).json({ message: 'Invalid parentTemplateId' });
          return;
        }
      }
  
      const newForm: IForm = {
        _id: new mongoose.Types.ObjectId(),
        name,
        structure: structure, // Ensure structure is passed
        isTemplate,
        parentTemplateId: parentTemplateObjectId,
        state: isTemplate ? 'template' : 'new_instance',
>>>>>>> 643a323 (V1.0)
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
<<<<<<< HEAD
  
=======
>>>>>>> 643a323 (V1.0)

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
<<<<<<< HEAD

  export const submitForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const { workspaceId, folderId, formId } = req.params;
      const { values, structure } = req.body;
  
      console.log('Received form submission:', { workspaceId, folderId, formId, values, structure });
  
=======
  export const submitForm = async (req: Request, res: Response): Promise<void> => {
    try {
      const { workspaceId, folderId, formId } = req.params;
      const { values } = req.body;
  
      console.log('Received form submission:', { workspaceId, folderId, formId, values });
  
      if (!values) {
        res.status(400).json({ message: 'Form values are required' });
        return;
      }

>>>>>>> 643a323 (V1.0)
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
<<<<<<< HEAD
      const formattedDate = currentDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
      let submittedInstance;
=======
>>>>>>> 643a323 (V1.0)
  
      if (form.isTemplate) {
        // Create a new instance based on the template
        const newInstance: IForm = {
          _id: new mongoose.Types.ObjectId(),
<<<<<<< HEAD
          name: `${form.name} - Instance ${formattedDate}`,
          structure: structure || form.structure || {},
          isTemplate: false,
          parentTemplateId: form._id,
          values: values,
=======
          name: `${form.name} - Instance ${currentDate.toISOString().split('T')[0]}`,
          structure: form.structure,
          isTemplate: false,
          parentTemplateId: form._id,
          values: processFormValues(values),
          state: 'submitted_instance',
>>>>>>> 643a323 (V1.0)
          createdAt: currentDate,
          updatedAt: currentDate,
          submissions: [{
            _id: new mongoose.Types.ObjectId(),
<<<<<<< HEAD
            values: values,
            submissionDate: currentDate,
            createdAt: currentDate,
            updatedAt: currentDate
=======
            values: processFormValues(values),
            submissionDate: currentDate
>>>>>>> 643a323 (V1.0)
          }]
        };
  
        folder.forms.push(newInstance);
<<<<<<< HEAD
        submittedInstance = newInstance;
      } else {
        // Submit to an existing instance
        const newSubmission = {
          _id: new mongoose.Types.ObjectId(),
          values: values,
          submissionDate: currentDate,
          createdAt: currentDate,
          updatedAt: currentDate
=======
        console.log('New instance created:', newInstance);
        res.status(201).json({ 
          message: 'New instance created and submitted successfully', 
          instance: newInstance 
        });
      } else {
        // Submit to an existing instance
        const newSubmission: IFormSubmission = {
          _id: new mongoose.Types.ObjectId(),
          values: processFormValues(values),
          submissionDate: currentDate
>>>>>>> 643a323 (V1.0)
        };
  
        if (!form.submissions) {
          form.submissions = [];
        }
        form.submissions.push(newSubmission);
<<<<<<< HEAD
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
=======
        form.values = processFormValues(values);
        form.updatedAt = currentDate;
        form.state = 'submitted_instance';
  
        console.log('Existing instance updated:', form);
        res.status(200).json({ 
          message: 'Form submitted successfully', 
          instance: form 
        });
      }
  
      await workspace.save();

      if (values.workout_timer) {
        console.log('Workout Timer Details:');
        console.log('Completed Sessions:', JSON.stringify(values.workout_timer.completedSessions, null, 2));
        console.log('Current Phase:', values.workout_timer.currentPhase);
        console.log('Current Session:', values.workout_timer.currentSession);
        console.log('Total Time:', values.workout_timer.totalTime);
      }
  
      if (values.rest_time) {
        console.log('Rest Time Details:');
        console.log('Laps:', JSON.stringify(values.rest_time.laps, null, 2));
        console.log('Total Time:', values.rest_time.totalTime);
      }
  
>>>>>>> 643a323 (V1.0)
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ message: 'Error submitting form', error: (error as Error).message });
    }
  };

<<<<<<< HEAD

=======
  function processFormValues(values: any): any {
    if (!values || typeof values !== 'object') {
      return {};
    }
  
    const processedValues: any = {};
    for (const [key, value] of Object.entries(values)) {
      if (isTimeManagementField(value)) {
        processedValues[key] = processTimeManagementField(value);
      } else if (Array.isArray(value)) {
        processedValues[key] = value.map(item => processFormValues(item));
      } else if (value instanceof Date) {
        processedValues[key] = value.toISOString();
      } else if (typeof value === 'object' && value !== null) {
        processedValues[key] = processFormValues(value);
      } else {
        processedValues[key] = value;
      }
    }
    return processedValues;
  }
  

  function isTimeManagementField(value: any): value is ITimeManagementData {
    return value && typeof value === 'object' && 'type' in value && 'data' in value &&
      (value.type === 'STOPWATCH' || value.type === 'TIMER');
  }


  function processTimeManagementField(field: any): any {
    if (field.type === 'STOPWATCH') {
      return {
        laps: field.laps,
        totalTime: field.totalTime,
        completed: field.completed
      };
    } else if (field.type === 'TIMER') {
      return {
        completedSessions: field.completedSessions,
        currentPhase: field.currentPhase,
        currentSession: field.currentSession,
        totalTime: field.totalTime,
        completed: field.completed
      };
    }
    return field;
  }
  
  
  

    
>>>>>>> 643a323 (V1.0)
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
<<<<<<< HEAD
  };
=======
  };

  export const getSubmittedInstance = async (req: Request, res: Response): Promise<void> => {
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
  
      const form = folder.forms.find(f => f._id.toString() === formId);
      if (!form) {
        res.status(404).json({ message: 'Form not found' });
        return;
      }
  
      if (form.isTemplate || form.state !== 'submitted_instance') {
        res.status(400).json({ message: 'This form is not a submitted instance' });
        return;
      }
  
      res.status(200).json(form);
    } catch (error) {
      console.error('Error retrieving submitted instance:', error);
      res.status(500).json({ message: 'Error retrieving submitted instance', error: (error as Error).message });
    }
  };

>>>>>>> 643a323 (V1.0)
