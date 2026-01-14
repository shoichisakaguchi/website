#!/usr/bin/env node
/**
 * Migration script for Journal Club entries
 *
 * Converts old format:
 *   speaker: "Dr. Name (Affiliation)"
 *   paperUrl: "https://..."
 *
 * To new format:
 *   speakerName: "Dr. Name"
 *   speakerAffiliation: "Affiliation"
 *   links:
 *     - label: "Link"
 *       url: "https://..."
 *       isPrimary: true
 *   calendarUrl: (empty)
 *   zoomUrl: (empty)
 *   showZoomLink: false
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const journalClubDir = path.join(__dirname, '../src/content/journal-club');

/**
 * Parse speaker string into name and affiliation
 * Examples:
 *   "Dr. Gytis Dudas (Vilnius University)" -> { name: "Dr. Gytis Dudas", affiliation: "Vilnius University" }
 *   "Dr. Name" -> { name: "Dr. Name", affiliation: null }
 */
function parseSpeaker(speaker) {
    if (!speaker) return { name: null, affiliation: null };

    // Match pattern: "Name (Affiliation)" - find the last parenthetical
    const match = speaker.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
    if (match) {
        return {
            name: match[1].trim(),
            affiliation: match[2].trim()
        };
    }

    // No parentheses found, treat entire string as name
    return {
        name: speaker.trim(),
        affiliation: null
    };
}

/**
 * Parse YAML frontmatter from file content
 */
function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return null;

    return {
        frontmatter: match[1],
        body: match[2]
    };
}

/**
 * Parse simple YAML (handles our specific use case)
 */
function parseYaml(yaml) {
    const result = {};
    const lines = yaml.split('\n');

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Handle boolean
        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        // Handle quoted strings
        else if ((value.startsWith('"') && value.endsWith('"')) ||
                 (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        result[key] = value;
    }

    return result;
}

/**
 * Detect link label based on URL
 */
function detectLinkLabel(url) {
    if (!url) return 'Link';

    const lowerUrl = url.toLowerCase();

    if (lowerUrl.includes('github.com')) return 'Code';
    if (lowerUrl.includes('doi.org') || lowerUrl.includes('wiley.com') ||
        lowerUrl.includes('oup.com') || lowerUrl.includes('nature.com') ||
        lowerUrl.includes('science.org') || lowerUrl.includes('pnas.org') ||
        lowerUrl.includes('ncbi.nlm.nih.gov')) return 'Paper';
    if (lowerUrl.includes('arxiv.org') || lowerUrl.includes('biorxiv.org') ||
        lowerUrl.includes('medrxiv.org')) return 'Preprint';

    return 'Link';
}

/**
 * Build new YAML frontmatter
 */
function buildNewFrontmatter(data, speakerName, speakerAffiliation, links) {
    const lines = ['---'];

    lines.push(`title: ${data.title}`);
    lines.push(`date: ${data.date}`);
    lines.push(`isPinned: ${data.isPinned || false}`);

    if (speakerName) {
        lines.push(`speakerName: ${speakerName}`);
    }
    if (speakerAffiliation) {
        lines.push(`speakerAffiliation: ${speakerAffiliation}`);
    }

    if (links && links.length > 0) {
        lines.push('links:');
        for (const link of links) {
            lines.push(`  - label: ${link.label}`);
            lines.push(`    url: ${link.url}`);
            lines.push(`    isPrimary: ${link.isPrimary}`);
        }
    }

    lines.push('---');
    return lines.join('\n');
}

/**
 * Migrate a single file
 */
function migrateFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = parseFrontmatter(content);

    if (!parsed) {
        console.log(`  Skipped (no frontmatter): ${path.basename(filePath)}`);
        return false;
    }

    const data = parseYaml(parsed.frontmatter);

    // Check if already migrated (has speakerName field)
    if (data.speakerName !== undefined) {
        console.log(`  Already migrated: ${path.basename(filePath)}`);
        return false;
    }

    // Parse speaker
    const { name: speakerName, affiliation: speakerAffiliation } = parseSpeaker(data.speaker);

    // Convert paperUrl to links array
    const links = [];
    if (data.paperUrl) {
        links.push({
            label: detectLinkLabel(data.paperUrl),
            url: data.paperUrl,
            isPrimary: true
        });
    }

    // Build new content
    const newFrontmatter = buildNewFrontmatter(data, speakerName, speakerAffiliation, links);
    const newContent = newFrontmatter + '\n' + parsed.body;

    // Write back
    fs.writeFileSync(filePath, newContent);
    console.log(`  Migrated: ${path.basename(filePath)}`);
    console.log(`    Speaker: "${data.speaker}" -> name="${speakerName}", affiliation="${speakerAffiliation}"`);
    if (data.paperUrl) {
        console.log(`    Paper URL -> links[0]: ${detectLinkLabel(data.paperUrl)}`);
    }

    return true;
}

/**
 * Main migration function
 */
function main() {
    console.log('Journal Club Migration Script');
    console.log('=============================\n');

    const files = fs.readdirSync(journalClubDir)
        .filter(f => f.endsWith('.mdoc'))
        .map(f => path.join(journalClubDir, f));

    console.log(`Found ${files.length} journal club entries\n`);

    let migratedCount = 0;
    for (const file of files) {
        if (migrateFile(file)) {
            migratedCount++;
        }
    }

    console.log(`\nMigration complete: ${migratedCount} files updated`);
}

main();
