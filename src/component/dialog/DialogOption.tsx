import {Button} from "../Button.tsx";
import { Popover } from 'react-tiny-popover'
import {useState} from "react";
import type {FnAction} from "../../types.ts";
import {NighthawkChamfer} from "../NighthawkChamfer.tsx";

function EditOptions(props: {printing: boolean, open: boolean, togglePrimary: FnAction, toggleSelected: FnAction, add: FnAction, remove: FnAction, toggleOpen: FnAction}) {
    if (props.printing) {
        return <></>
    }
    const content = <div style={{backgroundColor: "rgba(0, 0, 0, 0.8)", display: "flex", flexDirection: "row"}}>
        <Button label="Remove" small printing={false} click={props.remove}></Button>
        <Button label="Add New" small printing={false} click={props.add}></Button>
        <Button label="Toggle Primary" small printing={false} click={props.togglePrimary}></Button>
        <Button label="Toggle Selected" small printing={false} click={props.toggleSelected}></Button>
    </div>

    return <div style={{marginLeft: "8px"}}>
        <Popover isOpen={props.open} content={content} positions="right" padding={10}>
            <div style={{backgroundColor: "black"}}>
                <Button printing={props.printing} small label="Edit" click={props.toggleOpen}></Button>
            </div>
        </Popover>
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

    const extraClass = `dialog-option-${primary ? 'primary' : 'secondary'}`;
    const classes = `dialog-option cp2077-text ${extraClass}`;
    if (selected) {
        return  <div style={{height: "100%", display: "flex", flexDirection: "row"}}>
            <NighthawkChamfer align="right" color={primary ? "var(--color-accent)": "var(--color-alternative)"}>
                <span contentEditable className="dialog-option-text cp2077-text">{props.initialText}</span>
            </NighthawkChamfer>
            <EditOptions printing={props.printing}
                         add={props.addNew}
                         remove={props.remove}
                         togglePrimary={togglePrimary}
                         toggleSelected={toggleSelected}
                         open={isPopoverOpen}
                         toggleOpen={() => setIsPopoverOpen(!isPopoverOpen)}>
            </EditOptions>
        </div>

    }
    return <div style={{display: "flex", flexDirection: "row"}}>
        <div className={classes}>
            <span contentEditable className="dialog-option-text">{props.initialText}</span>
        </div>
        <EditOptions printing={props.printing}
                     add={props.addNew}
                     remove={props.remove}
                     togglePrimary={togglePrimary}
                     toggleSelected={toggleSelected}
                     open={isPopoverOpen}
                     toggleOpen={() => setIsPopoverOpen(!isPopoverOpen)}>
        </EditOptions>
    </div>
}