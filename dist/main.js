!function(e){var t={};function n(a){if(t[a])return t[a].exports;var s=t[a]={i:a,l:!1,exports:{}};return e[a].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(a,s,function(t){return e[t]}.bind(null,s));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class a{constructor(e){this.name=e,this.tasks=[]}get name(){return this._name}set name(e){this._name=e}get tasks(){return this._tasks}set tasks(e){this._tasks=e}addTask(e){this.tasks.push(e)}deleteTask(e){this.tasks.splice(e,1)}}class s{constructor(e,t,n,a,s,o){this.title=e,this.description=t,this.dueDate=n,this.priority=a,this.status=s,this.note=o}get title(){return this._title}set title(e){this._title=e}get description(){return this._description}set description(e){this._description=e}get dueDate(){return this._dueDate}set dueDate(e){this._dueDate=e}get priority(){return this._priority}set priority(e){this._priority=e}get status(){return this._status}set status(e){this._status=e}get note(){return this._note}set note(e){this._note=e}}var o={getProjects:()=>localStorage.projects&&JSON.parse(localStorage.projects),getSelectedProject:()=>localStorage.selectedProject&&JSON.parse(localStorage.selectedProject),setProjects:e=>{localStorage.projects=JSON.stringify(e)},setSelectedProject:e=>(localStorage.selectedProject=JSON.stringify(e),e),priorityOptions:["Low","High"],statusOptions:["Incomplete","Completed"]};var l=()=>o.getProjects()||function(){const e=new a("Default Project"),t=new s("Adding a new project","Add a project and a task","2020-10-22","High","Incomplete","It is necessary to be done as soon as possible");e.addTask(t);const n=[e];return o.setProjects(n),n}();var d=()=>{const e=document.getElementById("content"),t=document.createElement("div"),n=document.createElement("select");n.id="selected-project",n.classList="selected-project",n.required=!0;let a="";l().forEach((e,t)=>{a+=`\n        <option value=${t}>${e._name} <span class=""></span> </option>\n    `}),n.innerHTML=a,n.value=o.getSelectedProject()||o.setSelectedProject(0);const s=document.createElement("button");if(s.innerText="Add new project",s.classList.add("btn","btn-success"),s.id="add-project",s.setAttribute("data-toggle","modal"),s.setAttribute("data-target","#projectModal"),l().length>0){t.appendChild(n);const e=document.createElement("button");e.innerText="Delete project",e.id="delete-project",e.classList.add("btn","btn-danger"),t.appendChild(e)}t.appendChild(s);const d=document.createElement("div");if(d.id="task-container",l().length>0){const e=document.createElement("ul");e.id="task-order-list";const t=l()[n.value];let a="\n        <h5>Title</h5>\n        <h5>Description</h5>\n        <h5>DueDate</h5>\n        <h5>Priority</h5>\n        <h5>Status</h5>\n        <h5>Note</h5>\n        <div></div>\n  ";t&&t._tasks.forEach((e,t)=>{a+=`\n        <h5>${e._title}</h5>\n        <h5>${e._description}</h5>\n        <h5>${e._dueDate}</h5>\n        <h5>${e._priority}</h5>\n        <h5>${e._status}</h5>\n        <h5>${e._note}</h5>\n        <div class="d-flex ">\n          <button class="edit-task mx-2 btn btn-warning" id="edit-task-${t}" value='${t}' data-toggle="modal" data-target="#taskModal">\n            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n              <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>\n            </svg>\n          </button>\n          <button class="delete-task mx-2 btn btn-danger" id="delete-task-${t}" value='${t}'>\n            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">\n              <path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>\n            </svg>\n          </button>\n        </div>\n    `}),e.innerHTML=a;const s=document.createElement("div");s.id="add-task-container";const o=document.createElement("button");o.id="add-task",o.classList.add("btn","btn-success"),o.innerText="Add new task",o.setAttribute("data-toggle","modal"),o.setAttribute("data-target","#taskModal"),d.appendChild(e),s.appendChild(o),d.appendChild(s)}const r=document.createElement("div");r.classList.add("modal"),r.id="projectModal",r.tabindex="-1";r.innerHTML='\n    <div class="modal-dialog modal-dialog-centered">\n      <div class="modal-content">\n        <form id="new-project">\n          <div class="modal-body">\n            <div class="form-group">\n              <label for="new-project-modal">Project Title</label>\n              <input\n                type="text"\n                class="form-control"\n                id="new-project-modal"\n                name="title"\n              />\n            </div>\n          </div>\n          <div class="modal-footer">\n            <button\n              type="button"\n              class="btn btn-secondary"\n              data-dismiss="modal"\n            >\n              Close\n            </button>\n            <button type="submit" data-toggle="modal" data-target="#projectModal" class="btn btn-success">Create Project</button>\n          </div>\n        </form>\n      </div>\n    </div>\n  ';const i=document.createElement("div");i.classList.add("modal"),i.id="taskModal",i.tabindex="-1";let c="";o.statusOptions.forEach(e=>{c+=`\n        <option value=${e}>${e}</option>\n    `});let u="";o.priorityOptions.forEach(e=>{u+=`\n        <option value=${e}>${e}</option>\n    `});const m=`\n    <div class="modal-dialog modal-dialog-centered">\n      <div class="modal-content">\n        <form id="new-update-task">\n          <div class="modal-body">\n            <div class="form-group">\n              <label for="new-project-modal">Name</label>\n              <input\n                type="text"\n                class="form-control"\n                id="title"\n                name="title"\n              />\n            </div>\n            <div class="form-group">\n              <label for="new-project-modal">Description</label>\n              <textarea \n                class="form-control"\n                id="description"\n                name="description"\n              ></textarea>\n            </div>\n            <div class="form-group">\n              <label for="new-project-modal">Due-Date</label>\n              <input\n                type="date"\n                class="form-control"\n                id="due-date"\n                name="due-date"\n              />\n            </div>\n            <div class="form-group">\n              <label for="new-project-modal">Priority</label>\n              <select\n                type="text"\n                class="form-control"\n                id="priority-status"\n                name="priority"\n                required\n              >\n              ${u}\n              </select>\n            </div>        \n            <div class="form-group">\n              <label for="new-project-modal">Status</label>\n              <select\n                type="text"\n                class="form-control"\n                id="status"\n                name="status"\n                required\n              >\n              ${c}\n              </select>\n            </div>\n            <div class="form-group">\n              <label for="new-project-modal">Note</label>\n              <textarea\n                type="text"\n                class="form-control"\n                id="note"\n                name="note"\n              ></textarea>\n            </div>                \n          </div>\n          <div class="modal-footer">\n            <button\n              type="button"\n              class="btn btn-secondary"\n              data-dismiss="modal"\n            >\n              Close\n            </button>\n            <button type="submit" data-toggle="modal" data-target="#taskModal" class="btn btn-success" name="task-submit" ></button>\n          </div>\n        </form>\n      </div>\n    </div>\n  `;return i.innerHTML=m,e.appendChild(t),e.appendChild(d),e.appendChild(r),e.appendChild(i),e};var r=(()=>{const e=()=>document.getElementById("new-project"),t=()=>document.getElementById("new-update-task");return{chooseProject:()=>{l().length>0&&document.getElementById("selected-project").addEventListener("change",()=>{o.setSelectedProject((void 0).value),i()},!1)},addProjectButton:()=>{document.getElementById("add-project").addEventListener("click",()=>{e().style.display="block"})},submitProjectForm:()=>{e().addEventListener("submit",t=>{t.preventDefault();const n=e().elements.namedItem("title").value;if(n){const e=o.getProjects(),t=new a(n);e.push(t),o.setProjects(e),o.setSelectedProject(e.length-1),i()}else alert("Fill all informations correctly ")})},deleteProjectButton:()=>{l().length>0&&document.getElementById("delete-project").addEventListener("click",()=>{const e=o.getProjects(),t=document.getElementById("selected-project").value;e.splice(t,1),o.setProjects(e),o.setSelectedProject(0),i()})},addTaskButton:()=>{l().length>0&&document.getElementById("add-task").addEventListener("click",()=>{t().operation="add",t().style.display="block",t().reset(),t().elements.namedItem("task-submit").innerText="Add Task"})},updateTaskButton:()=>{const e=document.getElementsByClassName("edit-task");for(let n=0;n<e.length;n+=1)e[n].onclick=()=>{t().operation=n,t().style.display="block";const e=l()[o.getSelectedProject()]._tasks[n];t().elements.namedItem("title").value=e._title,t().elements.namedItem("description").value=e._description,t().elements.namedItem("due-date").value=e._dueDate,t().elements.namedItem("priority").value=e._priority,t().elements.namedItem("status").value=e._status,t().elements.namedItem("note").value=e._note,t().elements.namedItem("task-submit").innerText="Update Task"}},submitTaskForm:()=>{l().length>0&&t().addEventListener("submit",e=>{e.preventDefault();const n=t().elements.namedItem("title").value,a=t().elements.namedItem("description").value,d=t().elements.namedItem("due-date").value,r=t().elements.namedItem("priority").value,c=t().elements.namedItem("status").value,u=t().elements.namedItem("note").value,m=l()[o.getSelectedProject()];if(n&&a&&d&&r&&c&&u){const e=new s(n,a,d,r,c,u);if("add"===t().operation)((e,t)=>{const n=o.getProjects();n[t]._tasks.push(e),o.setProjects(n)})(e,o.getSelectedProject());else{m._tasks[t().operation]=e;const n=l();n[o.getSelectedProject()]=m,o.setProjects(n)}t().reset(),t().style.display="none",i()}else alert("Fill all informations correctly ")})},deleteTaskButton:()=>{const e=document.getElementsByClassName("delete-task");for(let t=0;t<e.length;t+=1)e[t].onclick=()=>{const e=o.getProjects();e[o.getSelectedProject()]._tasks.splice(t,1),o.setProjects(e),i()}}}})(),i=()=>{const e=document.getElementById("content");for(;e.firstChild;)e.removeChild(e.lastChild);d(),r.chooseProject(),r.addProjectButton(),r.submitProjectForm(),r.deleteProjectButton(),r.addTaskButton(),r.updateTaskButton(),r.submitTaskForm(),r.deleteTaskButton()};i()}]);