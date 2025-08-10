"use client"

import React from "react"
import { FileTrigger } from "react-aria-components"

import { Button } from "@/components/ui/button"

export default function  FileTriggerButton() {
  // Demo to show how to get file name to display.
  const [file, setFile] = React.useState<string[]>()

  return (
    <FileTrigger
      onSelect={(e) => {
        if (!e) return
        const files = Array.from(e)
        const filenames = files.map((file) => file.name)
        setFile(filenames)
      }}
    >
      <Button>Select a file</Button>
      {file && file}
    </FileTrigger>
  )
}

