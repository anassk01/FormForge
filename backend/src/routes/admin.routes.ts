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
