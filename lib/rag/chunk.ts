// TODO: Implement document chunking.
// Decide how to split product catalogs, FAQs, and policies into retrievable
// chunks while preserving useful metadata for citations.

export function chunkDocument(content: string) {

  const chunkSize = 250;
  const overlap = 40;

  // use one or more whitespace characters to split
  const words = content.trim().split(/\s+/); 

  const chunks = [];

  let start = 0;

  while (start < words.length){
    const end = Math.min(start + chunkSize, words.length);
    const chunkWords = words.slice(start, end);

    chunks.push({
      chunk_index: chunks.length,
      content: chunkWords.join(" "),
      token_count: chunkWords.length,
      metadata: {
        wordStart: start,
        wordEnd: end
      }
    })

    // end if finished last chunk
    if (end === words.length){
      break;
    }

    // start at an overlap of 40 words
    start = end - overlap;
  }

  return chunks;
}
