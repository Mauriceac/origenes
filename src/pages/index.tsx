import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}
    >
      <main style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        background: 'var(--text-box)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: 'var(--ifm-color-primary)'
        }}>
          {siteConfig.title}
        </h1>
        <p style={{
          fontSize: '1.5rem',
          color: 'var(--ifm-color-primary-lightest)',
          marginBottom: '2rem',
          textAlign: 'center',
          maxWidth: 600
        }}>
          {siteConfig.tagline}
        </p>
      </main>
    </Layout>
  );
}
