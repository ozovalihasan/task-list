/*
  eslint-disable no-underscore-dangle
*/
import projects from "./projects";
import storage from "./localStorageModule";
import { projectExist } from "./projects";

const PageStructure = () => {
  const content = document.getElementById("content");
  const projectContainer = document.createElement("div");

  const projectsSelect = document.createElement("select");
  projectsSelect.id = "selected-project";
  projectsSelect.classList = "selected-project";
  projectsSelect.required = true;

  let projectsSelectOptions = "";
  projects().forEach((project, projectIndex) => {
    projectsSelectOptions += `
        <option value=${projectIndex}>${project._name} <span class=""></span> </option>
    `;
  });
  projectsSelect.innerHTML = projectsSelectOptions;
  projectsSelect.value =
    storage.getSelectedProject() || storage.setSelectedProject(0);

  const addNewProject = document.createElement("button");
  addNewProject.innerText = "Add new project";
  addNewProject.classList.add("btn", "btn-success");
  addNewProject.id = "add-project";
  addNewProject.setAttribute("data-toggle", "modal");
  addNewProject.setAttribute("data-target", "#projectModal");
  if (projectExist()) {
    projectContainer.appendChild(projectsSelect);
    const deleteProject = document.createElement("button");
    deleteProject.innerText = "Delete project";
    deleteProject.id = "delete-project";
    deleteProject.classList.add("btn", "btn-danger");

    projectContainer.appendChild(deleteProject);
  }
  projectContainer.appendChild(addNewProject);

  const taskContainer = document.createElement("div");
  taskContainer.id = "task-container";
  if (projectExist()) {
    const taskUnorderList = document.createElement("ul");
    taskUnorderList.id = "task-order-list";

    const selectedProject = projects()[projectsSelect.value];

    let selectedProjectLists = `
        <h5>Title</h5>
        <h5>Description</h5>
        <h5>DueDate</h5>
        <h5>Priority</h5>
        <h5>Status</h5>
        <h5>Note</h5>
        <div></div>
  `;
    if (selectedProject) {
      selectedProject._tasks.forEach((task, taskIndex) => {
        selectedProjectLists += `
        <h5>${task._title}</h5>
        <h5>${task._description}</h5>
        <h5>${task._dueDate}</h5>
        <h5>${task._priority}</h5>
        <h5>${task._status}</h5>
        <h5>${task._note}</h5>
        <div class="d-flex ">
          <button class="edit-task mx-2 btn btn-warning" id="edit-task-${taskIndex}" value='${taskIndex}' data-toggle="modal" data-target="#taskModal">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>
          </button>
          <button class="delete-task mx-2 btn btn-danger" id="delete-task-${taskIndex}" value='${taskIndex}'>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>
            </svg>
          </button>
        </div>
    `;
      });
    }
    taskUnorderList.innerHTML = selectedProjectLists;

    const addTaskContainer = document.createElement("div");
    addTaskContainer.id = "add-task-container";

    const addTaskButton = document.createElement("button");
    addTaskButton.id = "add-task";
    addTaskButton.classList.add("btn", "btn-success");
    addTaskButton.innerText = "Add new task";
    addTaskButton.setAttribute("data-toggle", "modal");
    addTaskButton.setAttribute("data-target", "#taskModal");

    taskContainer.appendChild(taskUnorderList);

    addTaskContainer.appendChild(addTaskButton);
    taskContainer.appendChild(addTaskContainer);
  }

  const projectFormModal = document.createElement("div");
  projectFormModal.classList.add("modal");
  projectFormModal.id = "projectModal";
  projectFormModal.tabindex = "-1";

  const projectFormModalContent = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form id="new-project">
          <div class="modal-body">
            <div class="form-group">
              <label for="new-project-modal">Project Title</label>
              <input
                type="text"
                class="form-control"
                id="new-project-modal"
                name="title"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" data-toggle="modal" data-target="#projectModal" class="btn btn-success">Create Project</button>
          </div>
        </form>
      </div>
    </div>
  `;
  projectFormModal.innerHTML = projectFormModalContent;

  const taskFormModal = document.createElement("div");
  taskFormModal.classList.add("modal");
  taskFormModal.id = "taskModal";
  taskFormModal.tabindex = "-1";

  let statusSelectOptions = "";
  storage.statusOptions.forEach((option) => {
    statusSelectOptions += `
        <option value=${option}>${option}</option>
    `;
  });

  let prioritySelectOptions = "";
  storage.priorityOptions.forEach((option) => {
    prioritySelectOptions += `
        <option value=${option}>${option}</option>
    `;
  });

  const taskFormModalContent = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form id="new-update-task">
          <div class="modal-body">
            <div class="form-group">
              <label for="new-project-modal">Name</label>
              <input
                type="text"
                class="form-control"
                id="title"
                name="title"
              />
            </div>
            <div class="form-group">
              <label for="new-project-modal">Description</label>
              <textarea 
                class="form-control"
                id="description"
                name="description"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="new-project-modal">Due-Date</label>
              <input
                type="date"
                class="form-control"
                id="due-date"
                name="due-date"
              />
            </div>
            <div class="form-group">
              <label for="new-project-modal">Priority</label>
              <select
                type="text"
                class="form-control"
                id="priority-status"
                name="priority"
                required
              >
              ${prioritySelectOptions}
              </select>
            </div>        
            <div class="form-group">
              <label for="new-project-modal">Status</label>
              <select
                type="text"
                class="form-control"
                id="status"
                name="status"
                required
              >
              ${statusSelectOptions}
              </select>
            </div>
            <div class="form-group">
              <label for="new-project-modal">Note</label>
              <textarea
                type="text"
                class="form-control"
                id="note"
                name="note"
              ></textarea>
            </div>                
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" data-toggle="modal" data-target="#taskModal" class="btn btn-success" name="task-submit" ></button>
          </div>
        </form>
      </div>
    </div>
  `;
  taskFormModal.innerHTML = taskFormModalContent;

  content.appendChild(projectContainer);
  content.appendChild(taskContainer);
  content.appendChild(projectFormModal);
  content.appendChild(taskFormModal);

  return content;
};

export default PageStructure;
