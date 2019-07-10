console.log('图书展示也');
class WordCount extends HTMLParagraphElement{
    constructor(){
        super()
    }
}
customElements.define('word-count',WordCount, {extends: 'p'})
class ButtonHelloElement extends HTMLButtonElement { 
    constructor() {
        super()
        this.addEventListener('click', () => { alert('hello world');}) 
    }
}
customElements.define('button-hello', ButtonHelloElement, { extends: 'button' }) 