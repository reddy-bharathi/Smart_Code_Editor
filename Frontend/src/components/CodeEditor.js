/*import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { python } from "@codemirror/lang-python";
import { dracula } from "@uiw/codemirror-theme-dracula";



const CodeEditor = () => {
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [filename, setFilename] = useState("");

    

    const saveToBackend = async () => {
        if (!code || !filename) {
            alert("Please enter filename and code");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:5000/api/code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ language, code, filename })
            });
    
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Error saving code:", error);
            alert("Failed to save code.");
        }
    };


    const runJavaScriptCode = () => {
        try {
            let logs = [];
            const log = (...args) => logs.push(args.join(" "));
            const wrappedCode = `(function() { const console = { log: log }; ${code} })()`;
            new Function("log", wrappedCode)(log);
            setOutput(logs.join("\n") || "Execution successful.");
        } catch (err) {
            setError(`Error: ${err.message}`);
        }
    };

    const runWithPiston = async (lang, version = null) => {
        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: lang,
                    version: version,
                    files: [{ content: code }]
                })
            });

            const result = await response.json();
            if (result.run.stderr) {
                setError(result.run.stderr);
            } else {
                setOutput(result.run.stdout);
            }
        } catch (err) {
            setError("Error executing code.");
        }
    };

    const handleRunCode = () => {
        setOutput("");
        setError("");

        if (!code.trim()) {
            setError("Please enter some code to run.");
            return;
        }

        switch (language) {
            case "javascript":
                runJavaScriptCode();
                break;
            case "html":
                setOutput(code);
                break;
            case "python":
                runWithPiston("python", "3.10.0");
                break;
            case "java":
                runWithPiston("java", "15.0.2"); // Piston supports Java 15
                break;
            case "sql":
                runWithPiston("sql", "3.32.3"); // SQLite version supported by Piston
                break;
                  
            default:
                setError("This language is not supported yet.");
        }

        
        
    };

    const handleDownloadCode = () => {
        if (!code.trim()) {
            setError("There's no code to download.");
            return;
        }
    
        const extensionMap = {
            javascript: "js",
            html: "html",
            python: "py",
            java: "java",
            sql: "sql"
        };
    
        const extension = extensionMap[language] || "txt";
        const safeFilename = filename.trim() !== "" ? filename.trim() : "snippet";
        const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${safeFilename}.${extension}`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    
    

    const getExtensions = () => {
        switch (language) {
            case "javascript":
                return [javascript()];
            case "html":
                return [html()];
            case "python":
                return [python()];
            case "java":
                return []; // Java has no specific CodeMirror extension
            case "sql":
                runWithPiston("sqlite", "3.32.3");
                break;
            default:
                return [];
        }
    };
    

    return (
        <Container className="mt-5">
            <Card className="p-4">
                <h2 className="text-center">Online Code Editor</h2>

                <Form>
                    <Form.Group>
                        <Form.Label>Select Language</Form.Label>
                        <Form.Control as="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                            <option value="javascript">JavaScript</option>
                            <option value="html">HTML</option>
                            <option value="python">Python </option>
                            <option value="java">Java </option>
                            
                        </Form.Control>

                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Write Your Code</Form.Label>
                        <CodeMirror
                            value={code}
                            theme={dracula}
                            extensions={getExtensions()}
                            onChange={(value) => setCode(value)}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
    <Form.Label>Filename</Form.Label>
    <Form.Control
        type="text"
        placeholder="Enter filename"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
    />
</Form.Group>

<Button className="mt-3 me-2" variant="success" onClick={saveToBackend}>
    Save to Backend
</Button>

                    <Button className="mt-3" variant="primary" onClick={handleRunCode}>Run Code</Button>
                    <Button className="mt-3 ms-2" variant="success" onClick={handleDownloadCode}>Download Code
                    </Button>

                </Form>
                <Form.Group className="mt-3">
  <Form.Label>Enter Filename (without extension)</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter filename"
    value={filename}
    onChange={(e) => setFilename(e.target.value)}
  />
</Form.Group>


                {output && language !== "html" && (
                    <Alert variant="success" className="mt-3">
                        <strong>Output:</strong> <pre>{output}</pre>
                    </Alert>
                )}

                {output && language === "html" && (
                    <div className="mt-3">
                        <strong>Rendered HTML:</strong>
                        <iframe
                            title="Output"
                            srcDoc={output}
                            style={{ width: "100%", height: "300px", border: "1px solid #ccc" }}
                        ></iframe>
                    </div>
                )}

                {error && (
                    <Alert variant="danger" className="mt-3">
                        <strong>Error:</strong> <pre>{error}</pre>
                    </Alert>
                )}
            </Card>
        </Container>
    );
    
      
};

export default CodeEditor;





*/

