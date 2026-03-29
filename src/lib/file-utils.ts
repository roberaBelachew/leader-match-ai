import * as pdfjsLib from "pdfjs-dist";
import * as XLSX from "xlsx";

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

/** Supported file extensions */
export const SUPPORTED_EXTENSIONS = ".pdf,.csv,.xlsx,.xls,.json,.txt,.doc,.docx,.xml,.tsv";

export const SUPPORTED_FORMATS_LABEL = "PDF, CSV, Excel, JSON, TXT, XML, TSV, DOC/DOCX";

/** Extract text content from any supported file */
export async function extractTextFromFile(file: File): Promise<string> {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";

  switch (ext) {
    case "pdf":
      return extractPdf(file);
    case "csv":
    case "tsv":
      return readAsText(file);
    case "xlsx":
    case "xls":
      return extractExcel(file);
    case "json":
      return extractJson(file);
    case "txt":
      return readAsText(file);
    case "xml":
      return readAsText(file);
    case "doc":
    case "docx":
      return extractDocx(file);
    default:
      // Fallback: try reading as text
      return readAsText(file);
  }
}

async function readAsText(file: File): Promise<string> {
  return file.text();
}

async function extractPdf(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const textParts: string[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(" ");
    textParts.push(pageText);
  }

  return textParts.join("\n\n");
}

async function extractExcel(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const parts: string[] = [];

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    const csv = XLSX.utils.sheet_to_csv(sheet);
    parts.push(`--- Sheet: ${sheetName} ---\n${csv}`);
  }

  return parts.join("\n\n");
}

async function extractJson(file: File): Promise<string> {
  const text = await file.text();
  try {
    const parsed = JSON.parse(text);
    // Pretty-print for better AI readability
    return JSON.stringify(parsed, null, 2);
  } catch {
    return text;
  }
}

async function extractDocx(file: File): Promise<string> {
  // DOCX files are ZIP archives. We extract text from word/document.xml
  const arrayBuffer = await file.arrayBuffer();
  try {
    const JSZip = (await import("jszip")).default;
    const zip = await JSZip.loadAsync(arrayBuffer);
    const docXml = await zip.file("word/document.xml")?.async("string");
    if (!docXml) return "[Could not extract text from DOCX]";
    // Strip XML tags to get plain text
    return docXml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  } catch {
    return "[Could not parse DOCX file. Try converting to PDF or TXT.]";
  }
}
