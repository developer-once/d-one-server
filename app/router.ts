import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // ----- User -----
  router.post('/api/user/create', controller.user.createUser);
  router.post('/api/user/login', controller.user.getUser);

  // ----- Project -----
  router.post('/api/project/create', controller.project.create);
  router.post('/api/project/set', controller.project.set);
  router.get('/api/project/get', controller.project.getProject);
  router.get('/api/project/get/list', controller.project.getUserProjectList);
};
