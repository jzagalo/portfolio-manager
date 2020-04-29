<script lang="tsx">

import {Vue, Component, Prop} from 'vue-property-decorator';

@Component
export default class ListView extends Vue {
    @Prop() private readonly items!: any[];
    @Prop() private readonly keyFn!: (item: any) => number; 
    @Prop() private readonly onClick!: (item: any) => void;
    @Prop() private readonly renderFn!: (item: any) => JSX.Element;

    constructor(){
        super();
        this.idFn = this.idFn.bind(this);
    }

    private idFn = (item: any) => {
        return typeof(this.keyFn) !== "undefined" ?
            this.keyFn(item) : item.id;
    }

    private render(){

        if(typeof(this.items) === "undefined"){
            return;
        }

        const content = this.items.map((x, index) => {                    
                       return( <li >
                            <a class="list-item-content" href="#void" onClick={() => this.onClick(x)}>
                                <div class="list-item-text">{this.renderFn(x)}</div>
                                <span></span>    
                            </a>                       
                           </li>);         
                    });
        return(
            <ul>
                { content }
            </ul>
        );
    }
}
</script>