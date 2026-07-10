/* eslint-disable no-console */
import url from 'url';
import * as fs from 'fs/promises';
import path from 'path';

interface Person {
  name: string;
}

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
const teamMembersPath = path.resolve(currentDirectory, '../data/about/teamMembers.json');
const imagesDirectory = path.resolve(currentDirectory, '../public/static/branding/about');

// Mirror the image filename derivation used in docs/src/components/about/Team.tsx.
function imageFileName(name: string) {
  return `${name
    .split(' ')
    .map((part) => part.toLowerCase())
    .join('-')}.png`;
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readCurrentMembers(): Promise<Person[]> {
  try {
    return JSON.parse(await fs.readFile(teamMembersPath, 'utf8'));
  } catch {
    return [];
  }
}

// Delete images of removed members and report new members missing a photo.
async function syncImagesAndSummary(previousMembers: Person[], people: Person[], ciMode: boolean) {
  const previousNames = new Set(previousMembers.map((person) => person.name));
  const nextNames = new Set(people.map((person) => person.name));
  const added = people.filter((person) => !previousNames.has(person.name));
  const removed = previousMembers.filter((person) => !nextNames.has(person.name));

  // Delete images of members who are no longer part of the team.
  await Promise.all(
    removed.map(async (person) => {
      const imagePath = path.join(imagesDirectory, imageFileName(person.name));
      if (await fileExists(imagePath)) {
        await fs.unlink(imagePath);
      }
    }),
  );

  // Flag new members whose image still needs to be added manually.
  const missingImages = (
    await Promise.all(
      added.map(async (person) => {
        const fileName = imageFileName(person.name);
        const exists = await fileExists(path.join(imagesDirectory, fileName));
        return exists ? null : `${person.name} (\`${fileName}\`)`;
      }),
    )
  ).filter((item): item is string => item !== null);

  const summary = missingImages.length
    ? `### ⚠️ Missing images\n\nAdd a photo for the following new members to \`docs/public/static/branding/about/\`:\n\n${missingImages
        .map((entry) => `- ${entry}`)
        .join('\n')}`
    : '';

  if (summary) {
    if (ciMode) {
      await fs.writeFile(process.env.SYNC_SUMMARY_FILE as string, summary, 'utf8');
    } else {
      console.log(summary);
    }
  }
}

async function run() {
  // Read the current roster before overwriting, only when a diff is needed.
  const previousMembers = process.env.SYNC_SUMMARY_FILE ? await readCurrentMembers() : [];

  const response = await fetch('https://frontend-public.mui.com/api/mui-about');
  const { people }: { people: Person[] } = await response.json();

  await fs.writeFile(teamMembersPath, JSON.stringify(people), 'utf8');

  await syncImagesAndSummary(previousMembers, people, !!process.env.SYNC_SUMMARY_FILE);

  console.log('done');
}

run();
