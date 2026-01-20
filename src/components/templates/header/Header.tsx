'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

// import BlogLogo from '@icons/blog-logo.svg';
import { LanguageSelector } from '@src/components/features/language-selector';
import { Container } from '@src/components/shared/container';
import Image from 'next/image';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="py-5">
      <nav>
        <Container className="flex items-center justify-between">
          <Link href="/" title={t('common.homepage')}>
            {/* <BlogLogo /> */}
            <Image
              src="/assets/svg/kz-logo.svg"
              alt="Logo"
              width={80}
              height={40}>
            </Image>
          </Link>
          {/* <LanguageSelector /> */}
        </Container>
      </nav>
    </header>
  );
};
