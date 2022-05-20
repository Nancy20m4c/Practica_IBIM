class Project {
  constructor(projectCode, name, description, clientCode, contractCode, users, commits, images) {
    this.projectCode = projectCode;
    this.name = name;
    this.description = description;
    this.clientCode = clientCode;
    this.contractCode = contractCode;
    this.users = users;
    this.commits = commits;
    this.images = images;
  }

  // funcion encargada de cargar los commits el codigo proyecto empieza por el
  addCommit(commit) {
    if (commit.CodeCommit.startsWith(this.projectCode)) {
      this.commits.push(commit);

    }
  }
}

class Table {
  constructor() {
    this.mainPanel = document.getElementById('mainPanel');
    this.tableProjectTbody = document.querySelector('#panelProjects tbody');
    this.tableProjectThead = document.querySelector('#panelProjects thead');
    this.projectList = [];
    this.activeProject;
    //this.commitList = [];
    this.projectPanel = document.querySelector('#project-panel');
    this.tableBody = document.querySelector('#tableBody');

    this.loadData();

  }

  loadData() {
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
            project.PathLogos
          );

          // cargo cada proyecto al listado de mi clase Table
          this.projectList.push(myProject);

          let projectElement = document.createElement('mmc-project');
            projectElement.setAttribute('project', JSON.stringify(myProject));

            this.projectPanel.append(projectElement);


        projectElement.addEventListener('click', function(event){
          const elements = document.querySelectorAll('mmc-project');
          elements.forEach(element =>{
           if(element !== event.target){
             element.remove();
           }
          });

          

        });

    
          // creamos un componente card y seteamos sus atributos
          //let card = this.addCardToProjectPanelHTML(myProject);
          // let tr = this.addProjectTrToTableByIdHTML(myProject, 'tableProject');

        });
      });

  };



  removeOtherProjectTr(trProject, tableId) {
    const query = '#' + tableId + ' tbody tr';

    const trList = document.querySelectorAll(query);

    trList.forEach(tr => {
      if (trProject != tr) {
        tr.remove();
      }
    });

  }

  /* addProjectTrToTableByIdHTML(project, tableId) {
    const query = '#' + tableId + ' tbody';
    console.log(query);
    const tableBody = document.querySelector(query);

    const tr = document.createElement('tr');

    const tdLogo = document.createElement('td');
    tdLogo.innerHTML = `<img style="zoom: .3;" src="images\\descarga.png">`;
    tr.append(tdLogo);

    const tdCode = document.createElement('td');
    tdCode.innerText = project.projectCode;
    tr.append(tdCode);

    const tdName = document.createElement('td');
    tdName.innerText = project.name;
    tr.append(tdName);

    const tdDesc = document.createElement('td');
    tdDesc.innerText = project.description;
    tr.append(tdDesc);



    tr.addEventListener(
      'click', function () {
        table.removeOtherProjectTr(this, 'tableProject');
      });

    tr.addEventListener(
      'mouseenter', function (event) {

        // eliminamos todos los action panels
        const actionPanels = document.querySelectorAll('.actionPanel');
        actionPanels.forEach(a => {
          a.remove();
        });

        // añadimos un action panel al ultimo TD del TR activo
        const lastTd = this.children[this.children.length - 1];
        lastTd.insertAdjacentHTML('afterend', `
          <div class="actionPanel">
            <div style="flex: 1 1 auto;">...</div>
            <i style="flex: 1 1 auto;" class="fa fa-star-o" aria-hidden="true"></i>
            <i style="flex: 1 1 auto;" class="fa fa-plus" aria-hidden="true"></i>
            <i style="flex: 1 1 auto;" class="fa fa-pencil-square-o" aria-hidden="true"></i>  
            <i style="flex: 1 1 auto;" class="fa fa-trash-o" aria-hidden="true"></i>
          </div> 
          `);
      });

    tableBody.append(tr);

    return tr;
  }
 */
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
      table.activeProject = project;
      table.activeProject.commits = [];


      fetch('data/response02Commits.json')
        .then(response => response.json())
        .then(dataCommit => {
          dataCommit.message.forEach(commit => {
            table.activeProject.addCommit(commit);
          });
        });

      console.log(table.activeProject);
    }
  }

}
const table = new Table();


