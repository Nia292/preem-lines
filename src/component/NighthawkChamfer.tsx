import * as React from "react";
import "./NighthawkChamfer.css"

interface NighthawkChamferProps {
    children: React.ReactNode;
    color: string;
    align: "left" | "right"
}

export function NighthawkChamfer(props: NighthawkChamferProps) {
    const style = {"--chamfer-color": props.color } as React.CSSProperties;
    const alignClass = `chamfer-${props.align}`;
    return <div className={alignClass}>
        <div className="chamfer-parent" style={style}>
            <div className="chamfer-content">
                {props.children}
            </div>
            <div className="chamfer">
                <div className="chamfer-padding"></div>
                <div className="chamfer-bevel"></div>
            </div>
        </div>
    </div>
}