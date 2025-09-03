import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Orígenes Cristianos',
  tagline: 'Traducción de textos cristianos antiguos',
  favicon: 'img/write.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://origenes.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/origenes/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Mauriceac', // Usually your GitHub org/user name.
  projectName: 'Origenes', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'ignore',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Mauriceac/origenes/tree/main',
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/Mauriceac/origenes/tree/main',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/write.png',
    docs: {
      sidebar: {
        hideable: true,
      }
    },
    navbar: {
      title: 'Orígenes Cristianos',
      logo: {
        alt: 'Orígenes Logo',
        src: 'img/write.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'crisostomoSidebar',
          position: 'left',
          label: 'San Juan Crisóstomo',
        },
        {
          type: 'docSidebar',
          sidebarId: 'maximoSidebar',
          position: 'left',
          label: 'San Máximo Confesor',
        },
        {
          type: 'docSidebar',
          sidebarId: 'efrenSidebar',
          position: 'left',
          label: 'San Efrén de Siria',
        },
        {
          type: 'docSidebar',
          sidebarId: 'searchSidebar',
          position: 'left',
          label: 'Buscador de Lemmas',
        },
        {
          href: 'https://github.com/Mauriceac/origenes',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Contact',
          items: [
            {
              label: 'Email',
              to: 'mailto:mlalvara@uc.cl',
            },
            {
              label: 'LinkedIn',
              to: 'https://www.linkedin.com/in/maurice-alvarado-9751b03a/'
            }
          ],
        },
        {
          title: 'Repositorio',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/Mauriceac/origenes',
            }
          ],
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Orígenes, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [require.resolve('docusaurus-lunr-search')],
};

export default config;
