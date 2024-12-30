export abstract class View<T> {

    protected elemento: HTMLElement;
    private _leak = false;

    constructor(seletor: string, leak: boolean) {
        const elemento = document.querySelector(seletor);
        if (elemento) {
            this.elemento = elemento as HTMLElement;
        } else {
            throw Error(`O seletor ${seletor} não existe no DOM.`);
        }
        if (this._leak) {
            this._leak = leak;
        }
    }

    public update(model: T): void {
        let template = this.template(model);
        if (this._leak) {
            template = template.replace(/<script>[\s\S]*?<\/script>/, '');
        }
        this.elemento.innerHTML = template;
    }

    protected abstract template(model: T): string;
}