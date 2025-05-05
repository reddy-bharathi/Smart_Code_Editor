/*import React, { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import axios from "axios";

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setOutput("");
        setError("");
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("http://localhost:5000/api/upload", formData);
            if (response.data.error) {
                setError(response.data.error);
            } else {
                setOutput(response.data.output);
            }
        } catch (err) {
            setError("Error uploading file. Please try again.");
        }
    };

    return (
        <Container className="mt-5">
            <Card className="p-4">
                <h2 className="text-center">Upload Code File</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Select a File</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} />
                    </Form.Group>
                    <Button className="mt-3" variant="primary" onClick={handleUpload}>Run Code</Button>
                </Form>

                {output && (
                    <Alert variant="success" className="mt-3">
                        <strong>Output:</strong> <pre>{output}</pre>
                    </Alert>
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

export default Upload;
*/

/*import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFileContent(event.target.result);
            };
            reader.readAsText(file);
        }
    };

    const handleRunCode = () => {
        setOutput("");
        setError("");

        if (!fileContent) {
            setError("Please upload a file with code.");
            return;
        }

        if (!selectedFile.name.endsWith(".js")) {
            setError("Only JavaScript files can be executed in the browser.");
            return;
        }

        try {
            let capturedOutput = [];
            const originalConsoleLog = console.log;

            // Capture console.log output
            console.log = (...args) => {
                capturedOutput.push(args.join(" "));
            };

            eval(fileContent);

            // Restore original console.log
            console.log = originalConsoleLog;

            setOutput(capturedOutput.length ? capturedOutput.join("\n") : "Execution successful but no output.");
        } catch (err) {
            setError(`Error in execution: ${err.message}`);
        }
    };

    return (
        <Container className="mt-5">
            <Card className="p-4">
                <h2 className="text-center">Upload & Run Code</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Select a Code File</Form.Label>
                        <Form.Control type="file" onChange={handleFileChange} accept=".js" />
                    </Form.Group>
                    <Button className="mt-3" variant="primary" onClick={handleRunCode}>Run Code</Button>
                </Form>

                {fileContent && (
                    <Alert variant="info" className="mt-3">
                        <strong>Code Preview:</strong> <pre>{fileContent}</pre>
                    </Alert>
                )}

                {output && (
                    <Alert variant="success" className="mt-3">
                        <strong>Output:</strong> <pre>{output}</pre>
                    </Alert>
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

export default Upload;
*/

import React, { useState } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileContent, setFileContent] = useState("");
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [fileType, setFileType] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFileContent(event.target.result);
                setFileType(file.name.split('.').pop().toLowerCase());
            };
            reader.readAsText(file);
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
                    files: [{ content: fileContent }]
                })
            });

            const result = await response.json();
            if (result.run.stderr) {
                setError(result.run.stderr);
                setOutput("");
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

        if (!fileContent) {
            setError("Please upload a file with code.");
            return;
        }

        if (fileType === "js") {
            try {
                let capturedOutput = [];
                const originalConsoleLog = console.log;
                console.log = (...args) => {
                    capturedOutput.push(args.join(" "));
                };

                eval(fileContent);

                console.log = originalConsoleLog;

                setOutput(capturedOutput.length ? capturedOutput.join("\n") : "Execution successful but no output.");
            } catch (err) {
                setError(`Error in execution: ${err.message}`);
            }
        } else if (fileType === "html" || fileType === "css") {
            const blob = new Blob([fileContent], { type: fileType === "html" ? "text/html" : "text/css" });
            const url = URL.createObjectURL(blob);
            setOutput(url);
        } else if (fileType === "c") {
            runWithPiston("c", "10.2.0"); // Version supported by Piston
        } else {
            setError("Unsupported file type. Please upload a JavaScript, HTML, CSS, or C file.");
        }
    };

    return (
        <Container className="mt-5">
            <Card className="p-4">
                <h2 className="text-center">Upload & Run Code</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Select a Code File</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleFileChange}
                            accept=".js,.html,.css,.c"
                        />
                    </Form.Group>
                    <Button className="mt-3" variant="primary" onClick={handleRunCode}>
                        Run Code
                    </Button>
                </Form>

                {fileContent && (
                    <Alert variant="info" className="mt-3">
                        <strong>Code Preview:</strong> <pre>{fileContent}</pre>
                    </Alert>
                )}

                {output && (fileType === "js" || fileType === "c") && (
                    <Alert variant="success" className="mt-3">
                        <strong>Output:</strong> <pre>{output}</pre>
                    </Alert>
                )}

                {output && (fileType === "html" || fileType === "css") && (
                    <div className="mt-3">
                        <strong>Rendered Output:</strong>
                        <iframe
                            src={output}
                            title="Rendered Output"
                            style={{ width: "100%", height: "400px", border: "1px solid #ccc" }}
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

export default Upload;


