import {useState} from "react";
import {DialogOption} from "./DialogOption.tsx";
import "./Dialog.css"

interface Option {
    text: string;
    primary: boolean;
    selected: boolean;
}

const startOptions: Option[] = [
    {primary: true, selected: true, text: "I'm ready to start the job"},
    {primary: true, selected: false, text: "I need more time to consider"},
    {primary: false, selected: false, text: "€$ Fancy a round of Gwent instead?"},
]

function DialogName() {
    return <div className="dialog-name rajdhani-semibold" contentEditable>Wakako Okada</div>
}

function SquareIcon(props: {content: string}) {
    return <div className="square-icon rajdhani-semibold">
        <span>{props.content}</span>
    </div>
}

export function Dialog(props: {printing: boolean}) {
    const [options, setOptions] = useState([...startOptions]);

    function addOption(): void {
        setOptions([
            ...options,
            {
                text: "New Option",
                selected: false,
                primary: false
            }
        ])
    }

    function removeOption(index: number): void {
        setOptions(options.filter((_, index1) => index1 !== index));
    }

    return <div className="dialog-option-container">
        <div className="dialog-option-container-actor">
            <DialogName></DialogName>
        </div>
        <div className="dialog-option-container-button">
            <SquareIcon content="F"></SquareIcon>
        </div>
        <div className="dialog-option-container-options">
            {
                options.map((value, index) => <div key={value.text} style={{marginBottom: "4px"}}>
                        <DialogOption initialText={value.text}
                                      initialPrimary={value.primary}
                                      initialSelected={value.selected}
                                      printing={props.printing}
                                      addNew={addOption}
                                      remove={() => removeOption(index)}
                        >
                        </DialogOption>
                    </div>
                )
            }
            <div>
            </div>
        </div>
    </div>

}