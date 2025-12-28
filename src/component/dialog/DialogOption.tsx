import {Button} from "../Button.tsx";
import { Popover } from 'react-tiny-popover'
import {useState} from "react";
import type {FnAction} from "../../types.ts";

function EditOptions(props: {togglePrimary: FnAction, toggleSelected: FnAction, add: FnAction, remove: FnAction}) {
    return <div style={{backgroundColor: "rgba(0, 0, 0, 0.8)", display: "flex", flexDirection: "row"}}>
        <Button label="Remove" small printing={false} click={props.remove}></Button>
        <Button label="Add New" small printing={false} click={props.add}></Button>
        <Button label="Toggle Primary" small printing={false} click={props.togglePrimary}></Button>
        <Button label="Toggle Selected" small printing={false} click={props.toggleSelected}></Button>
    </div>
}

export interface DialogOptionProps {
    initialText: string;
    initialPrimary: boolean;
    initialSelected: boolean;
    printing: boolean;

    remove: FnAction;
    addNew: FnAction;
}

export function DialogOption(props: DialogOptionProps) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [primary, setPrimary] = useState(props.initialPrimary);
    const [selected, setSelected] = useState(props.initialSelected);
    const togglePrimary = () => setPrimary(!primary);
    const toggleSelected = () => setSelected(!selected);

    const extraClass = `dialog-option-${primary ? 'primary' : 'secondary'}${selected ? '-selected' : ''}`;
    const classes = `dialog-option rajdhani-semibold ${extraClass}`;
    return <div style={{display: "flex", flexDirection: "row"}}>
        <div className={classes} contentEditable>
            {props.initialText}
        </div>
        {!props.printing && <div style={{marginLeft: "8px"}}>
            <Popover isOpen={isPopoverOpen} content={<EditOptions togglePrimary={togglePrimary}
                                                                  remove={props.remove}
                                                                  add={props.addNew}
                                                                  toggleSelected={toggleSelected}></EditOptions>} positions="right" padding={10}>
                <div style={{backgroundColor: "black"}}>
                    <Button printing={props.printing} small label="Edit" click={() => setIsPopoverOpen(!isPopoverOpen)}></Button>
                </div>
            </Popover>
        </div>}
    </div>
}