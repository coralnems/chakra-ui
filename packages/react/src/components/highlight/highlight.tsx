"use client"

import { useHighlight } from "@ark-ui/react"
import { Fragment } from "react"
import { type SystemStyleObject } from "../../styled-system"
import { For } from "../for"
import { Mark } from "../typography/mark"

export interface HighlightChunk {
  text: string
  match: boolean
}

export interface HighlightProps {
  query: string | string[]
  children: string | ((props: HighlightChunk[]) => React.ReactNode)
  styles?: SystemStyleObject
}

/**
 * `Highlight` allows you to highlight substrings of a text.
 *
 * @see Docs https://chakra-ui.com/docs/components/highlight
 */
export function Highlight(props: HighlightProps): JSX.Element {
  const { children, query, styles } = props

  if (typeof children !== "string") {
    throw new Error("The children prop of Highlight must be a string")
  }

  const chunks = useHighlight({ query, text: children })

  return (
    <For each={chunks}>
      {(chunk, index) => {
        return chunk.match ? (
          <Mark key={index} css={styles}>
            {chunk.text}
          </Mark>
        ) : (
          <Fragment key={index}>{chunk.text}</Fragment>
        )
      }}
    </For>
  )
}
