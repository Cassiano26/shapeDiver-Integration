import { IParameterApi, ISessionApi, PARAMETER_TYPE } from "@shapediver/viewer";

const createParamDiv = (paramObject: IParameterApi<any>, parentDiv: HTMLDivElement) => {
    const paramDiv = document.createElement("div") as HTMLElement;
    parentDiv.appendChild(paramDiv);

    const label = document.createElement("label") as HTMLLabelElement;
    paramDiv.appendChild(label);
    label.innerText = paramObject.displayname || paramObject.name;

    return paramDiv;  
}

const createBooleanParameterObjectElement = (session: ISessionApi, paramObject: IParameterApi<boolean>, parentDiv: HTMLDivElement ) => {
    const paramDiv = createParamDiv(paramObject, parentDiv);

    const inputElement = document.createElement('input') as HTMLInputElement;
    paramDiv.appendChild(inputElement);
    inputElement.type = "checkbox";
    inputElement.checked = paramObject.value === true || paramObject.value === "true";
    inputElement.onchange = async () => {
        paramObject.value = inputElement.checked;
        await session.customize();
    }
}

const createNumberParameterObjectElement = (session: ISessionApi, paramObject: IParameterApi<number>, parentDiv: HTMLDivElement ) => {
    const paramDiv = createParamDiv(paramObject, parentDiv);

    const inputElement = document.createElement('input') as HTMLInputElement;
    paramDiv.appendChild(inputElement);
    inputElement.type = "range";
    inputElement.value = paramObject.value + "";
    inputElement.min = paramObject.min + "";
    inputElement.max = paramObject.max + "";

    if (paramObject.type === PARAMETER_TYPE.INT) {
        inputElement.step = "1";
    } else if ( paramObject.type === PARAMETER_TYPE.ODD || paramObject.type === PARAMETER_TYPE.EVEN ) {
        inputElement.step = "2";
    } else {
        inputElement.step = 1 / Math.pow(10, paramObject.decimalplaces) + "";
    }

    inputElement.onchange = async () => {
        paramObject.value = inputElement.value;
        await session.customize();
    }
}

const createStringListParameterObjectElement = (session: ISessionApi, paramObject: IParameterApi<number>, parentDiv: HTMLDivElement ) => {
    const paramDiv = createParamDiv(paramObject, parentDiv);

    for (let i = 0; i < paramObject.choices.length; i ++) {
        const inputElement = document.createElement('input') as HTMLInputElement;
        paramDiv.appendChild(inputElement);
        inputElement.type = "button";
        inputElement.value = paramObject.choices[i] + "";
        inputElement.onclick = async () => {
            paramObject.value = i;
            await session.customize();
            const totalPrice = document.getElementById("totalPrice") as HTMLTitleElement;
            totalPrice.textContent = session.getOutputByName("TotalPrice")[0].content[0].data;
    }
    }

}

export const createParameterMenu = (session: ISessionApi) => {
    const menuDiv = document.getElementById('menu') as HTMLDivElement;

    const orderedParams = Object.values(session.parameters).sort((a: IParameterApi <any>, b: IParameterApi <any>) => (a.order || Infinity) - (b.order || Infinity));

    for (let i =0; i < orderedParams.length; i++) {
        const paramObject = orderedParams[i];
        
        if (paramObject.hidden === true) continue;

        console.log(paramObject.type, paramObject.name)

        switch(paramObject.type) {
            case PARAMETER_TYPE.BOOL:
                createBooleanParameterObjectElement(session, paramObject, menuDiv);
                break;
            case PARAMETER_TYPE.FLOAT:
            case PARAMETER_TYPE.INT:
            case PARAMETER_TYPE.ODD:
            case PARAMETER_TYPE.EVEN:
                createNumberParameterObjectElement(session, paramObject, menuDiv);
                break;
            case PARAMETER_TYPE.STRINGLIST:
                console.log(paramObject.value);
                createStringListParameterObjectElement(session, paramObject, menuDiv);
                break;
            default:
        } 

    }

}