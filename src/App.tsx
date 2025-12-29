import './App.css'
import {Speech} from "./component/speech/Speech.tsx";
import {useState} from "react";
import html2canvas from "html2canvas";
import {Button} from "./component/Button.tsx";
import {Dialog} from "./component/dialog/Dialog.tsx";
import * as React from "react";

function Background(props: {printing: boolean, children: React.ReactNode}) {
    if (props.printing) {
        return <div className="bg-image bg-image-transparent">
            {props.children}
        </div>
    }
    return <div className="bg-image bg-image-static">
        {props.children}
    </div>
}

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
    const [printing, setPrinting] = useState(false);
    const [printPreview, setPrintPreview] = useState(false);


    async function exportImage() {
        setPrinting(true);
        // Need to wait at least one full rendering cycle so the print button disappears
        await timeout(100)
        const canvas = await html2canvas(document.querySelector("#capture") as HTMLElement, {backgroundColor: null});
        const image = canvas.toDataURL("image/png");
        const aDownloadLink = document.createElement('a');
        aDownloadLink.download = 'canvas_image.png';
        aDownloadLink.href = image;
        aDownloadLink.click();
        setPrinting(false);
    }


    const isPrinting = printing || printPreview;

    return (
        <div id="capture">
            <div id="usage" className="cp2077-text">
                <ol>
                    <li>
                        Edit the content as needed
                        <ol>
                            <li>All text can be edited inline by clicking on the preset text</li>
                            <li>Press edit on the dialog options to add/remove/toggle options</li>
                            <li>Hover over Print to preview rendered result</li>
                        </ol>
                    </li>
                    <li>When ready, press F11 to enter full screen, then hit print</li>
                    <li>
                        A download will start, use the result as overlay for your screenshot
                        <ul>
                            <li>Rendering happens at your display resolution</li>
                            <li>Currently supported are 1080p and 1440p</li>
                        </ul>
                    </li>
                </ol>
            </div>
            <Background printing={isPrinting}>
                <Dialog printing={isPrinting}/>
                <Speech/>
                {!printing && <div className="print-button" onMouseEnter={() => setPrintPreview(true)}
                      onMouseLeave={() => setPrintPreview(false)}>
                    <Button printing={printing} click={exportImage} label="Print"/>
                </div>}
            </Background>
        </div>
    )
}

export default App
