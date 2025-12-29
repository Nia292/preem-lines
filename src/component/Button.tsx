import "./Button.css"
import type {FnAction} from "../types.ts";

export function Button(props: { printing: boolean, label: string, click: FnAction, small?: boolean }) {
    if (props.printing) {
        return <></>
    }
    if (props.small) {
        return <div className="button button-small cp2077-text noselect" onClick={props.click}>{props.label}</div>
    }
    return <div className="button button-regular cp2077-text noselect" onClick={props.click}>{props.label}</div>
}