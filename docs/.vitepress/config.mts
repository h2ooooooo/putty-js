import {defineConfig} from 'vitepress';
import {auditBuiltDocs, installBaseLinks} from '../../scripts/doc-links.mjs';
import {nav, sidebar} from './navigation.mjs';

const docsBase = process.env.DOCS_BASE ?? '/';

export default defineConfig({
    base: docsBase,
    "title": "PuTTY / KiTTY JS",
    "description": "Inspect PuTTY and KiTTY connection profiles, discover the selected storage, and safely copy supported SSH settings.",
    "lang": "en-US",
    "appearance": false,
    "cleanUrls": false,
    markdown: {
        theme: 'github-dark-high-contrast',
        config(markdown) {
            installBaseLinks(markdown, docsBase);
        },
    },
    async buildEnd(site) {
        const result = await auditBuiltDocs(site.outDir, site.site.base, 'putty-js');

        console.log(`Documentation links verified: ${result.pages} pages, ${result.links} links.`);
    },
    "head": [
        [
            "meta",
            {
                "name": "theme-color",
                "content": "#171a1d"
            }
        ]
    ],
    "themeConfig": {
        "siteTitle": "PuTTY / KiTTY JS",
        "nav": nav,
        "sidebar": sidebar,
        "search": {
            "provider": "local"
        },
        "outline": [
            2,
            3
        ],
        "socialLinks": [
            {
                "icon": "github",
                "link": "https://github.com/h2ooooooo/putty-js"
            }
        ],
    }
});
