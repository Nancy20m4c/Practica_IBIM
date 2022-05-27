class Project {
  constructor(project, htmlElemt, isFavorite) {
    this.project    = project;
    this.htmlElemt  = htmlElemt;
    this.isFavorite  = isFavorite;
    this.commitList = [];
  }

  // funcion encargada de cargar los commits el codigo proyecto empieza por el
  addCommit(commit, panel) {
    if (commit.CodeCommit.startsWith(this.project.CodigoProyecto)) {
      this.commitList.push(commit);

      const commitElement = this.createCommitHtmlElement(commit);
      
      panel.append(commitElement);
    }
  }

  createCommitHtmlElement(commit) {
    let cardCommit = document.createElement('mmc-commit-item');
    cardCommit.setAttribute('code', commit.CodeCommit);
    cardCommit.setAttribute('tag', commit.Tag);
    cardCommit.setAttribute('description', commit.Description);
    cardCommit.setAttribute('active', commit.IsActive);
    cardCommit.setAttribute('visor', commit.VisorTitle);
    cardCommit.setAttribute('path', commit.PathCommitServer);
    return cardCommit;
  }
}


class Main {
  constructor() {
    this.projectList = [];
    this.favoriteFilter = false;
    this.favoriteList = [];
    this.projectPanel = document.querySelector('#project-panel');
    this.loadData();
  }

  loadData() {
    // inicializamos los favoritos del localstorage
    var localFavoriteList = localStorage.getItem('ibimFavoriteList');
    if(localFavoriteList && localFavoriteList !== null) {
      this.favoriteList = JSON.parse(localFavoriteList);
    }

    let returnBtn = document.getElementById('returnBtn');
    returnBtn.addEventListener("click", function(){
      main.reloadProjectElements();
    });

    let favoriteBtn = document.getElementById('favoriteBtn');
    favoriteBtn.addEventListener("click", function(){
      main.manageFavoriteBtn();
    });

    let searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener('keypress', (event)=>{

      if(event.code === 'Enter') {
        this.reloadProjectElements();
        const text = event.target.value;
        this.filterProject(text);
      }
    });

    // cargamos proyectos
    fetch('data/response01Projects.json')
      .then(response => response.json())
      .then(dataProject => {

        // recorremos los proyectos
        dataProject.message.forEach(project => {

          let isFavorite = false;
          this.favoriteList.forEach( favoriteItem => {
            if (favoriteItem === project.CodigoProyecto) {
              isFavorite = true;
            }
          });

          const projectElement = this.createProjectHtmlElement(project, isFavorite);

          const myProject = new Project(
            project,
            projectElement,
            isFavorite
          );

          // cargo cada proyecto al listado de mi clase Table
          this.projectList.push(myProject);
          this.projectPanel.append(projectElement);
          
        });
      });
      
    };
    
    loadCommit(projectElement) {
      const commitPanel = document.getElementById('commitList');
      commitPanel.innerHTML = '';

      const codeproject = projectElement.getAttribute("codeproject");

      console.log(codeproject);
      console.log(main.projectList);

      const project = main.projectList.find( proj => proj.project.CodigoProyecto === codeproject);

      fetch('data/response02Commits.json')
        .then(response => response.json())
        .then(dataCommit => {
          dataCommit.message.forEach(commit => {
            project.addCommit(commit, commitPanel);
          });
        });
    }

    filterProject(text) {
      const projectElementList = document.querySelectorAll('mmc-project-item');
      projectElementList.forEach(element => {
        console.log(element);
        if (!(this.startsWith(element.codeclient, text)
          || this.startsWith(element.codeproject, text)
          || this.startsWith(element.name, text)
          || this.startsWith(element.description, text)
        )) {
          element.remove();
        }
      });
    }

    startsWith(string, key) {
      return string.toLowerCase().startsWith(key.toLowerCase());

    }


    removeAllProjectsHtmls(){
      const projectList = document.querySelectorAll('mmc-project-item');

      projectList.forEach(project => {
        project.remove();
      });
    }

    createProjectHtmlElement(project, isFavorite) {
      let projectElement = document.createElement('mmc-project-item');
      projectElement.setAttribute('id', project.CodigoProyecto);
      projectElement.setAttribute('codeproject', project.CodigoProyecto);
      projectElement.setAttribute('name', project.Nombre);
      projectElement.setAttribute('description', project.Descripcion);
      projectElement.setAttribute('codeclient', project.CodigoCliente);
      projectElement.setAttribute('favorite', isFavorite);

      projectElement.addEventListener('click', (event) => {
        const elements = document.querySelectorAll('mmc-project-item');
        elements.forEach(element => {
          if(element !== event.target) {
            element.remove();
          }
        });
        main.loadCommit(event.target);
      });

      projectElement.addEventListener('onStarClick', (event) => {
        main.projectList.forEach(project => {
          if(project.htmlElemt === event.target) {
            const element = project.htmlElemt;
            let favorite = element.getAttribute('favorite') === 'true';
            element.setAttribute( 'favorite', !favorite);
            
            if(!favorite) {
              main.favoriteList.push(event.target.getAttribute('codeproject'));
              localStorage.setItem('ibimFavoriteList', JSON.stringify(main.favoriteList));
            } else {
              main.favoriteList = main.favoriteList.filter(favoriteItem => { favoriteItem === event.target.getAttribute('codeproject')});
              localStorage.setItem('ibimFavoriteList', JSON.stringify(main.favoriteList));
            }
          }
          
        });
        
        event.preventDefault();
        event.stopPropagation();
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

  manageFavoriteBtn() { 
    main.favoriteFilter = !main.favoriteFilter;
    
    if (main.favoriteFilter) {
      const projectList = document.querySelectorAll('mmc-project-item');
      projectList.forEach(p => {
        if(p.favorite !== 'true' && p.favorite !== true) {
          p.remove();
        }
      });
    } else {
      main.reloadProjectElements();
    }
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


