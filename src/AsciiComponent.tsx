import React, { useState, useEffect, useRef } from "react";

function generateAsciiArt(): string {
  const lines = [
    "                                                           .                     ...     ..      ..                       ..    .          ..      ",
    '   :~"""88hx.                     .uef^"                  @88>                 x*8888x.:*8888: -"888:               x .d88"    @88>  < .z@8"`      ',
    " .~      ?888x      x.    .     :d88E                     %8P      .u    .    X   48888X `8888H  8888                5888R     %8P    !@88E        ",
    " X       '8888k   .@88k  z88u   `888E             u        .     .d88B :@8c  X8x.  8888X  8888X  !888>        u      '888R      .     '888E   u    ",
    '   H8h    8888X  ~"8888 ^8888    888E .z8k     us888u.   .@88u  ="8888f8888r X8888 X8888  88888   "*8%-    us888u.    888R    .@88u    888E u@8NL  ',
    '  ?888~   8888     8888  888R    888E~?888L .@88 "8888" \'\'888E`   4888>\'88"  \'*888!X8888> X8888  xH8>   .@88 "8888"   888R   \'\'888E`   888E`"88*"  ',
    "   %X   .X8*\"      8888  888R    888E  888E 9888  9888    888E    4888> '      `?8 `8888  X888X X888>   9888  9888    888R     888E    888E .dN.   ",
    '   .-"``"tnx.      8888  888R    888E  888E 9888  9888    888E    4888>        -^  \'888"  X888  8888>   9888  9888    888R     888E    888E~8888   ',
    "  :~      8888.    8888 ,888B .  888E  888E 9888  9888    888E   .d888L .+      dx '88~x. !88~  8888>   9888  9888    888R     888E    888E '888&  ",
    '  ~       X8888   "8888Y 8888"   888E  888E 9888  9888    888&   ^"8888*"     .8888Xf.888x:!    X888X.: 9888  9888   .888B .   888&    888E  9888. ',
    ' ...      \'8888L   `Y"   \'YP    m888N= 888> "888*""888"   R888"     "Y"      :""888":~"888"     `888*"  "888*""888"  ^*888%    R888" \'"888*" 4888" ',
    '\'888k     \'8888f                 `Y"   888   ^Y"   ^Y\'     ""                    "~\'    "~        ""     ^Y"   ^Y\'     "%       ""      ""    ""   ',
    ' 8888>    <8888                       J88"                                                                                                         ',
    " `888>    X888~                       @%                                                                                                           ",
    '  \'"88...x8""                       :"                                                                                                             ',
  ];

  return lines.join("\n");
}

const AsciiComponent: React.FC = () => {
  const [fontSize, setFontSize] = useState(16);
  const asciiRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (asciiRef.current) {
        const containerWidth = asciiRef.current.offsetWidth;
        const longestLineLength = Math.max(
          ...generateAsciiArt()
            .split("\n")
            .map((line) => line.length),
        );
        const newFontSize = Math.floor(containerWidth / longestLineLength);
        setFontSize(Math.min(Math.max(newFontSize, 6), 16)); // Clamp font size between 6px and 16px
      }
    };

    handleResize(); // Initial sizing
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <pre
      ref={asciiRef}
      style={{
        fontSize: `${fontSize}px`,
        lineHeight: "1",
        whiteSpace: "pre",
        overflow: "hidden",
        fontFamily: "monospace",
      }}
    >
      {generateAsciiArt()}
    </pre>
  );
};

export default AsciiComponent;
