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

function App() {
    const [printing, setPrinting] = useState(false);
    const [printPreview, setPrintPreview] = useState(false);


    async function exportImage() {
        setPrinting(true);
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
