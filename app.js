const store = new Vuex.Store({
    state:{
        todos:[]
    },
    mutations:{
        addTodo(state, payload){
            this.state.todos.unshift(payload);
        },
        removeTodo(state, id){
            state.todos = state.todos.filter(e=>e.id != id);
        },
        updateDone(state, id){
            state.todos = state.todos.map((e)=>{
                if(e.id == id) e.completed = !e.completed;
                return e;
            })
        },
        setTodos(state, payload){
            state.todos = payload;
        }
    },
    getters:{
        todoCount:(state)=>{
            return state.todos.length;
        }
    },
    actions:{
        async asyncSetTodos({commit}){
            const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
            commit('setTodos', res.data);
        },
        async asyncAddTodo({commit}, payload){
            commit('addTodo', payload);
            const res = await axios.post('https://jsonplaceholder.typicode.com/todos', {payload});
            console.log(res.data);

        }
    }
});

const About = {
    data(){
        return {

        }
    },
    template:'#aboutTemplate'
}

const Home = {
    data(){
        return {

        }
    },
    computed:{
        todoCount:()=>{
            return store.getters.todoCount;
        }
    },
    template:'#homeTemplate'
}

const TodoInput = {
    data(){
        return {
            text:''
        }
    },
    template:"#todoInputTemplate",
    methods:{
        addTodo(){
            store.dispatch('asyncAddTodo', {id:uuidv4(), title:this.text, completed:false })
            this.text = '';
        }
    }
}
const TodoList = {
    template:"#todoListTemplate",
    computed:{
        todoitems: ()=>{
            return store.state.todos;
        }
    },
    methods:{
        updateDone(id){
            store.commit('updateDone',id);
        },
        removeTodo(id){
            store.commit('removeTodo',id);
        }
    }
}
const Todo = {
    data(){
        return {

        }
    },
    components:{
        'todo-input':TodoInput,
        'todo-list':TodoList
    },
    template:"#todoTemplate"
}


const routes = [
    {
        path:'/',
        component:Home
    },
    {
        path:'/todo',
        component: Todo
    },
    {
        path:'/about',
        component: About
    }
]

const router = new VueRouter({
    routes
});


new Vue({
    router,
    store,
    data:{
        name:'william galas'
    },
    created(){
        store.dispatch('asyncSetTodos')
    }
}).$mount('#app');