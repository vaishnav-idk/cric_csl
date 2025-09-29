declare module 'jspdf' {
  export class jsPDF {
    constructor(orientation?: string, unit?: string, format?: string | number[])
    text(text: string, x: number, y: number): void
    setFontSize(size: number): void
    save(filename: string): void
  }
}

declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf'
  
  interface AutoTableOptions {
    head?: any[][]
    body?: any[][]
    startY?: number
    styles?: any
    headStyles?: any
  }
  
  function autoTable(doc: jsPDF, options: AutoTableOptions): void
  export default autoTable
}
