import { RecoilRoot } from 'recoil';
import { Stack } from '@mui/material';
import { useContext, createContext, useState, useMemo } from 'react';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { ButtonThemeToggle } from 'components/button-theme-toggle';
import { EventRoot } from 'lib/event';
import { Pasteboard } from 'components/paste-board';
import { actionProcessors } from 'state/action-processors';

const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

function App() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <RecoilRoot>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        <Box sx={{ flex: '0 0 30px' }}>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            height="100%"
            padding="0 1rem"
            fontSize="12px"
          >
            <b>File</b>
            <b>Edit</b>
            <b>
              <ButtonThemeToggle
                themeMode={theme.palette.mode}
                onClick={colorMode.toggleColorMode}
              />
            </b>
          </Stack>
        </Box>
        <Box sx={{ flex: '1' }}>
          <Pasteboard />
        </Box>
        <EventRoot actionProcessor={actionProcessors} />
      </Box>
    </RecoilRoot>
  );
}

function ThemeToggle() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ThemeToggle;
