class MmcProject extends HTMLElement{
    constructor(){
        super();
        this._project;
        this.codeproject;
/*         this.name;// = 'Demo Project Name';
        this.description;// = 'Demo Project Descripti   on: Lore ipsum...';
        
        this.codeClient */
        this.myLogoPath = 'images/Logo_IBIM.png';
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes(){
        return ["codeproject", "project"];
    }
    attributeChangedCallback(nameAttr, oldValue, newValue){
        switch(nameAttr){
            case "codeproject":
                this.codeproject = newValue;
            break;
            case "project":
                this._project = JSON.parse(newValue);
                console.log(this._project);
            break;
        }
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <div id="mainPanel">
            <div id="project">
                <div class="logo my-image"><img src="${this.myLogoPath}"></div>
                <div class="title">
                    <div class="Codeproject text cut-txt"><span class="fieldName">Project:</span> ${this.codeproject}</div>
                    <div class="code text cut-txt"><span class="fieldName">Client:</span> ${this._project.clientCode}</div>
                    <div class="name text cut-txt"><span class="fieldName" >Name:</span> <span title="${this._project.name}">${this._project.name}</span></div>
                </div>
                <div class="description text"><span class="fieldName">Description:</span> <br>${this._project.description}</div>
                
                <div class="action-panel">
                    <div style="width:270px; height: 100%;">
                        <div class="arrow-black-left item"></div>
                        <div class="star-icon-1 item"></div>
                        <div class="star-icon-2 item"></div>
                        <div class="trash-icon item"></div>
                    </div>
                </div>
            </div>
        </div>
        <style>

            
            :root {
                --main-background-color: #f0f8ff;
                --main-border-color: #d4e6ed;
              }

            #mainPanel{
                /* width: 1600px; */
                padding-bottom: 1px;
                margin-top: 3px;
                border-bottom: 1px solid #d4e6ed70;
                margin-bottom: 3px;
            }
            #main-panel > div{
                display: inline-block;
            }
            #project{
                display: grid;
                grid-template-columns: 1fr 2fr 3fr;
                /* border-bottom: 1px solid gray; */
                
                max-width: 100%;
                height: 75px;
                align-items: revert;
                font-style: inherit;
            }
            #project:hover{
                background: #f7f7f7;
                cursor:pointer;
            }
            #commitList > div{
               padding: 6px 3px;
            }
            .my-image img{
                width: auto;
                height: auto;
                max-height: 100%;
                max-width: 100%;
                margin: auto;
                display: flex;
            }
            .title{
                display: grid;
                grid-template-columns: 3fr 1fr;
            
            }
            .logo{
                height: inherit;
                /* width: 200px; */
                margin-right: 10px;
                background-color: aliceblue;
                border-radius: 5px;
                border: 1px solid #d4e6ed70;    
            }
            .description{
                position: relative;
            }
            .name{
                grid-column: 1 / span 2;
                grid-row: 2;  
            }
            
            .text {
                margin: auto 0;
                height: inherit;
            }
            .cut-txt { 
                text-overflow: ellipsis;
                overflow: hidden;  
                white-space: nowrap;
            }
            .fieldName{
                font-weight: 600;
                color: #00a3cc;
            }

            .action-panel > div > .item {
                display: inline-block;
                background-position: center;
                background-repeat: no-repeat;
                /* width: 40px; */
                width: 23%;
                height: 100%;
                position: relative;
                left: -3px;
                background-size: 40px auto;
            }

            .star-icon-1 {
                background-image: url(images/star_icon_1.svg);
            }

            .star-icon-2 {
                background-image: url(images/star_icon_2.svg);
                background-size: 50px auto !important;
            }

            .trash-icon {
                background-image: url(images/trash_icon.svg);
                background-size: 33px auto !important;
            }

            .arrow-black-left {
                width: 40px !important;
                background-image: url(images/arrow_back_left_icon.svg);
            }

            .arrow-black-right {
                width: 40px !important;
                background-image: url(images/arrow_back_left_icon.svg);
            }

            .action-panel{
                background: aliceblue;
                height: 95%;
                position: absolute;
                right: 0;
                width: 37px;
                top: 0;
                border: 1px solid #d4e6ed70;
                border-radius: 5px;
                overflow: hidden;
            }
            .action-panel:hover{
                width:270px;
                animation-name: example;
                animation-duration: 0.5s;
            }
            @keyframes example {
                from  {width:37px;}
                to {width:270px;}
              }
            
            </style>
            `;
    }

}
window.customElements.define('mmc-project', MmcProject);