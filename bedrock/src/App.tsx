import { ThemeProvider } from "@mui/material/styles";
import { ChatPage } from "./pages/ChatPage";
import { theme } from "./themes/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ChatPage />
    </ThemeProvider>
  );
}

export default App;
