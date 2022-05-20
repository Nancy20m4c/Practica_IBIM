class Project {
  constructor(projectCode, name, description, clientCode, contractCode, users, commits, images, htmlElemt) {
    this.projectCode = projectCode;
    this.name = name;
    this.description = description;
    this.clientCode = clientCode;
    this.contractCode = contractCode;
    this.users = users;
    this.commits = commits;
    this.images = images;
    this.htmlElemt = htmlElemt;

  }

  // funcion encargada de cargar los commits el codigo proyecto empieza por el
  addCommit(commit, panel) {
    if (commit.CodeCommit.startsWith(this.projectCode)) {
      this.commits.push(commit);
      const element = document.createElement('div');
      element.innerHTML = `${commit.CodeCommit}`;
      panel.append(element);
    }
  }
}


class Main {
  constructor() {
    this.originalProjectList = [];
    this.projectList = [];
    this.projectPanel = document.querySelector('#project-panel');
    this.loadData();


  }

  loadData() {
    let returnBtn = document.getElementById('returnBtn');
    returnBtn.addEventListener("click", function(){
      main.reloadProjectElements();
    });

    // cargamos proyectos
    fetch('data/response01Projects.json')
      .then(response => response.json())
      .then(dataProject => {

        // recorremos los proyectos
        dataProject.message.forEach(project => {

          // utilizo mi clase project para guardar los datos que me interesanm de cada proyecto.
          const myProject = new Project(
            project.CodigoProyecto,
            project.Nombre,
            project.Descripcion,
            project.CodigoCliente,
            project.CodigoContratista,
            project.Users,
            [],
            project.PathLogos,
            null
          );

          const projectElement = this.createProjectHtmlElement(myProject);
          myProject.htmlElemt = projectElement;

          // cargo cada proyecto al listado de mi clase Table
          this.projectList.push(myProject);
          
          this.projectPanel.append(projectElement);
          
        });
      });
      
    };
    
    loadCommit(projectElement) {
      const commitPanel = document.getElementById('commitList');
      const codeproject = projectElement.getAttribute("codeproject");
      const project = main.projectList.find( proj => proj.projectCode === codeproject);

      fetch('data/response02Commits.json')
        .then(response => response.json())
        .then(dataCommit => {
          dataCommit.message.forEach(commit => {
            project.addCommit(commit, commitPanel);
          });


        });
    }
    createProjectHtmlElement(project) {
      let projectElement = document.createElement('mmc-project');
      projectElement.setAttribute('project', JSON.stringify(project));
      projectElement.setAttribute('codeProject', project.projectCode);
      projectElement.addEventListener('click', function(event){
        const elements = document.querySelectorAll('mmc-project');
        elements.forEach(element =>{
          if(element !== event.target){
            element.remove();
          }
        });
        main.loadCommit(event.target);
      });
      return projectElement;
  }


  reloadProjectElements() {
    let panelCommit =document.querySelector('#commitList');
    panelCommit.innerHTML = '';

    main.projectList.forEach(project => {
      main.projectPanel.append(project.htmlElemt);
      
    });
  }


  addCardToProjectPanelHTML(project) {
    let card = document.createElement('mmc-card');
    card.setAttribute("code", project.projectCode);
    card.setAttribute("name", project.name);
    card.setAttribute("description", project.description);

    //anyado el card al panel principal de proyectos
    this.projectPanel.append(card);

    // crep un evento click para cada compomente card.
    card.addEventListener("click", function () {
      _onClickCard(this, project);
    });

    function _onClickCard(element, project) {
      main.activeProject = project;
      main.activeProject.commits = [];


    }
  }

}
const main = new Main();


