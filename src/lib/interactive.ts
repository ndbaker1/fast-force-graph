import { Semaphore } from "async-mutex";

const semaphore = new Semaphore(0);

export async function ask(attribute: string, options: string[]) {
    const container = document.createElement('form');

    const text = document.createElement('h2');
    text.textContent = attribute;

    container.append(text);

    let value: string = "";

    for (const option of options) {
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.id = option;
        radio.value = option;
        radio.onclick = () => {
            value = option;
            container.remove();
            semaphore.release();
        }
        const label = document.createElement('label');
        label.textContent = option;
        label.setAttribute('for', option);
        container.append(radio);
        container.append(label);
    }

    document.body.append(container);

    await semaphore.acquire();

    console.log(value);

    return value;
}