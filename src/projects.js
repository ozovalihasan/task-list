import setDefaultProject from "./initializeProject";

import storage from "./localStorageModule";

const projects = () => storage.getProjects() || setDefaultProject();
const projectExist = () => {
  if (projects().length > 0) {
    return true;
  } else {
    return false;
  }
};

export default projects;
export { projectExist };
