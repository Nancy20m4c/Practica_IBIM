class Table {
    constructor(){
       this.activePanel = document.getElementById('panelPrincipal');
       this.buttonb1 = document.getElementById('btn-1');
       this.buttonb2 = document.getElementById('btn-2');
       this.buttonb3 = document.getElementById('btn-3');
       this.elements = document.querySelectorAll('.button');
       this.projectList = null;
       this.commitList = null;
       this.loadData();
       /* this.events();
       this.buttonb1.addEventListener('click', function(){this.events()}); */
       this.elements.forEach( elemento => {
        elemento.addEventListener('click', function() {
         switch(elemento.innerText) {
           case 'b1':
            table.activePanel.setAttribute('class', 'table2');
             break;
           case 'b2':
             table.activePanel.setAttribute('class','table3');
             break;
           case 'b3':
            table.activePanel.setAttribute('class', 'table1');
             break;
           }
         });
     });
    };

    loadData(){
      fetch('data/response01Projects.json')
      .then(response => response.json())
      .then(data => {
        //console.log(data);
         this.projectList = data.message;

         this.projectList.forEach(project => {
            console.log(project);
         });
      });
    }

    loadCommit(idProject) {
      this.commitList = [];
      idProject = '19-132-L1';
      fetch('data/response02Commits.json')
      .then(response => response.json())
      .then(data => {
         data.message.forEach(commit => {
            if(commit.CodeCommit.startsWith(idProject)) {
              this.commitList.push(commit);
            }  

         });
      });
    }

    /* events(){
        if(this.buttonb1){
            this.activePanel.setAttribute('class', '.table2');   
        } else {
            this.activePanel.setAttribute('class', '.table3')

        }
    }; */
    
};
const table = new Table();
