import type {DefaultTheme} from 'vitepress';

export const nav: DefaultTheme.NavItem[] = [
    {
        'text': 'Overview',
        'link': '/'
    },
    {
        'text': 'API',
        'link': '/api/',
        'activeMatch': "^(?!/$|(/cli/|/reference/cli|/reference/jsbrains-help|/reference/jsbrains-output|/guide/local-demo)).+",
    },
    {
        'text': 'CLI',
        'link': '/cli/',
        'activeMatch': "^(/cli/|/reference/cli|/reference/jsbrains-help|/reference/jsbrains-output|/guide/local-demo)",
    },
    {
        'text': 'Portline family',
        'link': 'https://h2ooooooo.github.io/portline/libraries/'
    }
];

const apiSidebar: DefaultTheme.SidebarItem[] = [
    {
        'text': 'Getting started',
        'collapsed': false,
        'items': [
            {
                'text': 'API overview',
                'link': '/api/',
            },
            {
                'text': 'Installation',
                'link': '/guide/installation'
            },
            {
                'text': 'Quick start with output',
                'link': '/api/quick-start'
            },
            {
                'text': 'How it works',
                'link': '/guide/how-it-works',
            },
{"text":"Example languages and setup","link":"/guide/examples"},
{"text":"Synthetic fixture files","link":"/guide/fixtures"}
        ]
    },
    {
        'text': 'Common tasks',
        'collapsed': false,
        'items': [
            {
                'text': 'Read, select and search',
                'link': '/api/profiles'
            },
{"text":"KiTTY and native options","link":"/guide/kitty"},
            {
                'text': 'Storage and discovery',
                'link': '/guide/storage'
            }
        ]
    },
    {
        'text': 'Advanced usage',
        'collapsed': false,
        'items': [
            {
                'text': 'Preview, write and sync',
                'link': '/guide/writing'
            },
            {
                'text': 'FTP/SFTP and SSH execution',
                'link': '/api/integration'
            },
            {
                'text': 'Limits and safeguards',
                'link': '/guide/limitations'
            }
        ]
    },
    {
        'text': 'API reference',
        'collapsed': true,
        'items': [
            {
                'text': 'Methods and return values',
                'link': '/reference/api'
            },
            {
                'text': 'Exact TypeScript signatures',
                'link': '/reference/types'
            }
        ]
    },
    {
        'text': 'Contributing',
        'collapsed': true,
        'items': [
            {
                'text': 'Development',
                'link': '/development'
            }
        ]
    }
];

const cliSidebar: DefaultTheme.SidebarItem[] = [
    {
        'text': 'Getting started',
        'collapsed': false,
        'items': [
            {
                'text': 'CLI overview',
                'link': '/cli/',
            },
            {
                'text': 'Quick start with output',
                'link': '/cli/quick-start'
            },
            {
                'text': 'How it works',
                'link': '/guide/how-it-works',
            },
{"text":"Runnable fixture commands","link":"/cli/fixture-output"},
            {
                'text': 'Repository fixture runner',
                'link': '/guide/local-demo'
            }
        ]
    },
    {
        'text': 'Commands',
        'collapsed': false,
        'items': [
            {
                'text': 'List, search, get and sources',
                'link': '/cli/queries'
            },
            {
                'text': 'Write, sync, apply and status',
                'link': '/cli/writing'
            }
        ]
    },
    {
        'text': 'Configuration and automation',
        'collapsed': false,
        'items': [
            {
                'text': 'Source selection and output',
                'link': '/reference/cli'
            },
            {
                'text': 'JSON, errors and troubleshooting',
                'link': '/cli/automation'
            },
            {
                'text': 'Storage selection rules',
                'link': '/guide/storage'
            }
        ]
    },
    {
        'text': 'CLI reference',
        'collapsed': true,
        'items': [
            {
                'text': 'Every input and default',
                'link': '/reference/cli-help'
            },
            {
                'text': 'Captured coloured and JSON output',
                'link': '/reference/cli-output'
            }
        ]
    }
];

export const sidebar: DefaultTheme.Sidebar = {
    '/cli/': cliSidebar,
    '/reference/cli': cliSidebar,
    '/reference/jsbrains-help': cliSidebar,
    '/reference/jsbrains-output': cliSidebar,
    '/guide/local-demo': cliSidebar,
    '/': apiSidebar,
};
