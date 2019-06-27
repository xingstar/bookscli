class Index{
    contructor(str){
        this.str = str;
    }
    say(){
        console.log(this.str);
    }
}
const index = new Index('mixi');
index.say();
export default Index;