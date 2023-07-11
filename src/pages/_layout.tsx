import React, { PropsWithChildren } from 'react';
import NavBar from '@/components/navbar/NavBar';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <NavBar />
    <main>{children}</main>
  </>
)

export default Layout;
