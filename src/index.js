import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  createMuiTheme,
  MuiThemeProvider,
  makeStyles
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import {
  Root,
  Header,
  HeaderOffset,
  Sidebar,
  Content,
  Footer,
  CollapseBtn,
  CollapseIcon,
  SidebarTrigger,
  SidebarTriggerIcon,
  sidebarStyles,
  headerStyles,
  defaultLayoutPreset,
  standardLayoutPreset,
  fixedLayoutPreset,
  contentBasedLayoutPreset,
  cozyLayoutPreset,
  muiTreasuryPreset
} from "@mui-treasury/layout";

import NavContentEx from "./components/NavContentEx";
import HeaderEx from "./components/HeaderEx";
import ContentEx from "./ContentEx";
import FooterEx from "./components/FooterEx";

import "./styles.css";

const presets = {
  createDefaultLayout: defaultLayoutPreset,
  createStandardLayout: standardLayoutPreset,
  createFixedLayout: fixedLayoutPreset,
  createContentBasedLayout: contentBasedLayoutPreset,
  createCozyLayout: cozyLayoutPreset,
  createMuiTreasuryLayout: muiTreasuryPreset
};

const useSidebarStyles = makeStyles(sidebarStyles);
const useHeaderStyles = makeStyles(headerStyles);

// add presets.create{}() to config props in Root to change the behavior, looking and layout
// <Root config={presets.createCozyLayout()}> ...
function App() {
  const [loading, setLoading] = useState(false);
  const [preset, setPreset] = useState("createStandardLayout");
  const [data, setData] = useState({
    header: true,
    nav: true,
    content: true,
    footer: true
  });
  const sidebarStyles = useSidebarStyles();
  const headerStyles = useHeaderStyles();
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Typography variant={"h2"}>Changing Preset...</Typography>
        </div>
      ) : (
        <Root config={presets[preset]}>
          <CssBaseline />
          <Header style={{background: "#333"}}>
            <Toolbar>
              <CollapseBtn
                component={IconButton}
                className={headerStyles.leftTrigger}
                style={{color: "#ddd"}}
              >
                <CollapseIcon />
              </CollapseBtn>
              <SidebarTrigger
                className={headerStyles.leftTrigger}
                style={{color: "#ddd"}}
              >
                <SidebarTriggerIcon />
              </SidebarTrigger>
              {data.header && <HeaderEx />}
            </Toolbar>
          </Header>
          <HeaderOffset />
          <Content>
            {data.content && <ContentEx />}
          </Content>
          <Sidebar>
            {({ collapsed }) => (
              <>
                <div className={sidebarStyles.container}>
                  {data.nav && <NavContentEx />}
                </div>
              </>
            )}
          </Sidebar>
          <Footer>{data.footer && <FooterEx />}</Footer>
        </Root>
      )}
    </MuiThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
