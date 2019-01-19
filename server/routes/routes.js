const tracker = require('../controllers/trackerList');
const client = require('../controllers/createClient');
const project = require('../controllers/createProject');
const workspace = require('../controllers/userWorkspace');
// const user = require('../controllers/createUser');

module.exports = (app) => {

    // "Workspace" Operations
    app.post('/api/signup', workspace.signup);
    app.post('/api/login', workspace.login);
    app.get('/api/workspace', workspace.get);
    // // app.get('/api/workspace/:workId', workspace.fetch);
    app.patch('/api/workspace/:workspaceId', workspace.update);
    app.delete('/api/workspace/:workspaceId', workspace.delete);
    app.post('/api/workspace/:workspaceId/invite', workspace.invite);

    // "Client" Operations
    app.post('/api/client/:workspaceId', client.create);
    app.get('/api/client/:workspaceId', client.get);
    app.patch('/api/client/:workspaceId/:clientId', client.update);
    app.delete('/api/client/:workspaceId/:clientId', client.delete);
    
    // "Project" Operations
    app.post('/api/project/:workspaceId', project.createProject);
    app.get('/api/project/:workspaceId', project.fetchAllProject);
    app.get('/api/project/:workspaceId/:projectId', project.fetchSingleProject)
    app.patch('/api/project/:workspaceId/:projectId', project.updateProject);
    app.patch('/api/project/:workspaceId/:projectId/addmember', project.addMember);
    app.delete('/api/project/:workspaceId/:projectId', project.deleteProject);
    
    // "Tracker" Operations
    app.post('/api/tracker', tracker.create);
    app.get('/api/tracker', tracker.get);
    app.patch('/api/tracker/:trackerId', tracker.update);
    app.delete('/api/tracker/:trackerId', tracker.delete);

}
