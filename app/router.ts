import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // ----- User -----
  router.post('/user/create', controller.user.createUser);
  router.post('/user/login', controller.user.getUser);

  // ----- Project -----
  router.post('/project/create', controller.project.create);
  router.post('/project/set', controller.project.set);
  router.get('/project/get', controller.project.getProject);
  router.get('/project/get/list', controller.project.getUserProjectList);
};
