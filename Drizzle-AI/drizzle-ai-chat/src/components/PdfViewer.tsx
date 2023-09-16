'use client'
import React, { useEffect } from 'react'
import pdfobject from "pdfobject";
type Props = {
    pdf_url:string
}

function usePdf(url: string) {
  useEffect(() => {
    pdfobject.embed(url, "#pdfcontainer", {
      height: "inherit",
      pdfOpenParams: { view: "FitW" }
      // supportRedirect: true
    });
  }, [url]);
}
const PdfViewer = ({pdf_url}: Props) => {
  usePdf(pdf_url);
  console.log(pdf_url)
  return (
    <div id="pdfcontainer" /> 
  )
}

export default PdfViewer