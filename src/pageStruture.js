/*
  eslint-disable no-underscore-dangle
*/
import projects from "./projects";
import storage from "./localStorageModule";

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

  const projectForm = document.createElement("form");
  projectForm.id = "new-project";
  const projectFormNameInput = document.createElement("input");
  projectFormNameInput.type = "text";
  projectFormNameInput.placeholder = "project title";
  projectFormNameInput.name = "title";
  const projectFormSubmitButton = document.createElement("button");
  projectFormSubmitButton.type = "submit";
  projectFormSubmitButton.innerText = "Create Project";

  projects().length > 0 && projectContainer.appendChild(projectsSelect);
  if (projects().length > 0) {
    const deleteProject = document.createElement("button");
    deleteProject.innerText = "Delete project";
    deleteProject.id = "delete-project";
    deleteProject.classList.add("btn", "btn-danger");

    projectContainer.appendChild(deleteProject);
  }
  projectContainer.appendChild(addNewProject);
  projectForm.appendChild(projectFormNameInput);
  projectForm.appendChild(projectFormSubmitButton);

  const taskContainer = document.createElement("div");
  taskContainer.id = "task-container";
  if (projects().length > 0) {
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
    selectedProject &&
      selectedProject._tasks.forEach((task, taskIndex) => {
        selectedProjectLists += `

        <h5>${task._title}</h5>
        <h5>${task._description}</h5>
        <h5>${task._dueDate}</h5>
        <h5>${task._priority}</h5>
        <h5>${task._status}</h5>
        <h5>${task._note}</h5>
        <div class="d-flex ">
          <button class="edit-task mx-2 btn btn-warning" id="edit-task-${taskIndex}" value='${taskIndex}'>
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
    taskUnorderList.innerHTML = selectedProjectLists;

    const addTaskContainer = document.createElement("div");
    addTaskContainer.id = "add-task-container";

    const addTaskButton = document.createElement("button");
    addTaskButton.id = "add-task";
    addTaskButton.classList.add("btn", "btn-success");
    addTaskButton.innerText = "Add new task";

    taskContainer.appendChild(taskUnorderList);

    addTaskContainer.appendChild(addTaskButton);
    taskContainer.appendChild(addTaskContainer);
  }

  const taskForm = document.createElement("form");
  if (projects().length > 0) {
    taskForm.id = "new-update-task";
    const taskFormTitleInput = document.createElement("input");
    taskFormTitleInput.type = "text";
    taskFormTitleInput.placeholder = "task title";
    taskFormTitleInput.name = "title";

    const taskFormDescriptionInput = document.createElement("textarea");
    taskFormDescriptionInput.placeholder = "description";
    taskFormDescriptionInput.name = "description";

    const taskFormDueDateInput = document.createElement("input");
    taskFormDueDateInput.type = "date";
    taskFormDueDateInput.name = "due-date";

    const taskFormPriorityInput = document.createElement("select");
    taskFormPriorityInput.id = "priority-status";
    taskFormPriorityInput.name = "priority";
    taskFormPriorityInput.required = true;

    let prioritySelectOptions = "";
    storage.priorityOptions.forEach((option) => {
      prioritySelectOptions += `
        <option value=${option}>${option}</option>
    `;
    });
    taskFormPriorityInput.innerHTML = prioritySelectOptions;

    const taskFormStatusInput = document.createElement("select");
    taskFormStatusInput.id = "status";
    taskFormStatusInput.name = "status";
    taskFormPriorityInput.required = true;

    let statusSelectOptions = "";
    storage.statusOptions.forEach((option) => {
      statusSelectOptions += `
        <option value=${option}>${option}</option>
    `;
    });
    taskFormStatusInput.innerHTML = statusSelectOptions;

    const taskFormNoteInput = document.createElement("textarea");
    taskFormNoteInput.placeholder = "note";
    taskFormNoteInput.name = "note";

    const taskFormSubmitButton = document.createElement("button");
    taskFormSubmitButton.type = "submit";
    taskFormSubmitButton.name = "task-submit";

    taskForm.appendChild(taskFormTitleInput);
    taskForm.appendChild(taskFormDescriptionInput);
    taskForm.appendChild(taskFormDueDateInput);
    taskForm.appendChild(taskFormPriorityInput);
    taskForm.appendChild(taskFormStatusInput);
    taskForm.appendChild(taskFormNoteInput);
    taskForm.appendChild(taskFormSubmitButton);
  }

  content.appendChild(projectContainer);
  content.appendChild(projectForm);
  content.appendChild(taskContainer);
  content.appendChild(taskForm);

  return content;
};

export default PageStructure;
