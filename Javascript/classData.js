class MmcData{
    constructor(){
       this.mainPanel = document.getElementById('mainPanel');
       this.projectList = [];
       this.loadData();

    }
    loadData(){
        fetch('data/response01Projects.json')
        .then(response => response.json())
        .then(dataProject => {
  
          fetch('data/response02Commits.json')
          .then(response => response.json())
          .then(dataCommit => {
       
            

          });
        });
    }


}
const mmcData = new MmcData();