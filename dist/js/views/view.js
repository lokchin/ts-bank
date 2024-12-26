export class View {
    constructor(seletor, leak) {
        this._leak = false;
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento;
        }
        else {
            throw Error(`O seletor ${seletor} não existe no DOM.`);
        }
        if (this._leak) {
            this._leak = leak;
        }
    }
    update(model) {
        let template = this.template(model);
        if (this._leak) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.elemento.innerHTML = template;
    }
}
