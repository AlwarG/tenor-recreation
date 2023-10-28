import Header from './header';
import styles from './page.module.scss';
import { Fragment } from 'react';

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main>
        <div className={`container ${styles.container}`}>{children}</div>
      </main>
    </Fragment>
  );
};

export default Layout;