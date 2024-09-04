import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import AsciiComponent from "./AsciiComponent";
const GRUVBOX = {
  bg: "#282828",
  fg: "#ebdbb2",
  red: "#cc241d",
  green: "#98971a",
  yellow: "#d79921",
  blue: "#458588",
  purple: "#b16286",
  aqua: "#689d6a",
  gray: "#a89984",
};

type Command = {
  command: string;
  output: string | JSX.Element;
};

const commands: { [key: string]: string | JSX.Element } = {
  help: (
    <div>
      Available commands:
      <br />
      - about: Learn about me
      <br />
      - skills: View my technical skills
      <br />
      - projects: See my projects
      <br />
      - contact: Get my contact information
      <br />- clear: Clear the terminal
    </div>
  ),
  about:
    "Hi, I'm Zuhair Malik. I'm a passionate developer with experience and passion in artificial intelligence and building things.",
  skills:
    "My skills include: React, TS/JS, Python, PyTorch, Tensorflow, Rust, C++ and many more!.",
  projects: (
    <div>
      1. Neural Network from scratch - Writing a neural network from scratch
      using Rust
      <br />
      2. Cauliflower Detection - Using YoloV5 model to detect Cauliflower
      maturity using object detection
      <br />
      3. Personal Finance Tracker App - Finance tracking application for users
    </div>
  ),
  contact:
    "Email: zuhairm2001@hotmail.com\nGitHub: github.com/zuhairm2001\nLinkedIn: https://www.linkedin.com/in/zuhair-malik-53322919b/",
};

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<Command[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim().toLowerCase();
    let result: string | JSX.Element =
      "Command not found. Type 'help' for a list of commands.";

    if (trimmedInput === "clear") {
      setOutput([]);
    } else if (commands[trimmedInput]) {
      result = commands[trimmedInput];
    }

    if (trimmedInput !== "clear") {
      setOutput([...output, { command: input, output: result }]);
    }

    setInput("");
  };

  return (
    <div
      style={{
        backgroundColor: GRUVBOX.bg,
        color: GRUVBOX.fg,
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "monospace",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ color: GRUVBOX.yellow }}>
          <AsciiComponent />
        </h1>
        <p>Type 'help' to see available commands.</p>
      </div>
      <div style={{ marginBottom: "20px" }}>
        {output.map((cmd, index) => (
          <div key={index}>
            <div style={{ color: GRUVBOX.green }}>$ {cmd.command}</div>
            <div style={{ marginLeft: "10px" }}>{cmd.output}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleInputSubmit}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ color: GRUVBOX.blue, marginRight: "5px" }}>$</span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: GRUVBOX.fg,
              fontFamily: "inherit",
              fontSize: "inherit",
              outline: "none",
              width: "100%",
            }}
            autoFocus
          />
        </div>
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
