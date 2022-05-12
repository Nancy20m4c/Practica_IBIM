class Project {
  constructor( projectCode, name, description, clientCode, contractCode, users, commits){
    this.projectCode = projectCode;
    this.name = name;
    this.description = description;
    this.clientCode = clientCode;
    this.contractCode = contractCode;
    this.users = users;
    this.commits = commits;
  }
}

class Table {
    constructor(){
       this.mainPanel = document.getElementById('mainPanel');
       this.tableProjectTbody = document.querySelector('#panelProjects tbody');
       this.tableProjectThead = document.querySelector('#panelProjects thead');
       this.projectList = [];
       this.commitList = null;
       this.projectPanel = document.querySelector('#project-panel');
       this.tableBody = document.querySelector('#tableBody');

       this.loadData();
       
    }

    loadData(){
      fetch('data/response01Projects.json')
      .then(response => response.json())
      .then(dataProject => {

      /*fetch('data/response02Commits.json')
        .then(response => response.json())
        .then(dataCommit => { 
          console.log(dataCommit);*/
      
        dataProject.message.forEach( project => {
            let card = document.createElement('mmc-card');
            card.setAttribute("code", project.CodigoProyecto)
            card.setAttribute("name", project.Nombre);
            card.setAttribute("description", project.Descripcion);
            card.setAttribute("code", project.CodigoProyecto);
            
            card.addEventListener("click", function(){
              _onClickCard(this, project);
            });
            this.projectPanel.append(card);
          });
      });

      function _onClickCard(element, project) {
        console.log(project);
        console.log(element);
        fetch('data/response02Commits.json')
        .then(response => response.json())
        .then(dataCommit => { 
          dataCommit.message.forEach(commit => {
            if(commit.CodeCommit.startsWith(element.CodigoProyecto)) {
              this.commitList.push(commit);
              
              console.log(this.commitList);
             }
          }); 
          console.log(commitList);
      });
    }
    

/* 
    loadCommit(projectCode) {
      const commitList = [];
      fetch('data/response02Commits.json')
      .then(response => response.json())
      .then(data => {
         data.message.forEach(commit => {
            if(commit.CodeCommit.startsWith(projectCode)) {
              this.commitList.push(commit);
              
            }
         });
      });
    }
    
   addTrByLabel(tableThead, fieldList) {
      let tr = document.createElement('tr');

      fieldList.forEach(field => {
        let th = document.createElement('th');
        th.setAttribute('scope', 'col');
        th.innerText = field.label;
        tr.append(th);
      });

      tableThead.append(tr);

    }

    addTrByFieldName(tableTbody, rowData, fieldList) {
      let tr = document.createElement('tr');

      fieldList.forEach(field => {
        let td = document.createElement('td');
        if(field.isLogo === true) {
           rowData[field.fieldName].forEach( logo => {
           let img = document.createElement('img');
           img.setAttribute('src', logo);
           td.append(img);
          });

        } else {
          if(Array.isArray(rowData[field.fieldName])){
            let ul = document.createElement('ul');
            rowData[field.fieldName].forEach( item => {
              let li = document.createElement('li');
              li.innerText = item;
              ul.append(li);
            });
            td.append(ul);
          } else {
            td.innerText = rowData[field.fieldName];
          }
            
        }
        tr.append(td);
      });

      tableTbody.append(tr);
    }  */

};
}
const table = new Table();
