class MmcProjectItem extends HTMLElement{
    constructor(){
        super();
        this.codeproject;
        this.name;
        this.description
        this.codeClient
        this.mylogopath = 'images/Logo_IBIM.png';
        this.favorite;

//         this._favoriteIcon = 'star-icon-1 item';
        this.attachShadow({mode: 'open'});
    }

    static get observedAttributes(){
        return ["codeproject", "name", "description", "codeclient", "mylogopath", "favorite"];
    }
    attributeChangedCallback(nameAttr, oldValue, newValue){
        switch(nameAttr){
            case "codeproject":
                this.codeproject = newValue;
            break;
            case "name":
                this.name = newValue;
            break;
            case "description":
                this.description = newValue;
            break;
            case "codeclient":
                this.codeclient = newValue;
            break;
            case "mylogopath":
                this.mylogopath = newValue;
            break;
            case "favorite":
                    const favorite = this.shadowRoot.getElementById('favorite');
                    if(favorite != undefined) {
                        if(newValue === true || newValue === 'true' ) {
                            favorite.className = 'star-icon-2 item';
                        } else {
                            favorite.className = 'star-icon-1 item';
                        }
                    }


                this.favorite = newValue;
            break;
        }
    }
    
    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <div id="mainPanel">
            <div id="project">
                <div class="logo my-image"><img src="${this.mylogopath}"></div>
                <div class="title">
                    <div class="Codeproject text cut-txt"><span class="fieldName">Project:</span> ${this.codeproject}</div>
                    <div class="code text cut-txt"><span class="fieldName">Client:</span> ${this.codeclient}</div>
                    <div class="name text cut-txt"><span class="fieldName" >Name:</span> <span title="${this.name}">${this.name}</span></div>
                </div>
                <div class="description text"><span class="fieldName">Description:</span> <br>${this.description}</div>
                
                <div class="action-panel">
                    <div style="width:270px; height: 100%;">
                        <div class="arrow-black-left item"></div>
                        <div id="favorite" class="${this.favorite === true || this.favorite === 'true' ? 'star-icon-2 item': 'star-icon-1 item'}"></div>
                        <div class="edit-icon item"></div>
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
                position: relative; 
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
                width: 14%;
                height: 100%;
                position: relative;
                left: -3px;
                background-size: 34px auto;
            }

            .action-panel > div > .item:not(.arrow-black-left):hover {
                background-color: #00a3cc38;
                height: 52%;
                position: relative;
                bottom: 25%;
                border-radius: 21px;
            }
            .star-icon-1 {
                background-image: url(images/star_icon_1.svg);
            }

            .star-icon-2 {
                background-image: url(images/star_icon_2.svg);
                background-size: 39px auto !important;
            }

            .edit-icon {
                background-image: url(images/edit_pen_icon.svg);
                background-size: 28px auto !important;
            }

            .trash-icon {
                background-image: url(images/trash_icon.svg);
                background-size: 26px auto !important;
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
                width:175px;
                animation-name: example;
                animation-duration: 0.5s;
            }

            @keyframes example {
                from  {width:37px;}
                to {width:175px;}
              }
            
            </style>
            `;

            const favoriteElement = this.shadowRoot.getElementById('favorite');
            favoriteElement.addEventListener('click', (e) => {
                const event = new Event('onStarClick');
                this.dispatchEvent(event);
                e.preventDefault();
                //e.stopPropagation();
            }); 
    }

}
window.customElements.define('mmc-project-item', MmcProjectItem);