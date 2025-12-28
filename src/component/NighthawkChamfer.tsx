import * as React from "react";
import "./NighthawkChamfer.css"

export function NighthawkChamfer(props: {children: React.ReactNode}) {
    return <div className="chamfer-parent">
        <div className="chamfer-content">
            {props.children}
        </div>

        <div className="chamfer">
            <div className="chamfer-padding"></div>
            <div className="chamfer-bevel"></div>
        </div>
    </div>
}