import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { python } from "@codemirror/lang-python";
import { dracula } from "@uiw/codemirror-theme-dracula";

const CodeEditor = () => {
    const [language, setLanguage] = useState("javascript");
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [filename, setFilename] = useState("");

    const saveToBackend = async () => {
        if (!code || !filename) {
            alert("Please enter filename and code");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ language, code, filename })
            });

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.error("Error saving code:", error);
            alert("Failed to save code.");
        }
    };

    const runJavaScriptCode = () => {
        try {
            let logs = [];
            const log = (...args) => logs.push(args.join(" "));
            const wrappedCode = `(function() { const console = { log: log }; ${code} })()`;
            new Function("log", wrappedCode)(log);
            setOutput(logs.join("\n") || "Execution successful.");
        } catch (err) {
            setError(`Error: ${err.message}`);
        }
    };

    const runWithPiston = async (lang, version = null) => {
        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    language: lang,
                    version: version,
                    files: [{ content: code }]
                })
            });

            const result = await response.json();
            if (result.run.stderr) {
                setError(result.run.stderr);
            } else {
                setOutput(result.run.stdout);
            }
        } catch (err) {
            setError("Error executing code.");
        }
    };

    const handleRunCode = () => {
        setOutput("");
        setError("");

        if (!code.trim()) {
            setError("Please enter some code to run.");
            return;
        }

        switch (language) {
            case "javascript":
                runJavaScriptCode();
                break;
            case "html":
                setOutput(code);
                break;
            case "python":
                runWithPiston("python", "3.10.0");
                break;
            case "java":
                runWithPiston("java", "15.0.2");
                break;
            case "sql":
                runWithPiston("sql", "3.32.3");
                break;
            case "c":
                runWithPiston("c", "10.2.0");
                break;
            default:
                setError("This language is not supported yet.");
        }
    };

    const handleDownloadCode = () => {
        if (!code.trim()) {
            setError("There's no code to download.");
            return;
        }

        const extensionMap = {
            javascript: "js",
            html: "html",
            python: "py",
            java: "java",
            sql: "sql",
            c: "c"
        };

        const extension = extensionMap[language] || "txt";
        const safeFilename = filename.trim() !== "" ? filename.trim() : "snippet";
        const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${safeFilename}.${extension}`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const getExtensions = () => {
        switch (language) {
            case "javascript":
                return [javascript()];
            case "html":
                return [html()];
            case "python":
                return [python()];
            case "java":
            case "sql":
            case "c":
                return [];
            default:
                return [];
        }
    };

    return (
        <Container className="mt-5">
            <Card className="p-4">
                <h2 className="text-center">Online Code Editor</h2>

                <Form>
                    <Form.Group>
                        <Form.Label>Select Language</Form.Label>
                        <Form.Control as="select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                            <option value="javascript">JavaScript</option>
                            <option value="html">HTML</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                            <option value="c">C</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Write Your Code</Form.Label>
                        <CodeMirror
                            value={code}
                            theme={dracula}
                            extensions={getExtensions()}
                            onChange={(value) => setCode(value)}
                        />
                    </Form.Group>

                    <Form.Group className="mt-3">
                        <Form.Label>Filename</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter filename"
                            value={filename}
                            onChange={(e) => setFilename(e.target.value)}
                        />
                    </Form.Group>

                    <Button className="mt-3 me-2" variant="success" onClick={saveToBackend}>
                        Save to Backend
                    </Button>

                    <Button className="mt-3" variant="primary" onClick={handleRunCode}>
                        Run Code
                    </Button>

                    <Button className="mt-3 ms-2" variant="success" onClick={handleDownloadCode}>
                        Download Code
                    </Button>
                </Form>

                {output && language !== "html" && (
                    <Alert variant="success" className="mt-3">
                        <strong>Output:</strong> <pre>{output}</pre>
                    </Alert>
                )}

                {output && language === "html" && (
                    <div className="mt-3">
                        <strong>Rendered HTML:</strong>
                        <iframe
                            title="Output"
                            srcDoc={output}
                            style={{ width: "100%", height: "300px", border: "1px solid #ccc" }}
                        ></iframe>
                    </div>
                )}

                {error && (
                    <Alert variant="danger" className="mt-3">
                        <strong>Error:</strong> <pre>{error}</pre>
                    </Alert>
                )}
            </Card>
        </Container>
    );
};

export default CodeEditor;


