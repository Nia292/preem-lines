import "./Button.css"
import type {FnAction} from "../types.ts";

export function Button(props: { printing: boolean, label: string, click: FnAction, small?: boolean }) {
    if (props.printing) {
        return <></>
    }
    if (props.small) {
        return <div className="button button-small rajdhani-bold noselect" onClick={props.click}>{props.label}</div>
    }
    return <div className="button button-regular rajdhani-bold noselect" onClick={props.click}>{props.label}</div>
}