"use client"

import { useEffect, useState } from "react"

const codeWords = [
  "function()",
  "const",
  "let",
  "var",
  "return",
  "if",
  "else",
  "for",
  "while",
  "class",
  "import",
  "export",
  "async",
  "await",
  "try",
  "catch",
  "new",
  "this",
  "super",
  "extends",
  "interface",
  "type",
  "enum",
  "public",
  "private",
  "useState",
  "useEffect",
  "props",
  "state",
  "render",
  "component",
  "SELECT",
  "FROM",
  "WHERE",
  "INSERT",
  "UPDATE",
  "DELETE",
  "JOIN",
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "API",
  "{}",
  "[]",
  "=>",
  "&&",
  "||",
  "===",
  "!==",
  "++",
  "--",
  "array",
  "object",
  "string",
  "number",
  "boolean",
  "null",
  "undefined",
  "promise",
  "callback",
  "closure",
  "prototype",
  "constructor",
  "method",
  "property",
  "parameter",
  "argument",
  "variable",
  "scope",
  "hoisting",
  "bind",
  "call",
  "apply",
  "map",
  "filter",
  "reduce",
  "forEach",
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "slice",
  "indexOf",
  "includes",
  "find",
  "some",
  "every",
  "sort",
  "reverse",
  "join",
  "split",
  "replace",
  "match",
  "search",
  "test",
  "exec",
]

const coloredWords = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "API",
  "function()",
  "async",
  "await",
  "useState",
  "useEffect",
  "SELECT",
  "INSERT",
  "UPDATE",
  "DELETE",
]

const colors = [
  "text-blue-400",
  "text-green-400",
  "text-purple-400",
  "text-red-400",
  "text-cyan-400",
  "text-yellow-400",
  "text-pink-400",
  "text-orange-400",
  "text-emerald-400",
  "text-violet-400",
  "text-rose-400",
  "text-indigo-400",
  "text-lime-400",
  "text-teal-400",
  "text-fuchsia-400",
  "text-amber-400",
]

export default function FloatingCodeBackground() {
  const [words, setWords] = useState<
    Array<{
      id: number
      word: string
      left: number
      delay: number
      duration: number
      color?: string
    }>
  >([])

  useEffect(() => {
    const generateWords = () => {
      const newWords = Array.from({ length: 192 }, (_, i) => {
        const word = codeWords[Math.floor(Math.random() * codeWords.length)]
        const shouldHaveColor = coloredWords.includes(word) && Math.random() > 0.1

        return {
          id: i,
          word,
          left: Math.random() * 90,
          delay: Math.random() * 10,
          duration: 15 + Math.random() * 10,
          color: shouldHaveColor ? colors[Math.floor(Math.random() * colors.length)] : undefined,
        }
      })
      setWords(newWords)
    }

    generateWords()
    const interval = setInterval(generateWords, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="floating-code">
      {words.map((word) => (
        <div
          key={word.id}
          className={`code-word ${word.color || ""}`}
          style={{
            left: `${word.left}%`,
            animationDelay: `${word.delay}s`,
            animationDuration: `${word.duration}s`,
          }}
        >
          {word.word}
        </div>
      ))}
    </div>
  )
}
