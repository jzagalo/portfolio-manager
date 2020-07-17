<script lang="tsx">

import { Vue, Component, Prop } from 'vue-property-decorator';


@Component
export default class ListView extends Vue {
    @Prop() private readonly items!: any[];
    @Prop() private readonly keyFn!: (item: any) => number;
    @Prop() private readonly onClick!: (item: any) => void;
    @Prop() private readonly renderFn!: (item: any) => JSX.Element;
    @Prop() private readonly onClickCreate!:() => void;
    @Prop() private readonly headings?: string[];



    private idFn = (item: any) => {
        return typeof(this.keyFn) !== "undefined" ?
            this.keyFn(item) : item.id;
    }

    private render(){

        if(typeof(this.items) === "undefined"){
            return;
        }

        const content = this.items.map((x, index) => {
            return( <li key="{this.idFn}" >
                        <a class="list-item-content" href="#void" onClick={() => this.onClick(x)}>
                            <div class="list-item-text">{this.renderFn(x)}</div>
                            <span>&rang;</span>
                        </a>
                    </li>);
            }
        );

        return(
            <ul>
                {  this.onClickCreate &&
                    <li>
                        <a class="list-item-content create" href="#void" onClick={() => this.onClickCreate()}>
                            <div class="list-item-text">Create</div>
                            <span>&#43;</span>
                        </a>
                    </li>
                }
                {
                    this.headings && (
                        <li class="list-item-content">
                            { this.headings.map((x) => (
                                <div class="list-item-text list-item-heading">{x}</div>
                            ))
                            }
                            <div style="opacity:0;">&rang; </div>
                        </li>
                    )
                }

                { content }
            </ul>
        );

    }
}
</script>

<style lang="sass" scoped>
ul
    list-style: none;
    padding-left: 0
    margin-left: 0
    
.list-item-content
    display: flex
    align-items: center
    padding: 0.75rem 0.5rem
    border-bottom: 1px solid #eee
    text-decoration: none

    .list-item-text
        flex: 1
        
        .account-deposit
            display: flex

            span
                flex: 1
        


    &.create
            background-color: green
            color: white
            font-weight: 600

            &:hover
                background-color: darkgreen
</style>