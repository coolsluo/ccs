import { Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { lightTheme, darkTheme } from './styles/theme';
import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import { GlobalStyle } from './styles/global';

export default function App() {
  const [dark, setDark] = useState(false);
  const theme = dark ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <SideBar />
        <MainWrapper>
          <TopBar dark={dark} setDark={setDark} />
          <Content>
            <Outlet />
          </Content>
        </MainWrapper>
      </Layout>
    </ThemeProvider>
  );
}

/* ------ styled ------ */
import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  height: 100vh;
  background: ${({ theme }) => theme.bg};
`;

const MainWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: 24px;
  overflow: auto;
`;