/* eslint-disable no-console */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { Tokenizer } from '@huggingface/tokenizers';
import synonyms from '../data/material/components/material-icons/synonyms.js';

/**
 * README
 *
 * Builds the semantic search index for the Material Icons page from the potion-base-8M static
 * embedding model (https://huggingface.co/minishlab/potion-base-8M).
 *
 * A static embedding model is a lookup table with one vector per token, so the browser does not
 * need the model or a tokenizer: this script precomputes one vector per word in the model's
 * vocabulary and one vector per icon (its name and synonyms). The search page adds up the
 * vectors of the words in the query and ranks icons by cosine similarity.
 *
 * Usage: `pnpm docs:mdicons:search-index`
 * Rerun after `synonyms.js` changes.
 */

const MODEL_ID = 'minishlab/potion-base-8M';
// Pinned so the committed index stays reproducible.
const MODEL_REVISION = 'bf8b056651a2c21b8d2565580b8569da283cab23';
// The model's 256 dimensions come from PCA and are ordered by variance. Keeping the first 64
// ranked as well as 128 or 256 on the test queries, at a quarter of the download size.
const DIMS = 64;

const ROOT = path.join(import.meta.dirname, '../..');
const OUT_DIR = path.join(ROOT, 'docs/public/static/material-icons');
const CACHE_DIR = path.join(os.tmpdir(), 'mui-icon-search-model', MODEL_REVISION);

async function download(file) {
  const target = path.join(CACHE_DIR, file);
  if (!fs.existsSync(target)) {
    const url = `https://huggingface.co/${MODEL_ID}/resolve/${MODEL_REVISION}/${file}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download ${url}: ${response.status}`);
    }
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
  }
  return fs.readFileSync(target);
}

// Reads the single F32 "embeddings" tensor from a safetensors file.
function readEmbeddings(buffer) {
  const headerLength = Number(buffer.readBigUInt64LE(0));
  const header = JSON.parse(buffer.subarray(8, 8 + headerLength).toString());
  const { dtype, shape, data_offsets: offsets } = header.embeddings;
  if (dtype !== 'F32') {
    throw new Error(`Unsupported dtype ${dtype}`);
  }
  const start = 8 + headerLength + offsets[0];
  const data = new Float32Array(
    buffer.buffer.slice(
      buffer.byteOffset + start,
      buffer.byteOffset + start + shape[0] * shape[1] * 4,
    ),
  );
  return { data, rows: shape[0], width: shape[1] };
}

function normalize(vector) {
  let norm = 0;
  for (const value of vector) {
    norm += value * value;
  }
  norm = Math.sqrt(norm) || 1;
  return vector.map((value) => value / norm);
}

// Symmetric int8 quantization with one scale per row.
function quantize(vectors) {
  const values = new Int8Array(vectors.length * DIMS);
  const scales = new Float32Array(vectors.length);
  vectors.forEach((vector, row) => {
    const max = Math.max(...vector.map(Math.abs)) || 1;
    scales[row] = max / 127;
    vector.forEach((value, i) => {
      values[row * DIMS + i] = Math.round(value / scales[row]);
    });
  });
  return { values, scales };
}

function nameWords(name) {
  return (name.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|\d+/g) ?? []).map((w) => w.toLowerCase());
}

async function run() {
  const [modelFile, tokenizerFile, tokenizerConfigFile] = await Promise.all([
    download('model.safetensors'),
    download('tokenizer.json'),
    download('tokenizer_config.json'),
  ]);
  const embeddings = readEmbeddings(modelFile);
  const tokenizerJson = JSON.parse(tokenizerFile.toString());
  const tokenizer = new Tokenizer(tokenizerJson, JSON.parse(tokenizerConfigFile.toString()));

  // Same as model2vec's StaticModel.encode: mean of the token vectors, then normalize.
  const encode = (text) => {
    const ids = tokenizer.encode(text, { add_special_tokens: false }).ids;
    const vector = new Array(DIMS).fill(0);
    for (const id of ids) {
      for (let i = 0; i < DIMS; i += 1) {
        vector[i] += embeddings.data[id * embeddings.width + i];
      }
    }
    return normalize(vector);
  };

  const icons = Object.keys(synonyms).sort();
  const iconTexts = icons.map((name) => `${nameWords(name).join(' ')} ${synonyms[name]}`);

  // Only words that are a single token in the model. Other words would get a vector built from
  // word pieces ("cog" becomes "co" + "g"), which is noise; keyword search covers those.
  const vocab = tokenizerJson.model.vocab;
  const words = Object.keys(vocab)
    .filter((token) => /^[a-z]{2,}$/.test(token))
    .sort();
  // Raw token vectors, not normalized: the model scales frequent words ("with", "the") down, and
  // the page adds up the vectors of the query's words, so that weighting has to be kept.
  const wordVectors = words.map((word) =>
    Array.from(
      embeddings.data.subarray(
        vocab[word] * embeddings.width,
        vocab[word] * embeddings.width + DIMS,
      ),
    ),
  );

  const wordIndex = quantize(wordVectors);
  const iconIndex = quantize(iconTexts.map(encode));

  // Binary layout: word scales (f32), icon scales (f32), word vectors (i8), icon vectors (i8).
  const binary = Buffer.concat([
    Buffer.from(wordIndex.scales.buffer),
    Buffer.from(iconIndex.scales.buffer),
    Buffer.from(wordIndex.values.buffer),
    Buffer.from(iconIndex.values.buffer),
  ]);
  const meta = { model: MODEL_ID, revision: MODEL_REVISION, dims: DIMS, words, icons };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'search-index.bin'), binary);
  fs.writeFileSync(path.join(OUT_DIR, 'search-index.json'), JSON.stringify(meta));
  console.log(`${words.length} words, ${icons.length} icons, ${DIMS} dimensions`);
}

run();
