class MmcCommitItem extends HTMLElement {
    constructor( ) {
        super();
        this.Code;
        this.tag;
        this.description;
        this.active;
        this.visor;
        this.path;

        this.attachShadow({mode:'open'});

    }

    static get observedAttributes(){
        return ['code', "tag", "description", "active", "visor","path"];
    }

    attributeChangedCallback(nameAttr, oldValue, newValue){
        switch(nameAttr){
            case "code":
                this.code = newValue;
            break;
            case "tag":
                this.tag = newValue;
                break;
            case "description":
                this.description = newValue;
            break;
            case "active":
                this.active = newValue;
            break;
            case "visor":
                this.visor = newValue;
            break;
            case "path":
                this.path = newValue;
            break;

        }
    }
    

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <div id="mainPanel">
            <div id="cardCommit">
                <div class="codeCommit cut-txt" title="${this.code}"><span class="fieldName">Code:</span>${this.code}</div>
                <div class="tag"><span class="fieldName">Tag:</span>${this.tag}</div>
                <div class="description cut-txt" title="${this.description}"><span class="fieldName">Description:</span>${this.description}</div>
                <div class="active"><span class="fieldName">Active:</span>${this.active}</div>
                <div class="VisorTitle cut-txt" title="${this.visor}"><span class="fieldName">Visor:</span>${this.visor}</div>
                <div class="path cut-txt" title="${this.path}"><span class="fieldName">Path:</span>${this.path}</div>
            </div>
        </div>
        <style>
            
            #mainPanel{
                padding: 3px;
            }
            #cardCommit{
                display: grid;
                grid-template-columns: 2fr 1fr;
                max-width: 400px;
                height: 110px;
                align-items: revert;
                font-style: inherit;
                border: 1px solid #d4e6ed70;
                border-radius: 10px;
                
            }
            #cardCommit:hover{
                background: #f7f7f7;
                cursor:pointer;
            }
            .fieldName{
                font-weight: 600;
                color: #00a3cc;
                background-color: aliceblue;
            }
            .cut-txt { 
                text-overflow: ellipsis;
                overflow: hidden;  
                white-space: nowrap;
            }

            .path{
                grid-column: 1 / span 2;
                grid-row: 4;
                background-color: #d4e6ed70;
            }
            .description{
                background-color: #d4e6ed70;
            }
            .active{
                background-color: #d4e6ed70;
            }
            .visorTitle{
                grid-column: 1 / span 2;
                grid-row: 3;
            }

        </style>
        `;
    }
    

}
window.customElements.define('mmc-commit-item', MmcCommitItem);