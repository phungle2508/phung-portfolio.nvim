'use client';

import { useEffect, useState } from 'react';
import Skeleton from './Skeleton';

export default function CVClient() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="page-content">
      <div className="page-header-container">
        <h1 className="page-title" style={{ color: 'var(--text-accent)' }}>
          My CV
        </h1>
        <p className="page-subtitle">Curriculum Vitae</p>
      </div>

      <div className="cv-container" style={{ 
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        overflow: 'hidden',
        height: 'calc(100vh - 200px)',
        position: 'relative'
      }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-4 w-full p-8">
              <Skeleton height="2rem" width="60%" />
              {Array.from({ length: 20 }).map((_, i) => (
                <Skeleton key={i} height="1rem" />
              ))}
            </div>
          </div>
        )}
        <iframe
          src="/api/content/cv"
          className="w-full h-full border-0"
          title="Phung Le CV"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </div>
  );
}